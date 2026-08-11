import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiExternalLink, FiEdit2, FiMonitor, FiSmartphone } from 'react-icons/fi';
import CatalogStatusBadge from '../shared/CatalogStatusBadge';
import { useNavigate } from 'react-router-dom';
import CollectionPageTemplate from '../../../../components/commerce/collections/presentation/CollectionPageTemplate';
import { useState } from 'react';

export default function CollectionPreview({ collection, isOpen, onClose }) {
  const navigate = useNavigate();
  const [device, setDevice] = useState('desktop');

  if (!collection) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-primary/50 backdrop-blur-sm z-50"
          />
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-4 bg-stone-100 shadow-2xl z-50 flex flex-col rounded-2xl overflow-hidden border border-border"
          >
            {/* Header Toolbar */}
            <div className="flex items-center justify-between p-4 bg-surface border-b border-border shrink-0">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <h2 className="font-serif font-bold text-text-primary text-lg">Live Preview</h2>
                  <CatalogStatusBadge status={collection.status} />
                </div>
                
                <div className="h-6 w-px bg-stone-200 mx-2"></div>
                
                {/* Device Toggles */}
                <div className="flex bg-stone-100 p-1 rounded-lg">
                  <button 
                    onClick={() => setDevice('desktop')}
                    className={`p-1.5 rounded-md transition-colors ${device === 'desktop' ? 'bg-surface shadow-sm text-text-primary' : 'text-text-muted hover:text-text-secondary'}`}
                  >
                    <FiMonitor size={16} />
                  </button>
                  <button 
                    onClick={() => setDevice('mobile')}
                    className={`p-1.5 rounded-md transition-colors ${device === 'mobile' ? 'bg-surface shadow-sm text-text-primary' : 'text-text-muted hover:text-text-secondary'}`}
                  >
                    <FiSmartphone size={16} />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => {
                    onClose();
                    navigate(`/admin/catalog/collections/${collection.id}`);
                  }}
                  className="px-4 py-2 bg-stone-100 text-text-secondary hover:bg-stone-200 text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                >
                  <FiEdit2 size={16} /> Edit Collection
                </button>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-stone-200 rounded-lg transition-colors text-text-muted"
                >
                  <FiX size={20} />
                </button>
              </div>
            </div>

            {/* Preview Area */}
            <div className="flex-1 overflow-hidden bg-stone-200/50 p-4 flex justify-center">
              <div className={`bg-surface rounded-xl shadow-xl overflow-y-auto w-full transition-all duration-300 ${device === 'mobile' ? 'max-w-[400px]' : 'max-w-full'}`}>
                <CollectionPageTemplate collection={collection} />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
