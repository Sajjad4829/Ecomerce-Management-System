import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAfterSales } from '../../../context/after-sales/AfterSalesContext';
import { ArrowLeft, Check, X, Box, RotateCcw } from 'lucide-react';

export default function ReturnDetail() {
  const { returnId } = useParams();
  const { returns } = useAfterSales();
  const ret = returns.find(r => r.id === returnId) || returns[0];

  if (!ret) return <div className="p-8">Return not found.</div>;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/admin/after-sales/returns" className="p-2 border border-neutral-200 rounded-md hover:bg-neutral-50 text-neutral-600">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-serif text-neutral-900">Return {ret.id}</h1>
            <p className="text-sm text-neutral-500 mt-1">Customer: {ret.customerName}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <button className="px-4 py-2 border border-neutral-200 rounded-md text-neutral-700 hover:bg-neutral-50 flex items-center gap-2">
             <X className="w-4 h-4" /> Reject
           </button>
           <button className="px-4 py-2 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition-colors flex items-center gap-2 text-sm font-medium">
             <Check className="w-4 h-4" /> Approve
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-6 md:col-span-2">
          <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 p-6">
            <h3 className="text-sm font-medium text-neutral-900 mb-4">Return Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-neutral-500">Order ID</div>
                <div className="font-medium mt-1">{ret.orderId}</div>
              </div>
              <div>
                <div className="text-neutral-500">Product</div>
                <div className="font-medium mt-1">{ret.productName}</div>
              </div>
              <div>
                <div className="text-neutral-500">Reason</div>
                <div className="font-medium mt-1">{ret.reason}</div>
              </div>
              <div>
                <div className="text-neutral-500">Requested Date</div>
                <div className="font-medium mt-1">{new Date(ret.requestedDate).toLocaleDateString()}</div>
              </div>
            </div>
          </div>
          
          <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 p-6">
             <h3 className="text-sm font-medium text-neutral-900 mb-4">Return Timeline</h3>
             <div className="text-center text-neutral-500 py-8 border border-dashed border-neutral-200 rounded-lg">
                <RotateCcw className="w-8 h-8 mx-auto text-neutral-300 mb-2" />
                <p className="text-sm">Timeline placeholder.</p>
             </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 p-6">
            <h3 className="text-sm font-medium text-neutral-900 mb-4">Status</h3>
            <div className="space-y-3 text-sm">
              <span className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${
                ret.status === 'Approved' ? 'bg-success-soft text-green-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {ret.status}
              </span>
            </div>
          </div>
          
          <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 p-6">
             <h3 className="text-sm font-medium text-neutral-900 mb-4">Resolution</h3>
             <div className="text-center text-neutral-500 py-6 border border-dashed border-neutral-200 rounded-lg">
                <p className="text-sm">Pending Approval</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
