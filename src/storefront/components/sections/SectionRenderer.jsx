import React from 'react';
import { useStorefrontTheme } from '../../context/StorefrontThemeContext';
import { getSectionSchema } from '../../../admin/components/cms/editor/sectionEditorSchemas';

// Import all available storefront sections
import HeroSection from '../home/HeroSection';
import CreationsWithPurpose from '../home/CreationsWithPurpose';
import ProductGridSection from '../home/ProductGridSection';
import CategoryShowcase from '../home/CategoryShowcase';
import Testimonials from '../home/Testimonials';
import BenefitsSection from '../home/BenefitsSection';
import PromoBanner from '../home/PromoBanner';
import CollectionFeature from '../home/CollectionFeature';
import BrandStory from '../home/BrandStory';
import EditorialSection from '../home/EditorialSection';
import NewsletterSection from '../home/NewsletterSection';
import Navbar from '../navigation/Navbar';
import Footer from '../navigation/Footer';

// Central Registry Map
const SECTION_COMPONENTS = {
  // Navigation & Structure
  NAVBAR: Navbar,
  FOOTER: Footer,
  DEFAULT: null,

  // Heroes
  HERO_BANNER: HeroSection,
  SPLIT_HERO: HeroSection,
  PROMO_HERO: HeroSection,
  PROMOTIONAL_HERO: HeroSection,

  // Commerce
  PRODUCT_GRID: ProductGridSection,
  PRODUCT_CAROUSEL: ProductGridSection,
  FEATURED_PRODUCTS: ProductGridSection,
  NEW_ARRIVALS: ProductGridSection,
  BEST_SELLERS: ProductGridSection,
  
  CATEGORY_GRID: CategoryShowcase,
  FEATURED_CATEGORIES: CategoryShowcase,
  CATEGORY_CAROUSEL: CategoryShowcase,
  
  COLLECTION_FEATURE: CollectionFeature,

  // Promotional
  PROMO_BANNER: PromoBanner,
  PROMOTIONAL_BANNER: PromoBanner,
  OFFER_BANNER: PromoBanner,
  FLASH_SALE: PromoBanner,
  COUNTDOWN: PromoBanner,
  CTA_BANNER: PromoBanner,

  // Content
  RICH_TEXT: EditorialSection,
  IMAGE_TEXT: EditorialSection,
  TEXT_IMAGE: EditorialSection,
  BRAND_LOGOS: BrandStory,
  BRAND_STORY: BrandStory,
  EDITORIAL: EditorialSection,
  
  // Social Proof & Trust
  STATISTICS: BenefitsSection,
  TESTIMONIALS: Testimonials,
  CUSTOMER_REVIEWS: Testimonials,
  TRUST_BADGES: BenefitsSection,
  FEATURE_GRID: BenefitsSection,

  // Media & Interaction
  IMAGE_GALLERY: CreationsWithPurpose,
  CREATIONS_SHOWCASE: CreationsWithPurpose,
  VIDEO_SECTION: CreationsWithPurpose,
  
  // Utility
  NEWSLETTER: NewsletterSection,
  FAQ: EditorialSection,
  CONTACT_CTA: PromoBanner,
};

// Fallback component for unmapped sections
const MissingSection = ({ type, data }) => (
  <div className="py-20 px-4 text-center border-y border-dashed border-gray-300 bg-gray-50 m-4 rounded-xl">
    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 text-gray-500 mb-4">
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    </div>
    <h3 className="text-lg font-bold text-gray-700 mb-2">Section Template Missing</h3>
    <p className="text-gray-500 max-w-md mx-auto text-sm">
      The CMS section <span className="font-mono bg-gray-200 px-1 py-0.5 rounded text-gray-800">{type}</span> has not been mapped to a frontend React component yet. 
    </p>
    {process.env.NODE_ENV === 'development' && (
      <div className="mt-4 text-left bg-gray-100 p-4 rounded text-xs font-mono overflow-auto max-w-2xl mx-auto text-gray-600">
        <pre>{JSON.stringify(data.content, null, 2)}</pre>
      </div>
    )}
  </div>
);

export default function SectionRenderer({ sections = [] }) {
  const { activeTheme } = useStorefrontTheme();

  if (!sections || !Array.isArray(sections) || sections.length === 0) {
    return null;
  }

  const resolveComponentForType = (type) => {
    if (!type) return null;
    const t = type.toUpperCase();
    if (SECTION_COMPONENTS[t]) return SECTION_COMPONENTS[t];
    
    if (t.includes('NAVBAR') || t.includes('HEADER')) return SECTION_COMPONENTS.NAVBAR;
    if (t.includes('HERO')) return SECTION_COMPONENTS.HERO_BANNER;
    if (t.includes('PRODUCT') || t === 'GRID') return SECTION_COMPONENTS.PRODUCT_GRID;
    if (t.includes('CATEGORY')) return SECTION_COMPONENTS.CATEGORY_GRID;
    if (t.includes('PROMO') || t.includes('BANNER')) return SECTION_COMPONENTS.PROMO_BANNER;
    if (t.includes('TESTIMONIAL') || t.includes('REVIEW')) return SECTION_COMPONENTS.TESTIMONIALS;
    if (t.includes('FEATURE')) return SECTION_COMPONENTS.FEATURE_GRID;
    if (t.includes('CREATION') || t.includes('PURPOSE')) return SECTION_COMPONENTS.CREATIONS_SHOWCASE;
    if (t.includes('FAQ')) return SECTION_COMPONENTS.FAQ;
    
    return undefined;
  };

  return (
    <div className="w-full">
      {sections.map((section, index) => {
        if (section.isHidden) return null;

        const sectionType = section.type; 
        const TargetComponent = resolveComponentForType(sectionType);
        
        const schema = getSectionSchema(sectionType);
        const schemaDefaultContent = {};
        if (schema?.content) {
          schema.content.forEach(field => {
            if (field.defaultValue !== undefined) {
              schemaDefaultContent[field.name] = field.defaultValue;
            }
          });
        }
        
        const schemaDefaultSettings = {};
        if (schema?.settings) {
          schema.settings.forEach(field => {
            if (field.defaultValue !== undefined) {
              schemaDefaultSettings[field.name] = field.defaultValue;
            }
          });
        }

        // Normalize data to handle older cached sections with deep merging
        const normalizedSection = {
          ...section,
          content: { ...schemaDefaultContent, ...(section.defaultContent || {}), ...(section.content || {}) },
          settings: { ...schemaDefaultSettings, ...(section.defaultSettings || {}), ...(section.settings || {}) }
        };

        // Explicitly null sections should just not render
        if (TargetComponent === null) {
          return null;
        }

        // Fail gracefully for unknown section types by showing a visual placeholder
        if (TargetComponent === undefined) {
          if (process.env.NODE_ENV === 'development') {
             console.warn(`SectionRenderer: Unmapped section type -> ${sectionType}`);
          }
          return <MissingSection key={normalizedSection.id || `section-${index}`} type={sectionType} data={normalizedSection} />;
        }

        // Forward section data and the activeTheme to the child
        // Component will receive its settings usually via data or spreading
        return (
          <TargetComponent 
            key={normalizedSection.id || `section-${index}`} 
            {...normalizedSection.settings} // Flatten settings so child props map correctly (e.g. title, subtitle)
            data={normalizedSection} 
            activeTheme={activeTheme} 
          />
        );
      })}
    </div>
  );
}
