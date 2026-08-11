import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { rbacService } from '../../../services/RBACService';
import { FiArrowLeft, FiEdit2, FiShield, FiAlertTriangle } from 'react-icons/fi';

export default function StaffDetail() {
  const { staffId } = useParams();
  const navigate = useNavigate();
  const [staff, setStaff] = useState(null);

  useEffect(() => {
    const found = rbacService.getStaff().find(s => s.id === staffId);
    setStaff(found);
  }, [staffId]);

  if (!staff) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate('/admin/settings/staff')} className="text-gray-400 hover:text-black">
          <FiArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#1A1A1A]">{staff.name}</h1>
          <p className="text-gray-500 text-sm mt-1">{staff.email} • {staff.department}</p>
        </div>
        <div className="ml-auto flex gap-3">
          <button onClick={() => navigate(`/admin/settings/staff/${staffId}/activity`)} className="px-4 py-2 border border-black/10 rounded-lg hover:bg-gray-50">
            View Activity
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
            <FiEdit2 /> Edit Profile
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-xl border border-black/5 shadow-sm p-6">
            <h3 className="text-lg font-medium mb-6">Assigned Roles</h3>
            <div className="space-y-4">
              {staff.roles.map(role => (
                <div key={role} className="flex justify-between items-center p-4 border border-black/10 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${role === 'super_admin' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                      <FiShield />
                    </div>
                    <div>
                      <h4 className="font-medium capitalize">{role.replace('_', ' ')}</h4>
                      <p className="text-sm text-gray-500">System Role</p>
                    </div>
                  </div>
                  <button className="text-sm text-red-600 hover:underline">Revoke</button>
                </div>
              ))}
              <button className="w-full py-3 border border-dashed border-black/20 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-black transition-colors">
                + Assign Role
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-black/5 shadow-sm p-6">
             <div className="flex justify-between items-center mb-6">
               <h3 className="text-lg font-medium">Permission Summary</h3>
               <button onClick={() => navigate('/admin/settings/access-review')} className="text-sm text-blue-600 hover:underline">Review Access</button>
             </div>
             <p className="text-sm text-gray-600 mb-4">This staff member inherits {staff.roles.includes('super_admin') ? 'all' : 'specific'} permissions from their assigned roles.</p>
             {staff.roles.includes('super_admin') && (
               <div className="flex items-center gap-3 p-4 bg-orange-50 text-orange-800 rounded-lg border border-orange-200">
                 <FiAlertTriangle className="w-5 h-5 flex-shrink-0" />
                 <p className="text-sm">Super Admins have unrestricted access to all modules, settings, and destructive actions.</p>
               </div>
             )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-black/5 shadow-sm p-6">
            <h3 className="text-lg font-medium mb-4">Security Status</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Account Status</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`w-2 h-2 rounded-full ${staff.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <span className="font-medium">{staff.status}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Login</p>
                <p className="font-medium mt-1">{new Date(staff.lastActive).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">MFA Status</p>
                <p className="font-medium mt-1">Enabled (Authenticator App)</p>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-black/10 flex flex-col gap-3">
              {staff.status === 'Active' ? (
                <button className="px-4 py-2 w-full border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                  Suspend Account
                </button>
              ) : (
                <button className="px-4 py-2 w-full border border-green-200 text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                  Reactivate Account
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
