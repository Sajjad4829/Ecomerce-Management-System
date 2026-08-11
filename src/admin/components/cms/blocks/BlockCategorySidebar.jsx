import { cn } from '../../../../utils/cn';

const CATEGORIES = [
  'All Blocks',
  'Favorites',
  'Headers',
  'Hero Sections',
  'Banners',
  'Product Showcases',
  'Product Grids',
  'Collections',
  'Image Galleries',
  'Testimonials',
  'FAQs',
  'Call to Actions',
  'Newsletters',
  'Contact',
  'Footers',
  'Promotional',
  'Utilities'
];

export default function BlockCategorySidebar({ activeCategory, setActiveCategory }) {
  return (
    <div className="w-64 shrink-0 pr-6 hidden lg:block">
      <div className="sticky top-24">
        <h3 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-text-muted mb-4 pl-3">
          Categories
        </h3>
        <ul className="space-y-1 custom-scrollbar max-h-[calc(100vh-12rem)] overflow-y-auto">
          {CATEGORIES.map(category => (
            <li key={category}>
              <button
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors font-medium flex items-center justify-between",
                  activeCategory === category 
                    ? "bg-[#1A1A1A] text-white" 
                    : "text-text-secondary hover:bg-black/5 hover:text-text-primary"
                )}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
