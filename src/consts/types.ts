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
};

export enum ShopCategories {
  HOME = 'Home',
  GARDEN = 'Garden',
  TOOLS = 'Tools',
  MISC = 'Misc'
}
