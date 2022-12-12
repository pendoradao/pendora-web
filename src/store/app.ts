/* eslint-disable no-unused-vars */
import { createContext } from "react";
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { Profile } from "@generated/types";
import { LOCAL_STORAGE_KEY } from "@constants";

export interface IUserContext {
  token?: string;
  setToken?: (token: string) => void;
  profile?: Profile;
  setProfile?: (profile: Profile) => void;
}

export const UserContext = createContext<IUserContext>({});

interface AppState {
  profiles: Profile[] | [];
  setProfiles: (profiles: Profile[]) => void;
  userSigNonce: number;
  setUserSigNonce: (userSigNonce: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  profiles: [],
  setProfiles: (profiles) => set(() => ({ profiles })),
  userSigNonce: 0,
  setUserSigNonce: (userSigNonce) => set(() => ({ userSigNonce }))
}));

interface AppPersistState {
  isConnected: boolean;
  setIsConnected: (isConnected: boolean) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  currentUser: Profile | null;
  setCurrentUser: (currentUser: Profile | null) => void;
  staffMode: boolean;
  setStaffMode: (staffMode: boolean) => void;
}

export const useAppPersistStore = create(
  persist<AppPersistState>(
    (set) => ({
      isConnected: false,
      setIsConnected: (isConnected) => set(() => ({ isConnected })),
      isAuthenticated: false,
      setIsAuthenticated: (isAuthenticated) => set(() => ({ isAuthenticated })),
      currentUser: null,
      setCurrentUser: (currentUser) => set(() => ({ currentUser })),
      staffMode: false,
      setStaffMode: (staffMode) => set(() => ({ staffMode }))
    }),
    { name: LOCAL_STORAGE_KEY }
  )
);
