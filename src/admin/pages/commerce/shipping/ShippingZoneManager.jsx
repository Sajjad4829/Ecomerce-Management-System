import React from 'react';
import { FiPlus, FiEdit2 } from 'react-icons/fi';
import { useShipping } from '../../../context/ShippingContext';

export default function ShippingZoneManager() {
  const { shippingZones } = useShipping();

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Shipping Zones</h1>
          <p className="text-sm text-text-muted mt-1">Define geographical zones for shipping rates and rules.</p>
        </div>
        <button className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center gap-2">
          <FiPlus /> Add Zone
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shippingZones.map(zone => (
          <div key={zone.id} className="bg-surface rounded-xl border border-border shadow-sm p-6 relative group">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-bold text-text-primary">{zone.name}</h2>
              <button className="text-text-muted hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
                <FiEdit2 size={16} />
              </button>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-xs text-text-muted uppercase font-semibold">Countries</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {zone.countries.map(c => <span key={c} className="px-2 py-0.5 bg-gray-100 text-text-secondary text-xs rounded">{c}</span>)}
                </div>
              </div>
              <div>
                <p className="text-xs text-text-muted uppercase font-semibold">Regions</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {zone.regions.map(r => <span key={r} className="px-2 py-0.5 bg-gray-100 text-text-secondary text-xs rounded">{r}</span>)}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                zone.status === 'Active' ? 'bg-success-soft text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {zone.status}
              </span>
              <span className="text-xs text-text-muted">ID: {zone.id}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
