import {create} from 'zustand';

type AuthState = {
  isLoading: boolean;
  token: string | null;
  login: () => void;
  logout: () => void;
  finishLoading: () => void;
};

export const useAuthStore = create<AuthState>(set => ({
  isLoading: true,
  token: null,

  login: () => set({token: 'fake-token'}),
  logout: () => set({token: null}),
  finishLoading: () => set({isLoading: false}),
}));