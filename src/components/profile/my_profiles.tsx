import { useState, useEffect } from 'react';
import { Button, Modal } from '@components/ui';
import { useAccount } from 'wagmi'
import { UserAddIcon } from '@heroicons/react/outline';

import { Avatar } from '@components/ui';
import { getProfilesByOwnedBy, getAvatarUrl } from '@lib/profile';
import { Profile } from '@generated/types';
import { useAppPersistStore } from '@store/app';

interface MyProfilesDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

function MyProfilesDialog({ isOpen, setIsOpen }: MyProfilesDialogProps) {
  const { address } = useAccount()
  const currentUser = useAppPersistStore((state) => state.currentUser);
  const setCurrentUser = useAppPersistStore((state) => state.setCurrentUser);
  const [loading, setLoading] = useState(false)
  const [items, setItem] = useState<Profile[]>([])

  useEffect(() => {
    console.log('setIsOpen in mpd', isOpen)
    if (isOpen && address) {
      setLoading(true)
      // test address: 0x6C77a5a88C0AE712BAeABE12FeA81532060dcBf5
      getProfilesByOwnedBy(address).then((profiles) => {
        setItem(profiles.items)
        console.log('profiles', profiles)
        setLoading(false)
      })
    }
  }, [isOpen, address])

  const handleSetProfile = (profile: Profile) => {
    setIsOpen(false)
    console.log('setIsOpen', isOpen)
    // setProfile && setProfile(profile)
    setCurrentUser && setCurrentUser(profile)
  }

  return (
    <Modal open={isOpen} setOpen={setIsOpen} title="Login with Lens" className="w-full lg:w-1/4">
      <>
        <div className='flex gap-2 mt-4 border-b'>
          {
            items.map((item) => {
              return (
                <div key={item.id} onClick={() => { handleSetProfile(item) }} className='flex items-center cursor-pointer px-4 py-2 mx-auto'>
                  <Avatar avatarUrl={getAvatarUrl(item)}></Avatar>
                  <span className='ml-2'>
                    {item.name}
                  </span>
                </div>
              )
            })
          }
        </div>
        <div className='flex justify-center pt-4'>
          <Button icon={<UserAddIcon />}>New Account</Button>
        </div>
      </>
    </Modal>
  )
}

export default MyProfilesDialog