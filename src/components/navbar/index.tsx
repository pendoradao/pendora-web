import { useContext } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { PencilIcon } from '@heroicons/react/solid';

import { Button } from '@components/ui';
import LoginButton from './user_button';
import { GlobalModalsContext } from '@context/modals';
import { useAppPersistStore } from '@store/app';
import { useLogin } from '@lib/login';

const NavButton = ({ open }: { open: boolean }) => {
  return (
    <Disclosure.Button className="inline-flex justify-center items-center mr-4 text-gray-500 sm:hidden focus:outline-none">
      {open ? (
        <XIcon className="block w-6 h-6" aria-hidden="true" />
      ) : (
        <MenuIcon className="block w-6 h-6" aria-hidden="true" />
      )}
    </Disclosure.Button>)
}

const NavItems = () => {
  const { pathname } = useRouter();
  const navItems = [
    {
      name: 'Home',
      to: '/',
    },
    {
      name: 'Following',
      to: '/following',
    },
  ]

  return (
    <>
      {navItems.map((item) => (
        <Link key={item.name} href={item.to}
          className={clsx(
            pathname === item.to ? 'bg-zinc-200' : 'text-gray-500',
            "text-left px-2 md:px-3 py-1 font-bold cursor-pointer text-sm tracking-wide"
          )}
        >
          {item.name}
        </Link>
      ))}
    </>
  );
}

const Navbar = () => {
  const { pathname, push } = useRouter();
  const modalContext = useContext(GlobalModalsContext);
  const { startLogin } = useLogin();
  const currentUser = useAppPersistStore(state => state.currentUser);

  const handleOpenQuestionDialog = () => {
    if (currentUser) {
      modalContext?.questionDialog && modalContext.questionDialog.setOpen(true);
    } else {
      // modalContext.loginDialog.setOpen(true);
      startLogin();
    }
  }
  return (
    <Disclosure as='header' className='sticky top-0 w-full bg-white border-b z-10'>
      {({ open }) => (
        <>
          <div className="flex justify-between items-center h-14 md:px-64 px-4">
            <NavButton open={open} />
            <Link href="/" className='mr-8'>
              <h3 className='text-xl font-medium'>
                Pendora
              </h3>
            </Link>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex items-center space-x-4">
                <NavItems />
              </div>
            </div>
            <div className='flex-1'></div>
            <div className="flex gap-4 items-center mr-4">
              <Button variant='primary' onClick={handleOpenQuestionDialog} icon={<PencilIcon />} className='hidden sm:flex' size='md'>
                Ask a Question
              </Button>
              <Button variant='primary' onClick={handleOpenQuestionDialog} icon={<PencilIcon />} className='sm:hidden' size='lg'>
              </Button>
              <LoginButton />
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="flex flex-col p-3 space-y-2">
              <NavItems />
            </div>
          </Disclosure.Panel>
        </>
      )}

    </Disclosure>
  );
}

export default Navbar;