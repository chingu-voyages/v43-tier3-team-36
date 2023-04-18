import { create } from 'zustand';

export type TAlertType = 'error' | 'success' | 'info';

export interface IAlert {
  type?: TAlertType;
  message?: string;
}

type TStoreState = {
  alert: IAlert;
  setAlert: (alert: IAlert) => void;
  resetAlert: () => void;
};

const useAlertStore = create<TStoreState>((set, get) => ({
  alert: { type: undefined, message: undefined },
  setAlert: ({ type, message }) => {
    set((state) => ({
      alert: {
        ...state,
        type,
        message,
      },
    }));
    // reset alert state after 2 seconds
    setTimeout(() => {
      get().resetAlert();
    }, 2000);
  },
  resetAlert: () => set((state) => ({
    alert: {
      ...state,
      type: undefined,
      message: undefined,
    },
  })),
}));

export default useAlertStore;
