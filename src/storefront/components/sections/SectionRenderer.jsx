import React from 'react';
import { useStorefrontTheme } from '../../context/StorefrontThemeContext';

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

// Central Registry Map
const SECTION_COMPONENTS = {
  HERO_BANNER: HeroSection,
  CREATIONS_SHOWCASE: CreationsWithPurpose,
  PRODUCT_CAROUSEL: ProductGridSection,
  PRODUCT_GRID: ProductGridSection, // Added mapping
  FEATURE_GRID: BenefitsSection, // Added mapping
  FEATURED_CATEGORIES: CategoryShowcase,
  TESTIMONIALS: Testimonials,
  TRUST_BADGES: BenefitsSection,
  PROMO_BANNER: PromoBanner,
  CTA_BANNER: PromoBanner, // Added mapping
  COLLECTION_FEATURE: CollectionFeature,
  BRAND_STORY: BrandStory,
  EDITORIAL: EditorialSection,
  NEWSLETTER: NewsletterSection,
  FOOTER: null, // Global footer used
  NAVBAR: null, // Global navbar used
  // Add future section types here easily
};

export default function SectionRenderer({ sections = [] }) {
  const { activeTheme } = useStorefrontTheme();

  if (!sections || !Array.isArray(sections) || sections.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      {sections.map((section, index) => {
        // Fallback to type or id if section object structure varies slightly
        const sectionType = section.type; 
        const TargetComponent = SECTION_COMPONENTS[sectionType];
        
        // Fail gracefully for unknown section types
        if (!TargetComponent) {
          if (process.env.NODE_ENV === 'development') {
             console.warn(`SectionRenderer: Unmapped section type -> ${sectionType}`);
          }
          return null;
        }

        // Forward section data and the activeTheme to the child
        // Component will receive its settings usually via data or spreading
        return (
          <TargetComponent 
            key={section.id || `section-${index}`} 
            {...section.settings} // Flatten settings so child props map correctly (e.g. title, subtitle)
            data={section} 
            activeTheme={activeTheme} 
          />
        );
      })}
    </div>
  );
}
