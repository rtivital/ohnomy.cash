import React, { useState, createContext } from 'react';
import { useLocalStorage } from 'xooks';

export type Locale = 'en' | 'ru';

export const LocaleContext = createContext<{ locale: Locale; setLocale(locale: Locale): void }>(
  null
);

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
