import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { rbacService } from '../../../services/RBACService';
import { FiArrowLeft, FiEdit2, FiCopy, FiUsers, FiLock } from 'react-icons/fi';

export default function RoleDetail() {
  const { roleId } = useParams();
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const found = rbacService.getRoles().find(r => r.id === roleId);
    setRole(found);
  }, [roleId]);

  if (!role) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate('/admin/settings/roles')} className="text-gray-400 hover:text-black">
          <FiArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-serif font-bold text-[#1A1A1A]">{role.name}</h1>
            {role.isSystem && (
              <span className="px-2 py-1 rounded bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100">
                System Role
              </span>
            )}
          </div>
          <p className="text-gray-500 text-sm mt-1">{role.description}</p>
        </div>
        <div className="ml-auto flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-black/10 rounded-lg hover:bg-gray-50">
            <FiCopy /> Duplicate
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
            <FiEdit2 /> Edit Details
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-black/5 shadow-sm">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <FiUsers />
            </div>
            <h3 className="font-medium text-gray-500">Staff Assigned</h3>
          </div>
          <p className="text-3xl font-bold">{role.staffCount}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-black/5 shadow-sm">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
              <FiLock />
            </div>
            <h3 className="font-medium text-gray-500">Permissions</h3>
          </div>
          <p className="text-3xl font-bold">{role.permissionCount}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-black/5 shadow-sm flex flex-col justify-center">
           <p className="text-sm text-gray-500 mb-1">Role Status</p>
           <div className="flex items-center gap-2">
             <span className={`w-2.5 h-2.5 rounded-full ${role.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
             <span className="font-medium text-lg">{role.status}</span>
           </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-black/5 flex justify-between items-center bg-gray-50/50">
          <div>
            <h3 className="font-medium text-lg">Permission Matrix</h3>
            <p className="text-sm text-gray-500 mt-1">Configure access levels across modules and resources</p>
          </div>
          <button 
            onClick={() => navigate(`/admin/settings/roles/${roleId}/permissions`)}
            className="px-4 py-2 border border-black/10 rounded-lg bg-white hover:bg-gray-50"
          >
            Edit Matrix
          </button>
        </div>
        <div className="p-8 text-center text-gray-500">
          <FiLock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>Access control rules are defined in the Permission Matrix.</p>
          <button 
            onClick={() => navigate(`/admin/settings/roles/${roleId}/permissions`)}
            className="mt-4 text-blue-600 hover:underline font-medium"
          >
            View configured permissions &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
