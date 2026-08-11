import { FiLock, FiDownload, FiTrash2 } from 'react-icons/fi';

export default function CustomerPrivacy() {
  return (
    <div className="bg-surface rounded-xl border border-black/5 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <FiLock className="text-text-muted" />
        <h3 className="text-sm font-bold text-text-primary">Data & Privacy</h3>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-black/5">
          <div>
            <h4 className="text-sm font-bold text-text-primary">Export Data</h4>
            <p className="text-xs text-text-muted mt-1">Download a copy of this customer's personal data.</p>
          </div>
          <button className="px-3 py-1.5 bg-surface border border-black/10 rounded-md text-xs font-medium text-text-secondary hover:bg-background flex items-center gap-2 shadow-sm">
            <FiDownload size={14} /> Export JSON
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-danger-soft rounded-lg border border-red-100">
          <div>
            <h4 className="text-sm font-bold text-red-800">Delete Account</h4>
            <p className="text-xs text-danger mt-1">Permanently remove this customer and anonymize orders.</p>
          </div>
          <button className="px-3 py-1.5 bg-red-600 text-white rounded-md text-xs font-medium hover:bg-red-700 flex items-center gap-2 shadow-sm">
            <FiTrash2 size={14} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}
