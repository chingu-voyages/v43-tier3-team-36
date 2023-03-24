import { create } from 'zustand';
import { IAlert } from '@/components/ui/Alert';

export const User = create((set) => ({
  user: {},
  setUser: (userDetails: object) => set((state: any) => ({
    user: {
      ...state.userDetails,
      ...userDetails,
    },
  })),
}));

export const UseAlertStore = create((set) => ({
  alert: { type: '', message: '' },
  setAlert: ({ type, message }: IAlert) => set((state: any) => ({
    alert: {
      ...state.alert,
      type,
      message,
    },
  })),
  resetAlert: () => set((state: any) => ({
    alert: {
      ...state.alert,
      type: '',
      message: '',
    },
  })),
}));
