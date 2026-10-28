export const formatCurrency = (value) => {
  try {
    const settings = JSON.parse(localStorage.getItem('app_settings') || '{}');
    const currency = settings.currency || 'USD';
    
    const localeMap = {
      'en': 'en-US',
      'bn': 'bn-BD',
      'es': 'es-ES',
      'fr': 'fr-FR',
      'de': 'de-DE',
      'ja': 'ja-JP',
    };
    const language = localeMap[settings.language] || 'en-US';

    return new Intl.NumberFormat(language, { 
      style: 'currency', 
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  } catch (e) {
    const fallbackSettings = JSON.parse(localStorage.getItem('app_settings') || '{}');
    const curr = fallbackSettings.currency || 'USD';
    const symbol = curr === 'BDT' ? '৳' : curr === 'EUR' ? '€' : curr === 'GBP' ? '£' : curr === 'CAD' ? 'C$' : '$';
    return `${symbol}${Number(value).toFixed(2)}`;
  }
};
