export const FIELD_TYPES = {
  TEXT: 'text',
  TEXTAREA: 'textarea',
  IMAGE: 'image',
  TOGGLE: 'toggle',
  SELECT: 'select',
  NUMBER: 'number',
  URL: 'url',
  GALLERY: 'gallery'
};

const COMMON_LAYOUT = [
  { name: 'paddingTop', label: 'Padding Top', type: FIELD_TYPES.SELECT, options: ['none', 'small', 'medium', 'large', 'xlarge'], defaultValue: 'medium' },
  { name: 'paddingBottom', label: 'Padding Bottom', type: FIELD_TYPES.SELECT, options: ['none', 'small', 'medium', 'large', 'xlarge'], defaultValue: 'medium' },
  { name: 'fullWidth', label: 'Full Width Container', type: FIELD_TYPES.TOGGLE, defaultValue: false }
];

const COMMON_APPEARANCE = [
  { name: 'backgroundColor', label: 'Background Color', type: FIELD_TYPES.TEXT, defaultValue: 'transparent' },
  { name: 'colorScheme', label: 'Color Scheme', type: FIELD_TYPES.SELECT, options: ['light', 'dark', 'brand'], defaultValue: 'light' }
];

const COMMON_VISIBILITY = [
  { name: 'visibleDesktop', label: 'Visible on Desktop', type: FIELD_TYPES.TOGGLE, defaultValue: true },
  { name: 'visibleTablet', label: 'Visible on Tablet', type: FIELD_TYPES.TOGGLE, defaultValue: true },
  { name: 'visibleMobile', label: 'Visible on Mobile', type: FIELD_TYPES.TOGGLE, defaultValue: true }
];

const COMMON_RESPONSIVE = [
  { name: 'visible', label: 'Visible on this device', type: FIELD_TYPES.TOGGLE, defaultValue: true },
  { name: 'paddingTop', label: 'Padding Top', type: FIELD_TYPES.SELECT, options: ['none', 'small', 'medium', 'large', 'xlarge'], defaultValue: undefined },
  { name: 'paddingBottom', label: 'Padding Bottom', type: FIELD_TYPES.SELECT, options: ['none', 'small', 'medium', 'large', 'xlarge'], defaultValue: undefined }
];

export const SECTION_SCHEMAS = {
  // NAVIGATION
  NAVBAR: {
    content: [
      { name: 'showSearch', label: 'Search Icon', type: FIELD_TYPES.TOGGLE, defaultValue: true },
      { name: 'showUser', label: 'User Account', type: FIELD_TYPES.TOGGLE, defaultValue: true },
      { name: 'showCart', label: 'Shopping Cart', type: FIELD_TYPES.TOGGLE, defaultValue: true }
    ],
    settings: [
      { name: 'stickyOnScroll', label: 'Sticky on Scroll', type: FIELD_TYPES.TOGGLE, defaultValue: true },
      { name: 'transparentOnTop', label: 'Transparent on Top', type: FIELD_TYPES.TOGGLE, defaultValue: false },
      ...COMMON_LAYOUT,
      ...COMMON_VISIBILITY
    ],
    responsive: [
      ...COMMON_RESPONSIVE
    ]
  },

  // HERO CATEGORY
  HERO_BANNER: {
    content: [
      { name: 'title', label: 'Heading', type: FIELD_TYPES.TEXT, defaultValue: 'Hero Heading' },
      { name: 'subtitle', label: 'Subtitle', type: FIELD_TYPES.TEXTAREA, defaultValue: 'Hero Subtitle text goes here.' },
      { name: 'ctaText', label: 'Primary Button Text', type: FIELD_TYPES.TEXT, defaultValue: 'Shop Now' },
      { name: 'ctaUrl', label: 'Primary Button Link', type: FIELD_TYPES.URL, defaultValue: '/shop' },
      { name: 'secondaryCtaText', label: 'Secondary Button Text', type: FIELD_TYPES.TEXT, defaultValue: '' },
      { name: 'secondaryCtaUrl', label: 'Secondary Button Link', type: FIELD_TYPES.URL, defaultValue: '' },
      { name: 'slides', label: 'Image Items', type: FIELD_TYPES.GALLERY, defaultValue: [] }
    ],
    settings: [
      { name: 'align', label: 'Alignment', type: FIELD_TYPES.SELECT, options: ['left', 'center', 'right'], defaultValue: 'center' },
      { name: 'height', label: 'Height', type: FIELD_TYPES.SELECT, options: ['small', 'medium', 'large', 'full'], defaultValue: 'large' },
      { name: 'overlay', label: 'Enable Overlay', type: FIELD_TYPES.TOGGLE, defaultValue: true },
      { name: 'overlayOpacity', label: 'Overlay Opacity', type: FIELD_TYPES.SELECT, options: ['0.1', '0.2', '0.5', '0.8'], defaultValue: '0.2' },
      ...COMMON_LAYOUT,
      ...COMMON_VISIBILITY
    ],
    responsive: [
      ...COMMON_RESPONSIVE,
      { name: 'headingSize', label: 'Heading Size', type: FIELD_TYPES.SELECT, options: ['small', 'medium', 'large', 'xlarge'], defaultValue: undefined },
      { name: 'height', label: 'Height', type: FIELD_TYPES.SELECT, options: ['small', 'medium', 'large', 'full'], defaultValue: undefined }
    ]
  },
  SPLIT_HERO: {
    content: [
      { name: 'title', label: 'Heading', type: FIELD_TYPES.TEXT, defaultValue: 'Modern Living' },
      { name: 'description', label: 'Description', type: FIELD_TYPES.TEXTAREA, defaultValue: 'Elevate your space.' },
      { name: 'ctaText', label: 'Button Text', type: FIELD_TYPES.TEXT, defaultValue: 'Explore' },
      { name: 'ctaUrl', label: 'Button Link', type: FIELD_TYPES.URL, defaultValue: '/shop' },
      { name: 'slides', label: 'Image Items', type: FIELD_TYPES.GALLERY, defaultValue: [] }
    ],
    settings: [
      { name: 'imageAlign', label: 'Image Alignment', type: FIELD_TYPES.SELECT, options: ['left', 'right'], defaultValue: 'right' },
      ...COMMON_LAYOUT,
      ...COMMON_VISIBILITY
    ],
    responsive: [
      ...COMMON_RESPONSIVE,
      { name: 'headingSize', label: 'Heading Size', type: FIELD_TYPES.SELECT, options: ['small', 'medium', 'large', 'xlarge'], defaultValue: undefined }
    ]
  },
  PROMO_HERO: {
    content: [
      { name: 'badge', label: 'Badge Text', type: FIELD_TYPES.TEXT, defaultValue: 'Sale' },
      { name: 'title', label: 'Heading', type: FIELD_TYPES.TEXT, defaultValue: 'Up to 50% Off' },
      { name: 'subtitle', label: 'Subtitle', type: FIELD_TYPES.TEXTAREA, defaultValue: 'Limited time only.' },
      { name: 'ctaText', label: 'Button Text', type: FIELD_TYPES.TEXT, defaultValue: 'Shop Sale' },
      { name: 'ctaUrl', label: 'Button Link', type: FIELD_TYPES.URL, defaultValue: '/sale' },
      { name: 'slides', label: 'Image Items', type: FIELD_TYPES.GALLERY, defaultValue: [] }
    ],
    settings: [
      ...COMMON_APPEARANCE,
      ...COMMON_LAYOUT,
      ...COMMON_VISIBILITY
    ],
    responsive: [
      ...COMMON_RESPONSIVE,
      { name: 'headingSize', label: 'Heading Size', type: FIELD_TYPES.SELECT, options: ['small', 'medium', 'large', 'xlarge'], defaultValue: undefined }
    ]
  },

  // PRODUCTS CATEGORY
  PRODUCT_GRID: {
    content: [
      { name: 'title', label: 'Section Title', type: FIELD_TYPES.TEXT, defaultValue: 'Shop the Look' },
      { name: 'subtitle', label: 'Subtitle', type: FIELD_TYPES.TEXTAREA, defaultValue: 'Curated selection just for you.' },
      { name: 'productSource', label: 'Product Source', type: FIELD_TYPES.SELECT, options: ['manual', 'category', 'latest'], defaultValue: 'latest' }
    ],
    settings: [
      { name: 'columns', label: 'Columns', type: FIELD_TYPES.SELECT, options: ['2', '3', '4', '5'], defaultValue: '4' },
      { name: 'rows', label: 'Rows', type: FIELD_TYPES.SELECT, options: ['1', '2', '3', '4'], defaultValue: '2' },
      { name: 'cardStyle', label: 'Card Style', type: FIELD_TYPES.SELECT, options: ['standard', 'minimal', 'bordered'], defaultValue: 'standard' },
      ...COMMON_LAYOUT,
      ...COMMON_VISIBILITY
    ],
    responsive: [
      ...COMMON_RESPONSIVE,
      { name: 'columns', label: 'Columns', type: FIELD_TYPES.SELECT, options: ['1', '2', '3', '4', '5'], defaultValue: undefined }
    ]
  },
  PRODUCT_CAROUSEL: {
    content: [
      { name: 'title', label: 'Section Title', type: FIELD_TYPES.TEXT, defaultValue: 'Featured Products' },
      { name: 'subtitle', label: 'Subtitle', type: FIELD_TYPES.TEXT, defaultValue: '' },
      { name: 'linkTo', label: 'View All Link', type: FIELD_TYPES.URL, defaultValue: '/products' }
    ],
    settings: [
      { name: 'autoplay', label: 'Autoplay', type: FIELD_TYPES.TOGGLE, defaultValue: false },
      ...COMMON_LAYOUT,
      ...COMMON_VISIBILITY
    ],
    responsive: [
      ...COMMON_RESPONSIVE
    ]
  },
  FEATURED_PRODUCTS: {
    content: [
      { name: 'title', label: 'Section Title', type: FIELD_TYPES.TEXT, defaultValue: 'Featured' }
    ],
    settings: [
      { name: 'columns', label: 'Columns', type: FIELD_TYPES.SELECT, options: ['2', '3', '4'], defaultValue: '4' },
      ...COMMON_LAYOUT,
      ...COMMON_VISIBILITY
    ],
    responsive: [
      ...COMMON_RESPONSIVE,
      { name: 'columns', label: 'Columns', type: FIELD_TYPES.SELECT, options: ['1', '2', '3', '4'], defaultValue: undefined }
    ]
  },
  NEW_ARRIVALS: {
    content: [
      { name: 'title', label: 'Section Title', type: FIELD_TYPES.TEXT, defaultValue: 'Just Landed' }
    ],
    settings: [
      { name: 'limit', label: 'Product Limit', type: FIELD_TYPES.NUMBER, defaultValue: 8 },
      ...COMMON_LAYOUT,
      ...COMMON_VISIBILITY
    ],
    responsive: [
      ...COMMON_RESPONSIVE
    ]
  },
  BEST_SELLERS: {
    content: [
      { name: 'title', label: 'Section Title', type: FIELD_TYPES.TEXT, defaultValue: 'Trending Now' }
    ],
    settings: [
      { name: 'limit', label: 'Product Limit', type: FIELD_TYPES.NUMBER, defaultValue: 4 },
      ...COMMON_LAYOUT,
      ...COMMON_VISIBILITY
    ],
    responsive: [
      ...COMMON_RESPONSIVE
    ]
  },

  // CATEGORIES CATEGORY
  CATEGORY_GRID: {
    content: [
      { name: 'title', label: 'Section Title', type: FIELD_TYPES.TEXT, defaultValue: 'Categories' }
    ],
    settings: [
      { name: 'columns', label: 'Columns', type: FIELD_TYPES.SELECT, options: ['2', '3', '4'], defaultValue: '3' },
      { name: 'imageRatio', label: 'Image Ratio', type: FIELD_TYPES.SELECT, options: ['square', 'portrait', 'landscape'], defaultValue: 'square' },
      ...COMMON_LAYOUT,
      ...COMMON_VISIBILITY
    ],
    responsive: [
      ...COMMON_RESPONSIVE,
      { name: 'columns', label: 'Columns', type: FIELD_TYPES.SELECT, options: ['1', '2', '3', '4'], defaultValue: undefined }
    ]
  },
  FEATURED_CATEGORIES: {
    content: [
      { name: 'title', label: 'Section Title', type: FIELD_TYPES.TEXT, defaultValue: 'Shop by Room' }
    ],
    settings: [
      { name: 'layout', label: 'Layout Style', type: FIELD_TYPES.SELECT, options: ['masonry', 'grid'], defaultValue: 'masonry' },
      ...COMMON_LAYOUT,
      ...COMMON_VISIBILITY
    ],
    responsive: [
      ...COMMON_RESPONSIVE
    ]
  },
  CATEGORY_CAROUSEL: {
    content: [
      { name: 'title', label: 'Section Title', type: FIELD_TYPES.TEXT, defaultValue: 'Explore' }
    ],
    settings: [
      { name: 'autoplay', label: 'Autoplay', type: FIELD_TYPES.TOGGLE, defaultValue: false },
      ...COMMON_LAYOUT,
      ...COMMON_VISIBILITY
    ],
    responsive: [
      ...COMMON_RESPONSIVE
    ]
  },

  // MARKETING CATEGORY
  PROMO_BANNER: {
    content: [
      { name: 'text', label: 'Banner Text', type: FIELD_TYPES.TEXT, defaultValue: 'Free Shipping on orders over $500' },
      { name: 'link', label: 'Link', type: FIELD_TYPES.URL, defaultValue: '' }
    ],
    settings: [
      ...COMMON_APPEARANCE,
      ...COMMON_LAYOUT,
      ...COMMON_VISIBILITY
    ],
    responsive: [
      ...COMMON_RESPONSIVE,
      { name: 'headingSize', label: 'Text Size', type: FIELD_TYPES.SELECT, options: ['small', 'medium', 'large'], defaultValue: undefined }
    ]
  },
  OFFER_BANNER: {
    content: [
      { name: 'title', label: 'Offer Title', type: FIELD_TYPES.TEXT, defaultValue: '20% Off Sofas' },
      { name: 'description', label: 'Description', type: FIELD_TYPES.TEXT, defaultValue: 'Use code SOFA20' }
    ],
    settings: [
      { name: 'size', label: 'Size', type: FIELD_TYPES.SELECT, options: ['small', 'medium', 'large'], defaultValue: 'small' },
      ...COMMON_LAYOUT,
      ...COMMON_VISIBILITY
    ],
    responsive: [
      ...COMMON_RESPONSIVE,
      { name: 'headingSize', label: 'Text Size', type: FIELD_TYPES.SELECT, options: ['small', 'medium', 'large'], defaultValue: undefined }
    ]
  },
  FLASH_SALE: {
    content: [
      { name: 'title', label: 'Flash Sale Title', type: FIELD_TYPES.TEXT, defaultValue: 'Midnight Sale' }
    ],
    settings: [
      { name: 'theme', label: 'Theme', type: FIELD_TYPES.SELECT, options: ['light', 'dark'], defaultValue: 'dark' },
      ...COMMON_LAYOUT,
      ...COMMON_VISIBILITY
    ],
    responsive: [
      ...COMMON_RESPONSIVE
    ]
  },
  COUNTDOWN: {
    content: [
      { name: 'label', label: 'Countdown Label', type: FIELD_TYPES.TEXT, defaultValue: 'Sale ends in:' },
      { name: 'targetDate', label: 'Target Date', type: FIELD_TYPES.TEXT, defaultValue: '2025-12-31' }
    ],
    settings: [
      { name: 'align', label: 'Alignment', type: FIELD_TYPES.SELECT, options: ['left', 'center', 'right'], defaultValue: 'center' },
      ...COMMON_LAYOUT,
      ...COMMON_VISIBILITY
    ],
    responsive: [
      ...COMMON_RESPONSIVE,
      { name: 'align', label: 'Alignment', type: FIELD_TYPES.SELECT, options: ['left', 'center', 'right'], defaultValue: undefined }
    ]
  },
  CTA_BANNER: {
    content: [
      { name: 'title', label: 'Heading', type: FIELD_TYPES.TEXT, defaultValue: 'Ready to transform your home?' },
      { name: 'button', label: 'Button Text', type: FIELD_TYPES.TEXT, defaultValue: 'Get Started' },
      { name: 'buttonLink', label: 'Button Link', type: FIELD_TYPES.URL, defaultValue: '/contact' }
    ],
    settings: [
      ...COMMON_LAYOUT,
      ...COMMON_VISIBILITY
    ],
    responsive: [
      ...COMMON_RESPONSIVE,
      { name: 'headingSize', label: 'Heading Size', type: FIELD_TYPES.SELECT, options: ['small', 'medium', 'large'], defaultValue: undefined }
    ]
  },

  // CONTENT CATEGORY
  RICH_TEXT: {
    content: [
      { name: 'title', label: 'Heading', type: FIELD_TYPES.TEXT, defaultValue: '' },
      { name: 'text', label: 'Body Content', type: FIELD_TYPES.TEXTAREA, defaultValue: 'Enter your content here...' }
    ],
    settings: [
      { name: 'align', label: 'Text Alignment', type: FIELD_TYPES.SELECT, options: ['left', 'center', 'right'], defaultValue: 'left' },
      { name: 'maxWidth', label: 'Max Width', type: FIELD_TYPES.SELECT, options: ['sm', 'md', 'lg', 'full'], defaultValue: 'md' },
      ...COMMON_LAYOUT,
      ...COMMON_VISIBILITY
    ],
    responsive: [
      ...COMMON_RESPONSIVE,
      { name: 'headingSize', label: 'Heading Size', type: FIELD_TYPES.SELECT, options: ['small', 'medium', 'large'], defaultValue: undefined },
      { name: 'align', label: 'Text Alignment', type: FIELD_TYPES.SELECT, options: ['left', 'center', 'right'], defaultValue: undefined }
    ]
  },
  IMAGE_TEXT: {
    content: [
      { name: 'title', label: 'Heading', type: FIELD_TYPES.TEXT, defaultValue: 'Our Heritage' },
      { name: 'description', label: 'Description', type: FIELD_TYPES.TEXTAREA, defaultValue: 'A story of craftsmanship.' },
      { name: 'image', label: 'Image', type: FIELD_TYPES.IMAGE, defaultValue: '' },
      { name: 'ctaText', label: 'Button Text', type: FIELD_TYPES.TEXT, defaultValue: 'Read More' },
      { name: 'ctaUrl', label: 'Button Link', type: FIELD_TYPES.URL, defaultValue: '/about' }
    ],
    settings: [
      { name: 'reverse', label: 'Reverse Layout (Image Right)', type: FIELD_TYPES.TOGGLE, defaultValue: false },
      ...COMMON_LAYOUT,
      ...COMMON_VISIBILITY
    ],
    responsive: [
      ...COMMON_RESPONSIVE,
      { name: 'headingSize', label: 'Heading Size', type: FIELD_TYPES.SELECT, options: ['small', 'medium', 'large'], defaultValue: undefined }
    ]
  },
  TEXT_IMAGE: {
    content: [
      { name: 'title', label: 'Heading', type: FIELD_TYPES.TEXT, defaultValue: 'Craftsmanship' },
      { name: 'description', label: 'Description', type: FIELD_TYPES.TEXTAREA, defaultValue: 'Detail oriented design.' },
      { name: 'image', label: 'Image', type: FIELD_TYPES.IMAGE, defaultValue: '' }
    ],
    settings: [
      { name: 'reverse', label: 'Reverse Layout (Text Right)', type: FIELD_TYPES.TOGGLE, defaultValue: true },
      ...COMMON_LAYOUT,
      ...COMMON_VISIBILITY
    ],
    responsive: [
      ...COMMON_RESPONSIVE,
      { name: 'headingSize', label: 'Heading Size', type: FIELD_TYPES.SELECT, options: ['small', 'medium', 'large'], defaultValue: undefined }
    ]
  },
  BRAND_LOGOS: {
    content: [
      { name: 'title', label: 'Section Title', type: FIELD_TYPES.TEXT, defaultValue: 'Our Partners' }
    ],
    settings: [
      { name: 'grayscale', label: 'Grayscale Logos', type: FIELD_TYPES.TOGGLE, defaultValue: true },
      ...COMMON_LAYOUT,
      ...COMMON_VISIBILITY
    ],
    responsive: [
      ...COMMON_RESPONSIVE,
      { name: 'columns', label: 'Columns', type: FIELD_TYPES.SELECT, options: ['2', '3', '4', '5', '6'], defaultValue: undefined }
    ]
  },
  STATISTICS: {
    content: [
      { name: 'title', label: 'Section Title', type: FIELD_TYPES.TEXT, defaultValue: 'Our Impact' }
    ],
    settings: [
      { name: 'columns', label: 'Columns', type: FIELD_TYPES.SELECT, options: ['2', '3', '4'], defaultValue: '3' },
      ...COMMON_LAYOUT,
      ...COMMON_VISIBILITY
    ],
    responsive: [
      ...COMMON_RESPONSIVE,
      { name: 'columns', label: 'Columns', type: FIELD_TYPES.SELECT, options: ['1', '2', '3', '4'], defaultValue: undefined }
    ]
  },

  // SOCIAL PROOF
  TESTIMONIALS: {
    content: [
      { name: 'title', label: 'Section Title', type: FIELD_TYPES.TEXT, defaultValue: 'What our clients say' }
    ],
    settings: [
      { name: 'layout', label: 'Layout', type: FIELD_TYPES.SELECT, options: ['grid', 'carousel'], defaultValue: 'carousel' },
      ...COMMON_LAYOUT,
      ...COMMON_VISIBILITY
    ],
    responsive: [
      ...COMMON_RESPONSIVE
    ]
  },
  CUSTOMER_REVIEWS: {
    content: [
      { name: 'title', label: 'Section Title', type: FIELD_TYPES.TEXT, defaultValue: 'Recent Reviews' }
    ],
    settings: [
      { name: 'limit', label: 'Review Limit', type: FIELD_TYPES.NUMBER, defaultValue: 6 },
      ...COMMON_LAYOUT,
      ...COMMON_VISIBILITY
    ],
    responsive: [
      ...COMMON_RESPONSIVE
    ]
  },
  TRUST_BADGES: {
    content: [
      { name: 'title', label: 'Section Title', type: FIELD_TYPES.TEXT, defaultValue: 'Shop with Confidence' }
    ],
    settings: [
      { name: 'size', label: 'Badge Size', type: FIELD_TYPES.SELECT, options: ['small', 'medium', 'large'], defaultValue: 'small' },
      ...COMMON_LAYOUT,
      ...COMMON_VISIBILITY
    ],
    responsive: [
      ...COMMON_RESPONSIVE
    ]
  },

  // MEDIA
  IMAGE_GALLERY: {
    content: [
      { name: 'title', label: 'Section Title', type: FIELD_TYPES.TEXT, defaultValue: 'Inspiration' }
    ],
    settings: [
      { name: 'layout', label: 'Gallery Layout', type: FIELD_TYPES.SELECT, options: ['grid', 'masonry'], defaultValue: 'grid' },
      ...COMMON_LAYOUT,
      ...COMMON_VISIBILITY
    ],
    responsive: [
      ...COMMON_RESPONSIVE,
      { name: 'columns', label: 'Columns', type: FIELD_TYPES.SELECT, options: ['1', '2', '3', '4'], defaultValue: undefined }
    ]
  },
  VIDEO_SECTION: {
    content: [
      { name: 'title', label: 'Section Title', type: FIELD_TYPES.TEXT, defaultValue: 'Behind the Scenes' },
      { name: 'videoUrl', label: 'Video URL', type: FIELD_TYPES.URL, defaultValue: '' },
      { name: 'posterImage', label: 'Poster Image', type: FIELD_TYPES.IMAGE, defaultValue: '' }
    ],
    settings: [
      { name: 'autoplay', label: 'Autoplay Video', type: FIELD_TYPES.TOGGLE, defaultValue: false },
      ...COMMON_LAYOUT,
      ...COMMON_VISIBILITY
    ],
    responsive: [
      ...COMMON_RESPONSIVE
    ]
  },

  // ENGAGEMENT
  NEWSLETTER: {
    content: [
      { name: 'title', label: 'Heading', type: FIELD_TYPES.TEXT, defaultValue: 'Join our list' },
      { name: 'subtitle', label: 'Subtitle', type: FIELD_TYPES.TEXT, defaultValue: 'Get 10% off your first order' },
      { name: 'placeholder', label: 'Input Placeholder', type: FIELD_TYPES.TEXT, defaultValue: 'Enter your email' },
      { name: 'buttonText', label: 'Button Text', type: FIELD_TYPES.TEXT, defaultValue: 'Subscribe' }
    ],
    settings: [
      { name: 'align', label: 'Alignment', type: FIELD_TYPES.SELECT, options: ['left', 'center'], defaultValue: 'center' },
      ...COMMON_APPEARANCE,
      ...COMMON_LAYOUT,
      ...COMMON_VISIBILITY
    ],
    responsive: [
      ...COMMON_RESPONSIVE
    ]
  },
  FAQ: {
    content: [
      { name: 'title', label: 'Section Title', type: FIELD_TYPES.TEXT, defaultValue: 'Frequently Asked Questions' }
    ],
    settings: [
      { name: 'expanded', label: 'Expanded by Default', type: FIELD_TYPES.TOGGLE, defaultValue: false },
      ...COMMON_LAYOUT,
      ...COMMON_VISIBILITY
    ],
    responsive: [
      ...COMMON_RESPONSIVE
    ]
  },
  CONTACT_CTA: {
    content: [
      { name: 'title', label: 'Heading', type: FIELD_TYPES.TEXT, defaultValue: 'Need Help?' },
      { name: 'description', label: 'Description', type: FIELD_TYPES.TEXTAREA, defaultValue: 'Our team is here to assist you.' },
      { name: 'button', label: 'Button Text', type: FIELD_TYPES.TEXT, defaultValue: 'Contact Us' },
      { name: 'buttonLink', label: 'Button Link', type: FIELD_TYPES.URL, defaultValue: '/contact' }
    ],
    settings: [
      { name: 'theme', label: 'Theme', type: FIELD_TYPES.SELECT, options: ['light', 'dark'], defaultValue: 'light' },
      ...COMMON_LAYOUT,
      ...COMMON_VISIBILITY
    ],
    responsive: [
      ...COMMON_RESPONSIVE
    ]
  },
  
  // DEFAULT
  DEFAULT: {
    content: [
      { name: 'title', label: 'Section Title', type: FIELD_TYPES.TEXT, defaultValue: 'Section Title' },
      { name: 'subtitle', label: 'Subtitle', type: FIELD_TYPES.TEXTAREA, defaultValue: '' }
    ],
    settings: [
      ...COMMON_LAYOUT,
      ...COMMON_VISIBILITY
    ],
    responsive: [
      ...COMMON_RESPONSIVE
    ]
  }
};

export const getSectionSchema = (type) => {
  return SECTION_SCHEMAS[type] || SECTION_SCHEMAS.DEFAULT;
};
