import { useState } from 'react';
import { 
  FiSliders, FiCheck, FiSave, FiAlertCircle, FiTag, 
  FiShoppingBag, FiGrid, FiFolder, FiBriefcase, FiBookOpen, FiArrowLeft, FiPlus, FiTrash2
} from 'react-icons/fi';

export default function TemplateAssignmentPage({ templates = [], onSaveAssignments, onBack }) {
  const [assignments, setAssignments] = useState({
    defaultProductTemplate: 'tpl-product-master',
    defaultCategoryTemplate: 'tpl-category-master',
    defaultCollectionTemplate: 'tpl-collection-sanctuary',
    defaultBrandTemplate: 'tpl-brand-story',
    defaultCampaignTemplate: 'tpl-campaign-summer',
    defaultBlogTemplate: 'tpl-article-standard'
  });

  const [overrides, setOverrides] = useState([
    {
      id: 'ov-1',
      pageType: 'Product Page',
      condition: 'Category === "Seating"',
      templateId: 'tpl-product-seating-vip',
      priority: 10
    },
    {
      id: 'ov-2',
      pageType: 'Collection Page',
      condition: 'Tag === "Limited Edition"',
      templateId: 'tpl-collection-sanctuary',
      priority: 20
    }
  ]);

  const [isSaved, setIsSaved] = useState(false);

  const handleAssignmentChange = (key, value) => {
    setAssignments((prev) => ({ ...prev, [key]: value }));
    setIsSaved(false);
  };

  const handleSave = () => {
    if (onSaveAssignments) {
      onSaveAssignments({ assignments, overrides });
    }
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const addOverrideRule = () => {
    setOverrides((prev) => [
      ...prev,
      {
        id: `ov-${Date.now()}`,
        pageType: 'Product Page',
        condition: 'Tag === "Custom Flag"',
        templateId: templates[0]?.id || 'tpl-product-master',
        priority: 5
      }
    ]);
  };

  const removeOverride = (id) => {
    setOverrides((prev) => prev.filter((o) => o.id !== id));
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 text-text-muted hover:text-text-primary bg-stone-100 rounded-lg transition-colors"
          >
            <FiArrowLeft size={18} />
          </button>
          <div>
            <h1 className="font-serif font-bold text-2xl text-text-primary">Template Assignment Engine</h1>
            <p className="text-xs text-text-muted mt-0.5">
              Configure default page templates and high-priority conditional override rules across storefront categories.
            </p>
          </div>
        </div>

        <button
          onClick={handleSave}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs transition-all shadow-sm ${
            isSaved 
              ? 'bg-emerald-600 text-white' 
              : 'bg-primary hover:bg-primary-hover text-white'
          }`}
        >
          {isSaved ? <FiCheck size={16} /> : <FiSave size={16} />}
          {isSaved ? 'Assignments Saved' : 'Save Routing Rules'}
        </button>
      </div>

      {/* Primary Default Template Mappings */}
      <div className="bg-surface rounded-xl border border-border p-6 shadow-sm space-y-5">
        <div>
          <h2 className="font-serif font-bold text-base text-text-primary">Global Default Templates</h2>
          <p className="text-xs text-text-muted">
            When a page or product does not match an explicit override rule, the system renders using these defaults.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Default */}
          <div className="p-4 bg-background border border-border rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-serif font-bold text-text-primary">
              <FiShoppingBag className="text-amber-800" size={16} />
              Default Product Detail Template
            </div>
            <select
              value={assignments.defaultProductTemplate}
              onChange={(e) => handleAssignmentChange('defaultProductTemplate', e.target.value)}
              className="w-full px-3 py-2 bg-surface border border-border-hover rounded-lg text-xs font-semibold text-text-primary focus:ring-2 focus:ring-stone-900"
            >
              {templates.filter((t) => t.type === 'Commerce').map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} (v{t.version})
                </option>
              ))}
            </select>
          </div>

          {/* Collection Default */}
          <div className="p-4 bg-background border border-border rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-serif font-bold text-text-primary">
              <FiGrid className="text-amber-800" size={16} />
              Default Collection Page Template
            </div>
            <select
              value={assignments.defaultCollectionTemplate}
              onChange={(e) => handleAssignmentChange('defaultCollectionTemplate', e.target.value)}
              className="w-full px-3 py-2 bg-surface border border-border-hover rounded-lg text-xs font-semibold text-text-primary focus:ring-2 focus:ring-stone-900"
            >
              {templates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} (v{t.version})
                </option>
              ))}
            </select>
          </div>

          {/* Category Default */}
          <div className="p-4 bg-background border border-border rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-serif font-bold text-text-primary">
              <FiFolder className="text-amber-800" size={16} />
              Default Category Page Template
            </div>
            <select
              value={assignments.defaultCategoryTemplate}
              onChange={(e) => handleAssignmentChange('defaultCategoryTemplate', e.target.value)}
              className="w-full px-3 py-2 bg-surface border border-border-hover rounded-lg text-xs font-semibold text-text-primary focus:ring-2 focus:ring-stone-900"
            >
              {templates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} (v{t.version})
                </option>
              ))}
            </select>
          </div>

          {/* Blog / Article Default */}
          <div className="p-4 bg-background border border-border rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-serif font-bold text-text-primary">
              <FiBookOpen className="text-amber-800" size={16} />
              Default Editorial & Article Template
            </div>
            <select
              value={assignments.defaultBlogTemplate}
              onChange={(e) => handleAssignmentChange('defaultBlogTemplate', e.target.value)}
              className="w-full px-3 py-2 bg-surface border border-border-hover rounded-lg text-xs font-semibold text-text-primary focus:ring-2 focus:ring-stone-900"
            >
              {templates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} (v{t.version})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Priority Override Rules */}
      <div className="bg-surface rounded-xl border border-border p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif font-bold text-base text-text-primary">Priority Override Rules</h2>
            <p className="text-xs text-text-muted">
              Rules with higher priority values take precedence over default category mappings.
            </p>
          </div>
          <button
            onClick={addOverrideRule}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold transition-colors"
          >
            <FiPlus size={14} /> Add Override Rule
          </button>
        </div>

        <div className="space-y-3">
          {overrides.map((ov) => (
            <div key={ov.id} className="p-4 bg-background rounded-xl border border-border flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-amber-200 text-amber-900 font-mono font-bold rounded text-[10px]">
                  Priority {ov.priority}
                </span>
                <div>
                  <div className="font-semibold text-text-primary">{ov.pageType}</div>
                  <div className="text-text-muted font-mono text-[11px]">When {ov.condition}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-text-muted font-mono">Use Template:</span>
                <select
                  value={ov.templateId}
                  onChange={(e) => {
                    const val = e.target.value;
                    setOverrides((prev) => prev.map((o) => o.id === ov.id ? { ...o, templateId: val } : o));
                  }}
                  className="px-3 py-1.5 bg-surface border border-border-hover rounded-lg text-xs font-semibold text-text-primary"
                >
                  {templates.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => removeOverride(ov.id)}
                  className="p-1.5 text-text-muted hover:text-danger rounded transition-colors"
                  title="Remove Rule"
                >
                  <FiTrash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
