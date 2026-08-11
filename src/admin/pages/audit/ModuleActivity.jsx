import React, { useState } from 'react';
import { useAuditStore } from '../../context/audit/AuditStore';
import AuditTimeline from '../../components/audit/AuditTimeline';

export default function ModuleActivity() {
  const { events } = useAuditStore();
  const [selectedModule, setSelectedModule] = useState('Products');

  const modules = ['Products', 'Orders', 'Inventory', 'Customers', 'CMS', 'Marketing', 'RBAC'];
  const filteredEvents = events.filter(e => e.module === selectedModule);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24">
      <div>
        <h1 className="text-2xl font-serif font-bold text-stone-900">Module Activity</h1>
        <p className="text-sm text-stone-500 mt-1">View audit logs segregated by system module</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-4">
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3 px-2">Modules</h3>
            <div className="space-y-1">
              {modules.map(mod => (
                <button
                  key={mod}
                  onClick={() => setSelectedModule(mod)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedModule === mod ? 'bg-stone-900 text-white' : 'text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  {mod}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-xl border border-stone-200 shadow-sm p-6">
          <h2 className="text-xl font-serif font-bold text-stone-900 mb-6">{selectedModule} Activity</h2>
          <AuditTimeline events={filteredEvents} />
          {filteredEvents.length === 0 && (
            <div className="text-center py-12 text-stone-500">
              No activity recorded for {selectedModule}.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
