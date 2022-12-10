import { useState, useEffect } from 'react';
import { useDisconnect } from 'wagmi'
import Cookies from 'js-cookie';

import { Avatar, Menu, Modal } from '@components/ui';
import { useAppPersistStore, useAppStore } from '@store/app';
import Login from '@components/login';
import { LOCAL_STORAGE_KEY } from '@constants';

interface MenuItemType {
  label: string;
  onClick: () => void;
}

interface ConnectedButtonProps {
  menuItemsGroups: MenuItemType[][];
}

const ConnectedButton = ({ menuItemsGroups }: ConnectedButtonProps) => {
  const currentUser = useAppPersistStore((state) => state.currentUser);

  return (
    <Menu items={menuItemsGroups} classNameMenu='h-12'>  {/* fix menu height*/}
      <Avatar avatarUrl={currentUser?.avatarUrl}></Avatar>

    </Menu>
  )
}

const UserButton = () => {
  // const  { profile }  = useContext(UserContext)
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

  const loginedMenuItemsGroups = [
    [
      {
        label: 'Profile',
        onClick: () => console.log('Profile'),
      },
      {
        label: 'Choose Login Account',
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
        label: 'Logout',
        onClick: () => Logout(),
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
  // https://stackoverflow.com/questions/71706064/react-18-hydration-failed-because-the-initial-ui-does-not-match-what-was-render
  if (!domLoaded) return null;

  return (
    isAuthenticated && currentUser ? (
      <ConnectedButton menuItemsGroups={loginedMenuItemsGroups}></ConnectedButton>
    ) : 
    <>
          <Modal
            title="Login"
            isOpen={showLoginModal}
            setIsOpen={setShowLoginModal}
          >
            <Login />
          </Modal>
    {
      isConnected ? (
        <ConnectedButton menuItemsGroups={unloginedMenuItemsGroups}></ConnectedButton>
      ) : (
        
          <Avatar avatarUrl='' onClick={() => setShowLoginModal(!showLoginModal)}></Avatar>
      )
      }
        </>


  )
}

export default UserButton;