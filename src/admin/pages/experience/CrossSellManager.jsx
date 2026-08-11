import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useExperience } from '../../context/experience/ExperienceContext';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';

export const CrossSellManager = () => {
  const { crossSells, deleteCrossSell, MOCK_CATALOG } = useExperience();
  const [searchTerm, setSearchTerm] = useState('');
  const [strategyFilter, setStrategyFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredCrossSells = crossSells.filter(item => {
    const targetProduct = MOCK_CATALOG.find(p => p.id === item.targetProductId);
    const searchMatch = 
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      targetProduct?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      targetProduct?.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    const strategyMatch = strategyFilter === 'All' || item.strategy === strategyFilter;
    const statusMatch = statusFilter === 'All' || item.status === statusFilter;
    
    return searchMatch && strategyMatch && statusMatch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">Cross-sell Management</h1>
          <p className="text-neutral-500 mt-1">Configure complementary products to complete the customer's purchase.</p>
        </div>
        <Link 
          to="/admin/experience/cross-sell/new" 
          className="px-4 py-2 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create New
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-neutral-200 shadow-sm">
        <div className="p-4 border-b border-neutral-200 flex gap-4">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input 
              type="text"
              placeholder="Search by name, product or SKU..."
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-900"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="border border-neutral-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-neutral-900"
            value={strategyFilter}
            onChange={(e) => setStrategyFilter(e.target.value)}
          >
            <option value="All">All Strategies</option>
            <option value="Manual Selection">Manual Selection</option>
            <option value="Category Based">Category Based</option>
            <option value="Collection Based">Collection Based</option>
            <option value="Attribute Based">Attribute Based</option>
            <option value="Rule Based">Rule Based</option>
          </select>
          <select 
            className="border border-neutral-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-neutral-900"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Draft">Draft</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Inactive">Inactive</option>
            <option value="Expired">Expired</option>
          </select>
        </div>

        {filteredCrossSells.length === 0 ? (
          <div className="p-12 text-center">
            <h3 className="text-lg font-medium text-neutral-900 mb-2">No cross-sell configurations yet.</h3>
            <p className="text-neutral-500 mb-6">Create complementary product relationships to help customers discover products that complete their purchase.</p>
            <Link 
              to="/admin/experience/cross-sell/new"
              className="inline-flex px-4 py-2 bg-white border border-neutral-300 text-neutral-700 rounded-md text-sm font-medium hover:bg-neutral-50"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
                <tr>
                  <th className="px-6 py-4 font-medium">Configuration Name</th>
                  <th className="px-6 py-4 font-medium">Target Product</th>
                  <th className="px-6 py-4 font-medium">Strategy</th>
                  <th className="px-6 py-4 font-medium">Cross-sell Count</th>
                  <th className="px-6 py-4 font-medium">Priority</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {filteredCrossSells.map(item => {
                  const targetProduct = MOCK_CATALOG.find(p => p.id === item.targetProductId);
                  return (
                    <tr key={item.id} className="hover:bg-neutral-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-neutral-900">{item.name}</div>
                        {item.startDate && (
                          <div className="text-xs text-neutral-500 mt-1">
                            {new Date(item.startDate).toLocaleDateString()} - {item.endDate ? new Date(item.endDate).toLocaleDateString() : 'Ongoing'}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-neutral-900">{targetProduct?.name || 'Unknown'}</div>
                        <div className="text-xs text-neutral-500">{targetProduct?.sku || 'N/A'} • {targetProduct?.category || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-neutral-100 text-neutral-700 rounded text-xs">{item.strategy}</span>
                      </td>
                      <td className="px-6 py-4 text-neutral-600">
                        {item.crossSellProductIds?.length || 0} Products
                      </td>
                      <td className="px-6 py-4 text-neutral-600">
                        {item.priority}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === 'Active' ? 'bg-green-100 text-green-800' : 
                          item.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                          item.status === 'Expired' ? 'bg-red-100 text-red-800' :
                          'bg-neutral-100 text-neutral-800'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link to={`/admin/experience/cross-sell/${item.id}/edit`} className="p-2 text-neutral-400 hover:text-neutral-900 transition-colors">
                            <Edit2 className="w-4 h-4" />
                          </Link>
                          <button 
                            onClick={() => {
                              if(window.confirm('Are you sure you want to delete this configuration?')) {
                                deleteCrossSell(item.id);
                              }
                            }}
                            className="p-2 text-red-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
