import { Product } from './product';

export type User = {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phone?: string | null;
  address?: Address | Address[] | null;
  cart?: Product[];
  orders?: string[];
  createdAt: string;
  updatedAt: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};

export type Address = {
  id: string;
  street: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
};
