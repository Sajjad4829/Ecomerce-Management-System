import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiCheckCircle, FiAlertTriangle, FiXCircle, FiEdit2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const MOCK_ENTITIES = [
  { id: '1', type: 'Product', name: 'Oasis Lounge Chair', slug: '/products/oasis-lounge-chair', score: 95, status: 'indexed', lastUpdated: '2h ago' },
  { id: '2', type: 'Product', name: 'Meridian Dining Table', slug: '/products/meridian-dining-table', score: 82, status: 'indexed', lastUpdated: '1d ago' },
  { id: '3', type: 'Category', name: 'Seating', slug: '/categories/seating', score: 45, status: 'warning', lastUpdated: '3d ago', issues: ['Missing Meta Description'] },
  { id: '4', type: 'Article', name: 'Top 10 Interior Trends 2026', slug: '/blog/interior-trends-2026', score: 100, status: 'indexed', lastUpdated: '1w ago' },
  { id: '5', type: 'Collection', name: 'Summer Outdoor', slug: '/collections/summer-outdoor', score: 12, status: 'error', lastUpdated: '2w ago', issues: ['Missing Title', 'No OG Image'] },
];

export default function SEOEntityManager() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState('All');

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 70) return 'text-amber-600 bg-amber-50';
    return 'text-red-600 bg-red-50';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'indexed': return <FiCheckCircle className="text-green-500" />;
      case 'warning': return <FiAlertTriangle className="text-amber-500" />;
      case 'error': return <FiXCircle className="text-red-500" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <Link to="/admin/seo" className="text-sm font-medium text-gray-500 hover:text-black">SEO Engine</Link>
            <span className="text-gray-300">/</span>
            <span className="text-sm font-medium text-gray-900">Entities</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#1A1A1A] mt-2">Entity SEO Manager</h1>
          <p className="text-sm text-gray-500 mt-2 max-w-xl leading-relaxed">
            Manage metadata, canonicals, and structured data for all content types.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-black/5 flex flex-col md:flex-row justify-between gap-4">
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            {['All', 'Product', 'Category', 'Collection', 'Article', 'Page'].map(type => (
              <button 
                key={type}
                onClick={() => setActiveType(type)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeType === type ? 'bg-[#F7F5F2] text-[#1A1A1A]' : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          
          <div className="flex gap-3">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search entities..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-[#F7F5F2] border-transparent rounded-lg text-sm focus:outline-none focus:bg-white focus:border-black/20 focus:ring-1 focus:ring-black/20 w-full md:w-64"
              />
            </div>
            <button className="px-4 py-2 bg-[#F7F5F2] text-[#1A1A1A] rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 shrink-0">
              <FiFilter size={16} /> Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-black/5">
                <th className="p-4 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider w-12">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="p-4 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">Entity</th>
                <th className="p-4 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">Type</th>
                <th className="p-4 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">Score</th>
                <th className="p-4 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="p-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {MOCK_ENTITIES.map(entity => (
                <tr key={entity.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="p-4">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="p-4">
                    <p className="text-sm font-bold text-[#1A1A1A]">{entity.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{entity.slug}</p>
                    {entity.issues && (
                      <div className="flex gap-1 mt-2">
                        {entity.issues.map((issue, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-red-50 text-red-700 text-[10px] font-bold uppercase tracking-wider rounded">
                            {issue}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">{entity.type}</span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold ${getScoreColor(entity.score)}`}>
                      {entity.score}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(entity.status)}
                      <span className="text-xs font-medium text-gray-700 capitalize">{entity.status}</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <Link 
                      to={`/admin/seo/entities/${entity.id}`}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FiEdit2 size={12} /> Edit SEO
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
