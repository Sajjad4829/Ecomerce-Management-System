import React, { useEffect, useState } from 'react';
import { FiPlus, FiDownload } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { auditService } from '../../services/audit/AuditService';

export default function ComplianceReports() {
  const [reports, setReports] = useState([]);
  
  useEffect(() => {
    async function load() {
      const data = await auditService.getComplianceReports();
      setReports(data);
    }
    load();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900">Saved Reports</h1>
          <p className="text-sm text-stone-500 mt-1">Access historically generated compliance and audit reports</p>
        </div>
        <Link to="/admin/compliance/reports/new" className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 font-medium">
          <FiPlus /> New Report
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-medium">
            <tr>
              <th className="px-6 py-3">Report Name</th>
              <th className="px-6 py-3">Owner</th>
              <th className="px-6 py-3">Created</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {reports.map(report => (
              <tr key={report.id} className="hover:bg-stone-50">
                <td className="px-6 py-4 font-medium text-stone-900">{report.name}</td>
                <td className="px-6 py-4 text-stone-600">{report.owner}</td>
                <td className="px-6 py-4 text-stone-500 text-xs">
                  {new Date(report.created).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    report.status === 'Generated' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {report.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-stone-600 hover:text-stone-900 font-medium flex items-center justify-end gap-1 w-full">
                    <FiDownload size={14} /> Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
