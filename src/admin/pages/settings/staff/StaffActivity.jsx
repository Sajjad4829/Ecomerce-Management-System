import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiLogOut, FiEdit2, FiBox } from 'react-icons/fi';

export default function StaffActivity() {
  const { staffId } = useParams();
  const navigate = useNavigate();

  const activity = [
    { id: 1, action: 'Updated Product', details: 'Changed price for "Modern Sofa"', date: '2023-10-25T14:30:00Z', icon: FiBox, color: 'blue' },
    { id: 2, action: 'Logged In', details: 'IP: 192.168.1.1', date: '2023-10-25T09:00:00Z', icon: FiLogOut, color: 'gray' },
    { id: 3, action: 'Role Changed', details: 'Added role "Catalog Manager"', date: '2023-10-20T11:15:00Z', icon: FiEdit2, color: 'orange' }
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="text-text-muted hover:text-black">
          <FiArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-serif font-bold text-text-primary">Staff Activity Log</h1>
          <p className="text-text-muted text-sm mt-1">Recent actions performed by {staffId}</p>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-black/5 shadow-sm p-6">
        <div className="space-y-8">
          {activity.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="relative flex gap-4">
                {index !== activity.length - 1 && (
                  <div className="absolute left-5 top-10 bottom-[-32px] w-px bg-gray-200"></div>
                )}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-${item.color}-50 text-${item.color}-600 z-10`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-text-primary">{item.action}</h4>
                  <p className="text-sm text-text-muted mt-0.5">{item.details}</p>
                  <p className="text-xs text-text-muted mt-2">{new Date(item.date).toLocaleString()}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
