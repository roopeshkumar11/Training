import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Nike Air Max Pulse',
    brand: 'Nike Sportswear',
    price: 159.99,
    rating: 4.8,
    reviewsCount: 342,
    description:
      'The Air Max Pulse pulls inspiration from the London music scene, bringing an underground touch to the iconic Air Max line. Its point-loaded Air cushioning revamps the incredibly plush Air Max 270 for better bounce.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    colors: ['#E63946', '#1D3557', '#333333'],
    sizes: [7, 8, 9, 10, 11],
  },
  {
    id: 'prod-2',
    name: 'Adidas Ultraboost Light',
    brand: 'Adidas Performance',
    price: 189.99,
    rating: 4.9,
    reviewsCount: 512,
    description:
      'Experience epic energy with the new Ultraboost Light, our lightest Ultraboost ever. The magic lies in the Light BOOST midsole, a new generation of adidas BOOST cushioning.',
    image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=800&q=80',
    colors: ['#2A9D8F', '#264653', '#E76F51'],
    sizes: [8, 9, 10, 11, 12],
  },
  {
    id: 'prod-3',
    name: 'Puma RS-X Futuristic',
    brand: 'Puma Lifestyle',
    price: 129.99,
    rating: 4.6,
    reviewsCount: 198,
    description:
      'RS-X is back. The future-retro silhouette of this sneaker returns with progressive aesthetic and angular details, complete with nubuck and suede overlays.',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
    colors: ['#F4A261', '#2A9D8F', '#1F2937'],
    sizes: [7, 8, 9, 10],
  },
];
