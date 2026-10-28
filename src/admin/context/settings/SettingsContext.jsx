import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    const defaultSettings = {
      store_name: 'Aurora Premium Furniture',
      dashboard_name: 'ShopEase',
      dashboard_logo: '',
      admin_username: 'admin@example.com',
      admin_password: 'pass123',
      admin_name: 'Admin User',
      store_email: 'hello@aurorafurniture.com',
      store_phone: '+1 (555) 123-4567',
      store_status: 'Open',
      currency: 'USD',
      timezone: 'America/New_York',
      language: 'en',
      tax_display: 'exclusive',
      guest_checkout: true,
      inventory_tracking: true,
      low_stock_threshold: 5,
      returns_enabled: true,
      return_window: 30,
      reviews_enabled: true,
      wishlist_enabled: true
    };
    try {
      const saved = localStorage.getItem('app_settings');
      if (saved) {
        return { ...defaultSettings, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error("Could not parse app_settings", e);
    }
    return defaultSettings;
  });
  
  const [dirty, setDirty] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setDirty(true);
  };

  const saveSettings = async () => {
    setLoading(true);
    // Mock save delay
    await new Promise(resolve => setTimeout(resolve, 800));
    localStorage.setItem('app_settings', JSON.stringify(settings));
    setDirty(false);
    setLoading(false);
  };

  const resetSettings = (originalSettings) => {
    setSettings(originalSettings);
    setDirty(false);
  };

  const formatCurrency = (amount) => {
    try {
      const formatter = new Intl.NumberFormat(settings.language || 'en-US', {
        style: 'currency',
        currency: settings.currency || 'USD'
      });
      return formatter.format(amount);
    } catch (e) {
      // Fallback if currency code is invalid
      return `${settings.currency === 'BDT' ? '৳' : '$'}${Number(amount).toFixed(2)}`;
    }
  };

  const getCurrencySymbol = () => {
    try {
      const formatter = new Intl.NumberFormat(settings.language || 'en-US', {
        style: 'currency',
        currency: settings.currency || 'USD'
      });
      const parts = formatter.formatToParts(1);
      return parts.find(p => p.type === 'currency')?.value || '$';
    } catch {
      return settings.currency === 'BDT' ? '৳' : '$';
    }
  };

  return (
    <SettingsContext.Provider value={{
      settings,
      updateSetting,
      saveSettings,
      resetSettings,
      dirty,
      setDirty,
      loading,
      formatCurrency,
      getCurrencySymbol
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);
