import { create } from 'zustand';
import type { CurrentUser } from '@/types';

interface UserState {
  user: CurrentUser | null;
  isAuthenticated: boolean;
  setUser: (user: CurrentUser) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
