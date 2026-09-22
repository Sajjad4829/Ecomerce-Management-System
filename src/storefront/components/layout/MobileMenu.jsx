import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FiX, FiChevronDown } from 'react-icons/fi';
import { useCategories } from '../../../admin/context/commerce/CategoryContext';
import { useCMS } from '../../../admin/context/cms/CMSContext';
import { useProducts } from '../../../admin/context/commerce/ProductContext';
import { useCollections } from '../../../admin/context/commerce/CollectionContext';
import { useBrands } from '../../../admin/context/commerce/BrandContext';

const MobileMenuItem = ({ item, level = 0, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isActive = location.pathname === item.link;

  const hasChildren = item.children && item.children.length > 0;

  const getTextStyles = (level) => {
    if (level === 0) return 'text-[15px] font-medium';
    if (level === 1) return 'text-[14.5px] font-normal';
    return 'text-[14px] font-normal';
  };

  const textColor = isActive ? 'text-[#E31E24]' : 'text-[#222222]';

  return (
    <div className="flex flex-col border-b border-gray-100 last:border-b-0">
      <div 
        className={`flex items-center justify-between pr-5 py-3.5 transition-colors ${level > 0 ? 'bg-[#f9f9f9]' : 'bg-white'}`}
        style={{ paddingLeft: `${1.25 + level * 1}rem` }}
      >
        <Link 
          to={item.link} 
          onClick={onClose} 
          className={`flex-1 ${getTextStyles(level)} ${textColor} hover:text-[#E31E24]`}
        >
          {item.title}
        </Link>
        {hasChildren && (
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="p-1 ml-2 text-gray-500 hover:text-black focus:outline-none"
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiChevronDown size={18} strokeWidth={2} />
            </motion.div>
          </button>
        )}
      </div>
      
      <AnimatePresence initial={false}>
        {isOpen && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden bg-[#f9f9f9]"
          >
            {item.children.map((child, idx) => (
              <MobileMenuItem 
                key={child.id || idx} 
                item={child} 
                level={level + 1} 
                onClose={onClose} 
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function MobileMenu({ isOpen, onClose }) {
  const { categories } = useCategories();
  const { menus, headerConfig } = useCMS();
  const { products } = useProducts();
  const { collections } = useCollections();
  const { brands } = useBrands();
  
  const getProp = (key) => {
    const config = headerConfig || {};
    if (config[`${key}_mobile`] !== undefined) return config[`${key}_mobile`];
    if (config[`${key}_tablet`] !== undefined) return config[`${key}_tablet`];
    return config[key];
  };

  const primaryMenuId = getProp('primaryMenuId') || 'MNU-001';
  const headerMenu = menus.find(m => m.id === primaryMenuId)?.items?.filter(i => i.visibility) || 
                     menus.find(m => m.type === 'Header')?.items?.filter(i => i.visibility) || [];

  const logoImage = getProp('logoImage');
  const logoText = getProp('logoText') || 'HATIL';

  const resolveMenuItem = (item) => {
    if (!item.referenceType || !item.referenceId) {
      return { title: item.title, link: item.link };
    }
    let resolvedTitle = item.title;
    let resolvedLink = item.link;
    if (item.referenceType === 'category') {
      const cat = categories.find(c => c.id === item.referenceId);
      if (cat) {
        resolvedTitle = cat.name;
        resolvedLink = `/categories/${cat.slug}`;
      }
    } else if (item.referenceType === 'product') {
      const prod = products.find(p => p.id === item.referenceId);
      if (prod) {
        resolvedTitle = prod.name;
        resolvedLink = `/products/${prod.slug}`;
      }
    } else if (item.referenceType === 'collection') {
      const coll = collections.find(c => c.id === item.referenceId);
      if (coll) {
        resolvedTitle = coll.name;
        resolvedLink = `/collections/${coll.slug}`;
      }
    } else if (item.referenceType === 'brand') {
      const brand = brands.find(b => b.id === item.referenceId);
      if (brand) {
        resolvedTitle = brand.name;
        resolvedLink = `/brands/${brand.slug}`;
      }
    }
    return { title: resolvedTitle || 'Unknown', link: resolvedLink || '#' };
  };

  const buildCategoryTree = (parentId) => {
    const children = categories.filter(c => c.parentId === parentId);
    return children.map(child => ({
      id: child.id,
      title: child.name,
      link: `/categories/${child.slug}`,
      children: buildCategoryTree(child.id)
    }));
  };

  const menuTree = headerMenu.map(item => {
    const resolved = resolveMenuItem(item);
    let children = [];

    const rootCategories = categories.filter(c => c.navMenuId === item.id);
    if (rootCategories.length > 0) {
      children = rootCategories.map(rootCat => ({
        id: rootCat.id,
        title: rootCat.name,
        link: `/categories/${rootCat.slug}`,
        children: buildCategoryTree(rootCat.id)
      }));
    } else if (item.megaMenu && item.megaMenu.columns) {
      item.megaMenu.columns.forEach(col => {
        if (col.groups) {
          col.groups.forEach(group => {
            children.push({
              id: group.id || Math.random().toString(),
              title: group.title ? group.title.replace(' →', '') : 'Unknown',
              link: group.link,
              children: (group.items || []).map(i => ({
                id: i.id || Math.random().toString(),
                title: i.title,
                link: i.link,
                children: []
              }))
            });
          });
        }
      });
    }

    return {
      id: item.id,
      title: resolved.title,
      link: resolved.link,
      children
    };
  });

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-[101] lg:hidden backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="fixed inset-y-0 left-0 w-[290px] md:w-[320px] bg-white z-[102] flex flex-col shadow-2xl lg:hidden"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <Link to="/" onClick={onClose} className="flex items-center">
            {logoImage ? (
              <img src={logoImage} alt={logoText} className="h-8 object-contain" />
            ) : (
              <div className="bg-[#E31E24] px-3 py-1 flex items-center justify-center">
                <span className="text-white text-[22px] font-black tracking-tight uppercase leading-none">{logoText}</span>
              </div>
            )}
          </Link>
          <button onClick={onClose} className="p-2 -mr-2 text-gray-400 hover:text-black">
            <FiX size={26} strokeWidth={1.5} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <div className="flex flex-col pb-6">
            {menuTree.map((item, idx) => (
              <MobileMenuItem key={item.id || idx} item={item} level={0} onClose={onClose} />
            ))}
          </div>
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
