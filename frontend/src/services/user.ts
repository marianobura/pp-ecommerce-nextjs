import { User } from '@/types/user';

export function getStoredUsers(): User[] {
  const data = localStorage.getItem('users');
  return data ? JSON.parse(data) : [];
}

export function saveStoredUsers(users: User[]) {
  localStorage.setItem('users', JSON.stringify(users));
}
