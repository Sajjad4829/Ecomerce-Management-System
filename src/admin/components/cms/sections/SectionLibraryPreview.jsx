/**
 * SectionLibraryPreview.jsx
 * -------------------------
 * Generic live preview component for the Section Library.
 *
 * Reuses the EXACT same preview components as PreviewCanvas.jsx — zero
 * rendering logic is duplicated.  The type-routing logic is intentionally
 * identical to PreviewCanvas.renderSection() so that any fix or improvement
 * to a preview component is automatically reflected here.
 *
 * Usage:
 *   <SectionLibraryPreview section={resolvedSection} scale={0.25} />
 *
 * `section` must be the output of resolveSectionPreview() — it already
 * contains real MongoDB content (or defaultContent as fallback).
 *
 * The preview is rendered full-size inside a scaled container so each
 * preview component sees normal props and dimensions without knowing it
 * is inside a thumbnail.
 */
import React from 'react';
import * as Icons from 'react-icons/fi';
import HeroSection from '../../../../storefront/components/home/HeroSection';
import NavbarPreview from '../editor/preview/NavbarPreview';
import ProductGridPreview from '../editor/preview/ProductGridPreview';
import BannerPreview from '../editor/preview/BannerPreview';
import FeaturesPreview from '../editor/preview/FeaturesPreview';
import CategoryGridPreview from '../editor/preview/CategoryGridPreview';
import TestimonialsPreview from '../editor/preview/TestimonialsPreview';
import FAQPreview from '../editor/preview/FAQPreview';
import FooterPreview from '../editor/preview/FooterPreview';
import CreationsShowcasePreview from '../editor/preview/CreationsShowcasePreview';

// ── Generic placeholder for section types without a dedicated preview ──────────
function GenericSectionPlaceholder({ section }) {
  const IconComponent = Icons[section.icon] || Icons.FiLayout;
  const content = section.content || {};

  return (
    <div className="py-16 px-12 flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white min-h-[200px]">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#5946ff]/10 to-[#5946ff]/5 flex items-center justify-center mb-4 shadow-sm">
        <IconComponent size={28} className="text-[#5946ff]/60" />
      </div>
      {(content.title || section.name) && (
        <h3 className="text-lg font-serif font-bold text-gray-800 mb-2 text-center">
          {content.title || section.name}
        </h3>
      )}
      {(content.subtitle || content.description || section.description) && (
        <p className="text-sm text-gray-400 text-center max-w-xs leading-relaxed">
          {content.subtitle || content.description || section.description}
        </p>
      )}
      <div className="mt-4 px-3 py-1 bg-gray-100 rounded-full text-[10px] uppercase tracking-widest font-bold text-gray-400">
        {section.category || section.type}
      </div>
    </div>
  );
}

// ── Route section type to the correct preview component ───────────────────────
// Mirrors PreviewCanvas.renderSection() exactly — one place to update.
function routePreviewComponent(section, device = 'desktop') {
  const typeStr = (section.type || '').toUpperCase();

  if (typeStr.includes('NAVBAR'))
    return <NavbarPreview section={section} device={device} />;
  if (typeStr === 'FOOTER')
    return <FooterPreview section={section} device={device} />;
  if (typeStr.includes('HERO'))
    return <HeroSection data={section} />;
  if (
    typeStr.includes('PRODUCT') ||
    typeStr === 'GRID' ||
    typeStr === 'NEW_ARRIVALS' ||
    typeStr === 'BEST_SELLERS' ||
    typeStr === 'FEATURED_PRODUCTS'
  )
    return <ProductGridPreview section={section} device={device} />;
  if (
    typeStr.includes('CATEGORY') ||
    typeStr === 'FEATURED_CATEGORIES'
  )
    return <CategoryGridPreview section={section} device={device} />;
  if (
    typeStr.includes('PROMO') ||
    typeStr.includes('BANNER') ||
    typeStr.includes('NEWSLETTER') ||
    typeStr.includes('CTA') ||
    typeStr.includes('OFFER') ||
    typeStr.includes('FLASH') ||
    typeStr.includes('COUNTDOWN') ||
    typeStr.includes('CONTACT')
  )
    return <BannerPreview section={section} device={device} />;
  if (typeStr.includes('TESTIMONIAL') || typeStr.includes('REVIEW'))
    return <TestimonialsPreview section={section} device={device} />;
  if (typeStr.includes('SHOWCASE') || typeStr.includes('CREATION') || typeStr.includes('PURPOSE'))
    return <CreationsShowcasePreview section={section} device={device} />;
  if (typeStr.includes('FEATURE') || typeStr.includes('TRUST') || typeStr.includes('STATISTIC') || typeStr.includes('BRAND'))
    return <FeaturesPreview section={section} device={device} />;
  if (typeStr.includes('FAQ'))
    return <FAQPreview section={section} device={device} />;

  // Default: generic placeholder
  return <GenericSectionPlaceholder section={section} />;
}

/**
 * SectionLibraryPreview
 *
 * @param {Object}  section  - Resolved section object (from resolveSectionPreview)
 * @param {number}  scale    - Scale factor for the thumbnail (e.g. 0.25 for card, 0.5 for drawer)
 * @param {string}  device   - 'desktop' | 'tablet' | 'mobile'
 * @param {string}  className - Additional wrapper classes
 */
export default function SectionLibraryPreview({
  section,
  scale = 0.25,
  device = 'desktop',
  className = '',
}) {
  if (!section) return null;

  const content = routePreviewComponent(section, device);

  // The outer div clips the scaled content.
  // The inner div renders at full size then CSS scales it.
  // This way each preview component behaves normally (correct min-heights, etc.)
  const innerWidth = `${(100 / scale).toFixed(1)}%`;
  const innerHeight = `${(100 / scale).toFixed(1)}%`;

  return (
    <div
      className={`w-full h-full overflow-hidden relative ${className}`}
      aria-hidden="true"
    >
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: innerWidth,
          height: innerHeight,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {content}
      </div>
    </div>
  );
}
