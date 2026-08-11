import React from 'react';
import { useGlobalSearch } from '../../context/search/GlobalSearchContext';
import { FiPlay, FiEdit2, FiCopy, FiTrash2, FiSearch, FiClock, FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export default function SavedSearches() {
  const { savedSearches } = useGlobalSearch();
  const navigate = useNavigate();

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light text-text-primary tracking-wide mb-2">Saved Searches</h1>
          <p className="text-sm text-text-muted">Manage and execute your pre-configured enterprise queries.</p>
        </div>
        <button onClick={() => navigate('/admin/search/advanced')} className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors">
          New Saved Search
        </button>
      </div>

      <div className="bg-surface rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-background border-b border-stone-100">
              <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-widest">Search Name</th>
              <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-widest">Query</th>
              <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-widest">Owner</th>
              <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-widest">Last Used</th>
              <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {savedSearches.map((search) => (
              <tr key={search.id} className="hover:bg-background/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-text-primary">{search.name}</div>
                  <div className="text-xs text-text-muted mt-1">Updated {new Date(search.updatedAt).toLocaleDateString()}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-mono text-xs text-text-secondary bg-stone-100 px-2 py-1 rounded inline-block max-w-xs truncate">{search.query}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <FiUser className="text-text-muted" />
                    {search.owner}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <FiClock className="text-text-muted" />
                    {new Date(search.lastUsed).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-text-muted hover:text-text-primary hover:bg-stone-100 rounded-lg transition-colors" title="Run Search">
                      <FiPlay />
                    </button>
                    <button className="p-2 text-text-muted hover:text-text-primary hover:bg-stone-100 rounded-lg transition-colors" title="Edit">
                      <FiEdit2 />
                    </button>
                    <button className="p-2 text-text-muted hover:text-text-primary hover:bg-stone-100 rounded-lg transition-colors" title="Duplicate">
                      <FiCopy />
                    </button>
                    <button className="p-2 text-text-muted hover:text-danger hover:bg-danger-soft rounded-lg transition-colors" title="Delete">
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {savedSearches.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-text-muted">
                  No saved searches found. Create one from Advanced Search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
