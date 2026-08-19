import { useState } from 'react';
import { FiSearch, FiFilter, FiEdit2, FiCheckCircle, FiAlertTriangle, FiXCircle, FiCheckSquare, FiSquare, FiSliders, FiTrash2, FiTag, FiEye } from 'react-icons/fi';
import { cn } from '../../../../utils/cn';

export default function IndexingTable({
  resources = [],
  onEditResource,
  onBulkNoindex,
  onBulkIndex
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResourceType, setSelectedResourceType] = useState('all'); // 'all' | 'products' | 'categories' | 'pages' | 'collections' | 'brands'
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'healthy' | 'warning' | 'noindex'
  const [selectedIds, setSelectedIds] = useState([]);

  // Filter logic
  const filtered = resources.filter(r => {
    // Resource type
    if (selectedResourceType !== 'all' && r.type !== selectedResourceType) return false;

    // Status filter
    if (statusFilter === 'noindex' && !r.isNoIndex) return false;
    if (statusFilter === 'warning' && r.seoScore >= 80) return false;
    if (statusFilter === 'healthy' && r.seoScore < 80) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = r.title.toLowerCase().includes(q);
      const matchSlug = r.slug.toLowerCase().includes(q);
      const matchSeoTitle = r.seoTitle?.toLowerCase().includes(q);
      if (!matchTitle && !matchSlug && !matchSeoTitle) return false;
    }

    return true;
  });

  const allSelected = filtered.length > 0 && selectedIds.length === filtered.length;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filtered.map(r => r.id));
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-4">
      {/* Search & Filter Toolbar */}
      <div className="bg-surface border border-black/5 rounded-xl p-3 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Left: Search input */}
        <div className="relative flex-1 min-w-[220px]">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={14} />
          <input
            type="text"
            placeholder="Search resources by name, slug, or title tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-background border border-black/10 rounded-lg text-xs focus:bg-surface focus:outline-none focus:border-black/30"
          />
        </div>

        {/* Center: Type Pills */}
        <div className="flex items-center bg-gray-100 p-1 rounded-lg border border-black/5 text-xs font-semibold overflow-x-auto">
          {['all', 'products', 'categories', 'pages', 'collections', 'brands'].map((t) => (
            <button
              key={t}
              onClick={() => setSelectedResourceType(t)}
              className={cn(
                "px-3 py-1 rounded-md capitalize transition-all whitespace-nowrap cursor-pointer",
                selectedResourceType === t
                  ? "bg-surface text-text-primary shadow-2xs font-bold"
                  : "text-text-muted hover:text-black"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Right: Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-1.5 bg-background border border-black/10 rounded-lg text-xs font-semibold text-text-secondary cursor-pointer"
        >
          <option value="all">All SEO Statuses</option>
          <option value="healthy">Healthy (80+ Score)</option>
          <option value="warning">SEO Warnings (&lt;80 Score)</option>
          <option value="noindex">Noindex Directives Only</option>
        </select>
      </div>

      {/* Bulk Action Bar if checked */}
      {selectedIds.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-center justify-between text-xs text-blue-900 font-semibold animate-in fade-in">
          <span>{selectedIds.length} resource(s) selected</span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onBulkIndex(selectedIds)}
              className="px-3 py-1 bg-surface border border-blue-300 rounded-lg hover:bg-blue-100 text-blue-900 font-bold"
            >
              Mark Index
            </button>
            <button
              onClick={() => onBulkNoindex(selectedIds)}
              className="px-3 py-1 bg-surface border border-red-300 rounded-lg hover:bg-danger-soft text-red-700 font-bold"
            >
              Set Noindex
            </button>
          </div>
        </div>
      )}

      {/* Indexing Table */}
      <div className="bg-surface border border-black/5 rounded-xl overflow-hidden shadow-2xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-background/80 border-b border-black/5 text-[10px] font-bold text-text-muted uppercase tracking-widest">
              <th className="p-3 w-10 text-center">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                  className="rounded border-black/20"
                />
              </th>
              <th className="p-3">Resource & Slug</th>
              <th className="p-3 hidden md:table-cell">SEO Title Tag</th>
              <th className="p-3 font-mono">Status</th>
              <th className="p-3 hidden lg:table-cell">Schema</th>
              <th className="p-3 font-mono">Score</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 text-xs">
            {filtered.map((item) => {
              const isSelected = selectedIds.includes(item.id);
              return (
                <tr
                  key={item.id}
                  className={cn(
                    "hover:bg-background/80 transition-colors group cursor-pointer",
                    isSelected && "bg-blue-50/40"
                  )}
                  onClick={() => onEditResource(item)}
                >
                  <td className="p-3 text-center" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelectOne(item.id)}
                      className="rounded border-black/20 cursor-pointer"
                    />
                  </td>

                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-black/5 text-[9px] font-mono font-bold uppercase text-text-secondary">
                        {item.type}
                      </span>
                      <div className="font-bold text-text-primary truncate max-w-[200px]">{item.title}</div>
                    </div>
                    <div className="text-[10px] font-mono text-text-muted mt-0.5">
                      /{item.type}/{item.slug}
                    </div>
                  </td>

                  <td className="p-3 hidden md:table-cell">
                    <div className="truncate max-w-[260px] text-text-secondary font-medium">
                      {item.seoTitle || <span className="italic text-text-muted">Not defined</span>}
                    </div>
                  </td>

                  <td className="p-3 font-mono text-[11px]">
                    {item.isNoIndex ? (
                      <span className="px-2 py-0.5 rounded bg-danger-soft text-red-700 font-bold text-[10px] uppercase">
                        noindex
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-success-soft text-success font-bold text-[10px] uppercase">
                        indexed
                      </span>
                    )}
                  </td>

                  <td className="p-3 hidden lg:table-cell">
                    <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 font-mono text-[10px] font-bold uppercase">
                      {item.schemaType || 'WebPage'}
                    </span>
                  </td>

                  <td className="p-3 font-mono font-bold">
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[11px]",
                      item.seoScore >= 80 ? "bg-success-soft text-green-800" :
                      item.seoScore >= 50 ? "bg-warning-soft text-amber-800" : "bg-danger-soft text-red-800"
                    )}>
                      {item.seoScore}/100
                    </span>
                  </td>

                  <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => onEditResource(item)}
                      className="px-3 py-1.5 border border-black/10 rounded-lg text-xs font-semibold text-text-secondary hover:bg-black/5 transition-colors flex items-center gap-1.5 ml-auto"
                    >
                      <FiEdit2 size={13} />
                      <span>Edit SEO</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
