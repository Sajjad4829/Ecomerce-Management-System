import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProcurement } from '../../../context/procurement/ProcurementContext';
import { ArrowLeft, Edit3, Send, CheckCircle, Truck, PackageCheck, Download } from 'lucide-react';

export const PurchaseOrderDetail = () => {
  const { poId } = useParams();
  const navigate = useNavigate();
  const { getPurchaseOrder, getSupplier } = useProcurement();
  
  const po = getPurchaseOrder(poId);
  if (!po) return <div className="p-8">Purchase order not found.</div>;
  
  const supplier = getSupplier(po.supplierId);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/admin/procurement/purchase-orders')}
          className="p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-serif text-neutral-900 flex items-center gap-3">
            {po.poNumber}
            <span className="text-sm font-sans font-medium px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-800">
              {po.status}
            </span>
          </h1>
          <p className="text-sm text-neutral-500 mt-1">Expected Delivery: {po.expectedDate}</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-3 py-2 border border-neutral-200 text-neutral-700 bg-white rounded-md hover:bg-neutral-50 transition-colors">
            <Download className="w-4 h-4" />
          </button>
          {po.status === 'Pending Approval' && (
            <button className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Approve PO
            </button>
          )}
          {(po.status === 'Sent' || po.status === 'Acknowledged' || po.status === 'Partially Received') && (
            <button 
              onClick={() => navigate('/admin/procurement/receiving')}
              className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <PackageCheck className="w-4 h-4" /> Receive Goods
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Order Items */}
          <div className="bg-white rounded-lg border border-neutral-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-neutral-200">
              <h3 className="font-medium text-neutral-900">Order Items</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
                  <tr>
                    <th className="px-5 py-3 font-medium">Product / SKU</th>
                    <th className="px-5 py-3 font-medium text-right">Ordered</th>
                    <th className="px-5 py-3 font-medium text-right">Received</th>
                    <th className="px-5 py-3 font-medium text-right">Cost*</th>
                    <th className="px-5 py-3 font-medium text-right">Total*</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {po.items.map(item => (
                    <tr key={item.id} className="hover:bg-neutral-50">
                      <td className="px-5 py-4">
                        <div className="font-medium text-neutral-900">{item.sku}</div>
                        <div className="text-xs text-neutral-500">{item.productId}</div>
                      </td>
                      <td className="px-5 py-4 text-right font-medium text-neutral-900">{item.quantityOrdered}</td>
                      <td className="px-5 py-4 text-right text-indigo-600 font-medium">{item.quantityReceived}</td>
                      <td className="px-5 py-4 text-right text-neutral-600">${item.unitCost?.toLocaleString()}</td>
                      <td className="px-5 py-4 text-right font-medium text-neutral-900">${(item.quantityOrdered * (item.unitCost || 0)).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-5 bg-neutral-50 border-t border-neutral-200 flex justify-between items-center">
              <span className="text-neutral-500 text-sm">* Financials are placeholders</span>
              <div className="text-lg font-medium text-neutral-900">
                Total: ${po.totalAmount?.toLocaleString()}
              </div>
            </div>
          </div>
          
          {/* Timeline Placeholder */}
          <div className="bg-white rounded-lg border border-neutral-200 shadow-sm p-5">
            <h3 className="font-medium text-neutral-900 mb-4">Procurement Timeline</h3>
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-neutral-200 before:to-transparent">
               <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-green-100 text-green-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <CheckCircle className="w-5 h-5"/>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-neutral-200 shadow-sm bg-white">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-medium text-neutral-900">PO Created</div>
                    <div className="text-xs text-neutral-500">May 1, 2024</div>
                  </div>
                  <div className="text-sm text-neutral-600">Created by System Admin</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white rounded-lg border border-neutral-200 shadow-sm p-5">
            <h3 className="font-medium text-neutral-900 mb-4">Supplier Information</h3>
            {supplier ? (
              <div className="space-y-3">
                <div className="font-medium text-indigo-600">{supplier.name}</div>
                <div className="text-sm text-neutral-600">{supplier.code}</div>
                <div className="text-sm text-neutral-600 mt-2">{supplier.contactPerson}</div>
                <div className="text-sm text-neutral-500">{supplier.email}</div>
              </div>
            ) : (
              <div className="text-sm text-neutral-500">Supplier data unavailable</div>
            )}
          </div>
          
          <div className="bg-white rounded-lg border border-neutral-200 shadow-sm p-5">
            <h3 className="font-medium text-neutral-900 mb-4">Delivery Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-500">Destination</span>
                <span className="font-medium text-neutral-900">{po.warehouseId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Expected</span>
                <span className="font-medium text-neutral-900">{po.expectedDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
