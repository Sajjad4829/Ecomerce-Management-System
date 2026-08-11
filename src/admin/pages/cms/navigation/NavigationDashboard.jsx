import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiSearch, FiEdit2, FiCopy, FiTrash2, FiEye } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../../../utils/cn';

const NAV_MENUS = [
  { id: '1', name: 'Main Header Navigation', location: 'Primary Header', items: 8, status: 'active', updated: '2 hours ago' },
  { id: '2', name: 'Footer Navigation - Shop', location: 'Footer Column 1', items: 5, status: 'active', updated: '1 day ago' },
  { id: '3', name: 'Footer Navigation - Support', location: 'Footer Column 2', items: 4, status: 'active', updated: '1 day ago' },
  { id: '4', name: 'Mobile Drawer Menu', location: 'Mobile Nav', items: 12, status: 'active', updated: '3 days ago' },
  { id: '5', name: 'Holiday Promo Menu', location: 'Unassigned', items: 3, status: 'draft', updated: '1 week ago' },
];

export default function NavigationDashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

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
          <div className="flex items-center gap-2 mb-2 text-sm text-gray-500">
            <span>CMS</span>
            <span className="text-gray-300">/</span>
            <span className="text-[#1A1A1A] font-semibold">Navigation</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#1A1A1A]">Navigation Builder</h1>
          <p className="text-sm text-gray-500 mt-2 max-w-xl leading-relaxed">
            Manage menus, mega menus, and navigational structures across your entire platform.
          </p>
        </div>
        <button 
          onClick={() => navigate('/admin/cms/navigation/editor')}
          className="bg-[#1A1A1A] text-white px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-black/80 transition-colors shadow-lg flex items-center justify-center gap-2 shrink-0"
        >
          <FiPlus size={16} /> Create Menu
        </button>
      </motion.div>

      {/* Filters and List */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="bg-white border border-black/5 rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-black/5 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50">
            <div className="relative w-full sm:w-96">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search menus..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black/30 transition-colors"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select className="flex-1 sm:flex-none px-4 py-2 bg-white border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black/30 appearance-none">
                <option>All Locations</option>
                <option>Primary Header</option>
                <option>Footer</option>
                <option>Mobile Nav</option>
              </select>
              <select className="flex-1 sm:flex-none px-4 py-2 bg-white border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black/30 appearance-none">
                <option>All Status</option>
                <option>Active</option>
                <option>Draft</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-black/5">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Menu Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Location</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Items</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Last Updated</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {NAV_MENUS.map((menu) => (
                  <tr key={menu.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-[#1A1A1A]">{menu.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{menu.location}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-500 font-mono">{menu.items}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest",
                        menu.status === 'active' ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                      )}>
                        {menu.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-500">{menu.updated}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-gray-400 hover:text-[#1A1A1A] hover:bg-white rounded-lg border border-transparent hover:border-black/10 transition-all" title="Preview">
                          <FiEye size={16} />
                        </button>
                        <button 
                          onClick={() => navigate('/admin/cms/navigation/editor')}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-white rounded-lg border border-transparent hover:border-black/10 transition-all" 
                          title="Edit"
                        >
                          <FiEdit2 size={16} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-[#1A1A1A] hover:bg-white rounded-lg border border-transparent hover:border-black/10 transition-all" title="Duplicate">
                          <FiCopy size={16} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-white rounded-lg border border-transparent hover:border-black/10 transition-all" title="Delete">
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
