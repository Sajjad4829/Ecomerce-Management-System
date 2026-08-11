import React from 'react';
import { FiMonitor, FiCheckCircle } from 'react-icons/fi';
import { useTheme } from '../../../context/theme/ThemeContext';

export default function AppearanceSettings() {
  const { themes, activeThemeId, setTheme } = useTheme();

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h2 className="text-2xl font-light text-text-primary tracking-tight mb-2">Dashboard Theme</h2>
        <p className="text-text-muted">Configure the visual appearance and styling of your dashboard workspace.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    </div>
  );
}
