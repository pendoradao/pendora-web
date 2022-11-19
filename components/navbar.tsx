import Link from 'next/link';

import ProfileButton from './profile_button';

const NavTabs = [
  {
    name: 'Docmentations',
    to: '/docs',
  },
  {
    name: 'Dashboard',
    to: '/dashboard',
  },
  {
    name: 'FAQ',
    to: '/faq',
  },
]

const Navbar = () => {
  return (
    <header>
      <div className="flex relative justify-between items-center h-14 border-b px-14">
        <Link href="/" >
          <h3 className='text-xl font-medium'>
            Pendora
          </h3>
        </Link>
        <div  className="flex gap-4 items-center">
          <ProfileButton/>
        </div>
      </div>
    </header>
  );
}

export default Navbar;