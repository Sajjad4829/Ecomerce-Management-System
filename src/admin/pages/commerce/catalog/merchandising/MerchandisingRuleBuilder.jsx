import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSave, FiArrowLeft, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useSearch } from '../../../../../admin/context/SearchContext';
import CMSPageHeader from '../../../../../components/cms/CMSPageHeader';
import { useNavigate } from 'react-router-dom';

export default function MerchandisingRuleBuilder() {
  const navigate = useNavigate();
  const { addMerchandisingRule } = useSearch();

  const [rule, setRule] = useState({
    name: '',
    conditionType: 'Search Query',
    conditionValue: '',
    actionType: 'Boost',
    targetType: 'Product',
    targetValue: '',
    weight: 50,
    status: 'Active'
  });

  const handleSave = () => {
    addMerchandisingRule({
      name: rule.name || 'Untitled Rule',
      condition: `${rule.conditionType} = ${rule.conditionValue}`,
      action: rule.actionType,
      target: rule.targetValue,
      weight: rule.weight,
      status: rule.status
    });
    navigate('/admin/catalog/merchandising/rules');
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/admin/catalog/merchandising/rules')}
          className="p-2 bg-surface border border-black/10 rounded-lg hover:bg-background transition-colors"
        >
          <FiArrowLeft />
        </button>
        <div>
          <h1 className="text-2xl font-serif font-bold text-text-primary">Create Merchandising Rule</h1>
          <p className="text-sm text-text-muted">Define conditional logic for search and discovery.</p>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-black/5 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-black/5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Rule Name</label>
            <input 
              type="text" 
              value={rule.name}
              onChange={(e) => setRule({ ...rule, name: e.target.value })}
              placeholder="e.g., Boost Summer Collection for 'Outdoor'"
              className="w-full px-4 py-2 bg-background border border-black/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-black/20"
            />
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                checked={rule.status === 'Active'} 
                onChange={() => setRule({ ...rule, status: 'Active' })}
                className="accent-black" 
              />
              <span className="text-sm">Active</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                checked={rule.status === 'Draft'} 
                onChange={() => setRule({ ...rule, status: 'Draft' })}
                className="accent-black" 
              />
              <span className="text-sm">Draft</span>
            </label>
          </div>
        </div>

        {/* Condition Builder (WHEN) */}
        <div className="p-6 border-b border-black/5 bg-background">
          <h3 className="text-sm font-bold uppercase tracking-wider text-text-muted mb-4">WHEN (Condition)</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/3">
              <select 
                value={rule.conditionType}
                onChange={(e) => setRule({ ...rule, conditionType: e.target.value })}
                className="w-full px-4 py-2 bg-surface border border-black/10 rounded-lg focus:outline-none"
              >
                <option value="Search Query">Search Query</option>
                <option value="Category">Category</option>
                <option value="Customer Segment">Customer Segment</option>
              </select>
            </div>
            <div className="w-full sm:w-1/3 flex items-center justify-center text-sm font-medium text-text-muted">
              Equals
            </div>
            <div className="w-full sm:w-1/3">
              <input 
                type="text" 
                value={rule.conditionValue}
                onChange={(e) => setRule({ ...rule, conditionValue: e.target.value })}
                placeholder={rule.conditionType === 'Search Query' ? "e.g., 'sofa'" : 'Value'}
                className="w-full px-4 py-2 bg-surface border border-black/10 rounded-lg focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Action Builder (THEN) */}
        <div className="p-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-text-muted mb-4">THEN (Action)</h3>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="w-full sm:w-1/3">
              <select 
                value={rule.actionType}
                onChange={(e) => setRule({ ...rule, actionType: e.target.value })}
                className="w-full px-4 py-2 bg-surface border border-black/10 rounded-lg focus:outline-none"
              >
                <option value="Boost">Boost</option>
                <option value="Pin">Pin</option>
                <option value="Bury">Bury (Demote)</option>
                <option value="Redirect">Redirect</option>
              </select>
            </div>
            <div className="w-full sm:w-1/3">
              <select 
                value={rule.targetType}
                onChange={(e) => setRule({ ...rule, targetType: e.target.value })}
                className="w-full px-4 py-2 bg-surface border border-black/10 rounded-lg focus:outline-none"
              >
                <option value="Product">Product</option>
                <option value="Collection">Collection</option>
                <option value="Category">Category</option>
              </select>
            </div>
            <div className="w-full sm:w-1/3">
              <input 
                type="text" 
                value={rule.targetValue}
                onChange={(e) => setRule({ ...rule, targetValue: e.target.value })}
                placeholder="Target ID or Name"
                className="w-full px-4 py-2 bg-surface border border-black/10 rounded-lg focus:outline-none"
              />
            </div>
          </div>

          {rule.actionType === 'Boost' || rule.actionType === 'Bury' ? (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-text-secondary">Weight</label>
                <span className="text-sm font-mono bg-gray-100 px-2 py-0.5 rounded">{rule.weight}</span>
              </div>
              <input 
                type="range"
                min="1"
                max="100"
                value={rule.weight}
                onChange={(e) => setRule({ ...rule, weight: e.target.value })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
              />
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button 
          onClick={() => navigate('/admin/catalog/merchandising/rules')}
          className="px-6 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:bg-gray-100 transition-colors"
        >
          Cancel
        </button>
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          <FiSave />
          <span>Save Rule</span>
        </button>
      </div>
    </div>
  );
}
