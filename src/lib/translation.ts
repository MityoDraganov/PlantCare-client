import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from '../locales/en.json';
import bgTranslation from '../locales/bg.json'; // Add other languages as needed

export const LANGUAGE_KEY = 'app_language';

// Retrieve the saved language from local storage or default to 'bg'
const savedLanguage = localStorage.getItem(LANGUAGE_KEY) || 'bg';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      bg: { translation: bgTranslation },
    },
    lng: savedLanguage, // Use the saved language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export const setLanguage = (language: string) => {
  i18n.changeLanguage(language)
    .then(() => {
      localStorage.setItem(LANGUAGE_KEY, language);
      console.log(`Language changed to ${language}`);
    })
    .catch((error) => {
      console.error(`Failed to change language to ${language}`, error);
    });
};

export const getTranslation = (key: string) => {
  return i18n.t(key);
};

export const getCurrentLanguage = () => {
  return i18n.language;
};

export default i18n;
