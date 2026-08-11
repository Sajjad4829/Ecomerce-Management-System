import { useState } from 'react';
import { FiFolder, FiFolderPlus, FiStar, FiClock, FiGrid, FiChevronRight, FiChevronDown, FiHardDrive } from 'react-icons/fi';
import { cn } from '../../../../utils/cn';

const FOLDER_TREE = [
  {
    id: 'products',
    name: 'Products',
    count: 342,
    children: [
      { id: 'sofas', name: 'Sofas & Couches', count: 128 },
      { id: 'beds', name: 'Beds & Headboards', count: 84 },
      { id: 'tables', name: 'Dining Tables', count: 65 },
      { id: 'chairs', name: 'Accent Chairs', count: 65 }
    ]
  },
  {
    id: 'collections',
    name: 'Collections',
    count: 120,
    children: [
      { id: 'summer-2025', name: 'Summer 2025 Lookbook', count: 42 },
      { id: 'scandi-minimal', name: 'Scandinavian Line', count: 58 }
    ]
  },
  { id: 'banners', name: 'Hero Banners', count: 48 },
  { id: 'blog', name: 'Editorial & Blog', count: 96 },
  { id: 'campaigns', name: 'Marketing Campaigns', count: 64 },
  { id: 'brand', name: 'Logos & Brand Guidelines', count: 22 }
];

export default function FolderSidebar({ selectedFolder, setSelectedFolder, activeFilter, setActiveFilter }) {
  const [expandedFolders, setExpandedFolders] = useState({ products: true, collections: false });

  const toggleExpand = (folderId, e) => {
    e.stopPropagation();
    setExpandedFolders(prev => ({ ...prev, [folderId]: !prev[folderId] }));
  };

  return (
    <div className="w-64 shrink-0 pr-6 hidden lg:block border-r border-black/5 mr-6">
      <div className="sticky top-24 space-y-6">
        
        {/* Quick System Filters */}
        <div>
          <h3 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-gray-400 mb-3 pl-3">
            Library Quick Views
          </h3>
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => { setActiveFilter('all'); setSelectedFolder(null); }}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors",
                  activeFilter === 'all' && !selectedFolder
                    ? "bg-[#1A1A1A] text-white shadow-sm"
                    : "text-gray-600 hover:bg-black/5 hover:text-[#1A1A1A]"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <FiGrid size={14} />
                  <span>All Media Assets</span>
                </div>
                <span className="text-[10px] font-mono opacity-80">892</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => { setActiveFilter('favorites'); setSelectedFolder(null); }}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors",
                  activeFilter === 'favorites'
                    ? "bg-[#1A1A1A] text-white shadow-sm"
                    : "text-gray-600 hover:bg-black/5 hover:text-[#1A1A1A]"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <FiStar size={14} className="text-amber-500" />
                  <span>Favorites</span>
                </div>
                <span className="text-[10px] font-mono opacity-80">34</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => { setActiveFilter('recent'); setSelectedFolder(null); }}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors",
                  activeFilter === 'recent'
                    ? "bg-[#1A1A1A] text-white shadow-sm"
                    : "text-gray-600 hover:bg-black/5 hover:text-[#1A1A1A]"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <FiClock size={14} />
                  <span>Recently Used</span>
                </div>
                <span className="text-[10px] font-mono opacity-80">18</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Directory Folder Tree */}
        <div>
          <div className="flex items-center justify-between mb-3 px-3">
            <h3 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-gray-400">
              Folders
            </h3>
            <button 
              className="text-gray-400 hover:text-[#1A1A1A] transition-colors p-1 rounded hover:bg-black/5" 
              title="Create New Folder"
            >
              <FiFolderPlus size={14} />
            </button>
          </div>

          <ul className="space-y-1 custom-scrollbar max-h-[calc(100vh-22rem)] overflow-y-auto">
            {FOLDER_TREE.map(folder => {
              const isExpanded = expandedFolders[folder.id];
              const isSelected = selectedFolder === folder.id;

              return (
                <li key={folder.id} className="space-y-1">
                  <div
                    onClick={() => { setSelectedFolder(folder.id); setActiveFilter(null); }}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer group",
                      isSelected
                        ? "bg-[#1A1A1A] text-white shadow-sm"
                        : "text-gray-600 hover:bg-black/5 hover:text-[#1A1A1A]"
                    )}
                  >
                    <div className="flex items-center gap-2 truncate">
                      {folder.children ? (
                        <button 
                          onClick={(e) => toggleExpand(folder.id, e)}
                          className="text-gray-400 group-hover:text-gray-600 p-0.5 rounded hover:bg-black/10"
                        >
                          {isExpanded ? <FiChevronDown size={12} /> : <FiChevronRight size={12} />}
                        </button>
                      ) : (
                        <span className="w-3" />
                      )}
                      <FiFolder size={14} className={isSelected ? "text-white" : "text-amber-600/80"} />
                      <span className="truncate">{folder.name}</span>
                    </div>
                    <span className="text-[10px] font-mono opacity-70 ml-2">{folder.count}</span>
                  </div>

                  {/* Subfolders */}
                  {folder.children && isExpanded && (
                    <ul className="pl-6 space-y-1 border-l border-black/5 ml-4">
                      {folder.children.map(sub => {
                        const isSubSelected = selectedFolder === sub.id;
                        return (
                          <li key={sub.id}>
                            <button
                              onClick={() => { setSelectedFolder(sub.id); setActiveFilter(null); }}
                              className={cn(
                                "w-full text-left px-2.5 py-1.5 rounded-md text-xs font-medium flex items-center justify-between transition-colors",
                                isSubSelected
                                  ? "bg-black/10 text-[#1A1A1A] font-bold"
                                  : "text-gray-500 hover:bg-black/5 hover:text-[#1A1A1A]"
                              )}
                            >
                              <div className="flex items-center gap-2 truncate">
                                <FiFolder size={12} className={isSubSelected ? "text-[#1A1A1A]" : "text-gray-400"} />
                                <span className="truncate">{sub.name}</span>
                              </div>
                              <span className="text-[10px] font-mono text-gray-400">{sub.count}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Storage Capacity Indicator */}
        <div className="bg-gray-50 border border-black/5 rounded-xl p-3.5 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
            <div className="flex items-center gap-1.5">
              <FiHardDrive size={13} className="text-gray-400" />
              <span>Storage Used</span>
            </div>
            <span className="font-mono text-[11px] text-gray-500">42.8 GB / 100 GB</span>
          </div>
          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#1A1A1A] h-full w-[42.8%]" />
          </div>
          <p className="text-[10px] text-gray-400">CDN Storage Tier: Enterprise Premium</p>
        </div>

      </div>
    </div>
  );
}
