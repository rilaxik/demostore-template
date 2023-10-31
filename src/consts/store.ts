import { create } from 'zustand';
import toast from 'react-hot-toast';
import { ShopCategories } from './';

type State = {
  balance: number;
  currency: string;
  category: ShopCategories | null;
  searchPrompt: string;
  cart: Map<string, number>;
};

type Action = {
  updBalance: (balance: State['balance']) => void;
  updCurrency: (currency: State['currency']) => void;
  updCategory: (category: State['category']) => void;
  updSearchPrompt: (searchPrompt: State['searchPrompt']) => void;
  incCart: (key: string) => void;
  decCart: (key: string) => void;
  removeCartItem: (key: string) => void;
  clearCart: () => void;
};

const store = create<State & Action>((set) => ({
  balance: 3.33,
  updBalance: (newBalance) => set(() => ({ balance: newBalance })),
  currency: '€',
  updCurrency: (newCurrency) => set(() => ({ currency: newCurrency })),
  category: null,
  updCategory: (newCategory) => set(() => ({ category: newCategory })),
  searchPrompt: '',
  updSearchPrompt: (newSearchPrompt) => set(() => ({ searchPrompt: newSearchPrompt })),
  cart: new Map(),
  incCart: (key: string) => {
    set((state) => {
      const upd = new Map(state.cart);
      if (!state.cart.has(key)) {
        upd.set(key, 1);
        toast.success('Item added to cart');
        return { cart: upd };
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        upd.set(key, 1 + state.cart.get(key));
        toast('Item quantity changed', {
          icon: '🔄'
        });
        return { cart: upd };
      }
    });
  },
  decCart: (key: string) => {
    set((state) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore wrong 'possibly undefined'
      if (state.cart.has(key) && state.cart.get(key) > 1) {
        const upd = new Map(state.cart);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        upd.set(key, state.cart.get(key) - 1);
        toast('Item quantity changed', {
          icon: '🔄'
        });
        return { cart: upd };
      } else if (state.cart.has(key) && state.cart.get(key) === 1) {
        const upd = new Map(state.cart);
        upd.delete(key);
        toast.error('Item deleted from cart');
        return { cart: upd };
      } else {
        return { cart: state.cart };
      }
    });
  },
  removeCartItem: (key: string) => {
    set((state) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (state.cart.has(key)) {
        const upd = new Map(state.cart);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore wrong 'possibly undefined'
        upd.delete(key);
        toast.error('Item deleted from cart');
        return { cart: upd };
      } else {
        return { cart: state.cart };
      }
    });
  },
  clearCart: () => {
    set(() => {
      const upd = new Map();
      return { cart: upd };
    });
  }
}));

export default store;
