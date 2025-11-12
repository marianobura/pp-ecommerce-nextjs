'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

type ProfileFormContextType = {
  submit: () => void;
  setSubmit: (fn: () => void) => void;
  isSubmitting: boolean;
  setIsSubmitting: (loading: boolean) => void;
};

const ProfileFormContext = createContext<ProfileFormContextType | undefined>(undefined);

export function ProfileFormProvider({ children }: { children: ReactNode }) {
  const [submitFunction, setSubmitFunction] = useState<() => void>(() => () => {});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setSubmit = useCallback((fn: () => void) => {
    setSubmitFunction(() => fn);
  }, []);

  const value = {
    submit: submitFunction,
    setSubmit,
    isSubmitting,
    setIsSubmitting,
  };

  return <ProfileFormContext.Provider value={value}>{children}</ProfileFormContext.Provider>;
}

export function useProfileForm() {
  const context = useContext(ProfileFormContext);
  if (!context) {
    throw new Error('useProfileForm must be used within a ProfileFormProvider');
  }
  return context;
}
