import { ethers, getDefaultProvider, utils } from "ethers";
import {
  configureChains,
  // chain,
  createClient,
} from 'wagmi'
import { polygonMumbai, polygon  } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from '@wagmi/core/connectors/walletConnect';

import { IS_MAINNET } from "@constants";

const { chains, provider, webSocketProvider } = configureChains(
  [IS_MAINNET ? polygon : polygonMumbai],
  [publicProvider()],
)

const connectors = () => {
  return [
    new InjectedConnector({
      chains,
      options: { shimDisconnect: true }
    }),
    new WalletConnectConnector({
      chains,
      options: { 
        // rpc: { [CHAIN_ID]: ALCHEMY_RPC } 
      }
    })
  ];
};

export const splitSignature = (signature: string) => {
  return utils.splitSignature(signature);
};

export const client = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})

// export {
//   client,
// }