import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCustomers } from '../../context/customers/CustomerContext';
import { Save, X, User } from 'lucide-react';
import { validateCustomer } from '../../services/customers/CustomerValidation';

export default function CustomerEditor() {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const { customers } = useCustomers();
  
  const isEditing = Boolean(customerId);
  const existingCustomer = isEditing ? customers.find(c => c.id === customerId) : null;
  
  const [formData, setFormData] = useState(existingCustomer || {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    status: 'active'
  });
  const [errors, setErrors] = useState({});

  const handleSave = () => {
    const { isValid, errors: validationErrors } = validateCustomer(formData);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }
    // In a real app, dispatch save action here
    navigate('/admin/customers');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">
            {isEditing ? 'Edit Customer' : 'Add New Customer'}
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            {isEditing ? 'Update customer profile and settings' : 'Create a new customer profile'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/admin/customers')}
            className="px-4 py-2 text-neutral-600 bg-surface border border-neutral-200 rounded-md hover:bg-neutral-50 transition-colors flex items-center gap-2"
          >
            <X className="w-4 h-4" /> Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Customer
          </button>
        </div>
      </div>

      <div className="bg-surface rounded-lg border border-neutral-200 shadow-sm p-6">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-neutral-100">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-neutral-400" />
          </div>
          <div>
            <h3 className="font-medium text-neutral-900">Profile Information</h3>
            <p className="text-sm text-neutral-500">Basic details and contact information</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-neutral-700">First Name</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 ${
                errors.firstName ? 'border-red-300' : 'border-neutral-200'
              }`}
            />
            {errors.firstName && <p className="text-sm text-danger">{errors.firstName}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-neutral-700">Last Name</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 ${
                errors.lastName ? 'border-red-300' : 'border-neutral-200'
              }`}
            />
            {errors.lastName && <p className="text-sm text-danger">{errors.lastName}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-neutral-700">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 ${
                errors.email ? 'border-red-300' : 'border-neutral-200'
              }`}
            />
            {errors.email && <p className="text-sm text-danger">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-neutral-700">Phone Number (Optional)</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-neutral-700">Account Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 ${
                errors.status ? 'border-red-300' : 'border-neutral-200'
              }`}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
            {errors.status && <p className="text-sm text-danger">{errors.status}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
