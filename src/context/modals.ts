import { createContext } from "react";

export interface ModalContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export interface GlobalModalsContextType {
  questionDialog: ModalContextType;
  loginDialog: ModalContextType;
}

const getDefaultContext = () => ({open: false, setOpen: (open: boolean) => {}})

const GlobalModalsContextDefault = {
  questionDialog: getDefaultContext(),
  loginDialog: getDefaultContext(),
}

export const GlobalModalsContext = createContext<GlobalModalsContextType>(GlobalModalsContextDefault)