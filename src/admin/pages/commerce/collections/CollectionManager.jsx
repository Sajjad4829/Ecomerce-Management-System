import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMoreVertical, FiEdit2, FiEye, FiCopy, FiTrash2, FiClock } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import CatalogToolbar from '../../../components/commerce/shared/CatalogToolbar';
import CatalogFilters from '../../../components/commerce/shared/CatalogFilters';
import BulkCatalogBar from '../../../components/commerce/shared/BulkCatalogBar';
import CatalogStatusBadge from '../../../components/commerce/shared/CatalogStatusBadge';
import CollectionPreview from '../../../components/commerce/collections/CollectionPreview';

export default function CollectionManager() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('list');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [previewCollection, setPreviewCollection] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);

  const [collections, setCollections] = useState([
    {
      id: 'col-1',
      name: 'The Sanctuary Collection',
      slug: 'the-sanctuary',
      type: 'manual',
      status: 'published',
      featured: true,
      productCount: 12,
      updatedAt: '2026-08-08',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'col-2',
      name: 'Autumn Arrival 2026',
      slug: 'autumn-arrival',
      type: 'automatic',
      status: 'scheduled',
      featured: false,
      productCount: 45,
      updatedAt: '2026-08-05',
      image: 'https://images.unsplash.com/photo-1499933374294-458eb8a200f3?auto=format&fit=crop&q=80&w=400',
      scheduleDate: '2026-09-01T00:00:00Z'
    }
  ]);

  const handleSelectAll = (checked) => {
    if (checked) setSelectedCollections(collections.map(c => c.id));
    else setSelectedCollections([]);
  };

  const handleSelectOne = (id, checked) => {
    if (checked) setSelectedCollections(prev => [...prev, id]);
    else setSelectedCollections(prev => prev.filter(c => c !== id));
  };

  const toggleMenu = (id, e) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === id ? null : id);
  };

  const filteredCollections = collections.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto relative pb-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-mono text-[10px] uppercase font-bold">
              Catalog Management
            </span>
          </div>
          <h1 className="font-serif font-bold text-2xl text-stone-900 mt-1">Collections</h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Create curated product groupings and automated merchandising rules.
          </p>
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
            onCreate={() => navigate('/admin/catalog/collections/new')}
            showFilters={showFilters}
            createLabel="Create Collection"
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
                        checked={collections.length > 0 && selectedCollections.length === collections.length}
                        className="w-4 h-4 rounded border-stone-300 text-stone-900 focus:ring-stone-900"
                      />
                    </th>
                    <th className="p-4 text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider">Collection</th>
                    <th className="p-4 text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider">Type</th>
                    <th className="p-4 text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider">Status</th>
                    <th className="p-4 text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider">Products</th>
                    <th className="p-4 w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredCollections.map(collection => (
                    <tr 
                      key={collection.id}
                      className={`hover:bg-stone-50 transition-colors group cursor-pointer ${selectedCollections.includes(collection.id) ? 'bg-stone-50' : ''}`}
                      onClick={(e) => {
                        if (e.target.type !== 'checkbox' && !e.target.closest('button')) {
                          navigate(`/admin/catalog/collections/${collection.id}`);
                        }
                      }}
                    >
                      <td className="p-4" onClick={e => e.stopPropagation()}>
                        <input 
                          type="checkbox"
                          checked={selectedCollections.includes(collection.id)}
                          onChange={(e) => handleSelectOne(collection.id, e.target.checked)}
                          className="w-4 h-4 rounded border-stone-300 text-stone-900 focus:ring-stone-900"
                        />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded bg-stone-100 border border-stone-200 overflow-hidden shrink-0">
                            <img src={collection.image} alt={collection.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="font-semibold text-stone-900 text-sm group-hover:text-amber-700 transition-colors">{collection.name}</p>
                            <p className="text-xs text-stone-500 font-mono">/{collection.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-mono text-xs text-stone-600 bg-stone-100 px-1.5 py-0.5 rounded uppercase">
                          {collection.type}
                        </span>
                      </td>
                      <td className="p-4">
                        <CatalogStatusBadge status={collection.status} />
                        {collection.status === 'scheduled' && (
                          <div className="flex items-center gap-1 text-[10px] text-stone-500 mt-1 font-mono">
                            <FiClock size={10} /> {new Date(collection.scheduleDate).toLocaleDateString()}
                          </div>
                        )}
                      </td>
                      <td className="p-4 text-sm text-stone-600">
                        {collection.productCount} Assigned
                      </td>
                      <td className="p-4 relative" onClick={e => e.stopPropagation()}>
                        <button 
                          onClick={(e) => toggleMenu(collection.id, e)}
                          className="p-1.5 text-stone-400 hover:text-stone-900 hover:bg-stone-200 rounded transition-colors"
                        >
                          <FiMoreVertical size={16} />
                        </button>
                        
                        <AnimatePresence>
                          {activeMenu === collection.id && (
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="absolute right-0 top-full mt-1 w-40 bg-white border border-stone-200 rounded-lg shadow-xl z-10 py-1"
                            >
                              <button onClick={() => { navigate(`/admin/catalog/collections/${collection.id}`); setActiveMenu(null); }} className="w-full text-left px-3 py-1.5 text-xs text-stone-700 hover:bg-stone-50 flex items-center gap-2">
                                <FiEdit2 size={12} /> Edit
                              </button>
                              <button onClick={() => { setPreviewCollection(collection); setActiveMenu(null); }} className="w-full text-left px-3 py-1.5 text-xs text-stone-700 hover:bg-stone-50 flex items-center gap-2">
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
                  {filteredCollections.length === 0 && (
                    <tr>
                      <td colSpan="6" className="p-8 text-center text-stone-500 text-sm">
                        No collections found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <BulkCatalogBar 
        selectedCount={selectedCollections.length} 
        onClear={() => setSelectedCollections([])} 
      />

      <CollectionPreview 
        collection={previewCollection}
        isOpen={!!previewCollection}
        onClose={() => setPreviewCollection(null)}
      />
    </div>
  );
}
