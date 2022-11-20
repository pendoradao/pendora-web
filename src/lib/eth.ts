import { ethers, getDefaultProvider } from "ethers";
import {
  WagmiConfig,
  configureChains,
  chain,
  createClient,
} from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

import ethChain from "./eth_chain.json";

const { chains, provider, webSocketProvider } = configureChains(
  [chain.mainnet, chain.polygon],
  [publicProvider()],
)

const client = createClient({
  autoConnect: false,
  provider,
  webSocketProvider,
})

const toChecksumAddress = (address: string) => {
  return ethers.utils.getAddress(address);
}

const getNetworkName = (chainId: string) => {
  var chainName = ethChain[chainId as keyof typeof ethChain];
  if (!chainName && (parseInt(chainId) > 1652600000000)) { // local chainid timestamp
    chainName = 'dev'
  }
  return chainName
}

const connectWallet = async (handlerSetAccout: ((account: string)=>void) | undefined) => {
  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(ethereum);

  if (!ethereum) {
    console.log("No wallet plugin is available!");
    return;
  }

  const accounts = await provider.send( 'eth_requestAccounts', []);
  console.log(accounts);
  const account = accounts[0];
  console.log(`account:  ${account}`);

  // connector: new InjectedConnector(),

  if (handlerSetAccout) {
    handlerSetAccout(toChecksumAddress(account));
  }
}


export {
  toChecksumAddress,
  getNetworkName,
  connectWallet,
  client,
}

