import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { gql } from '@apollo/client'

import { client } from '@lib/request';
import { GridLayout } from '@components/ui';
import { Profile, Publication } from '@types';

export const getProfile = gql`
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

export const getPublications = gql`
  query Publications($id: ProfileId!, $limit: LimitScalar) {
    publications(request: {
      profileId: $id,
      publicationTypes: [POST],
      limit: $limit
    }) {
      items {
        __typename 
        ... on Post {
          ...PostFields
        }
      }
    }
  }
  fragment PostFields on Post {
    id
    metadata {
      ...MetadataOutputFields
    }
  }
  fragment MetadataOutputFields on MetadataOutput {
    content
  }
`

const ProfileArea = (profile: Profile) => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <img
        className='w-64 rounded-full'
        src={profile.avatarUrl}
      />
      <p className='text-4xl mt-8 mb-8'>{profile.handle}</p>
      <p className='text-center text-xl font-bold mt-2 mb-2 w-1/2'>{profile.bio}</p>
    </div>
  )
}

const PublicationArea = ({ publications }: { publications: Publication[] }) => {
  return (
    <div>
      {
        publications.map(pub => (
          <div key={pub.id} className='shadow p-10 rounded mb-8'>
            <p>{pub.metadata.content}</p>
          </div>
        ))
      }
    </div>
  )
}

const UserPage: NextPage = () => {
  const router = useRouter();
  const { profile_id } = router.query
  const profileId = profile_id as string
  const [profile, setProfile] = useState<Profile | null>(null)
  const [publications, setPublications] = useState<Publication[]>([])

  useEffect(() => {
    if (profileId) {
      fetchProfile()
    }
  }, [profileId])
  async function fetchProfile() {
    try {
      /* fetch profiles from Lens API */
      let returnedProfile = await client.query({ query: getProfile, variables: { profileId } })
      /* loop over profiles, create properly formatted ipfs image links */
      const profileData = { ...returnedProfile.data.profile }
      const picture = profileData.picture
      if (picture && picture.original && picture.original.url) {
        if (picture.original.url.startsWith('ipfs://')) {
          let result = picture.original.url.substring(7, picture.original.url.length)
          profileData.avatarUrl = `http://lens.infura-ipfs.io/ipfs/${result}`
        } else {
          profileData.avatarUrl = profileData.picture.original.url
        }
      }
      setProfile(profileData)
      const pubs = await client.query({
        query: getPublications,
        variables: {
          id: profileData.id, limit: 20
        }
      })
      setPublications(pubs.data.publications.items)
    } catch (err) {
      console.log({ err })
    }
  }

  if (!profile) return null

  return (
    <GridLayout className='mt-8'>
      <div className='lg:col-span-3 lg:col-start-2 md:col-span-12 col-span-12 mb-5'>
        <ProfileArea {...profile} />
      </div>
      <div className='lg:col-span-6 lg:col-start-6 md:col-span-12 col-span-12 mb-5'>
        <PublicationArea publications={publications} />
      </div>
    </GridLayout>
  )
}

export default UserPage