import { create } from 'zustand';
import toast from 'react-hot-toast';
import {
  UserProfileType,
  ShopCheckoutShipping,
  ShopCheckoutPayment,
  CheckoutDiscountType
} from '@ecommerce/shared/types';

type State = {
  balance: number;
  currency: string;
  searchPrompt: string;
  loggedIn: UserProfileType | null;
  cart: Map<string, number>;
  checkout: {
    user: string | null;
    cart: State['cart'];
    discount: CheckoutDiscountType | null;
    customer: {
      email: string;
      firstName: string;
      lastName: string;
      street: string;
      city: string;
      state: string;
      country: string;
      zip: string;
    };
    billing: {
      shipping: ShopCheckoutShipping;
      payment: ShopCheckoutPayment;
    };
    isPaid: boolean;
    isCompleted: boolean;
  };
};

type Action = {
  updBalance: (balance: State['balance']) => void;
  updCurrency: (currency: State['currency']) => void;
  updSearchPrompt: (searchPrompt: State['searchPrompt']) => void;
  updLoggedIn: (loggedIn: State['loggedIn']) => void;
  incCart: (key: string) => void;
  decCart: (key: string) => void;
  removeCartItem: (key: string) => void;
  clearCart: () => void;
  updCheckoutUser: (cart: State['checkout']['user']) => void;
  updCheckoutCart: (cart: State['checkout']['cart']) => void;
  updCheckoutDiscount: (cart: State['checkout']['discount']) => void;
  updCheckoutCustomer: (cart: State['checkout']['customer']) => void;
  updCheckoutBilling: (cart: State['checkout']['billing']) => void;
  updCheckoutPaid: () => void;
  updCheckoutCompleted: () => void;
};

const store = create<State & Action>((set) => ({
  balance: 3.33,
  updBalance: (newBalance) => set(() => ({ balance: newBalance })),
  currency: '€',
  updCurrency: (newCurrency) => set(() => ({ currency: newCurrency })),
  searchPrompt: '',
  updSearchPrompt: (newSearchPrompt) => set(() => ({ searchPrompt: newSearchPrompt })),
  loggedIn: null,
  updLoggedIn: (newLoggedIn) => set(() => ({ loggedIn: newLoggedIn })),
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
      if (state.cart.has(key)) {
        const upd = new Map(state.cart);
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
  },
  checkout: {
    user: null,
    cart: new Map(),
    discount: null,
    customer: {
      email: '',
      firstName: '',
      lastName: '',
      street: '',
      city: '',
      state: '',
      country: '',
      zip: ''
    },
    billing: {
      shipping: ShopCheckoutShipping.STANDARD,
      payment: ShopCheckoutPayment.CREDIT_CARD
    },
    isPaid: false,
    isCompleted: false
  },
  updCheckoutUser: (newId) => set((state) => ({ checkout: { ...state.checkout, user: newId } })),
  updCheckoutCart: (newCart) =>
    set((state) => ({ checkout: { ...state.checkout, cart: newCart } })),
  updCheckoutDiscount: (newDiscount) =>
    set((state) => ({ checkout: { ...state.checkout, discount: newDiscount } })),
  updCheckoutCustomer: (newCustomer) =>
    set((state) => ({ checkout: { ...state.checkout, customer: newCustomer } })),
  updCheckoutBilling: (newBilling) =>
    set((state) => ({ checkout: { ...state.checkout, billing: newBilling } })),
  updCheckoutPaid: () =>
    set((state) => ({ checkout: { ...state.checkout, isPaid: !state.checkout.isPaid } })),
  updCheckoutCompleted: () =>
    set((state) => ({ checkout: { ...state.checkout, isCompleted: !state.checkout.isCompleted } }))
}));

export default store;
