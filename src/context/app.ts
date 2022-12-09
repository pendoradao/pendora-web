import { createContext } from "react";

import { Profile } from "@types";

export interface IUserContext {
  token?: string;
  setToken?: (token: string) => void;
  profile?: Profile;
  setProfile?: (profile: Profile) => void;
}

export const UserContext = createContext<IUserContext>({});