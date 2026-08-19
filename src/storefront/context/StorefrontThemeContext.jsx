import React, { createContext, useContext, useState, useEffect } from 'react';

const StorefrontThemeContext = createContext();

export const storefrontThemes = [
  {
    id: 'classic-furniture',
    name: 'Classic Furniture',
    description: 'Existing premium furniture storefront',
    preview: { bg: '#F7F7F7', primary: '#E31E24', accent: '#000000' },
    tokens: {
      background: 'bg-[#F7F7F7]',
      surface: 'bg-white',
      text: {
        primary: 'text-gray-900',
        secondary: 'text-gray-500',
        muted: 'text-gray-400',
        inverse: 'text-white'
      },
      primary: 'bg-[#E31E24] text-white hover:brightness-110',
      secondary: 'bg-white text-black hover:bg-gray-100 border border-black',
      border: 'border-gray-200',
      header: {
        solid: 'bg-white text-gray-800 shadow-md border-gray-200',
        transparent: 'bg-transparent text-white border-transparent',
        linkSolid: 'text-gray-800 hover:text-black',
        linkTransparent: 'text-white/90 hover:text-white',
        linkActiveSolid: 'bg-blue-50/30 text-black',
        linkActiveTransparent: 'bg-white/10 text-white',
      },
      hero: {
        overlay: 'bg-black/30 bg-gradient-to-r from-black/80 via-black/50 to-black/30',
        fontFamily: 'font-serif',
        titleSize: 'text-5xl md:text-6xl lg:text-[5rem]',
        buttonPrimary: 'bg-white text-black hover:bg-gray-200',
        buttonSecondary: 'border border-white text-white hover:bg-white/10'
      },
      productCard: {
        surface: 'bg-white',
        radius: 'rounded-none',
        shadow: 'hover:shadow-xl',
        button: 'bg-black text-white hover:bg-gray-800'
      }
    }
  },
  {
    id: 'modern-luxury',
    name: 'Modern Luxury',
    description: 'Modern premium ecommerce experience',
    preview: { bg: '#FAFAFA', primary: '#111827', accent: '#4B5563' },
    tokens: {
      background: 'bg-[#FAFAFA]',
      surface: 'bg-white',
      text: {
        primary: 'text-slate-900',
        secondary: 'text-slate-600',
        muted: 'text-slate-400',
        inverse: 'text-white'
      },
      primary: 'bg-slate-900 text-white hover:bg-slate-800',
      secondary: 'bg-white text-slate-900 hover:bg-slate-50 border border-slate-200',
      border: 'border-slate-200',
      header: {
        solid: 'bg-white/80 backdrop-blur-md text-slate-900 shadow-sm border-slate-100',
        transparent: 'bg-transparent text-white border-transparent',
        linkSolid: 'text-slate-600 hover:text-slate-900',
        linkTransparent: 'text-white/80 hover:text-white',
        linkActiveSolid: 'bg-slate-100 text-slate-900 rounded-full',
        linkActiveTransparent: 'bg-white/20 text-white rounded-full',
      },
      hero: {
        overlay: 'bg-black/20',
        fontFamily: 'font-sans font-light tracking-tight',
        titleSize: 'text-4xl md:text-5xl lg:text-7xl',
        buttonPrimary: 'bg-white text-slate-900 hover:bg-slate-100 rounded-full',
        buttonSecondary: 'bg-transparent border border-white text-white hover:bg-white/10 rounded-full'
      },
      productCard: {
        surface: 'bg-white',
        radius: 'rounded-2xl',
        shadow: 'hover:shadow-2xl hover:shadow-slate-200/50',
        button: 'bg-slate-900 text-white hover:bg-slate-800 rounded-full'
      }
    }
  },
  {
    id: 'dark-luxury',
    name: 'Dark Luxury',
    description: 'Dark luxury ecommerce experience',
    preview: { bg: '#0A0A0A', primary: '#D4AF37', accent: '#262626' },
    tokens: {
      background: 'bg-[#0A0A0A]',
      surface: 'bg-[#171717]',
      text: {
        primary: 'text-[#F5F5F5]',
        secondary: 'text-[#A3A3A3]',
        muted: 'text-[#737373]',
        inverse: 'text-[#0A0A0A]'
      },
      primary: 'bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#FDE047]',
      secondary: 'bg-[#171717] text-[#D4AF37] hover:bg-[#262626] border border-[#D4AF37]',
      border: 'border-[#262626]',
      header: {
        solid: 'bg-[#0A0A0A]/90 backdrop-blur-xl text-[#F5F5F5] shadow-2xl border-[#262626]',
        transparent: 'bg-transparent text-white border-transparent',
        linkSolid: 'text-[#A3A3A3] hover:text-[#D4AF37]',
        linkTransparent: 'text-white/80 hover:text-[#D4AF37]',
        linkActiveSolid: 'bg-[#262626] text-[#D4AF37]',
        linkActiveTransparent: 'bg-black/40 text-[#D4AF37]',
      },
      hero: {
        overlay: 'bg-black/60 bg-gradient-to-t from-[#0A0A0A] to-transparent',
        fontFamily: 'font-serif tracking-widest',
        titleSize: 'text-4xl md:text-5xl lg:text-7xl uppercase',
        buttonPrimary: 'bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#FDE047]',
        buttonSecondary: 'bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10'
      },
      productCard: {
        surface: 'bg-[#171717]',
        radius: 'rounded-sm',
        shadow: 'hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]',
        button: 'bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#FDE047]'
      }
    }
  }
];

export function StorefrontThemeProvider({ children }) {
  const [activeThemeId, setActiveThemeId] = useState('classic-furniture');

  useEffect(() => {
    const savedTheme = localStorage.getItem('storefront_active_theme');
    if (savedTheme && storefrontThemes.find(t => t.id === savedTheme)) {
      setActiveThemeId(savedTheme);
    }
  }, []);

  const setTheme = (themeId) => {
    setActiveThemeId(themeId);
    localStorage.setItem('storefront_active_theme', themeId);
  };

  // Preview logic could use a URL parameter or local state, but the prompt says 
  // "Preview must allow the admin to inspect a storefront theme WITHOUT permanently activating it."
  // So we can support a URL param ?previewTheme=... which overrides the active theme.
  const [previewThemeId, setPreviewThemeId] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const preview = params.get('previewTheme');
    if (preview && storefrontThemes.find(t => t.id === preview)) {
      setPreviewThemeId(preview);
    }
  }, []);

  const currentThemeId = previewThemeId || activeThemeId;
  const activeTheme = storefrontThemes.find(t => t.id === currentThemeId) || storefrontThemes[0];

  return (
    <StorefrontThemeContext.Provider value={{ 
      themes: storefrontThemes, 
      activeThemeId, 
      activeTheme, 
      setTheme 
    }}>
      {children}
    </StorefrontThemeContext.Provider>
  );
}

export function useStorefrontTheme() {
  const context = useContext(StorefrontThemeContext);
  if (!context) {
    throw new Error('useStorefrontTheme must be used within a StorefrontThemeProvider');
  }
  return context;
}
