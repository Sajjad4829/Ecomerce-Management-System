import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiSearch, FiFilter, FiDollarSign, FiClock, FiArchive, FiMoreVertical } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import CurrencySettings from '../../../components/commerce/pricing/CurrencySettings';
import PricePreview from '../../../components/commerce/pricing/PricePreview';

const MOCK_PRICE_RULES = [
  { id: '1', name: 'Summer Sale 2026', type: 'Collection Discount', target: 'The Sanctuary', amount: '20% OFF', status: 'active', startDate: '2026-06-01', endDate: '2026-08-31' },
  { id: '2', name: 'Trade Program Tier 1', type: 'Customer Group Pricing', target: 'Trade Customers', amount: '15% OFF', status: 'active', startDate: 'Always', endDate: 'Always' },
  { id: '3', name: 'Black Friday Flash', type: 'Global Discount', target: 'All Products', amount: '$500 OFF', status: 'scheduled', startDate: '2026-11-25', endDate: '2026-11-30' },
  { id: '4', name: 'Clearance - Old Stock', type: 'Category Discount', target: 'Seating', amount: '30% OFF', status: 'draft', startDate: '-', endDate: '-' },
];

export default function PricingDashboard() {
  const [activeTab, setActiveTab] = useState('rules'); // rules, currency, simulator
  const [ruleFilter, setRuleFilter] = useState('all');

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-green-100 text-green-900 font-mono text-[10px] uppercase font-bold">
              Commerce Engine
            </span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#1A1A1A] mt-2">Pricing Engine</h1>
          <p className="text-sm text-gray-500 mt-2 max-w-xl leading-relaxed">
            Manage global pricing rules, customer group discounts, and scheduled price changes.
          </p>
        </div>
        
        <div className="flex gap-3">
          {activeTab === 'rules' && (
            <Link 
              to="/admin/catalog/pricing/rules/new"
              className="px-6 py-2.5 bg-[#1A1A1A] text-white rounded-lg text-sm font-semibold hover:bg-black transition-colors flex items-center gap-2 shadow-sm"
            >
              <FiPlus size={16} /> Create Price Rule
            </Link>
          )}
        </div>
      </div>

      {/* Stats row */}
      {activeTab === 'rules' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Active Rules', value: '4', icon: FiDollarSign, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Scheduled', value: '2', icon: FiClock, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Drafts', value: '1', icon: FiArchive, color: 'text-stone-600', bg: 'bg-stone-100' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl border border-black/5 flex items-center gap-4">
              <div className={`w-12 h-12 ${stat.bg} rounded-full flex items-center justify-center shrink-0`}>
                <stat.icon className={`${stat.color}`} size={20} />
              </div>
              <div>
                <p className="text-xs font-mono font-bold text-gray-500 uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-bold text-[#1A1A1A] mt-1">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Main Tabs */}
      <div className="flex border-b border-black/5">
        {[
          { id: 'rules', label: 'Price Rules' },
          { id: 'currency', label: 'Currency Settings' },
          { id: 'simulator', label: 'Price Simulator' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors ${
              activeTab === tab.id 
                ? 'border-[#1A1A1A] text-[#1A1A1A]' 
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden min-h-[400px]">
        {activeTab === 'rules' && (
          <>
            {/* Toolbar */}
            <div className="p-4 border-b border-black/5 flex flex-col md:flex-row justify-between gap-4">
              <div className="flex gap-2">
                {['all', 'active', 'scheduled', 'draft', 'expired'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setRuleFilter(tab)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors capitalize ${
                      ruleFilter === tab ? 'bg-[#F7F5F2] text-[#1A1A1A]' : 'text-gray-500 hover:bg-gray-50'
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
                    placeholder="Search rules..." 
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
                    <th className="p-4 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">Rule Name</th>
                    <th className="p-4 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">Type & Target</th>
                    <th className="p-4 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">Discount</th>
                    <th className="p-4 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="p-4 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">Schedule</th>
                    <th className="p-4 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {MOCK_PRICE_RULES.map(rule => (
                    <tr key={rule.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="p-4">
                        <Link to={`/admin/catalog/pricing/rules/${rule.id}`} className="text-sm font-bold text-[#1A1A1A] hover:text-blue-600">
                          {rule.name}
                        </Link>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-[#1A1A1A] font-medium">{rule.type}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{rule.target}</p>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-2 py-1 bg-green-50 text-green-700 text-xs font-bold rounded">
                          {rule.amount}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                          rule.status === 'active' ? 'bg-green-100 text-green-800' :
                          rule.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {rule.status.charAt(0).toUpperCase() + rule.status.slice(1)}
                        </span>
                      </td>
                      <td className="p-4">
                        <p className="text-xs text-gray-900">{rule.startDate}</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider">To: {rule.endDate}</p>
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
          </>
        )}
        
        {activeTab === 'currency' && (
          <CurrencySettings />
        )}

        {activeTab === 'simulator' && (
          <PricePreview />
        )}
      </div>
    </div>
  );
}
