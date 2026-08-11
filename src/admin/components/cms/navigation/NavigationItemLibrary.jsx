import { useState } from 'react';
import { FiSearch, FiLink, FiFileText, FiFolder, FiTag, FiShoppingBag, FiGrid, FiLayout, FiImage } from 'react-icons/fi';
import { cn } from '../../../../utils/cn';

const LIBRARY_CATEGORIES = [
  {
    title: 'Basic Links',
    items: [
      { id: 'custom-link', label: 'Custom Link', icon: FiLink, desc: 'Link to any URL' },
      { id: 'mega-menu', label: 'Mega Menu', icon: FiLayout, desc: 'Rich multi-column menu' },
    ]
  },
  {
    title: 'Commerce',
    items: [
      { id: 'collection', label: 'Collection', icon: FiGrid, desc: 'Link to a product collection' },
      { id: 'category', label: 'Category', icon: FiFolder, desc: 'Link to a category' },
      { id: 'product', label: 'Product', icon: FiShoppingBag, desc: 'Link to specific product' },
      { id: 'brand', label: 'Brand', icon: FiTag, desc: 'Link to a brand page' },
    ]
  },
  {
    title: 'Content',
    items: [
      { id: 'page', label: 'Page', icon: FiFileText, desc: 'Link to CMS page' },
      { id: 'blog', label: 'Blog Post', icon: FiFileText, desc: 'Link to a blog post' },
      { id: 'promo', label: 'Promo Block', icon: FiImage, desc: 'Visual promotional banner' },
    ]
  }
];

export default function NavigationItemLibrary() {
  const [search, setSearch] = useState('');

  return (
    <div className="bg-white border border-black/5 rounded-xl flex flex-col h-full overflow-hidden shadow-sm">
      <div className="p-4 border-b border-black/5 shrink-0 bg-gray-50/50">
        <h3 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-widest mb-4">Add Items</h3>
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search item types..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black/30 transition-colors"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
        {LIBRARY_CATEGORIES.map((cat, i) => (
          <div key={i}>
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">{cat.title}</h4>
            <div className="space-y-2">
              {cat.items.map((item) => (
                <div 
                  key={item.id}
                  className="group flex items-start gap-3 p-3 rounded-lg border border-black/5 bg-gray-50 hover:bg-white hover:border-black/20 hover:shadow-sm cursor-grab transition-all"
                  draggable
                >
                  <div className="mt-0.5 text-gray-400 group-hover:text-[#1A1A1A] transition-colors">
                    <item.icon size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1A1A1A]">{item.label}</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
