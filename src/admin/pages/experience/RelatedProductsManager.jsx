import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useExperience } from '../../context/experience/ExperienceContext';
import { Plus, Search, Filter, MoreVertical, Edit2, Trash2, CheckCircle, XCircle } from 'lucide-react';

export const RelatedProductsManager = () => {
  const { relatedProducts, deleteRelatedProduct, MOCK_CATALOG } = useExperience();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  const filteredProducts = relatedProducts.filter(item => {
    const matchesSearch = item.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All' || item.relationshipType === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">Related Products</h1>
          <p className="text-neutral-500 mt-1">Manage product relationships, cross-sells, and recommendations</p>
        </div>
        <Link 
          to="/admin/experience/related-products/new" 
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
              placeholder="Search relationships..."
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-900"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="border border-neutral-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-neutral-900"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="Related">Related</option>
            <option value="Similar">Similar</option>
            <option value="Complementary">Complementary</option>
            <option value="Frequently Bought Together">Frequently Bought Together</option>
            <option value="Recommended With">Recommended With</option>
            <option value="Matching Furniture">Matching Furniture</option>
            <option value="Accessories">Accessories</option>
            <option value="Add-ons">Add-ons</option>
          </select>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center">
            <h3 className="text-lg font-medium text-neutral-900 mb-2">No related product configurations yet.</h3>
            <p className="text-neutral-500 mb-6">Create your first product relationship to control complementary and related product recommendations.</p>
            <Link 
              to="/admin/experience/related-products/new"
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
                  <th className="px-6 py-4 font-medium">Relationship Name</th>
                  <th className="px-6 py-4 font-medium">Target Product</th>
                  <th className="px-6 py-4 font-medium">Type</th>
                  <th className="px-6 py-4 font-medium">Related Count</th>
                  <th className="px-6 py-4 font-medium">Priority</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {filteredProducts.map(item => {
                  const targetProduct = MOCK_CATALOG.find(p => p.id === item.targetProductId);
                  return (
                    <tr key={item.id} className="hover:bg-neutral-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-neutral-900">{item.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-neutral-900">{targetProduct?.name || 'Unknown'}</div>
                        <div className="text-xs text-neutral-500">{targetProduct?.sku || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-neutral-100 text-neutral-700 rounded text-xs">{item.relationshipType}</span>
                      </td>
                      <td className="px-6 py-4 text-neutral-600">
                        {item.relatedProductIds?.length || 0} Products
                      </td>
                      <td className="px-6 py-4 text-neutral-600">
                        {item.priority}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === 'Active' ? 'bg-green-100 text-green-800' : 
                          item.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                          'bg-neutral-100 text-neutral-800'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link to={`/admin/experience/related-products/${item.id}/edit`} className="p-2 text-neutral-400 hover:text-neutral-900 transition-colors">
                            <Edit2 className="w-4 h-4" />
                          </Link>
                          <button 
                            onClick={() => {
                              if(window.confirm('Are you sure you want to delete this relationship?')) {
                                deleteRelatedProduct(item.id);
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
