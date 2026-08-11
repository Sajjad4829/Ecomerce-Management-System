import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = [
  {
    id: 'light',
    name: 'Current Theme',
    description: 'Existing clean indigo dashboard appearance',
    preview: {
      bg: '#F7F7FC',
      primary: '#4F46FF',
      secondary: '#FFFFFF',
      accent: '#E5E7F2'
    }
  },
  {
    id: 'aurora',
    name: 'Premium Aurora',
    description: 'Premium visual styling with soft ambient atmosphere',
    preview: {
      bg: '#F4F7FB',
      primary: '#7C3AED',
      secondary: '#FFFFFF',
      accent: '#4F46FF'
    }
  }
];

export function ThemeProvider({ children }) {
  // Try to load from localStorage first, fallback to 'light'
  const [activeThemeId, setActiveThemeId] = useState(() => {
    try {
      const storedTheme = localStorage.getItem('dashboard_theme');
      return storedTheme || 'light';
    } catch (e) {
      return 'light';
    }
  });

  // Whenever theme changes, optionally persist it and update document root
  useEffect(() => {
    try {
      localStorage.setItem('dashboard_theme', activeThemeId);
    } catch (e) {
      // Ignore
    }
    
    // Apply data-theme attribute for global CSS targeting
    document.documentElement.setAttribute('data-theme', activeThemeId);
  }, [activeThemeId]);

  return (
    <ThemeContext.Provider value={{
      activeThemeId,
      setTheme: setActiveThemeId,
      themes,
      activeTheme: themes.find(t => t.id === activeThemeId) || themes[0]
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
