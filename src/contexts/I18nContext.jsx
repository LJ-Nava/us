import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations, countryToLanguage, supportedLanguages } from '../i18n/translations';

// Language to Country mapping for currency sync (exported for useCurrency)
export const LANGUAGE_TO_CURRENCY_COUNTRY = {
  es: 'ES',  // Spain (EUR)
  en: 'US',  // USA (USD)
  pt: 'BR',  // Brazil (BRL)
  fr: 'FR',  // France (EUR)
  de: 'DE',  // Germany (EUR)
  zh: 'CN',  // China (CNY)
  ja: 'JP',  // Japan (JPY)
  ko: 'KR',  // South Korea (KRW)
  vi: 'VN',  // Vietnam (VND)
  ar: 'SA',  // Saudi Arabia (SAR)
  it: 'IT',  // Italy (EUR)
  ru: 'RU',  // Russia (RUB)
  hi: 'IN',  // India (INR)
};

/**
 * I18n Context - Internationalization with automatic IP-based language detection
 * Detects user's country via IP and automatically sets the appropriate language
 */

// Cache for country detection
let countryCache = null;

const I18nContext = createContext();

/**
 * Detect country by IP using multiple APIs for reliability
 * ALWAYS fetches fresh IP data to work with VPN changes
 */
const detectCountryByIP = async (forceRefresh = false) => {
  // Only use session cache (not localStorage) to allow VPN changes to work
  if (!forceRefresh && countryCache) {
    return countryCache;
  }

  try {
    // Primary API: ipapi.co (free, reliable)
    const response = await fetch('https://ipapi.co/json/', {
      headers: { 'Accept': 'application/json' },
      cache: 'no-store' // Prevent browser caching
    });

    if (!response.ok) throw new Error('Primary IP API failed');

    const data = await response.json();
    const countryCode = data.country_code || 'US';

    // Only cache in memory (session), not localStorage
    countryCache = countryCode;

    return countryCode;
  } catch (error) {
    console.warn('Primary IP API failed, trying backup...');

    try {
      // Backup API: ip-api.com
      const backupResponse = await fetch('http://ip-api.com/json/?fields=countryCode', {
        cache: 'no-store'
      });
      const backupData = await backupResponse.json();
      const countryCode = backupData.countryCode || 'US';

      countryCache = countryCode;
      return countryCode;
    } catch {
      try {
        // Third backup: ipinfo.io
        const thirdResponse = await fetch('https://ipinfo.io/json', {
          cache: 'no-store'
        });
        const thirdData = await thirdResponse.json();
        const countryCode = thirdData.country || 'US';

        countryCache = countryCode;
        return countryCode;
      } catch {
        console.warn('All IP APIs failed, using browser language');

        // Fallback to browser language
        const browserLang = navigator.language || navigator.userLanguage;
        const langCode = browserLang.split('-')[0];

        // Map browser language to country
        const langToCountry = {
          es: 'ES', en: 'US', pt: 'BR', fr: 'FR', de: 'DE',
          zh: 'CN', ja: 'JP', ko: 'KR', vi: 'VN', ar: 'SA',
          it: 'IT', ru: 'RU', hi: 'IN'
        };

        return langToCountry[langCode] || 'US';
      }
    }
  }
};

/**
 * Get language from country code
 */
const getLanguageFromCountry = (countryCode) => {
  return countryToLanguage[countryCode] || countryToLanguage.DEFAULT || 'en';
};

/**
 * I18n Provider Component
 */
export const I18nProvider = ({ children }) => {
  const [language, setLanguageState] = useState('en'); // Default, will be updated by IP detection
  const [country, setCountry] = useState('US');
  const [loading, setLoading] = useState(true);
  const [isRTL, setIsRTL] = useState(false);

  // Initialize language detection - ALWAYS detect by IP for VPN support
  useEffect(() => {
    const init = async () => {
      try {
        // Clear any old cached data to ensure fresh detection
        localStorage.removeItem('detected_country');
        countryCache = null;

        // Always detect by IP - this allows VPN changes to work
        const detectedCountry = await detectCountryByIP(true); // Force refresh
        setCountry(detectedCountry);

        const detectedLanguage = getLanguageFromCountry(detectedCountry);

        // Ensure the detected language is supported
        if (supportedLanguages.includes(detectedLanguage)) {
          setLanguageState(detectedLanguage);
          setIsRTL(detectedLanguage === 'ar');
        } else {
          setLanguageState('en');
          setIsRTL(false);
        }
      } catch (error) {
        console.error('Language detection error:', error);
        setLanguageState('en');
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  // Update document direction for RTL languages
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [isRTL, language]);

  /**
   * Set language manually (user preference)
   */
  const setLanguage = useCallback((lang) => {
    if (supportedLanguages.includes(lang)) {
      setLanguageState(lang);
      setIsRTL(lang === 'ar');
      localStorage.setItem('preferred_language', lang);
    }
  }, []);

  /**
   * Reset to auto-detected language
   */
  const resetToAutoDetect = useCallback(async () => {
    localStorage.removeItem('preferred_language');
    countryCache = null;
    localStorage.removeItem('detected_country');

    const detectedCountry = await detectCountryByIP();
    setCountry(detectedCountry);
    const detectedLanguage = getLanguageFromCountry(detectedCountry);
    setLanguageState(supportedLanguages.includes(detectedLanguage) ? detectedLanguage : 'en');
    setIsRTL(detectedLanguage === 'ar');
  }, []);

  /**
   * Translate function - gets text by key path
   * Supports strings, arrays, and objects
   * @param {string} key - Dot-notation key path (e.g., 'hero.title1')
   * @param {object} params - Optional parameters for interpolation
   */
  const t = useCallback((key, params = {}) => {
    const keys = key.split('.');
    let value = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English
        value = translations.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            // Key not found, return key itself
            return key;
          }
        }
        break;
      }
    }

    // Return arrays and objects directly (for heroWords, etc.)
    if (Array.isArray(value)) {
      return value;
    }

    if (typeof value === 'object') {
      return value;
    }

    if (typeof value !== 'string') {
      return key;
    }

    // Replace parameters {{param}}
    let result = value;
    Object.entries(params).forEach(([paramKey, paramValue]) => {
      result = result.replace(new RegExp(`{{${paramKey}}}`, 'g'), paramValue);
    });

    return result;
  }, [language]);

  /**
   * Get all translations for a section
   */
  const getSection = useCallback((section) => {
    return translations[language]?.[section] || translations.en?.[section] || {};
  }, [language]);

  /**
   * Get the currency country code for the current language
   */
  const getCurrencyCountry = useCallback(() => {
    return LANGUAGE_TO_CURRENCY_COUNTRY[language] || 'US';
  }, [language]);

  const value = {
    language,
    setLanguage,
    country,
    loading,
    isRTL,
    t,
    getSection,
    supportedLanguages,
    resetToAutoDetect,
    currentTranslations: translations[language] || translations.en,
    getCurrencyCountry,
    currencyCountry: LANGUAGE_TO_CURRENCY_COUNTRY[language] || 'US',
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};

/**
 * Hook to use i18n context
 */
export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

/**
 * Hook for translation function only (convenience)
 */
export const useTranslation = () => {
  const { t, language, loading } = useI18n();
  return { t, language, loading };
};

export default I18nContext;
