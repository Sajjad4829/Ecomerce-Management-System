import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState({
    store_name: 'Aurora Premium Furniture',
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
    setDirty(false);
    setLoading(false);
  };

  const resetSettings = (originalSettings) => {
    setSettings(originalSettings);
    setDirty(false);
  };

  return (
    <SettingsContext.Provider value={{
      settings,
      updateSetting,
      saveSettings,
      resetSettings,
      dirty,
      setDirty,
      loading
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);
