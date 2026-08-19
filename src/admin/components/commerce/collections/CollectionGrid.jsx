import { FiEdit2, FiEye, FiCopy, FiTrash2, FiClock } from 'react-icons/fi';
import CatalogStatusBadge from '../shared/CatalogStatusBadge';

export default function CollectionGrid({ 
  collections, 
  selectedCollections, 
  onSelectOne,
  onEdit,
  onDuplicate,
  onDelete,
  onPreview
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {collections.map(collection => (
        <div 
          key={collection.id}
          className={`group bg-surface rounded-xl border transition-all duration-200 overflow-hidden flex flex-col ${
            selectedCollections.includes(collection.id) 
              ? 'border-stone-900 shadow-md ring-1 ring-stone-900' 
              : 'border-border hover:border-border-hover hover:shadow-md'
          }`}
          onClick={(e) => {
            if (e.target.type !== 'checkbox' && !e.target.closest('button')) {
              onEdit(collection.id);
            }
          }}
        >
          {/* Header Image */}
          <div className="relative h-48 bg-stone-100 overflow-hidden cursor-pointer">
            <img 
              src={collection.image} 
              alt={collection.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Checkbox overlay */}
            <div className="absolute top-4 left-4 z-10" onClick={e => e.stopPropagation()}>
              <div className="bg-surface/90 backdrop-blur-sm rounded p-1 shadow-sm">
                <input 
                  type="checkbox"
                  checked={selectedCollections.includes(collection.id)}
                  onChange={(e) => onSelectOne(collection.id, e.target.checked)}
                  className="w-4 h-4 rounded border-border-hover text-text-primary focus:ring-stone-900"
                />
              </div>
            </div>

            {/* Badges */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
              <CatalogStatusBadge status={collection.status} />
              <span className="px-2 py-1 bg-surface/90 backdrop-blur-sm text-text-secondary text-[10px] font-mono font-bold uppercase rounded shadow-sm">
                {collection.type}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-serif font-bold text-lg text-text-primary group-hover:text-warning transition-colors">
                  {collection.name}
                </h3>
                <p className="text-xs text-text-muted font-mono mt-0.5">/{collection.slug}</p>
              </div>
            </div>
            
            <p className="text-sm text-text-secondary line-clamp-2 mt-2 flex-1">
              {collection.description}
            </p>

            {/* Stats */}
            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] text-text-muted font-mono uppercase tracking-wider">Products</span>
                <span className="font-semibold text-text-primary">{collection.productCount}</span>
              </div>
              
              {collection.status === 'scheduled' && (
                <div className="flex flex-col items-end">
                  <span className="text-[10px] text-text-muted font-mono uppercase tracking-wider">Launches</span>
                  <div className="flex items-center gap-1 text-sm text-text-secondary font-medium">
                    <FiClock size={12} /> {new Date(collection.startAt).toLocaleDateString()}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Footer */}
          <div className="bg-background border-t border-stone-100 p-3 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button 
              onClick={(e) => { e.stopPropagation(); onPreview(collection); }}
              className="px-3 py-1.5 flex items-center gap-2 text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-stone-200 rounded transition-colors"
            >
              <FiEye size={14} /> Preview
            </button>
            <div className="flex items-center gap-1">
              <button 
                onClick={(e) => { e.stopPropagation(); onEdit(collection.id); }}
                className="p-1.5 text-text-muted hover:text-text-primary hover:bg-stone-200 rounded transition-colors"
                title="Edit"
              >
                <FiEdit2 size={14} />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); onDuplicate(collection.id); }}
                className="p-1.5 text-text-muted hover:text-text-primary hover:bg-stone-200 rounded transition-colors"
                title="Duplicate"
              >
                <FiCopy size={14} />
              </button>
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  if (window.confirm(`Are you sure you want to delete ${collection.name}?`)) {
                    onDelete(collection.id);
                  }
                }}
                className="p-1.5 text-text-muted hover:text-danger hover:bg-danger-soft rounded transition-colors"
                title="Delete"
              >
                <FiTrash2 size={14} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
