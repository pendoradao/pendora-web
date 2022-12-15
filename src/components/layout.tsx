import { ReactNode, useState } from 'react'
import QuestionDialog from '@components/publication/question_dialog';
import { ModalContext, Modals } from '@context/modals';
import Footer from './footer'
import Narbar from './navbar'


export default function Layout({ children }: { children: ReactNode }) {
  const [questionDialogOpen, setQuestionDialogOpen] = useState<boolean>(false);
  const modalContext = {
    questionDialog: {
      open: questionDialogOpen,
      setOpen: setQuestionDialogOpen,
    },
  } as Modals;

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