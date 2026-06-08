import { create } from 'zustand';
import { ChildInfo, UserStats } from '@/types';
import { mockChildInfo, mockUserStats } from '@/data/mockUser';

interface UserStore {
  childInfo: ChildInfo;
  stats: UserStats;
  points: number;
  setChildInfo: (info: ChildInfo) => void;
  addPoints: (amount: number) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  childInfo: mockChildInfo,
  stats: mockUserStats,
  points: 420,

  setChildInfo: (info) => set({ childInfo: info }),
  addPoints: (amount) => set((state) => ({ points: state.points + amount }))
}));
