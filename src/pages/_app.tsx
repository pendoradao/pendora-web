import { useState } from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { WagmiConfig } from 'wagmi';
import '@/styles/globals.css'

import Layout from '@/components/layout'
import { client } from '@lib/eth';
import { IUserContext, UserContext } from '@context/app';
import { Profile } from '@types'

function MyApp({ Component, pageProps }: AppProps) {
  console.log('rendering app')
  const [token, setToken] = useState<string>('')
  const [ profile, setProfile ] = useState<Profile | undefined>(undefined)
  const userContext: IUserContext = {
    token: token,
    setToken: setToken,
    profile: profile,
    setProfile: setProfile
  }

  const PageView = () => {
    return (
      <WagmiConfig client={client}> 
        <UserContext.Provider value={userContext}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserContext.Provider>
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
