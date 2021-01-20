import en from 'src/translations/en.json';
import ru from 'src/translations/ru.json';
import { useLocale } from './use-locale';

const locales = {
  en,
  ru,
};

function capitalizeString(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function useTranslations() {
  const locale = useLocale();

  return (key: keyof typeof ru, { capitalize = true }: { capitalize?: boolean } = {}): string => {
    if (!(key.toLowerCase() in locales[locale])) {
      throw new Error(`Missing key ${key.toLowerCase()} in locale ${locale}`);
    }

    const value = locales[locale][key.toLowerCase()];
    return capitalize ? capitalizeString(value) : value;
  };
}
