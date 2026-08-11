import TemplateCard from './TemplateCard';
import StatusBadge from './StatusBadge';
import { FiEdit2, FiEye, FiCopy, FiSliders, FiTrash2, FiInfo, FiLayers } from 'react-icons/fi';

export default function TemplateGrid({
  templates = [],
  viewMode = 'grid',
  onEdit,
  onPreview,
  onDuplicate,
  onAssign,
  onInspect,
  onDelete
}) {
  if (templates.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-stone-200 p-12 text-center my-6">
        <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center mx-auto mb-3">
          <FiLayers size={24} />
        </div>
        <h3 className="font-serif font-bold text-stone-900 text-lg">No Page Templates Found</h3>
        <p className="text-stone-500 text-sm max-w-md mx-auto mt-1">
          No template blueprints match your current filter criteria. Create a new template or adjust search parameters.
        </p>
      </div>
    );
  }

  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((tpl) => (
          <TemplateCard
            key={tpl.id}
            template={tpl}
            onEdit={onEdit}
            onPreview={onPreview}
            onDuplicate={onDuplicate}
            onAssign={onAssign}
            onInspect={onInspect}
            onDelete={onDelete}
          />
        ))}
      </div>
    );
  }

  // List View
  return (
    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-stone-50 border-b border-stone-200 text-[11px] font-mono uppercase text-stone-500 tracking-wider">
              <th className="py-3 px-4 font-bold">Template Name</th>
              <th className="py-3 px-4 font-bold">Type</th>
              <th className="py-3 px-4 font-bold">Status</th>
              <th className="py-3 px-4 font-bold">Version</th>
              <th className="py-3 px-4 font-bold">Assigned Routes</th>
              <th className="py-3 px-4 font-bold">Updated</th>
              <th className="py-3 px-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 text-sm">
            {templates.map((tpl) => (
              <tr key={tpl.id} className="hover:bg-stone-50/80 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="font-serif font-bold text-stone-900">{tpl.name}</div>
                  <div className="text-xs text-stone-500 line-clamp-1">{tpl.description}</div>
                </td>
                <td className="py-3.5 px-4 font-mono text-xs font-semibold text-stone-700">
                  {tpl.type}
                </td>
                <td className="py-3.5 px-4">
                  <StatusBadge status={tpl.status} />
                </td>
                <td className="py-3.5 px-4 font-mono text-xs text-stone-600 font-medium">
                  v{tpl.version}
                </td>
                <td className="py-3.5 px-4 max-w-xs">
                  <div className="flex flex-wrap gap-1">
                    {tpl.assignedPages && tpl.assignedPages.length > 0 ? (
                      tpl.assignedPages.slice(0, 2).map((p, i) => (
                        <span key={i} className="bg-stone-100 px-2 py-0.5 rounded text-[10px] font-mono text-stone-700">
                          {p}
                        </span>
                      ))
                    ) : (
                      <span className="text-stone-400 italic text-xs">Unassigned</span>
                    )}
                    {tpl.assignedPages && tpl.assignedPages.length > 2 && (
                      <span className="text-[10px] text-stone-500 font-mono self-center">
                        +{tpl.assignedPages.length - 2}
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-3.5 px-4 text-xs font-mono text-stone-500">
                  {tpl.updatedAt || 'Recently'}
                </td>
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onEdit && onEdit(tpl)}
                      className="p-1.5 hover:bg-stone-100 text-stone-700 rounded"
                      title="Edit Blueprint"
                    >
                      <FiEdit2 size={15} />
                    </button>
                    <button
                      onClick={() => onPreview && onPreview(tpl)}
                      className="p-1.5 hover:bg-stone-100 text-stone-700 rounded"
                      title="Preview"
                    >
                      <FiEye size={15} />
                    </button>
                    <button
                      onClick={() => onAssign && onAssign(tpl)}
                      className="p-1.5 hover:bg-stone-100 text-stone-700 rounded"
                      title="Assign Routes"
                    >
                      <FiSliders size={15} />
                    </button>
                    <button
                      onClick={() => onInspect && onInspect(tpl)}
                      className="p-1.5 hover:bg-stone-100 text-stone-700 rounded"
                      title="Details"
                    >
                      <FiInfo size={15} />
                    </button>
                    <button
                      onClick={() => onDelete && onDelete(tpl.id)}
                      className="p-1.5 hover:bg-red-50 text-red-600 rounded"
                      title="Delete"
                    >
                      <FiTrash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
