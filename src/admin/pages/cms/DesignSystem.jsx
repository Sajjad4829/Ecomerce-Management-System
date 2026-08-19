import { useState } from 'react';
import { motion } from 'framer-motion';
import TokenSidebar from '../../components/cms/design-system/TokenSidebar';
import TokenToolbar from '../../components/cms/design-system/TokenToolbar';
import ColorPalette from '../../components/cms/design-system/ColorPalette';
import TypographyPreview from '../../components/cms/design-system/TypographyPreview';
import ComponentPreview from '../../components/cms/design-system/ComponentPreview';
import LayoutPreview from '../../components/cms/design-system/LayoutPreview';
import AnimationPreview from '../../components/cms/design-system/AnimationPreview';
import EmptyState from '../../components/cms/sections/EmptyState'; // Reuse for missing tabs

export default function DesignSystem() {
  const [activeCategory, setActiveCategory] = useState('Colors');

  const renderContent = () => {
    switch(activeCategory) {
      case 'Colors':
      case 'Status Colors':
        return <ColorPalette />;
      case 'Typography':
        return <TypographyPreview />;
      case 'Buttons':
      case 'Forms':
      case 'Cards':
      case 'Badges':
        return <ComponentPreview />;
      case 'Spacing':
      case 'Border Radius':
      case 'Grid System':
      case 'Containers':
        return <LayoutPreview />;
      case 'Animations':
        return <AnimationPreview />;
      default:
        return (
          <EmptyState 
            title={`${activeCategory} Under Construction`}
            message={`The ${activeCategory} token manager is currently being developed. Check back soon.`}
            actionLabel="Return to Colors"
            onAction={() => setActiveCategory('Colors')}
          />
        );
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col lg:flex-row lg:items-end justify-between gap-6"
      >
        <div>
          <div className="flex items-center gap-2 mb-2 text-sm text-text-muted">
            <span>CMS</span>
            <span className="text-gray-300">/</span>
            <span className="text-text-primary font-semibold">Design System</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-text-primary">Design System Manager</h1>
          <p className="text-sm text-text-muted mt-2 max-w-xl leading-relaxed">
            Manage the visual design foundations and tokens for your entire platform. This serves as the single source of truth for themes and UI elements.
          </p>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="flex gap-4 relative mt-8">
        
        {/* Sidebar */}
        <TokenSidebar 
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <TokenToolbar activeCategory={activeCategory} />
          
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
