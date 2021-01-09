import React, { useState, createContext, useContext } from 'react';
import { useLocalStorage } from 'xooks';

export type Locale = 'en' | 'ru';

export const LocaleContext = createContext<{ locale: Locale; setLocale(locale: Locale): void }>({
  locale: 'en',
  setLocale: (f) => f,
});

function useLocaleContext() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error('LocaleContext not found');
  }

  return context;
}

export function useLocale() {
  return useLocaleContext().locale;
}

export function useSetLocale() {
  return useLocaleContext().setLocale;
}

interface LocaleProviderProps {
  defaultLocale?: Locale;
  children: React.ReactNode;
}

export function LocaleProvider({ children, defaultLocale }: LocaleProviderProps) {
  const ls = useLocalStorage<Locale>({ key: '@ohnomycash/locale', delay: 10 });
  const [locale, setLocale] = useState(ls.retrieve() || defaultLocale || 'en');

  const handleLocaleChange = (value: Locale) => {
    ls.save(value);
    setLocale(value);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale: handleLocaleChange }}>
      {children}
    </LocaleContext.Provider>
  );
}
