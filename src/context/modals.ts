import { createContext } from "react";

export interface ModalContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export interface Modals {
  questionDialog?: ModalContextType;
}

export const ModalContext = createContext<Modals>({})