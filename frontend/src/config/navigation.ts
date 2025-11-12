import { CreditCard, Lock, ShoppingBasket, User } from 'lucide-react';

export const PROFILE_MENU_ITEMS = [
  { label: 'Personal Information', icon: User, redirect: '/profile' },
  { label: 'My Orders', icon: ShoppingBasket, redirect: '/profile/orders' },
  { label: 'Payment Methods', icon: CreditCard, redirect: '/profile/payment' },
  { label: 'Change Password', icon: Lock, redirect: '/profile/password' },
];

export const PROFILE_BUTTON_DATA = [
  { path: '/profile', label: 'Update profile' },
  { path: '/profile/payment', label: 'Update payment method' },
  { path: '/profile/password', label: 'Change password' },
];
