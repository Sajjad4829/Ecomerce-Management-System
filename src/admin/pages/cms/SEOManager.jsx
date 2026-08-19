import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGlobe, FiSliders, FiFileText, FiCode, FiCheckCircle, FiSearch, FiSettings, FiPlus } from 'react-icons/fi';
import { cn } from '../../../utils/cn';
import SEODashboardOverview from '../../components/cms/seo/SEODashboardOverview';
import IndexingTable from '../../components/cms/seo/IndexingTable';
import SchemaBuilder from '../../components/cms/seo/SchemaBuilder';
import GlobalSEOSettings from '../../components/cms/seo/GlobalSEOSettings';
import SEOEditorModal from '../../components/cms/seo/SEOEditorModal';
import MediaPickerModal from '../../components/cms/media/MediaPickerModal';

// Sample enterprise furniture CMS resources dataset across all 7 resource types
const INITIAL_SEO_RESOURCES = [
  {
    id: 'res-p1',
    type: 'products',
    title: 'Aurelian Modular Velvet Sofa in Cream',
    slug: 'aurelian-modular-velvet-sofa',
    seoTitle: 'Aurelian Modular Velvet Sofa | Luxury Living Room',
    metaDesc: 'Discover the Aurelian modular velvet sofa in cream. Hand-crafted in Italy with sustainable solid oak frame and stain-resistant performance velvet. Free white-glove delivery.',
    focusKeyword: 'velvet sofa',
    seoScore: 92,
    isNoIndex: false,
    isNoFollow: false,
    schemaType: 'Product',
    ogImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
    canonicalUrl: 'https://aurelianfurniture.com/products/aurelian-modular-velvet-sofa'
  },
  {
    id: 'res-p2',
    type: 'products',
    title: 'Nordic Solid Oak Dining Table',
    slug: 'nordic-solid-oak-dining-table',
    seoTitle: 'Nordic Oak Dining Table | Scandi Dining Furniture',
    metaDesc: 'Handcrafted solid Nordic oak dining table seating 8-10 guests. FSC-certified sustainable timber with matte protective oil finish.',
    focusKeyword: 'oak dining table',
    seoScore: 88,
    isNoIndex: false,
    isNoFollow: false,
    schemaType: 'Product',
    ogImage: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80',
    canonicalUrl: ''
  },
  {
    id: 'res-p3',
    type: 'products',
    title: 'Aurelian Marble & Brass Coffee Table',
    slug: 'aurelian-marble-coffee-table',
    seoTitle: '', // Missing title
    metaDesc: 'Italian Calacatta marble coffee table with brushed brass legs.',
    focusKeyword: 'marble coffee table',
    seoScore: 54,
    isNoIndex: false,
    isNoFollow: false,
    schemaType: 'Product',
    ogImage: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80',
    canonicalUrl: ''
  },
  {
    id: 'res-c1',
    type: 'categories',
    title: 'Luxury Living Room Sofas & Couches',
    slug: 'sofas',
    seoTitle: 'Luxury Sofas & Modular Couches | Aurelian Furniture',
    metaDesc: '', // Missing meta description
    focusKeyword: 'luxury sofas',
    seoScore: 62,
    isNoIndex: false,
    isNoFollow: false,
    schemaType: 'WebPage',
    ogImage: '',
    canonicalUrl: ''
  },
  {
    id: 'res-[#pg1]',
    type: 'pages',
    title: 'Aurelian House — Brand Heritage & Craft',
    slug: 'about-us',
    seoTitle: 'Our Heritage & Italian Craftsmanship | Aurelian',
    metaDesc: 'Learn about Aurelian Furniture house founded in Milan. Discover our dedication to sustainable solid woods and artisan upholstery.',
    focusKeyword: 'italian furniture brand',
    seoScore: 95,
    isNoIndex: false,
    isNoFollow: false,
    schemaType: 'Organization',
    ogImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    canonicalUrl: ''
  },
  {
    id: 'res-col1',
    type: 'collections',
    title: 'Scandinavian Living Lookbook 2025',
    slug: 'scandi-living-lookbook',
    seoTitle: 'Scandinavian Furniture Collection 2025',
    metaDesc: 'Explore minimalist Scandinavian living room curated sets, oak sideboards, and bouclé accent chairs.',
    focusKeyword: 'scandinavian furniture',
    seoScore: 84,
    isNoIndex: false,
    isNoFollow: false,
    schemaType: 'WebPage',
    ogImage: '',
    canonicalUrl: ''
  },
  {
    id: 'res-p4',
    type: 'products',
    title: 'Discontinued Prototype Stool',
    slug: 'prototype-stool-v1',
    seoTitle: 'Archive Prototype Stool',
    metaDesc: 'Internal prototype item. Not available for public retail purchase.',
    focusKeyword: '',
    seoScore: 40,
    isNoIndex: true, // Marked noindex
    isNoFollow: true,
    schemaType: 'WebPage',
    ogImage: '',
    canonicalUrl: ''
  }
];

export default function SEOManager() {
  const [resources, setResources] = useState(INITIAL_SEO_RESOURCES);
  const [activeTab, setActiveTab] = useState('audit'); // 'audit' | 'indexing' | 'schema' | 'global'
  
  const [editingResource, setEditingResource] = useState(null);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);

  // Handlers
  const handleSaveResourceSEO = (updatedRes) => {
    setResources(prev => prev.map(r => r.id === updatedRes.id ? updatedRes : r));
    setEditingResource(null);
  };

  const handleBulkNoindex = (ids) => {
    setResources(prev => prev.map(r => ids.includes(r.id) ? { ...r, isNoIndex: true } : r));
  };

  const handleBulkIndex = (ids) => {
    setResources(prev => prev.map(r => ids.includes(r.id) ? { ...r, isNoIndex: false } : r));
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Page Title & Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-2 text-sm text-text-muted">
            <span>CMS</span>
            <span className="text-gray-300">/</span>
            <span className="text-text-primary font-semibold">SEO & Structured Data</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-text-primary">Central Enterprise SEO Manager</h1>
          <p className="text-sm text-text-muted mt-1 max-w-xl leading-relaxed">
            Configure organic search metadata, SERP previews, social cards, Google JSON-LD schema microdata, and crawler indexing rules across all catalog items and store pages.
          </p>
        </div>

        {/* Quick Tabs Button Navigation */}
        <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-black/5 text-xs font-bold text-text-secondary">
          <button
            onClick={() => setActiveTab('audit')}
            className={cn(
              "px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer",
              activeTab === 'audit' ? "bg-surface text-text-primary shadow-2xs font-bold" : "hover:text-black"
            )}
          >
            <FiGlobe size={14} />
            <span>SEO Health Audit</span>
          </button>

          <button
            onClick={() => setActiveTab('indexing')}
            className={cn(
              "px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer",
              activeTab === 'indexing' ? "bg-surface text-text-primary shadow-2xs font-bold" : "hover:text-black"
            )}
          >
            <FiFileText size={14} />
            <span>Indexing & Resources</span>
          </button>

          <button
            onClick={() => setActiveTab('schema')}
            className={cn(
              "px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer",
              activeTab === 'schema' ? "bg-surface text-text-primary shadow-2xs font-bold" : "hover:text-black"
            )}
          >
            <FiCode size={14} />
            <span>Schema Studio</span>
          </button>

          <button
            onClick={() => setActiveTab('global')}
            className={cn(
              "px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer",
              activeTab === 'global' ? "bg-surface text-text-primary shadow-2xs font-bold" : "hover:text-black"
            )}
          >
            <FiSettings size={14} />
            <span>Global Defaults</span>
          </button>
        </div>
      </motion.div>

      {/* Main Workspace Body Tab Views */}

      {/* TAB 1: Audit Overview */}
      {activeTab === 'audit' && (
        <div className="space-y-6">
          <SEODashboardOverview
            totalResources={resources.length}
            indexedCount={resources.filter(r => !r.isNoIndex).length}
            missingTitleCount={resources.filter(r => !r.seoTitle).length}
            missingDescCount={resources.filter(r => !r.metaDesc).length}
            onFixIssuesClick={() => setActiveTab('indexing')}
          />

          <div className="space-y-3">
            <h3 className="font-serif font-bold text-lg text-text-primary">Resource SEO Status Directory</h3>
            <IndexingTable
              resources={resources}
              onEditResource={(res) => setEditingResource(res)}
              onBulkNoindex={handleBulkNoindex}
              onBulkIndex={handleBulkIndex}
            />
          </div>
        </div>
      )}

      {/* TAB 2: Resource Indexing Table */}
      {activeTab === 'indexing' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-lg text-text-primary">Manage Resource Metadata & Directives</h3>
            <span className="text-xs text-text-muted font-mono">Showing {resources.length} configurable CMS endpoints</span>
          </div>

          <IndexingTable
            resources={resources}
            onEditResource={(res) => setEditingResource(res)}
            onBulkNoindex={handleBulkNoindex}
            onBulkIndex={handleBulkIndex}
          />
        </div>
      )}

      {/* TAB 3: Schema Studio */}
      {activeTab === 'schema' && (
        <SchemaBuilder
          initialType="Product"
          resourceData={resources[0]}
        />
      )}

      {/* TAB 4: Global Defaults & Sitemap */}
      {activeTab === 'global' && (
        <GlobalSEOSettings
          onSelectMediaClick={() => setIsMediaPickerOpen(true)}
        />
      )}

      {/* Slide-over SEO Editor Drawer Modal */}
      <SEOEditorModal
        isOpen={!!editingResource}
        resource={editingResource}
        onClose={() => setEditingResource(null)}
        onSave={handleSaveResourceSEO}
        onSelectMediaClick={() => setIsMediaPickerOpen(true)}
      />

      {/* Media Picker Component Modal for OG Images */}
      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelectMedia={(selected) => {
          if (editingResource && selected) {
            setEditingResource(prev => ({
              ...prev,
              ogImage: selected.url
            }));
          }
        }}
        allowMultiple={false}
        title="Select Social OpenGraph Sharing Image"
      />

    </div>
  );
}
