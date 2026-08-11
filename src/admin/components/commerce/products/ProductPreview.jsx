import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiExternalLink, FiEdit2 } from 'react-icons/fi';
import ProductStatusBadge from './ProductStatusBadge';
import { useNavigate } from 'react-router-dom';

export default function ProductPreview({ product, isOpen, onClose }) {
  const navigate = useNavigate();

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm z-50"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 border-l border-stone-200 flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-stone-100 bg-stone-50/50">
              <div className="flex items-center gap-2">
                <h2 className="font-serif font-bold text-stone-900 text-lg">Quick Preview</h2>
                <ProductStatusBadge status={product.status} />
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-stone-200 rounded-lg transition-colors text-stone-500"
              >
                <FiX size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="aspect-[4/3] bg-stone-100 relative border-b border-stone-200">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-mono text-xs text-stone-500 uppercase">{product.sku}</p>
                    <p className="font-medium text-stone-900">${product.price.toLocaleString()}</p>
                  </div>
                  <h1 className="font-serif text-2xl font-bold text-stone-900">{product.name}</h1>
                  <p className="text-sm text-stone-600 mt-2">
                    A beautifully crafted {product.category.toLowerCase()} piece belonging to the {product.collection} collection.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-100">
                  <div>
                    <p className="text-[10px] font-mono font-bold text-stone-500 uppercase">Category</p>
                    <p className="text-sm text-stone-900 mt-0.5">{product.category}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono font-bold text-stone-500 uppercase">Collection</p>
                    <p className="text-sm text-stone-900 mt-0.5">{product.collection}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono font-bold text-stone-500 uppercase">Inventory</p>
                    <p className="text-sm text-stone-900 mt-0.5">{product.stock} Units</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono font-bold text-stone-500 uppercase">Last Updated</p>
                    <p className="text-sm text-stone-900 mt-0.5">{product.updatedAt}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-stone-100 bg-stone-50 flex gap-3">
              <button 
                onClick={() => {
                  onClose();
                  navigate(`/admin/catalog/products/${product.id}`);
                }}
                className="flex-1 py-2.5 bg-stone-900 text-white text-sm font-semibold rounded-lg hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <FiEdit2 size={16} /> Edit Product
              </button>
              <button className="px-4 py-2.5 bg-white border border-stone-200 text-stone-700 text-sm font-semibold rounded-lg hover:bg-stone-50 transition-colors flex items-center justify-center shadow-sm">
                <FiExternalLink size={16} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
