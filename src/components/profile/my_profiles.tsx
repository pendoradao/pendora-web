import { useState, useEffect } from 'react';
import Image from 'next/image'
import { Button, Modal } from '@components/ui';
import { useAccount,} from 'wagmi'

import { getProfilesByOwnedBy } from '@lib/profile';
import { Profile } from '@types';

interface IMyProfilesDialog {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

function MyProfilesDialog({isOpen, setIsOpen}: IMyProfilesDialog) {
  const { address } = useAccount()
  const [ loading, setLoading ] = useState(false)
  const [ items, setItem ] = useState<Profile[]>([])

  useEffect(() => {
    if(isOpen && address) {
      setLoading(true)
      // test address: 0x6C77a5a88C0AE712BAeABE12FeA81532060dcBf5
      getProfilesByOwnedBy("0x6C77a5a88C0AE712BAeABE12FeA81532060dcBf5").then((profiles) => {
        setItem(profiles.items)
        console.log('profiles', profiles)
        setLoading(false)
      })}
  }, [isOpen, address])

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Login with lens profile" className="w-full lg:w-1/4">
      <div className='flex gap-2 mt-4'>
        {
          items.map((item) => {
            return (
            <div key={item.id} className='flex items-center cursor-pointer px-4 py-2 mx-auto'>
              <div className='w-12 h-12 relative'>
                <Image src={item.avatarUrl || ""} alt="" fill className="rounded-full" />
              </div>
              <span className='ml-2'>
                {item.name}
              </span>
            </div>
            )
          })
        }
      </div>
    </Modal>
  )
}

export default MyProfilesDialog