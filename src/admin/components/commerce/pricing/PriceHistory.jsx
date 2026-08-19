import { FiClock } from 'react-icons/fi';

const MOCK_HISTORY = [
  { id: 1, date: '2026-05-12 14:30', oldPrice: 1600, newPrice: 1500, reason: 'Market adjustment', user: 'Admin' },
  { id: 2, date: '2026-03-01 09:15', oldPrice: 1450, newPrice: 1600, reason: 'Supplier cost increase', user: 'System' },
  { id: 3, date: '2025-11-20 16:45', oldPrice: 1500, newPrice: 1450, reason: 'Black Friday preparation', user: 'Admin' },
];

export default function PriceHistory() {
  return (
    <div className="mt-8 pt-8 border-t border-black/5">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-text-muted">
          <FiClock size={14} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-text-primary">Price History</h3>
          <p className="text-xs text-text-muted">Audit log of manual and automated price changes.</p>
        </div>
      </div>

      <div className="bg-surface border border-black/5 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-background border-b border-black/5">
              <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Date & Time</th>
              <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Change</th>
              <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Reason</th>
              <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider text-right">User</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {MOCK_HISTORY.map(record => (
              <tr key={record.id} className="hover:bg-background transition-colors">
                <td className="p-4">
                  <span className="text-xs font-medium text-text-primary">{record.date}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2 text-sm font-mono">
                    <span className="text-text-muted line-through">${record.oldPrice}</span>
                    <span className="text-gray-300">→</span>
                    <span className={`font-bold ${record.newPrice > record.oldPrice ? 'text-danger' : 'text-success'}`}>
                      ${record.newPrice}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm text-text-secondary">{record.reason}</span>
                </td>
                <td className="p-4 text-right">
                  <span className="text-xs text-text-muted font-medium bg-gray-100 px-2 py-1 rounded">
                    {record.user}
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
