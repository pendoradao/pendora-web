import type { FC, ReactNode } from 'react';
import { Dialog } from '@headlessui/react'
import clsx from 'clsx';

interface IModal {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title?: string
  content?: string
  children: ReactNode;
  className?: string;
}

export const Modal: FC<IModal> = ({ isOpen, setIsOpen, title, content, children, className }) => {
  return (
    <Dialog as="div" className="absolute z-10" open={isOpen} onClose={() => setIsOpen(false)}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center">
      <Dialog.Panel className={clsx("mx-auto bg-white p-4 mx-2", className)}>
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