import React, { useState } from 'react';
import { useLoyalty } from '../../../context/loyalty/LoyaltyContext';
import { Search, Filter, MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MembershipCenter() {
  const { memberships } = useLoyalty();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMemberships = memberships.filter(m => 
    m.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.tier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Suspended': return 'bg-amber-100 text-amber-800';
      case 'Inactive': return 'bg-neutral-100 text-neutral-800';
      default: return 'bg-neutral-100 text-neutral-800';
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">Membership Center</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage customer memberships</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border border-neutral-200 shadow-sm flex items-center gap-4 justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search memberships..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" 
          />
        </div>
        <button className="px-4 py-2 border border-neutral-200 rounded-md text-neutral-700 hover:bg-neutral-50 flex items-center gap-2">
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Tier</th>
              <th className="px-6 py-4 font-medium">Points</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Joined Date</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {filteredMemberships.map(member => (
              <tr key={member.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-neutral-900">{member.customerName}</div>
                  <div className="text-neutral-500 text-xs mt-1">{member.customerId}</div>
                </td>
                <td className="px-6 py-4 text-neutral-900">{member.tier}</td>
                <td className="px-6 py-4 text-neutral-900 font-medium">{member.points}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(member.status)}`}>
                    {member.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-neutral-500">{new Date(member.joinedAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right">
                  <Link to={`/admin/loyalty/memberships/${member.id}`} className="p-1 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded inline-block">
                    <MoreVertical className="w-4 h-4" />
                  </Link>
                </td>
              </tr>
            ))}
            {filteredMemberships.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center text-neutral-500">
                  No memberships found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
