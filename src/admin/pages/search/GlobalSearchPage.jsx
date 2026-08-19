import React, { useState } from 'react';
import { useGlobalSearch } from '../../context/search/GlobalSearchContext';
import { FiSearch, FiFilter, FiBox, FiUsers, FiShoppingCart, FiFileText, FiLayers, FiTag, FiClock } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export default function GlobalSearchPage() {
  const { query, setQuery, results, loading, recentSearches } = useGlobalSearch();
  const [activeTab, setActiveTab] = useState('All');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    setQuery(fd.get('q'));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'Product': return <FiBox />;
      case 'Inventory': return <FiLayers />;
      case 'Customer': return <FiUsers />;
      case 'Order': return <FiShoppingCart />;
      case 'CMS': return <FiFileText />;
      case 'Marketing': return <FiTag />;
      default: return <FiSearch />;
    }
  };

  const tabs = ['All', 'Products', 'Orders', 'Customers', 'CMS', 'Inventory'];
  
  const filteredResults = activeTab === 'All' 
    ? results.filter(r => r.type !== 'Command')
    : results.filter(r => r.type === activeTab.slice(0, -1) || r.type === activeTab); // rudimentary plural fix

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-light text-text-primary tracking-wide mb-2">Global Search</h1>
          <p className="text-sm text-text-muted">Search across products, orders, customers, and content.</p>
        </div>
        <button 
          onClick={() => navigate('/admin/search/advanced')}
          className="text-sm font-medium text-text-secondary hover:text-text-primary border border-border bg-surface px-4 py-2 rounded-lg"
        >
          Advanced Search
        </button>
      </div>

      <div className="bg-surface p-2 rounded-2xl shadow-sm border border-stone-100 flex items-center">
        <form onSubmit={handleSearch} className="flex-1 flex items-center">
          <FiSearch className="text-text-muted text-xl ml-4 mr-2" />
          <input
            name="q"
            defaultValue={query}
            placeholder="What are you looking for?"
            className="w-full p-3 bg-transparent border-none focus:outline-none focus:ring-0 text-lg"
          />
          <button type="submit" className="px-6 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-hover transition-colors mr-2">
            Search
          </button>
        </form>
      </div>

      <div className="flex items-center gap-6 border-b border-border">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
              activeTab === tab ? 'text-text-primary' : 'text-text-muted hover:text-text-secondary'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <div>
            <h3 className="text-xs font-bold text-text-primary uppercase tracking-widest mb-4">Filters</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-text-muted mb-1.5 block">Status</label>
                <select className="w-full p-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-primary">
                  <option>Any Status</option>
                  <option>Active / Published</option>
                  <option>Draft / Pending</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-text-muted mb-1.5 block">Date Range</label>
                <select className="w-full p-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-primary">
                  <option>All Time</option>
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>This Year</option>
                </select>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xs font-bold text-text-primary uppercase tracking-widest mb-4">Recent</h3>
            <div className="space-y-3">
              {recentSearches.slice(0, 5).map((rs, i) => (
                <button key={i} onClick={() => setQuery(rs.query)} className="flex items-center gap-3 text-sm text-text-secondary hover:text-text-primary w-full text-left">
                  <FiClock className="text-text-muted" />
                  <span className="truncate">{rs.query}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          {loading ? (
            <div className="py-20 text-center text-text-muted">Searching...</div>
          ) : !query ? (
            <div className="py-20 text-center">
              <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4 text-text-muted">
                <FiSearch size={24} />
              </div>
              <h3 className="text-lg font-medium text-text-primary mb-2">Start typing to search</h3>
              <p className="text-text-muted max-w-md mx-auto">Find anything across your enterprise platform instantly.</p>
            </div>
          ) : filteredResults.length > 0 ? (
            <div className="space-y-4">
              {filteredResults.map(result => (
                <div key={result.id} className="bg-surface p-5 rounded-2xl border border-stone-100 flex items-start gap-4 hover:border-border transition-colors group cursor-pointer" onClick={() => navigate(result.url)}>
                  <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center text-text-muted shrink-0">
                    {getIcon(result.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-base font-bold text-text-primary group-hover:text-black transition-colors">{result.name}</h4>
                        <div className="text-sm text-text-muted mt-1 flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-stone-100 rounded text-xs font-medium text-text-secondary">{result.type}</span>
                          <span>•</span>
                          <span>{result.sku || result.customer || result.category || result.typeDetail || 'General'}</span>
                        </div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        result.status === 'Active' || result.status === 'Published' ? 'bg-success-soft text-success' :
                        result.status === 'Pending' || result.status === 'Processing' ? 'bg-warning-soft text-warning' :
                        'bg-stone-100 text-text-secondary'
                      }`}>
                        {result.status || (result.stock ? `${result.stock} in stock` : 'N/A')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4 text-text-muted">
                <FiSearch size={24} />
              </div>
              <h3 className="text-lg font-medium text-text-primary mb-2">No results for "{query}"</h3>
              <p className="text-text-muted max-w-md mx-auto mb-6">We couldn't find anything matching your search. Try adjusting your filters or terms.</p>
              <button onClick={() => setQuery('')} className="text-sm font-medium text-text-primary hover:underline">
                Clear Search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
