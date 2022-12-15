import { ReactNode, useEffect, useState } from 'react'
import { useContract, useSigner } from 'wagmi';
import { ApolloProvider } from '@apollo/client';
import { useAccount, useDisconnect, useNetwork } from 'wagmi';
import Cookies from 'js-cookie';

import { useAppPersistStore, useAppStore } from '@store/app';
import { client } from '@lib/request';
import Layout from './layout'
import { LENSHUB_PROXY, LOCAL_STORAGE_KEY, CHAIN_ID } from "@constants";
import { ContractContext } from '@context/contract';
import LensHubABI from "@abi/lens_hub_contract_abi.json";

const ContextedApp = ({ children }: { children: ReactNode }) => {
  const setProfiles = useAppStore((state) => state.setProfiles);
  const setUserSigNonce = useAppStore((state) => state.setUserSigNonce);
  const isConnected = useAppPersistStore((state) => state.isConnected);
  const setIsConnected = useAppPersistStore((state) => state.setIsConnected);
  const isAuthenticated = useAppPersistStore((state) => state.isAuthenticated);
  const setIsAuthenticated = useAppPersistStore((state) => state.setIsAuthenticated);
  const currentUser = useAppPersistStore((state) => state.currentUser);
  const setCurrentUser = useAppPersistStore((state) => state.setCurrentUser);

  const [mounted, setMounted] = useState<boolean>(false);
  const { address, isDisconnected } = useAccount();
  const { chain } = useNetwork();
  const { disconnect } = useDisconnect();

    const { data: signer } = useSigner({
      onSuccess(data) {
        console.log('Success', data)
      },
      onError(error) {
        console.error(error?.message);
      }
    })
  
    const lensHub = useContract({
      address: LENSHUB_PROXY,
      abi: LensHubABI,
      signerOrProvider: signer,
    })
  
  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');
    const currentUserAddress = currentUser?.ownedBy;
    setMounted(true);

    const logout = () => {
      setIsAuthenticated(false);
      setIsConnected(false);
      setCurrentUser(null);
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      if (disconnect) disconnect();
    };

    if (
      refreshToken &&
      accessToken &&
      accessToken !== 'undefined' &&
      refreshToken !== 'undefined' &&
      currentUser &&
      chain?.id === CHAIN_ID
    ) {
      setIsAuthenticated(true);
    } else {
      if (isAuthenticated) logout();
    }

    if (isDisconnected) {
      if (disconnect) disconnect();
      setIsAuthenticated(false);
      setIsConnected(false);
    }

    if (currentUserAddress !== undefined && currentUserAddress !== address) {
      logout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, isAuthenticated, isDisconnected, address, chain, currentUser, disconnect, setCurrentUser]);

    return (
      <ApolloProvider client={client}>
        <ContractContext.Provider value={{ lensHub: lensHub }}>
          <Layout>
            {children}
          </Layout>
        </ContractContext.Provider>
      </ApolloProvider>
    )
  }
  
  export default ContextedApp;