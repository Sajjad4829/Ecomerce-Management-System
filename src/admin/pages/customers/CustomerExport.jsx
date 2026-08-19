import { FiDownloadCloud, FiFilter } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function CustomerExport() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <Link to="/admin/customers" className="text-sm font-medium text-text-muted hover:text-black">Customers</Link>
            <span className="text-gray-300">/</span>
            <span className="text-sm font-medium text-text-primary">Export</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-text-primary mt-2">Export Customers</h1>
          <p className="text-sm text-text-muted mt-2 max-w-xl leading-relaxed">
            Download your customer data as a CSV file.
          </p>
        </div>
      </div>

      <div className="max-w-2xl bg-surface rounded-xl border border-black/5 shadow-sm p-8 space-y-8">
        
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-text-primary">Select Data to Export</h3>
          
          <label className="flex items-start gap-3 p-4 bg-background rounded-lg border border-black/5 cursor-pointer">
            <input type="radio" name="exportScope" defaultChecked className="mt-1" />
            <div>
              <p className="text-sm font-bold text-text-primary">All Customers</p>
              <p className="text-xs text-text-muted mt-1">Export all 24,592 records in your database.</p>
            </div>
          </label>

          <label className="flex items-start gap-3 p-4 bg-surface rounded-lg border border-black/5 cursor-pointer hover:bg-background">
            <input type="radio" name="exportScope" className="mt-1" />
            <div>
              <p className="text-sm font-bold text-text-primary">Current Segment / Filter</p>
              <p className="text-xs text-text-muted mt-1">Export only the records matching your current active filters.</p>
            </div>
          </label>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-text-primary">Included Fields</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {['Basic Info (Name, Email)', 'Addresses', 'Order History Summary', 'Tags & Notes', 'Marketing Preferences', 'Customer Group'].map(field => (
              <label key={field} className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-border-hover text-text-primary focus:ring-[#1A1A1A]" />
                {field}
              </label>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-black/5 flex justify-end">
          <button className="px-6 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-semibold hover:bg-black shadow-sm flex items-center gap-2">
            <FiDownloadCloud size={16} /> Generate CSV
          </button>
        </div>

      </div>
    </div>
  );
}
