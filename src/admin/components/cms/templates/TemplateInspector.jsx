import { 
  FiSliders, FiCheckCircle, FiTrash2, FiLayers, 
  FiEye, FiGlobe, FiDatabase, FiTag
} from 'react-icons/fi';
import StatusBadge from './StatusBadge';

export default function TemplateInspector({ template, activeSlot, onUpdateSlot, onClose }) {
  if (!template) return null;

  return (
    <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-5 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-stone-200">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-stone-100 text-stone-800">
            <FiSliders size={18} />
          </div>
          <div>
            <h3 className="font-serif font-bold text-stone-900 text-sm">Template Inspector & Data Bindings</h3>
            <p className="text-xs text-stone-500">Configure global layout parameters and dynamic content rules</p>
          </div>
        </div>
        <StatusBadge status={template.status} />
      </div>

      {/* Global Template Meta */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200">
          <div className="text-[10px] font-mono text-stone-400 uppercase font-bold">Blueprint Type</div>
          <div className="font-semibold text-stone-900 mt-0.5">{template.type} ({template.category})</div>
        </div>
        <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200">
          <div className="text-[10px] font-mono text-stone-400 uppercase font-bold">Theme / Frame</div>
          <div className="font-semibold text-stone-900 mt-0.5">{template.theme || 'Aurelian Luxury'}</div>
        </div>
      </div>

      {/* Dynamic Placeholder Configuration */}
      <div className="space-y-3 pt-2 border-t border-stone-100">
        <div className="flex items-center justify-between">
          <h4 className="font-serif font-bold text-xs text-stone-900 uppercase tracking-wider">
            Active Content Bindings ({template.placeholders?.length || 0})
          </h4>
          <span className="text-[10px] font-mono bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-bold">
            Runtime Injected
          </span>
        </div>

        <div className="space-y-2">
          {(template.placeholders || []).map((pl, idx) => (
            <div
              key={idx}
              className="p-3 bg-stone-50 rounded-lg border border-stone-200 hover:border-amber-400 transition-colors flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded bg-amber-100 text-amber-900">
                  <FiDatabase size={14} />
                </div>
                <div>
                  <div className="font-semibold text-stone-900">{pl.label || pl.type}</div>
                  <div className="text-[10px] font-mono text-stone-500">Key: {pl.type}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono bg-white border border-stone-200 px-2 py-0.5 rounded text-stone-600 font-medium">
                  {pl.category || 'Dynamic'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Layout Structure Overview */}
      <div className="space-y-2 pt-2 border-t border-stone-100 text-xs">
        <h4 className="font-serif font-bold text-xs text-stone-900 uppercase tracking-wider">
          Included Layout Sections ({template.sections?.length || 0})
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {(template.sections || []).map((sec, i) => (
            <span key={i} className="px-2.5 py-1 bg-stone-100 text-stone-800 rounded font-medium border border-stone-200">
              {sec.title || sec.type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
