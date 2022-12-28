// import Image from 'next/image';
import { UserCircleIcon } from '@heroicons/react/solid';

import type { FC } from 'react';

interface Props {
  avatarUrl: string | undefined | null;
  onClick?: () => void;
  className?: string;
}

export const Avatar: FC<Props> = ({ avatarUrl, onClick, className = '' }) => {
  return (
    <div className={`w-12 h-12 relative ${className}`} onClick={onClick}>
      {
        avatarUrl ?
          // <Image src={avatarUrl || ""} alt="" fill className="rounded-full" /> :
          <img src={avatarUrl || ""} alt="" className="rounded-full" /> :
          <UserCircleIcon className='text-zinc-400' />
      }
    </div>
  )
}