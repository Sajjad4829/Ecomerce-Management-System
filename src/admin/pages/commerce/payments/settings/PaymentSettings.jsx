import { FiSave } from 'react-icons/fi';

export default function PaymentSettings() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Payment Settings</h1>
        <p className="text-sm text-text-muted mt-1">Global payment processing and display settings.</p>
      </div>

      <div className="bg-surface rounded-lg shadow-sm border border-border">
        <div className="p-6 space-y-6">
          <h2 className="text-lg font-bold text-text-primary border-b border-gray-100 pb-2">General</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Store Currency</label>
              <select className="w-full px-3 py-2 border border-border-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="BDT">BDT (৳)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Default Payment Method</label>
              <select className="w-full px-3 py-2 border border-border-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="online">Online Payment</option>
                <option value="cod">Cash on Delivery</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-border space-y-6">
          <h2 className="text-lg font-bold text-text-primary border-b border-gray-100 pb-2">Processing Rules</h2>
          
          <div className="space-y-4">
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-primary rounded border-border-hover focus:ring-primary" />
              <span className="text-sm text-text-secondary">Enable automatic payment retry on failure</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-primary rounded border-border-hover focus:ring-primary" />
              <span className="text-sm text-text-secondary">Require manual capture for credit card payments (Auth-only)</span>
            </label>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Payment Timeout (Minutes)</label>
              <input type="number" defaultValue={15} className="w-full px-3 py-2 border border-border-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>
        </div>

        <div className="p-6 bg-background border-t border-border flex justify-end">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors">
            <FiSave size={16} /> Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
