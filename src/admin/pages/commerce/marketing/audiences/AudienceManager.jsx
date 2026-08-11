import React, { useState } from 'react';
import { FiUsers, FiPlus, FiFilter, FiMoreVertical } from 'react-icons/fi';
import { useMarketing } from '../../../../context/MarketingContext';

export default function AudienceManager() {
  const { audiences, segments } = useMarketing();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Audiences</h1>
          <p className="text-sm text-text-muted mt-1">Combine segments to create target audiences for campaigns.</p>
        </div>
        <button className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center gap-2">
          <FiPlus /> Create Audience
        </button>
      </div>

      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-background">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Audience Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Included Segments</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Excluded Segments</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Est. Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-surface divide-y divide-gray-200">
              {audiences.map((aud) => (
                <tr key={aud.id} className="hover:bg-background">
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-text-primary">
                    {aud.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-1 flex-wrap">
                      {aud.includedSegments.map(segId => {
                         const seg = segments.find(s => s.id === segId);
                         return seg ? <span key={segId} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded border border-blue-100">{seg.name}</span> : null;
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-1 flex-wrap">
                      {aud.excludedSegments.map(segId => {
                         const seg = segments.find(s => s.id === segId);
                         return seg ? <span key={segId} className="px-2 py-1 bg-danger-soft text-red-700 text-xs rounded border border-red-100">{seg.name}</span> : null;
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-text-primary">
                    ~{aud.estimatedSize.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      aud.status === 'Active' ? 'bg-success-soft text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {aud.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-text-muted hover:text-text-primary"><FiMoreVertical size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
