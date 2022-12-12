import { useState, useEffect, Dispatch } from 'react';
import { useAppPersistStore, useAppStore } from '@store/app';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { XCircleIcon } from '@heroicons/react/solid';
import { Connector, useAccount, useConnect, useNetwork, useSignMessage } from 'wagmi';

import { COOKIE_CONFIG } from '@lib/request';
import { Button, Spinner } from '@components/ui';
import { useChallenge, useAuth, useCurrentUser } from '@lib/auth';
import { Profile } from '@generated/types';
import { CHAIN_ID } from '@constants';

const SwitchNetwork = () => {
  return (
    <Button>Switch Network</Button>
  )
}

interface Props {
  setHasConnected: Dispatch<boolean>;
  setHasProfile: Dispatch<boolean>;
  // setOpen: Dispatch<boolean>;
}

const Wallets = ({ setHasConnected, setHasProfile }: Props) => {
  const setProfiles = useAppStore((state) => state.setProfiles);
  const setIsConnected = useAppPersistStore((state) => state.setIsConnected);
  const setIsAuthenticated = useAppPersistStore((state) => state.setIsAuthenticated);
  const setCurrentUser = useAppPersistStore((state) => state.setCurrentUser);

  const [mounted, setMounted] = useState(false);
  const { chain } = useNetwork();
  const { connectors, error, connectAsync } = useConnect();
  const { address, connector: activeConnector } = useAccount();
  const { signMessageAsync, isLoading: signLoading } = useSignMessage({
    onError(error) {
      console.error(error?.message);
    }
  });

  const { loadChallenge, errorChallenge, challengeLoading } = useChallenge();
  const { authenticate, errorAuthenticate, authLoading } = useAuth();
  const { getProfiles, errorProfiles, profilesLoading }= useCurrentUser();

  useEffect(() => setMounted(true), []);

  const onConnect = async (connector: Connector) => {
    try {
      const account = await connectAsync({ connector });
      if (account) {
        setHasConnected(true);
      }
    } catch (error) {}
  };

  const handleSign = async () => {
    try {
      // Get challenge
      const challenge = await loadChallenge({
        variables: { request: { address } }
      });

      if (!challenge?.data?.challenge?.text) return toast.error('ERROR_MESSAGE');

      // Get signature
      const signature = await signMessageAsync({
        message: challenge?.data?.challenge?.text
      });

      // Auth user and set cookies
      const auth = await authenticate({
        variables: { request: { address, signature } }
      });
      Cookies.set('accessToken', auth.data.authenticate.accessToken, COOKIE_CONFIG);
      Cookies.set('refreshToken', auth.data.authenticate.refreshToken, COOKIE_CONFIG);

      // Get authed profiles
      const { data: profilesData } = await getProfiles({
        variables: { ownedBy: address }
      });
      setIsConnected(true);

      if (profilesData?.profiles?.items?.length === 0) {
        setHasProfile(false);
      } else {
        const profiles: Profile[] = profilesData?.profiles?.items
          ?.slice()
          ?.sort((a: Profile, b: Profile) => Number(a.id) - Number(b.id))
          ?.sort((a: Profile, b: Profile) => (!(a.isDefault !== b.isDefault) ? 0 : a.isDefault ? -1 : 1));
        setIsAuthenticated(true);
        setProfiles(profiles);
        setCurrentUser(profiles[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return activeConnector?.id ? (
    <div className="space-y-3">
      {chain?.id === CHAIN_ID ? (
        <Button
          size="lg"
          disabled={signLoading || challengeLoading || authLoading || profilesLoading}
          icon={
            signLoading || challengeLoading || authLoading || profilesLoading ? (
              <Spinner className="mr-0.5" size="xs" />
            ) : (
              <img className="mr-1 w-5 h-5" height={20} width={20} src="/lens.png" alt="Lens Logo" />
            )
          }
          onClick={handleSign}
        >
          Sign-In with Lens
        </Button>
      ) : (
        <SwitchNetwork />
      )}
      {(errorChallenge || errorAuthenticate || errorProfiles) && (
        <div className="flex items-center space-x-1 font-bold text-red-500">
          <XCircleIcon className="w-5 h-5" />
          <div>{'ERROR_MESSAGE'}</div>
        </div>
      )}
    </div>
  ) : (
    <div className="inline-block overflow-hidden space-y-3 w-full text-left align-middle transition-all transform">
      {connectors.map((connector) => {
        return (
          <Button
            key={connector.id}
            onClick={() => onConnect(connector)}
            size="lg"
            variant="primary"
            outline 
            className='block w-1/2'
            disabled={mounted ? !connector.ready || connector.id === activeConnector?.id : false}
          >
            <span className="flex justify-between items-center w-full">
              {mounted ? (connector.id === 'injected' ? 'Browser Wallet' : connector.name) : connector.name}
              {mounted ? !connector.ready && ' (unsupported)' : ''}
            </span>
            {/* <img
              src={getWalletLogo(connector.name)}
              draggable={false}
              className="w-6 h-6"
              height={24}
              width={24}
              alt={connector.id}
            /> */}
          </Button>
        );
      })}
      {error?.message ? (
        <div className="flex items-center space-x-1 text-red-500">
          <XCircleIcon className="w-5 h-5" />
          <div>{error?.message ?? 'Failed to connect'}</div>
        </div>
      ) : null}
    </div>
  )
} 

export default Wallets