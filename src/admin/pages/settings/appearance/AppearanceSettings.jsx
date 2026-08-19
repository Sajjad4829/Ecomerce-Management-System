import React from 'react';
import { FiMonitor, FiCheckCircle } from 'react-icons/fi';
import { useTheme } from '../../../context/theme/ThemeContext';
import { useStorefrontTheme } from '../../../../storefront/context/StorefrontThemeContext';

export default function AppearanceSettings() {
  const { themes, activeThemeId, setTheme } = useTheme();
  const { themes: sfThemes, activeThemeId: sfActiveThemeId, setTheme: setSfTheme } = useStorefrontTheme();

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h2 className="text-2xl font-light text-text-primary tracking-tight mb-2">Dashboard Theme</h2>
        <p className="text-text-muted">Configure the visual appearance and styling of your dashboard workspace.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {themes.map(theme => {
          const isActive = activeThemeId === theme.id;
          
          return (
            <div 
              key={theme.id}
              onClick={() => setTheme(theme.id)}
              className={`relative flex flex-col p-6 rounded-2xl border transition-all cursor-pointer group ${
                isActive 
                  ? 'border-primary bg-background/50 shadow-sm' 
                  : 'border-border bg-surface hover:border-border-hover hover:shadow-sm'
              }`}
            >
              {/* Theme Preview Graphic */}
              <div 
                className="w-full aspect-[4/3] rounded-lg mb-6 flex items-center justify-center overflow-hidden border border-border/50"
                style={{ backgroundColor: theme.preview.bg }}
              >
                {/* Mini Layout Mockup */}
                <div className="w-[80%] h-[70%] bg-surface rounded-md shadow-sm border border-black/5 flex overflow-hidden">
                   {/* Sidebar */}
                   <div 
                     className="w-1/4 h-full border-r border-black/5 p-2 flex flex-col gap-2"
                     style={{ backgroundColor: theme.preview.bg }}
                   >
                     <div className="w-full h-3 rounded-full opacity-20" style={{ backgroundColor: theme.preview.primary }} />
                     <div className="w-3/4 h-2 rounded opacity-10" style={{ backgroundColor: theme.preview.primary }} />
                     <div className="w-5/6 h-2 rounded opacity-10" style={{ backgroundColor: theme.preview.primary }} />
                   </div>
                   {/* Main Content */}
                   <div className="flex-1 h-full p-3 flex flex-col gap-3">
                     <div className="w-1/3 h-4 rounded" style={{ backgroundColor: theme.preview.primary }} />
                     <div className="w-full flex-1 rounded-md opacity-20" style={{ backgroundColor: theme.preview.accent }} />
                   </div>
                </div>
              </div>

              {/* Theme Details */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className={`text-lg font-medium mb-1 ${isActive ? 'text-text-primary' : 'text-text-secondary'}`}>
                    {theme.name}
                  </h3>
                  <p className="text-sm text-text-muted">{theme.description}</p>
                </div>
                
                {/* Selection Indicator */}
                <div className="shrink-0 mt-1 ml-4">
                  {isActive ? (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white">
                      <FiCheckCircle size={14} />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-border group-hover:border-border-hover transition-colors" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mb-8 border-t border-border pt-12">
        <h2 className="text-2xl font-light text-text-primary tracking-tight mb-2">Storefront Theme</h2>
        <p className="text-text-muted">Manage the visual design of your customer-facing ecommerce storefront.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sfThemes.map(theme => {
          const isActive = sfActiveThemeId === theme.id;
          
          return (
            <div 
              key={theme.id}
              className={`relative flex flex-col p-6 rounded-2xl border transition-all ${
                isActive 
                  ? 'border-primary bg-background/50 shadow-sm' 
                  : 'border-border bg-surface'
              }`}
            >
              {/* Theme Preview Graphic */}
              <div 
                className="w-full aspect-[4/3] rounded-lg mb-6 flex items-center justify-center overflow-hidden border border-border/50"
                style={{ backgroundColor: theme.preview.bg }}
              >
                {/* Mini Storefront Mockup */}
                <div className="w-[80%] h-[70%] bg-white rounded-md shadow-sm border border-black/5 flex flex-col overflow-hidden">
                   {/* Header */}
                   <div className="w-full h-8 border-b border-black/5 p-2 flex items-center gap-2">
                     <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.preview.primary }} />
                     <div className="flex-1" />
                     <div className="w-8 h-2 rounded opacity-20" style={{ backgroundColor: theme.preview.accent }} />
                     <div className="w-8 h-2 rounded opacity-20" style={{ backgroundColor: theme.preview.accent }} />
                   </div>
                   {/* Hero */}
                   <div className="w-full h-1/3 flex items-center justify-center relative">
                     <div className="absolute inset-0 opacity-10" style={{ backgroundColor: theme.preview.accent }} />
                     <div className="w-1/2 h-3 rounded" style={{ backgroundColor: theme.preview.primary }} />
                   </div>
                   {/* Products */}
                   <div className="flex-1 p-3 grid grid-cols-3 gap-2">
                     <div className="h-full rounded bg-gray-100" />
                     <div className="h-full rounded bg-gray-100" />
                     <div className="h-full rounded bg-gray-100" />
                   </div>
                </div>
              </div>

              {/* Theme Details */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className={`text-lg font-medium mb-1 ${isActive ? 'text-text-primary' : 'text-text-secondary'}`}>
                    {theme.name}
                  </h3>
                  <p className="text-sm text-text-muted">{theme.description}</p>
                </div>
                
                {/* Selection Indicator */}
                <div className="shrink-0 mt-1 ml-4">
                  {isActive && (
                    <div className="text-xs font-bold px-2 py-1 bg-green-100 text-green-800 rounded">
                      ACTIVE
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 mt-auto">
                <a 
                  href={`/?previewTheme=${theme.id}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-2 px-4 rounded-lg text-sm font-medium border border-border hover:bg-surface transition-colors text-text-primary"
                >
                  Preview
                </a>
                {!isActive && (
                  <button 
                    onClick={() => setSfTheme(theme.id)}
                    className="flex-1 py-2 px-4 rounded-lg text-sm font-medium bg-black text-white hover:bg-gray-800 transition-colors"
                  >
                    Activate
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
