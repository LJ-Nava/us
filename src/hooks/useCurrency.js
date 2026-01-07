import { useState, useEffect, useCallback } from 'react';

/**
 * Global Currency Hook - Detects country by IP and converts prices to local currency
 * Supports 200+ countries with automatic currency detection
 */

// Complete configuration for all major world currencies
const COUNTRY_CONFIG = {
  // ==================== AMERICAS ====================
  // North America
  US: { currency: 'USD', symbol: '$', name: 'Dólares USA', locale: 'en-US' },
  CA: { currency: 'CAD', symbol: 'C$', name: 'Dólares Canadienses', locale: 'en-CA' },
  MX: { currency: 'MXN', symbol: '$', name: 'Pesos Mexicanos', locale: 'es-MX' },

  // Central America
  GT: { currency: 'GTQ', symbol: 'Q', name: 'Quetzales', locale: 'es-GT' },
  BZ: { currency: 'BZD', symbol: 'BZ$', name: 'Dólares Beliceños', locale: 'en-BZ' },
  SV: { currency: 'USD', symbol: '$', name: 'Dólares', locale: 'es-SV' },
  HN: { currency: 'HNL', symbol: 'L', name: 'Lempiras', locale: 'es-HN' },
  NI: { currency: 'NIO', symbol: 'C$', name: 'Córdobas', locale: 'es-NI' },
  CR: { currency: 'CRC', symbol: '₡', name: 'Colones', locale: 'es-CR' },
  PA: { currency: 'USD', symbol: '$', name: 'Dólares', locale: 'es-PA' },

  // Caribbean
  CU: { currency: 'CUP', symbol: '₱', name: 'Pesos Cubanos', locale: 'es-CU' },
  DO: { currency: 'DOP', symbol: 'RD$', name: 'Pesos Dominicanos', locale: 'es-DO' },
  HT: { currency: 'HTG', symbol: 'G', name: 'Gourdes', locale: 'fr-HT' },
  JM: { currency: 'JMD', symbol: 'J$', name: 'Dólares Jamaicanos', locale: 'en-JM' },
  PR: { currency: 'USD', symbol: '$', name: 'Dólares', locale: 'es-PR' },
  TT: { currency: 'TTD', symbol: 'TT$', name: 'Dólares de Trinidad', locale: 'en-TT' },
  BB: { currency: 'BBD', symbol: 'Bds$', name: 'Dólares de Barbados', locale: 'en-BB' },
  BS: { currency: 'BSD', symbol: 'B$', name: 'Dólares Bahameños', locale: 'en-BS' },

  // South America
  VE: { currency: 'USD', symbol: '$', name: 'Dólares', locale: 'es-VE' },
  CO: { currency: 'COP', symbol: '$', name: 'Pesos Colombianos', locale: 'es-CO' },
  PE: { currency: 'PEN', symbol: 'S/', name: 'Soles', locale: 'es-PE' },
  EC: { currency: 'USD', symbol: '$', name: 'Dólares', locale: 'es-EC' },
  BR: { currency: 'BRL', symbol: 'R$', name: 'Reales', locale: 'pt-BR' },
  AR: { currency: 'ARS', symbol: '$', name: 'Pesos Argentinos', locale: 'es-AR' },
  CL: { currency: 'CLP', symbol: '$', name: 'Pesos Chilenos', locale: 'es-CL' },
  UY: { currency: 'USD', symbol: '$', name: 'Dólares', locale: 'es-UY' },
  PY: { currency: 'PYG', symbol: '₲', name: 'Guaraníes', locale: 'es-PY' },
  BO: { currency: 'BOB', symbol: 'Bs', name: 'Bolivianos', locale: 'es-BO' },
  GY: { currency: 'GYD', symbol: 'G$', name: 'Guyanese Dollars', locale: 'en-GY' },
  SR: { currency: 'SRD', symbol: '$', name: 'Surinamese Dollars', locale: 'nl-SR' },

  // ==================== EUROPE ====================
  // Eurozone
  DE: { currency: 'EUR', symbol: '€', name: 'Euros', locale: 'de-DE' },
  FR: { currency: 'EUR', symbol: '€', name: 'Euros', locale: 'fr-FR' },
  IT: { currency: 'EUR', symbol: '€', name: 'Euros', locale: 'it-IT' },
  ES: { currency: 'EUR', symbol: '€', name: 'Euros', locale: 'es-ES' },
  PT: { currency: 'EUR', symbol: '€', name: 'Euros', locale: 'pt-PT' },
  NL: { currency: 'EUR', symbol: '€', name: 'Euros', locale: 'nl-NL' },
  BE: { currency: 'EUR', symbol: '€', name: 'Euros', locale: 'fr-BE' },
  AT: { currency: 'EUR', symbol: '€', name: 'Euros', locale: 'de-AT' },
  IE: { currency: 'EUR', symbol: '€', name: 'Euros', locale: 'en-IE' },
  GR: { currency: 'EUR', symbol: '€', name: 'Euros', locale: 'el-GR' },
  FI: { currency: 'EUR', symbol: '€', name: 'Euros', locale: 'fi-FI' },
  SK: { currency: 'EUR', symbol: '€', name: 'Euros', locale: 'sk-SK' },
  SI: { currency: 'EUR', symbol: '€', name: 'Euros', locale: 'sl-SI' },
  LU: { currency: 'EUR', symbol: '€', name: 'Euros', locale: 'fr-LU' },
  EE: { currency: 'EUR', symbol: '€', name: 'Euros', locale: 'et-EE' },
  LV: { currency: 'EUR', symbol: '€', name: 'Euros', locale: 'lv-LV' },
  LT: { currency: 'EUR', symbol: '€', name: 'Euros', locale: 'lt-LT' },
  MT: { currency: 'EUR', symbol: '€', name: 'Euros', locale: 'mt-MT' },
  CY: { currency: 'EUR', symbol: '€', name: 'Euros', locale: 'el-CY' },
  AD: { currency: 'EUR', symbol: '€', name: 'Euros', locale: 'ca-AD' },
  MC: { currency: 'EUR', symbol: '€', name: 'Euros', locale: 'fr-MC' },
  SM: { currency: 'EUR', symbol: '€', name: 'Euros', locale: 'it-SM' },
  VA: { currency: 'EUR', symbol: '€', name: 'Euros', locale: 'it-VA' },

  // Non-Eurozone Europe
  GB: { currency: 'GBP', symbol: '£', name: 'British Pounds', locale: 'en-GB' },
  CH: { currency: 'CHF', symbol: 'CHF', name: 'Swiss Francs', locale: 'de-CH' },
  NO: { currency: 'NOK', symbol: 'kr', name: 'Norwegian Krone', locale: 'nb-NO' },
  SE: { currency: 'SEK', symbol: 'kr', name: 'Swedish Kronor', locale: 'sv-SE' },
  DK: { currency: 'DKK', symbol: 'kr', name: 'Danish Krone', locale: 'da-DK' },
  PL: { currency: 'PLN', symbol: 'zł', name: 'Polish Zloty', locale: 'pl-PL' },
  CZ: { currency: 'CZK', symbol: 'Kč', name: 'Czech Koruna', locale: 'cs-CZ' },
  HU: { currency: 'HUF', symbol: 'Ft', name: 'Hungarian Forint', locale: 'hu-HU' },
  RO: { currency: 'RON', symbol: 'lei', name: 'Romanian Leu', locale: 'ro-RO' },
  BG: { currency: 'BGN', symbol: 'лв', name: 'Bulgarian Lev', locale: 'bg-BG' },
  HR: { currency: 'EUR', symbol: '€', name: 'Euros', locale: 'hr-HR' },
  RS: { currency: 'RSD', symbol: 'дин', name: 'Serbian Dinar', locale: 'sr-RS' },
  UA: { currency: 'UAH', symbol: '₴', name: 'Ukrainian Hryvnia', locale: 'uk-UA' },
  BY: { currency: 'BYN', symbol: 'Br', name: 'Belarusian Ruble', locale: 'be-BY' },
  RU: { currency: 'RUB', symbol: '₽', name: 'Russian Rubles', locale: 'ru-RU' },
  IS: { currency: 'ISK', symbol: 'kr', name: 'Icelandic Krona', locale: 'is-IS' },
  AL: { currency: 'ALL', symbol: 'L', name: 'Albanian Lek', locale: 'sq-AL' },
  MK: { currency: 'MKD', symbol: 'ден', name: 'Macedonian Denar', locale: 'mk-MK' },
  MD: { currency: 'MDL', symbol: 'L', name: 'Moldovan Leu', locale: 'ro-MD' },
  BA: { currency: 'BAM', symbol: 'KM', name: 'Convertible Mark', locale: 'bs-BA' },
  ME: { currency: 'EUR', symbol: '€', name: 'Euros', locale: 'sr-ME' },
  XK: { currency: 'EUR', symbol: '€', name: 'Euros', locale: 'sq-XK' },
  LI: { currency: 'CHF', symbol: 'CHF', name: 'Swiss Francs', locale: 'de-LI' },

  // ==================== ASIA ====================
  // East Asia
  CN: { currency: 'CNY', symbol: '¥', name: 'Chinese Yuan', locale: 'zh-CN' },
  JP: { currency: 'JPY', symbol: '¥', name: 'Japanese Yen', locale: 'ja-JP' },
  KR: { currency: 'KRW', symbol: '₩', name: 'South Korean Won', locale: 'ko-KR' },
  KP: { currency: 'KPW', symbol: '₩', name: 'North Korean Won', locale: 'ko-KP' },
  TW: { currency: 'TWD', symbol: 'NT$', name: 'Taiwan Dollars', locale: 'zh-TW' },
  HK: { currency: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollars', locale: 'zh-HK' },
  MO: { currency: 'MOP', symbol: 'MOP$', name: 'Macanese Pataca', locale: 'zh-MO' },
  MN: { currency: 'MNT', symbol: '₮', name: 'Mongolian Tugrik', locale: 'mn-MN' },

  // Southeast Asia
  SG: { currency: 'SGD', symbol: 'S$', name: 'Singapore Dollars', locale: 'en-SG' },
  MY: { currency: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', locale: 'ms-MY' },
  ID: { currency: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah', locale: 'id-ID' },
  TH: { currency: 'THB', symbol: '฿', name: 'Thai Baht', locale: 'th-TH' },
  VN: { currency: 'VND', symbol: '₫', name: 'Vietnamese Dong', locale: 'vi-VN' },
  PH: { currency: 'PHP', symbol: '₱', name: 'Philippine Pesos', locale: 'en-PH' },
  MM: { currency: 'MMK', symbol: 'K', name: 'Myanmar Kyat', locale: 'my-MM' },
  KH: { currency: 'KHR', symbol: '៛', name: 'Cambodian Riel', locale: 'km-KH' },
  LA: { currency: 'LAK', symbol: '₭', name: 'Lao Kip', locale: 'lo-LA' },
  BN: { currency: 'BND', symbol: 'B$', name: 'Brunei Dollar', locale: 'ms-BN' },
  TL: { currency: 'USD', symbol: '$', name: 'US Dollars', locale: 'pt-TL' },

  // South Asia
  IN: { currency: 'INR', symbol: '₹', name: 'Indian Rupees', locale: 'en-IN' },
  PK: { currency: 'PKR', symbol: '₨', name: 'Pakistani Rupees', locale: 'ur-PK' },
  BD: { currency: 'BDT', symbol: '৳', name: 'Bangladeshi Taka', locale: 'bn-BD' },
  LK: { currency: 'LKR', symbol: 'Rs', name: 'Sri Lankan Rupees', locale: 'si-LK' },
  NP: { currency: 'NPR', symbol: '₨', name: 'Nepalese Rupees', locale: 'ne-NP' },
  BT: { currency: 'BTN', symbol: 'Nu.', name: 'Bhutanese Ngultrum', locale: 'dz-BT' },
  MV: { currency: 'MVR', symbol: 'ރ', name: 'Maldivian Rufiyaa', locale: 'dv-MV' },
  AF: { currency: 'AFN', symbol: '؋', name: 'Afghan Afghani', locale: 'ps-AF' },

  // Central Asia
  KZ: { currency: 'KZT', symbol: '₸', name: 'Kazakhstani Tenge', locale: 'kk-KZ' },
  UZ: { currency: 'UZS', symbol: 'сўм', name: 'Uzbekistani Som', locale: 'uz-UZ' },
  TM: { currency: 'TMT', symbol: 'm', name: 'Turkmenistani Manat', locale: 'tk-TM' },
  TJ: { currency: 'TJS', symbol: 'SM', name: 'Tajikistani Somoni', locale: 'tg-TJ' },
  KG: { currency: 'KGS', symbol: 'сом', name: 'Kyrgyzstani Som', locale: 'ky-KG' },

  // West Asia / Middle East
  TR: { currency: 'TRY', symbol: '₺', name: 'Turkish Lira', locale: 'tr-TR' },
  SA: { currency: 'SAR', symbol: 'ر.س', name: 'Saudi Riyals', locale: 'ar-SA' },
  AE: { currency: 'AED', symbol: 'د.إ', name: 'UAE Dirhams', locale: 'ar-AE' },
  IL: { currency: 'ILS', symbol: '₪', name: 'Israeli Shekels', locale: 'he-IL' },
  EG: { currency: 'EGP', symbol: 'E£', name: 'Egyptian Pounds', locale: 'ar-EG' },
  IQ: { currency: 'IQD', symbol: 'ع.د', name: 'Iraqi Dinars', locale: 'ar-IQ' },
  IR: { currency: 'IRR', symbol: '﷼', name: 'Iranian Rials', locale: 'fa-IR' },
  JO: { currency: 'JOD', symbol: 'د.ا', name: 'Jordanian Dinars', locale: 'ar-JO' },
  KW: { currency: 'KWD', symbol: 'د.ك', name: 'Kuwaiti Dinars', locale: 'ar-KW' },
  LB: { currency: 'LBP', symbol: 'ل.ل', name: 'Lebanese Pounds', locale: 'ar-LB' },
  OM: { currency: 'OMR', symbol: 'ر.ع.', name: 'Omani Rials', locale: 'ar-OM' },
  QA: { currency: 'QAR', symbol: 'ر.ق', name: 'Qatari Rials', locale: 'ar-QA' },
  SY: { currency: 'SYP', symbol: '£S', name: 'Syrian Pounds', locale: 'ar-SY' },
  YE: { currency: 'YER', symbol: '﷼', name: 'Yemeni Rials', locale: 'ar-YE' },
  BH: { currency: 'BHD', symbol: '.د.ب', name: 'Bahraini Dinars', locale: 'ar-BH' },
  PS: { currency: 'ILS', symbol: '₪', name: 'Israeli Shekels', locale: 'ar-PS' },
  AM: { currency: 'AMD', symbol: '֏', name: 'Armenian Dram', locale: 'hy-AM' },
  AZ: { currency: 'AZN', symbol: '₼', name: 'Azerbaijani Manat', locale: 'az-AZ' },
  GE: { currency: 'GEL', symbol: '₾', name: 'Georgian Lari', locale: 'ka-GE' },

  // ==================== AFRICA ====================
  // North Africa
  MA: { currency: 'MAD', symbol: 'د.م.', name: 'Moroccan Dirhams', locale: 'ar-MA' },
  DZ: { currency: 'DZD', symbol: 'د.ج', name: 'Algerian Dinars', locale: 'ar-DZ' },
  TN: { currency: 'TND', symbol: 'د.ت', name: 'Tunisian Dinars', locale: 'ar-TN' },
  LY: { currency: 'LYD', symbol: 'ل.د', name: 'Libyan Dinars', locale: 'ar-LY' },
  SD: { currency: 'SDG', symbol: 'ج.س.', name: 'Sudanese Pounds', locale: 'ar-SD' },

  // West Africa
  NG: { currency: 'NGN', symbol: '₦', name: 'Nigerian Naira', locale: 'en-NG' },
  GH: { currency: 'GHS', symbol: 'GH₵', name: 'Ghanaian Cedi', locale: 'en-GH' },
  SN: { currency: 'XOF', symbol: 'CFA', name: 'CFA Francs', locale: 'fr-SN' },
  CI: { currency: 'XOF', symbol: 'CFA', name: 'CFA Francs', locale: 'fr-CI' },
  ML: { currency: 'XOF', symbol: 'CFA', name: 'CFA Francs', locale: 'fr-ML' },
  BF: { currency: 'XOF', symbol: 'CFA', name: 'CFA Francs', locale: 'fr-BF' },
  NE: { currency: 'XOF', symbol: 'CFA', name: 'CFA Francs', locale: 'fr-NE' },
  TG: { currency: 'XOF', symbol: 'CFA', name: 'CFA Francs', locale: 'fr-TG' },
  BJ: { currency: 'XOF', symbol: 'CFA', name: 'CFA Francs', locale: 'fr-BJ' },
  GN: { currency: 'GNF', symbol: 'FG', name: 'Guinean Francs', locale: 'fr-GN' },
  LR: { currency: 'LRD', symbol: '$', name: 'Liberian Dollars', locale: 'en-LR' },
  SL: { currency: 'SLL', symbol: 'Le', name: 'Sierra Leonean Leone', locale: 'en-SL' },
  GM: { currency: 'GMD', symbol: 'D', name: 'Gambian Dalasi', locale: 'en-GM' },
  GW: { currency: 'XOF', symbol: 'CFA', name: 'CFA Francs', locale: 'pt-GW' },
  CV: { currency: 'CVE', symbol: '$', name: 'Cape Verdean Escudo', locale: 'pt-CV' },
  MR: { currency: 'MRU', symbol: 'UM', name: 'Mauritanian Ouguiya', locale: 'ar-MR' },

  // Central Africa
  CM: { currency: 'XAF', symbol: 'FCFA', name: 'CFA Francs', locale: 'fr-CM' },
  GA: { currency: 'XAF', symbol: 'FCFA', name: 'CFA Francs', locale: 'fr-GA' },
  CG: { currency: 'XAF', symbol: 'FCFA', name: 'CFA Francs', locale: 'fr-CG' },
  CD: { currency: 'CDF', symbol: 'FC', name: 'Congolese Francs', locale: 'fr-CD' },
  TD: { currency: 'XAF', symbol: 'FCFA', name: 'CFA Francs', locale: 'fr-TD' },
  CF: { currency: 'XAF', symbol: 'FCFA', name: 'CFA Francs', locale: 'fr-CF' },
  GQ: { currency: 'XAF', symbol: 'FCFA', name: 'CFA Francs', locale: 'es-GQ' },
  AO: { currency: 'AOA', symbol: 'Kz', name: 'Angolan Kwanza', locale: 'pt-AO' },
  ST: { currency: 'STN', symbol: 'Db', name: 'Sao Tome Dobra', locale: 'pt-ST' },

  // East Africa
  KE: { currency: 'KES', symbol: 'KSh', name: 'Kenyan Shillings', locale: 'en-KE' },
  TZ: { currency: 'TZS', symbol: 'TSh', name: 'Tanzanian Shillings', locale: 'sw-TZ' },
  UG: { currency: 'UGX', symbol: 'USh', name: 'Ugandan Shillings', locale: 'en-UG' },
  RW: { currency: 'RWF', symbol: 'FRw', name: 'Rwandan Francs', locale: 'rw-RW' },
  BI: { currency: 'BIF', symbol: 'FBu', name: 'Burundian Francs', locale: 'fr-BI' },
  ET: { currency: 'ETB', symbol: 'Br', name: 'Ethiopian Birr', locale: 'am-ET' },
  ER: { currency: 'ERN', symbol: 'Nfk', name: 'Eritrean Nakfa', locale: 'ti-ER' },
  DJ: { currency: 'DJF', symbol: 'Fdj', name: 'Djiboutian Francs', locale: 'fr-DJ' },
  SO: { currency: 'SOS', symbol: 'S', name: 'Somali Shillings', locale: 'so-SO' },
  SS: { currency: 'SSP', symbol: '£', name: 'South Sudanese Pounds', locale: 'en-SS' },

  // Southern Africa
  ZA: { currency: 'ZAR', symbol: 'R', name: 'South African Rand', locale: 'en-ZA' },
  ZW: { currency: 'USD', symbol: '$', name: 'US Dollars', locale: 'en-ZW' },
  BW: { currency: 'BWP', symbol: 'P', name: 'Botswanan Pula', locale: 'en-BW' },
  NA: { currency: 'NAD', symbol: 'N$', name: 'Namibian Dollars', locale: 'en-NA' },
  MZ: { currency: 'MZN', symbol: 'MT', name: 'Mozambican Metical', locale: 'pt-MZ' },
  ZM: { currency: 'ZMW', symbol: 'ZK', name: 'Zambian Kwacha', locale: 'en-ZM' },
  MW: { currency: 'MWK', symbol: 'MK', name: 'Malawian Kwacha', locale: 'en-MW' },
  LS: { currency: 'LSL', symbol: 'L', name: 'Lesotho Loti', locale: 'en-LS' },
  SZ: { currency: 'SZL', symbol: 'E', name: 'Swazi Lilangeni', locale: 'en-SZ' },
  MG: { currency: 'MGA', symbol: 'Ar', name: 'Malagasy Ariary', locale: 'fr-MG' },
  MU: { currency: 'MUR', symbol: '₨', name: 'Mauritian Rupees', locale: 'en-MU' },
  SC: { currency: 'SCR', symbol: '₨', name: 'Seychellois Rupees', locale: 'fr-SC' },
  KM: { currency: 'KMF', symbol: 'CF', name: 'Comorian Francs', locale: 'fr-KM' },
  RE: { currency: 'EUR', symbol: '€', name: 'Euros', locale: 'fr-RE' },

  // ==================== OCEANIA ====================
  AU: { currency: 'AUD', symbol: 'A$', name: 'Australian Dollars', locale: 'en-AU' },
  NZ: { currency: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollars', locale: 'en-NZ' },
  FJ: { currency: 'FJD', symbol: 'FJ$', name: 'Fijian Dollars', locale: 'en-FJ' },
  PG: { currency: 'PGK', symbol: 'K', name: 'Papua New Guinean Kina', locale: 'en-PG' },
  SB: { currency: 'SBD', symbol: 'SI$', name: 'Solomon Islands Dollar', locale: 'en-SB' },
  VU: { currency: 'VUV', symbol: 'VT', name: 'Vanuatu Vatu', locale: 'bi-VU' },
  NC: { currency: 'XPF', symbol: '₣', name: 'CFP Francs', locale: 'fr-NC' },
  PF: { currency: 'XPF', symbol: '₣', name: 'CFP Francs', locale: 'fr-PF' },
  WS: { currency: 'WST', symbol: 'WS$', name: 'Samoan Tala', locale: 'sm-WS' },
  TO: { currency: 'TOP', symbol: 'T$', name: 'Tongan Paanga', locale: 'to-TO' },

  // Default
  DEFAULT: { currency: 'USD', symbol: '$', name: 'USD', locale: 'en-US' },
};

// Language to Country mapping for currency sync
const LANGUAGE_TO_COUNTRY = {
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

// Cache
let ratesCache = null;
let ratesCacheTime = null;
let countryCache = null;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

/**
 * Detect country by IP using multiple APIs for reliability
 * Always re-detects on page load to support VPN changes
 */
const detectCountryByIP = async () => {
  // Use session cache if available (same session only)
  if (countryCache) {
    return countryCache;
  }

  try {
    // Primary API: ipapi.co - always fetch fresh to support VPN
    const response = await fetch('https://ipapi.co/json/', {
      headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) throw new Error('IP API failed');

    const data = await response.json();
    const countryCode = data.country_code || 'US';

    // Cache in memory for this session only
    countryCache = countryCode;

    return countryCode;
  } catch (error) {
    console.warn('Primary IP API failed, trying backup...');

    try {
      // Backup API
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
 * Fetch exchange rates with caching
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
    // Fallback rates (approximations - January 2025)
    return {
      // Major currencies
      USD: 1, EUR: 0.92, GBP: 0.79, JPY: 156, CNY: 7.3, INR: 83,
      // Americas
      BRL: 6.0, MXN: 20.5, ARS: 1050, COP: 4400, PEN: 3.75, CLP: 980,
      VES: 40, BOB: 6.9, PYG: 7800, UYU: 42, CAD: 1.43,
      CRC: 510, GTQ: 7.8, HNL: 25, NIO: 37, DOP: 60,
      // Asia Pacific
      KRW: 1450, THB: 35, VND: 25500, PHP: 58, IDR: 16200, MYR: 4.5, SGD: 1.36,
      AUD: 1.60, NZD: 1.75, TWD: 32.5, HKD: 7.82,
      // Europe
      CHF: 0.90, NOK: 11.2, SEK: 11.0, DKK: 7.0, PLN: 4.1, CZK: 24,
      HUF: 390, RON: 4.7, BGN: 1.8, RUB: 100, UAH: 42, TRY: 35,
      // Middle East
      SAR: 3.75, AED: 3.67, KWD: 0.31, QAR: 3.64, OMR: 0.385, BHD: 0.377,
      JOD: 0.71, ILS: 3.7, EGP: 50,
      // Africa
      ZAR: 19, NGN: 1650, GHS: 16, KES: 160, MAD: 10.2, DZD: 135, TND: 3.2,
      // Other
      PKR: 280, BDT: 122, LKR: 320, XOF: 610, XAF: 610, XPF: 110
    };
  }
};

/**
 * Main currency hook
 * @param {string} languageCountry - Optional country code from language selection to sync currency
 */
export const useCurrency = (languageCountry = null) => {
  const [country, setCountry] = useState('DEFAULT');
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const detectedCountry = await detectCountryByIP();
        setCountry(detectedCountry);

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

  // Sync currency with language when languageCountry changes
  useEffect(() => {
    if (languageCountry && COUNTRY_CONFIG[languageCountry]) {
      setCountry(languageCountry);
      countryCache = languageCountry;
    }
  }, [languageCountry]);

  const config = COUNTRY_CONFIG[country] || COUNTRY_CONFIG.DEFAULT;

  /**
   * Round to a nice number based on magnitude
   */
  const roundToNice = useCallback((num) => {
    if (num < 100) return Math.round(num);
    if (num < 1000) return Math.round(num / 10) * 10;
    if (num < 10000) return Math.round(num / 100) * 100;
    if (num < 100000) return Math.round(num / 1000) * 1000;
    if (num < 1000000) return Math.round(num / 5000) * 5000;
    return Math.round(num / 10000) * 10000;
  }, []);

  /**
   * Convert price from USD to local currency
   */
  const convertPrice = useCallback((priceUSD) => {
    if (!rates || !priceUSD) return null;
    const rate = rates[config.currency] || 1;
    const converted = priceUSD * rate;
    return roundToNice(converted);
  }, [rates, config.currency, roundToNice]);

  /**
   * Format price with currency symbol
   */
  const formatPrice = useCallback((priceUSD) => {
    if (loading || !rates) return `$${priceUSD}`;

    const numericPrice = parseFloat(priceUSD);

    // For USD, show directly
    if (config.currency === 'USD') {
      return `${config.symbol}${numericPrice}`;
    }

    const converted = convertPrice(numericPrice);

    try {
      const formatted = new Intl.NumberFormat(config.locale, {
        style: 'decimal',
        maximumFractionDigits: 0,
      }).format(converted);

      return `${config.symbol}${formatted}`;
    } catch {
      return `${config.symbol}${converted?.toLocaleString()}`;
    }
  }, [loading, rates, config, convertPrice]);

  /**
   * Set country manually (session only)
   */
  const setManualCountry = useCallback((countryCode) => {
    if (COUNTRY_CONFIG[countryCode]) {
      setCountry(countryCode);
      countryCache = countryCode; // Update session cache
    }
  }, []);

  /**
   * Set currency based on language selection
   */
  const setCurrencyByLanguage = useCallback((langCode) => {
    const targetCountry = LANGUAGE_TO_COUNTRY[langCode];
    if (targetCountry && COUNTRY_CONFIG[targetCountry]) {
      setCountry(targetCountry);
      countryCache = targetCountry;
    }
  }, []);

  return {
    country,
    currency: config.currency,
    symbol: config.symbol,
    currencyName: config.name,
    locale: config.locale,
    loading,
    convertPrice,
    formatPrice,
    setManualCountry,
    setCurrencyByLanguage,
    allCountries: Object.keys(COUNTRY_CONFIG).filter(k => k !== 'DEFAULT'),
  };
};

export default useCurrency;
