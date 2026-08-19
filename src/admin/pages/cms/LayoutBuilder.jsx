import { useState } from 'react';
import { motion } from 'framer-motion';
import LayoutSidebar from '../../components/cms/layouts/LayoutSidebar';
import LayoutToolbar from '../../components/cms/layouts/LayoutToolbar';
import LayoutPresets from '../../components/cms/layouts/LayoutPresets';
import VersionPanel from '../../components/cms/layouts/VersionPanel';
import RegionEditor from '../../components/cms/layouts/RegionEditor';
import PreviewCanvas from '../../components/cms/layouts/PreviewCanvas';

export default function LayoutBuilder() {
  const [activeSection, setActiveSection] = useState('header');
  const [device, setDevice] = useState('desktop');

  const renderContent = () => {
    switch (activeSection) {
      case 'presets':
        return <LayoutPresets />;
      case 'versions':
        return <VersionPanel />;
      default:
        return (
          <div className="flex flex-col lg:flex-row gap-6 h-full">
             <div className="w-full lg:w-1/2 xl:w-5/12 shrink-0">
                <RegionEditor activeSection={activeSection} />
             </div>
             <div className="w-full lg:w-1/2 xl:w-7/12 flex-1 hidden md:block">
                <PreviewCanvas activeSection={activeSection} device={device} />
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
          <div className="flex items-center gap-2 mb-2 text-sm text-text-muted">
            <span>CMS</span>
            <span className="text-gray-300">/</span>
            <span className="text-text-primary font-semibold">Layout Builder</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-text-primary">Global Layouts</h1>
          <p className="text-sm text-text-muted mt-2 max-w-xl leading-relaxed">
            Manage the structural foundation of your website. Configure headers, footers, mega menus, and other global regions.
          </p>
        </div>
      </motion.div>

      {/* Main Workspace */}
      <div className="flex gap-4 relative mt-8 flex-1 min-h-0">
        
        {/* Sidebar */}
        <LayoutSidebar 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-w-0 min-h-0">
          <LayoutToolbar 
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
