import { gql } from '@apollo/client'

import { 
  Profile, 
  ProfileDocument, 
  UserProfilesDocument,
  useCreateBurnProfileTypedDataMutation,
} from '@generated/types'
import { client } from './request'
import { getIPFSLink } from './ipfs'

export const getAvatarUrl = (profile: Profile) => {
  // TODO: fix this type issue
  return getIPFSLink(
    // @ts-ignore
    profile?.picture?.original?.url ??
    // @ts-ignore
      profile?.picture?.uri ??
      `https://avatar.tobi.sh/${profile?.ownedBy}_${profile?.handle}.png`
  )
}

export const getProfile = async (profileId: string) => {
  const { data } = await client.query({
    query: ProfileDocument,
    variables: {
      request: {
        profileId: profileId
      }
    }
  })
  return data.profile
}

export const getProfilesByOwnedBy = async (ownedBy: `0x${string}` | undefined) => {
  const { data } = await client.query({
    query: UserProfilesDocument,
    variables: {
      ownedBy
    }
  });
  return data.profiles
}

// export const useCreateBurnProfileTypedDataMutation

export const createBurnProfileTypedData = async (profileId: string) => {
  const { data } = await client.mutate({
    mutation: gql`
    mutation CreateBurnProfileTypedData ($profileId: ProfileId!) {
      createBurnProfileTypedData(request: { profileId: $profileId }) {
        id
        expiresAt
        typedData {
          domain {
            name
            chainId
            version
            verifyingContract
          }
          types {
            BurnWithSig {
              name
              type
            }
          }
          value {
            nonce
              deadline
              tokenId
          }
        }
      }
    }
    `,
    variables: {
      profileId
    }
  })
  return data.deleteProfile
}