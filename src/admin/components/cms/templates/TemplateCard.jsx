import { 
  FiEdit2, FiEye, FiCopy, FiSliders, FiMoreVertical, 
  FiLayers, FiGrid, FiClock, FiFileText, FiTrash2, FiInfo
} from 'react-icons/fi';
import StatusBadge from './StatusBadge';

export default function TemplateCard({
  template,
  onEdit,
  onPreview,
  onDuplicate,
  onAssign,
  onInspect,
  onDelete
}) {
  const {
    id,
    name,
    type,
    category,
    status,
    assignedPages = [],
    version,
    updatedAt,
    thumbnail,
    sectionsCount = 0,
    placeholdersCount = 0,
    description
  } = template;

  return (
    <div className="group bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md hover:border-amber-300 transition-all duration-200 flex flex-col">
      {/* Thumbnail / Wireframe Header */}
      <div className="relative h-44 bg-stone-900 overflow-hidden flex items-center justify-center p-4">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={name}
            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full border border-stone-700/80 rounded bg-stone-950 p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[10px] text-stone-400 font-mono">
              <span className="flex items-center gap-1">
                <FiLayers size={11} className="text-amber-400" /> Header Wireframe
              </span>
              <span>v{version}</span>
            </div>
            
            {/* Mock Layout Slots */}
            <div className="space-y-1.5 my-auto">
              <div className="h-4 bg-stone-800 rounded flex items-center justify-center text-[9px] text-stone-400 font-mono">
                Hero Section
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <div className="h-6 bg-amber-950/60 border border-amber-800/50 rounded flex items-center justify-center text-[8px] text-amber-300 font-mono">
                  Dynamic Slot
                </div>
                <div className="h-6 bg-stone-850 border border-stone-800 rounded flex items-center justify-center text-[8px] text-stone-400 font-mono">
                  Spec Grid
                </div>
              </div>
            </div>

            <div className="text-[9px] text-stone-500 font-mono text-center">
              Footer Layout Block
            </div>
          </div>
        )}

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <StatusBadge status={status} />
          <span className="bg-stone-900/90 backdrop-blur text-stone-200 border border-stone-700 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase">
            {type}
          </span>
        </div>

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
          <button
            onClick={() => onEdit && onEdit(template)}
            className="p-2.5 bg-white text-stone-900 rounded-lg hover:bg-amber-400 transition-colors shadow-lg font-bold text-xs flex items-center gap-1.5"
            title="Edit Blueprint in Visual Builder"
          >
            <FiEdit2 size={14} /> Edit
          </button>
          <button
            onClick={() => onPreview && onPreview(template)}
            className="p-2.5 bg-stone-900 text-white border border-stone-700 rounded-lg hover:bg-stone-800 transition-colors shadow-lg text-xs flex items-center gap-1.5"
            title="Preview Template"
          >
            <FiEye size={14} /> Preview
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif font-bold text-base text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-1">
              {name}
            </h3>
            <button
              onClick={() => onInspect && onInspect(template)}
              className="text-stone-400 hover:text-stone-700 p-1"
              title="Inspect Details"
            >
              <FiInfo size={16} />
            </button>
          </div>
          
          <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
            {description || 'Structural blueprint definition for furniture storefront rendering.'}
          </p>
        </div>

        {/* Assigned Pages Pill */}
        <div className="bg-stone-50 rounded-lg p-2.5 border border-stone-100 text-xs">
          <div className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-wider mb-1">
            Assigned Routes ({assignedPages.length})
          </div>
          <div className="flex flex-wrap gap-1">
            {assignedPages.length > 0 ? (
              assignedPages.slice(0, 3).map((page, i) => (
                <span
                  key={i}
                  className="bg-white border border-stone-200 px-2 py-0.5 rounded text-[11px] font-mono text-stone-700 font-medium"
                >
                  {page}
                </span>
              ))
            ) : (
              <span className="text-stone-400 italic text-[11px]">Unassigned Blueprint</span>
            )}
            {assignedPages.length > 3 && (
              <span className="text-[10px] text-stone-500 font-mono self-center">
                +{assignedPages.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Footer Stats & Actions */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-3 text-[11px] font-mono">
            <span>{sectionsCount} Sec</span>
            <span>•</span>
            <span>{placeholdersCount} Slots</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onDuplicate && onDuplicate(template)}
              className="p-1.5 hover:bg-stone-100 text-stone-600 rounded transition-colors"
              title="Duplicate Template"
            >
              <FiCopy size={14} />
            </button>
            <button
              onClick={() => onAssign && onAssign(template)}
              className="p-1.5 hover:bg-stone-100 text-stone-600 rounded transition-colors"
              title="Assign Template Routes"
            >
              <FiSliders size={14} />
            </button>
            <button
              onClick={() => onDelete && onDelete(template.id)}
              className="p-1.5 hover:bg-red-50 text-red-600 rounded transition-colors"
              title="Delete Template"
            >
              <FiTrash2 size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
