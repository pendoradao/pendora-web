import { useContext } from 'react';

import { GlobalModalsContext } from '@context/modals';

export const useLogin = () => {
  const modalContext = useContext(GlobalModalsContext);

  const startLogin = () => {
    modalContext.loginDialog.setOpen(true);
  }

  return {
    startLogin,
  }
}