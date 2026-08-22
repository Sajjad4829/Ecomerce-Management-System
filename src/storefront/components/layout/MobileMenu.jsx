import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiX, FiChevronRight, FiChevronDown } from 'react-icons/fi';
import { useCategories } from '../../../admin/context/commerce/CategoryContext';
import { useCMS } from '../../../admin/context/cms/CMSContext';

export default function MobileMenu({ isOpen, onClose }) {
  const { categories } = useCategories();
  const { menus } = useCMS();
  const headerMenu = menus.find(m => m.type === 'Header')?.items?.filter(i => i.visibility) || [];
  
  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

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
            {headerMenu.map((category) => (
              <li key={category.id} className="border-b border-gray-100 flex flex-col">
                {category.isMegaMenu && category.columns?.length > 0 ? (
                  <>
                    <div className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors">
                      <Link to={category.link} onClick={onClose} className="text-sm font-medium text-gray-800 flex-1 hover:text-[#E31E24]">
                        {category.title}
                      </Link>
                      <button onClick={() => toggleCategory(category.id)} className="p-2 text-gray-400 hover:text-black focus:outline-none">
                        {expandedCategories[category.id] ? <FiChevronDown size={18} /> : <FiChevronRight size={18} />}
                      </button>
                    </div>
                    {expandedCategories[category.id] && (
                      <div className="bg-gray-50 px-5 py-3">
                        {category.columns.map((col, cIdx) => (
                          <div key={col.id || cIdx} className="mb-4 last:mb-0">
                            {col.groups.map((group, gIdx) => (
                              <div key={group.id || gIdx} className="mb-4 last:mb-0">
                                <Link to={group.link} onClick={onClose} className="font-bold text-sm text-gray-800 block mb-2 hover:text-[#E31E24]">{group.title}</Link>
                                <ul className="space-y-2 pl-3 border-l-2 border-gray-200 ml-1">
                                  {group.items.map((item, iIdx) => (
                                    <li key={item.id || iIdx}>
                                      <Link to={item.link} onClick={onClose} className="text-xs text-gray-600 block hover:text-[#E31E24]">{item.title}</Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link to={category.link} onClick={onClose} className="flex items-center justify-between px-5 py-3.5 text-sm font-medium text-gray-800 hover:bg-gray-50 hover:text-[#E31E24] transition-colors">
                    {category.title}
                  </Link>
                )}
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
