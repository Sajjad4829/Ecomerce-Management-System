import React from 'react';
import { useExperience } from '../../context/experience/ExperienceContext';

// Reusable Placeholder Wrapper
const PlaceholderView = ({ title, description }) => (
  <div className="bg-surface rounded-lg border border-neutral-200 p-8">
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">{title}</h1>
        <p className="text-neutral-500 mt-1">{description}</p>
      </div>
      <button className="px-4 py-2 bg-neutral-900 text-white rounded-md text-sm font-medium hover:bg-neutral-800">
        Create New
      </button>
    </div>
    
    <div className="bg-neutral-50 rounded-lg border border-neutral-200 border-dashed p-12 text-center">
      <h3 className="text-lg font-medium text-neutral-900 mb-2">No data configured yet</h3>
      <p className="text-neutral-500 mb-6">Get started by creating your first {title.toLowerCase()} configuration.</p>
      <button className="px-4 py-2 bg-surface border border-neutral-300 text-neutral-700 rounded-md text-sm font-medium hover:bg-neutral-50">
        + Add {title.split(' ')[0]}
      </button>
    </div>
  </div>
);

export const ExperienceDashboard = () => (
  <PlaceholderView 
    title="Experience Dashboard" 
    description="Overview of all active experiences, personalization rules, and active experiments." 
  />
);

export const HomepageExperience = () => (
  <PlaceholderView 
    title="Homepage Experience" 
    description="Configure the homepage structure and dynamic sections." 
  />
);

export const FeaturedProducts = () => (
  <PlaceholderView 
    title="Featured Products" 
    description="Manage priority product placements for high-visibility zones." 
  />
);

export const FeaturedCategories = () => (
  <PlaceholderView 
    title="Featured Categories" 
    description="Control which categories are highlighted across the shopping experience." 
  />
);

export const ProductRecommendations = () => (
  <PlaceholderView 
    title="Product Recommendations" 
    description="Configure algorithmic and manual product recommendation slots." 
  />
);

export * from './RelatedProductsManager';
export * from './RelatedProductsForm';

export * from './CrossSellManager';
export * from './CrossSellForm';

export const UpSell = () => (
  <PlaceholderView 
    title="Up-sell Configurations" 
    description="Configure premium alternatives for product detail pages." 
  />
);

export const ProductBundles = () => (
  <PlaceholderView 
    title="Product Bundles" 
    description="Manage curated product collections sold together." 
  />
);

export const ExperienceCollections = () => (
  <PlaceholderView 
    title="Experience Collections" 
    description="Curate dynamic product groupings for landing pages." 
  />
);

export const SeasonalMerchandising = () => (
  <PlaceholderView 
    title="Seasonal Merchandising" 
    description="Schedule temporary adjustments to product visibility and priority." 
  />
);

export const PromotionalPlacement = () => (
  <PlaceholderView 
    title="Promotional Placement" 
    description="Manage where specific sales and offers appear across the site." 
  />
);

export const ProductPlacementRules = () => (
  <PlaceholderView 
    title="Product Placement Rules" 
    description="Build complex conditional rules for rendering products." 
  />
);

export const PersonalizationRules = () => (
  <PlaceholderView 
    title="Personalization Rules" 
    description="Target content based on customer segment, location, device, and context." 
  />
);

export const CustomerSegmentRules = () => (
  <PlaceholderView 
    title="Customer Segment Rules" 
    description="Tie merchandising experiences to specific CDP customer groups." 
  />
);

export const HomepageSections = () => (
  <PlaceholderView 
    title="Homepage Sections" 
    description="Drag-and-drop builder for dynamic homepage sections." 
  />
);

export const BannerContentPlacement = () => (
  <PlaceholderView 
    title="Banner & Content Placement" 
    description="Manage dynamic banners tied to specific rules or audiences." 
  />
);

export const ExperienceVariants = () => (
  <PlaceholderView 
    title="Experience Variants" 
    description="Manage variants of experiences for A/B testing and dynamic toggling." 
  />
);

export const ABExperiments = () => (
  <PlaceholderView 
    title="A/B Testing (Experiments)" 
    description="Run split tests on merchandising rules and content variants." 
  />
);

export const ExperiencePreview = () => (
  <PlaceholderView 
    title="Experience Preview" 
    description="Preview your site rendering with mock audiences and rule contexts." 
  />
);

export const MerchandisingAnalytics = () => (
  <PlaceholderView 
    title="Merchandising Analytics" 
    description="Track impressions, clicks, and conversions on dynamic merchandising content." 
  />
);
