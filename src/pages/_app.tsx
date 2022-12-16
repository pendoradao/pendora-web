import type { AppProps } from 'next/app'
import Head from 'next/head'
import { WagmiConfig } from 'wagmi';
import '@/styles/globals.css'

import ContextedApp from '@/components/context'
import { client } from '@lib/eth';

function MyApp({ Component, pageProps }: AppProps) {
  console.log('rendering app')

  const PageView = () => {
    return (
      <WagmiConfig client={client}>
        <ContextedApp >
          <Component {...pageProps} />
        </ContextedApp>
      </WagmiConfig>
    )
  }

  return (
    <div>
      <Head>
        <title>Pendora</title>
        <meta name="description" content="Pendora is a web3 question-and-answer platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageView />
    </div>
  )
}

export default MyApp
