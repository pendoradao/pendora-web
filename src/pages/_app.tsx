import { ReactNode, useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ApolloProvider } from '@apollo/client';
import { WagmiConfig, useContract, useSigner } from 'wagmi';
import '@/styles/globals.css'

import Layout from '@/components/layout'
import { client } from '@lib/eth';
import { client as apolloClient } from '@lib/request';
import { LENSHUB_PROXY } from "@constants";
import { ContractContext } from '@store/contract';
import LensHubABI from "@abi/lens_hub_contract_abi.json";

function ContextedApp({ children }: { children: ReactNode }) {
  const { data: signer } = useSigner({
    onSuccess(data) {
      console.log('Success', data)
    },
    onError(error) {
      console.error(error?.message);
    }
  })

  const lensHub = useContract({
    address: LENSHUB_PROXY,
    abi: LensHubABI,
    signerOrProvider: signer,
  })

  return (
    <ApolloProvider client={apolloClient}>
      <ContractContext.Provider value={{ lensHub: lensHub }}>
        <Layout>
          {children}
        </Layout>
      </ContractContext.Provider>
    </ApolloProvider>
  )
}

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
