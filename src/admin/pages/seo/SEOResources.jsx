import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSEO } from '../../context/seo/SEOContext';
import { FiEdit2, FiExternalLink, FiSearch } from 'react-icons/fi';

export function SEOResources() {
  const { resources, loadResources, loading } = useSEO();
  const navigate = useNavigate();

  useEffect(() => {
    loadResources();
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-stone-900 mb-1">Resource Manager</h2>
          <p className="text-sm text-stone-500">Manage SEO configuration for individual products, categories, and pages.</p>
        </div>
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input 
            type="text" 
            placeholder="Search resources..." 
            className="w-full md:w-64 pl-10 pr-4 py-2 bg-white border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-stone-400"
          />
        </div>
      </div>

      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-stone-50 border-b border-stone-200 text-xs font-bold text-stone-500 uppercase tracking-widest">
              <th className="px-6 py-4">Resource</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">SEO Status</th>
              <th className="px-6 py-4">Indexability</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {loading ? (
              <tr><td colSpan="5" className="px-6 py-8 text-center text-stone-500">Loading resources...</td></tr>
            ) : resources.map(res => (
              <tr key={res.id} className="hover:bg-stone-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-stone-900">{res.name}</div>
                  <div className="text-xs text-stone-500 mt-0.5">/{res.slug}</div>
                </td>
                <td className="px-6 py-4 text-sm text-stone-600">{res.type}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-md ${res.status === 'Good' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {res.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-stone-600">{res.indexability}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-stone-400 hover:text-stone-900 transition-colors" title="View in storefront"><FiExternalLink /></button>
                    <button 
                      onClick={() => navigate(`/admin/seo/resources/${res.id}`)}
                      className="p-2 text-stone-400 hover:text-stone-900 transition-colors" 
                      title="Edit SEO"
                    ><FiEdit2 /></button>
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
