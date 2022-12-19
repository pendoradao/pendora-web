import { getDefaultProvider, utils, BigNumber } from "ethers";
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

export const cleanTypedData = (typedData: any) => {
  delete typedData.__typename;
  delete typedData.domain.__typename;
  delete typedData.types.__typename;
  for (let k in typedData.types) {
    delete typedData.types[k].__typename;
    for (let j of typedData.types[k]) {
      delete j.__typename;
      if ((j.type) === 'uint256') {
        typedData.value[j.name] = BigNumber.from(typedData.value[j.name]);
    }
  }
  delete typedData.value.__typename;
  }
}

export const client = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})