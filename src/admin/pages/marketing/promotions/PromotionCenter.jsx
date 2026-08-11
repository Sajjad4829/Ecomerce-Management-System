import React, { useState } from 'react';
import { useMarketing } from '../../../context/marketing/MarketingContext';
import { Search, Plus, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PromotionCenter = () => {
  const { promotions } = useMarketing();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredPromotions = promotions.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">Promotions</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage discounts, offers, and sale rules</p>
        </div>
        <button 
          onClick={() => navigate('/admin/marketing/promotions/new')}
          className="px-4 py-2 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition-colors flex items-center gap-2 text-sm font-medium"
        >
          <Plus className="w-4 h-4" /> Create Promotion
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg border border-neutral-200 shadow-sm flex items-center gap-4 justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search promotions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Promotion Name</th>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium">Value</th>
              <th className="px-6 py-4 font-medium">Duration</th>
              <th className="px-6 py-4 font-medium text-center">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {filteredPromotions.map((promo) => (
              <tr key={promo.id} className="hover:bg-neutral-50 transition-colors">
                <td className="px-6 py-4 font-medium text-neutral-900">{promo.name}</td>
                <td className="px-6 py-4 text-neutral-600">{promo.type}</td>
                <td className="px-6 py-4 text-neutral-900 font-medium">{promo.value}</td>
                <td className="px-6 py-4 text-neutral-600 text-xs">
                  {promo.startDate} - {promo.endDate}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    promo.status === 'Active' ? 'bg-emerald-100 text-emerald-800' :
                    promo.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                    'bg-neutral-100 text-neutral-800'
                  }`}>
                    {promo.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="inline-flex items-center justify-center p-2 text-neutral-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
