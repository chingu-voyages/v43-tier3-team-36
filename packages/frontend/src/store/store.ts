import { create } from 'zustand';

interface IAlert {
  type: string;
  message: string;
}

const UseAlertStore = create((set) => ({
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

export default UseAlertStore;
