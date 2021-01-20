import en from 'src/i18n/en.json';
import ru from 'src/i18n/ru.json';
import upperFirst from 'src/utils/upper-first';
import { useLocale } from './use-locale';

const locales = {
  en,
  ru,
};

export default function useTranslations() {
  const locale = useLocale();

  return (key: keyof typeof ru, { capitalize = true }: { capitalize?: boolean } = {}): string => {
    if (!(key.toLowerCase() in locales[locale])) {
      throw new Error(`Missing key ${key.toLowerCase()} in locale ${locale}`);
    }

    const value = locales[locale][key.toLowerCase()];
    return capitalize ? upperFirst(value) : value;
  };
}
