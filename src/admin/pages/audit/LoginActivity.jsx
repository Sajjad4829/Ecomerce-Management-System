import React from 'react';

export default function LoginActivity() {
  const logins = [
    { id: 1, staff: 'admin@aurora.com', device: 'Chrome on MacOS (Placeholder)', ip: '192.168.1.1', time: '2026-08-09T09:15:00Z', status: 'Success' },
    { id: 2, staff: 'unknown', device: 'Unknown Device (Placeholder)', ip: '192.168.1.100', time: '2026-08-09T09:00:00Z', status: 'Failed - Invalid Credentials' }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24">
      <div>
        <h1 className="text-2xl font-serif font-bold text-text-primary">Login Activity</h1>
        <p className="text-sm text-text-muted mt-1">Authentication attempts across all staff accounts</p>
      </div>

      <div className="bg-warning-soft p-4 rounded-lg border border-amber-200 text-amber-800 text-sm">
        <strong>Note:</strong> Real session tracking, IP geolocation, and browser fingerprinting require a backend identity provider integration.
      </div>

      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-background border-b border-border text-text-secondary font-medium">
            <tr>
              <th className="px-6 py-3">Timestamp</th>
              <th className="px-6 py-3">Actor</th>
              <th className="px-6 py-3">Device / Context</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {logins.map(login => (
              <tr key={login.id} className="hover:bg-background">
                <td className="px-6 py-4 text-text-muted text-xs">
                  {new Date(login.time).toLocaleString()}
                </td>
                <td className="px-6 py-4 font-medium text-text-primary">{login.staff}</td>
                <td className="px-6 py-4">
                  <div className="text-text-primary">{login.device}</div>
                  <div className="text-xs text-text-muted font-mono">{login.ip}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    login.status === 'Success' ? 'bg-emerald-100 text-emerald-700' : 'bg-danger-soft text-red-700'
                  }`}>
                    {login.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
