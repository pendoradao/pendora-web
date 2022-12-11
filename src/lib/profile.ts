import { gql } from '@apollo/client'

import { Profile } from '@/types'
import { client } from './request'

export const GET_PROFILE = gql`
query Profile($profileId: ProfileId!) {
  profile(request: { profileId: $profileId }) {
    id
    name
    bio
    picture {
      ... on MediaSet {
        original {
          url
        }
      }
    }
    handle
  }
}
`

export const getAvatarUrl = (profileData: Profile) => {
  const picture = profileData.picture
  let avatarUrl = ''
  if (picture && picture.original && picture.original.url) {
    if (picture.original.url.startsWith('ipfs://')) {
      let result = picture.original.url.substring(7, picture.original.url.length)
      avatarUrl = `http://lens.infura-ipfs.io/ipfs/${result}`
    } else {
      avatarUrl = profileData?.picture?.original.url || ''
    }
  }
  return avatarUrl
}

export const getProfile = async (profileId: string) => {
  const { data } = await client.query({
    query: GET_PROFILE,
    variables: {
      profileId
    }
  })
  return data.profile
}

export const getProfilesByOwnedBy = async (ownedBy: `0x${string}` | undefined) => {
  const { data } = await client.query({
    query: gql`
    query Profiles($ownedBy: EthereumAddress!) {
      profiles(request: { ownedBy: [$ownedBy], limit: 10 }) {
        items {
          id
          name
          isDefault
          picture {
            ... on MediaSet {
              original {
                url
              }
            }
            __typename
          }
          handle
          ownedBy
        }
        pageInfo {
          prev
          next
          totalCount
        }
      }
    }
    `,
    variables: {
      ownedBy
    }
  });
  return data.profiles
}

export const deleteProfile = async (profileId: string) => {
  const { data } = await client.mutate({
    mutation: gql`
    mutation CreateBurnProfileTypedData ($profileId: ProfileId!) {
      createBurnProfileTypedData(request: { profileId: $profileId }) {
        id
        expiresAt
      }
    }
    `,
    variables: {
      profileId
    }
  })
  return data.deleteProfile
}