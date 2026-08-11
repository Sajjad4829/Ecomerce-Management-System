import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import CatalogToolbar from '../../../components/commerce/shared/CatalogToolbar';
import CatalogFilters from '../../../components/commerce/shared/CatalogFilters';
import BulkCatalogBar from '../../../components/commerce/shared/BulkCatalogBar';
import CategoryTree from '../../../components/commerce/categories/CategoryTree';
import CategoryGrid from '../../../components/commerce/categories/CategoryGrid';
import CategoryPreview from '../../../components/commerce/categories/CategoryPreview';
import { useCategories } from '../../../context/commerce/CategoryContext';
import { useProducts } from '../../../context/commerce/ProductContext';

export default function CategoryManager() {
  const navigate = useNavigate();
  const { categories, getCategoryTree, bulkUpdateStatus, bulkSetFeatured, bulkDelete } = useCategories();
  const { products } = useProducts();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('list');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [previewCategory, setPreviewCategory] = useState(null);

  // Dynamically augment categories with live product counts
  const categoriesWithCounts = useMemo(() => {
    return categories.map(c => ({
      ...c,
      productCount: products.filter(p => p.categoryId === c.id).length
    }));
  }, [categories, products]);

  // Build the tree from the augmented categories
  const categoryTree = useMemo(() => {
    return getCategoryTree(categoriesWithCounts);
  }, [getCategoryTree, categoriesWithCounts]);

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
      setSelectedCategories(categories.map(c => c.id));
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
            viewMode={viewMode}
            setViewMode={setViewMode}
            onToggleFilters={() => setShowFilters(!showFilters)}
            onCreate={() => navigate('/admin/catalog/categories/new')}
            showFilters={showFilters}
            createLabel="Create Category"
          />

          {viewMode === 'list' ? (
            <CategoryTree 
              categories={categoryTree}
              searchQuery={searchQuery}
              selectedCategories={selectedCategories}
              onSelectAll={handleSelectAll}
              onSelectOne={handleSelectOne}
              onEdit={(id) => navigate(`/admin/catalog/categories/${id}`)}
              onPreview={(c) => setPreviewCategory(c)}
            />
          ) : (
            <CategoryGrid 
              categories={categoryTree}
              searchQuery={searchQuery}
              selectedCategories={selectedCategories}
              onSelectOne={handleSelectOne}
              onEdit={(id) => navigate(`/admin/catalog/categories/${id}`)}
              onPreview={(c) => setPreviewCategory(c)}
            />
          )}
        </div>
      </div>

      {/* Floating Bulk Actions Bar */}
      <BulkCatalogBar 
        selectedCount={selectedCategories.length} 
        onClear={() => setSelectedCategories([])} 
        onAction={(action) => {
          try {
            if (action === 'delete') {
              bulkDelete(selectedCategories, products);
              setSelectedCategories([]);
            } else if (action === 'publish') {
              bulkUpdateStatus(selectedCategories, 'published');
            } else if (action === 'draft') {
              bulkUpdateStatus(selectedCategories, 'draft');
            }
          } catch (error) {
            alert(error.message); // Will replace with toast later
          }
        }}
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
