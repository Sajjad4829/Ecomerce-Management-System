import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMoreVertical, FiEdit2, FiEye, FiCopy, FiTrash2, FiSettings, FiGrid, FiList } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import CatalogToolbar from '../../../components/commerce/shared/CatalogToolbar';
import CatalogFilters from '../../../components/commerce/shared/CatalogFilters';
import CatalogStatusBadge from '../../../components/commerce/shared/CatalogStatusBadge';
import BulkAttributeBar from '../../../components/commerce/attributes/BulkAttributeBar';
import AttributePreview from '../../../components/commerce/attributes/AttributePreview';

export default function AttributeManager() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('list');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [previewAttribute, setPreviewAttribute] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);

  const [attributes, setAttributes] = useState([
    {
      id: 'attr-1',
      name: 'Material',
      slug: 'material',
      type: 'select',
      group: 'Materials',
      status: 'published',
      filterable: true,
      variantEnabled: true,
      usageCount: 142,
      updatedAt: '2026-08-08',
      values: ['Solid Wood', 'Engineered Wood', 'Metal', 'Glass']
    },
    {
      id: 'attr-2',
      name: 'Color',
      slug: 'color',
      type: 'color',
      group: 'General',
      status: 'published',
      filterable: true,
      variantEnabled: true,
      usageCount: 89,
      updatedAt: '2026-08-07',
      values: ['Black', 'White', 'Walnut', 'Oak']
    },
    {
      id: 'attr-3',
      name: 'Width',
      slug: 'width',
      type: 'measurement',
      group: 'Dimensions',
      status: 'published',
      filterable: false,
      variantEnabled: false,
      usageCount: 215,
      updatedAt: '2026-08-06',
      values: []
    }
  ]);

  const handleSelectAll = (checked) => {
    if (checked) setSelectedAttributes(attributes.map(a => a.id));
    else setSelectedAttributes([]);
  };

  const handleSelectOne = (id, checked) => {
    if (checked) setSelectedAttributes(prev => [...prev, id]);
    else setSelectedAttributes(prev => prev.filter(a => a !== id));
  };

  const toggleMenu = (id, e) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === id ? null : id);
  };

  const filteredAttributes = attributes.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    a.group.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto relative pb-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-mono text-[10px] uppercase font-bold">
              Catalog Engine
            </span>
          </div>
          <h1 className="font-serif font-bold text-2xl text-stone-900 mt-1">Attributes & Specifications</h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Manage reusable product attributes, specifications, and variants.
          </p>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => navigate('/admin/catalog/attributes/groups')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 text-stone-700 rounded-lg text-xs font-semibold hover:bg-stone-50 transition-colors shadow-sm"
          >
            <FiSettings size={14} />
            Manage Groups
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {showFilters && (
          <div className="w-full lg:w-64 shrink-0">
            <CatalogFilters onClose={() => setShowFilters(false)} />
          </div>
        )}

        <div className="flex-1 w-full space-y-4">
          <CatalogToolbar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            viewMode={viewMode}
            setViewMode={setViewMode}
            onToggleFilters={() => setShowFilters(!showFilters)}
            onCreate={() => navigate('/admin/catalog/attributes/new')}
            showFilters={showFilters}
            createLabel="Create Attribute"
          />

          <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200">
                    <th className="p-4 w-10">
                      <input 
                        type="checkbox" 
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        checked={attributes.length > 0 && selectedAttributes.length === attributes.length}
                        className="w-4 h-4 rounded border-stone-300 text-stone-900 focus:ring-stone-900"
                      />
                    </th>
                    <th className="p-4 text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider">Attribute</th>
                    <th className="p-4 text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider">Type / Group</th>
                    <th className="p-4 text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider">Status</th>
                    <th className="p-4 text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider">Usage</th>
                    <th className="p-4 text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider">Properties</th>
                    <th className="p-4 w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredAttributes.map(attr => (
                    <tr 
                      key={attr.id}
                      className={`hover:bg-stone-50 transition-colors group cursor-pointer ${selectedAttributes.includes(attr.id) ? 'bg-stone-50' : ''}`}
                      onClick={(e) => {
                        if (e.target.type !== 'checkbox' && !e.target.closest('button')) {
                          navigate(`/admin/catalog/attributes/${attr.id}`);
                        }
                      }}
                    >
                      <td className="p-4" onClick={e => e.stopPropagation()}>
                        <input 
                          type="checkbox"
                          checked={selectedAttributes.includes(attr.id)}
                          onChange={(e) => handleSelectOne(attr.id, e.target.checked)}
                          className="w-4 h-4 rounded border-stone-300 text-stone-900 focus:ring-stone-900"
                        />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="font-semibold text-stone-900 text-sm group-hover:text-amber-700 transition-colors">{attr.name}</p>
                            <p className="text-xs text-stone-500 font-mono">/{attr.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-1">
                          <span className="font-mono text-xs text-stone-600 bg-stone-100 px-1.5 py-0.5 rounded uppercase w-fit">
                            {attr.type}
                          </span>
                          <span className="text-xs text-stone-500">{attr.group}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <CatalogStatusBadge status={attr.status} />
                      </td>
                      <td className="p-4 text-sm text-stone-600">
                        {attr.usageCount}
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {attr.filterable && (
                            <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded text-[10px] font-bold uppercase tracking-wider">Filter</span>
                          )}
                          {attr.variantEnabled && (
                            <span className="px-1.5 py-0.5 bg-purple-50 text-purple-700 border border-purple-200 rounded text-[10px] font-bold uppercase tracking-wider">Variant</span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 relative" onClick={e => e.stopPropagation()}>
                        <button 
                          onClick={(e) => toggleMenu(attr.id, e)}
                          className="p-1.5 text-stone-400 hover:text-stone-900 hover:bg-stone-200 rounded transition-colors"
                        >
                          <FiMoreVertical size={16} />
                        </button>
                        
                        <AnimatePresence>
                          {activeMenu === attr.id && (
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="absolute right-0 top-full mt-1 w-40 bg-white border border-stone-200 rounded-lg shadow-xl z-10 py-1"
                            >
                              <button onClick={() => { navigate(`/admin/catalog/attributes/${attr.id}`); setActiveMenu(null); }} className="w-full text-left px-3 py-1.5 text-xs text-stone-700 hover:bg-stone-50 flex items-center gap-2">
                                <FiEdit2 size={12} /> Edit
                              </button>
                              <button onClick={() => { setPreviewAttribute(attr); setActiveMenu(null); }} className="w-full text-left px-3 py-1.5 text-xs text-stone-700 hover:bg-stone-50 flex items-center gap-2">
                                <FiEye size={12} /> Preview
                              </button>
                              <button className="w-full text-left px-3 py-1.5 text-xs text-stone-700 hover:bg-stone-50 flex items-center gap-2">
                                <FiCopy size={12} /> Duplicate
                              </button>
                              <div className="h-px bg-stone-100 my-1" />
                              <button className="w-full text-left px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2">
                                <FiTrash2 size={12} /> Delete
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </td>
                    </tr>
                  ))}
                  {filteredAttributes.length === 0 && (
                    <tr>
                      <td colSpan="7" className="p-8 text-center text-stone-500 text-sm">
                        No attributes found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <BulkAttributeBar 
        selectedCount={selectedAttributes.length} 
        onClear={() => setSelectedAttributes([])} 
      />

      <AttributePreview 
        attribute={previewAttribute}
        isOpen={!!previewAttribute}
        onClose={() => setPreviewAttribute(null)}
      />
    </div>
  );
}
