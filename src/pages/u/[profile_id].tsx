import { useEffect, useState, useContext } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

import { LOCAL_STORAGE_KEY } from '@constants';
import { useAppPersistStore } from '@store/app';
import { ContractContext } from '@store/contract';
import { getProfile, getAvatarUrl } from '@lib/profile';
import { getPublications } from '@lib/publication';
import { GridLayout } from '@components/ui';
import { Publication } from '@types';
import { Profile } from '@generated/types';
import { Button } from '@components/ui';
import { useDisconnect, useSignTypedData } from 'wagmi';
import { useCreateBurnProfileTypedDataMutation } from '@generated/types';

const ProfileArea = (profile: Profile) => {
  const [createBurnProfileTypedDataMutation, { data, loading, error }] = useCreateBurnProfileTypedDataMutation({
    variables: {
      request: {
        profileId: profile.id,
      }
    },
  });
  // const [ typedData, setTypedData ] = useState<any>(null)
  const { data: txData, isError, isLoading, isSuccess, status, signTypedData } = useSignTypedData({
    onError(error) {
      console.error(error?.message);
    },
    onSuccess(data) {
      console.log(data)
    }
  })

  const { disconnect } = useDisconnect();
  const { lensHub } = useContext(ContractContext)
  const currentUser = useAppPersistStore(state => state.currentUser)
  const setCurrentUser = useAppPersistStore(state => state.setCurrentUser)
  const isMe = currentUser?.id === profile.id

  const logout = () => {
    setCurrentUser(null);
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    if (disconnect) disconnect();
  }

  const handleDeleteProfile = async () => {
    currentUser?.id && await createBurnProfileTypedDataMutation(currentUser.id)
    // logout()
  }

  useEffect(() => {
    if (data) {
      var { typedData } = data.createBurnProfileTypedData
      console.log(typedData)
      delete typedData.value.__typename
      signTypedData({
        domain: {
          chainId: typedData.domain.chainId,
          name: typedData.domain.name,
          verifyingContract: typedData.domain.verifyingContract,
          version: typedData.domain.version,
        },
        types: {
          'BurnWithSig': [
            { name: 'tokenId', type: 'uint256' },
            { name: 'nonce', type: 'uint256' },
            { name: 'deadline', type: 'uint256' }
          ],
        },
        value: typedData.value
      })
    }
  }, [data])

  useEffect(() => {
    console.log({ txData, status })
  }, [txData, status])

  return (
    <div className='flex flex-col justify-center items-center gap-2'>
      <img
        className='w-64 rounded-full'
        src={getAvatarUrl(profile)}
      />
      <p className='text-4xl mt-8 mb-8'>{profile.handle}</p>
      <p className='text-center text-xl mt-2 mb-2'>{profile.bio}</p>
      {
        isMe && (
          <>
            {/* <Button outline className='w-4/5'>Edit Profile</Button> */}
            <Button variant='danger' className='w-4/5' onClick={handleDeleteProfile}>Delete Profile</Button>
          </>
        )
      }

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
  const currentUser = useAppPersistStore(state => state.currentUser)
  const router = useRouter();
  const { profile_id } = router.query
  const profileId = profile_id as string
  const [profile, setProfile] = useState<Profile | null>(null)
  const [publications, setPublications] = useState<Publication[]>([])
  const [isMe, setIsMe] = useState(false)

  useEffect(() => {
    async function fetchProfile() {
      try {
        const profile = await getProfile(profileId)
        setProfile(profile)
        const pubs = await getPublications(profile.id, 20)
        setPublications(pubs.items)
      } catch (err) {
        console.log({ err })
      }
    }

    if (profileId) {
      fetchProfile()
    }
    if (currentUser?.id === profileId) {
      setIsMe(true)
    }
  }, [profileId, currentUser])

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