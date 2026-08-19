export const LIBRARY_SECTIONS = [
  { type: 'hero', name: 'Main Hero', category: 'Hero Sections', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=400' },
  { type: 'grid', name: 'Product Grid', category: 'Commerce', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=400' },
  { 
    type: 'CREATIONS_SHOWCASE', 
    name: 'Creations with Purpose Grid', 
    category: 'Showcase / Feature Grid', 
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=400',
    defaultSchema: {
      title: "Creations with purpose",
      subtitle: "Many choices based on your space",
      ctaText: "Explore Now",
      ctaUrl: "/shop",
      items: [
        { id: "1", imageUrl: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=800", title: "Bedroom", link: "/category/bedroom" },
        { id: "2", imageUrl: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=800", title: "Office", link: "/category/office" },
        { id: "3", imageUrl: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=800", title: "Living Room", link: "/category/living-room" },
        { id: "4", imageUrl: "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?auto=format&fit=crop&q=80&w=800", title: "Dining", link: "/category/dining" },
        { id: "5", imageUrl: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800", title: "Sofa", link: "/category/sofa" },
        { id: "6", imageUrl: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&q=80&w=800", title: "Kitchen", link: "/category/kitchen" }
      ]
    }
  },
  { type: 'banner', name: 'Newsletter Signup', category: 'Conversion', image: '' },
  { type: 'features', name: 'Features List', category: 'Content', image: '' },
  { type: 'category', name: 'Category Grid', category: 'Commerce', image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=400' },
  { type: 'testimonials', name: 'Customer Reviews', category: 'Social Proof', image: '' },
  { type: 'faq', name: 'FAQ Accordion', category: 'Content', image: '' },
  { type: 'footer', name: 'Standard Footer', category: 'Global', image: '' },
];

export const GLOBAL_BLOCKS = [
  { type: 'banner', name: 'Summer Sale Promo Banner', category: 'Banners', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=400' },
  { type: 'footer', name: 'Standard Footer - 2024', category: 'Footers', image: '' },
  { type: 'grid', name: 'Featured Products Grid - Homepage', category: 'Product Grids', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=400' },
];
