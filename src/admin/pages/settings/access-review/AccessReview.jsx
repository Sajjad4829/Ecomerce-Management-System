import React from 'react';
import { useNavigate } from 'react-router-dom';
import { rbacService } from '../../../services/RBACService';
import DataTable from '../../../../components/cms/DataTable';
import { FiAlertTriangle, FiCheckCircle, FiClock, FiShield } from 'react-icons/fi';

export default function AccessReview() {
  const navigate = useNavigate();
  const staff = rbacService.getStaff();


  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#1A1A1A]">Access Review</h1>
          <p className="text-gray-500 text-sm mt-1">Audit staff permissions and high-risk access</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-black/5 shadow-sm">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
              <FiAlertTriangle />
            </div>
            <h3 className="font-medium text-gray-500">Pending Reviews</h3>
          </div>
          <p className="text-3xl font-bold">3</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-black/5 shadow-sm">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600">
              <FiShield />
            </div>
            <h3 className="font-medium text-gray-500">High Risk Roles</h3>
          </div>
          <p className="text-3xl font-bold">1</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden">
        <DataTable 
          data={staff}
          columns={[
            { key: 'name', label: 'Staff Member', render: (val, row) => (
              <div>
                <div className="font-medium">{val}</div>
                <div className="text-xs text-gray-500">{row.email}</div>
              </div>
            )},
            { key: 'roles', label: 'Roles', render: (val) => (
              <div className="flex flex-wrap gap-1">
                {val.map(role => (
                  <span key={role} className="inline-flex items-center px-2 py-0.5 rounded bg-gray-100 text-gray-800 text-xs">
                    {role.replace('_', ' ')}
                  </span>
                ))}
              </div>
            )},
            { key: 'risk', label: 'Risk Level', render: (val, row) => {
              const isHigh = row.roles.includes('super_admin');
              return (
                <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${
                  isHigh ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
                }`}>
                  {isHigh ? <FiAlertTriangle /> : <FiCheckCircle />}
                  {isHigh ? 'High Risk' : 'Standard'}
                </span>
              );
            }},
            { key: 'lastReviewed', label: 'Last Reviewed', render: () => (
              <div className="flex items-center gap-1.5 text-orange-600 text-sm">
                <FiClock />
                <span>Overdue (90+ days)</span>
              </div>
            )}
          ]}
          onRowClick={(row) => navigate(`/admin/settings/staff/${row.id}`)}
        />
      </div>
    </div>
  );
}
