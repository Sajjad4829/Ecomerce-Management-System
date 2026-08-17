import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiX, FiChevronRight } from 'react-icons/fi';
import { useCategories } from '../../../admin/context/commerce/CategoryContext';

export default function MobileMenu({ isOpen, onClose }) {
  const { categories } = useCategories();
  
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 lg:hidden backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white z-50 flex flex-col shadow-2xl lg:hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <span className="text-2xl font-serif font-bold tracking-tight">AURA</span>
          <button onClick={onClose} className="p-2 -mr-2 text-gray-500 hover:text-black">
            <FiX size={24} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="flex flex-col">
            {categories?.filter(c => !c.parentId).map((category) => (
              <li key={category.id}>
                <Link
                  to={`/category/${category.slug}`}
                  onClick={onClose}
                  className="flex items-center justify-between px-6 py-4 text-lg font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  {category.name}
                  <FiChevronRight size={20} className="text-gray-400" />
                </Link>
              </li>
            ))}
            <li className="border-t border-gray-100 mt-2 pt-2">
               <Link to="/collections" onClick={onClose} className="flex items-center justify-between px-6 py-4 text-lg font-medium text-gray-900 hover:bg-gray-50 transition-colors">
                  Collections <FiChevronRight size={20} className="text-gray-400" />
               </Link>
            </li>
            <li>
               <Link to="/collections/new" onClick={onClose} className="flex items-center justify-between px-6 py-4 text-lg font-medium text-gray-900 hover:bg-gray-50 transition-colors">
                  New Arrivals <FiChevronRight size={20} className="text-gray-400" />
               </Link>
            </li>
            <li>
               <Link to="/offers" onClick={onClose} className="flex items-center justify-between px-6 py-4 text-lg font-medium text-gray-900 hover:bg-gray-50 transition-colors">
                  Offers <FiChevronRight size={20} className="text-gray-400" />
               </Link>
            </li>
          </ul>
        </nav>

        <div className="p-6 border-t border-gray-100 bg-gray-50">
          <Link
            to="/account/login"
            onClick={onClose}
            className="block w-full py-3 text-center text-sm font-medium border border-black hover:bg-black hover:text-white transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/account/register"
            onClick={onClose}
            className="block w-full py-3 mt-3 text-center text-sm font-medium bg-black text-white hover:bg-gray-800 transition-colors"
          >
            Create Account
          </Link>
        </div>
      </motion.div>
    </>
  );
}
