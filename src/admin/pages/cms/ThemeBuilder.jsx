import { useState } from 'react';
import { motion } from 'framer-motion';
import ThemeSidebar from '../../components/cms/themes/ThemeSidebar';
import ThemeToolbar from '../../components/cms/themes/ThemeToolbar';
import ThemePresets from '../../components/cms/themes/ThemePresets';
import VersionTimeline from '../../components/cms/themes/VersionTimeline';
import ThemeSettingsPanel from '../../components/cms/themes/ThemeSettingsPanel';
import ThemePreview from '../../components/cms/themes/ThemePreview';

export default function ThemeBuilder() {
  const [activeSection, setActiveSection] = useState('brand');
  const [device, setDevice] = useState('desktop');

  const renderContent = () => {
    switch (activeSection) {
      case 'presets':
        return <ThemePresets />;
      case 'versions':
        return <VersionTimeline />;
      default:
        return (
          <div className="flex flex-col lg:flex-row gap-6 h-full">
             <div className="w-full lg:w-1/2 xl:w-5/12 shrink-0">
                <ThemeSettingsPanel activeSection={activeSection} />
             </div>
             <div className="w-full lg:w-1/2 xl:w-7/12 flex-1 hidden md:block">
                <ThemePreview activeSection={activeSection} device={device} />
             </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-8 pb-12 h-[calc(100vh-64px)] flex flex-col">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 shrink-0"
      >
        <div>
          <div className="flex items-center gap-2 mb-2 text-sm text-gray-500">
            <span>CMS</span>
            <span className="text-gray-300">/</span>
            <span className="text-[#1A1A1A] font-semibold">Theme Builder</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#1A1A1A]">Global Theme</h1>
          <p className="text-sm text-gray-500 mt-2 max-w-xl leading-relaxed">
            Configure the visual identity, global layouts, and component styles that will be inherited across your entire website.
          </p>
        </div>
      </motion.div>

      {/* Main Workspace */}
      <div className="flex gap-4 relative mt-8 flex-1 min-h-0">
        
        {/* Sidebar */}
        <ThemeSidebar 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-w-0 min-h-0">
          <ThemeToolbar 
            activeSection={activeSection} 
            device={device}
            setDevice={setDevice}
          />
          
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1 min-h-0"
          >
            {renderContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
