import { ethers, getDefaultProvider } from "ethers";
import {
  WagmiConfig,
  configureChains,
  chain,
  createClient,
} from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

const { chains, provider, webSocketProvider } = configureChains(
  [chain.polygon, chain.polygonMumbai],
  [publicProvider()],
)

const client = createClient({
  autoConnect: false,
  provider,
  webSocketProvider,
})

export {
  client,
}