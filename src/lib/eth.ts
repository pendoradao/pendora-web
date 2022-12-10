import { ethers, getDefaultProvider } from "ethers";
import {
  configureChains,
  chain,
  createClient,
} from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

import { IS_MAINNET } from "@constants";

const { chains, provider, webSocketProvider } = configureChains(
  [IS_MAINNET ? chain.polygon : chain.polygonMumbai],
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

const client = createClient({
  autoConnect: false,
  connectors,
  provider,
  webSocketProvider,
})

export {
  client,
}