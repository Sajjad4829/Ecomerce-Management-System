import React, { useEffect, useState } from 'react';
import { useSEO } from '../../context/seo/SEOContext';
import { FiPlus, FiTrash2, FiEdit2, FiExternalLink } from 'react-icons/fi';

export function RedirectManager() {
  const { redirects, loadRedirects, loading, createRedirect } = useSEO();
  const [isCreating, setIsCreating] = useState(false);
  const [newRedirect, setNewRedirect] = useState({ source: '', destination: '', type: '301' });

  useEffect(() => {
    loadRedirects();
  }, []);

  const handleCreate = async () => {
    if (!newRedirect.source || !newRedirect.destination) return;
    await createRedirect(newRedirect);
    setIsCreating(false);
    setNewRedirect({ source: '', destination: '', type: '301' });
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-stone-900 mb-1">URL Redirects</h2>
          <p className="text-sm text-stone-500">Manage 301 and 302 redirects to preserve SEO value.</p>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-800 transition-colors"
        >
          <FiPlus /> Create Redirect
        </button>
      </div>

      {isCreating && (
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-6 mb-6">
          <h3 className="font-bold text-stone-900 mb-4">Create New Redirect</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-bold text-stone-900 mb-1">Source URL (Old)</label>
              <input type="text" value={newRedirect.source} onChange={e => setNewRedirect({...newRedirect, source: e.target.value})} placeholder="/old-path" className="w-full p-2.5 bg-white border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-stone-400" />
            </div>
            <div>
              <label className="block text-sm font-bold text-stone-900 mb-1">Destination URL (New)</label>
              <input type="text" value={newRedirect.destination} onChange={e => setNewRedirect({...newRedirect, destination: e.target.value})} placeholder="/new-path" className="w-full p-2.5 bg-white border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-stone-400" />
            </div>
            <div>
              <label className="block text-sm font-bold text-stone-900 mb-1">Redirect Type</label>
              <select value={newRedirect.type} onChange={e => setNewRedirect({...newRedirect, type: e.target.value})} className="w-full p-2.5 bg-white border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-stone-400">
                <option value="301">301 (Permanent)</option>
                <option value="302">302 (Temporary)</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <button onClick={() => setIsCreating(false)} className="px-4 py-2 text-sm font-medium text-stone-600 hover:text-stone-900">Cancel</button>
            <button onClick={handleCreate} className="px-4 py-2 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-800 transition-colors" disabled={loading}>
              {loading ? 'Creating...' : 'Save Redirect'}
            </button>
          </div>
        </div>
      )}

      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-stone-50 border-b border-stone-200 text-xs font-bold text-stone-500 uppercase tracking-widest">
              <th className="px-6 py-4">Source</th>
              <th className="px-6 py-4">Destination</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Created</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {loading ? (
              <tr><td colSpan="5" className="px-6 py-8 text-center text-stone-500">Loading redirects...</td></tr>
            ) : redirects.map(red => (
              <tr key={red.id} className="hover:bg-stone-50 transition-colors">
                <td className="px-6 py-4 font-medium text-stone-900">{red.source}</td>
                <td className="px-6 py-4 text-sm text-stone-600">{red.destination}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-md ${red.type === '301' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                    {red.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-stone-500">{red.createdAt || 'Just now'}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-stone-400 hover:text-stone-900 transition-colors"><FiEdit2 /></button>
                    <button className="p-2 text-stone-400 hover:text-red-500 transition-colors"><FiTrash2 /></button>
                  </div>
                </td>
              </tr>
            ))}
            {redirects.length === 0 && !loading && (
              <tr><td colSpan="5" className="px-6 py-12 text-center text-stone-500">No active redirects.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
