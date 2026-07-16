import { Product } from './Products';

export interface CartItem {
  product: Product; 
  quantity: number;
  _id: string;
}

export interface Cart {
  _id: string;
  user: string; 
  products: CartItem[]; 
  createdAt: string;
  updatedAt: string;
}

