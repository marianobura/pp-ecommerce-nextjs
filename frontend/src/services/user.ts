import { User } from '@/types/user';

export function getStoredUsers(): User[] {
  const data = localStorage.getItem('users');
  return data ? JSON.parse(data) : [];
}

export function saveStoredUsers(users: User[]) {
  localStorage.setItem('users', JSON.stringify(users));
}

export async function updateUserProfile(userId: string, data: Partial<User>) {
  const users = getStoredUsers();
  const userIndex = users.findIndex((u) => u.id === userId);
  const authData = localStorage.getItem('auth');

  if (userIndex === -1) {
    throw new Error('User not found');
  }

  const updatedUser = { ...users[userIndex], ...data, updatedAt: new Date().toISOString() };
  if (authData) {
    const auth = JSON.parse(authData);
    if (auth.user.id === userId) {
      const updatedAuth = { ...auth, user: updatedUser };
      localStorage.setItem('auth', JSON.stringify(updatedAuth));
    }
  }
  users[userIndex] = updatedUser;
  saveStoredUsers(users);

  return updatedUser;
}
