import { FiSearch, FiFilter, FiGrid, FiList } from 'react-icons/fi';
import { cn } from '../../../../utils/cn';

export default function BlockToolbar({ searchQuery, setSearchQuery, view, setView }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-black/5 flex flex-col md:flex-row gap-4 justify-between items-center shadow-sm sticky top-0 z-20">
      <div className="relative w-full md:w-96">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input 
          type="text" 
          placeholder="Search global blocks..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-[#F7F5F2] border-transparent rounded-lg text-sm focus:outline-none focus:bg-white focus:border-black/20 focus:ring-1 focus:ring-black/20 transition-all"
        />
      </div>
      
      <div className="flex items-center gap-3 w-full md:w-auto">
        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-black/10 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
          <FiFilter size={14} /> Filters
        </button>
        <select className="flex-1 md:flex-none px-4 py-2 border border-black/10 rounded-lg text-xs font-semibold text-gray-600 bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:border-black/30">
          <option>Sort by: Last Updated</option>
          <option>Sort by: Most Used</option>
          <option>Sort by: Name (A-Z)</option>
        </select>
        <div className="hidden md:block h-6 w-px bg-black/10 mx-1"></div>
        <div className="hidden md:flex items-center p-1 bg-gray-100 rounded-lg border border-black/5">
          <button 
            onClick={() => setView('grid')}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              view === 'grid' ? "bg-white text-[#1A1A1A] shadow-sm" : "text-gray-500 hover:text-[#1A1A1A]"
            )}
            title="Grid view"
          >
            <FiGrid size={16} />
          </button>
          <button 
            onClick={() => setView('list')}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              view === 'list' ? "bg-white text-[#1A1A1A] shadow-sm" : "text-gray-500 hover:text-[#1A1A1A]"
            )}
            title="List view"
          >
            <FiList size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
