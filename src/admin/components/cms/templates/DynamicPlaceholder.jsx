import { 
  FiShoppingBag, FiImage, FiTag, FiList, FiStar, 
  FiGrid, FiSliders, FiFileText, FiLayers, FiBox
} from 'react-icons/fi';

export const PLACEHOLDER_TYPES = {
  // Product Page Placeholders
  PRODUCT_TITLE: { label: 'Product Title Header', category: 'Commerce', icon: FiTag, description: 'Renders the dynamic product title and subtitle.' },
  PRODUCT_GALLERY: { label: 'Product Image Gallery & Zoom', category: 'Commerce', icon: FiImage, description: 'Renders high-res carousel, thumbnails, and 3D preview.' },
  PRODUCT_PRICING: { label: 'Pricing & Availability Badge', category: 'Commerce', icon: FiShoppingBag, description: 'Renders price, currency, trade discounts, and stock status.' },
  PRODUCT_VARIANTS: { label: 'Variant Selector (Swatches)', category: 'Commerce', icon: FiSliders, description: 'Renders velvet swatches, wood finishes, and dimensions.' },
  PRODUCT_SPECS: { label: 'Technical Specifications Table', category: 'Commerce', icon: FiList, description: 'Renders timber, fabric rub count, origin, and care instructions.' },
  PRODUCT_REVIEWS: { label: 'Client Reviews & Ratings', category: 'Commerce', icon: FiStar, description: 'Renders star rating summary, verified purchaser feedback, and Q&A.' },
  RELATED_PRODUCTS: { label: 'Related Bespoke Recommendations', category: 'Commerce', icon: FiBox, description: 'Dynamic collection grid of matching furniture pieces.' },

  // Collection & Category Placeholders
  COLLECTION_HEADER: { label: 'Collection Banner & Meta', category: 'Collection', icon: FiImage, description: 'Renders collection title, hero editorial banner, and description.' },
  PRODUCT_GRID: { label: 'Dynamic Product Catalog Grid', category: 'Collection', icon: FiGrid, description: 'Renders filtered furniture items with pagination and sorting.' },
  CATALOG_FILTERS: { label: 'Sidebar Faceted Filters', category: 'Collection', icon: FiSliders, description: 'Renders price range, material, wood type, and in-stock toggles.' },

  // Editorial Placeholders
  ARTICLE_CONTENT: { label: 'Article Rich Text & Media Body', category: 'Editorial', icon: FiFileText, description: 'Renders blog post markdown body, author bio, and publish date.' },
  AUTHOR_BOX: { label: 'Designer / Author Profile Card', category: 'Editorial', icon: FiLayers, description: 'Renders designer portrait, biography, and recent lookbooks.' }
};

export default function DynamicPlaceholder({ type, customTitle, isSelected, onClick }) {
  const config = PLACEHOLDER_TYPES[type] || {
    label: customTitle || 'Dynamic Content Block',
    category: 'Dynamic',
    icon: FiBox,
    description: 'Dynamic data bound at runtime'
  };

  const Icon = config.icon;

  return (
    <div
      onClick={onClick}
      className={`relative border-2 border-dashed rounded-xl p-4 transition-all duration-200 cursor-pointer ${
        isSelected 
          ? 'border-[#1A1A1A] bg-warning-soft/50 shadow-md ring-2 ring-black/5' 
          : 'border-amber-300/80 bg-warning-soft/20 hover:border-amber-400 hover:bg-warning-soft/40'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-warning-soft/80 text-amber-900 border border-amber-200/60 shrink-0">
            <Icon size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-200/60 text-amber-900">
                {config.category} Placeholder
              </span>
              <span className="text-[10px] font-mono text-amber-800/60">[{type}]</span>
            </div>
            <h4 className="font-serif font-bold text-sm text-text-primary mt-0.5">{config.label}</h4>
            <p className="text-xs text-text-muted mt-0.5">{config.description}</p>
          </div>
        </div>

        <div className="px-2 py-1 rounded bg-warning-soft text-amber-900 font-mono text-[10px] font-bold shrink-0">
          Dynamic Binding
        </div>
      </div>
    </div>
  );
}
