import { gql } from '@apollo/client'

import { Profile } from '@/types'
import { client } from './request'

export const modifyProfileData = (profileData: Profile & {picture: any}) => {
  const picture = profileData.picture
  let avatarUrl = ''
  if (picture && picture.original && picture.original.url) {
    if (picture.original.url.startsWith('ipfs://')) {
      let result = picture.original.url.substring(7, picture.original.url.length)
      avatarUrl = `http://lens.infura-ipfs.io/ipfs/${result}`
    } else {
      avatarUrl = profileData.picture.original.url
    }
  }
  return {...profileData, avatarUrl: avatarUrl}
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
  const items = data.profiles.items.map((profile: any) => {
    return modifyProfileData(profile)
  })
  return {...data.profiles.pageInfo, items: items};
}
