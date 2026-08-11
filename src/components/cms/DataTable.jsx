import React from 'react';

export default function DataTable({ data, columns, searchPlaceholder }) {
  if (!data || data.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        No records found.
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      {searchPlaceholder && (
        <div className="p-4 border-b border-black/5">
          <input 
            type="text" 
            placeholder={searchPlaceholder} 
            className="w-full sm:w-64 px-4 py-2 bg-gray-50 border border-black/10 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-black/20"
          />
        </div>
      )}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-black/5 bg-gray-50">
            {columns.map((col, idx) => (
              <th key={idx} className="py-3 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-black/5">
          {data.map((item, rowIdx) => (
            <tr key={rowIdx} className="hover:bg-gray-50/50 transition-colors">
              {columns.map((col, colIdx) => (
                <td key={colIdx} className="py-3 px-6 text-sm text-gray-900">
                  {col.render ? col.render(item[col.key], item) : item[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
