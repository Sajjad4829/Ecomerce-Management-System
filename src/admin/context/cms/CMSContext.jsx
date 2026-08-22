import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

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

  const loadFromStorage = (key, fallback) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  };

  const [pages, setPages] = useState(() => loadFromStorage('cms_pages_v2', [
    { id: 'PG-001', name: 'Homepage', title: 'Premium Furniture', slug: '/', pageTypeId: 'PT-001', status: 'Published', visibility: 'Public', template: 'default-home', description: 'Main storefront homepage', seoDescription: 'Premium furniture ecommerce', ogImage: '', sections: 7, seoStatus: 'Good', author: 'Admin', createdAt: '2024-01-01', updatedAt: '2024-06-10' },
  ]));

  const [pageSectionsDraft, setPageSectionsDraft] = useState(() => loadFromStorage('cms_pageSectionsDraft_v2', {}));
  const [pageSectionsPublished, setPageSectionsPublished] = useState(() => loadFromStorage('cms_pageSectionsPublished_v2', {}));

  useEffect(() => {
    localStorage.setItem('cms_pages_v2', JSON.stringify(pages));
  }, [pages]);

  useEffect(() => {
    localStorage.setItem('cms_pageSectionsDraft_v2', JSON.stringify(pageSectionsDraft));
  }, [pageSectionsDraft]);

  useEffect(() => {
    localStorage.setItem('cms_pageSectionsPublished_v2', JSON.stringify(pageSectionsPublished));
  }, [pageSectionsPublished]);

  const INITIAL_SECTIONS = [
    { id: 'lib-hero-banner', type: 'HERO_BANNER', name: 'Hero Banner', category: 'HERO', description: 'Full-width hero with background image and CTA', icon: 'FiImage', defaultContent: { title: 'New Collection', subtitle: 'Discover premium designs', ctaText: 'Shop Now' }, defaultSettings: { padding: 'none', align: 'center' }, status: 'Active', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=400' },
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

  const [sections, setSections] = useState(() => loadFromStorage('cms_sections', INITIAL_SECTIONS));
  const [blocks, setBlocks] = useState(() => loadFromStorage('cms_blocks', INITIAL_BLOCKS));

  useEffect(() => {
    localStorage.setItem('cms_sections', JSON.stringify(sections));
  }, [sections]);

  useEffect(() => {
    localStorage.setItem('cms_blocks', JSON.stringify(blocks));
  }, [blocks]);

  const INITIAL_MENUS = [
    {
      id: 'MNU-001', name: 'Main Header Navigation', type: 'Header', status: 'Active',
      items: [
        {
          id: 'top-1', title: 'Living Room', link: '/categories/living-room', visibility: true, isMegaMenu: true, promoBanner: { imageUrl: '', link: '', altText: '' },
          columns: [
            { id: 'col-1', groups: [
              { id: 'grp-1', title: 'Sofa Set', link: '/categories/living-room/sofa-set', items: [
                { id: 'lnk-1', title: 'Fabric Sofa', link: '/categories/living-room/sofa-set/fabric-sofa' }, { id: 'lnk-2', title: 'Wooden Sofa', link: '/categories/living-room/sofa-set/wooden-sofa' }, { id: 'lnk-3', title: 'L-Shaped Sofa', link: '/categories/living-room/sofa-set/l-shaped-sofa' }, { id: 'lnk-4', title: 'Leather Sofa', link: '/categories/living-room/sofa-set/leather-sofa' }, { id: 'lnk-5', title: 'Rexin Sofa', link: '/categories/living-room/sofa-set/rexin-sofa' }, { id: 'lnk-6', title: 'Sofa-Bed', link: '/categories/living-room/sofa-set/sofa-bed' }, { id: 'lnk-7', title: '3-Seater Sofa', link: '/categories/living-room/sofa-set/3-seater-sofa' }, { id: 'lnk-8', title: '2-Seater Sofa', link: '/categories/living-room/sofa-set/2-seater-sofa' }, { id: 'lnk-9', title: 'Single Seater', link: '/categories/living-room/sofa-set/single-seater' }, { id: 'lnk-10', title: 'Modular Sofa', link: '/categories/living-room/sofa-set/modular-sofa' }, { id: 'lnk-11', title: 'Sofa with Divan', link: '/categories/living-room/sofa-set/sofa-with-divan' }, { id: 'lnk-12', title: 'Multipurpose Sofa', link: '/categories/living-room/sofa-set/multipurpose-sofa' }, { id: 'lnk-13', title: 'Storage Sofa', link: '/categories/living-room/sofa-set/storage-sofa' }, { id: 'lnk-14', title: 'Ottoman', link: '/categories/living-room/sofa-set/ottoman' }
              ]},
              { id: 'grp-2', title: 'Cushion', link: '/categories/living-room/cushion', items: [] }
            ]},
            { id: 'col-2', groups: [
              { id: 'grp-3', title: 'Center Table', link: '/categories/living-room/center-table', items: [
                { id: 'lnk-15', title: 'Center Table With Glass Top', link: '/categories/living-room/center-table/center-table-with-glass-top' }, { id: 'lnk-16', title: 'Center Table With Wooden Top', link: '/categories/living-room/center-table/center-table-with-wooden-top' }, { id: 'lnk-17', title: 'Center Table With Storage', link: '/categories/living-room/center-table/center-table-with-storage' }, { id: 'lnk-18', title: 'Corner Table', link: '/categories/living-room/center-table/corner-table' }, { id: 'lnk-19', title: 'Modular Center Table', link: '/categories/living-room/center-table/modular-center-table' }, { id: 'lnk-20', title: 'Non-Lacquer Center Table', link: '/categories/living-room/center-table/non-lacquer-center-table' }, { id: 'lnk-21', title: 'Nested Table', link: '/categories/living-room/center-table/nested-table' }
              ]},
              { id: 'grp-4', title: 'Divan', link: '/categories/living-room/divan', items: [
                { id: 'lnk-22', title: 'Fabric Divan', link: '/categories/living-room/divan/fabric-divan' }, { id: 'lnk-23', title: 'Wooden Divan', link: '/categories/living-room/divan/wooden-divan' }, { id: 'lnk-24', title: 'Modular Divan', link: '/categories/living-room/divan/modular-divan' }
              ]},
              { id: 'grp-5', title: 'Shoe Rack', link: '/categories/living-room/shoe-rack', items: [
                { id: 'lnk-25', title: 'Storage', link: '/categories/living-room/shoe-rack/storage' }, { id: 'lnk-26', title: 'Shoe Rack With Mirror', link: '/categories/living-room/shoe-rack/shoe-rack-with-mirror' }
              ]},
              { id: 'grp-6', title: 'Cradle', link: '/categories/living-room/cradle', items: [] }
            ]},
            { id: 'col-3', groups: [
              { id: 'grp-7', title: 'File Rack', link: '/categories/living-room/file-rack', items: [] },
              { id: 'grp-8', title: 'Stand', link: '/categories/living-room/stand', items: [
                { id: 'lnk-27', title: 'Hanger Stand', link: '/categories/living-room/stand/hanger-stand' }, { id: 'lnk-28', title: 'Iron Stand', link: '/categories/living-room/stand/iron-stand' }
              ]},
              { id: 'grp-9', title: 'TV Cabinet', link: '/categories/living-room/tv-cabinet', items: [
                { id: 'lnk-29', title: 'TV Cabinet With Hanging Unit', link: '/categories/living-room/tv-cabinet/tv-cabinet-with-hanging-unit' }, { id: 'lnk-30', title: 'Low Height TV Cabinet', link: '/categories/living-room/tv-cabinet/low-height-tv-cabinet' }, { id: 'lnk-31', title: 'Modular TV Cabinet', link: '/categories/living-room/tv-cabinet/modular-tv-cabinet' }
              ]},
              { id: 'grp-10', title: 'Open Shelves', link: '/categories/living-room/open-shelves', items: [
                { id: 'lnk-32', title: 'Book Shelves', link: '/categories/living-room/open-shelves/book-shelves' }, { id: 'lnk-33', title: 'Corner Shelves', link: '/categories/living-room/open-shelves/corner-shelves' }, { id: 'lnk-34', title: 'Display Rack', link: '/categories/living-room/open-shelves/display-rack' }
              ]}
            ]},
            { id: 'col-4', groups: [
              { id: 'grp-11', title: 'Chair', link: '/categories/living-room/chair', items: [
                { id: 'lnk-35', title: 'Rocking Chair', link: '/categories/living-room/chair/rocking-chair' }, { id: 'lnk-36', title: 'Easy Chair', link: '/categories/living-room/chair/easy-chair' }, { id: 'lnk-37', title: 'Accent Chair', link: '/categories/living-room/chair/accent-chair' }, { id: 'lnk-38', title: 'Bar Stool', link: '/categories/living-room/chair/bar-stool' }, { id: 'lnk-39', title: 'Foot Stool', link: '/categories/living-room/chair/foot-stool' }, { id: 'lnk-40', title: 'Telephone Seater', link: '/categories/living-room/chair/telephone-seater' }, { id: 'lnk-41', title: 'Recliner Chair', link: '/categories/living-room/chair/recliner-chair' }
              ]},
              { id: 'grp-12', title: 'Lobby', link: '/categories/living-room/lobby', items: [
                { id: 'lnk-42', title: 'Lobby Table', link: '/categories/living-room/lobby/lobby-table' }, { id: 'lnk-43', title: 'Lobby Chair', link: '/categories/living-room/lobby/lobby-chair' }
              ]}
            ]}
          ]
        },
        {
          id: 'top-2', title: 'Bedroom', link: '/categories/bedroom', visibility: true, isMegaMenu: true, promoBanner: { imageUrl: '', link: '', altText: '' },
          columns: [
            { id: 'col-5', groups: [{ id: 'grp-13', title: 'Bed', link: '/categories/bedroom/bed', items: [{ id: 'lnk-44', title: 'King Size Bed', link: '/categories/bedroom/bed/king-size-bed' }, { id: 'lnk-45', title: 'Queen Size Bed', link: '/categories/bedroom/bed/queen-size-bed' }, { id: 'lnk-46', title: 'Semi Double Bed', link: '/categories/bedroom/bed/semi-double-bed' }, { id: 'lnk-47', title: 'Single Bed', link: '/categories/bedroom/bed/single-bed' }, { id: 'lnk-48', title: 'Bunk Bed', link: '/categories/bedroom/bed/bunk-bed' }, { id: 'lnk-49', title: 'Hydraulic Bed', link: '/categories/bedroom/bed/hydraulic-bed' }] }] },
            { id: 'col-6', groups: [{ id: 'grp-14', title: 'Wardrobe', link: '/categories/bedroom/wardrobe', items: [{ id: 'lnk-50', title: '2-Door Wardrobe', link: '/categories/bedroom/wardrobe/2-door-wardrobe' }, { id: 'lnk-51', title: '3-Door Wardrobe', link: '/categories/bedroom/wardrobe/3-door-wardrobe' }, { id: 'lnk-52', title: '4-Door Wardrobe', link: '/categories/bedroom/wardrobe/4-door-wardrobe' }, { id: 'lnk-53', title: 'Sliding Wardrobe', link: '/categories/bedroom/wardrobe/sliding-wardrobe' }, { id: 'lnk-54', title: 'Walk-in Closet', link: '/categories/bedroom/wardrobe/walk-in-closet' }] }, { id: 'grp-15', title: 'Dressing Table', link: '/categories/bedroom/dressing-table', items: [{ id: 'lnk-55', title: 'With Mirror', link: '/categories/bedroom/dressing-table/with-mirror' }, { id: 'lnk-56', title: 'With Storage', link: '/categories/bedroom/dressing-table/with-storage' }] }] },
            { id: 'col-7', groups: [{ id: 'grp-16', title: 'Bedside Table', link: '/categories/bedroom/bedside-table', items: [] }, { id: 'grp-17', title: 'Chest of Drawers', link: '/categories/bedroom/chest-of-drawers', items: [] }, { id: 'grp-18', title: 'Almirah', link: '/categories/bedroom/almirah', items: [] }] },
            { id: 'col-8', groups: [{ id: 'grp-19', title: 'Mattress', link: '/categories/bedroom/mattress', items: [{ id: 'lnk-57', title: 'Orthopedic', link: '/categories/bedroom/mattress/orthopedic' }, { id: 'lnk-58', title: 'Spring', link: '/categories/bedroom/mattress/spring' }, { id: 'lnk-59', title: 'Foam', link: '/categories/bedroom/mattress/foam' }] }, { id: 'grp-20', title: 'Bedroom Chair', link: '/categories/bedroom/chair', items: [] }, { id: 'grp-21', title: 'Pillow', link: '/categories/bedroom/pillow', items: [] }] }
          ]
        },
        {
          id: 'top-3', title: 'Dining', link: '/categories/dining', visibility: true, isMegaMenu: true, promoBanner: { imageUrl: '', link: '', altText: '' },
          columns: [
            { id: 'col-9', groups: [{ id: 'grp-22', title: 'Dining Table', link: '/categories/dining/dining-table', items: [{ id: 'lnk-60', title: 'Wooden Table', link: '/categories/dining/dining-table/wooden-table' }, { id: 'lnk-61', title: 'Glass Top', link: '/categories/dining/dining-table/glass-top' }, { id: 'lnk-62', title: 'Marble Top', link: '/categories/dining/dining-table/marble-top' }, { id: 'lnk-63', title: '4-Seater', link: '/categories/dining/dining-table/4-seater' }, { id: 'lnk-64', title: '6-Seater', link: '/categories/dining/dining-table/6-seater' }, { id: 'lnk-65', title: '8-Seater', link: '/categories/dining/dining-table/8-seater' }, { id: 'lnk-66', title: 'Extendable', link: '/categories/dining/dining-table/extendable' }] }] },
            { id: 'col-10', groups: [{ id: 'grp-23', title: 'Dining Chair', link: '/categories/dining/dining-chair', items: [{ id: 'lnk-67', title: 'Wooden Chair', link: '/categories/dining/dining-chair/wooden-chair' }, { id: 'lnk-68', title: 'Upholstered', link: '/categories/dining/dining-chair/upholstered' }, { id: 'lnk-69', title: 'Arm Chair', link: '/categories/dining/dining-chair/arm-chair' }] }] },
            { id: 'col-11', groups: [{ id: 'grp-24', title: 'Dinner Wagon', link: '/categories/dining/dinner-wagon', items: [{ id: 'lnk-70', title: 'Showcase', link: '/categories/dining/dinner-wagon/showcase' }, { id: 'lnk-71', title: 'Sideboard', link: '/categories/dining/dinner-wagon/sideboard' }, { id: 'lnk-72', title: 'Buffet Table', link: '/categories/dining/dinner-wagon/buffet-table' }] }, { id: 'grp-25', title: 'Tea Cart', link: '/categories/dining/tea-cart', items: [] }] },
            { id: 'col-12', groups: [{ id: 'grp-26', title: 'Cupboard', link: '/categories/dining/cupboard', items: [] }, { id: 'grp-27', title: 'Bar Cabinet', link: '/categories/dining/bar-cabinet', items: [] }, { id: 'grp-28', title: 'Dining Bench', link: '/categories/dining/dining-bench', items: [] }] }
          ]
        },
        {
          id: 'top-4', title: 'Kitchen', link: '/categories/kitchen', visibility: true, isMegaMenu: true, promoBanner: { imageUrl: '', link: '', altText: '' },
          columns: [
            { id: 'col-13', groups: [{ id: 'grp-29', title: 'Kitchen Cabinet', link: '/categories/kitchen/kitchen-cabinet', items: [{ id: 'lnk-73', title: 'Wall Cabinet', link: '/categories/kitchen/kitchen-cabinet/wall-cabinet' }, { id: 'lnk-74', title: 'Base Cabinet', link: '/categories/kitchen/kitchen-cabinet/base-cabinet' }, { id: 'lnk-75', title: 'Tall Unit', link: '/categories/kitchen/kitchen-cabinet/tall-unit' }] }] },
            { id: 'col-14', groups: [{ id: 'grp-30', title: 'Kitchen Island', link: '/categories/kitchen/kitchen-island', items: [] }, { id: 'grp-31', title: 'Kitchen Rack', link: '/categories/kitchen/kitchen-rack', items: [] }] },
            { id: 'col-15', groups: [{ id: 'grp-32', title: 'Pantry Unit', link: '/categories/kitchen/pantry-unit', items: [] }, { id: 'grp-33', title: 'Trolley', link: '/categories/kitchen/trolley', items: [] }] },
            { id: 'col-16', groups: [{ id: 'grp-34', title: 'Kitchen Accessories', link: '/categories/kitchen/accessories', items: [] }] }
          ]
        },
        {
          id: 'top-5', title: "Kid's Room", link: '/categories/kids-room', visibility: true, isMegaMenu: true, promoBanner: { imageUrl: '', link: '', altText: '' },
          columns: [
            { id: 'col-17', groups: [{ id: 'grp-35', title: "Kid's Bed", link: '/categories/kids-room/bed', items: [{ id: 'lnk-76', title: 'Bunk Bed', link: '/categories/kids-room/bed/bunk-bed' }, { id: 'lnk-77', title: 'Single Bed', link: '/categories/kids-room/bed/single-bed' }, { id: 'lnk-78', title: 'Trundle Bed', link: '/categories/kids-room/bed/trundle-bed' }, { id: 'lnk-79', title: 'Car Bed', link: '/categories/kids-room/bed/car-bed' }] }] },
            { id: 'col-18', groups: [{ id: 'grp-36', title: 'Study Table', link: '/categories/kids-room/study-table', items: [{ id: 'lnk-80', title: 'Adjustable', link: '/categories/kids-room/study-table/adjustable' }, { id: 'lnk-81', title: 'With Bookshelf', link: '/categories/kids-room/study-table/with-bookshelf' }] }, { id: 'grp-37', title: "Kid's Chair", link: '/categories/kids-room/chair', items: [] }] },
            { id: 'col-19', groups: [{ id: 'grp-38', title: "Kid's Wardrobe", link: '/categories/kids-room/wardrobe', items: [] }, { id: 'grp-39', title: 'Toy Storage', link: '/categories/kids-room/toy-storage', items: [] }] },
            { id: 'col-20', groups: [{ id: 'grp-40', title: 'Cribs', link: '/categories/kids-room/cribs', items: [] }, { id: 'grp-41', title: 'Play Mat', link: '/categories/kids-room/play-mat', items: [] }] }
          ]
        },
        {
          id: 'top-6', title: 'SmartFit', link: '/categories/smartfit', visibility: true, isMegaMenu: true, promoBanner: { imageUrl: '', link: '', altText: '' },
          columns: [
            { id: 'col-21', groups: [{ id: 'grp-42', title: 'Sofa-Cum-Bed', link: '/categories/smartfit/sofa-cum-bed', items: [] }] },
            { id: 'col-22', groups: [{ id: 'grp-43', title: 'Wall Bed', link: '/categories/smartfit/wall-bed', items: [] }] },
            { id: 'col-23', groups: [{ id: 'grp-44', title: 'Folding Table', link: '/categories/smartfit/folding-table', items: [] }] },
            { id: 'col-24', groups: [{ id: 'grp-45', title: 'Nested Table', link: '/categories/smartfit/nested-table', items: [] }, { id: 'grp-46', title: 'Multipurpose Cabinet', link: '/categories/smartfit/multipurpose-cabinet', items: [] }] }
          ]
        },
        {
          id: 'top-7', title: 'Institutional', link: '/categories/institutional', visibility: true, isMegaMenu: true, promoBanner: { imageUrl: '', link: '', altText: '' },
          columns: [
            { id: 'col-25', groups: [{ id: 'grp-47', title: 'Auditorium Chair', link: '/categories/institutional/auditorium-chair', items: [] }, { id: 'grp-48', title: 'Waiting Chair', link: '/categories/institutional/waiting-chair', items: [] }] },
            { id: 'col-26', groups: [{ id: 'grp-49', title: 'Hospital Bed', link: '/categories/institutional/hospital-bed', items: [] }, { id: 'grp-50', title: 'Patient Cabinet', link: '/categories/institutional/patient-cabinet', items: [] }] },
            { id: 'col-27', groups: [{ id: 'grp-51', title: 'School Desk', link: '/categories/institutional/school-desk', items: [] }, { id: 'grp-52', title: "Teacher's Desk", link: '/categories/institutional/teachers-desk', items: [] }] },
            { id: 'col-28', groups: [{ id: 'grp-53', title: 'Conference Table', link: '/categories/institutional/conference-table', items: [] }, { id: 'grp-54', title: 'Podium', link: '/categories/institutional/podium', items: [] }] }
          ]
        },
        {
          id: 'top-8', title: 'Door', link: '/categories/door', visibility: true, isMegaMenu: true, promoBanner: { imageUrl: '', link: '', altText: '' },
          columns: [
            { id: 'col-29', groups: [{ id: 'grp-55', title: 'Solid Wooden Door', link: '/categories/door/solid-wooden-door', items: [] }, { id: 'grp-56', title: 'Flush Door', link: '/categories/door/flush-door', items: [] }] },
            { id: 'col-30', groups: [{ id: 'grp-57', title: 'Veneer Door', link: '/categories/door/veneer-door', items: [] }, { id: 'grp-58', title: 'Laminated Door', link: '/categories/door/laminated-door', items: [] }] },
            { id: 'col-31', groups: [{ id: 'grp-59', title: 'Glass Door', link: '/categories/door/glass-door', items: [] }, { id: 'grp-60', title: 'PVC Door', link: '/categories/door/pvc-door', items: [] }] },
            { id: 'col-32', groups: [{ id: 'grp-61', title: 'Door Frame (Chowkath)', link: '/categories/door/door-frame', items: [] }, { id: 'grp-62', title: 'Door Accessories', link: '/categories/door/door-accessories', items: [] }] }
          ]
        },
        {
          id: 'top-9', title: 'Interior', link: '/categories/interior', visibility: true, isMegaMenu: true, promoBanner: { imageUrl: '', link: '', altText: '' },
          columns: [
            { id: 'col-33', groups: [{ id: 'grp-63', title: 'Wall Paneling', link: '/categories/interior/wall-paneling', items: [] }, { id: 'grp-64', title: 'False Ceiling', link: '/categories/interior/false-ceiling', items: [] }] },
            { id: 'col-34', groups: [{ id: 'grp-65', title: 'Window Blinds', link: '/categories/interior/window-blinds', items: [] }, { id: 'grp-66', title: 'Curtains', link: '/categories/interior/curtains', items: [] }] },
            { id: 'col-35', groups: [{ id: 'grp-67', title: 'Wall Wallpaper', link: '/categories/interior/wallpaper', items: [] }, { id: 'grp-68', title: 'Floor Covering', link: '/categories/interior/floor-covering', items: [] }] },
            { id: 'col-36', groups: [{ id: 'grp-69', title: 'Decorative Light', link: '/categories/interior/decorative-light', items: [] }, { id: 'grp-70', title: 'Room Divider', link: '/categories/interior/room-divider', items: [] }] }
          ]
        },
        {
          id: 'top-10', title: 'Office', link: '/categories/office', visibility: true, isMegaMenu: true, promoBanner: { imageUrl: '', link: '', altText: '' },
          columns: [
            { id: 'col-37', groups: [{ id: 'grp-71', title: 'Director Table', link: '/categories/office/director-table', items: [] }, { id: 'grp-72', title: 'Executive Table', link: '/categories/office/executive-table', items: [] }, { id: 'grp-73', title: 'Manager Table', link: '/categories/office/manager-table', items: [] }] },
            { id: 'col-38', groups: [{ id: 'grp-74', title: 'Swivel Chair', link: '/categories/office/swivel-chair', items: [{ id: 'lnk-82', title: 'High Back', link: '/categories/office/swivel-chair/high-back' }, { id: 'lnk-83', title: 'Mid Back', link: '/categories/office/swivel-chair/mid-back' }, { id: 'lnk-84', title: 'Low Back', link: '/categories/office/swivel-chair/low-back' }] }, { id: 'grp-75', title: 'Visitor Chair', link: '/categories/office/visitor-chair', items: [] }, { id: 'grp-76', title: 'Conference Chair', link: '/categories/office/conference-chair', items: [] }] },
            { id: 'col-39', groups: [{ id: 'grp-77', title: 'File Cabinet', link: '/categories/office/file-cabinet', items: [{ id: 'lnk-85', title: 'Wooden', link: '/categories/office/file-cabinet/wooden' }, { id: 'lnk-86', title: 'Metal', link: '/categories/office/file-cabinet/metal' }] }, { id: 'grp-78', title: 'Drawer Mobile', link: '/categories/office/drawer-mobile', items: [] }] },
            { id: 'col-40', groups: [{ id: 'grp-79', title: 'Workstation', link: '/categories/office/workstation', items: [{ id: 'lnk-87', title: '2-Seater', link: '/categories/office/workstation/2-seater' }, { id: 'lnk-88', title: '4-Seater', link: '/categories/office/workstation/4-seater' }, { id: 'lnk-89', title: '6-Seater', link: '/categories/office/workstation/6-seater' }] }, { id: 'grp-80', title: 'Sofa & Lounge', link: '/categories/office/sofa-lounge', items: [] }] }
          ]
        }
      ]
    },
    { id: 'MNU-002', name: 'Footer Links', type: 'Footer', status: 'Active', items: [] },
    { id: 'MNU-003', name: 'Mobile Sidebar', type: 'Mobile', status: 'Active', items: [] }
  ];

  const [menus, setMenus] = useState(() => loadFromStorage('cms_menus', INITIAL_MENUS));

  useEffect(() => {
    localStorage.setItem('cms_menus', JSON.stringify(menus));
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

  const getPage = (id) => pages.find(p => p.id === id);

  const getPageSections = (pageId) => {
    if (pageId === 'PG-001' && !pageSectionsPublished[pageId]) {
       return [
        { id: 'sec-navbar', type: 'NAVBAR', name: 'Navbar', icon: 'FiLayout', category: 'Header Section' },
        { id: 'sec-hero', type: 'HERO_BANNER', name: 'Hero', icon: 'FiImage', category: 'Hero Section' },
        { id: 'sec-features', type: 'FEATURE_GRID', name: 'Feature Grid', icon: 'FiGrid', category: 'Features Section' },
        { id: 'sec-products', type: 'PRODUCT_GRID', name: 'Products', icon: 'FiBox', category: 'Products Section' },
        { id: 'sec-testimonials', type: 'TESTIMONIALS', name: 'Testimonials', icon: 'FiMessageCircle', category: 'Testimonials Section' },
        { id: 'sec-cta', type: 'CTA_BANNER', name: 'Call To Action', icon: 'FiMaximize', category: 'Banner Section' },
        { id: 'sec-footer', type: 'FOOTER', name: 'Footer', icon: 'FiLayout', category: 'Footer Section' }
       ];
    }
    return pageSectionsPublished[pageId] || [];
  };

  const getDraftSections = (pageId) => {
    if (pageId === 'PG-001' && !pageSectionsDraft[pageId]) {
      return getPageSections(pageId);
    }
    return pageSectionsDraft[pageId] || [];
  };

  const saveDraftSections = (pageId, currentSections) => {
    setPageSectionsDraft(prev => ({ ...prev, [pageId]: currentSections }));
  };

  const publishPageSections = (pageId) => {
    const draft = getDraftSections(pageId);
    setPageSectionsPublished(prev => ({ ...prev, [pageId]: draft }));
    setPages(prev => prev.map(p => p.id === pageId ? { ...p, status: 'Published', sections: draft.length, updatedAt: new Date().toISOString().split('T')[0] } : p));
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

  const contextValue = useMemo(() => ({
    pageTypes, setPageTypes,
    pages, setPages, getPage,
    pageSectionsDraft, pageSectionsPublished,
    getPageSections, getDraftSections, saveDraftSections, publishPageSections, createPage, updatePage,
    sections, setSections,
    blocks, setBlocks,
    menus, setMenus,
    banners, setBanners,
    seo, setSeo,
    redirects, setRedirects,
    versions, setVersions
  }), [pageTypes, pages, pageSectionsDraft, pageSectionsPublished, sections, blocks, menus, banners, seo, redirects, versions]);

  return (
    <CMSContext.Provider value={contextValue}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => useContext(CMSContext);
