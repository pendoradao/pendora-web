import { ReactNode, useState } from 'react'

import QuestionDialog from '@components/publication/question_dialog';
import LoginDialog from '@components/login/login_dialog';
import { GlobalModalsContext, GlobalModalsContextType } from '@context/modals';

import Footer from './footer'
import Narbar from './navbar'

export default function Layout({ children }: { children: ReactNode }) {
  const [questionDialogOpen, setQuestionDialogOpen] = useState<boolean>(false);
  const [LoginDialogOpen, setLoginDialogOpen] = useState<boolean>(false);
  const globalModalsContext = {
    questionDialog: {
      open: questionDialogOpen,
      setOpen: setQuestionDialogOpen,
    },
    loginDialog: {
      open: LoginDialogOpen,
      setOpen: setLoginDialogOpen,
    } 
  } as GlobalModalsContextType;

  return (
    <>
      <GlobalModalsContext.Provider value={globalModalsContext}>
        <>
          <QuestionDialog 
            open={globalModalsContext.questionDialog.open} 
            setOpen={globalModalsContext.questionDialog.setOpen}
          ></QuestionDialog>
          <LoginDialog
            open={globalModalsContext.loginDialog.open}
            setOpen={globalModalsContext.loginDialog.setOpen}
          ></LoginDialog>
        </>
        <Narbar />
        <div className="min-h-screen" style={{ minHeight: '100vh', marginTop: 12 }}>
          <main>{children}</main>
        </div>
        <Footer />
      </GlobalModalsContext.Provider>
    </>
  )
}