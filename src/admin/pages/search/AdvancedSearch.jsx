import React, { useState } from 'react';
import { FiPlus, FiTrash2, FiSave, FiSearch, FiLayers, FiCalendar } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export default function AdvancedSearch() {
  const navigate = useNavigate();
  const [module, setModule] = useState('Products');
  const [conditions, setConditions] = useState([
    { field: 'Price', operator: 'Greater Than', value: '1000' }
  ]);
  const [logicalOperator, setLogicalOperator] = useState('AND');

  const addCondition = () => setConditions([...conditions, { field: '', operator: 'Equals', value: '' }]);
  const removeCondition = (index) => setConditions(conditions.filter((_, i) => i !== index));
  const updateCondition = (index, key, value) => {
    const newCond = [...conditions];
    newCond[index][key] = value;
    setConditions(newCond);
  };

  const handleSearch = () => {
    // Mock navigating to results
    navigate('/admin/search');
  };

  const handleSave = () => {
    alert("Saved search created successfully.");
    navigate('/admin/search/saved');
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-light text-[#1A1A1A] tracking-wide mb-2">Advanced Search</h1>
        <p className="text-sm text-stone-500">Build complex queries across specific enterprise modules.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="p-6 border-b border-stone-100 bg-stone-50">
          <label className="text-xs font-bold text-stone-900 uppercase tracking-widest block mb-3">Target Module</label>
          <div className="flex items-center gap-4">
            <select 
              value={module}
              onChange={(e) => setModule(e.target.value)}
              className="p-3 bg-white border border-stone-200 rounded-xl text-sm font-medium text-stone-900 focus:outline-none focus:border-stone-400 w-64"
            >
              <option value="Products">Products</option>
              <option value="Orders">Orders</option>
              <option value="Customers">Customers</option>
              <option value="Inventory">Inventory</option>
              <option value="Staff">Staff</option>
            </select>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-widest">Query Builder</h3>
            <div className="flex items-center gap-2 bg-stone-100 p-1 rounded-lg">
              <button onClick={() => setLogicalOperator('AND')} className={`px-4 py-1.5 text-xs font-bold rounded-md ${logicalOperator === 'AND' ? 'bg-white shadow-sm text-stone-900' : 'text-stone-500 hover:text-stone-700'}`}>AND</button>
              <button onClick={() => setLogicalOperator('OR')} className={`px-4 py-1.5 text-xs font-bold rounded-md ${logicalOperator === 'OR' ? 'bg-white shadow-sm text-stone-900' : 'text-stone-500 hover:text-stone-700'}`}>OR</button>
            </div>
          </div>

          <div className="space-y-3">
            {conditions.map((cond, i) => (
              <div key={i} className="flex items-center gap-3">
                <select
                  value={cond.field}
                  onChange={(e) => updateCondition(i, 'field', e.target.value)}
                  className="w-1/3 p-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-stone-400"
                >
                  <option value="">Select Field...</option>
                  <option value="Price">Price</option>
                  <option value="Status">Status</option>
                  <option value="Category">Category</option>
                  <option value="Created Date">Created Date</option>
                </select>
                <select
                  value={cond.operator}
                  onChange={(e) => updateCondition(i, 'operator', e.target.value)}
                  className="w-1/4 p-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-stone-400"
                >
                  <option value="Equals">Equals (=)</option>
                  <option value="Not Equals">Not Equals (!=)</option>
                  <option value="Contains">Contains</option>
                  <option value="Greater Than">Greater Than (&gt;)</option>
                  <option value="Less Than">Less Than (&lt;)</option>
                </select>
                <input
                  type="text"
                  value={cond.value}
                  onChange={(e) => updateCondition(i, 'value', e.target.value)}
                  placeholder="Value"
                  className="flex-1 p-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-stone-400"
                />
                <button onClick={() => removeCondition(i)} className="p-3 text-stone-400 hover:text-red-500 transition-colors">
                  <FiTrash2 />
                </button>
              </div>
            ))}
          </div>

          <button onClick={addCondition} className="flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-stone-900">
            <FiPlus /> Add Condition
          </button>
        </div>
        
        <div className="p-6 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
          <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-stone-700 bg-white border border-stone-200 rounded-xl hover:bg-stone-100 transition-colors">
            <FiSave /> Save Query
          </button>
          
          <button onClick={handleSearch} className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-stone-900 rounded-xl hover:bg-stone-800 transition-colors">
            <FiSearch /> Run Search
          </button>
        </div>
      </div>
    </div>
  );
}
