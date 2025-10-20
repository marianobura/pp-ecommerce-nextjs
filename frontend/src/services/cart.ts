import { Product } from '@/types/product';
import { User } from '@/types/user';

function getStoredAuth() {
  const raw = localStorage.getItem('auth');
  return raw ? JSON.parse(raw) : null;
}

function saveStoredAuth(auth: any) {
  localStorage.setItem('auth', JSON.stringify(auth));
}

function getStoredUsers(): User[] {
  const raw = localStorage.getItem('users');
  return raw ? JSON.parse(raw) : [];
}

function saveStoredUsers(users: User[]) {
  localStorage.setItem('users', JSON.stringify(users));
}

function persistCartUpdate(newCart: Product[]) {
  const auth = getStoredAuth();
  if (!auth) return;

  const users = getStoredUsers();
  const updatedUsers = users.map((u) => (u.id === auth.user.id ? { ...u, cart: newCart } : u));

  saveStoredUsers(updatedUsers);
  saveStoredAuth({
    ...auth,
    user: { ...auth.user, cart: newCart },
  });
}

export function getCart(): Product[] {
  const auth = getStoredAuth();
  return auth?.user?.cart || [];
}

export function addProductToCart(product: Product): Product[] {
  const cart = getCart();

  if (cart.some((p) => p.id === product.id)) return cart;

  const newCart = [...cart, product];
  persistCartUpdate(newCart);
  return newCart;
}

export function removeProductFromCart(id: Product['id']): Product[] {
  const cart = getCart();
  const newCart = cart.filter((p) => p.id !== id);
  persistCartUpdate(newCart);
  return newCart;
}

export function clearCartService() {
  persistCartUpdate([]);
}
