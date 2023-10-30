import { Product } from './types';

const shopInfo = {
  name: 'DemoStore',
  money: 3.33,
  currency: '€',
  service: [
    { label: 'Newsletter', link: 'link' },
    { label: 'Merchant login', link: 'link' },
    { label: 'Contact', link: 'link' },
    { label: 'Return', link: 'link' },
    { label: 'Repair Request', link: 'link' }
  ],
  information: [
    { label: 'General terms', link: 'link' },
    { label: 'Privacy', link: 'link' },
    { label: 'Shipping and payment', link: 'link' },
    { label: 'Right of rescission', link: 'link' },
    { label: 'About', link: 'link' }
  ],
  direct: [
    { label: 'Privacy', link: 'link' },
    { label: 'Shop Service', link: 'link' },
    { label: 'Information', link: 'link' },
    { label: 'AGB', link: 'link' },
    { label: 'Contact', link: 'link' }
  ]
};

const products: Product[] = [
  {
    id: '1',
    name: 'Heavy-Duty Shovel',
    sizingShort: 106,
    sizing: ['Length: 106 cm', 'Width: 31 cm'],
    measurement: 'cm',
    description:
      'A durable and versatile heavy-duty shovel, perfect for gardening and outdoor tasks.',
    material: ['Steel', 'Wooden handle'],
    content: 1,
    pricePerPiece: 19.99,
    price: 19.99,
    isInStock: true,
    tags: ['Tools', 'Garden', 'steel', 'shovel']
  },
  {
    id: '2',
    name: 'Wooden Dining Table',
    sizingShort: '183x91x76',
    sizing: ['Length: 183 cm', 'Width: 91 cm', 'Height: 76 cm'],
    measurement: 'cm',
    description:
      'A stylish and sturdy wooden dining table, perfect for family gatherings and meals.',
    material: ['Wood', 'Metal Legs'],
    content: 1,
    pricePerPiece: 299.99,
    price: 299.99,
    isInStock: true,
    tags: ['Home', 'wood', 'table']
  },
  {
    id: '3',
    name: 'Solar-Powered Garden Lanterns',
    sizingShort: '30',
    sizing: ['Height: 30 cm'],
    measurement: 'cm',
    description:
      'A set of three elegant solar-powered garden lanterns to illuminate your outdoor space.',
    material: ['Metal', 'Glass'],
    content: 3,
    pricePerPiece: 19.99,
    price: 59.97,
    isInStock: true,
    tags: ['Garden', 'lantern', 'metal']
  },
  {
    id: '4',
    name: 'Artificial Grass Turf',
    sizingShort: '2x4',
    sizing: ['Length: 4 meters', 'Width: 2 meters'],
    measurement: 'meters',
    description:
      'High-quality artificial grass turf for landscaping, perfect for creating a lush, maintenance-free green space.',
    material: ['Synthetic Fibers', 'Rubber Base'],
    content: 5,
    pricePerPiece: 29.99,
    price: 149.95,
    isInStock: true,
    tags: ['Misc', 'grass', 'fibers', 'synthetic']
  },
  {
    id: '5',
    name: 'Camping Tent',
    sizingShort: '6',
    sizing: ['Capacity: 6 persons'],
    measurement: 'persons',
    description:
      'A roomy and durable camping tent, ideal for outdoor adventures and family camping trips.',
    material: ['Polyester', 'Fiberglass Poles'],
    content: 1,
    pricePerPiece: 129.99,
    price: 129.99,
    isInStock: true,
    tags: ['Misc', 'tent', 'polyester']
  },
  {
    id: '6',
    name: 'Inflatable Swimming Pool',
    sizingShort: '152',
    sizing: ['Diameter: 152 cm'],
    measurement: 'cm',
    description:
      'An inflatable swimming pool for kids, perfect for splashing and having fun in the sun.',
    material: ['Vinyl', 'Plastic'],
    content: 1,
    pricePerPiece: 29.99,
    price: 29.99,
    isInStock: true,
    tags: ['Garden', 'Misc', 'pool', 'vinyl']
  },
  {
    id: '7',
    name: 'Angel Garden Statue',
    sizingShort: '90',
    sizing: ['Height: 90 cm'],
    measurement: 'cm',
    description:
      'A beautifully crafted garden statue, adding a touch of elegance to your outdoor space.',
    material: ['Stone', 'Resin'],
    content: 1,
    pricePerPiece: 79.99,
    price: 79.99,
    isInStock: true,
    tags: ['Garden', 'statue', 'stone']
  },
  {
    id: '8',
    name: 'Garden Bushes Care Kit',
    sizingShort: '6-piece',
    sizing: ['Includes 6 essential tools'],
    measurement: 'set',
    description:
      'A complete garden care kit with 6 essential tools for pruning and maintaining your garden bushes.',
    material: ['Steel', 'Resin Handles'],
    content: 1,
    pricePerPiece: 39.99,
    price: 39.99,
    isInStock: true,
    tags: ['Garden', 'Tools', 'steel', 'resin']
  },
  {
    id: '9',
    name: 'Metal Outdoor Chair',
    sizingShort: '42x45x90',
    sizing: ['Length: 42 cm', 'Width: 45 cm', 'Height: 90 cm'],
    measurement: 'cm',
    description: 'A durable and stylish metal outdoor chair, perfect for your patio or garden.',
    material: ['Metal', 'Plastic Seat'],
    content: 1,
    pricePerPiece: 49.99,
    price: 49.99,
    isInStock: true,
    tags: ['Garden', 'Home', 'Misc', 'chair', 'metal', 'plastic']
  }
];

export { shopInfo, products };
