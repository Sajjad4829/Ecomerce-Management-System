import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCollections } from '../../../context/commerce/CollectionContext';
import { FiMoreVertical, FiEdit2, FiEye, FiCopy, FiTrash2, FiClock } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import CatalogToolbar from '../../../components/commerce/shared/CatalogToolbar';
import CatalogFilters from '../../../components/commerce/shared/CatalogFilters';
import BulkCatalogBar from '../../../components/commerce/shared/BulkCatalogBar';
import CatalogStatusBadge from '../../../components/commerce/shared/CatalogStatusBadge';
import CollectionPreview from '../../../components/commerce/collections/CollectionPreview';
import CollectionGrid from '../../../components/commerce/collections/CollectionGrid';

export default function CollectionManager() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('list');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [previewCollection, setPreviewCollection] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const { collections, duplicateCollection, deleteCollection, bulkDelete, bulkUpdateStatus } = useCollections();

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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-warning-soft text-amber-900 font-mono text-[10px] uppercase font-bold">
              Catalog Management
            </span>
          </div>
          <h1 className="font-serif font-bold text-2xl text-text-primary mt-1">Collections</h1>
          <p className="text-xs text-text-muted mt-0.5">
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

          {viewMode === 'grid' ? (
            <CollectionGrid 
              collections={filteredCollections}
              selectedCollections={selectedCollections}
              onSelectAll={handleSelectAll}
              onSelectOne={handleSelectOne}
              onDuplicate={duplicateCollection}
              onDelete={deleteCollection}
              onPreview={setPreviewCollection}
            />
          ) : (
            <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-background border-b border-border">
                      <th className="p-4 w-10">
                        <input 
                          type="checkbox" 
                          onChange={(e) => handleSelectAll(e.target.checked)}
                          checked={collections.length > 0 && selectedCollections.length === collections.length}
                          className="w-4 h-4 rounded border-border-hover text-text-primary focus:ring-stone-900"
                        />
                      </th>
                      <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Collection</th>
                      <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Type</th>
                      <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Status</th>
                      <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Products</th>
                      <th className="p-4 w-10"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredCollections.map(collection => (
                      <tr 
                        key={collection.id}
                        className={`hover:bg-background transition-colors group cursor-pointer ${selectedCollections.includes(collection.id) ? 'bg-background' : ''}`}
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
                            className="w-4 h-4 rounded border-border-hover text-text-primary focus:ring-stone-900"
                          />
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded bg-stone-100 border border-border overflow-hidden shrink-0">
                              <img src={collection.image} alt={collection.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-semibold text-text-primary">{collection.name}</p>
                                {collection.featured && (
                                  <span className="px-1.5 py-0.5 rounded-sm bg-warning-soft text-amber-900 text-[9px] font-mono font-bold uppercase tracking-wider">
                                    Featured
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-text-muted font-mono mt-0.5">/{collection.slug}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="capitalize text-sm font-medium text-text-secondary">{collection.type}</span>
                        </td>
                        <td className="p-4">
                          <CatalogStatusBadge status={collection.status} />
                          {collection.status === 'scheduled' && (
                            <div className="flex items-center gap-1 text-[10px] text-text-muted mt-1 font-mono">
                              <FiClock size={10} /> {new Date(collection.startAt).toLocaleDateString()}
                            </div>
                          )}
                        </td>
                        <td className="p-4">
                          <span className="font-mono text-sm text-text-secondary">
                            {collection.productIds ? collection.productIds.length : (collection.resolvedProducts?.length || 0)} items
                          </span>
                        </td>
                        <td className="p-4 relative" onClick={e => e.stopPropagation()}>
                          <button 
                            onClick={(e) => toggleMenu(collection.id, e)}
                            className="p-2 hover:bg-stone-200 rounded transition-colors text-text-muted group-hover:text-text-secondary"
                          >
                            <FiMoreVertical size={18} />
                          </button>

                          <AnimatePresence>
                            {activeMenu === collection.id && (
                              <>
                                <div 
                                  className="fixed inset-0 z-40" 
                                  onClick={() => setActiveMenu(null)}
                                />
                                <motion.div 
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.95 }}
                                  transition={{ duration: 0.1 }}
                                  className="absolute right-10 top-4 w-48 bg-surface rounded-lg shadow-xl border border-border py-1 z-50 overflow-hidden"
                                >
                                  <button 
                                    onClick={() => {
                                      navigate(`/admin/catalog/collections/${collection.id}`);
                                      setActiveMenu(null);
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-text-secondary hover:bg-background flex items-center gap-2"
                                  >
                                    <FiEdit2 size={14} /> Edit Collection
                                  </button>
                                  <button 
                                    onClick={() => {
                                      setPreviewCollection(collection);
                                      setActiveMenu(null);
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-text-secondary hover:bg-background flex items-center gap-2"
                                  >
                                    <FiEye size={14} /> Live Preview
                                  </button>
                                  <button 
                                    onClick={() => {
                                      duplicateCollection(collection.id);
                                      setActiveMenu(null);
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-text-secondary hover:bg-background flex items-center gap-2"
                                  >
                                    <FiCopy size={14} /> Duplicate
                                  </button>
                                  <div className="h-px bg-stone-100 my-1" />
                                  <button 
                                    onClick={() => {
                                      deleteCollection(collection.id);
                                      setActiveMenu(null);
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-danger hover:bg-danger-soft flex items-center gap-2"
                                  >
                                    <FiTrash2 size={14} /> Delete
                                  </button>
                                </motion.div>
                              </>
                            )}
                          </AnimatePresence>
                        </td>
                      </tr>
                    ))}
                    {filteredCollections.length === 0 && (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-text-muted">
                          No collections found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      <BulkCatalogBar 
        selectedCount={selectedCollections.length} 
        onClear={() => setSelectedCollections([])} 
        onAction={(action) => {
          if (action === 'delete') {
            if (window.confirm(`Are you sure you want to delete ${selectedCollections.length} collections?`)) {
              bulkDelete(selectedCollections);
              setSelectedCollections([]);
            }
          } else if (action === 'publish') {
            bulkUpdateStatus(selectedCollections, 'published');
            setSelectedCollections([]);
          } else if (action === 'draft') {
            bulkUpdateStatus(selectedCollections, 'draft');
            setSelectedCollections([]);
          }
        }}
      />

      <CollectionPreview 
        collection={previewCollection}
        isOpen={!!previewCollection}
        onClose={() => setPreviewCollection(null)}
      />
    </div>
  );
}
