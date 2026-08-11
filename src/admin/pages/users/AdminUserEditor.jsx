import { useState } from 'react';
import { FiArrowLeft, FiCheck } from 'react-icons/fi';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function AdminUserEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id;

  const [formData, setFormData] = useState({
    firstName: isNew ? '' : 'Alice',
    lastName: isNew ? '' : 'Admin',
    email: isNew ? '' : 'alice@example.com',
    roleId: isNew ? '' : '1',
    status: 'Active'
  });

  const handleSave = () => {
    navigate('/admin/users');
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-theme(spacing.20))] pb-24">
      <div className="sticky top-0 z-20 bg-[#F7F5F2] pt-4 pb-4 border-b border-black/5 flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/admin/users" className="p-2 bg-white border border-black/10 rounded-lg text-gray-500 hover:text-black hover:border-black/20 transition-all shadow-sm">
            <FiArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-xl font-serif font-bold text-[#1A1A1A]">
              {isNew ? 'Invite User' : `Edit User: ${formData.firstName} ${formData.lastName}`}
            </h1>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Link to="/admin/users" className="px-4 py-2 text-gray-600 hover:text-black text-sm font-medium transition-colors">
            Cancel
          </Link>
          <button 
            onClick={handleSave}
            className="px-6 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-semibold hover:bg-black transition-colors shadow-sm flex items-center gap-2"
          >
            <FiCheck size={16} /> {isNew ? 'Send Invite' : 'Save User'}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-black/5 shadow-sm p-8">
            <h2 className="text-lg font-serif font-bold text-[#1A1A1A] mb-6">User Details</h2>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xs font-mono font-bold text-gray-500 uppercase mb-2">First Name</label>
                <input 
                  type="text" 
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-[#F7F5F2] border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-sm font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-bold text-gray-500 uppercase mb-2">Last Name</label>
                <input 
                  type="text" 
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-[#F7F5F2] border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-sm font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-gray-500 uppercase mb-2">Email Address</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-2.5 bg-[#F7F5F2] border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-sm font-medium"
                disabled={!isNew}
              />
              {!isNew && <p className="text-xs text-gray-500 mt-2">Email address cannot be changed.</p>}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-black/5 shadow-sm p-6">
            <h3 className="text-sm font-bold text-[#1A1A1A] mb-4">Role Assignment</h3>
            <select 
              value={formData.roleId}
              onChange={(e) => setFormData(prev => ({ ...prev, roleId: e.target.value }))}
              className="w-full px-4 py-2.5 bg-[#F7F5F2] border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-sm font-medium"
            >
              <option value="">Select a role...</option>
              <option value="1">Super Admin</option>
              <option value="2">Store Manager</option>
              <option value="3">Catalog Editor</option>
              <option value="4">Customer Support</option>
            </select>
          </div>

          <div className="bg-white rounded-xl border border-black/5 shadow-sm p-6">
            <h3 className="text-sm font-bold text-[#1A1A1A] mb-4">Status</h3>
            <select 
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
              className="w-full px-4 py-2.5 bg-[#F7F5F2] border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-sm font-medium"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <p className="text-xs text-gray-500 mt-2">
              Inactive users cannot log into the administrative workspace.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
