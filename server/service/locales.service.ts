import * as fs from 'fs'
import * as path from 'path'

interface Translations {
  [locale: string]: { [key: string]: string }
}

const translations: Translations = {}

// Load translations from JSON files
const loadTranslations = (locale: string): void => {
  const filePath = path.join(__dirname, '../locales', `${locale}.json`)
  try {
    const data = fs.readFileSync(filePath, 'utf-8')
    translations[locale] = JSON.parse(data)
  } catch (error) {
    console.error(`Failed to load translations for ${locale}`)
  }
}

// Initialize translations for a given locale
const initTranslations = (locale: string): void => {
  loadTranslations(locale)
}

const t = (locale: string, key: string, variables: Record<string, string> = {}): string => {
  const translation = translations[locale]?.[key]
  if (translation) {
    return Object.entries(variables).reduce(
      (str, [varName, varValue]) => str.replace(new RegExp(`{${varName}}`, 'g'), varValue),
      translation
    )
  }
  return key
}

export { initTranslations, t }
