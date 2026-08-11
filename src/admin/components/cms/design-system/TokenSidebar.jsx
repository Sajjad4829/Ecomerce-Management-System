import { cn } from '../../../../utils/cn';

const TOKEN_CATEGORIES = [
  'Colors',
  'Typography',
  'Spacing',
  'Border Radius',
  'Shadows',
  'Icons',
  'Buttons',
  'Forms',
  'Cards',
  'Containers',
  'Grid System',
  'Breakpoints',
  'Animations',
  'Elevation',
  'Status Colors'
];

export default function TokenSidebar({ activeCategory, setActiveCategory }) {
  return (
    <div className="w-56 shrink-0 pr-6 hidden lg:block border-r border-black/5 mr-8">
      <div className="sticky top-24">
        <h3 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-gray-400 mb-4 pl-3">
          Design Tokens
        </h3>
        <ul className="space-y-1 custom-scrollbar max-h-[calc(100vh-12rem)] overflow-y-auto">
          {TOKEN_CATEGORIES.map(category => (
            <li key={category}>
              <button
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors font-medium flex items-center justify-between",
                  activeCategory === category 
                    ? "bg-[#1A1A1A] text-white shadow-sm" 
                    : "text-gray-600 hover:bg-black/5 hover:text-[#1A1A1A]"
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
