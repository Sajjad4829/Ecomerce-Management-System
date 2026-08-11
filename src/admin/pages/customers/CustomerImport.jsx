import { useState } from 'react';
import { FiUploadCloud, FiFileText, FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function CustomerImport() {
  const [file, setFile] = useState(null);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <Link to="/admin/customers" className="text-sm font-medium text-gray-500 hover:text-black">Customers</Link>
            <span className="text-gray-300">/</span>
            <span className="text-sm font-medium text-gray-900">Import</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#1A1A1A] mt-2">Import Customers</h1>
          <p className="text-sm text-gray-500 mt-2 max-w-xl leading-relaxed">
            Bulk import customer records via CSV format.
          </p>
        </div>
      </div>

      <div className="max-w-3xl bg-white rounded-xl border border-black/5 shadow-sm p-8">
        {!file ? (
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-12 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer bg-[#F7F5F2]">
            <FiUploadCloud size={48} className="text-gray-400 mb-4" />
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">Upload CSV File</h3>
            <p className="text-sm text-gray-500 mb-6 max-w-md">
              Drag and drop your customer CSV file here, or click to browse. Download our <a href="#" className="text-blue-600 hover:underline">template file</a> to see the required format.
            </p>
            <button 
              onClick={() => setFile({ name: 'customers_export_2026.csv', size: '2.4 MB' })}
              className="px-6 py-2 bg-white border border-black/10 rounded-lg text-sm font-semibold text-[#1A1A1A] shadow-sm hover:bg-gray-50"
            >
              Select File
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-start justify-between p-4 bg-[#F7F5F2] rounded-xl border border-black/5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-lg border border-black/10 flex items-center justify-center">
                  <FiFileText className="text-gray-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1A1A1A]">{file.name}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">{file.size} • 1,240 records found</p>
                </div>
              </div>
              <button onClick={() => setFile(null)} className="text-xs text-red-600 font-medium hover:underline">
                Remove
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h4 className="text-sm font-bold text-[#1A1A1A] mb-4">Column Mapping Preview</h4>
              <div className="space-y-3">
                <MappingRow csvCol="First Name" dbCol="First Name" valid />
                <MappingRow csvCol="Last Name" dbCol="Last Name" valid />
                <MappingRow csvCol="Email Address" dbCol="Email" valid />
                <MappingRow csvCol="Phone" dbCol="Phone" valid />
                <MappingRow csvCol="Address 1" dbCol="Billing Address 1" valid />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-black/5">
              <button onClick={() => setFile(null)} className="px-6 py-2 bg-white border border-black/10 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button className="px-6 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-semibold hover:bg-black shadow-sm flex items-center gap-2">
                <FiUploadCloud size={16} /> Start Import
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MappingRow({ csvCol, dbCol, valid }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 bg-white p-2 rounded border border-gray-200 text-sm text-gray-700">{csvCol}</div>
      <div className="text-gray-400">→</div>
      <div className="flex-1 bg-white p-2 rounded border border-gray-200 text-sm text-gray-900 font-medium">{dbCol}</div>
      <div className="w-6 flex justify-center">
        {valid && <FiCheckCircle className="text-green-500" />}
      </div>
    </div>
  );
}
