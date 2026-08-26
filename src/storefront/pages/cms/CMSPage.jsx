import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useCMS } from '../../../admin/context/cms/CMSContext';
import SectionRenderer from '../../components/sections/SectionRenderer';

export default function CMSPage() {
  const { slug } = useParams();
  const { pages, getPageSections } = useCMS();
  
  // Find page by slug. Need to prepend '/' since slugs in CMS are stored like '/about'
  let matchedPage = pages.find(p => {
    if (!slug) {
      // If we are at the root ('/'), match pages with slug '/', '', or 'home'
      return p.slug === '/' || p.slug === '' || p.slug === 'home';
    }
    // Otherwise match the exact slug with or without leading slash
    return p.slug === `/${slug}` || p.slug === slug;
  });

  // If we are at the root and didn't find a explicitly named 'home' page, 
  // just show the very first page in their CMS as a fallback so they don't see a 404.
  if (!matchedPage && !slug && pages.length > 0) {
    matchedPage = pages[0];
  }

  useEffect(() => {
    if (matchedPage) {
      document.title = matchedPage.title || matchedPage.name;
    }
  }, [matchedPage]);

  if (!matchedPage) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col pt-24 bg-surface text-text-primary">
        <h1 className="text-4xl font-serif mb-4">404 - Page Not Found</h1>
        <p className="text-text-secondary">The page you are looking for does not exist.</p>
      </div>
    );
  }

  if (matchedPage.status !== 'Published') {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col pt-24 bg-surface text-text-primary">
        <h1 className="text-4xl font-serif mb-4">Coming Soon</h1>
        <p className="text-text-secondary">This page is not yet published.</p>
      </div>
    );
  }

  const sections = getPageSections(matchedPage.id);

  return (
    <div className="bg-surface min-h-screen">
      <SectionRenderer sections={sections} />
    </div>
  );
}
