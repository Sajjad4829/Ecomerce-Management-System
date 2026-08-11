import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useSupport } from '../../../context/SupportContext';

export default function CannedResponseManager() {
  const { cannedResponses } = useSupport();

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Canned Responses</h1>
          <p className="text-sm text-text-muted mt-1">Manage quick replies and message templates for agents.</p>
        </div>
        <button className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center gap-2">
          <FiPlus /> New Response
        </button>
      </div>

      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-background">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Message Preview</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-text-muted uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-gray-200">
            {cannedResponses.map(resp => (
              <tr key={resp.id} className="hover:bg-background">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-text-primary">{resp.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">{resp.category}</td>
                <td className="px-6 py-4">
                  <p className="text-sm text-text-secondary line-clamp-1">{resp.message}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    resp.status === 'Active' ? 'bg-success-soft text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {resp.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                   <button className="text-text-muted hover:text-primary mr-3"><FiEdit2 size={16} /></button>
                   <button className="text-text-muted hover:text-danger"><FiTrash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
