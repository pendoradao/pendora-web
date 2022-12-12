import { ethers, getDefaultProvider } from "ethers";
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

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})

// export const signedTypeData = (
//   domain: TypedDataDomain,
//   types: Record<string, any>,
//   value: Record<string, any>
// ) => {
//   const signer = getSigner();
//   // remove the __typedname from the signature!
//   return signer._signTypedData(
//     omit(domain, '__typename'),
//     omit(types, '__typename'),
//     omit(value, '__typename')
//   );
// };


export {
  client,
}