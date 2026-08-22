export const LIBRARY_SECTIONS = [
  // HERO
  { id: 'lib-hero-banner', type: 'HERO_BANNER', name: 'Hero Banner', category: 'HERO', description: 'Full-width hero with background image and CTA', icon: 'FiImage', defaultContent: { title: 'New Collection', subtitle: 'Discover premium designs', ctaText: 'Shop Now' }, defaultSettings: { padding: 'none', align: 'center' }, image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=400' },
  { id: 'lib-split-hero', type: 'SPLIT_HERO', name: 'Split Hero', category: 'HERO', description: '50/50 split with image and text', icon: 'FiLayout', defaultContent: { title: 'Modern Living', description: 'Elevate your space.' }, defaultSettings: { imageAlign: 'right' } },
  { id: 'lib-promo-hero', type: 'PROMO_HERO', name: 'Promotional Hero', category: 'HERO', description: 'Hero section focused on a major promotion', icon: 'FiStar', defaultContent: { badge: 'Summer Sale', title: 'Up to 50% Off' }, defaultSettings: { colorScheme: 'dark' } },
  
  // PRODUCTS
  { id: 'lib-feat-prod', type: 'FEATURED_PRODUCTS', name: 'Featured Products', category: 'PRODUCTS', description: 'Highlight specific products', icon: 'FiBox', defaultContent: { title: 'Featured' }, defaultSettings: { columns: 4 } },
  { id: 'lib-prod-grid', type: 'PRODUCT_GRID', name: 'Product Grid', category: 'PRODUCTS', description: 'A standard grid of products', icon: 'FiGrid', defaultContent: { title: 'Shop the Look' }, defaultSettings: { rows: 2, columns: 4 }, image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=400' },
  { id: 'lib-prod-car', type: 'PRODUCT_CAROUSEL', name: 'Product Carousel', category: 'PRODUCTS', description: 'Horizontal scrollable product list', icon: 'FiLayout', defaultContent: { title: 'More Like This' }, defaultSettings: { autoplay: false } },
  { id: 'lib-new-arr', type: 'NEW_ARRIVALS', name: 'New Arrivals', category: 'PRODUCTS', description: 'Automatically display newest inventory', icon: 'FiStar', defaultContent: { title: 'Just Landed' }, defaultSettings: { limit: 8 } },
  { id: 'lib-best-sell', type: 'BEST_SELLERS', name: 'Best Sellers', category: 'PRODUCTS', description: 'Top performing products', icon: 'FiTrendingUp', defaultContent: { title: 'Trending Now' }, defaultSettings: { limit: 4 } },

  // CATEGORIES
  { id: 'lib-feat-cat', type: 'FEATURED_CATEGORIES', name: 'Featured Categories', category: 'CATEGORIES', description: 'Highlight top categories', icon: 'FiBox', defaultContent: { title: 'Shop by Room' }, defaultSettings: { layout: 'masonry' } },
  { id: 'lib-cat-grid', type: 'CATEGORY_GRID', name: 'Category Grid', category: 'CATEGORIES', description: 'Equal-sized category cards', icon: 'FiGrid', defaultContent: { title: 'Categories' }, defaultSettings: { columns: 3 }, image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=400' },
  { id: 'lib-cat-car', type: 'CATEGORY_CAROUSEL', name: 'Category Carousel', category: 'CATEGORIES', description: 'Scrollable categories', icon: 'FiLayout', defaultContent: { title: 'Explore' }, defaultSettings: { autoplay: false } },

  // MARKETING
  { id: 'lib-promo-ban', type: 'PROMO_BANNER', name: 'Promotional Banner', category: 'MARKETING', description: 'Full-width promotional message', icon: 'FiFlag', defaultContent: { text: 'Free Shipping on orders over $500' }, defaultSettings: { color: 'brand' } },
  { id: 'lib-off-ban', type: 'OFFER_BANNER', name: 'Offer Banner', category: 'MARKETING', description: 'Specific offer with terms', icon: 'FiTag', defaultContent: { title: '20% Off Sofas' }, defaultSettings: { size: 'small' } },
  { id: 'lib-flash-sale', type: 'FLASH_SALE', name: 'Flash Sale', category: 'MARKETING', description: 'High-urgency sale section', icon: 'FiZap', defaultContent: { title: 'Midnight Sale' }, defaultSettings: { theme: 'dark' } },
  { id: 'lib-countdown', type: 'COUNTDOWN', name: 'Countdown', category: 'MARKETING', description: 'Live countdown timer', icon: 'FiClock', defaultContent: { label: 'Sale ends in:' }, defaultSettings: { align: 'center' } },
  { id: 'lib-cta-ban', type: 'CTA_BANNER', name: 'CTA Banner', category: 'MARKETING', description: 'Strong call to action', icon: 'FiMousePointer', defaultContent: { title: 'Ready to transform your home?', button: 'Get Started' }, defaultSettings: { padding: 'large' } },

  // CONTENT
  { id: 'lib-rich-txt', type: 'RICH_TEXT', name: 'Rich Text', category: 'CONTENT', description: 'Formatted text block', icon: 'FiType', defaultContent: { text: 'Enter your content here...' }, defaultSettings: { maxWidth: 'md' } },
  { id: 'lib-img-txt', type: 'IMAGE_TEXT', name: 'Image + Text', category: 'CONTENT', description: 'Image on left, text on right', icon: 'FiLayout', defaultContent: { title: 'Our Heritage' }, defaultSettings: { reverse: false } },
  { id: 'lib-txt-img', type: 'TEXT_IMAGE', name: 'Text + Image', category: 'CONTENT', description: 'Text on left, image on right', icon: 'FiLayout', defaultContent: { title: 'Craftsmanship' }, defaultSettings: { reverse: true } },
  { id: 'lib-brand-log', type: 'BRAND_LOGOS', name: 'Brand Logos', category: 'CONTENT', description: 'Grid of partner or brand logos', icon: 'FiAward', defaultContent: { title: 'Our Partners' }, defaultSettings: { grayscale: true } },
  { id: 'lib-stats', type: 'STATISTICS', name: 'Statistics', category: 'CONTENT', description: 'Number counters and stats', icon: 'FiBarChart2', defaultContent: { title: 'Our Impact' }, defaultSettings: { columns: 3 } },

  // SOCIAL PROOF
  { id: 'lib-testim', type: 'TESTIMONIALS', name: 'Testimonials', category: 'SOCIAL PROOF', description: 'Selected customer quotes', icon: 'FiMessageSquare', defaultContent: { title: 'What our clients say' }, defaultSettings: { layout: 'carousel' } },
  { id: 'lib-cust-rev', type: 'CUSTOMER_REVIEWS', name: 'Customer Reviews', category: 'SOCIAL PROOF', description: 'Aggregated product reviews', icon: 'FiStar', defaultContent: { title: 'Recent Reviews' }, defaultSettings: { limit: 6 } },
  { id: 'lib-trust-bad', type: 'TRUST_BADGES', name: 'Trust Badges', category: 'SOCIAL PROOF', description: 'Security and guarantee badges', icon: 'FiShield', defaultContent: { title: 'Shop with Confidence' }, defaultSettings: { size: 'small' } },

  // MEDIA
  { id: 'lib-img-gal', type: 'IMAGE_GALLERY', name: 'Image Gallery', category: 'MEDIA', description: 'Grid or masonry image gallery', icon: 'FiImage', defaultContent: { title: 'Inspiration' }, defaultSettings: { layout: 'grid' } },
  { id: 'lib-video-sec', type: 'VIDEO_SECTION', name: 'Video Section', category: 'MEDIA', description: 'Embedded video player', icon: 'FiVideo', defaultContent: { title: 'Behind the Scenes' }, defaultSettings: { autoplay: false } },

  // ENGAGEMENT
  { id: 'lib-news', type: 'NEWSLETTER', name: 'Newsletter', category: 'ENGAGEMENT', description: 'Email capture form', icon: 'FiMail', defaultContent: { title: 'Join our list', subtitle: 'Get 10% off your first order' }, defaultSettings: { align: 'center' } },
  { id: 'lib-faq', type: 'FAQ', name: 'FAQ', category: 'ENGAGEMENT', description: 'Accordion of questions and answers', icon: 'FiHelpCircle', defaultContent: { title: 'Frequently Asked Questions' }, defaultSettings: { expanded: false } },
  { id: 'lib-cont-cta', type: 'CONTACT_CTA', name: 'Contact CTA', category: 'ENGAGEMENT', description: 'Call to action for customer support', icon: 'FiPhone', defaultContent: { title: 'Need Help?', button: 'Contact Us' }, defaultSettings: { theme: 'light' } },

  // BACKWARD COMPATIBILITY
  { 
    id: 'lib-creations',
    type: 'CREATIONS_SHOWCASE', 
    name: 'Creations with Purpose Grid', 
    category: 'CATEGORIES', 
    description: 'Showcase feature grid',
    icon: 'FiGrid',
    defaultContent: {
      title: "Creations with purpose",
      subtitle: "Many choices based on your space",
      ctaText: "Explore Now",
      ctaUrl: "/shop",
      items: [
        { id: "1", imageUrl: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=800", title: "Bedroom", link: "/category/bedroom" }
      ]
    },
    defaultSettings: {},
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=400'
  }
];

export const GLOBAL_BLOCKS = [
  { id: 'gb-summer-promo', type: 'PROMO_BANNER', name: 'Summer Sale Promo Banner', category: 'Banners', description: 'Global summer promo', icon: 'FiFlag', defaultContent: {}, defaultSettings: {}, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=400' },
  { id: 'gb-footer-std', type: 'FOOTER', name: 'Standard Footer - 2024', category: 'Footers', description: 'Global footer', icon: 'FiLayout', defaultContent: {}, defaultSettings: {} },
];
