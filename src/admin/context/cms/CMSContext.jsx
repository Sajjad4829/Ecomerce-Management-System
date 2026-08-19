import React, { createContext, useContext, useState, useMemo } from 'react';

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

  const [pages, setPages] = useState([
    { id: 'PG-001', name: 'Homepage', title: 'Premium Furniture', slug: '/', pageTypeId: 'PT-001', status: 'Published', sections: 5, seoStatus: 'Good', author: 'Admin', updatedAt: '2024-06-10' },
    { id: 'PG-002', name: 'About Us', title: 'Our Story', slug: '/about', pageTypeId: 'PT-008', status: 'Published', sections: 3, seoStatus: 'Needs Improvement', author: 'Admin', updatedAt: '2024-06-12' },
    { id: 'PG-003', name: 'Summer Campaign', title: 'Summer Special Offers', slug: '/campaigns/summer', pageTypeId: 'PT-005', status: 'Draft', sections: 4, seoStatus: 'Good', author: 'Marketing', updatedAt: '2024-06-15' }
  ]);

  const [sections, setSections] = useState([
    { id: 'SEC-001', name: 'Hero Main', type: 'Hero', category: 'Hero', status: 'Active', usageCount: 2 },
    { id: 'SEC-002', name: 'Featured Products Carousel', type: 'Product', category: 'Carousel', status: 'Active', usageCount: 1 },
    { id: 'SEC-003', name: 'Newsletter Signup', type: 'Newsletter', category: 'CTA', status: 'Active', usageCount: 5 }
  ]);

  const [blocks, setBlocks] = useState([
    { id: 'BLK-001', name: 'Global Promo Banner', type: 'Promotional Banner', status: 'Active', updatedAt: '2024-06-01' },
    { id: 'BLK-002', name: 'Trust Badges', type: 'Trust Section', status: 'Active', updatedAt: '2024-05-15' }
  ]);

  const [menus, setMenus] = useState([
    { id: 'MNU-001', name: 'Main Header Navigation', type: 'Header', status: 'Active', items: 8 },
    { id: 'MNU-002', name: 'Footer Links', type: 'Footer', status: 'Active', items: 12 },
    { id: 'MNU-003', name: 'Mobile Sidebar', type: 'Mobile', status: 'Active', items: 10 }
  ]);

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

  const contextValue = useMemo(() => ({
    pageTypes, setPageTypes,
    pages, setPages, getPage,
    sections, setSections,
    blocks, setBlocks,
    menus, setMenus,
    banners, setBanners,
    seo, setSeo,
    redirects, setRedirects,
    versions, setVersions
  }), [pageTypes, pages, sections, blocks, menus, banners, seo, redirects, versions]);

  return (
    <CMSContext.Provider value={contextValue}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => useContext(CMSContext);
