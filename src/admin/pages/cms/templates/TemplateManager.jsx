import { useState } from 'react';
import TemplateToolbar from '../../../components/cms/templates/TemplateToolbar';
import TemplateGrid from '../../../components/cms/templates/TemplateGrid';
import TemplateDetailsDrawer from '../../../components/cms/templates/TemplateDetailsDrawer';
import TemplatePreviewModal from '../../../components/cms/templates/TemplatePreviewModal';
import TemplateBuilderPage from './TemplateBuilderPage';
import TemplateAssignmentPage from './TemplateAssignmentPage';

export default function TemplateManager() {
  const [templates, setTemplates] = useState([
    {
      id: 'tpl-product-master',
      name: 'Master Bespoke Product Detail',
      type: 'Commerce',
      category: 'Product Page',
      status: 'published',
      version: '1.2.0',
      updatedAt: '2026-08-07',
      assignedPages: ['/products/sovereign-sofa', '/products/nordic-armchair', '/products/florence-table'],
      sectionsCount: 6,
      placeholdersCount: 5,
      description: 'Master product detail blueprint with high-res zoom carousel, material swatches, and technical specs table.',
      layout: 'Standard Commerce (Header + Footer)',
      theme: 'Aurelian Luxury Gold',
      sections: [
        { id: 's1', type: 'dynamic', placeholderType: 'PRODUCT_GALLERY' },
        { id: 's2', type: 'dynamic', placeholderType: 'PRODUCT_TITLE' },
        { id: 's3', type: 'dynamic', placeholderType: 'PRODUCT_PRICING' },
        { id: 's4', type: 'dynamic', placeholderType: 'PRODUCT_VARIANTS' },
        { id: 's5', type: 'dynamic', placeholderType: 'PRODUCT_SPECS' },
        { id: 's6', type: 'dynamic', placeholderType: 'PRODUCT_REVIEWS' }
      ],
      placeholders: [
        { type: 'PRODUCT_GALLERY', label: 'Product Image Gallery', category: 'Commerce' },
        { type: 'PRODUCT_TITLE', label: 'Product Title Header', category: 'Commerce' },
        { type: 'PRODUCT_PRICING', label: 'Pricing & Availability', category: 'Commerce' },
        { type: 'PRODUCT_VARIANTS', label: 'Variant Swatch Selector', category: 'Commerce' },
        { type: 'PRODUCT_SPECS', label: 'Technical Specs Table', category: 'Commerce' }
      ]
    },
    {
      id: 'tpl-collection-sanctuary',
      name: 'Sanctuary Editorial Collection',
      type: 'Commerce',
      category: 'Collection Page',
      status: 'published',
      version: '1.1.0',
      updatedAt: '2026-08-05',
      assignedPages: ['/collections/sanctuary', '/collections/living-room'],
      sectionsCount: 4,
      placeholdersCount: 3,
      description: 'Editorial collection page layout with hero banner, faceted sidebar filters, and paginated product grid.',
      layout: 'Standard Commerce (Header + Footer)',
      theme: 'Aurelian Luxury Gold',
      sections: [
        { id: 's1', type: 'dynamic', placeholderType: 'COLLECTION_HEADER' },
        { id: 's2', type: 'dynamic', placeholderType: 'CATALOG_FILTERS' },
        { id: 's3', type: 'dynamic', placeholderType: 'PRODUCT_GRID' }
      ],
      placeholders: [
        { type: 'COLLECTION_HEADER', label: 'Collection Hero Banner', category: 'Collection' },
        { type: 'PRODUCT_GRID', label: 'Dynamic Catalog Grid', category: 'Collection' }
      ]
    },
    {
      id: 'tpl-article-standard',
      name: 'Designer Journal Article',
      type: 'Content',
      category: 'Article Page',
      status: 'published',
      version: '1.0.0',
      updatedAt: '2026-07-28',
      assignedPages: ['/journal/florentine-craftsmanship', '/journal/interior-trends-2026'],
      sectionsCount: 3,
      placeholdersCount: 2,
      description: 'Editorial article layout with full-width typography, author bio card, and related story recommendations.',
      layout: 'Minimal Editorial',
      theme: 'Aurelian Luxury Gold',
      sections: [
        { id: 's1', type: 'dynamic', placeholderType: 'ARTICLE_CONTENT' },
        { id: 's2', type: 'dynamic', placeholderType: 'AUTHOR_BOX' }
      ],
      placeholders: [
        { type: 'ARTICLE_CONTENT', label: 'Article Markdown Body', category: 'Editorial' },
        { type: 'AUTHOR_BOX', label: 'Designer Profile Card', category: 'Editorial' }
      ]
    },
    {
      id: 'tpl-campaign-summer',
      name: 'Milan Milanese Campaign Landing',
      type: 'Page',
      category: 'Campaign Page',
      status: 'draft',
      version: '0.9.0',
      updatedAt: '2026-08-06',
      assignedPages: ['/campaigns/milan-2026'],
      sectionsCount: 5,
      placeholdersCount: 2,
      description: 'High-impact landing page template with hero video backdrop, VIP RSVP form, and featured lookbook.',
      layout: 'Full Width Landing',
      theme: 'Aurelian Luxury Gold',
      sections: [],
      placeholders: []
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const [currentView, setCurrentView] = useState('dashboard'); // dashboard | builder | assignment
  const [activeTemplate, setActiveTemplate] = useState(null);
  const [drawerTemplate, setDrawerTemplate] = useState(null);
  const [previewTemplate, setPreviewTemplate] = useState(null);

  // Filter Templates
  const filteredTemplates = templates.filter((tpl) => {
    const matchesSearch = searchQuery === '' || 
      tpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (tpl.assignedPages && tpl.assignedPages.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesType = selectedType === 'all' || tpl.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || tpl.status === selectedStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleCreateTemplate = () => {
    setActiveTemplate({
      id: `tpl-${Date.now()}`,
      name: 'New Custom Page Blueprint',
      type: 'Commerce',
      category: 'Custom Page',
      status: 'draft',
      version: '1.0.0',
      sections: [],
      placeholders: []
    });
    setCurrentView('builder');
  };

  const handleEditTemplate = (tpl) => {
    setActiveTemplate(tpl);
    setCurrentView('builder');
  };

  const handleDuplicateTemplate = (tpl) => {
    const dup = {
      ...tpl,
      id: `tpl-${Date.now()}`,
      name: `${tpl.name} (Copy)`,
      status: 'draft',
      version: '1.0.0',
      assignedPages: []
    };
    setTemplates((prev) => [dup, ...prev]);
  };

  const handleDeleteTemplate = (id) => {
    setTemplates((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSaveBuilder = (updatedTpl) => {
    setTemplates((prev) => {
      const exists = prev.some((t) => t.id === updatedTpl.id);
      if (exists) {
        return prev.map((t) => (t.id === updatedTpl.id ? updatedTpl : t));
      }
      return [updatedTpl, ...prev];
    });
    setCurrentView('dashboard');
  };

  if (currentView === 'builder') {
    return (
      <TemplateBuilderPage
        template={activeTemplate}
        onSave={handleSaveBuilder}
        onBack={() => setCurrentView('dashboard')}
        onPreview={(tpl) => setPreviewTemplate(tpl)}
      />
    );
  }

  if (currentView === 'assignment') {
    return (
      <TemplateAssignmentPage
        templates={templates}
        onBack={() => setCurrentView('dashboard')}
      />
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-warning-soft text-amber-900 font-mono text-[10px] uppercase font-bold">
              Phase 3.14 CMS Core
            </span>
            <span className="text-xs font-mono text-text-muted">Blueprint Engine</span>
          </div>
          <h1 className="font-serif font-bold text-2xl text-text-primary mt-1">Page Template Manager</h1>
          <p className="text-xs text-text-muted mt-0.5">
            Centralized structural blueprint engine for dynamic page composition across luxury storefront routes.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <TemplateToolbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onCreateClick={handleCreateTemplate}
        onAssignClick={() => setCurrentView('assignment')}
      />

      {/* Grid / List */}
      <TemplateGrid
        templates={filteredTemplates}
        viewMode={viewMode}
        onEdit={handleEditTemplate}
        onPreview={(tpl) => setPreviewTemplate(tpl)}
        onDuplicate={handleDuplicateTemplate}
        onAssign={() => setCurrentView('assignment')}
        onInspect={(tpl) => setDrawerTemplate(tpl)}
        onDelete={handleDeleteTemplate}
      />

      {/* Details Drawer */}
      <TemplateDetailsDrawer
        template={drawerTemplate}
        isOpen={!!drawerTemplate}
        onClose={() => setDrawerTemplate(null)}
        onEdit={(tpl) => {
          setDrawerTemplate(null);
          handleEditTemplate(tpl);
        }}
        onPreview={(tpl) => setPreviewTemplate(tpl)}
        onDuplicate={handleDuplicateTemplate}
        onAssign={() => setCurrentView('assignment')}
      />

      {/* Preview Modal */}
      <TemplatePreviewModal
        template={previewTemplate}
        isOpen={!!previewTemplate}
        onClose={() => setPreviewTemplate(null)}
      />
    </div>
  );
}
