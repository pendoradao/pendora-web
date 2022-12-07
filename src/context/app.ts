import { createContext } from "react";

export interface IUserContext {
  token?: string;
  setToken?: (token: string) => void;
}

export const UserContext = createContext<IUserContext>({});