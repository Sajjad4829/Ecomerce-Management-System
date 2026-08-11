import { FiLock, FiDownload, FiTrash2 } from 'react-icons/fi';

export default function CustomerPrivacy() {
  return (
    <div className="bg-white rounded-xl border border-black/5 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <FiLock className="text-gray-400" />
        <h3 className="text-sm font-bold text-[#1A1A1A]">Data & Privacy</h3>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-[#F7F5F2] rounded-lg border border-black/5">
          <div>
            <h4 className="text-sm font-bold text-[#1A1A1A]">Export Data</h4>
            <p className="text-xs text-gray-500 mt-1">Download a copy of this customer's personal data.</p>
          </div>
          <button className="px-3 py-1.5 bg-white border border-black/10 rounded-md text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2 shadow-sm">
            <FiDownload size={14} /> Export JSON
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-100">
          <div>
            <h4 className="text-sm font-bold text-red-800">Delete Account</h4>
            <p className="text-xs text-red-600 mt-1">Permanently remove this customer and anonymize orders.</p>
          </div>
          <button className="px-3 py-1.5 bg-red-600 text-white rounded-md text-xs font-medium hover:bg-red-700 flex items-center gap-2 shadow-sm">
            <FiTrash2 size={14} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}
