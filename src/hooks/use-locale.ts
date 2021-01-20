import { useContext } from 'react';
import { LocaleContext } from 'src/providers/LocaleProvider';

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
