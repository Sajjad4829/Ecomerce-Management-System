import { useState } from 'react';
import { 
  FiArrowLeft, FiSave, FiEye, FiPlus, FiTrash2, 
  FiMove, FiSliders, FiGrid, FiBox, FiCheck, FiLayers, FiDatabase, FiTag
} from 'react-icons/fi';
import DynamicPlaceholder, { PLACEHOLDER_TYPES } from '../../../components/cms/templates/DynamicPlaceholder';
import StatusBadge from '../../../components/cms/templates/StatusBadge';

export default function TemplateBuilderPage({ template, onSave, onBack, onPreview }) {
  const [templateState, setTemplateState] = useState(template || {
    id: `tpl-${Date.now()}`,
    name: 'Untitled Blueprint Template',
    type: 'Commerce',
    category: 'Product Page',
    status: 'draft',
    version: '1.0.0',
    sections: [
      { id: 'sec-1', type: 'hero', title: 'Editorial Header' },
      { id: 'sec-2', type: 'dynamic', placeholderType: 'PRODUCT_TITLE' },
      { id: 'sec-3', type: 'dynamic', placeholderType: 'PRODUCT_GALLERY' },
      { id: 'sec-4', type: 'dynamic', placeholderType: 'PRODUCT_PRICING' },
      { id: 'sec-5', type: 'dynamic', placeholderType: 'PRODUCT_SPECS' }
    ],
    placeholders: [
      { type: 'PRODUCT_TITLE', label: 'Product Title Header', category: 'Commerce' },
      { type: 'PRODUCT_GALLERY', label: 'Product Image Gallery', category: 'Commerce' },
      { type: 'PRODUCT_PRICING', label: 'Pricing & Availability', category: 'Commerce' },
      { type: 'PRODUCT_SPECS', label: 'Technical Specs Table', category: 'Commerce' }
    ]
  });

  const [selectedSlotIndex, setSelectedSlotIndex] = useState(null);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleAddDynamicSlot = (placeholderTypeKey) => {
    const config = PLACEHOLDER_TYPES[placeholderTypeKey];
    if (!config) return;

    const newSec = {
      id: `sec-${Date.now()}`,
      type: 'dynamic',
      placeholderType: placeholderTypeKey
    };

    setTemplateState((prev) => ({
      ...prev,
      sections: [...prev.sections, newSec],
      placeholders: [
        ...prev.placeholders,
        { type: placeholderTypeKey, label: config.label, category: config.category }
      ]
    }));

    setShowAddMenu(false);
  };

  const handleAddStaticSection = (sectionName) => {
    const newSec = {
      id: `sec-${Date.now()}`,
      type: 'static',
      title: sectionName
    };

    setTemplateState((prev) => ({
      ...prev,
      sections: [...prev.sections, newSec]
    }));

    setShowAddMenu(false);
  };

  const handleRemoveSection = (idx) => {
    setTemplateState((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== idx)
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    if (onSave) onSave(templateState);
    setTimeout(() => setIsSaving(false), 800);
  };

  return (
    <div className="h-screen flex flex-col bg-stone-100 overflow-hidden">
      {/* Top Builder Bar */}
      <header className="h-16 bg-primary border-b border-stone-800 px-6 flex items-center justify-between text-white shrink-0 z-20">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 text-text-muted hover:text-white rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold"
          >
            <FiArrowLeft size={16} /> Exit Builder
          </button>
          <div className="h-4 w-px bg-stone-800" />
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={templateState.name}
              onChange={(e) => setTemplateState((prev) => ({ ...prev, name: e.target.value }))}
              className="bg-stone-800 border border-stone-700 text-white font-serif font-bold text-base px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <StatusBadge status={templateState.status} />
            <span className="text-[10px] font-mono text-text-muted">v{templateState.version}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onPreview && onPreview(templateState)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-xs font-semibold transition-colors"
          >
            <FiEye size={15} /> Live Preview
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-warning-soft0 hover:bg-amber-400 text-stone-950 font-bold rounded-lg text-xs transition-colors shadow-sm"
          >
            {isSaving ? <FiCheck size={16} /> : <FiSave size={16} />}
            {isSaving ? 'Saved' : 'Save Template Blueprint'}
          </button>
        </div>
      </header>

      {/* Main Workspace Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Library Sidebar */}
        <aside className="w-80 bg-surface border-r border-border flex flex-col justify-between overflow-y-auto p-4 space-y-4 shrink-0">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-border mb-3">
              <h3 className="font-serif font-bold text-text-primary text-sm">Blueprint Slot Library</h3>
              <span className="text-[10px] font-mono text-text-muted font-bold uppercase">Drag & Drop</span>
            </div>

            {/* Dynamic Content Placeholders List */}
            <div className="space-y-3">
              <div className="text-[10px] font-mono font-bold text-amber-900 uppercase tracking-wider bg-warning-soft p-1.5 rounded border border-amber-200">
                Commerce Dynamic Slots
              </div>

              {Object.keys(PLACEHOLDER_TYPES).map((key) => {
                const item = PLACEHOLDER_TYPES[key];
                return (
                  <button
                    key={key}
                    onClick={() => handleAddDynamicSlot(key)}
                    className="w-full text-left p-2.5 rounded-lg border border-border hover:border-amber-400 hover:bg-warning-soft/40 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="font-serif font-bold text-xs text-text-primary group-hover:text-amber-900">
                        {item.label}
                      </div>
                      <div className="text-[10px] text-text-muted font-mono">[{key}]</div>
                    </div>
                    <FiPlus size={14} className="text-text-muted group-hover:text-amber-800" />
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Center Visual Canvas */}
        <main className="flex-1 p-8 overflow-y-auto bg-stone-100 flex flex-col items-center">
          <div className="w-full max-w-4xl bg-surface shadow-xl rounded-2xl border border-border overflow-hidden space-y-0">
            {/* Announcement & Global Header Marker */}
            <div className="p-3 bg-stone-950 text-stone-300 text-center text-[10px] font-mono uppercase tracking-widest border-b border-stone-800">
              Global Header Frame (Managed by Theme System)
            </div>

            {/* Sections Canvas Container */}
            <div className="p-6 space-y-4 min-h-[500px]">
              {templateState.sections.map((sec, idx) => (
                <div key={sec.id} className="relative group">
                  {sec.type === 'dynamic' ? (
                    <DynamicPlaceholder
                      type={sec.placeholderType}
                      isSelected={selectedSlotIndex === idx}
                      onClick={() => setSelectedSlotIndex(idx)}
                    />
                  ) : (
                    <div className="p-4 border-2 border-border rounded-xl bg-background flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FiGrid className="text-text-muted" size={18} />
                        <div>
                          <span className="text-[9px] font-mono uppercase bg-stone-200 text-text-secondary px-1.5 py-0.5 rounded font-bold">
                            Static Section
                          </span>
                          <h4 className="font-serif font-bold text-sm text-text-primary">{sec.title}</h4>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Slot Controls Overlay */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-surface p-1 rounded-lg border border-border shadow-md">
                    <button
                      onClick={() => handleRemoveSection(idx)}
                      className="p-1 text-danger hover:bg-danger-soft rounded"
                      title="Remove Slot"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Global Footer Marker */}
            <div className="p-3 bg-stone-950 text-text-muted text-center text-[10px] font-mono uppercase tracking-widest border-t border-stone-800">
              Global Footer Frame
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
