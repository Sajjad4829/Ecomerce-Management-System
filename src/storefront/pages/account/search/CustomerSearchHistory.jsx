import React from 'react';
import { motion } from 'framer-motion';
import { useSearch } from '../../../../admin/context/SearchContext';
import { FiClock, FiTrash2, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function CustomerSearchHistory() {
  const { searchHistory, clearSearchHistory, removeSearchHistory } = useSearch();

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#1A1A1A]">Search History</h1>
          <p className="text-gray-500 mt-1">Review your recent searches to easily find products again.</p>
        </div>
        {searchHistory.length > 0 && (
          <button 
            onClick={clearSearchHistory}
            className="text-sm text-gray-500 hover:text-black underline transition-colors"
          >
            Clear History
          </button>
        )}
      </div>

      {searchHistory.length > 0 ? (
        <div className="bg-white rounded-xl border border-black/5 overflow-hidden">
          <ul className="divide-y divide-black/5">
            {searchHistory.map((item) => (
              <li key={item.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:text-black transition-colors shadow-sm">
                    <FiSearch />
                  </div>
                  <div>
                    <Link to={`/search?q=${encodeURIComponent(item.query)}`} className="font-medium text-gray-900 hover:underline">
                      {item.query}
                    </Link>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {new Date(item.date).toLocaleDateString()} at {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => removeSearchHistory(item.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                  title="Remove from history"
                >
                  <FiTrash2 />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-xl border border-black/5">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
            <FiClock className="text-gray-400 w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold font-serif mb-2">No Search History</h2>
          <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">
            You haven't searched for anything yet. Start exploring our catalog to find your perfect piece.
          </p>
          <Link 
            to="/products"
            className="inline-block bg-black text-white px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors"
          >
            Explore Catalog
          </Link>
        </div>
      )}
    </div>
  );
}
