import { create } from 'zustand';

type State = {
  balance: number;
  currency: string;
  // cart: Record<number, number>
};

type Action = {
  updBalance: (balance: State['balance']) => void;
  updCurrency: (currency: State['currency']) => void;
  // updCart: (currency: State['currency']) => void;
};

const store = create<State & Action>((set) => ({
  balance: 3.33,
  updBalance: (newBalance) => set(() => ({ balance: newBalance })),
  currency: '€',
  updCurrency: (newCurrency) => set(() => ({ currency: newCurrency }))
}));

export default store;
