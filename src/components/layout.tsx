import { ReactNode, useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { useAccount, useDisconnect, useNetwork } from 'wagmi';

import { useAppPersistStore, useAppStore } from '@store/app';
import { CHAIN_ID, LOCAL_STORAGE_KEY } from '@constants';
import QuestionDialog from '@components/publication/question_dialog';
import { ModalContext, Modals } from '@context/modals';
import Footer from './footer'
import Narbar from './navbar'


export default function Layout({ children }: { children: ReactNode }) {
  const setProfiles = useAppStore((state) => state.setProfiles);
  const setUserSigNonce = useAppStore((state) => state.setUserSigNonce);
  const isConnected = useAppPersistStore((state) => state.isConnected);
  const setIsConnected = useAppPersistStore((state) => state.setIsConnected);
  const isAuthenticated = useAppPersistStore((state) => state.isAuthenticated);
  const setIsAuthenticated = useAppPersistStore((state) => state.setIsAuthenticated);
  const currentUser = useAppPersistStore((state) => state.currentUser);
  const setCurrentUser = useAppPersistStore((state) => state.setCurrentUser);

  const [mounted, setMounted] = useState<boolean>(false);
  const { address, isDisconnected } = useAccount();
  const { chain } = useNetwork();
  const { disconnect } = useDisconnect();
  const [questionDialogOpen, setQuestionDialogOpen] = useState<boolean>(false);
  const modalContext = {
    questionDialog: {
      open: questionDialogOpen,
      setOpen: setQuestionDialogOpen,
    },
  } as Modals;

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');
    const currentUserAddress = currentUser?.ownedBy;
    setMounted(true);

    const logout = () => {
      setIsAuthenticated(false);
      setIsConnected(false);
      setCurrentUser(null);
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      if (disconnect) disconnect();
    };

    if (
      refreshToken &&
      accessToken &&
      accessToken !== 'undefined' &&
      refreshToken !== 'undefined' &&
      currentUser &&
      chain?.id === CHAIN_ID
    ) {
      setIsAuthenticated(true);
    } else {
      if (isAuthenticated) logout();
    }

    if (isDisconnected) {
      if (disconnect) disconnect();
      setIsAuthenticated(false);
      setIsConnected(false);
    }

    if (currentUserAddress !== undefined && currentUserAddress !== address) {
      logout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, isAuthenticated, isDisconnected, address, chain, currentUser, disconnect, setCurrentUser]);

  return (
    <>
      <ModalContext.Provider value={modalContext}>
        <QuestionDialog open={questionDialogOpen} setOpen={setQuestionDialogOpen}></QuestionDialog>
        <Narbar />
        <div className="min-h-screen" style={{ minHeight: '100vh', marginTop: 12 }}>
          <main>{children}</main>
        </div>
        <Footer />
      </ModalContext.Provider>
    </>
  )
}