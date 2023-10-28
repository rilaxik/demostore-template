import { create } from 'zustand';

type State = {
  balance: number;
  currency: string;
};

type Action = {
  updBalance: (balance: State['balance']) => void;
  updCurrency: (currency: State['currency']) => void;
};

const store = create<State & Action>((set) => ({
  balance: 3.33,
  updBalance: (newBalance) => set(() => ({ balance: newBalance })),
  currency: 'eur',
  updCurrency: (newCurrency) => set(() => ({ currency: newCurrency }))
}));

export default store;
