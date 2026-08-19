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
        className="fixed inset-y-0 left-0 w-[280px] md:w-[320px] bg-white z-50 flex flex-col shadow-2xl lg:hidden"
      >
        <div className="flex items-center justify-between p-0 border-b border-gray-100">
          <div className="bg-[#E31E24] px-5 py-4 flex items-center justify-center">
             <span className="text-white text-lg font-bold tracking-widest uppercase text-center leading-tight">DORY<br/>FURNITURE</span>
          </div>
          <button onClick={onClose} className="p-4 text-gray-500 hover:text-black">
            <FiX size={24} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <ul className="flex flex-col">
            {[
              { name: 'Living Room', path: '/categories/living-room' },
              { name: 'Bedroom', path: '/categories/bedroom' },
              { name: 'Dining', path: '/categories/dining' },
              { name: 'Kitchen', path: '/categories/kitchen' },
              { name: "Kid's Room", path: '/categories/kids-room' },
              { name: 'SmartFit', path: '/categories/smartfit' },
              { name: 'Institutional', path: '/categories/institutional' },
              { name: 'Door', path: '/categories/door' },
              { name: 'Interior', path: '/categories/interior' },
              { name: 'Office', path: '/categories/office' },
              { name: 'More', path: '/categories' }
            ].map((category) => (
               <li key={category.name} className="border-b border-gray-100">
                 <Link to={category.path} onClick={onClose} className="flex items-center justify-between px-5 py-3.5 text-sm font-medium text-gray-800 hover:bg-gray-50 hover:text-[#E31E24] transition-colors">
                    {category.name} <FiChevronRight size={18} className="text-gray-400" />
                 </Link>
               </li>
            ))}
          </ul>
        </nav>

        <div className="p-5 border-t border-gray-100 bg-gray-50 space-y-4">
          <a href="tel:09678777777" className="flex items-center justify-center w-full py-3 text-sm font-bold border border-black hover:bg-black hover:text-white transition-colors">
            Contact: 09 678 7777 77
          </a>
          <Link
            to="/account/login"
            onClick={onClose}
            className="flex items-center justify-center w-full py-3 text-sm font-bold bg-[#E31E24] text-white hover:bg-red-700 transition-colors"
          >
            Login / My Account
          </Link>
        </div>
      </motion.div>
    </>
  );
}
