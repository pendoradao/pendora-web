import { useState } from 'react';

import { APP_NAME, IS_MAINNET } from '@constants';
import Wallets from './wallets';
import NewProfile from './new';

const Login = () => {
  const [hasConnected, setHasConnected] = useState<boolean>(false);
  const [hasProfile, setHasProfile] = useState<boolean>(true);

  return (
    <div className="p-5">
      {hasProfile ? (
        <div className="space-y-5">
          {hasConnected ? (
            <div className="space-y-1">
              <div className="text-xl font-bold">Please sign the message.</div>
              <div className="text-sm text-gray-500">
                {APP_NAME} uses this signature to verify that you&rsquo;re the owner of this address.
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="text-xl font-bold">Connect your wallet.</div>
            </div>
          )}
          <Wallets setHasConnected={setHasConnected} setHasProfile={setHasProfile}/>
        </div>
      ) : IS_MAINNET ? (
        <div>
          <div className="mb-2 space-y-4">
            <div className="text-xl font-bold">Claim your Lens profile</div>
            <div className="space-y-1">
              <div className="linkify">
                Visit{' '}
                <a
                  className="font-bold"
                  href="http://claim.lens.xyz"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  claiming site
                </a>{' '}
                to claim your profile now 🏃‍♂️
              </div>
              <div className="text-sm text-gray-500">Make sure to check back here when done!</div>
            </div>
          </div>
        </div>
      ) : (
        <NewProfile/>
      )}
    </div>
  );
};

export default Login;
