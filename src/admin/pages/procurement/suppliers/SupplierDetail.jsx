import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProcurement } from '../../../context/procurement/ProcurementContext';
import { ArrowLeft, Building2, Phone, Mail, MapPin, Edit3, ShoppingCart, Star } from 'lucide-react';

export const SupplierDetail = () => {
  const { supplierId } = useParams();
  const navigate = useNavigate();
  const { getSupplier, purchaseOrders } = useProcurement();
  const supplier = getSupplier(supplierId);

  if (!supplier) {
    return <div className="p-8">Supplier not found.</div>;
  }

  const supplierOrders = purchaseOrders.filter(po => po.supplierId === supplier.id);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/admin/procurement/suppliers')}
          className="p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-serif text-neutral-900 flex items-center gap-2">
            {supplier.name}
            <span className="text-sm font-sans font-normal px-2.5 py-0.5 rounded-full bg-success-soft text-green-800">
              {supplier.status}
            </span>
          </h1>
          <p className="text-sm text-neutral-500 mt-1">Supplier Code: {supplier.code}</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-neutral-200 text-neutral-700 bg-surface rounded-md hover:bg-neutral-50 transition-colors flex items-center gap-2">
            <Edit3 className="w-4 h-4" /> Edit
          </button>
          <button className="px-4 py-2 text-white bg-primary rounded-md hover:bg-primary-hover transition-colors flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" /> Create PO
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Contact Info */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm">
            <h3 className="font-medium text-neutral-900 mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-neutral-400 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-neutral-900">{supplier.contactPerson}</div>
                  <div className="text-xs text-neutral-500">Primary Contact</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-neutral-400 mt-0.5" />
                <div>
                  <a href={`mailto:${supplier.email}`} className="text-sm font-medium text-primary hover:underline">{supplier.email}</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-neutral-400 mt-0.5" />
                <div className="text-sm font-medium text-neutral-900">{supplier.phone}</div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-neutral-400 mt-0.5" />
                <div className="text-sm text-neutral-600">
                  123 Supplier Way<br/>
                  Industrial Park<br/>
                  New York, NY 10001
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm">
            <h3 className="font-medium text-neutral-900 mb-4">Performance Metrics</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-neutral-600">On-Time Delivery</span>
                  <span className="font-medium text-success">94%</span>
                </div>
                <div className="w-full bg-neutral-100 rounded-full h-1.5"><div className="bg-success-soft0 h-1.5 rounded-full w-[94%]" /></div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-neutral-600">Quality Rate</span>
                  <span className="font-medium text-success">98%</span>
                </div>
                <div className="w-full bg-neutral-100 rounded-full h-1.5"><div className="bg-success-soft0 h-1.5 rounded-full w-[98%]" /></div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-neutral-600">Fulfillment Rate</span>
                  <span className="font-medium text-warning">85%</span>
                </div>
                <div className="w-full bg-neutral-100 rounded-full h-1.5"><div className="bg-warning-soft0 h-1.5 rounded-full w-[85%]" /></div>
              </div>
              <p className="text-xs text-neutral-400 text-right mt-2">*Backend Placeholder Data</p>
            </div>
          </div>
        </div>

        {/* Orders and Activity */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-surface rounded-lg border border-neutral-200 shadow-sm">
            <div className="p-5 border-b border-neutral-200">
              <h3 className="font-medium text-neutral-900">Recent Purchase Orders</h3>
            </div>
            <div className="divide-y divide-neutral-200">
              {supplierOrders.map(po => (
                <div key={po.id} className="p-4 hover:bg-neutral-50 transition-colors flex items-center justify-between">
                  <div>
                    <button 
                      onClick={() => navigate(`/admin/procurement/purchase-orders/${po.id}`)}
                      className="font-medium text-primary hover:underline"
                    >
                      {po.poNumber}
                    </button>
                    <div className="text-sm text-neutral-500 mt-0.5">Expected: {po.expectedDate}</div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex px-2 py-1 rounded text-xs font-medium bg-neutral-100 text-neutral-800">
                      {po.status}
                    </span>
                    <div className="text-sm font-medium text-neutral-900 mt-1">${po.totalAmount?.toLocaleString()}</div>
                  </div>
                </div>
              ))}
              {supplierOrders.length === 0 && (
                <div className="p-8 text-center text-neutral-500 text-sm">
                  No purchase orders found for this supplier.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
