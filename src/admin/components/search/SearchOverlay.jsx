import React, { useEffect, useRef, useState } from 'react';
import { useGlobalSearch } from '../../context/search/GlobalSearchContext';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiX, FiClock, FiCommand, FiArrowRight, FiBox, FiUsers, FiShoppingCart, FiFileText, FiLayers, FiActivity, FiTag } from 'react-icons/fi';

export default function SearchOverlay() {
  const { isOverlayOpen, closeOverlay, query, setQuery, results, loading, recentSearches, addRecentSearch } = useGlobalSearch();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOverlayOpen ? closeOverlay() : useGlobalSearch().openOverlay();
      }
      if (e.key === 'Escape' && isOverlayOpen) {
        closeOverlay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOverlayOpen]);

  useEffect(() => {
    if (isOverlayOpen && inputRef.current) {
      inputRef.current.focus();
      setQuery('');
    }
  }, [isOverlayOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [results, query]);

  if (!isOverlayOpen) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'Product': return <FiBox />;
      case 'Inventory': return <FiLayers />;
      case 'Customer': return <FiUsers />;
      case 'Order': return <FiShoppingCart />;
      case 'CMS': return <FiFileText />;
      case 'Command': return <FiCommand />;
      case 'Marketing': return <FiTag />;
      default: return <FiActivity />;
    }
  };

  const handleSelect = (item) => {
    addRecentSearch(query);
    closeOverlay();
    if (item.url) {
      navigate(item.url);
    } else if (item.action) {
      navigate(item.action);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        handleSelect(results[selectedIndex]);
      } else if (query) {
        addRecentSearch(query);
        closeOverlay();
        navigate('/admin/search');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] bg-stone-900/50 backdrop-blur-sm" onClick={closeOverlay}>
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] mx-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center px-4 py-4 border-b border-stone-100">
          <FiSearch className="text-stone-400 text-xl shrink-0" />
          <input 
            ref={inputRef}
            type="text"
            className="flex-1 px-4 text-lg bg-transparent border-none focus:outline-none focus:ring-0 text-stone-900 placeholder:text-stone-400"
            placeholder="Search products, orders, customers, or type a command..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={closeOverlay} className="p-2 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors">
            <FiX className="text-xl" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {!query && (
            <div className="p-2">
              {recentSearches.length > 0 && (
                <div className="mb-6">
                  <div className="text-xs font-bold text-stone-400 uppercase tracking-widest px-2 mb-2">Recent Searches</div>
                  {recentSearches.map((rs, i) => (
                    <button 
                      key={i}
                      onClick={() => setQuery(rs.query)}
                      className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-stone-50 text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <FiClock className="text-stone-400" />
                        <span className="text-stone-700 font-medium group-hover:text-stone-900">{rs.query}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              
              <div>
                <div className="text-xs font-bold text-stone-400 uppercase tracking-widest px-2 mb-2">Quick Commands</div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { name: 'Create Product', url: '/admin/catalog/products/new', icon: FiBox },
                    { name: 'View Orders', url: '/admin/orders', icon: FiShoppingCart },
                    { name: 'Advanced Search', url: '/admin/search/advanced', icon: FiSearch },
                    { name: 'Command Center', url: '/admin/command', icon: FiCommand },
                  ].map((cmd, i) => (
                    <button 
                      key={i}
                      onClick={() => { closeOverlay(); navigate(cmd.url); }}
                      className="flex items-center gap-3 p-3 border border-stone-100 rounded-xl hover:bg-stone-50 hover:border-stone-200 text-left transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-stone-100 text-stone-600 flex items-center justify-center shrink-0">
                        <cmd.icon />
                      </div>
                      <span className="text-sm font-medium text-stone-700">{cmd.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {query && (
            <div className="p-2">
              {loading ? (
                <div className="py-8 text-center text-sm text-stone-500">Searching...</div>
              ) : results.length > 0 ? (
                <div className="space-y-1">
                  {results.map((result, i) => (
                    <button
                      key={result.id}
                      onClick={() => handleSelect(result)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors ${
                        selectedIndex === i ? 'bg-stone-100' : 'hover:bg-stone-50'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                        result.type === 'Command' ? 'bg-stone-900 text-white' : 'bg-white border border-stone-200 text-stone-500'
                      }`}>
                        {getIcon(result.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-stone-900 truncate">{result.name}</div>
                        <div className="text-xs text-stone-500 truncate mt-0.5">
                          {result.type} • {result.sku || result.customer || result.category || result.typeDetail || result.status}
                        </div>
                      </div>
                      <FiArrowRight className={`shrink-0 transition-opacity ${selectedIndex === i ? 'opacity-100 text-stone-900' : 'opacity-0 text-stone-400 group-hover:opacity-100'}`} />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-3 text-stone-400">
                    <FiSearch size={20} />
                  </div>
                  <div className="text-stone-900 font-medium">No results found for "{query}"</div>
                  <div className="text-stone-500 text-sm mt-1">Try a different term or check advanced search.</div>
                  <button 
                    onClick={() => { closeOverlay(); navigate('/admin/search/advanced'); }}
                    className="mt-4 px-4 py-2 bg-stone-100 text-stone-700 rounded-lg text-sm font-medium hover:bg-stone-200 transition-colors"
                  >
                    Go to Advanced Search
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="px-4 py-3 bg-stone-50 border-t border-stone-100 flex items-center gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-1"><span className="px-1.5 py-0.5 bg-white border border-stone-200 rounded text-stone-700 font-mono">↑↓</span> to navigate</div>
          <div className="flex items-center gap-1"><span className="px-1.5 py-0.5 bg-white border border-stone-200 rounded text-stone-700 font-mono">↵</span> to select</div>
          <div className="flex items-center gap-1"><span className="px-1.5 py-0.5 bg-white border border-stone-200 rounded text-stone-700 font-mono">esc</span> to close</div>
        </div>
      </div>
    </div>
  );
}
