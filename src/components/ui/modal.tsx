import type { FC, ReactNode } from 'react';
import { Dialog } from '@headlessui/react'
import clsx from 'clsx';
import { XCircleIcon } from '@heroicons/react/outline';

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: ReactNode;
  content?: string;
  children: ReactNode;
  className?: string;
}

export const Modal: FC<ModalProps> = ({ open, setOpen, title, content, children, className }) => {
  return (
    <Dialog as="div" className="absolute z-10" open={open} onClose={() => {}}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center">
      <Dialog.Panel className={clsx("mx-auto bg-white px-4 py-6 mx-2 relative rounded", className)}>
        <XCircleIcon className="absolute top-4 right-4 w-6 h-6 text-gray-500 cursor-pointer" onClick={() => setOpen(false)} />
        <Dialog.Title className="text-xl font-medium">{title}</Dialog.Title>
        <Dialog.Description>
          {content}
        </Dialog.Description>
        {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}