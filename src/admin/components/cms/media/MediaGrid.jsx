import MediaCard from './MediaCard';
import { FiImage, FiFileText, FiStar, FiEye, FiDownload, FiTrash2, FiCheckSquare, FiSquare } from 'react-icons/fi';
import { cn } from '../../../../utils/cn';

export default function MediaGrid({
  assets,
  selectedIds,
  onSelectAsset,
  onSelectAll,
  onPreviewAsset,
  onToggleFavorite,
  viewMode
}) {
  const allSelected = assets.length > 0 && selectedIds.length === assets.length;

  if (assets.length === 0) {
    return (
      <div className="bg-surface border border-black/5 rounded-xl p-12 text-center flex flex-col items-center justify-center my-6 shadow-xs">
        <div className="w-16 h-16 rounded-full bg-background border border-black/5 flex items-center justify-center text-gray-300 mb-4">
          <FiImage size={28} />
        </div>
        <h3 className="text-sm font-bold text-text-primary">No Assets Found</h3>
        <p className="text-xs text-text-muted mt-1 max-w-sm leading-relaxed">
          No media files match your current search criteria or folder filters. Try adjusting filters or uploading new files.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Selection Control Bar */}
      <div className="flex items-center justify-between text-xs text-text-muted font-medium px-1">
        <button
          onClick={onSelectAll}
          className="flex items-center gap-2 hover:text-text-primary transition-colors cursor-pointer"
        >
          {allSelected ? <FiCheckSquare size={16} className="text-text-primary" /> : <FiSquare size={16} />}
          <span>{allSelected ? "Deselect All" : "Select All On Screen"}</span>
        </button>

        <span className="text-[11px] font-mono text-text-muted">
          Showing {assets.length} items
        </span>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
          {assets.map((asset) => (
            <MediaCard
              key={asset.id}
              asset={asset}
              isSelected={selectedIds.includes(asset.id)}
              onSelect={onSelectAsset}
              onPreview={onPreviewAsset}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      ) : (
        /* List View */
        <div className="bg-surface border border-black/5 rounded-xl overflow-hidden shadow-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-background border-b border-black/5 text-[10px] font-bold text-text-muted uppercase tracking-widest">
                <th className="p-3 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={onSelectAll}
                    className="rounded border-black/20"
                  />
                </th>
                <th className="p-3">Asset</th>
                <th className="p-3 hidden sm:table-cell">Folder</th>
                <th className="p-3 hidden md:table-cell">Dimensions</th>
                <th className="p-3 font-mono">Size</th>
                <th className="p-3 hidden lg:table-cell">Updated</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 text-xs">
              {assets.map((asset) => {
                const isSelected = selectedIds.includes(asset.id);
                return (
                  <tr 
                    key={asset.id} 
                    className={cn(
                      "hover:bg-background/80 transition-colors group cursor-pointer",
                      isSelected && "bg-blue-50/40"
                    )}
                    onClick={() => onPreviewAsset(asset)}
                  >
                    <td className="p-3 text-center" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onSelectAsset(asset.id)}
                        className="rounded border-black/20 cursor-pointer"
                      />
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-black/5 flex items-center justify-center">
                          {asset.type === 'document' ? (
                            <FiFileText size={18} className="text-text-muted" />
                          ) : (
                            <img src={asset.url} alt={asset.title} className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-text-primary truncate max-w-[180px]">{asset.title}</div>
                          <div className="text-[10px] font-mono text-text-muted">{asset.fileName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 hidden sm:table-cell text-text-muted font-medium">
                      {asset.folder}
                    </td>
                    <td className="p-3 hidden md:table-cell font-mono text-text-muted text-[11px]">
                      {asset.dimensions || 'N/A'}
                    </td>
                    <td className="p-3 font-mono text-text-muted text-[11px]">
                      {asset.size}
                    </td>
                    <td className="p-3 hidden lg:table-cell text-text-muted text-[11px]">
                      {asset.createdAt}
                    </td>
                    <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1 opacity-80 group-hover:opacity-100">
                        <button
                          onClick={() => onToggleFavorite(asset.id)}
                          className={cn("p-1.5 rounded hover:bg-black/5", asset.favorite ? "text-amber-500" : "text-text-muted")}
                        >
                          <FiStar size={14} className={asset.favorite ? "fill-amber-500" : ""} />
                        </button>
                        <button
                          onClick={() => onPreviewAsset(asset)}
                          className="p-1.5 rounded hover:bg-black/5 text-text-muted hover:text-text-primary"
                          title="Preview"
                        >
                          <FiEye size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
