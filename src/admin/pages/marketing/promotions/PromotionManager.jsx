import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiSearch, FiFilter, FiTag, FiMoreVertical, FiClock, FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const MOCK_PROMOTIONS = [
  { id: '1', name: 'Spring Collection Launch', type: 'Collection Discount', code: 'SPRING26', discount: '15% OFF', status: 'active', usage: '142 / ∞', endDate: '2026-05-31' },
  { id: '2', name: 'New Customer Welcome', type: 'Customer Group Offer', code: 'WELCOME10', discount: '10% OFF', status: 'active', usage: '841 / ∞', endDate: 'Always' },
  { id: '3', name: 'Flash Sale - Seating', type: 'Category Discount', code: 'FLASHSEAT', discount: '$100 OFF', status: 'scheduled', usage: '0 / 500', endDate: '2026-08-15' },
];

export default function PromotionManager() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-pink-100 text-pink-900 font-mono text-[10px] uppercase font-bold">
              Marketing Engine
            </span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#1A1A1A] mt-2">Promotions & Campaigns</h1>
          <p className="text-sm text-gray-500 mt-2 max-w-xl leading-relaxed">
            Create and manage promotional campaigns, discount codes, and special offers.
          </p>
        </div>
        
        <div className="flex gap-3">
          <Link 
            to="/admin/marketing/promotions/new"
            className="px-6 py-2.5 bg-[#1A1A1A] text-white rounded-lg text-sm font-semibold hover:bg-black transition-colors flex items-center gap-2 shadow-sm"
          >
            <FiPlus size={16} /> Create Promotion
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-black/5 flex flex-col md:flex-row justify-between gap-4">
          <div className="flex gap-2">
            {['all', 'active', 'scheduled', 'expired'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors capitalize ${
                  activeTab === tab ? 'bg-[#F7F5F2] text-[#1A1A1A]' : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="flex gap-3">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search promotions..." 
                className="pl-10 pr-4 py-2 bg-[#F7F5F2] border-transparent rounded-lg text-sm focus:outline-none focus:bg-white focus:border-black/20 focus:ring-1 focus:ring-black/20 w-64"
              />
            </div>
            <button className="px-4 py-2 bg-[#F7F5F2] text-[#1A1A1A] rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-2">
              <FiFilter size={16} /> Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-black/5">
                <th className="p-4 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">Promotion details</th>
                <th className="p-4 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">Discount</th>
                <th className="p-4 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="p-4 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">Usage</th>
                <th className="p-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {MOCK_PROMOTIONS.map(promo => (
                <tr key={promo.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="p-4">
                    <Link to={`/admin/marketing/promotions/${promo.id}`} className="text-sm font-bold text-[#1A1A1A] hover:text-blue-600 transition-colors">
                      {promo.name}
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">{promo.type}</span>
                      {promo.code && (
                        <>
                          <span className="text-gray-300">•</span>
                          <span className="text-[10px] font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 border border-gray-200">
                            {promo.code}
                          </span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-1 bg-green-50 text-green-700 text-xs font-bold rounded">
                      {promo.discount}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                      promo.status === 'active' ? 'bg-green-100 text-green-800' :
                      promo.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {promo.status === 'active' && <FiCheckCircle size={12} />}
                      {promo.status === 'scheduled' && <FiClock size={12} />}
                      {promo.status.charAt(0).toUpperCase() + promo.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-[#1A1A1A] font-medium">{promo.usage}</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">Ends: {promo.endDate}</p>
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-2 text-gray-400 hover:text-[#1A1A1A] rounded-lg hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-all">
                      <FiMoreVertical size={16} />
                    </button>
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
