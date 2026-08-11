import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFinance } from '../../../context/finance/FinanceContext';
import { ArrowLeft, Printer, Download } from 'lucide-react';

export const InvoiceDetail = () => {
  const { invoiceId } = useParams();
  const navigate = useNavigate();
  const { getInvoice } = useFinance();
  const inv = getInvoice(invoiceId);

  if (!inv) return <div className="p-8">Invoice not found.</div>;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/admin/finance/invoices')}
          className="p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-serif text-neutral-900">
            Invoice {inv.invoiceNumber}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-neutral-200 text-neutral-700 bg-white rounded-md hover:bg-neutral-50 transition-colors flex items-center gap-2">
            <Printer className="w-4 h-4" /> Print
          </button>
          <button className="px-4 py-2 border border-neutral-200 text-neutral-700 bg-white rounded-md hover:bg-neutral-50 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" /> Download PDF
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-neutral-200 shadow-sm p-8 max-w-3xl mx-auto">
        <div className="flex justify-between items-start border-b border-neutral-200 pb-8 mb-8">
          <div>
            <h2 className="text-2xl font-serif font-medium text-neutral-900 tracking-tight">Premium Furniture Co.</h2>
            <div className="text-sm text-neutral-500 mt-2 space-y-1">
              <p>123 Enterprise Way</p>
              <p>Suite 400</p>
              <p>New York, NY 10001</p>
              <p>billing@premiumfurniture.co</p>
            </div>
          </div>
          <div className="text-right">
            <h3 className="text-4xl font-serif text-neutral-200 uppercase tracking-widest mb-4">INVOICE</h3>
            <div className="space-y-1 text-sm">
              <p><span className="text-neutral-500">Invoice #:</span> <span className="font-medium text-neutral-900">{inv.invoiceNumber}</span></p>
              <p><span className="text-neutral-500">Date:</span> <span className="font-medium text-neutral-900">{inv.date}</span></p>
              <p><span className="text-neutral-500">Order ID:</span> <span className="font-medium text-neutral-900">{inv.orderId}</span></p>
            </div>
            <div className={`mt-4 inline-block px-3 py-1 rounded text-sm font-medium border ${
              inv.status === 'Paid' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-amber-200 bg-amber-50 text-amber-700'
            }`}>
              {inv.status}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12 mb-8">
          <div>
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Billed To</h4>
            <div className="text-sm text-neutral-900 font-medium">{inv.customer}</div>
            <div className="text-sm text-neutral-500 mt-1 space-y-1">
              <p>456 Customer Ave</p>
              <p>Apt 4B</p>
              <p>Los Angeles, CA 90001</p>
            </div>
          </div>
        </div>

        <table className="w-full text-left text-sm mb-8">
          <thead className="border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="py-3 font-medium">Description</th>
              <th className="py-3 font-medium text-right">Qty</th>
              <th className="py-3 font-medium text-right">Unit Price</th>
              <th className="py-3 font-medium text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            <tr>
              <td className="py-4 text-neutral-900 font-medium">Order Items Placeholder</td>
              <td className="py-4 text-right text-neutral-600">1</td>
              <td className="py-4 text-right text-neutral-600">${inv.amount?.toLocaleString()}</td>
              <td className="py-4 text-right text-neutral-900 font-medium">${inv.amount?.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>

        <div className="w-1/2 ml-auto space-y-3 text-sm">
          <div className="flex justify-between text-neutral-500">
            <span>Subtotal</span>
            <span>${inv.amount?.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-neutral-500">
            <span>Tax (0%)</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between text-lg font-medium text-neutral-900 pt-3 border-t border-neutral-200">
            <span>Total Due</span>
            <span>${inv.amount?.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
