import type { AppProps } from 'next/app'
import Head from 'next/head'
import { WagmiConfig } from 'wagmi';

import Layout from '@/components/layout'
import { client } from '@lib/eth';
import '@/styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  console.log('rendering app')

  const PageView = () => {
    return (
      <WagmiConfig client={client}> 
        <Layout>
          <Component {...pageProps} />
        </Layout>
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
