import { useState, useEffect } from 'react';
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
      getProfilesByOwnedBy(address).then((profiles) => {
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
            <div className='flex items-center cursor-pointer border px-4 py-2 mx-auto'>
              <img src={item.avatarUrl} className="w-10 h-10 rounded-full" />
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