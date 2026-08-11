import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CatalogToolbar from '../../../components/commerce/shared/CatalogToolbar';
import CatalogFilters from '../../../components/commerce/shared/CatalogFilters';
import BulkCatalogBar from '../../../components/commerce/shared/BulkCatalogBar';
import CategoryTree from '../../../components/commerce/categories/CategoryTree';
import CategoryPreview from '../../../components/commerce/categories/CategoryPreview';

export default function CategoryManager() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [previewCategory, setPreviewCategory] = useState(null);

  // Mock taxonomy data
  const [categories, setCategories] = useState([
    {
      id: 'cat-1',
      name: 'Furniture',
      slug: 'furniture',
      status: 'published',
      featured: true,
      productCount: 142,
      updatedAt: '2026-08-08',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=400',
      children: [
        {
          id: 'cat-1-1',
          name: 'Living Room',
          slug: 'living-room',
          status: 'published',
          featured: false,
          productCount: 64,
          updatedAt: '2026-08-07',
          children: [
            { id: 'cat-1-1-1', name: 'Sofas', slug: 'sofas', status: 'published', productCount: 24, featured: false, updatedAt: '2026-08-06', children: [] },
            { id: 'cat-1-1-2', name: 'Coffee Tables', slug: 'coffee-tables', status: 'published', productCount: 18, featured: false, updatedAt: '2026-08-05', children: [] }
          ]
        },
        {
          id: 'cat-1-2',
          name: 'Bedroom',
          slug: 'bedroom',
          status: 'published',
          featured: false,
          productCount: 42,
          updatedAt: '2026-08-07',
          children: [
            { id: 'cat-1-2-1', name: 'Beds', slug: 'beds', status: 'published', productCount: 12, featured: true, updatedAt: '2026-08-06', children: [] }
          ]
        }
      ]
    },
    {
      id: 'cat-2',
      name: 'Lighting',
      slug: 'lighting',
      status: 'published',
      featured: true,
      productCount: 45,
      updatedAt: '2026-08-08',
      image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e9d15?auto=format&fit=crop&q=80&w=400',
      children: []
    }
  ]);

  const handleSelectOne = (id, checked) => {
    if (checked) setSelectedCategories(prev => [...prev, id]);
    else setSelectedCategories(prev => prev.filter(c => c !== id));
  };

  const flattenCategories = (cats) => {
    let flat = [];
    cats.forEach(c => {
      flat.push(c);
      if (c.children) flat = flat.concat(flattenCategories(c.children));
    });
    return flat;
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedCategories(flattenCategories(categories).map(c => c.id));
    } else {
      setSelectedCategories([]);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto relative pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-mono text-[10px] uppercase font-bold">
              Catalog Management
            </span>
          </div>
          <h1 className="font-serif font-bold text-2xl text-stone-900 mt-1">Categories</h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Organize products into hierarchical taxonomies.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Filters Sidebar */}
        {showFilters && (
          <div className="w-full lg:w-64 shrink-0">
            <CatalogFilters onClose={() => setShowFilters(false)} />
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 w-full space-y-4">
          <CatalogToolbar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onToggleFilters={() => setShowFilters(!showFilters)}
            onCreate={() => navigate('/admin/catalog/categories/new')}
            showFilters={showFilters}
            createLabel="Create Category"
          />

          <CategoryTree 
            categories={categories}
            setCategories={setCategories}
            searchQuery={searchQuery}
            selectedCategories={selectedCategories}
            onSelectAll={handleSelectAll}
            onSelectOne={handleSelectOne}
            onEdit={(id) => navigate(`/admin/catalog/categories/${id}`)}
            onPreview={(c) => setPreviewCategory(c)}
          />
        </div>
      </div>

      {/* Floating Bulk Actions Bar */}
      <BulkCatalogBar 
        selectedCount={selectedCategories.length} 
        onClear={() => setSelectedCategories([])} 
      />

      {/* Preview Drawer */}
      <CategoryPreview 
        category={previewCategory} 
        isOpen={!!previewCategory} 
        onClose={() => setPreviewCategory(null)} 
      />
    </div>
  );
}
