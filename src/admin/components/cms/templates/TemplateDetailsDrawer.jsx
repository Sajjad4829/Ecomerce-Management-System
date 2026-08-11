import { useState } from 'react';
import { 
  FiX, FiEdit2, FiEye, FiCopy, FiSliders, FiClock, 
  FiLayers, FiGrid, FiBox, FiCheckCircle, FiGlobe
} from 'react-icons/fi';
import StatusBadge from './StatusBadge';
import TemplateHierarchy from './TemplateHierarchy';
import VersionPanel from './VersionPanel';

export default function TemplateDetailsDrawer({
  template,
  isOpen,
  onClose,
  onEdit,
  onPreview,
  onDuplicate,
  onAssign
}) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !template) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-200 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-lg">
              <FiLayers size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                  {template.type} Blueprint
                </span>
                <StatusBadge status={template.status} />
              </div>
              <h2 className="font-serif font-bold text-lg text-white">{template.name}</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-lg transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center border-b border-stone-200 bg-stone-50 px-5 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 border-b-2 transition-all ${
              activeTab === 'overview'
                ? 'border-stone-900 text-stone-900 font-bold bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            Overview & Specifications
          </button>
          <button
            onClick={() => setActiveTab('hierarchy')}
            className={`py-3 px-4 border-b-2 transition-all ${
              activeTab === 'hierarchy'
                ? 'border-stone-900 text-stone-900 font-bold bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            Architecture Hierarchy
          </button>
          <button
            onClick={() => setActiveTab('versions')}
            className={`py-3 px-4 border-b-2 transition-all ${
              activeTab === 'versions'
                ? 'border-stone-900 text-stone-900 font-bold bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            Version History
          </button>
        </div>

        {/* Drawer Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'overview' && (
            <>
              {/* Description & Metadata */}
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-3 text-xs">
                <div>
                  <div className="text-[10px] font-mono text-stone-400 uppercase font-bold">Template Purpose</div>
                  <p className="text-stone-700 leading-relaxed mt-1">
                    {template.description || 'Structural blueprint definition used for consistent page rendering across luxury storefront routes.'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-stone-200 text-stone-600">
                  <div>
                    <span className="font-mono text-stone-400 uppercase text-[10px] block">Category:</span>
                    <span className="font-semibold text-stone-900">{template.category}</span>
                  </div>
                  <div>
                    <span className="font-mono text-stone-400 uppercase text-[10px] block">Version:</span>
                    <span className="font-semibold text-stone-900">v{template.version}</span>
                  </div>
                  <div>
                    <span className="font-mono text-stone-400 uppercase text-[10px] block">Layout Frame:</span>
                    <span className="font-semibold text-stone-900">{template.layout || 'Standard Commerce'}</span>
                  </div>
                  <div>
                    <span className="font-mono text-stone-400 uppercase text-[10px] block">Last Modified:</span>
                    <span className="font-semibold text-stone-900">{template.updatedAt || '2026-08-08'}</span>
                  </div>
                </div>
              </div>

              {/* Assigned Routes */}
              <div className="space-y-2">
                <h4 className="font-serif font-bold text-sm text-stone-900 flex items-center gap-2">
                  <FiGlobe size={16} className="text-stone-500" />
                  Assigned Storefront Routes ({template.assignedPages?.length || 0})
                </h4>
                <div className="flex flex-wrap gap-1.5 p-3 bg-stone-50 border border-stone-200 rounded-xl">
                  {template.assignedPages && template.assignedPages.length > 0 ? (
                    template.assignedPages.map((route, idx) => (
                      <span
                        key={idx}
                        className="bg-white border border-stone-300 px-2.5 py-1 rounded text-xs font-mono text-stone-800 font-semibold shadow-2xs"
                      >
                        {route}
                      </span>
                    ))
                  ) : (
                    <span className="text-stone-400 text-xs italic">No pages directly bound to this template yet.</span>
                  )}
                </div>
              </div>

              {/* Sections & Placeholders Breakdown */}
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-stone-200 rounded-xl p-4 bg-white space-y-2">
                  <div className="flex items-center justify-between text-xs font-serif font-bold text-stone-900">
                    <span>Sections ({template.sections?.length || 0})</span>
                    <FiGrid size={14} className="text-stone-400" />
                  </div>
                  <ul className="space-y-1 text-xs text-stone-600">
                    {(template.sections || []).map((sec, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                        <span>{sec.title || sec.type}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border border-stone-200 rounded-xl p-4 bg-amber-50/30 space-y-2">
                  <div className="flex items-center justify-between text-xs font-serif font-bold text-amber-950">
                    <span>Dynamic Placeholders ({template.placeholders?.length || 0})</span>
                    <FiBox size={14} className="text-amber-600" />
                  </div>
                  <ul className="space-y-1 text-xs text-amber-900 font-mono">
                    {(template.placeholders || []).map((pl, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        <span>{pl.label || pl.type}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}

          {activeTab === 'hierarchy' && (
            <TemplateHierarchy template={template} />
          )}

          {activeTab === 'versions' && (
            <VersionPanel currentVersion={template.version} />
          )}
        </div>

        {/* Drawer Footer CTA */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onDuplicate && onDuplicate(template)}
              className="inline-flex items-center gap-1.5 px-3 py-2 border border-stone-300 hover:bg-white text-stone-800 rounded-lg text-xs font-semibold transition-colors"
            >
              <FiCopy size={14} /> Duplicate
            </button>
            <button
              onClick={() => onAssign && onAssign(template)}
              className="inline-flex items-center gap-1.5 px-3 py-2 border border-stone-300 hover:bg-white text-stone-800 rounded-lg text-xs font-semibold transition-colors"
            >
              <FiSliders size={14} /> Assign Routes
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onPreview && onPreview(template)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-stone-200 hover:bg-stone-300 text-stone-900 rounded-lg text-xs font-semibold transition-colors"
            >
              <FiEye size={14} /> Preview
            </button>
            <button
              onClick={() => onEdit && onEdit(template)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold transition-colors shadow-sm"
            >
              <FiEdit2 size={14} /> Edit Blueprint
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
