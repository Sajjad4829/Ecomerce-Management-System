import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMoreVertical, FiEdit2, FiEye, FiCopy, FiTrash2 } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import CatalogToolbar from '../../../components/commerce/shared/CatalogToolbar';
import CatalogFilters from '../../../components/commerce/shared/CatalogFilters';
import BulkCatalogBar from '../../../components/commerce/shared/BulkCatalogBar';
import CatalogStatusBadge from '../../../components/commerce/shared/CatalogStatusBadge';
import BrandPreview from '../../../components/commerce/brands/BrandPreview';

export default function BrandManager() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [previewBrand, setPreviewBrand] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);

  const [brands, setBrands] = useState([
    {
      id: 'brand-1',
      name: 'Aurelia Signature',
      slug: 'aurelia-signature',
      status: 'published',
      featured: true,
      productCount: 156,
      updatedAt: '2026-08-08',
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&q=80&w=200',
    },
    {
      id: 'brand-2',
      name: 'Nordic Heritage',
      slug: 'nordic-heritage',
      status: 'published',
      featured: false,
      productCount: 34,
      updatedAt: '2026-08-01',
      logo: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=200',
    }
  ]);

  const handleSelectAll = (checked) => {
    if (checked) setSelectedBrands(brands.map(b => b.id));
    else setSelectedBrands([]);
  };

  const handleSelectOne = (id, checked) => {
    if (checked) setSelectedBrands(prev => [...prev, id]);
    else setSelectedBrands(prev => prev.filter(b => b !== id));
  };

  const toggleMenu = (id, e) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === id ? null : id);
  };

  const filteredBrands = brands.filter(b => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase())
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
          <h1 className="font-serif font-bold text-2xl text-text-primary mt-1">Brands</h1>
          <p className="text-xs text-text-muted mt-0.5">
            Manage partner brands, designers, and manufacturers.
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
            onCreate={() => navigate('/admin/catalog/brands/new')}
            showFilters={showFilters}
            createLabel="Create Brand"
          />

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBrands.map(brand => (
                <div key={brand.id} className="bg-surface border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow relative group">
                  <div className="absolute top-2 left-2 z-10">
                    <input 
                      type="checkbox" 
                      checked={selectedBrands.includes(brand.id)}
                      onChange={(e) => handleSelectOne(brand.id, e.target.checked)}
                      className="w-4 h-4 rounded border-border-hover text-text-primary focus:ring-stone-900 shadow-sm"
                    />
                  </div>
                  
                  <div className="absolute top-2 right-2 z-10">
                    <button 
                      onClick={(e) => toggleMenu(brand.id, e)}
                      className="p-1 bg-surface/90 backdrop-blur rounded shadow-sm text-text-secondary hover:text-text-primary"
                    >
                      <FiMoreVertical size={16} />
                    </button>
                    <AnimatePresence>
                      {activeMenu === brand.id && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="absolute right-0 top-full mt-1 w-40 bg-surface border border-border rounded-lg shadow-xl z-20 py-1"
                        >
                          <button onClick={() => { navigate(`/admin/catalog/brands/${brand.id}`); setActiveMenu(null); }} className="w-full text-left px-3 py-1.5 text-xs text-text-secondary hover:bg-background flex items-center gap-2">
                            <FiEdit2 size={12} /> Edit
                          </button>
                          <button onClick={() => { setPreviewBrand(brand); setActiveMenu(null); }} className="w-full text-left px-3 py-1.5 text-xs text-text-secondary hover:bg-background flex items-center gap-2">
                            <FiEye size={12} /> Preview
                          </button>
                          <div className="h-px bg-stone-100 my-1" />
                          <button className="w-full text-left px-3 py-1.5 text-xs text-danger hover:bg-danger-soft flex items-center gap-2">
                            <FiTrash2 size={12} /> Delete
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="aspect-[4/3] bg-background p-8 flex items-center justify-center border-b border-stone-100 cursor-pointer" onClick={() => navigate(`/admin/catalog/brands/${brand.id}`)}>
                    <img src={brand.logo} alt={brand.name} className="w-24 h-24 object-contain rounded-full shadow-sm bg-surface" />
                  </div>

                  <div className="p-4 cursor-pointer" onClick={() => navigate(`/admin/catalog/brands/${brand.id}`)}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-serif font-bold text-text-primary text-sm line-clamp-1">{brand.name}</h3>
                      <CatalogStatusBadge status={brand.status} />
                    </div>
                    <div className="flex items-center justify-between text-xs text-text-muted">
                      <span>{brand.productCount} Products</span>
                      {brand.featured && <span className="text-warning font-medium">Featured</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
                          checked={brands.length > 0 && selectedBrands.length === brands.length}
                          className="w-4 h-4 rounded border-border-hover text-text-primary focus:ring-stone-900"
                        />
                      </th>
                      <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Brand</th>
                      <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Status</th>
                      <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Products</th>
                      <th className="p-4 w-10"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredBrands.map(brand => (
                      <tr 
                        key={brand.id}
                        className={`hover:bg-background transition-colors group cursor-pointer ${selectedBrands.includes(brand.id) ? 'bg-background' : ''}`}
                        onClick={(e) => {
                          if (e.target.type !== 'checkbox' && !e.target.closest('button')) {
                            navigate(`/admin/catalog/brands/${brand.id}`);
                          }
                        }}
                      >
                        <td className="p-4" onClick={e => e.stopPropagation()}>
                          <input 
                            type="checkbox"
                            checked={selectedBrands.includes(brand.id)}
                            onChange={(e) => handleSelectOne(brand.id, e.target.checked)}
                            className="w-4 h-4 rounded border-border-hover text-text-primary focus:ring-stone-900"
                          />
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-background border border-border overflow-hidden shrink-0 flex items-center justify-center p-1">
                              <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-semibold text-text-primary text-sm group-hover:text-warning transition-colors">{brand.name}</p>
                                {brand.featured && <span className="text-[10px] bg-warning-soft text-amber-800 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Featured</span>}
                              </div>
                              <p className="text-xs text-text-muted font-mono">/{brand.slug}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <CatalogStatusBadge status={brand.status} />
                        </td>
                        <td className="p-4 text-sm text-text-secondary">
                          {brand.productCount}
                        </td>
                        <td className="p-4 relative" onClick={e => e.stopPropagation()}>
                          <button 
                            onClick={(e) => toggleMenu(brand.id, e)}
                            className="p-1.5 text-text-muted hover:text-text-primary hover:bg-stone-200 rounded transition-colors"
                          >
                            <FiMoreVertical size={16} />
                          </button>
                          
                          <AnimatePresence>
                            {activeMenu === brand.id && (
                              <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="absolute right-0 top-full mt-1 w-40 bg-surface border border-border rounded-lg shadow-xl z-10 py-1"
                              >
                                <button onClick={() => { navigate(`/admin/catalog/brands/${brand.id}`); setActiveMenu(null); }} className="w-full text-left px-3 py-1.5 text-xs text-text-secondary hover:bg-background flex items-center gap-2">
                                  <FiEdit2 size={12} /> Edit
                                </button>
                                <button onClick={() => { setPreviewBrand(brand); setActiveMenu(null); }} className="w-full text-left px-3 py-1.5 text-xs text-text-secondary hover:bg-background flex items-center gap-2">
                                  <FiEye size={12} /> Preview
                                </button>
                                <div className="h-px bg-stone-100 my-1" />
                                <button className="w-full text-left px-3 py-1.5 text-xs text-danger hover:bg-danger-soft flex items-center gap-2">
                                  <FiTrash2 size={12} /> Delete
                                </button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </td>
                      </tr>
                    ))}
                    {filteredBrands.length === 0 && (
                      <tr>
                        <td colSpan="5" className="p-8 text-center text-text-muted text-sm">
                          No brands found.
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
        selectedCount={selectedBrands.length} 
        onClear={() => setSelectedBrands([])} 
      />

      <BrandPreview 
        brand={previewBrand}
        isOpen={!!previewBrand}
        onClose={() => setPreviewBrand(null)}
      />
    </div>
  );
}
