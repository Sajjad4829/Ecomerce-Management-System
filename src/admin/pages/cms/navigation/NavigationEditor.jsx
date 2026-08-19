import { useState } from 'react';
import { motion } from 'framer-motion';
import NavigationToolbar from '../../../components/cms/navigation/NavigationToolbar';
import NavigationItemLibrary from '../../../components/cms/navigation/NavigationItemLibrary';
import NavigationTree from '../../../components/cms/navigation/NavigationTree';
import NavigationInspector from '../../../components/cms/navigation/NavigationInspector';
import MegaMenuBuilder from '../../../components/cms/navigation/MegaMenuBuilder';
import NavigationPreview from '../../../components/cms/navigation/NavigationPreview';

export default function NavigationEditor() {
  const [device, setDevice] = useState('desktop');
  const [viewMode, setViewMode] = useState('builder'); // 'builder' or 'mega-menu'
  const [selectedItemId, setSelectedItemId] = useState(null);

  const renderContent = () => {
    if (viewMode === 'mega-menu') {
      return (
        <div className="flex flex-col lg:flex-row gap-6 h-full">
           <div className="w-full lg:w-1/2 xl:w-7/12 shrink-0 h-full">
              <MegaMenuBuilder />
           </div>
           <div className="w-full lg:w-1/2 xl:w-5/12 flex-1 hidden md:block h-full">
              <NavigationPreview device={device} viewMode={viewMode} />
           </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col lg:flex-row gap-4 h-full">
         <div className="w-full lg:w-1/4 shrink-0 h-full hidden xl:block">
            <NavigationItemLibrary />
         </div>
         <div className="w-full lg:w-1/2 xl:w-5/12 flex-1 h-full">
            <NavigationTree selectedItemId={selectedItemId} setSelectedItemId={setSelectedItemId} />
         </div>
         <div className="w-full lg:w-1/4 xl:w-4/12 shrink-0 h-full">
            <NavigationInspector selectedItemId={selectedItemId} />
         </div>
      </div>
    );
  };

  return (
    <div className="space-y-4 pb-12 h-[calc(100vh-64px)] flex flex-col">
      {/* Workspace */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0 pt-4">
        <NavigationToolbar 
          menuName="Main Header Navigation"
          device={device}
          setDevice={setDevice}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
        
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 min-h-0"
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
}
