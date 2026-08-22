import { cn } from '../../../../utils/cn';

export default function CategorySidebar({ activeCategory, setActiveCategory, categories }) {
  return (
    <div className="w-64 shrink-0 pr-6 hidden lg:block">
      <div className="sticky top-24">
        <h3 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-text-muted mb-4 pl-3">
          Categories
        </h3>
        <ul className="space-y-1 custom-scrollbar max-h-[calc(100vh-12rem)] overflow-y-auto">
          {categories.map(category => (
            <li key={category.id}>
              <button
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors font-medium flex items-center justify-between",
                  activeCategory === category.id 
                    ? "bg-[#1A1A1A] text-white" 
                    : "text-text-secondary hover:bg-black/5 hover:text-text-primary"
                )}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
