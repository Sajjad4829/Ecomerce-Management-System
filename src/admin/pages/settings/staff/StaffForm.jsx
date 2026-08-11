import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiSave, FiMail } from 'react-icons/fi';

export default function StaffForm() {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-black">
          <FiArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#1A1A1A]">Invite Staff Member</h1>
          <p className="text-gray-500 text-sm mt-1">Send an invitation to join the admin team</p>
        </div>
        <div className="ml-auto">
          <button onClick={() => navigate('/admin/settings/staff')} className="flex items-center gap-2 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
            <FiMail /> Send Invite
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-black/5 shadow-sm p-6 space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black" />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
          <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black">
            <option>Select department...</option>
            <option>Administration</option>
            <option>Catalog</option>
            <option>Inventory</option>
            <option>Customer Support</option>
            <option>Marketing</option>
          </select>
        </div>

        <div className="pt-6 border-t border-black/10">
          <h3 className="text-lg font-medium mb-4">Assign Role</h3>
          <div className="space-y-3">
            {['Super Admin', 'Catalog Manager', 'Inventory Manager', 'Customer Support'].map(role => (
              <label key={role} className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input type="radio" name="role" className="w-4 h-4 text-black focus:ring-black" />
                <div>
                  <div className="font-medium">{role}</div>
                  <div className="text-sm text-gray-500">Standard system role</div>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
