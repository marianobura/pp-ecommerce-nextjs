import { User, Address } from '@/types/user';

/**
 * Get the initial address from the user's address data.
 */
export const getInitialAddress = (address: User['address']): Address => {
  const emptyAddress = { street: '', city: '', state: '', postalCode: '', country: '' };

  if (!address) return emptyAddress;
  if (Array.isArray(address)) {
    return address.length > 0 ? address[0] : emptyAddress;
  }
  return address;
};
