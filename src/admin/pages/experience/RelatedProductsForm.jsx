import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useExperience } from '../../context/experience/ExperienceContext';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';

export const RelatedProductsForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { relatedProducts, createRelatedProduct, updateRelatedProduct, MOCK_CATALOG } = useExperience();

  const isEditing = !!id;

  const [formData, setFormData] = useState({
    name: '',
    targetProductId: '',
    relationshipType: 'Related',
    relatedProductIds: [],
    priority: 1,
    displayLimit: 4,
    status: 'Active',
    startDate: '',
    endDate: '',
    isBidirectional: false
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditing) {
      const existing = relatedProducts.find(r => r.id === id);
      if (existing) {
        setFormData({
          name: existing.name || '',
          targetProductId: existing.targetProductId || '',
          relationshipType: existing.relationshipType || 'Related',
          relatedProductIds: existing.relatedProductIds || [],
          priority: existing.priority || 1,
          displayLimit: existing.displayLimit || 4,
          status: existing.status || 'Active',
          startDate: existing.startDate || '',
          endDate: existing.endDate || '',
          isBidirectional: false // bidir is usually a creation-time toggle
        });
      }
    }
  }, [id, relatedProducts, isEditing]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRelatedProductToggle = (productId) => {
    setFormData(prev => {
      const isSelected = prev.relatedProductIds.includes(productId);
      if (isSelected) {
        return { ...prev, relatedProductIds: prev.relatedProductIds.filter(id => id !== productId) };
      } else {
        return { ...prev, relatedProductIds: [...prev.relatedProductIds, productId] };
      }
    });
  };

  const validate = () => {
    if (!formData.name.trim()) return 'Relationship Name is required.';
    if (!formData.targetProductId) return 'Target Product must be selected.';
    if (formData.relatedProductIds.length === 0) return 'At least one Related Product must be selected.';
    if (formData.relatedProductIds.includes(formData.targetProductId)) {
      return 'Target product cannot be related to itself.';
    }
    
    // Check for duplicate relationships (same target and type)
    if (!isEditing) {
      const duplicate = relatedProducts.find(r => 
        r.targetProductId === formData.targetProductId && 
        r.relationshipType === formData.relationshipType
      );
      if (duplicate) {
        return 'A relationship of this type already exists for the selected target product.';
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
      updateRelatedProduct(id, formData);
    } else {
      createRelatedProduct(formData);
    }
    navigate('/admin/experience/related-products');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/admin/experience/related-products" className="p-2 border border-neutral-200 rounded hover:bg-neutral-50 text-neutral-600">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-serif text-neutral-900">{isEditing ? 'Edit Relationship' : 'Create Product Relationship'}</h1>
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
        <div className="bg-danger-soft border border-red-200 text-red-700 p-4 rounded-md flex items-start gap-3">
          <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="bg-surface rounded-lg border border-neutral-200 p-6 space-y-6">
            <h2 className="text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2">Basic Details</h2>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Relationship Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Living Room Sofa Matching Products"
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
                <label className="block text-sm font-medium text-neutral-700 mb-1">Relationship Type</label>
                <select
                  name="relationshipType"
                  value={formData.relationshipType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-900"
                >
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
            </div>
          </div>

          <div className="bg-surface rounded-lg border border-neutral-200 p-6 space-y-6">
            <h2 className="text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2">Related Products</h2>
            <p className="text-sm text-neutral-500">Select the products that should appear in this relationship module. Order is determined by Priority.</p>
            
            <div className="border border-neutral-200 rounded-md max-h-64 overflow-y-auto">
              {MOCK_CATALOG.map(p => (
                <label key={p.id} className="flex items-center gap-3 p-3 hover:bg-neutral-50 border-b border-neutral-100 last:border-0 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.relatedProductIds.includes(p.id)}
                    onChange={() => handleRelatedProductToggle(p.id)}
                    className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                  />
                  <div>
                    <div className="font-medium text-neutral-900">{p.name}</div>
                    <div className="text-xs text-neutral-500">{p.sku} &bull; ${p.price}</div>
                  </div>
                </label>
              ))}
            </div>

            {!isEditing && (
              <div className="pt-4 border-t border-neutral-200">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isBidirectional"
                    checked={formData.isBidirectional}
                    onChange={handleChange}
                    className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                  />
                  <span className="text-sm font-medium text-neutral-700">Create Bidirectional Relationships</span>
                </label>
                <p className="text-xs text-neutral-500 mt-1 ml-6">Automatically creates reciprocal relationships (e.g., if Sofa relates to Table, Table relates to Sofa).</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-surface rounded-lg border border-neutral-200 p-6 space-y-6">
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
              <p className="text-xs text-neutral-500 mt-1">Max products to show on frontend.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Priority</label>
              <input
                type="number"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                min="1"
                className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
              <p className="text-xs text-neutral-500 mt-1">Lower number = higher priority.</p>
            </div>
          </div>

          <div className="bg-surface rounded-lg border border-neutral-200 p-6 space-y-6">
            <h2 className="text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2">Schedule</h2>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Start Date (Optional)</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">End Date (Optional)</label>
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
