import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX } from 'react-icons/fi';
import { useSearch } from '../../../admin/context/SearchContext';
import { useProducts } from '../../../admin/context/commerce/ProductContext';
import { Search } from 'lucide-react';

export default function GlobalSearch({ placeholder = "Search", className = "", isExpandable = false }) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { saveSearch } = useSearch();
  const { products } = useProducts();
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  
  const productSuggestions = query.trim() 
    ? products.filter(p => p.name.toLowerCase().includes(query.toLowerCase().trim())).slice(0, 5)
    : [];

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      saveSearch(query.trim());
      window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
    }
  };

  const handleSuggestionClick = (term) => {
    saveSearch(term);
    window.location.href = `/search?q=${encodeURIComponent(term)}`;
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsFocused(false);
        setIsExpanded(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isExpandable && isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded, isExpandable]);

  if (isExpandable) {
    return (
      <div ref={wrapperRef} className={`relative flex items-center justify-end ${className}`}>
        {/* Trigger Icon */}
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          className={`p-1 transition-all duration-200 relative hover:opacity-70 nav-icon-dynamic flex ${isExpanded ? 'opacity-0 pointer-events-none absolute' : 'opacity-100'}`}
          aria-label="Search"
        >
          <Search size={20} />
        </button>

        {/* Expanded Form */}
        <AnimatePresence>
          {isExpanded && (
            <motion.form
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 300, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              onSubmit={handleSearch}
              className="absolute right-0 flex items-center bg-white rounded-[4px] border border-[#e1e1e1] shadow-sm z-50 overflow-hidden"
              style={{ originX: 1 }}
            >
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                placeholder={placeholder}
                className="w-full pl-3 pr-2 py-[7px] text-[14px] bg-transparent border-none focus:outline-none focus:ring-0 text-gray-900 placeholder:text-[#6c757d]"
              />
              <div className="flex items-center gap-1 pr-2 shrink-0">
                <button 
                  type="button"
                  onClick={() => {
                    if (query) {
                      setQuery('');
                      inputRef.current?.focus();
                    } else {
                      setIsExpanded(false);
                      setIsFocused(false);
                    }
                  }}
                  className="p-1 text-gray-400 hover:text-black transition-colors"
                  aria-label="Clear or close search"
                >
                  <FiX className="w-5 h-5" />
                </button>
                <button 
                  type="submit"
                  className="p-1 text-[#333333] hover:text-black transition-colors"
                  aria-label="Submit search"
                >
                  <Search size={18} />
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Suggestions Dropdown */}
        <AnimatePresence>
          {isFocused && query && isExpanded && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full right-0 w-[360px] mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 max-h-[60vh] overflow-y-auto"
            >
              <div className="flex flex-col py-1">
                {productSuggestions.length > 0 ? (
                  <div className="flex flex-col">
                    {productSuggestions.map(product => (
                      <a 
                        key={product.id}
                        href={`/products/${product.id}`}
                        className="flex gap-4 p-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                        onClick={(e) => {
                          e.preventDefault();
                          handleSuggestionClick(product.name);
                        }}
                      >
                        <div className="w-14 h-14 bg-gray-100 rounded overflow-hidden shrink-0">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col justify-center">
                          <p className="text-[14px] text-[#1c2b36] mb-0.5 line-clamp-1">{product.name}</p>
                          <p className="text-[12px] text-[#6c757d]">Starts from {(product.price || 0).toLocaleString()} BDT</p>
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-sm text-gray-500 text-center">
                    No products found matching "{query}"
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className={`relative w-full ${className}`}>
      <form 
        onSubmit={handleSearch} 
        className={`relative flex items-center transition-all bg-[#f4f5f7] md:bg-white rounded-full md:rounded-[4px] border-transparent md:border md:border-[#e1e1e1] ${isFocused ? 'ring-2 md:ring-0 md:border-gray-400 ring-black/5' : ''}`}
      >
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          className="w-full pl-5 md:pl-3 pr-3 md:pr-2 py-2 md:py-1.5 text-[15px] md:text-[14px] bg-transparent border-none focus:outline-none focus:ring-0 text-gray-900 placeholder:text-[#6c757d]"
        />
        <div className="flex items-center gap-1 pr-2 shrink-0">
          {query ? (
            <button 
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
                setIsFocused(true);
              }}
              className="p-1 text-gray-400 hover:text-black transition-colors"
              aria-label="Clear search"
            >
              <FiX className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-7 h-7" />
          )}
          <button 
            type="submit"
            className="p-1 text-[#333333] hover:text-black transition-colors"
            aria-label="Submit search"
          >
            <Search size={18} />
          </button>
        </div>
      </form>

      <AnimatePresence>
        {isFocused && query && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 md:left-auto md:right-0 w-full md:w-[360px] mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 max-h-[60vh] overflow-y-auto"
          >
            <div className="flex flex-col py-1">
              {productSuggestions.length > 0 ? (
                <div className="flex flex-col">
                  {productSuggestions.map(product => (
                    <a 
                      key={product.id}
                      href={`/products/${product.id}`}
                      className="flex gap-4 p-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                      onClick={(e) => {
                        e.preventDefault();
                        handleSuggestionClick(product.name);
                      }}
                    >
                      <div className="w-14 h-14 bg-gray-100 rounded overflow-hidden shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <p className="text-[14px] text-[#1c2b36] mb-0.5 line-clamp-1">{product.name}</p>
                        <p className="text-[12px] text-[#6c757d]">Starts from {(product.price || 0).toLocaleString()} BDT</p>
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-sm text-gray-500 text-center">
                  No products found matching "{query}"
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
