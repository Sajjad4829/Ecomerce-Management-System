/**
 * src/admin/context/cms/CMSContext.jsx
 * -----------------------------------------------
 * MongoDB-backed CMS state.
 * All pages, sections, and config are fetched from /api/cms/*.
 * localStorage has been completely removed.
 *
 * Key design:
 *  - pages metadata  → /api/cms/pages (list)
 *  - page sections   → /api/cms/pages/:id (draft + published stored in CMSPage doc)
 *  - headerConfig    → /api/cms/config/header
 *  - pageTypes       → /api/cms/config (read-only from DB seed)
 *  - sections lib / blocks / menus / banners → static in-memory (no DB yet)
 */
import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

const CMSContext = createContext(null);

// ── Static section library (read-only, no persistence needed) ─────────────────
const INITIAL_SECTIONS = [
  {
    id: 'lib-hero-banner',
    type: 'HERO_BANNER',
    name: 'Hero Banner',
    category: 'HERO',
    description: 'Full-width hero with background image and CTA',
    icon: 'FiImage',
    defaultContent: {
      slides: [
        {
          id: 'slide-1',
          image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1920',
          title: 'Compliments your lifestyle',
          subtitle: 'The expression of rest',
          phoneNumber: '09 678 7777 77',
          active: true,
          buttonText: 'Shop Now',
          buttonLink: '/shop'
        }
      ]
    },
    defaultSettings: { padding: 'none', align: 'center', transitionEffect: 'Fade', autoplay: true, autoplaySpeed: 5 },
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=400'
  },
  { id: 'lib-split-hero', type: 'SPLIT_HERO', name: 'Split Hero', category: 'HERO', description: '50/50 split with image and text', icon: 'FiLayout', defaultContent: { title: 'Modern Living', description: 'Elevate your space.' }, defaultSettings: { imageAlign: 'right' }, status: 'Active', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=400' },
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
  { id: 'lib-creations', type: 'CREATIONS_SHOWCASE', name: 'Creations with Purpose Grid', category: 'CATEGORIES', description: 'Showcase feature grid', icon: 'FiGrid', defaultContent: { title: 'Creations with purpose', subtitle: 'Many choices based on your space', ctaText: 'Explore Now', ctaUrl: '/shop', items: [{ id: '1', imageUrl: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=800', title: 'Bedroom', link: '/category/bedroom' }] }, defaultSettings: {}, status: 'Active', image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=400' },
  { id: 'lib-feat-show', type: 'FEATURED_SHOWCASE', name: 'Featured Showcase', category: 'CATEGORIES', description: 'Dynamic showcase with an advanced grid image editor.', icon: 'FiLayout', defaultContent: { title: 'Featured Showcase', subtitle: 'Highlight your top collections', ctaText: 'Discover More', ctaUrl: '/collections', items: [{ id: '1', imageUrl: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=800', title: 'Living Space', link: '/category/living-room' }, { id: '2', imageUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=800', title: 'Office', link: '/category/office' }] }, defaultSettings: {}, status: 'Active' },
];

const INITIAL_BLOCKS = [
  { id: 'gb-summer-promo', type: 'PROMO_BANNER', name: 'Summer Sale Promo Banner', category: 'Banners', description: 'Global summer promo', icon: 'FiFlag', defaultContent: {}, defaultSettings: {}, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=400', status: 'Active' },
  { id: 'gb-footer-std', type: 'FOOTER', name: 'Standard Footer - 2024', category: 'Footers', description: 'Global footer', icon: 'FiLayout', defaultContent: {}, defaultSettings: {}, status: 'Active' },
];

const INITIAL_MENUS = [
  { id: 'MNU-001', name: 'Main Header Navigation', type: 'Header', status: 'Active', items: [] },
  { id: 'MNU-002', name: 'Footer Links', type: 'Footer', status: 'Active', items: [] },
  { id: 'MNU-003', name: 'Mobile Sidebar', type: 'Mobile', status: 'Active', items: [] },
];

const DEFAULT_HEADER_CONFIG = {
  primaryMenuId: 'MNU-001', logoType: 'text', logoText: '', logoImage: '',
  enableSearch: true, enableUser: true, enableCart: true, navbarStyle: 'transparent',
  backgroundColor: '#FFFFFF', textColor: '#111111', textHoverColor: '#6F4CFF',
  borderBottomStyle: 'solid', borderColor: '#E5E7EB', borderWidth: 1, borderRadius: 0,
  containerWidth: 'Full Width', contentAlignment: 'center', verticalAlignment: 'center',
  height: 72, paddingTop: 16, paddingRight: 24, paddingBottom: 16, paddingLeft: 24,
  fontFamily: 'Inter', fontSize: 15, fontWeight: '500', textTransform: 'None',
  letterSpacing: 0, spaceBetweenItems: 16, dropdownIndicator: true, uppercase: false,
  underlineOnHover: false, activeIndicator: 'Bottom Line', indicatorColor: '#6F4CFF',
  indicatorHeight: 2, megaMenuEnabled: true, megaMenuWidth: 'Full Width',
  megaMenuAnimation: 'Fade', megaMenuBackground: '#FFFFFF', stickyOnScroll: true,
  transparentOnTop: false, hoverTransparent: false, hideOnScrollDown: false, blurEffect: false,
};

// ── localStorage cache helpers (navbar instant-load) ──────────────────────────
const CACHE_KEY_HEADER = 'cms_headerConfig_cache';
const CACHE_KEY_MENUS = 'cms_menus_cache';

function readCache(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch (_) { }
  return fallback;
}

function writeCache(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) { }
}

export const CMSProvider = ({ children }) => {
  // ── Pages ──────────────────────────────────────────────────────────────────
  const [pages, setPages] = useState([]);
  const [pagesLoading, setPagesLoading] = useState(true);

  // ── Page sections (keyed by pageId, loaded per-page) ──────────────────────
  // pageSectionsDraft[pageId] = array of sections
  // pageSectionsPublished[pageId] = array of sections
  const [pageSectionsDraft, setPageSectionsDraft] = useState({});
  const [pageSectionsPublished, setPageSectionsPublished] = useState({});

  // ── CMS Config (header, page types) ───────────────────────────────────────
  // Seed from localStorage cache so the navbar renders with real data on reload
  // without waiting for the API call to complete.
  const [headerConfig, setHeaderConfigState] = useState(
    () => readCache(CACHE_KEY_HEADER, DEFAULT_HEADER_CONFIG)
  );
  const [pageTypes, setPageTypes] = useState([]);
  const [configLoading, setConfigLoading] = useState(true);

  // ── Section Preview Map (keyed by type → best saved instance from MongoDB) ──
  // This is the source-of-truth for Section Library previews.
  // It is populated on mount from /api/cms/sections/preview-map.
  const [sectionPreviewMap, setSectionPreviewMap] = useState({});
  const [sectionPreviewLoading, setSectionPreviewLoading] = useState(true);

  // ── Static / in-memory state ───────────────────────────────────────────────
  const [sectionsState, setSectionsState] = useState(() => {
    const cached = readCache('cms_sections_cache', null);
    if (cached && Array.isArray(cached) && cached.length > 0) return cached;
    return INITIAL_SECTIONS;
  });

  const setSections = useCallback((sectionsOrUpdater) => {
    setSectionsState(prev => {
      const next = typeof sectionsOrUpdater === 'function' ? sectionsOrUpdater(prev) : sectionsOrUpdater;
      writeCache('cms_sections_cache', next);
      return next;
    });
  }, []);
  const [blocks, setBlocks] = useState(INITIAL_BLOCKS);
  const [menus, setMenusState] = useState(
    () => readCache(CACHE_KEY_MENUS, INITIAL_MENUS)
  );
  const [banners, setBanners] = useState([
    { id: 'BAN-001', name: 'Summer Sale Popup', placement: 'Homepage', startDate: '2024-06-01', endDate: '2024-08-31', status: 'Active' },
    { id: 'BAN-002', name: 'Free Shipping Topbar', placement: 'Global', startDate: '2024-01-01', endDate: '2024-12-31', status: 'Active' },
  ]);
  const [seo, setSeo] = useState([
    { id: 'SEO-001', pageId: 'PG-001', title: 'Premium Furniture Store', description: 'Experience luxury.', status: 'Indexed', score: '95/100' },
  ]);
  const [redirects, setRedirects] = useState([
    { id: 'RED-001', source: '/old-about', destination: '/about', statusCode: '301', status: 'Active' },
    { id: 'RED-002', source: '/promo2023', destination: '/offers', statusCode: '302', status: 'Active' },
  ]);
  const [versions, setVersions] = useState([
    { id: 'VER-001', pageId: 'PG-001', version: 'v1.2', author: 'Admin', changeSummary: 'Updated hero image', createdAt: '2024-06-10' },
  ]);

  // ── Load Section Library Configurations from MongoDB on mount ──────────────
  // Fetches real saved section templates, keyed by type.
  // Flow: MongoDB → libraryConfigurations → sectionPreviewMap
  //        → Section Library cards → resolveSectionPreview() → real content
  const [libraryConfigurations, setLibraryConfigurations] = useState({});

  const fetchLibraryConfigurations = useCallback(async () => {
    try {
      setSectionPreviewLoading(true);
      const res = await fetch('/api/cms/library/configurations');
      if (!res.ok) throw new Error('Failed to load library configurations');
      const data = await res.json();
      
      const configMap = {};
      data.forEach(config => {
        configMap[config.sectionType] = {
          _previewSource: 'mongodb',
          type: config.sectionType,
          content: config.content || {},
          settings: config.settings || {}
        };
      });
      
      setLibraryConfigurations(configMap);
      setSectionPreviewMap(configMap);
    } catch (err) {
      console.error('CMSContext: failed to load library configurations', err);
    } finally {
      setSectionPreviewLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLibraryConfigurations();
  }, [fetchLibraryConfigurations]);

  const saveLibraryConfiguration = useCallback(async (sectionType, configData) => {
    try {
      const res = await fetch(`/api/cms/library/configurations/${sectionType}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(configData)
      });
      if (!res.ok) throw new Error('Failed to save configuration');
      
      // Update local state immediately
      setLibraryConfigurations(prev => {
        const next = { ...prev, [sectionType]: { _previewSource: 'mongodb', type: sectionType, ...configData } };
        setSectionPreviewMap(next);
        return next;
      });
    } catch (err) {
      console.error('CMSContext: failed to save library configuration', err);
      throw err;
    }
  }, []);

  // ── Load pages from MongoDB on mount ──────────────────────────────────────
  useEffect(() => {
    const fetchPages = async () => {
      try {
        setPagesLoading(true);
        const res = await fetch('/api/cms/pages');
        if (!res.ok) throw new Error('Failed to load pages');
        const data = await res.json();
        setPages(data);
      } catch (err) {
        console.error('CMSContext: failed to load pages', err);
      } finally {
        setPagesLoading(false);
      }
    };
    fetchPages();
  }, []);

  // ── Load CMS config (header + page types) from MongoDB on mount ───────────
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setConfigLoading(true);
        const res = await fetch('/api/cms/config');
        if (!res.ok) throw new Error('Failed to load CMS config');
        const data = await res.json();
        if (data.headerConfig) {
          setHeaderConfigState(data.headerConfig);
          writeCache(CACHE_KEY_HEADER, data.headerConfig);
        }
        if (data.pageTypes && Array.isArray(data.pageTypes)) setPageTypes(data.pageTypes);
        if (data.menus && Array.isArray(data.menus)) {
          setMenusState(data.menus);
          writeCache(CACHE_KEY_MENUS, data.menus);
        }
      } catch (err) {
        console.error('CMSContext: failed to load config', err);
        // Fallback to static page types
        setPageTypes([
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
          { id: 'PT-011', name: 'Custom Page', slug: 'custom', description: 'Blank canvas', template: 'blank', status: 'Active', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
        ]);
      } finally {
        setConfigLoading(false);
      }
    };
    fetchConfig();
  }, []);

  // ── Pages CRUD ─────────────────────────────────────────────────────────────

  const getPage = useCallback((id) => pages.find(p => p.id === id), [pages]);

  const createPage = useCallback(async (pageData) => {
    const payload = {
      description: '', seoDescription: '', ogImage: '', template: 'blank', visibility: 'Public',
      ...pageData,
      id: `PG-${Date.now()}`,
      status: (pageData.status || 'draft').toLowerCase(),
      author: 'Admin',
      title: pageData.title || 'Untitled',
      seo: {
        metaTitle: pageData.seoTitle || '',
        metaDescription: pageData.seoDescription || '',
        ogImage: pageData.ogImage || ''
      }
    };
    const res = await fetch('/api/cms/pages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (!res.ok) { const e = await res.json(); throw new Error(e.error || 'Failed to create page'); }
    const newPage = await res.json();
    setPages(prev => [...prev, newPage]);
    return newPage;
  }, []);

  const updatePage = useCallback(async (pageId, pageData) => {
    const payload = {
      ...pageData,
      status: (pageData.status || 'draft').toLowerCase(),
      title: pageData.title || 'Untitled',
      seo: {
        metaTitle: pageData.seoTitle || '',
        metaDescription: pageData.seoDescription || '',
        ogImage: pageData.ogImage || ''
      }
    };
    const res = await fetch(`/api/cms/pages/${pageId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (!res.ok) { const e = await res.json(); throw new Error(e.error || 'Failed to update page'); }
    const updated = await res.json();
    setPages(prev => prev.map(p => p.id === pageId ? { ...p, ...updated } : p));
    return updated;
  }, []);

  const deletePage = useCallback(async (pageId) => {
    const res = await fetch(`/api/cms/pages/${pageId}`, { method: 'DELETE' });
    if (!res.ok) { const e = await res.json(); throw new Error(e.error || 'Failed to delete page'); }
    setPages(prev => prev.filter(p => p.id !== pageId));
    setPageSectionsDraft(prev => { const n = { ...prev }; delete n[pageId]; return n; });
    setPageSectionsPublished(prev => { const n = { ...prev }; delete n[pageId]; return n; });
  }, []);

  // ── Sections CRUD ──────────────────────────────────────────────────────────

  // Load sections for a specific page from MongoDB
  const loadPageSections = useCallback(async (pageId) => {
    try {
      const res = await fetch(`/api/cms/pages/${pageId}`);
      if (!res.ok) throw new Error('Failed to load page sections');
      const data = await res.json();
      setPageSectionsDraft(prev => ({ ...prev, [pageId]: data.sectionsDraft || [] }));
      setPageSectionsPublished(prev => ({ ...prev, [pageId]: data.sectionsPublished || [] }));
      return data;
    } catch (err) {
      console.error(`CMSContext: failed to load sections for ${pageId}`, err);
    }
  }, []);

  const getPageSections = useCallback((pageId) =>
    pageSectionsPublished[pageId] || [], [pageSectionsPublished]);

  const getDraftSections = useCallback((pageId) =>
    pageSectionsDraft[pageId] || [], [pageSectionsDraft]);

  // Save draft (auto-save, doesn't publish)
  const saveDraftSections = useCallback(async (pageId, currentSections) => {
    // Optimistic local update
    setPageSectionsDraft(prev => ({ ...prev, [pageId]: currentSections }));
    // Persist to MongoDB
    try {
      await fetch(`/api/cms/pages/${pageId}/sections/draft`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sections: currentSections }),
      });
    } catch (err) {
      console.error('CMSContext: saveDraftSections failed', err);
    }
  }, []);

  // Publish: copy draft → published in DB
  const publishPageSections = useCallback(async (pageId, explicitSections = null) => {
    const sectionsToPublish = explicitSections || pageSectionsDraft[pageId] || [];

    // Optimistic update
    setPageSectionsDraft(prev => ({ ...prev, [pageId]: sectionsToPublish }));
    setPageSectionsPublished(prev => ({ ...prev, [pageId]: sectionsToPublish }));
    setPages(prev => prev.map(p => p.id === pageId
      ? { ...p, status: 'published', updatedAt: new Date().toISOString().split('T')[0] }
      : p
    ));

    // Persist to MongoDB
    try {
      await fetch(`/api/cms/pages/${pageId}/sections/publish`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sections: sectionsToPublish }),
      });
    } catch (err) {
      console.error('CMSContext: publishPageSections failed', err);
    }
  }, [pageSectionsDraft]);

  // ── Header Config ──────────────────────────────────────────────────────────

  const setHeaderConfig = useCallback(async (configOrUpdater) => {
    const newConfig = typeof configOrUpdater === 'function'
      ? configOrUpdater(headerConfig)
      : configOrUpdater;

    // Optimistic local update + cache so next reload is instant
    setHeaderConfigState(newConfig);
    writeCache(CACHE_KEY_HEADER, newConfig);

    // Persist to MongoDB
    try {
      await fetch('/api/cms/config/header', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newConfig),
      });
    } catch (err) {
      console.error('CMSContext: setHeaderConfig save failed', err);
    }
  }, [headerConfig]);

  const setMenus = useCallback(async (menusOrUpdater) => {
    const newMenus = typeof menusOrUpdater === 'function'
      ? menusOrUpdater(menus)
      : menusOrUpdater;

    // Optimistic local update + cache so next reload is instant
    setMenusState(newMenus);
    writeCache(CACHE_KEY_MENUS, newMenus);

    // Persist to MongoDB
    try {
      await fetch('/api/cms/config/menus', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMenus),
      });
    } catch (err) {
      console.error('CMSContext: setMenus save failed', err);
    }
  }, [menus]);

  // ── Context value ──────────────────────────────────────────────────────────

  // Derive a virtual "Navbar" global section from headerConfig.
  // This entry appears in the AddSectionDrawer so admins can place the
  // navbar on a page, but it has NO property panel — it is read-only and
  // can only be configured in the Header Config (NavbarEditor).
  const navbarGlobalSection = useMemo(() => ({
    id: 'global-navbar',
    type: 'NAVBAR',
    name: headerConfig?.logoText ? `${headerConfig.logoText} Navbar` : 'Global Navbar',
    category: 'GLOBAL',
    description: 'The site-wide navbar configured in Header Config. Not editable here.',
    icon: 'FiNavigation',
    isGlobal: true,
    isReadOnly: true,
    status: 'Active',
    defaultContent: {},
    defaultSettings: {},
  }), [headerConfig]);

  const contextValue = useMemo(() => ({
    // Pages
    pageTypes, setPageTypes,
    pages, setPages, getPage, pagesLoading,
    pageSectionsDraft, pageSectionsPublished,
    getPageSections, getDraftSections,
    saveDraftSections, publishPageSections,
    createPage, updatePage, deletePage, loadPageSections,
    // Sections library (metadata registry — types, names, categories, icons)
    sections: sectionsState, setSections,
    blocks, setBlocks,
    // Section preview map: real saved data from MongoDB, keyed by section type
    // Use resolveSectionPreview(registryEntry, sectionPreviewMap) to get content
    libraryConfigurations, fetchLibraryConfigurations, saveLibraryConfiguration,
    sectionPreviewMap, sectionPreviewLoading,
    menus, setMenus,
    banners, setBanners,
    seo, setSeo,
    redirects, setRedirects,
    versions, setVersions,
    // Global virtual sections (navbar, footer, etc.)
    navbarGlobalSection,
    // Config
    headerConfig, setHeaderConfig, configLoading,
  }), [
    pageTypes, pages, pagesLoading,
    pageSectionsDraft, pageSectionsPublished,
    sectionsState, blocks, menus, banners, seo, redirects, versions,
    libraryConfigurations, sectionPreviewMap, sectionPreviewLoading,
    headerConfig, configLoading,
    getPage, getPageSections, getDraftSections,
    saveDraftSections, publishPageSections,
    createPage, updatePage, deletePage, loadPageSections, setHeaderConfig, setMenus,
    navbarGlobalSection,
  ]);

  return (
    <CMSContext.Provider value={contextValue}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => useContext(CMSContext);
