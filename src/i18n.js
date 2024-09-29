// i18n.js

import { createI18n } from "vue-i18n/dist/vue-i18n.esm-bundler.js";

function loadLocaleMessages() {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i);
  const messages = {};
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key).default;
    }
  });
  return messages;
}

// Load the previously selected language from browser storage
const userSelectedLanguage = localStorage.getItem('selectedLanguage');

// If the user has previously selected a language, use that. Otherwise, use 'en'.
const defaultLocale = userSelectedLanguage || 'en';

const i18n = createI18n({
  silentTranslationWarn: true,
  silentFallbackWarn: true,
  locale: defaultLocale,
  fallbackLocale: 'en',
  messages: loadLocaleMessages()
});

export default i18n;
