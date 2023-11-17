export type Product = {
  [key: string]: {
    id: string;
    name: string;
    sizingShort?: number | string;
    sizing: (string | number)[];
    measurement?: string;
    description: string;
    material: string[];
    content: number;
    pricePerPiece?: number;
    price: number;
    isInStock: boolean;
    tags: string[];
    image: string;
    variants?: string[];
  };
};

export type ProductShort = {
  id: string;
  name: string;
  sizingShort?: number | string;
  measurement?: string;
  description: string;
  content: number;
  pricePerPiece?: number;
  price: number;
  isInStock: boolean;
  image: string;
  variants?: string[];
};

export type Discounts = {
  [key: string]: {
    discount: number;
    system: string;
    systemReadable: string;
    expired: boolean;
  };
};

export type CartDiscount = {
  discount: number;
  system: string;
  systemReadable: string;
  expired: boolean;
};

export type DB_User = {
  login: string;
  password: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zip: string;
};

export type DB_Response<T> = {
  status: number;
  message: string;
  error?: any;
  data?: T;
};

export type UserBilling = {
  shipping: UserBillingShipping;
  payment: UserBillingPayment;
};

export enum UserBillingShipping {
  STANDARD = 'Standard',
  EXPRESS = 'Express'
}

export enum UserBillingPayment {
  ON_DELIVERY = 'Cash on delivery',
  IN_ADVANCE = 'Paid in advance',
  INVOICE = 'Invoice',
  UPON_INVOICE = 'Pay upon invoice',
  CREDIT_CARD = 'Credit or debit card'
}

export enum ShopCategories {
  HOME = 'Home',
  GARDEN = 'Garden',
  TOOLS = 'Tools',
  MISC = 'Misc'
}

// todo refactor to shared types
