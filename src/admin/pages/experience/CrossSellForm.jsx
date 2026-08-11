import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useExperience } from '../../context/experience/ExperienceContext';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';

export const CrossSellForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { crossSells, createCrossSell, updateCrossSell, MOCK_CATALOG } = useExperience();

  const isEditing = !!id;

  const [formData, setFormData] = useState({
    name: '',
    targetProductId: '',
    strategy: 'Manual Selection',
    crossSellProductIds: [],
    priority: 1,
    displayLimit: 4,
    status: 'Active',
    startDate: '',
    endDate: ''
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditing) {
      const existing = crossSells.find(c => c.id === id);
      if (existing) {
        setFormData({
          name: existing.name || '',
          targetProductId: existing.targetProductId || '',
          strategy: existing.strategy || 'Manual Selection',
          crossSellProductIds: existing.crossSellProductIds || [],
          priority: existing.priority || 1,
          displayLimit: existing.displayLimit || 4,
          status: existing.status || 'Active',
          startDate: existing.startDate || '',
          endDate: existing.endDate || ''
        });
      }
    }
  }, [id, crossSells, isEditing]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleProductToggle = (productId) => {
    setFormData(prev => {
      const isSelected = prev.crossSellProductIds.includes(productId);
      if (isSelected) {
        return { ...prev, crossSellProductIds: prev.crossSellProductIds.filter(id => id !== productId) };
      } else {
        return { ...prev, crossSellProductIds: [...prev.crossSellProductIds, productId] };
      }
    });
  };

  const validate = () => {
    if (!formData.name.trim()) return 'Configuration Name is required.';
    if (!formData.targetProductId) return 'Target Product must be selected.';
    if (formData.strategy === 'Manual Selection' && formData.crossSellProductIds.length === 0) {
      return 'At least one Cross-sell Product must be selected for Manual Strategy.';
    }
    if (formData.crossSellProductIds.includes(formData.targetProductId)) {
      return 'Target product cannot be selected as a cross-sell product.';
    }
    
    // Check for duplicate configurations (same target and strategy)
    if (!isEditing) {
      const duplicate = crossSells.find(c => 
        c.targetProductId === formData.targetProductId && 
        c.strategy === formData.strategy
      );
      if (duplicate) {
        return 'A configuration with this strategy already exists for the selected target product.';
      }
    }

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (isEditing) {
      updateCrossSell(id, formData);
    } else {
      createCrossSell(formData);
    }
    navigate('/admin/experience/cross-sell');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/admin/experience/cross-sell" className="p-2 border border-neutral-200 rounded hover:bg-neutral-50 text-neutral-600">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-serif text-neutral-900">{isEditing ? 'Edit Configuration' : 'Create Cross-sell Configuration'}</h1>
        </div>
        <button 
          onClick={handleSubmit}
          className="px-4 py-2 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          {isEditing ? 'Save Changes' : 'Create Configuration'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md flex items-start gap-3">
          <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="bg-white rounded-lg border border-neutral-200 p-6 space-y-6">
            <h2 className="text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2">Basic Details</h2>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Configuration Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Sofa Living Room Essentials"
                className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Target Product</label>
                <select
                  name="targetProductId"
                  value={formData.targetProductId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-900"
                >
                  <option value="">Select a product...</option>
                  {MOCK_CATALOG.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.sku})</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Cross-sell Strategy</label>
                <select
                  name="strategy"
                  value={formData.strategy}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-900"
                >
                  <option value="Manual Selection">Manual Selection</option>
                  <option value="Category Based">Category Based</option>
                  <option value="Collection Based">Collection Based</option>
                  <option value="Attribute Based">Attribute Based</option>
                  <option value="Rule Based">Rule Based</option>
                </select>
              </div>
            </div>
          </div>

          {formData.strategy === 'Manual Selection' && (
            <div className="bg-white rounded-lg border border-neutral-200 p-6 space-y-6">
              <h2 className="text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2">Cross-sell Products</h2>
              <p className="text-sm text-neutral-500">Select complementary products to complete the customer's purchase.</p>
              
              <div className="border border-neutral-200 rounded-md max-h-64 overflow-y-auto">
                {MOCK_CATALOG.map(p => (
                  <label key={p.id} className="flex items-center gap-3 p-3 hover:bg-neutral-50 border-b border-neutral-100 last:border-0 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.crossSellProductIds.includes(p.id)}
                      onChange={() => handleProductToggle(p.id)}
                      className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                    />
                    <div>
                      <div className="font-medium text-neutral-900">{p.name}</div>
                      <div className="text-xs text-neutral-500">{p.sku} &bull; ${p.price} &bull; {p.category}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-neutral-200 p-6 space-y-6">
            <h2 className="text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2">Configuration</h2>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-900"
              >
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Inactive">Inactive</option>
                <option value="Expired">Expired</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Display Limit</label>
              <input
                type="number"
                name="displayLimit"
                value={formData.displayLimit}
                onChange={handleChange}
                min="1"
                max="20"
                className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
              <p className="text-xs text-neutral-500 mt-1">Maximum products displayed.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-900"
              >
                <option value={1}>Critical</option>
                <option value={2}>High</option>
                <option value={3}>Medium</option>
                <option value={4}>Low</option>
              </select>
              <p className="text-xs text-neutral-500 mt-1">Determines which rules win conflicts.</p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-neutral-200 p-6 space-y-6">
            <h2 className="text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2">Schedule</h2>
            <p className="text-xs text-neutral-500">If no dates are specified, configuration remains active until manually disabled.</p>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
