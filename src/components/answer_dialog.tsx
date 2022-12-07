import { useState } from 'react'
import { Dialog } from '@headlessui/react'

import { Question } from '@types';
import { Button } from '@components/ui';

interface AnswerDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  question: Question;
}

function AnswerDialog(answerDialogProps: AnswerDialogProps) {
  let { isOpen, setIsOpen, question } = answerDialogProps
  const PostAnswer = () => {
    console.log('post answer')
  }

  return (
    <Dialog as="div" className="absolute z-10" open={isOpen} onClose={() => setIsOpen(false)}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="mx-auto bg-white w-full lg:w-2/5  p-4 mx-2">
          <Dialog.Title className="text-xl font-medium">{question.title}</Dialog.Title>
          <Dialog.Description>
            {question.content}
          </Dialog.Description>

          <div className='mt-4'>
            <textarea rows={25} className='w-full border border-zinc-300 disabled:bg-gray-500 disabled:bg-opacity-20 disabled:opacity-60 focus:border-brand-500 focus:ring-brand-400'></textarea>
          </div>

          <div className='flex gap-2 mt-4'>
            <div className='grow'></div>
            <Button onClick={() => setIsOpen(false)} outline>Cancel</Button>
            <Button onClick={PostAnswer}>Post</Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default AnswerDialog