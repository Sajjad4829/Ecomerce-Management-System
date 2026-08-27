import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

const CMSContext = createContext(null);

export const CMSProvider = ({ children }) => {
  const [pageTypes, setPageTypes] = useState([
    { id: 'PT-001', name: 'Home', slug: 'home', description: 'Homepage templates', template: 'default-home', status: 'Active', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
    { id: 'PT-002', name: 'Landing Page', slug: 'landing-page', description: 'Marketing landing pages', template: 'landing', status: 'Active', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
    { id: 'PT-003', name: 'Category Page', slug: 'category', description: 'Product category pages', template: 'category', status: 'Active', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
    { id: 'PT-004', name: 'Collection Page', slug: 'collection', description: 'Curated collections', template: 'collection', status: 'Active', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
    { id: 'PT-005', name: 'Campaign Page', slug: 'campaign', description: 'Time-bound campaigns', template: 'campaign', status: 'Active', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
    { id: 'PT-006', name: 'Product Listing Page', slug: 'plp', description: 'Standard product listings', template: 'plp', status: 'Active', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
    { id: 'PT-007', name: 'Brand Page', slug: 'brand', description: 'Brand story pages', template: 'brand', status: 'Active', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
    { id: 'PT-008', name: 'About Page', slug: 'about', description: 'Company information', template: 'about', status: 'Active', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
    { id: 'PT-009', name: 'Contact Page', slug: 'contact', description: 'Contact forms and info', template: 'contact', status: 'Active', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
    { id: 'PT-010', name: 'Blog / Content Page', slug: 'blog', description: 'Articles and content', template: 'blog', status: 'Active', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
    { id: 'PT-011', name: 'Custom Page', slug: 'custom', description: 'Blank canvas', template: 'blank', status: 'Active', createdAt: '2024-01-01', updatedAt: '2024-01-01' }
  ]);

  const scrubBlobs = (obj) => {
    if (typeof obj === 'string' && obj.startsWith('blob:')) {
      return ''; // scrub dead blob
    }
    if (Array.isArray(obj)) {
      return obj.map(scrubBlobs);
    }
    if (obj !== null && typeof obj === 'object') {
      const newObj = {};
      for (const [key, val] of Object.entries(obj)) {
        newObj[key] = scrubBlobs(val);
      }
      return newObj;
    }
    return obj;
  };

  const loadFromStorage = (key, fallback) => {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        const parsed = JSON.parse(item);
        return scrubBlobs(parsed);
      }
      return fallback;
    } catch {
      return fallback;
    }
  };

  const [pages, setPages] = useState(() => loadFromStorage('cms_pages_v2', []));

  const [pageSectionsDraft, setPageSectionsDraft] = useState(() => loadFromStorage('cms_pageSectionsDraft_v2', {}));
  const [pageSectionsPublished, setPageSectionsPublished] = useState(() => loadFromStorage('cms_pageSectionsPublished_v2', {}));

  const [headerConfig, setHeaderConfig] = useState(() => loadFromStorage('cms_header_config', {
    primaryMenuId: 'MNU-001',
    logoType: 'text',
    logoText: 'HATIL',
    logoImage: '',
    enableSearch: true,
    enableUser: true,
    enableCart: true,
    navbarStyle: 'default',
    backgroundColor: '#FFFFFF',
    textHoverColor: '#6F4CFF',
    textColor: '#111111',
    borderBottomStyle: 'solid',
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 0,
    containerWidth: 'Full Width',
    contentAlignment: 'center',
    verticalAlignment: 'center',
    height: 72,
    paddingTop: 16, paddingRight: 24, paddingBottom: 16, paddingLeft: 24,
    fontFamily: 'Inter',
    fontSize: 15,
    fontWeight: '500',
    textTransform: 'None',
    letterSpacing: 0,
    spaceBetweenItems: 28,
    dropdownIndicator: true,
    uppercase: false,
    underlineOnHover: false,
    activeIndicator: 'Bottom Line',
    indicatorColor: '#6F4CFF',
    indicatorHeight: 2,
    megaMenuEnabled: true,
    megaMenuWidth: 'Full Width',
    megaMenuAnimation: 'Fade',
    megaMenuBackground: '#FFFFFF',
    stickyOnScroll: true,
    transparentOnTop: false,
    hoverTransparent: false,
    hideOnScrollDown: false,
    blurEffect: false
  }));

  useEffect(() => {
    localStorage.setItem('cms_pages_v2', JSON.stringify(pages));
  }, [pages]);

  useEffect(() => {
    localStorage.setItem('cms_pageSectionsDraft_v2', JSON.stringify(pageSectionsDraft));
  }, [pageSectionsDraft]);

  useEffect(() => {
    localStorage.setItem('cms_pageSectionsPublished_v2', JSON.stringify(pageSectionsPublished));
  }, [pageSectionsPublished]);

  useEffect(() => {
    localStorage.setItem('cms_header_config', JSON.stringify(headerConfig));
  }, [headerConfig]);

  // Sync state across browser tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'cms_pages_v2') {
        setPages(JSON.parse(e.newValue || '[]'));
      }
      if (e.key === 'cms_pageSectionsPublished_v2') {
        setPageSectionsPublished(JSON.parse(e.newValue || '{}'));
      }
      if (e.key === 'cms_pageSectionsDraft_v2') {
        setPageSectionsDraft(JSON.parse(e.newValue || '{}'));
      }
      if (e.key === 'cms_sections_v2') {
        setSections(JSON.parse(e.newValue || '[]'));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const INITIAL_SECTIONS = [
    { id: 'lib-navbar', type: 'HEADER_NAVBAR', name: 'Header & Navigation', category: 'GLOBAL', description: 'Top navigation bar with logo and menus', icon: 'FiLayout', defaultContent: {}, defaultSettings: { theme: 'light' }, status: 'Active' },
    { id: 'lib-hero-banner', type: 'HERO_BANNER', name: 'Hero Banner', category: 'HERO', description: 'Full-width hero with background image and CTA', icon: 'FiImage', defaultContent: { title: 'Compliments your lifestyle', subtitle: 'The expression of rest', phoneNumber: '09 678 7777 77' }, defaultSettings: { padding: 'none', align: 'center' }, status: 'Active', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=400' },
    { id: 'lib-split-hero', type: 'SPLIT_HERO', name: 'Split Hero', category: 'HERO', description: '50/50 split with image and text', icon: 'FiLayout', defaultContent: { title: 'Modern Living', description: 'Elevate your space.' }, defaultSettings: { imageAlign: 'right' }, status: 'Active' },
    { id: 'lib-promo-hero', type: 'PROMO_HERO', name: 'Promotional Hero', category: 'HERO', description: 'Hero section focused on a major promotion', icon: 'FiStar', defaultContent: { badge: 'Summer Sale', title: 'Up to 50% Off' }, defaultSettings: { colorScheme: 'dark' }, status: 'Active' },
    { id: 'lib-feat-prod', type: 'FEATURED_PRODUCTS', name: 'Featured Products', category: 'PRODUCTS', description: 'Highlight specific products', icon: 'FiBox', defaultContent: { title: 'Featured' }, defaultSettings: { columns: 4 }, status: 'Active' },
    { id: 'lib-prod-grid', type: 'PRODUCT_GRID', name: 'Product Grid', category: 'PRODUCTS', description: 'A standard grid of products', icon: 'FiGrid', defaultContent: { title: 'Shop the Look' }, defaultSettings: { rows: 2, columns: 4 }, status: 'Active', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=400' },
    { id: 'lib-prod-car', type: 'PRODUCT_CAROUSEL', name: 'Product Carousel', category: 'PRODUCTS', description: 'Horizontal scrollable product list', icon: 'FiLayout', defaultContent: { title: 'More Like This' }, defaultSettings: { autoplay: false }, status: 'Active' },
    { id: 'lib-new-arr', type: 'NEW_ARRIVALS', name: 'New Arrivals', category: 'PRODUCTS', description: 'Automatically display newest inventory', icon: 'FiStar', defaultContent: { title: 'Just Landed' }, defaultSettings: { limit: 8 }, status: 'Active' },
    { id: 'lib-best-sell', type: 'BEST_SELLERS', name: 'Best Sellers', category: 'PRODUCTS', description: 'Top performing products', icon: 'FiTrendingUp', defaultContent: { title: 'Trending Now' }, defaultSettings: { limit: 4 }, status: 'Active' },
    { id: 'lib-feat-cat', type: 'FEATURED_CATEGORIES', name: 'Featured Categories', category: 'CATEGORIES', description: 'Highlight top categories', icon: 'FiBox', defaultContent: { title: 'Shop by Room' }, defaultSettings: { layout: 'masonry' }, status: 'Active' },
    { id: 'lib-cat-grid', type: 'CATEGORY_GRID', name: 'Category Grid', category: 'CATEGORIES', description: 'Equal-sized category cards', icon: 'FiGrid', defaultContent: { title: 'Categories' }, defaultSettings: { columns: 3 }, status: 'Active', image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=400' },
    { id: 'lib-cat-car', type: 'CATEGORY_CAROUSEL', name: 'Category Carousel', category: 'CATEGORIES', description: 'Scrollable categories', icon: 'FiLayout', defaultContent: { title: 'Explore' }, defaultSettings: { autoplay: false }, status: 'Active' },
    { id: 'lib-promo-ban', type: 'PROMO_BANNER', name: 'Promotional Banner', category: 'MARKETING', description: 'Full-width promotional message', icon: 'FiFlag', defaultContent: { text: 'Free Shipping on orders over $500' }, defaultSettings: { color: 'brand' }, status: 'Active' },
    { id: 'lib-off-ban', type: 'OFFER_BANNER', name: 'Offer Banner', category: 'MARKETING', description: 'Specific offer with terms', icon: 'FiTag', defaultContent: { title: '20% Off Sofas' }, defaultSettings: { size: 'small' }, status: 'Active' },
    { id: 'lib-flash-sale', type: 'FLASH_SALE', name: 'Flash Sale', category: 'MARKETING', description: 'High-urgency sale section', icon: 'FiZap', defaultContent: { title: 'Midnight Sale' }, defaultSettings: { theme: 'dark' }, status: 'Active' },
    { id: 'lib-countdown', type: 'COUNTDOWN', name: 'Countdown', category: 'MARKETING', description: 'Live countdown timer', icon: 'FiClock', defaultContent: { label: 'Sale ends in:' }, defaultSettings: { align: 'center' }, status: 'Active' },
    { id: 'lib-cta-ban', type: 'CTA_BANNER', name: 'CTA Banner', category: 'MARKETING', description: 'Strong call to action', icon: 'FiMousePointer', defaultContent: { title: 'Ready to transform your home?', button: 'Get Started' }, defaultSettings: { padding: 'large' }, status: 'Active' },
    { id: 'lib-rich-txt', type: 'RICH_TEXT', name: 'Rich Text', category: 'CONTENT', description: 'Formatted text block', icon: 'FiType', defaultContent: { text: 'Enter your content here...' }, defaultSettings: { maxWidth: 'md' }, status: 'Active' },
    { id: 'lib-img-txt', type: 'IMAGE_TEXT', name: 'Image + Text', category: 'CONTENT', description: 'Image on left, text on right', icon: 'FiLayout', defaultContent: { title: 'Our Heritage' }, defaultSettings: { reverse: false }, status: 'Active' },
    { id: 'lib-txt-img', type: 'TEXT_IMAGE', name: 'Text + Image', category: 'CONTENT', description: 'Text on left, image on right', icon: 'FiLayout', defaultContent: { title: 'Craftsmanship' }, defaultSettings: { reverse: true }, status: 'Active' },
    { id: 'lib-brand-log', type: 'BRAND_LOGOS', name: 'Brand Logos', category: 'CONTENT', description: 'Grid of partner or brand logos', icon: 'FiAward', defaultContent: { title: 'Our Partners' }, defaultSettings: { grayscale: true }, status: 'Active' },
    { id: 'lib-stats', type: 'STATISTICS', name: 'Statistics', category: 'CONTENT', description: 'Number counters and stats', icon: 'FiBarChart2', defaultContent: { title: 'Our Impact' }, defaultSettings: { columns: 3 }, status: 'Active' },
    { id: 'lib-testim', type: 'TESTIMONIALS', name: 'Testimonials', category: 'SOCIAL PROOF', description: 'Selected customer quotes', icon: 'FiMessageSquare', defaultContent: { title: 'What our clients say' }, defaultSettings: { layout: 'carousel' }, status: 'Active' },
    { id: 'lib-cust-rev', type: 'CUSTOMER_REVIEWS', name: 'Customer Reviews', category: 'SOCIAL PROOF', description: 'Aggregated product reviews', icon: 'FiStar', defaultContent: { title: 'Recent Reviews' }, defaultSettings: { limit: 6 }, status: 'Active' },
    { id: 'lib-trust-bad', type: 'TRUST_BADGES', name: 'Trust Badges', category: 'SOCIAL PROOF', description: 'Security and guarantee badges', icon: 'FiShield', defaultContent: { title: 'Shop with Confidence' }, defaultSettings: { size: 'small' }, status: 'Active' },
    { id: 'lib-img-gal', type: 'IMAGE_GALLERY', name: 'Image Gallery', category: 'MEDIA', description: 'Grid or masonry image gallery', icon: 'FiImage', defaultContent: { title: 'Inspiration' }, defaultSettings: { layout: 'grid' }, status: 'Active' },
    { id: 'lib-video-sec', type: 'VIDEO_SECTION', name: 'Video Section', category: 'MEDIA', description: 'Embedded video player', icon: 'FiVideo', defaultContent: { title: 'Behind the Scenes' }, defaultSettings: { autoplay: false }, status: 'Active' },
    { id: 'lib-news', type: 'NEWSLETTER', name: 'Newsletter', category: 'ENGAGEMENT', description: 'Email capture form', icon: 'FiMail', defaultContent: { title: 'Join our list', subtitle: 'Get 10% off your first order' }, defaultSettings: { align: 'center' }, status: 'Active' },
    { id: 'lib-faq', type: 'FAQ', name: 'FAQ', category: 'ENGAGEMENT', description: 'Accordion of questions and answers', icon: 'FiHelpCircle', defaultContent: { title: 'Frequently Asked Questions' }, defaultSettings: { expanded: false }, status: 'Active' },
    { id: 'lib-cont-cta', type: 'CONTACT_CTA', name: 'Contact CTA', category: 'ENGAGEMENT', description: 'Call to action for customer support', icon: 'FiPhone', defaultContent: { title: 'Need Help?', button: 'Contact Us' }, defaultSettings: { theme: 'light' }, status: 'Active' },
    { 
      id: 'lib-creations', type: 'CREATIONS_SHOWCASE', name: 'Creations with Purpose Grid', category: 'CATEGORIES', description: 'Showcase feature grid', icon: 'FiGrid',
      defaultContent: {
        title: "Creations with purpose", subtitle: "Many choices based on your space", ctaText: "Explore Now", ctaUrl: "/shop",
        items: [{ id: "1", imageUrl: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=800", title: "Bedroom", link: "/category/bedroom" }]
      },
      defaultSettings: {}, status: 'Active', image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=400'
    }
  ];

  const INITIAL_BLOCKS = [
    { id: 'gb-summer-promo', type: 'PROMO_BANNER', name: 'Summer Sale Promo Banner', category: 'Banners', description: 'Global summer promo', icon: 'FiFlag', defaultContent: {}, defaultSettings: {}, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=400', status: 'Active' },
    { id: 'gb-footer-std', type: 'FOOTER', name: 'Standard Footer - 2024', category: 'Footers', description: 'Global footer', icon: 'FiLayout', defaultContent: {}, defaultSettings: {}, status: 'Active' }
  ];

  const mergeWithInitial = (savedArray, initialArray) => {
    if (!savedArray || savedArray.length === 0) return initialArray;
    const savedIds = new Set(savedArray.map(item => item.id));
    const missingInitials = initialArray.filter(item => !savedIds.has(item.id));
    return [...missingInitials, ...savedArray];
  };

  const [sections, setSections] = useState(() => mergeWithInitial(loadFromStorage('cms_sections_v2', []), INITIAL_SECTIONS));
  const [blocks, setBlocks] = useState(() => mergeWithInitial(loadFromStorage('cms_blocks', []), INITIAL_BLOCKS));

  useEffect(() => {
    localStorage.setItem('cms_sections_v2', JSON.stringify(sections));
  }, [sections]);

  useEffect(() => {
    localStorage.setItem('cms_blocks', JSON.stringify(blocks));
  }, [blocks]);

  const INITIAL_MENUS = [
    { id: 'MNU-001', name: 'Main Header Navigation', type: 'Header', status: 'Active', items: [] },
    { id: 'MNU-002', name: 'Footer Links', type: 'Footer', status: 'Active', items: [] },
    { id: 'MNU-003', name: 'Mobile Sidebar', type: 'Mobile', status: 'Active', items: [] }
  ];

  const [menus, setMenus] = useState(() => loadFromStorage('cms_menus_v2', INITIAL_MENUS));

  useEffect(() => {
    localStorage.setItem('cms_menus_v2', JSON.stringify(menus));
  }, [menus]);

  const [banners, setBanners] = useState([
    { id: 'BAN-001', name: 'Summer Sale Popup', placement: 'Homepage', startDate: '2024-06-01', endDate: '2024-08-31', status: 'Active' },
    { id: 'BAN-002', name: 'Free Shipping Topbar', placement: 'Global', startDate: '2024-01-01', endDate: '2024-12-31', status: 'Active' }
  ]);

  const [seo, setSeo] = useState([
    { id: 'SEO-001', pageId: 'PG-001', title: 'Premium Furniture Store', description: 'Experience luxury.', status: 'Indexed', score: '95/100' }
  ]);

  const [redirects, setRedirects] = useState([
    { id: 'RED-001', source: '/old-about', destination: '/about', statusCode: '301', status: 'Active' },
    { id: 'RED-002', source: '/promo2023', destination: '/offers', statusCode: '302', status: 'Active' }
  ]);

  const [versions, setVersions] = useState([
    { id: 'VER-001', pageId: 'PG-001', version: 'v1.2', author: 'Admin', changeSummary: 'Updated hero image', createdAt: '2024-06-10' }
  ]);

  const getPage = useCallback((id) => pages.find(p => p.id === id), [pages]);

  const getPageSections = useCallback((pageId) => {
    return pageSectionsPublished[pageId] || [];
  }, [pageSectionsPublished]);

  const getDraftSections = useCallback((pageId) => {
    return pageSectionsDraft[pageId] || [];
  }, [pageSectionsDraft]);

  const saveDraftSections = useCallback((pageId, currentSections) => {
    setPageSectionsDraft(prev => ({ ...prev, [pageId]: currentSections }));
  }, []);

  const publishPageSections = (pageId, explicitSections = null) => {
    const sectionsToPublish = explicitSections || getDraftSections(pageId);
    if (explicitSections) {
      setPageSectionsDraft(prev => ({ ...prev, [pageId]: explicitSections }));
    }
    setPageSectionsPublished(prev => ({ ...prev, [pageId]: sectionsToPublish }));
    setPages(prev => prev.map(p => p.id === pageId ? { ...p, status: 'Published', sections: sectionsToPublish.length, updatedAt: new Date().toISOString().split('T')[0] } : p));
  };

  const createPage = (pageData) => {
    const timestamp = new Date().toISOString().split('T')[0];
    const newPage = {
      description: '', seoDescription: '', ogImage: '', template: 'default', visibility: 'Public',
      ...pageData,
      id: `PG-${Date.now()}`,
      status: pageData.status || 'Draft',
      sections: 0,
      seoStatus: 'Needs Setup',
      author: 'Admin',
      createdAt: timestamp,
      updatedAt: timestamp
    };
    setPages(prev => [...prev, newPage]);
    return newPage;
  };

  const updatePage = (pageId, pageData) => {
    setPages(prev => prev.map(p => p.id === pageId ? { ...p, ...pageData, updatedAt: new Date().toISOString().split('T')[0] } : p));
  };

  const deletePage = (pageId) => {
    setPages(prev => prev.filter(p => p.id !== pageId));
    setPageSectionsDraft(prev => {
      const next = { ...prev };
      delete next[pageId];
      return next;
    });
    setPageSectionsPublished(prev => {
      const next = { ...prev };
      delete next[pageId];
      return next;
    });
  };

  const contextValue = useMemo(() => ({
    pageTypes, setPageTypes,
    pages, setPages, getPage,
    pageSectionsDraft, pageSectionsPublished,
    getPageSections, getDraftSections, saveDraftSections, publishPageSections, createPage, updatePage, deletePage,
    sections, setSections,
    blocks, setBlocks,
    menus, setMenus,
    banners, setBanners,
    seo, setSeo,
    redirects, setRedirects,
    versions, setVersions,
    headerConfig, setHeaderConfig
  }), [pageTypes, pages, pageSectionsDraft, pageSectionsPublished, sections, blocks, menus, banners, seo, redirects, versions, headerConfig, getPage, getPageSections, getDraftSections, saveDraftSections]);

  return (
    <CMSContext.Provider value={contextValue}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => useContext(CMSContext);
