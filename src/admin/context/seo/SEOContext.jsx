import React, { createContext, useContext, useState, useEffect } from 'react';
import { SEOService } from '../../services/seo/SEOService';

const SEOContext = createContext();

export function SEOProvider({ children }) {
  const [resources, setResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [seoData, setSeoData] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [redirects, setRedirects] = useState([]);
  const [auditResults, setAuditResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadResources = async () => {
    setLoading(true);
    // Mock
    setTimeout(() => {
      setResources([
        { id: 'r1', type: 'Product', name: 'Modern Sofa', slug: 'modern-sofa', status: 'Good', indexability: 'Indexable' },
        { id: 'r2', type: 'Category', name: 'Living Room', slug: 'living-room', status: 'Warning', indexability: 'Indexable' },
        { id: 'r3', type: 'CMS Page', name: 'About Us', slug: 'about-us', status: 'Good', indexability: 'Noindex' }
      ]);
      setLoading(false);
    }, 500);
  };

  const loadRedirects = async () => {
    setLoading(true);
    const data = await SEOService.getRedirects();
    setRedirects(data);
    setLoading(false);
  };

  const loadTemplates = async () => {
    setLoading(true);
    const data = await SEOService.getTemplates();
    setTemplates(data);
    setLoading(false);
  };

  const runAudit = async () => {
    setLoading(true);
    const data = await SEOService.runAudit();
    setAuditResults(data);
    setLoading(false);
  };

  const createRedirect = async (redirect) => {
    setLoading(true);
    const result = await SEOService.createRedirect(redirect);
    if (result.success) {
      setRedirects(prev => [...prev, result.data]);
    }
    setLoading(false);
    return result.success;
  };

  return (
    <SEOContext.Provider value={{
      resources,
      selectedResource,
      setSelectedResource,
      seoData,
      setSeoData,
      templates,
      redirects,
      auditResults,
      loading,
      loadResources,
      loadRedirects,
      loadTemplates,
      runAudit,
      createRedirect
    }}>
      {children}
    </SEOContext.Provider>
  );
}

export const useSEO = () => useContext(SEOContext);
