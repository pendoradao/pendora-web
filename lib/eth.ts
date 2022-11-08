import { ethers } from "ethers";

import ethChain from "./eth_chain.json";

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
  // console.log(accounts);
  const account = accounts[0];
  console.log(`account:  ${account}`);

  if (handlerSetAccout) {
    handlerSetAccout(toChecksumAddress(account));
  }
}

export {
  toChecksumAddress,
  getNetworkName,
  connectWallet
}