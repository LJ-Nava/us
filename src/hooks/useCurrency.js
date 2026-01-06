import { useState, useEffect } from 'react';

/**
 * Hook para detectar país por IP y convertir precios a moneda local
 * Usa geolocalización por IP para detección precisa
 */

// Configuración de países y monedas
const COUNTRY_CONFIG = {
  // Venezuela - Siempre en USD
  VE: { currency: 'USD', symbol: '$', name: 'Dólares', locale: 'en-US' },

  // Países LATAM con su moneda local
  CO: { currency: 'COP', symbol: '$', name: 'Pesos colombianos', locale: 'es-CO' },
  PE: { currency: 'PEN', symbol: 'S/', name: 'Soles', locale: 'es-PE' },
  CL: { currency: 'CLP', symbol: '$', name: 'Pesos chilenos', locale: 'es-CL' },
  AR: { currency: 'ARS', symbol: '$', name: 'Pesos argentinos', locale: 'es-AR' },
  MX: { currency: 'MXN', symbol: '$', name: 'Pesos mexicanos', locale: 'es-MX' },
  EC: { currency: 'USD', symbol: '$', name: 'Dólares', locale: 'en-US' },
  UY: { currency: 'UYU', symbol: '$', name: 'Pesos uruguayos', locale: 'es-UY' },
  BO: { currency: 'BOB', symbol: 'Bs', name: 'Bolivianos', locale: 'es-BO' },
  PY: { currency: 'PYG', symbol: '₲', name: 'Guaraníes', locale: 'es-PY' },
  CR: { currency: 'CRC', symbol: '₡', name: 'Colones', locale: 'es-CR' },
  PA: { currency: 'USD', symbol: '$', name: 'Dólares', locale: 'en-US' },
  GT: { currency: 'GTQ', symbol: 'Q', name: 'Quetzales', locale: 'es-GT' },
  HN: { currency: 'HNL', symbol: 'L', name: 'Lempiras', locale: 'es-HN' },
  NI: { currency: 'NIO', symbol: 'C$', name: 'Córdobas', locale: 'es-NI' },
  SV: { currency: 'USD', symbol: '$', name: 'Dólares', locale: 'en-US' },
  DO: { currency: 'DOP', symbol: 'RD$', name: 'Pesos dominicanos', locale: 'es-DO' },
  BR: { currency: 'BRL', symbol: 'R$', name: 'Reales', locale: 'pt-BR' },

  // USA y otros
  US: { currency: 'USD', symbol: '$', name: 'USD', locale: 'en-US' },
  CA: { currency: 'CAD', symbol: '$', name: 'CAD', locale: 'en-CA' },
  ES: { currency: 'EUR', symbol: '€', name: 'Euros', locale: 'es-ES' },

  // Default
  DEFAULT: { currency: 'USD', symbol: '$', name: 'USD', locale: 'en-US' },
};

// Cache
let ratesCache = null;
let ratesCacheTime = null;
let countryCache = null;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hora

/**
 * Detecta el país del usuario por IP
 */
const detectCountryByIP = async () => {
  // Si ya tenemos el país en cache, usarlo
  if (countryCache) {
    return countryCache;
  }

  try {
    // Usar ipapi.co - API gratuita y confiable
    const response = await fetch('https://ipapi.co/json/', {
      headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) throw new Error('IP API failed');

    const data = await response.json();
    const countryCode = data.country_code || 'US';

    // Guardar en cache
    countryCache = countryCode;

    return countryCode;
  } catch (error) {
    console.warn('Error detecting country by IP, trying backup...');

    try {
      // API de respaldo
      const backupResponse = await fetch('https://ip-api.com/json/?fields=countryCode');
      const backupData = await backupResponse.json();
      const countryCode = backupData.countryCode || 'US';
      countryCache = countryCode;
      return countryCode;
    } catch {
      console.warn('All IP APIs failed, defaulting to US');
      return 'US';
    }
  }
};

/**
 * Obtiene las tasas de cambio actualizadas
 */
const fetchExchangeRates = async () => {
  if (ratesCache && ratesCacheTime && (Date.now() - ratesCacheTime < CACHE_DURATION)) {
    return ratesCache;
  }

  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();
    ratesCache = data.rates;
    ratesCacheTime = Date.now();
    return data.rates;
  } catch (error) {
    console.warn('Error fetching exchange rates, using fallback');
    // Tasas de respaldo (enero 2025)
    return {
      USD: 1,
      COP: 4400,
      PEN: 3.8,
      CLP: 1000,
      ARS: 1050,
      MXN: 20,
      UYU: 44,
      BOB: 6.9,
      PYG: 7800,
      CRC: 510,
      GTQ: 7.8,
      HNL: 25,
      NIO: 37,
      DOP: 60,
      BRL: 6.2,
      CAD: 1.44,
      EUR: 0.96,
    };
  }
};

/**
 * Hook principal para manejo de monedas
 */
export const useCurrency = () => {
  const [country, setCountry] = useState('DEFAULT');
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        // Detectar país por IP
        const detectedCountry = await detectCountryByIP();
        setCountry(detectedCountry);

        // Obtener tasas de cambio
        const exchangeRates = await fetchExchangeRates();
        setRates(exchangeRates);
      } catch (error) {
        console.error('Currency init error:', error);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const config = COUNTRY_CONFIG[country] || COUNTRY_CONFIG.DEFAULT;

  /**
   * Redondea a un número limpio según la magnitud
   */
  const roundToNice = (num) => {
    if (num < 1000) return Math.round(num / 10) * 10;
    if (num < 10000) return Math.round(num / 100) * 100;
    if (num < 100000) return Math.round(num / 1000) * 1000;
    if (num < 1000000) return Math.round(num / 5000) * 5000;
    return Math.round(num / 10000) * 10000;
  };

  /**
   * Convierte un precio en USD a la moneda local
   */
  const convertPrice = (priceUSD) => {
    if (!rates || !priceUSD) return null;
    const rate = rates[config.currency] || 1;
    const converted = priceUSD * rate;
    return roundToNice(converted);
  };

  /**
   * Formatea un precio con el símbolo de moneda
   */
  const formatPrice = (priceUSD) => {
    if (loading || !rates) return `$${priceUSD}`;

    const numericPrice = parseFloat(priceUSD);

    // Para USD, mostrar directo
    if (config.currency === 'USD') {
      return `${config.symbol}${numericPrice}`;
    }

    // Convertir y formatear
    const converted = convertPrice(numericPrice);

    try {
      const formatted = new Intl.NumberFormat(config.locale, {
        style: 'decimal',
        maximumFractionDigits: 0,
      }).format(converted);

      return `${config.symbol}${formatted}`;
    } catch {
      return `${config.symbol}${converted.toLocaleString()}`;
    }
  };

  return {
    country,
    currency: config.currency,
    symbol: config.symbol,
    currencyName: config.name,
    loading,
    convertPrice,
    formatPrice,
  };
};

export default useCurrency;
