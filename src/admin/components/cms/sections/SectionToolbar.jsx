import { FiSearch, FiFilter } from 'react-icons/fi';
import ViewSwitcher from './ViewSwitcher';

export default function SectionToolbar({ searchQuery, setSearchQuery, view, setView, activeCategory, setActiveCategory, categories }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-black/5 flex flex-col md:flex-row gap-4 justify-between items-center shadow-sm sticky top-0 z-20">
      <div className="relative w-full md:w-[400px]">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
        <input 
          type="text" 
          placeholder="Search sections..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-black/5 rounded-lg text-sm focus:outline-none focus:bg-white focus:border-black/20 focus:ring-1 focus:ring-black/20 transition-all"
        />
      </div>
      
      <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
        <div className="relative shrink-0">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <FiFilter className="text-text-muted" size={14} />
          </div>
          <select 
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="pl-9 pr-8 py-2 border border-black/10 rounded-lg text-sm font-medium text-text-primary bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:border-black/30 appearance-none cursor-pointer"
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-text-muted">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
        </div>

        <div className="relative shrink-0">
          <select className="pl-4 pr-8 py-2 border border-black/10 rounded-lg text-sm font-medium text-text-primary bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:border-black/30 appearance-none cursor-pointer">
            <option>Sort by: Popular</option>
            <option>Sort by: Newest</option>
            <option>Sort by: Name (A-Z)</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-text-muted">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
        </div>

        <div className="hidden md:block h-8 w-px bg-black/10 mx-1 shrink-0"></div>
        <div className="hidden md:block shrink-0">
          <ViewSwitcher view={view} setView={setView} />
        </div>
      </div>
    </div>
  );
}
