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
        <h1 className="text-3xl font-light text-text-primary tracking-wide mb-2">Advanced Search</h1>
        <p className="text-sm text-text-muted">Build complex queries across specific enterprise modules.</p>
      </div>

      <div className="bg-surface rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="p-6 border-b border-stone-100 bg-background">
          <label className="text-xs font-bold text-text-primary uppercase tracking-widest block mb-3">Target Module</label>
          <div className="flex items-center gap-4">
            <select 
              value={module}
              onChange={(e) => setModule(e.target.value)}
              className="p-3 bg-surface border border-border rounded-xl text-sm font-medium text-text-primary focus:outline-none focus:border-primary w-64"
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
            <h3 className="text-xs font-bold text-text-primary uppercase tracking-widest">Query Builder</h3>
            <div className="flex items-center gap-2 bg-stone-100 p-1 rounded-lg">
              <button onClick={() => setLogicalOperator('AND')} className={`px-4 py-1.5 text-xs font-bold rounded-md ${logicalOperator === 'AND' ? 'bg-surface shadow-sm text-text-primary' : 'text-text-muted hover:text-text-secondary'}`}>AND</button>
              <button onClick={() => setLogicalOperator('OR')} className={`px-4 py-1.5 text-xs font-bold rounded-md ${logicalOperator === 'OR' ? 'bg-surface shadow-sm text-text-primary' : 'text-text-muted hover:text-text-secondary'}`}>OR</button>
            </div>
          </div>

          <div className="space-y-3">
            {conditions.map((cond, i) => (
              <div key={i} className="flex items-center gap-3">
                <select
                  value={cond.field}
                  onChange={(e) => updateCondition(i, 'field', e.target.value)}
                  className="w-1/3 p-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
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
                  className="w-1/4 p-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
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
                  className="flex-1 p-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                />
                <button onClick={() => removeCondition(i)} className="p-3 text-text-muted hover:text-danger transition-colors">
                  <FiTrash2 />
                </button>
              </div>
            ))}
          </div>

          <button onClick={addCondition} className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary">
            <FiPlus /> Add Condition
          </button>
        </div>
        
        <div className="p-6 bg-background border-t border-stone-100 flex items-center justify-between">
          <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-secondary bg-surface border border-border rounded-xl hover:bg-stone-100 transition-colors">
            <FiSave /> Save Query
          </button>
          
          <button onClick={handleSearch} className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-primary rounded-xl hover:bg-primary-hover transition-colors">
            <FiSearch /> Run Search
          </button>
        </div>
      </div>
    </div>
  );
}
