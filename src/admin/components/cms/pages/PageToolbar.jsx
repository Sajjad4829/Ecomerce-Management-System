import { 
  FiSearch, FiFilter, FiList, FiGrid, 
  FiDownload, FiUpload, FiRefreshCw 
} from 'react-icons/fi';
import { cn } from '../../../../utils/cn';

export default function PageToolbar({ viewMode, setViewMode, selectedCount }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-black/5 flex flex-col md:flex-row gap-4 justify-between items-center shadow-sm sticky top-20 z-20">
      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
        <div className="relative w-full sm:w-80">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search pages..." 
            className="w-full pl-10 pr-4 py-2.5 bg-[#F7F5F2] border-transparent rounded-lg text-sm focus:outline-none focus:bg-white focus:border-black/20 focus:ring-1 focus:ring-black/20 transition-all"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 border border-black/10 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors bg-white">
            <FiFilter /> Filter
          </button>
          <select className="flex-1 sm:flex-none px-4 py-2.5 border border-black/10 rounded-lg text-xs font-semibold text-gray-600 bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:border-black/30">
            <option>All Statuses</option>
            <option>Published</option>
            <option>Draft</option>
            <option>Scheduled</option>
            <option>Archived</option>
          </select>
        </div>
      </div>

      {/* Actions & View Toggle */}
      <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
        {selectedCount > 0 ? (
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-gray-500">{selectedCount} selected</span>
            <select className="px-3 py-2 border border-black/10 rounded-lg text-xs font-semibold text-gray-600 bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:border-black/30">
              <option>Bulk Actions</option>
              <option>Publish</option>
              <option>Unpublish</option>
              <option>Move to Draft</option>
              <option>Archive</option>
              <option>Delete</option>
            </select>
          </div>
        ) : (
          <div className="flex items-center gap-2 hidden lg:flex">
             <button className="p-2 text-gray-500 hover:text-[#1A1A1A] hover:bg-gray-50 rounded-lg transition-colors border border-transparent" title="Import">
               <FiDownload size={16} />
             </button>
             <button className="p-2 text-gray-500 hover:text-[#1A1A1A] hover:bg-gray-50 rounded-lg transition-colors border border-transparent" title="Export">
               <FiUpload size={16} />
             </button>
             <button className="p-2 text-gray-500 hover:text-[#1A1A1A] hover:bg-gray-50 rounded-lg transition-colors border border-transparent" title="Refresh">
               <FiRefreshCw size={16} />
             </button>
          </div>
        )}
        
        <div className="flex items-center bg-gray-100 rounded-lg p-1 border border-black/5">
          <button 
            onClick={() => setViewMode('table')}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              viewMode === 'table' ? "bg-white text-[#1A1A1A] shadow-sm" : "text-gray-500 hover:text-[#1A1A1A]"
            )}
          >
            <FiList size={16} />
          </button>
          <button 
            onClick={() => setViewMode('grid')}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              viewMode === 'grid' ? "bg-white text-[#1A1A1A] shadow-sm" : "text-gray-500 hover:text-[#1A1A1A]"
            )}
          >
            <FiGrid size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
