import { useEffect, useState, useContext } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useDisconnect, useSignTypedData } from 'wagmi';
import { splitSignature } from 'ethers/lib/utils';
import { BigNumber } from 'ethers';
import { useAccount  } from 'wagmi';

import { LOCAL_STORAGE_KEY } from '@constants';
import { useAppPersistStore } from '@store/app';
import { ContractContext } from '@context/contract';
import { getProfile, getAvatarUrl } from '@lib/profile';
import { getPublications } from '@lib/publication';
import { GridLayout } from '@components/ui';
import { Publication } from '@types';
import { Profile } from '@generated/types';
import { Button } from '@components/ui';
import { useCreateBurnProfileTypedDataMutation } from '@generated/types';
import type { CreateBurnProfileTypedDataMutation } from '@generated/types';

const ProfileArea = (profile: Profile) => {
  const currentUser = useAppPersistStore(state => state.currentUser)
  const { address, isConnecting } = useAccount()
  const setCurrentUser = useAppPersistStore(state => state.setCurrentUser)
  const { disconnect } = useDisconnect();
  const { lensHub } = useContext(ContractContext)
  const isMe = (currentUser?.id === profile.id) && isConnecting && (address === currentUser?.ownedBy)

  const [createBurnProfileTypedDataMutation, { data, loading, error }] = useCreateBurnProfileTypedDataMutation({
    variables: {
      request: {
        profileId: profile.id,
      }
    },
  });
  const { data: signature, isError, isLoading, isSuccess, status, signTypedData } = useSignTypedData({
    onError(error) {
      console.error(error?.message);
    },
  })

  const logout = () => {
    setCurrentUser(null);
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    if (disconnect) disconnect();
  }

  const handleBurnProfile = async (signature: string, data: CreateBurnProfileTypedDataMutation) => {
    console.log('burn profile: signature', signature);
    if (lensHub) {
      var { typedData } = data.createBurnProfileTypedData
      const { v, r, s } = splitSignature(signature);
      const tx = lensHub.burnWithSig(typedData.value.tokenId, {
        v,
        r,
        s,
        deadline: typedData.value.deadline,
      });
    }
  }

  const handleSignTypedData = async (data: CreateBurnProfileTypedDataMutation) => {
    var { typedData } = data.createBurnProfileTypedData
    console.log('burn profile: typedData', typedData);
    await signTypedData({
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
      value: {
        tokenId: BigNumber.from(typedData.value.tokenId),
        nonce: BigNumber.from(typedData.value.nonce),
        deadline: BigNumber.from(typedData.value.deadline),
      }
    })
  }

  const handleDeleteProfile = async () => {
    currentUser?.id && await createBurnProfileTypedDataMutation(currentUser.id)
  }

  useEffect(() => {
    if (data) {
      handleSignTypedData(data)
    } else if (error) {
      console.log(error)
    }
  }, [data, loading, error])

  useEffect(() => {
    if (signature && data) {
      handleBurnProfile(signature, data)
    }
  }, [signature])

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