import { initReactI18next } from "react-i18next"
import i18n from "i18next"
import config from '@/config/config.json'



const resources = {
  en: { translations: require('./en/translation.json') },
  de: { translations: require('./de/translation.json') },
}


i18n.use(initReactI18next).init({
  resources: resources,
  lng: config.language,
  ns: ['translations'],
  defaultNS: 'translations',
  fallbackLng: config.language,
  interpolation: { escapeValue: false },
})


i18n.languages = ['en', 'de']
export default i18n