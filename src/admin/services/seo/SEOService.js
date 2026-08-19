import { generateSlug, validateSlug, validateSEO } from './SEOValidation';

export const SEOService = {
  getSEO: async (resourceId) => {
    // Mock data
    return {
      id: `seo-${resourceId}`,
      resourceId,
      title: 'Sample Product - Aurora Furniture',
      description: 'Discover the sample product at Aurora Premium Furniture.',
      slug: 'sample-product',
      canonical: 'https://aurorafurniture.com/sample-product',
      robots: 'index, follow',
      ogTitle: 'Sample Product',
      ogDescription: 'Discover the sample product.',
      ogImage: null
    };
  },
  updateSEO: async (seoData) => {
    return new Promise(resolve => setTimeout(() => resolve({ success: true, data: seoData }), 500));
  },
  getRedirects: async () => {
    return [
      { id: '1', source: '/old-sofa', destination: '/products/modern-sofa', type: '301', status: 'Active', createdAt: '2026-08-01' },
      { id: '2', source: '/sale-2025', destination: '/promotions', type: '302', status: 'Active', createdAt: '2026-08-05' }
    ];
  },
  createRedirect: async (redirect) => {
    return new Promise(resolve => setTimeout(() => resolve({ success: true, data: { ...redirect, id: Date.now().toString() } }), 500));
  },
  getTemplates: async () => {
    return [
      { id: 'tpl-1', name: 'Product Default', resourceType: 'Product', titleTemplate: '{{name}} | Aurora Furniture', descriptionTemplate: 'Buy {{name}} online. Premium furniture.' }
    ];
  },
  runAudit: async () => {
    return [
      { id: '1', resourceType: 'Product', resourceId: 'p-1', issue: 'Missing Title', severity: 'Error', status: 'Warning' }
    ];
  },
  getSEOAnalytics: async () => {
    return {
      organicTraffic: '12.5k',
      impressions: '145k',
      clicks: '10.2k',
      ctr: '7.0%',
      avgPosition: '14.2',
      indexedPages: '234'
    };
  }
};
