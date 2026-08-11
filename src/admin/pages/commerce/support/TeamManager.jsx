import React from 'react';
import { useSupport } from '../../../context/SupportContext';

export default function TeamManager() {
  const { teams } = useSupport();

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Support Teams</h1>
          <p className="text-sm text-gray-500 mt-1">Manage support groups and capacity.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <div key={team.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold text-gray-900">{team.name}</h3>
            <div className="mt-4 grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Members</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{team.memberCount}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Open Tickets</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">{team.openTickets}</p>
              </div>
            </div>
            <div className="mt-6">
              <button className="w-full py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-sm font-medium transition-colors text-gray-700">
                Manage Team
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
