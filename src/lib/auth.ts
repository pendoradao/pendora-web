import { useEffect, useState } from 'react'
import { gql } from '@apollo/client'
import { useSignMessage } from 'wagmi'

import { client } from './request'

export const challenge = gql`
  query Challenge($address: EthereumAddress!) {
    challenge(request: { address: $address }) {
      text
    }
  }
`

export const authenticate = gql`
  mutation Authenticate(
    $address: EthereumAddress!
    $signature: Signature!
  ) {
    authenticate(request: {
      address: $address,
      signature: $signature
    }) {
      accessToken
      refreshToken
    }
  }
`

interface IAuth {
  address: `0x${string}` | undefined,
  challengeText: string,
  handleGetToken: (token: string) => void
}

export const getChallengeText = async (address: string) => {
  const challengeInfo = await client.query({
    query: challenge,
    variables: { address }
  })
  return challengeInfo.data.challenge.text
}

export function useLogin(auth: IAuth) {
  const { address, challengeText, handleGetToken } = auth
  console.log('challengeText', challengeText)
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: challengeText,
    async onSuccess(data) {
      console.log('Success', data)
      let signature = data
      const authData = await client.mutate({
        mutation: authenticate,
        variables: {
          address, signature
        }
      })
      /* if user authentication is successful, you will receive an accessToken and refreshToken */
      const { data: { authenticate: { accessToken } } } = authData
      console.log({ accessToken })
      handleGetToken(accessToken)
    },
  })
  const login = signMessage

  return {
    login
  }
}