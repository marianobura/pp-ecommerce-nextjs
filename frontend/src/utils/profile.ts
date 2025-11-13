import { User, Address } from '@/types/user';

/**
 * Get the initial address from the user's address data.
 */
export const getInitialAddress = (address: User['address']): Address => {
  const emptyAddress = { id: '', street: '', city: '', state: '', postalCode: '', country: '' };

  if (!address) return emptyAddress;
  if (Array.isArray(address)) {
    return address.length > 0 ? address[0] : emptyAddress;
  }
  return address;
};

/**
 * Generate the profile form configuration.
 * Depends on the user data to pre-fill certain fields.
 */
export const getProfileFormConfig = (user: User | null) => [
  {
    label: 'Name',
    editable: true,
    fields: [
      { name: 'firstName', placeholder: 'First Name' },
      { name: 'lastName', placeholder: 'Last Name' },
    ],
  },
  {
    label: 'Email Address',
    editable: false,
    fields: [{ name: 'email', value: user?.email || '', placeholder: 'Email' }],
  },
  {
    label: 'Phone Number',
    editable: true,
    fields: [{ name: 'phone', placeholder: 'Add phone number' }],
  },
];
