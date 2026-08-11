import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiArrowLeft, FiSave, FiInfo, FiSliders, FiList, FiLayout, FiEye 
} from 'react-icons/fi';
import CatalogStatusBadge from '../../../components/commerce/shared/CatalogStatusBadge';
import AttributeValueEditor from '../../../components/commerce/attributes/AttributeValueEditor';

const TABS = [
  { id: 'basic', label: 'Basic Info', icon: FiInfo },
  { id: 'behavior', label: 'Behavior & Usage', icon: FiSliders },
  { id: 'values', label: 'Attribute Values', icon: FiList },
  { id: 'display', label: 'Display Settings', icon: FiLayout }
];

export default function AttributeEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new';

  const [activeTab, setActiveTab] = useState('basic');
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    type: 'select',
    group: 'General',
    status: 'draft',
    // Behavior
    required: false,
    filterable: true,
    searchable: true,
    sortable: false,
    variantEnabled: false,
    visibleOnProduct: true,
    visibleInSpecs: true,
    visibleInCompare: true,
    useInCard: false,
    // Display
    displayType: 'text',
    // Values
    values: []
  });

  useEffect(() => {
    if (!isNew) {
      setFormData({
        name: 'Material',
        slug: 'material',
        description: 'Primary material used in the furniture piece.',
        type: 'select',
        group: 'Materials',
        status: 'published',
        required: true,
        filterable: true,
        searchable: true,
        sortable: false,
        variantEnabled: true,
        visibleOnProduct: true,
        visibleInSpecs: true,
        visibleInCompare: true,
        useInCard: false,
        displayType: 'text',
        values: [
          { id: 'v1', label: 'Solid Wood', slug: 'solid-wood', order: 0 },
          { id: 'v2', label: 'Engineered Wood', slug: 'engineered-wood', order: 1 },
          { id: 'v3', label: 'Metal', slug: 'metal', order: 2 },
          { id: 'v4', label: 'Glass', slug: 'glass', order: 3 },
          { id: 'v5', label: 'Fabric', slug: 'fabric', order: 4 },
          { id: 'v6', label: 'Leather', slug: 'leather', order: 5 }
        ]
      });
    }
  }, [id, isNew]);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      navigate('/admin/catalog/attributes');
    }, 800);
  };

  const hasValues = ['select', 'multi_select', 'radio', 'color', 'image_swatch'].includes(formData.type);

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-[#F7F5F2]">
      <header className="shrink-0 bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin/catalog/attributes')}
            className="p-2 -ml-2 text-stone-400 hover:text-stone-900 transition-colors rounded-lg hover:bg-stone-50"
          >
            <FiArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-serif font-bold text-xl text-stone-900">
                {isNew ? 'Create Attribute' : formData.name}
              </h1>
              {!isNew && <CatalogStatusBadge status={formData.status} />}
            </div>
            <p className="text-xs text-stone-500 font-mono mt-1">
              {isNew ? 'New Attribute' : `Slug: /${formData.slug}`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select 
            value={formData.status}
            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
            className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm font-semibold text-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-900"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 text-stone-700 rounded-lg text-sm font-semibold hover:bg-stone-50 transition-colors shadow-sm"
          >
            <FiEye size={16} /> Preview
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2 bg-stone-900 text-white rounded-lg text-sm font-semibold hover:bg-stone-800 transition-colors shadow-sm disabled:opacity-50"
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <FiSave size={16} />
            )}
            {isSaving ? 'Saving...' : 'Save Attribute'}
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <nav className="w-64 shrink-0 bg-white border-r border-stone-200 overflow-y-auto py-6">
          <ul className="space-y-1 px-4">
            {TABS.map(tab => {
              if (tab.id === 'values' && !hasValues) return null;
              
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isActive 
                        ? 'bg-amber-50 text-amber-900' 
                        : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                    }`}
                  >
                    <Icon size={18} className={isActive ? 'text-amber-600' : 'text-stone-400'} />
                    {tab.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-3xl mx-auto pb-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-xl border border-stone-200 shadow-sm p-8"
              >
                {activeTab === 'basic' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-serif font-bold text-stone-900 mb-1">Basic Information</h2>
                      <p className="text-sm text-stone-500">Core details for this product attribute.</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">Attribute Name</label>
                        <input 
                          type="text" 
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm font-medium text-stone-900"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">URL Slug</label>
                        <input 
                          type="text" 
                          value={formData.slug}
                          onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                          className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm font-mono text-stone-900"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">Attribute Type</label>
                          <select 
                            value={formData.type}
                            onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                            className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm font-medium text-stone-900"
                          >
                            <option value="text">Text (Single Line)</option>
                            <option value="long_text">Text (Multi Line)</option>
                            <option value="number">Number</option>
                            <option value="decimal">Decimal</option>
                            <option value="boolean">Boolean (Yes/No)</option>
                            <option value="select">Select (Single)</option>
                            <option value="multi_select">Select (Multiple)</option>
                            <option value="radio">Radio Buttons</option>
                            <option value="color">Color Swatch</option>
                            <option value="image_swatch">Image Swatch</option>
                            <option value="measurement">Measurement (with units)</option>
                            <option value="date">Date</option>
                            <option value="range">Range</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">Attribute Group</label>
                          <select 
                            value={formData.group}
                            onChange={(e) => setFormData(prev => ({ ...prev, group: e.target.value }))}
                            className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm font-medium text-stone-900"
                          >
                            <option value="General">General</option>
                            <option value="Materials">Materials</option>
                            <option value="Dimensions">Dimensions</option>
                            <option value="Finish">Finish</option>
                            <option value="Care">Care</option>
                            <option value="Warranty">Warranty</option>
                            <option value="Shipping">Shipping</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">Description / Tooltip</label>
                        <textarea 
                          rows={3}
                          value={formData.description}
                          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Optional help text to display next to the attribute."
                          className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm text-stone-900 resize-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'behavior' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-serif font-bold text-stone-900 mb-1">Behavior & Usage</h2>
                      <p className="text-sm text-stone-500">Configure how this attribute operates within the catalog.</p>
                    </div>

                    <div className="space-y-1 divide-y divide-stone-100">
                      {[
                        { key: 'required', label: 'Required Field', desc: 'Editors must provide a value when creating a product.' },
                        { key: 'variantEnabled', label: 'Variant Attribute', desc: 'Use this attribute to generate product variants (e.g., Size, Color).' },
                        { key: 'filterable', label: 'Filterable', desc: 'Allow customers to filter products by this attribute in the storefront.' },
                        { key: 'searchable', label: 'Searchable', desc: 'Include this attribute\'s values in global search results.' },
                        { key: 'sortable', label: 'Sortable', desc: 'Allow customers to sort product lists using this attribute.' },
                        { key: 'visibleOnProduct', label: 'Visible on Product Page', desc: 'Display this attribute in the product details section.' },
                        { key: 'visibleInSpecs', label: 'Visible in Specifications', desc: 'Include this in the technical specification table.' },
                        { key: 'visibleInCompare', label: 'Visible in Comparison', desc: 'Show this row when customers compare products side-by-side.' },
                        { key: 'useInCard', label: 'Use in Product Card', desc: 'Show a preview of this attribute on product grid cards (e.g., color swatches).' },
                      ].map((item) => (
                        <div key={item.key} className="py-4 flex items-start justify-between">
                          <div>
                            <p className="text-sm font-bold text-stone-900">{item.label}</p>
                            <p className="text-xs text-stone-500 mt-0.5">{item.desc}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                            <input 
                              type="checkbox" 
                              className="sr-only peer"
                              checked={formData[item.key]}
                              onChange={(e) => setFormData(prev => ({ ...prev, [item.key]: e.target.checked }))}
                            />
                            <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-stone-900 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-stone-900"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'values' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-serif font-bold text-stone-900 mb-1">Attribute Values</h2>
                      <p className="text-sm text-stone-500">Manage the predefined list of choices for this attribute.</p>
                    </div>

                    <AttributeValueEditor 
                      attributeType={formData.type} 
                      values={formData.values}
                      onChange={(newValues) => setFormData(prev => ({ ...prev, values: newValues }))}
                    />
                  </div>
                )}

                {activeTab === 'display' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-serif font-bold text-stone-900 mb-1">Display Settings</h2>
                      <p className="text-sm text-stone-500">Configure how this attribute visually renders on the storefront.</p>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-3">Storefront Representation</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {[
                          { id: 'text', label: 'Plain Text' },
                          { id: 'badge', label: 'Badge / Pill' },
                          { id: 'swatch', label: 'Text Swatch' },
                          { id: 'color', label: 'Color Swatch' },
                          { id: 'image', label: 'Image Swatch' },
                          { id: 'progress', label: 'Progress Bar' }
                        ].map((type) => (
                          <label key={type.id} className="cursor-pointer">
                            <input 
                              type="radio" 
                              name="displayType" 
                              className="sr-only peer"
                              checked={formData.displayType === type.id}
                              onChange={() => setFormData(prev => ({ ...prev, displayType: type.id }))}
                            />
                            <div className="px-4 py-3 rounded-xl border-2 peer-checked:border-stone-900 peer-checked:bg-stone-50 border-stone-200 hover:border-stone-300 transition-all text-center">
                              <span className="text-sm font-semibold text-stone-900">{type.label}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
