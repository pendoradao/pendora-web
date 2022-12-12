import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDisconnect } from 'wagmi'
import Cookies from 'js-cookie';

import { Avatar, Menu, Modal } from '@components/ui';
import { getAvatarUrl } from '@lib/profile';
import { useAppPersistStore, useAppStore } from '@store/app';
import Login from '@components/login';
import { LOCAL_STORAGE_KEY } from '@constants';

interface MenuItemType {
  label: string;
  onClick: () => void;
}

const UserButton = () => {
  const { push } = useRouter();
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const { disconnect } = useDisconnect();

  const profiles = useAppStore((state) => state.profiles);
  const isConnected = useAppPersistStore((state) => state.isConnected);
  const isAuthenticated = useAppPersistStore((state) => state.isAuthenticated);
  const currentUser = useAppPersistStore((state) => state.currentUser);
  const setCurrentUser = useAppPersistStore((state) => state.setCurrentUser);
  const staffMode = useAppPersistStore((state) => state.staffMode);
  const setStaffMode = useAppPersistStore((state) => state.setStaffMode);

  useEffect(() => {
    if (isAuthenticated && !currentUser) {
      const user = profiles.find((profile) => profile.id === localStorage.getItem(LOCAL_STORAGE_KEY));
      setCurrentUser(user || null);
    }
    if (isAuthenticated && currentUser) {
      setShowLoginModal(false);
    }
  }, [isAuthenticated, currentUser, profiles, setCurrentUser]);


  const loginedMenuItemsGroups = [
    [
      {
        label: currentUser?.handle || '',
        onClick: () => { currentUser?.id && push(`/u/${currentUser?.id}`) }
      },
    ],
    [
      {
        label: 'Logout',
        onClick: () => Logout(),
      }
    ]
  ]

  const connectedMenuItemsGroups = [
    [
      {
        label: 'Sign in with Lens',
        onClick: () => setShowLoginModal(true),
      }
    ],
    [
      {
        label: 'Logout',
        onClick: () => Logout(),
      }
    ]
  ]

  const unloginedMenuItemsGroups = [
    [
      {
        label: 'Sign in with Lens',
        onClick: () => setShowLoginModal(true),
      }
    ]
  ]

  const Logout = () => {
    setCurrentUser(null);
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    if (disconnect) disconnect();
  }
  // fix Hydration failed error
  if (!domLoaded) return null;

  let menuItemsGroups: MenuItemType[][];

  if (isAuthenticated && currentUser) {
    menuItemsGroups = loginedMenuItemsGroups
  } else if (isConnected) {
    menuItemsGroups = connectedMenuItemsGroups
  } else {
    menuItemsGroups = unloginedMenuItemsGroups
  }

  return (
    <>
      <Modal
        title="Login"
        open={showLoginModal}
        setOpen={setShowLoginModal}
        className='w-full md:w-1/4 '
      >
        <Login />
      </Modal>
      <Menu items={menuItemsGroups} classNameMenu='h-12'>  {/* fix menu height*/}
        <Avatar avatarUrl={currentUser && getAvatarUrl(currentUser)}></Avatar>
      </Menu>
    </>
  )
}

export default UserButton;