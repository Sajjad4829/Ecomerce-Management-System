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
        <button onClick={() => navigate('/admin/settings/staff')} className="text-text-muted hover:text-black">
          <FiArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-serif font-bold text-text-primary">{staff.name}</h1>
          <p className="text-text-muted text-sm mt-1">{staff.email} • {staff.department}</p>
        </div>
        <div className="ml-auto flex gap-3">
          <button onClick={() => navigate(`/admin/settings/staff/${staffId}/activity`)} className="px-4 py-2 border border-black/10 rounded-lg hover:bg-background">
            View Activity
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
            <FiEdit2 /> Edit Profile
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-surface rounded-xl border border-black/5 shadow-sm p-6">
            <h3 className="text-lg font-medium mb-6">Assigned Roles</h3>
            <div className="space-y-4">
              {staff.roles.map(role => (
                <div key={role} className="flex justify-between items-center p-4 border border-black/10 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${role === 'super_admin' ? 'bg-danger-soft text-danger' : 'bg-blue-50 text-primary'}`}>
                      <FiShield />
                    </div>
                    <div>
                      <h4 className="font-medium capitalize">{role.replace('_', ' ')}</h4>
                      <p className="text-sm text-text-muted">System Role</p>
                    </div>
                  </div>
                  <button className="text-sm text-danger hover:underline">Revoke</button>
                </div>
              ))}
              <button className="w-full py-3 border border-dashed border-black/20 rounded-lg text-text-muted hover:bg-background hover:text-black transition-colors">
                + Assign Role
              </button>
            </div>
          </div>
          
          <div className="bg-surface rounded-xl border border-black/5 shadow-sm p-6">
             <div className="flex justify-between items-center mb-6">
               <h3 className="text-lg font-medium">Permission Summary</h3>
               <button onClick={() => navigate('/admin/settings/access-review')} className="text-sm text-primary hover:underline">Review Access</button>
             </div>
             <p className="text-sm text-text-secondary mb-4">This staff member inherits {staff.roles.includes('super_admin') ? 'all' : 'specific'} permissions from their assigned roles.</p>
             {staff.roles.includes('super_admin') && (
               <div className="flex items-center gap-3 p-4 bg-orange-50 text-orange-800 rounded-lg border border-orange-200">
                 <FiAlertTriangle className="w-5 h-5 flex-shrink-0" />
                 <p className="text-sm">Super Admins have unrestricted access to all modules, settings, and destructive actions.</p>
               </div>
             )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-surface rounded-xl border border-black/5 shadow-sm p-6">
            <h3 className="text-lg font-medium mb-4">Security Status</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-text-muted">Account Status</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`w-2 h-2 rounded-full ${staff.status === 'Active' ? 'bg-success-soft0' : 'bg-danger-soft0'}`}></span>
                  <span className="font-medium">{staff.status}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-text-muted">Last Login</p>
                <p className="font-medium mt-1">{new Date(staff.lastActive).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-text-muted">MFA Status</p>
                <p className="font-medium mt-1">Enabled (Authenticator App)</p>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-black/10 flex flex-col gap-3">
              {staff.status === 'Active' ? (
                <button className="px-4 py-2 w-full border border-red-200 text-danger bg-danger-soft hover:bg-danger-soft rounded-lg transition-colors">
                  Suspend Account
                </button>
              ) : (
                <button className="px-4 py-2 w-full border border-green-200 text-success bg-success-soft hover:bg-success-soft rounded-lg transition-colors">
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
