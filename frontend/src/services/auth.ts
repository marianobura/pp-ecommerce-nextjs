import { User } from '@/types/user';
import { getStoredUsers, saveStoredUsers } from './user';

type StoredAuth = {
  token: string;
  user: User;
};

type RegisterData = Pick<User, 'email' | 'password' | 'firstName' | 'lastName'> & {
  phone?: string;
};

function getStoredAuth(): StoredAuth | null {
  const data = localStorage.getItem('auth');
  return data ? JSON.parse(data) : null;
}

function saveStoredAuth(auth: StoredAuth) {
  localStorage.setItem('auth', JSON.stringify(auth));
}

export async function getStoredAuthData(): Promise<StoredAuth | null> {
  return getStoredAuth();
}

export async function logoutUser() {
  localStorage.removeItem('auth');
}

export async function loginUser(email: string, password: string): Promise<StoredAuth> {
  const users = getStoredUsers();
  const foundUser = users.find((u) => u.email === email && u.password === password);

  if (!foundUser) {
    throw new Error('Invalid credentials');
  }

  const token = crypto.randomUUID();
  const authData = { token, user: foundUser };

  saveStoredAuth(authData);
  return authData;
}

export async function registerUser(userData: RegisterData): Promise<StoredAuth> {
  const users = getStoredUsers();

  if (users.some((u) => u.email === userData.email)) {
    throw new Error('User already exists');
  }

  const newUser: User = {
    id: crypto.randomUUID(),
    email: userData.email,
    password: userData.password,
    firstName: userData.firstName,
    lastName: userData.lastName,
    fullName: `${userData.firstName} ${userData.lastName}`,
    phone: userData.phone ?? null,
    address: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    cart: [],
    orders: [],
  };

  const updatedUsers = [...users, newUser];
  saveStoredUsers(updatedUsers);

  const token = crypto.randomUUID();
  const authData = { token, user: newUser };
  saveStoredAuth(authData);

  return authData;
}
