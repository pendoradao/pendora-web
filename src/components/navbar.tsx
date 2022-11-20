import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

import ProfileButton from './profile_button';

const NavItems = [
  {
    name: 'Home',
    to: '/',
  },
  {
    name: 'explore',
    to: '/explore',
  },
  {
    name: 'following',
    to: '/following',
  },
]

const Navbar = () => {
  const { pathname } = useRouter();

  return (
    <header className='sticky top-0 bg-white'>
      <div className="flex justify-between items-center h-14 border-b px-14">
        <Link href="/" className='mr-8'>
          <h3 className='text-xl font-medium'>
            Pendora
          </h3>
        </Link>
        {
          NavItems.map((item, index) => (
            <Link href={item.to} key={index} className={
              clsx(
                pathname === item.to ? 'bg-zinc-200' : 'text-gray-500',
                "text-left px-2 md:px-3 py-1 font-bold cursor-pointer text-sm tracking-wide"
              )
            }>
              {item.name}
            </Link>
          ))
        }
        <div className='flex-1'></div>
        <div className="flex gap-4 items-center">
          <ProfileButton />
        </div>
      </div>
    </header>
  );
}

export default Navbar;