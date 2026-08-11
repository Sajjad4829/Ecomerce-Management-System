import React, { createContext, useContext, useState } from 'react';

const ExperienceContext = createContext(null);

export function ExperienceProvider({ children }) {
  const [experiences, setExperiences] = useState([
    { id: '1', name: 'Summer Sofa Sale', targetPage: 'Homepage', status: 'Active', startDate: '2026-06-01', priority: 1 },
    { id: '2', name: 'B2B Wholesale Welcome', targetPage: 'All Pages', status: 'Scheduled', startDate: '2026-09-01', priority: 2 }
  ]);
  const [homepageSections, setHomepageSections] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([
    { id: 'fp1', entityType: 'product', entityId: 'p123', priority: 1, status: 'Active' },
    { id: 'fp2', entityType: 'product', entityId: 'p124', priority: 2, status: 'Active' }
  ]);
  const [featuredCategories, setFeaturedCategories] = useState([]);
  
  const [productRecommendations, setProductRecommendations] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [crossSells, setCrossSells] = useState([]);
  const [upSells, setUpSells] = useState([]);
  const [productBundles, setProductBundles] = useState([]);
  const [experienceCollections, setExperienceCollections] = useState([]);
  
  const [seasonalMerchandising, setSeasonalMerchandising] = useState([]);
  const [promotionalPlacements, setPromotionalPlacements] = useState([]);
  const [productPlacementRules, setProductPlacementRules] = useState([
    { id: 'r1', name: 'Luxury Sofas First', entityType: 'Category', trigger: 'Category Viewed', condition: 'category = Living Room', resultType: 'Sort Override', result: 'Price High to Low', priority: 1, status: 'Active' }
  ]);
  
  const [personalizationRules, setPersonalizationRules] = useState([
    { id: 'p1', name: 'B2B Header', audienceId: 'Wholesale Partners', condition: 'Customer Segment', action: 'Change Banner', priority: 1, status: 'Active' }
  ]);
  const [customerSegmentRules, setCustomerSegmentRules] = useState([]);
  const [bannerPlacements, setBannerPlacements] = useState([]);

  const [variants, setVariants] = useState([
    { id: 'v1', name: 'Hero Variant A (Modern)', experienceId: '1', status: 'Active' },
    { id: 'v2', name: 'Hero Variant B (Classic)', experienceId: '1', status: 'Active' }
  ]);
  const [experiments, setExperiments] = useState([
    { id: 'ex1', name: 'Homepage Hero Test', targetPage: 'Homepage', variantAId: 'v1', variantBId: 'v2', status: 'Active' }
  ]);
  
  const [filters, setFilters] = useState({});
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  // Mock Actions
  const loadHomepage = () => { /* Mock */ };
  const updateHomepage = () => { /* Mock */ };
  const createFeaturedItem = () => { /* Mock */ };
  const updateFeaturedItem = () => { /* Mock */ };
  const createRecommendationRule = () => { /* Mock */ };
  const updateRecommendationRule = () => { /* Mock */ };
  const createPersonalizationRule = () => { /* Mock */ };
  const updatePersonalizationRule = () => { /* Mock */ };
  const createExperiment = () => { /* Mock */ };
  const updateExperiment = () => { /* Mock */ };
  const createVariant = () => { /* Mock */ };
  const updateVariant = () => { /* Mock */ };
  const loadAnalytics = () => { /* Mock */ };
  // Mock Catalog for the Related Products selector
  const MOCK_CATALOG = [
    { id: 'p1', name: 'Premium 3-Seater Sofa', sku: 'SOFA-3S-001', category: 'Living Room', price: 1299 },
    { id: 'p2', name: 'Center Table (Oak)', sku: 'TBL-CTR-001', category: 'Living Room', price: 399 },
    { id: 'p3', name: 'Side Table (Oak)', sku: 'TBL-SD-001', category: 'Living Room', price: 199 },
    { id: 'p4', name: 'Accent Chair (Velvet)', sku: 'CHR-ACC-001', category: 'Living Room', price: 499 },
    { id: 'p5', name: 'TV Cabinet (Walnut)', sku: 'CAB-TV-001', category: 'Living Room', price: 799 },
    { id: 'p6', name: 'King Size Bed Frame', sku: 'BED-KNG-001', category: 'Bedroom', price: 1499 },
    { id: 'p7', name: 'Bedside Table', sku: 'TBL-BDS-001', category: 'Bedroom', price: 249 }
  ];

  const createRelatedProduct = (data) => {
    const newRecord = { ...data, id: `rp_${Date.now()}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    setRelatedProducts(prev => [...prev, newRecord]);
    
    // Auto-create bidirectional if requested
    if (data.isBidirectional && data.relatedProductIds) {
      const bidirRecords = data.relatedProductIds.map((rId, idx) => ({
        ...data,
        id: `rp_${Date.now()}_${idx}`,
        targetProductId: rId,
        relatedProductIds: [data.targetProductId],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));
      setRelatedProducts(prev => [...prev, ...bidirRecords]);
    }
  };

  const updateRelatedProduct = (id, data) => {
    setRelatedProducts(prev => prev.map(item => item.id === id ? { ...item, ...data, updatedAt: new Date().toISOString() } : item));
  };

  const deleteRelatedProduct = (id) => {
    setRelatedProducts(prev => prev.filter(item => item.id !== id));
  };

  const createCrossSell = (data) => {
    const newRecord = { ...data, id: `cs_${Date.now()}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    setCrossSells(prev => [...prev, newRecord]);
  };

  const updateCrossSell = (id, data) => {
    setCrossSells(prev => prev.map(item => item.id === id ? { ...item, ...data, updatedAt: new Date().toISOString() } : item));
  };

  const deleteCrossSell = (id) => {
    setCrossSells(prev => prev.filter(item => item.id !== id));
  };

  const value = {
    MOCK_CATALOG,
    experiences, homepageSections, featuredProducts, featuredCategories,
    productRecommendations, relatedProducts, crossSells, upSells, productBundles,
    experienceCollections, seasonalMerchandising, promotionalPlacements,
    productPlacementRules, personalizationRules, customerSegmentRules,
    bannerPlacements, variants, experiments, filters, selectedRecord, loading, errors,
    
    // Actions
    loadHomepage, updateHomepage, createFeaturedItem, updateFeaturedItem,
    createRecommendationRule, updateRecommendationRule, createPersonalizationRule,
    updatePersonalizationRule, createExperiment, updateExperiment, createVariant,
    updateVariant, loadAnalytics,
    setRelatedProducts, createRelatedProduct, updateRelatedProduct, deleteRelatedProduct,
    setCrossSells, createCrossSell, updateCrossSell, deleteCrossSell
  };

  return (
    <ExperienceContext.Provider value={value}>
      {children}
    </ExperienceContext.Provider>
  );
}

export function useExperience() {
  const context = useContext(ExperienceContext);
  if (!context) {
    throw new Error('useExperience must be used within an ExperienceProvider');
  }
  return context;
}
