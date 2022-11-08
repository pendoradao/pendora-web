import { createContext, useEffect, useState } from 'react'

import { toChecksumAddress, getNetworkName } from '../lib/eth';

export interface ethConnectionType {
  currentAccount: string | undefined;
  setCurrentAccount?: (arg0: string) => void;
  currentChain: string | undefined;
  SetCurrentChain?: (arg0: string) => void;
  onRightChain: boolean | undefined;
}

export const etherContext = createContext<ethConnectionType>({
  currentAccount: undefined,
  currentChain: undefined,
  onRightChain: undefined,
});

export const useWallet = () => {
  // const { ethereum } = window;
  // const selectedAddress = window?.ethereum?.selectedAddress;
  // const [currentAccount, setCurrentAccount] = useState<string | undefined>(toChecksumAddress(ethereum?.selectedAddress));
  const [currentAccount, setCurrentAccount] = useState<string | undefined>(undefined);
  const [currentChain, SetCurrentChain] = useState<string | undefined>(undefined);
  const [onRightChain, SetOnRightChain] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    // @ts-ignore
    const { ethereum } = window;
    ethereum.on("accountsChanged", ([newAccount]) => {
      console.log("accountsChanged: ", newAccount);
      setCurrentAccount(toChecksumAddress(newAccount));
    })
    // @ts-ignore
    ethereum.on('chainChanged', (chainId) => {
      // Handle the new chain.
      // Correctly handling chain changes can be complicated.
      // We recommend reloading the page unless you have good reason not to.
      window.location.reload();
    });

     ethereum.request({ method: 'net_version' }).then((chainId: string) => {
      const chainName = getNetworkName(chainId);
      console.log(`connect chainId: ${chainId}, chainName: ${chainName}`)
      SetCurrentChain(chainName);
      if (chainName) {
        SetOnRightChain(chainName === process.env.REACT_APP_CHAIN_NETWORK)
      } else if (chainId) {
        SetOnRightChain(false);
      } else {
        SetOnRightChain(undefined);
      }
    });
  }, [])

  return { 
    currentAccount, 
    setCurrentAccount, 
    currentChain, 
    SetCurrentChain,
    onRightChain
  } as ethConnectionType;
}