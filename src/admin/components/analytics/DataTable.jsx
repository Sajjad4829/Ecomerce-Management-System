import React, { useState, useMemo } from 'react';
import { FiChevronUp, FiChevronDown, FiSearch } from 'react-icons/fi';

export default function DataTable({ data, columns, searchPlaceholder = "Search..." }) {
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const processedData = useMemo(() => {
    let filtered = [...(data || [])];
    
    if (search) {
      filtered = filtered.filter(item => {
        return columns.some(col => {
          const val = item[col.key];
          return String(val).toLowerCase().includes(search.toLowerCase());
        });
      });
    }

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [data, search, sortConfig, columns]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return processedData.slice(start, start + rowsPerPage);
  }, [processedData, currentPage]);

  const totalPages = Math.ceil(processedData.length / rowsPerPage);

  if (!data || data.length === 0) {
    return (
      <div className="p-8 text-center text-text-muted">
        No records found.
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col h-full">
      <div className="p-4 border-b border-black/5 flex justify-between items-center bg-surface">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input 
            type="text" 
            placeholder={searchPlaceholder} 
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="pl-10 pr-4 py-2 w-full sm:w-64 bg-background border border-black/10 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-black/20 transition-all"
          />
        </div>
      </div>
      
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="border-b border-black/5 bg-background">
              {columns.map((col, idx) => (
                <th 
                  key={idx} 
                  onClick={() => col.sortable !== false && handleSort(col.key)}
                  className={`py-3 px-6 text-xs font-semibold uppercase tracking-wider text-text-muted \${col.sortable !== false ? 'cursor-pointer select-none hover:text-text-primary' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    {col.label}
                    {sortConfig.key === col.key && (
                      <span className="text-black">
                        {sortConfig.direction === 'asc' ? <FiChevronUp /> : <FiChevronDown />}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {paginatedData.map((item, rowIdx) => (
              <tr key={rowIdx} className="hover:bg-black/[0.02] transition-colors">
                {columns.map((col, colIdx) => (
                  <td key={colIdx} className="py-4 px-6 text-sm text-text-primary">
                    {col.render ? col.render(item[col.key], item) : item[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {paginatedData.length === 0 && (
          <div className="p-8 text-center text-text-muted">
            No matches found for "{search}"
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="p-4 border-t border-black/5 flex justify-between items-center bg-surface text-sm">
          <div className="text-text-muted">
            Showing {((currentPage - 1) * rowsPerPage) + 1} to {Math.min(currentPage * rowsPerPage, processedData.length)} of {processedData.length} results
          </div>
          <div className="flex gap-2">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="px-3 py-1 border border-black/10 rounded disabled:opacity-50 hover:bg-background"
            >
              Previous
            </button>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="px-3 py-1 border border-black/10 rounded disabled:opacity-50 hover:bg-background"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
