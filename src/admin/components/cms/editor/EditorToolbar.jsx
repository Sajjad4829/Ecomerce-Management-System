import { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiSettings, FiCheck } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useCMS } from '../../../context/cms/CMSContext';

export default function EditorToolbar({ page, onSaveDraft, onPublish }) {
  const { pages } = useCMS();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="h-20 bg-surface border-b border-gray-200 flex items-center justify-between px-8 shrink-0 z-20">
      {/* Left: Title */}
      <div>
        <h1 className="text-xl font-bold text-gray-900 font-sans">Page Builder</h1>
        <p className="text-sm text-gray-500 mt-1">Design and build your page using sections and live preview.</p>
      </div>

      {/* Center: Page Selector */}
      <div className="flex items-center gap-4">
        <div className="flex items-center text-sm">
          <span className="text-gray-500 mr-3">Current Page:</span>
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between w-48 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-900 hover:border-gray-300 transition-colors"
            >
              <span className="font-medium truncate">{page?.title || page?.name || 'Unknown Page'}</span>
              <FiChevronDown className="text-gray-400 shrink-0 ml-2" />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden py-1 z-50">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                  Switch Page
                </div>
                <div className="max-h-64 overflow-y-auto custom-scrollbar">
                  {pages && pages.length > 0 ? (
                    pages.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          setIsDropdownOpen(false);
                          navigate(`/admin/cms/pages/${p.id}/builder`);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center justify-between ${page?.id === p.id ? 'bg-blue-50/50 text-[#635BFF] font-medium' : 'text-gray-700'}`}
                      >
                        <div className="flex flex-col truncate">
                          <span className="truncate">{p.title || p.name}</span>
                          <span className="text-xs text-gray-400 truncate font-mono">{p.slug || '/'}</span>
                        </div>
                        {page?.id === p.id && <FiCheck className="text-[#635BFF] shrink-0 ml-2" />}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-sm text-gray-500 text-center">No pages found</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <Link
          to="/admin/cms/pages"
          className="px-4 py-1.5 text-sm font-medium text-[#635BFF] bg-[#635BFF]/10 hover:bg-[#635BFF]/20 rounded-lg transition-colors flex items-center gap-2"
        >
          <FiSettings size={14} />
          Manage Pages
        </Link>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onSaveDraft} 
          className="px-5 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors shadow-sm"
        >
          Save Draft
        </button>
        <button 
          onClick={onPublish} 
          className="px-5 py-2 bg-[#635BFF] text-white text-sm font-medium rounded-lg hover:bg-[#524be0] transition-colors shadow-sm flex items-center gap-2"
        >
          {page?.status === 'Published' ? 'Update' : 'Publish'} <FiChevronDown size={14} />
        </button>
      </div>
    </div>
  );
}
