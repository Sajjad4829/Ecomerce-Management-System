import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export function SearchProvider({ children }) {
  // Storefront search state
  const [searchHistory, setSearchHistory] = useState([
    { id: 'sh-1', query: 'sofa', date: '2025-06-15T10:30:00Z' },
    { id: 'sh-2', query: 'dining table', date: '2025-06-14T14:20:00Z' }
  ]);
  
  const [recentlyViewed, setRecentlyViewed] = useState([
    { id: 'rv-1', productId: 'prod-1', date: '2025-06-15T10:35:00Z' }
  ]);

  // Admin Search Configuration State
  const [facets, setFacets] = useState([
    { id: 'fct-1', name: 'Category', field: 'category', type: 'Checkbox', displayOrder: 1, visibility: true, multiSelect: true, status: 'Active' },
    { id: 'fct-2', name: 'Price', field: 'price', type: 'Range', displayOrder: 2, visibility: true, multiSelect: false, status: 'Active' },
    { id: 'fct-3', name: 'Material', field: 'material', type: 'Checkbox', displayOrder: 3, visibility: true, multiSelect: true, status: 'Active' }
  ]);

  const [ranking, setRanking] = useState([
    { id: 'rnk-1', signal: 'Relevance', weight: 100 },
    { id: 'rnk-2', signal: 'Popularity', weight: 50 },
    { id: 'rnk-3', signal: 'Rating', weight: 30 },
    { id: 'rnk-4', signal: 'Newness', weight: 20 },
  ]);

  const [synonyms, setSynonyms] = useState([
    { id: 'syn-1', primaryTerm: 'sofa', synonyms: ['couch', 'settee', 'loveseat'], type: 'Equivalent', status: 'Active' },
    { id: 'syn-2', primaryTerm: 'table', synonyms: ['desk'], type: 'One-way', status: 'Active' }
  ]);

  const [redirects, setRedirects] = useState([
    { id: 'redir-1', query: 'living room set', destinationType: 'Collection', destinationValue: 'living-room-collection', status: 'Active' }
  ]);

  const [boosts, setBoosts] = useState([
    { id: 'bst-1', query: 'sofa', targetType: 'Collection', targetValue: 'premium-sofas', weight: 50, status: 'Active' }
  ]);

  const [pins, setPins] = useState([
    { id: 'pin-1', query: 'dining table', productId: 'prod-dt-1', position: 1, status: 'Active' }
  ]);
  
  const [merchandisingRules, setMerchandisingRules] = useState([
    { id: 'rule-1', name: 'Boost Dining Sets', condition: 'Category = Dining', action: 'Boost', target: 'Featured Products', weight: 20, status: 'Active' }
  ]);

  // Mock Products Database
  const [mockProducts] = useState([
    { id: 'prod-1', name: 'Aurum Premium Sofa', category: 'Living Room', price: 125000, material: 'Leather', rating: 4.8, inStock: true, image: 'https://placehold.co/600x600/1a1a1a/ffffff?text=Aurum+Sofa' },
    { id: 'prod-2', name: 'Nordic Oak Dining Table', category: 'Dining', price: 85000, material: 'Oak Wood', rating: 4.5, inStock: true, image: 'https://placehold.co/600x600/1a1a1a/ffffff?text=Nordic+Table' },
    { id: 'prod-3', name: 'Velvet Lounge Chair', category: 'Living Room', price: 45000, material: 'Velvet', rating: 4.9, inStock: false, image: 'https://placehold.co/600x600/1a1a1a/ffffff?text=Velvet+Chair' },
  ]);

  // Search Service Abstraction
  const searchProducts = (query, filters = {}, sort = 'Relevance', page = 1) => {
    // Basic mock search implementation
    let results = mockProducts;
    
    if (query) {
      const lowerQuery = query.toLowerCase();
      // Handle synonyms naively
      const activeSynonyms = synonyms.filter(s => s.status === 'Active');
      let searchTerms = [lowerQuery];
      activeSynonyms.forEach(syn => {
        if (syn.primaryTerm === lowerQuery || syn.synonyms.includes(lowerQuery)) {
          searchTerms = [...searchTerms, syn.primaryTerm, ...syn.synonyms];
        }
      });
      
      results = results.filter(p => searchTerms.some(term => p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term)));
    }

    if (filters.category) {
      results = results.filter(p => p.category === filters.category);
    }

    // Sort mock
    if (sort === 'Price Low to High') results.sort((a, b) => a.price - b.price);
    if (sort === 'Price High to Low') results.sort((a, b) => b.price - a.price);
    if (sort === 'Rating') results.sort((a, b) => b.rating - a.rating);

    return {
      items: results,
      total: results.length,
      facets: [
        { name: 'Category', options: ['Living Room', 'Dining'] },
        { name: 'Material', options: ['Leather', 'Oak Wood', 'Velvet'] }
      ],
      page,
      limit: 12
    };
  };

  const getSuggestions = (query) => {
    if (!query) return { products: [], categories: [], recent: searchHistory };
    const res = searchProducts(query);
    return {
      products: res.items.slice(0, 3),
      categories: ['Living Room', 'Dining'].filter(c => c.toLowerCase().includes(query.toLowerCase())),
      recent: []
    };
  };

  const saveSearch = (query) => {
    if (!query) return;
    const newSearch = { id: `sh-${Date.now()}`, query, date: new Date().toISOString() };
    setSearchHistory(prev => [newSearch, ...prev.filter(s => s.query !== query)].slice(0, 10));
  };
  
  const clearSearchHistory = () => setSearchHistory([]);
  const removeSearchHistory = (id) => setSearchHistory(prev => prev.filter(s => s.id !== id));

  const getRelatedProducts = (productId) => mockProducts.filter(p => p.id !== productId).slice(0, 4);
  const getSimilarProducts = (productId) => mockProducts.filter(p => p.id !== productId).slice(0, 4);
  
  // Admin Methods
  const addSynonym = (syn) => setSynonyms([...synonyms, { ...syn, id: `syn-${Date.now()}` }]);
  const updateSynonym = (id, syn) => setSynonyms(synonyms.map(s => s.id === id ? { ...s, ...syn } : s));
  
  const addRedirect = (red) => setRedirects([...redirects, { ...red, id: `redir-${Date.now()}` }]);
  const addBoost = (bst) => setBoosts([...boosts, { ...bst, id: `bst-${Date.now()}` }]);
  const addPin = (pin) => setPins([...pins, { ...pin, id: `pin-${Date.now()}` }]);
  const addMerchandisingRule = (rule) => setMerchandisingRules([...merchandisingRules, { ...rule, id: `rule-${Date.now()}` }]);

  return (
    <SearchContext.Provider value={{
      searchHistory,
      recentlyViewed,
      facets,
      ranking,
      synonyms,
      redirects,
      boosts,
      pins,
      merchandisingRules,
      searchProducts,
      getSuggestions,
      saveSearch,
      clearSearchHistory,
      removeSearchHistory,
      getRelatedProducts,
      getSimilarProducts,
      addSynonym,
      updateSynonym,
      addRedirect,
      addBoost,
      addPin,
      addMerchandisingRule
    }}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext);
