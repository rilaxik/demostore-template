export type Product = {
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
};
