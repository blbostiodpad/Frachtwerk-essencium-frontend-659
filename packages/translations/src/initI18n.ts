import i18n, { ThirdPartyModule } from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import { de, en } from './languages'

const DEFAULT_LANGUAGE = 'en'

// This function creates an i18n instance and initializes it with i18n for React.
// The created i18n instance is shared across all packages when the initI18n function is called
// from the corresponding packages. This is mandatory to ensure that the language can be changed
// during runtime.
function initI18n(reacti18n: ThirdPartyModule): void {
  i18n
    // detect user language
    .use(LanguageDetector)

    // connect with React
    .use(reacti18n)

    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
      lng: DEFAULT_LANGUAGE,
      resources: {
        en: {
          translation: en,
        },
        de: {
          translation: de,
        },
      },
      fallbackLng: DEFAULT_LANGUAGE,
      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
    })
}

export { i18n, initI18n }
