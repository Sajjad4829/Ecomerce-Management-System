import { FiStar, FiEye, FiMoreVertical, FiFileText, FiVideo, FiCheck, FiDownload } from 'react-icons/fi';
import { cn } from '../../../../utils/cn';

export default function MediaCard({ asset, isSelected, onSelect, onPreview, onToggleFavorite }) {
  const isVideo = asset.type === 'video';
  const isDoc = asset.type === 'document';

  return (
    <div 
      onClick={() => onPreview(asset)}
      className={cn(
        "group relative bg-surface rounded-xl border border-black/5 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer flex flex-col",
        isSelected && "ring-2 ring-black border-transparent"
      )}
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden flex items-center justify-center">
        {isDoc ? (
          <div className="flex flex-col items-center gap-2 text-text-muted p-4">
            <FiFileText size={36} />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">{asset.format}</span>
          </div>
        ) : isVideo ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <img 
              src={asset.url} 
              alt={asset.alt || asset.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-surface/90 text-text-primary flex items-center justify-center shadow-lg">
                <FiVideo size={18} />
              </div>
            </div>
          </div>
        ) : (
          <img 
            src={asset.url} 
            alt={asset.alt || asset.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        )}

        {/* Checkbox for Bulk Select */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(asset.id);
          }}
          className={cn(
            "absolute top-2.5 left-2.5 w-6 h-6 rounded-md border flex items-center justify-center transition-all z-10",
            isSelected 
              ? "bg-[#1A1A1A] border-[#1A1A1A] text-white opacity-100" 
              : "bg-surface/90 border-black/20 text-transparent opacity-0 group-hover:opacity-100 hover:border-black"
          )}
        >
          <FiCheck size={14} strokeWidth={3} className={isSelected ? "block" : "hidden"} />
        </button>

        {/* Favorite Star */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(asset.id);
          }}
          className={cn(
            "absolute top-2.5 right-2.5 p-1.5 rounded-md bg-surface/90 backdrop-blur-xs transition-all z-10",
            asset.favorite 
              ? "text-amber-500 opacity-100" 
              : "text-text-muted hover:text-amber-500 opacity-0 group-hover:opacity-100"
          )}
          title="Toggle Favorite"
        >
          <FiStar size={14} className={asset.favorite ? "fill-amber-500" : ""} />
        </button>

        {/* Format Badge */}
        <span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-xs text-white text-[9px] font-mono font-bold uppercase">
          {asset.format}
        </span>
      </div>

      {/* Card Info Details */}
      <div className="p-3 flex flex-col justify-between flex-1 bg-surface">
        <div>
          <h4 className="text-xs font-bold text-text-primary truncate tracking-tight" title={asset.title}>
            {asset.title}
          </h4>
          <p className="text-[10px] text-text-muted mt-0.5 truncate font-mono">
            {asset.fileName}
          </p>
        </div>

        <div className="mt-2.5 pt-2 border-t border-black/5 flex items-center justify-between text-[10px] text-text-muted font-mono">
          <span>{asset.dimensions || `${asset.size}`}</span>
          <span>{asset.size}</span>
        </div>
      </div>
    </div>
  );
}
