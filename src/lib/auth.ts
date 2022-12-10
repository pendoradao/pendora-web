import { useEffect, useState } from 'react'
import { gql, useLazyQuery, useMutation } from '@apollo/client'
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

const CHALLENGE_QUERY = gql`
  query Challenge($request: ChallengeRequest!) {
    challenge(request: $request) {
      text
    }
  }
`;

export const AUTHENTICATE_MUTATION = gql`
  mutation Authenticate($request: SignedAuthChallenge!) {
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
  }
`;

export const MinimalProfileFields = gql`
  fragment MinimalProfileFields on Profile {
    id
    name
    handle
    bio
    ownedBy
    attributes {
      key
      value
    }
    picture {
      ... on MediaSet {
        original {
          url
        }
      }
      ... on NftImage {
        uri
      }
    }
    followModule {
      __typename
    }
  }
`;


export const CURRENT_USER_QUERY = gql`
  query CurrentUser($ownedBy: [EthereumAddress!]) {
    profiles(request: { ownedBy: $ownedBy }) {
      items {
        ...MinimalProfileFields
        isDefault
      }
    }
    userSigNonces {
      lensHubOnChainSigNonce
    }
  }
  ${MinimalProfileFields}
`;

interface AuthProps {
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

export function useChallenge() {
  const [loadChallenge, { error: errorChallenge, loading: challengeLoading }] = useLazyQuery(
    CHALLENGE_QUERY,
    {
      fetchPolicy: 'no-cache'
    }
  );
  return { loadChallenge, errorChallenge, challengeLoading }
}

export function useAuth() {
  const [authenticate, { error: errorAuthenticate, loading: authLoading }] = useMutation(AUTHENTICATE_MUTATION);
  return { authenticate, errorAuthenticate, authLoading }
}

export function useCurrentUser() {
  const [getProfiles, { error: errorProfiles, loading: profilesLoading }] = useLazyQuery(CURRENT_USER_QUERY);
  return { getProfiles, errorProfiles, profilesLoading }
}

export function useLogin(auth: AuthProps) {
  const { address, challengeText, handleGetToken } = auth
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: challengeText,
    async onSuccess(data) {
      // console.log('Success', data)
      let signature = data
      const authData = await client.mutate({
        mutation: authenticate,
        variables: {
          address, signature
        }
      })
      /* if user authentication is successful, you will receive an accessToken and refreshToken */
      const { data: { authenticate: { accessToken } } } = authData
      // console.log({ accessToken })
      handleGetToken(accessToken)
    },
  })
  const login = signMessage

  return {
    login,
    isLoading
  }
}