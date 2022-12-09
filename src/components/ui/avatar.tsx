import clsx from 'clsx';
import Image from 'next/image';
import { UserCircleIcon } from '@heroicons/react/solid';

import type { FC, ReactNode } from 'react';

interface Props {
  avatarUrl: string | undefined; 
  className?: string;
}

export const Avatar: FC<Props> =  ({avatarUrl, className=''}: Props) => {
  return (
    <div className={`w-12 h-12 relative ${className}`}>
      {avatarUrl ? <Image src={avatarUrl || ""} alt="" fill className="rounded-full" />: <UserCircleIcon className='text-zinc-400'/>}
    </div>
  )
}