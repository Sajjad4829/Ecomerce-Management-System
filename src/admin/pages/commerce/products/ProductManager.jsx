import { useState } from 'react';
import ProductToolbar from '../../../components/commerce/products/ProductToolbar';
import ProductTable from '../../../components/commerce/products/ProductTable';
import ProductFilters from '../../../components/commerce/products/ProductFilters';
import BulkProductBar from '../../../components/commerce/products/BulkProductBar';
import ProductPreview from '../../../components/commerce/products/ProductPreview';
import DuplicateProductModal from '../../../components/commerce/products/DuplicateProductModal';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../../context/commerce/ProductContext';

export default function ProductManager() {
  const navigate = useNavigate();
  const { products, bulkDelete, bulkUpdateStatus } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('list');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  
  // Modals / Drawers
  const [previewProduct, setPreviewProduct] = useState(null);
  const [duplicateProduct, setDuplicateProduct] = useState(null);

  const handleSelectAll = (checked) => {
    if (checked) setSelectedProducts(products.map(p => p.id));
    else setSelectedProducts([]);
  };

  const handleSelectOne = (id, checked) => {
    if (checked) setSelectedProducts(prev => [...prev, id]);
    else setSelectedProducts(prev => prev.filter(p => p !== id));
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDuplicate = (config) => {
    const original = products.find(p => p.id === duplicateProduct);
    if (!original) return;
    
    const duplicate = {
      ...original,
      id: `prod-${Date.now()}`,
      sku: `${original.sku}-COPY`,
      name: `${original.name} (Copy)`,
      status: 'draft',
      updatedAt: new Date().toISOString().split('T')[0]
    };
    
    setProducts(prev => [duplicate, ...prev]);
    setDuplicateProduct(null);
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
          <h1 className="font-serif font-bold text-2xl text-stone-900 mt-1">Products</h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Manage your bespoke furniture catalog, variants, and pricing.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Filters Sidebar */}
        {showFilters && (
          <div className="w-full lg:w-64 shrink-0">
            <ProductFilters onClose={() => setShowFilters(false)} />
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 w-full space-y-4">
          <ProductToolbar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            viewMode={viewMode}
            setViewMode={setViewMode}
            onToggleFilters={() => setShowFilters(!showFilters)}
            onCreate={() => navigate('/admin/catalog/products/new')}
            showFilters={showFilters}
          />

          <ProductTable 
            products={filteredProducts}
            viewMode={viewMode}
            selectedProducts={selectedProducts}
            onSelectAll={handleSelectAll}
            onSelectOne={handleSelectOne}
            onEdit={(id) => navigate(`/admin/catalog/products/${id}`)}
            onPreview={(p) => setPreviewProduct(p)}
            onDuplicate={(p) => setDuplicateProduct(p.id)}
            onDelete={(id) => setProducts(products.filter(p => p.id !== id))}
          />
        </div>
      </div>

      {/* Floating Bulk Actions Bar */}
      <BulkProductBar 
        selectedCount={selectedProducts.length} 
        onClear={() => setSelectedProducts([])} 
        onAction={(action) => {
          if (action === 'delete') {
            bulkDelete(selectedProducts);
          } else if (action === 'publish') {
            bulkUpdateStatus(selectedProducts, 'published');
          } else if (action === 'draft') {
            bulkUpdateStatus(selectedProducts, 'draft');
          }
          setSelectedProducts([]);
        }}
      />

      {/* Preview Drawer */}
      <ProductPreview 
        product={previewProduct} 
        isOpen={!!previewProduct} 
        onClose={() => setPreviewProduct(null)} 
      />

      {/* Duplicate Modal */}
      <DuplicateProductModal 
        isOpen={!!duplicateProduct}
        onClose={() => setDuplicateProduct(null)}
        onConfirm={handleDuplicate}
      />
    </div>
  );
}
