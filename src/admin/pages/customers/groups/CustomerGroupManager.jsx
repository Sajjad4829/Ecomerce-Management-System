import { useState } from 'react';
import { FiSearch, FiPlus, FiMoreVertical, FiUsers, FiTag, FiEdit } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const MOCK_GROUPS = [
  { id: '1', name: 'Retail', description: 'Default group for registered standard customers.', count: 12450, discount: 'None', status: 'Active' },
  { id: '2', name: 'VIP', description: 'Customers with over $2000 total spend.', count: 1204, discount: '10% Off All', status: 'Active' },
  { id: '3', name: 'Trade', description: 'Interior designers and architects.', count: 845, discount: 'Trade Tier 1 (15%)', status: 'Active' },
  { id: '4', name: 'Wholesale', description: 'Bulk buyers and B2B partners.', count: 124, discount: 'Wholesale Tier A', status: 'Active' },
  { id: '5', name: 'Employee', description: 'Internal staff accounts.', count: 42, discount: 'Cost + 10%', status: 'Active' },
];

export default function CustomerGroupManager() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <Link to="/admin/customers" className="text-sm font-medium text-gray-500 hover:text-black">Customers</Link>
            <span className="text-gray-300">/</span>
            <span className="text-sm font-medium text-gray-900">Groups</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#1A1A1A] mt-2">Customer Groups</h1>
          <p className="text-sm text-gray-500 mt-2 max-w-xl leading-relaxed">
            Segment your customers to apply specific pricing rules, discounts, and targeted marketing.
          </p>
        </div>
        
        <div className="flex gap-3">
          <Link to="/admin/customers/groups/new" className="px-6 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-semibold hover:bg-black transition-colors shadow-sm flex items-center gap-2">
            <FiPlus size={16} /> Create Group
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-black/5 flex flex-col md:flex-row justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search groups..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-[#F7F5F2] border-transparent rounded-lg text-sm focus:outline-none focus:bg-white focus:border-black/20 focus:ring-1 focus:ring-black/20 w-full"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-black/5">
                <th className="p-4 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">Group Name</th>
                <th className="p-4 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">Customers</th>
                <th className="p-4 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">Pricing / Discount</th>
                <th className="p-4 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="p-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {MOCK_GROUPS.map(group => (
                <tr key={group.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <p className="text-sm font-bold text-[#1A1A1A]">{group.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{group.description}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <FiUsers className="text-gray-400" size={14} />
                      <span className="text-sm font-medium text-[#1A1A1A]">{group.count}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <FiTag className="text-gray-400" size={14} />
                      <span className="text-sm text-gray-600">{group.discount}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                      group.status === 'Active' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-100 text-gray-800 border-gray-200'
                    }`}>
                      {group.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/admin/customers/groups/${group.id}`} className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-colors">
                        <FiEdit size={16} />
                      </Link>
                      <button className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-colors">
                        <FiMoreVertical size={16} />
                      </button>
                    </div>
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
