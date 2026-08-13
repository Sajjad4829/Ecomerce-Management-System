import React from 'react';
import { useFinance } from '../../context/finance/FinanceContext';
import { CreditCard, FileText, Calculator, Percent, Users, Settings, FileCheck2, DollarSign, BookOpen, BarChart2, MoreVertical, Check, X, ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

export const PaymentCenter = () => {
  const { payments } = useFinance();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">Payments</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage customer payments</p>
        </div>
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Payment ID</th>
              <th className="px-6 py-4 font-medium">Order</th>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Amount</th>
              <th className="px-6 py-4 font-medium">Method</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {payments.map(p => (
              <tr key={p.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{p.id}</td>
                <td className="px-6 py-4 text-neutral-600">{p.orderId}</td>
                <td className="px-6 py-4 text-neutral-600">{p.customer}</td>
                <td className="px-6 py-4 font-medium">${p.amount}</td>
                <td className="px-6 py-4 text-neutral-600">{p.method}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${p.status === 'Paid' ? 'bg-success-soft text-green-800' : 'bg-neutral-100 text-neutral-800'}`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-neutral-500">{new Date(p.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right">
                  <Link to={`/admin/finance/payments/${p.id}`} className="text-primary hover:text-indigo-900 font-medium">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const PaymentDetail = () => {
  const { paymentId } = useParams();
  const { getPayment } = useFinance();
  const payment = getPayment(paymentId) || useFinance().payments[0];

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/admin/finance/payments" className="p-2 border border-neutral-200 rounded-md hover:bg-neutral-50 text-neutral-600">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">Payment {payment.id}</h1>
          <p className="text-sm text-neutral-500 mt-1">Order: {payment.orderId}</p>
        </div>
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 p-6">
        <h3 className="text-sm font-medium text-neutral-900 mb-4">Payment Details</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><div className="text-neutral-500">Customer</div><div className="font-medium mt-1">{payment.customer}</div></div>
          <div><div className="text-neutral-500">Amount</div><div className="font-medium mt-1">${payment.amount}</div></div>
          <div><div className="text-neutral-500">Method</div><div className="font-medium mt-1">{payment.method}</div></div>
          <div><div className="text-neutral-500">Reference</div><div className="font-medium mt-1">{payment.reference}</div></div>
          <div><div className="text-neutral-500">Status</div><div className="font-medium mt-1">{payment.status}</div></div>
          <div><div className="text-neutral-500">Date</div><div className="font-medium mt-1">{new Date(payment.date).toLocaleDateString()}</div></div>
        </div>
      </div>
    </div>
  );
};

export const CreditNoteCenter = () => {
  const { creditNotes } = useFinance();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-serif text-neutral-900">Credit Notes</h1>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Credit Note</th>
              <th className="px-6 py-4 font-medium">Invoice</th>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Amount</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {creditNotes.map(cn => (
              <tr key={cn.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{cn.id}</td>
                <td className="px-6 py-4 text-neutral-600">{cn.invoiceId}</td>
                <td className="px-6 py-4 text-neutral-600">{cn.customer}</td>
                <td className="px-6 py-4 font-medium">${cn.amount}</td>
                <td className="px-6 py-4 text-neutral-600">{cn.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const DebitNoteCenter = () => {
  const { debitNotes } = useFinance();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-serif text-neutral-900">Debit Notes</h1>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Debit Note</th>
              <th className="px-6 py-4 font-medium">Invoice</th>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Amount</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {debitNotes.map(dn => (
              <tr key={dn.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{dn.id}</td>
                <td className="px-6 py-4 text-neutral-600">{dn.invoiceId}</td>
                <td className="px-6 py-4 text-neutral-600">{dn.customer}</td>
                <td className="px-6 py-4 font-medium">${dn.amount}</td>
                <td className="px-6 py-4 text-neutral-600">{dn.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const TaxCenter = () => {
  const { taxRules } = useFinance();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-neutral-900">Tax Rules</h1>
        <div className="space-x-3">
          <Link to="/admin/finance/tax/transactions" className="px-4 py-2 border border-neutral-200 rounded-md text-neutral-700 hover:bg-neutral-50 text-sm">Transactions</Link>
          <Link to="/admin/finance/tax/reports" className="px-4 py-2 border border-neutral-200 rounded-md text-neutral-700 hover:bg-neutral-50 text-sm">Reports</Link>
        </div>
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Rule Name</th>
              <th className="px-6 py-4 font-medium">Rate</th>
              <th className="px-6 py-4 font-medium">Applies To</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {taxRules.map(tr => (
              <tr key={tr.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{tr.name}</td>
                <td className="px-6 py-4 text-neutral-600">{tr.rate}%</td>
                <td className="px-6 py-4 text-neutral-600">{tr.appliesTo}</td>
                <td className="px-6 py-4 text-neutral-600">{tr.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const TaxTransactions = () => {
  const { taxTransactions } = useFinance();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-serif text-neutral-900">Tax Transactions</h1>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Transaction ID</th>
              <th className="px-6 py-4 font-medium">Order</th>
              <th className="px-6 py-4 font-medium">Rule</th>
              <th className="px-6 py-4 font-medium">Taxable Amount</th>
              <th className="px-6 py-4 font-medium">Tax Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {taxTransactions.map(tt => (
              <tr key={tt.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{tt.id}</td>
                <td className="px-6 py-4 text-neutral-600">{tt.orderId}</td>
                <td className="px-6 py-4 text-neutral-600">{tt.taxRule}</td>
                <td className="px-6 py-4 text-neutral-600">${tt.taxableAmount}</td>
                <td className="px-6 py-4 font-medium text-neutral-900">${tt.taxAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const TaxReports = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-serif text-neutral-900">Tax Reports</h1>
      <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm text-center">
        <Calculator className="w-12 h-12 mx-auto text-neutral-300 mb-4" />
        <h3 className="font-medium text-neutral-900">Tax Reporting</h3>
        <p className="text-sm text-neutral-500 mt-1">Placeholder for tax collected, taxable sales, tax-exempt sales, etc.</p>
      </div>
    </div>
  );
};

export const DiscountCenter = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-serif text-neutral-900">Discounts Impact</h1>
      <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm text-center">
        <Percent className="w-12 h-12 mx-auto text-neutral-300 mb-4" />
        <h3 className="font-medium text-neutral-900">Financial Impact of Discounts</h3>
        <p className="text-sm text-neutral-500 mt-1">Placeholder for discount totals, campaigns impact, and coupon usage financial summaries.</p>
      </div>
    </div>
  );
};

export const CustomerBalances = () => {
  const { customerBalances } = useFinance();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-serif text-neutral-900">Customer Balances</h1>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Outstanding</th>
              <th className="px-6 py-4 font-medium">Credits</th>
              <th className="px-6 py-4 font-medium">Refunds</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {customerBalances.map(cb => (
              <tr key={cb.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{cb.customer}</td>
                <td className="px-6 py-4 text-neutral-600">${cb.outstanding}</td>
                <td className="px-6 py-4 text-neutral-600">${cb.credits}</td>
                <td className="px-6 py-4 text-neutral-600">${cb.refunds}</td>
                <td className="px-6 py-4 text-neutral-600">{cb.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const AdjustmentCenter = () => {
  const { adjustments } = useFinance();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-serif text-neutral-900">Financial Adjustments</h1>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">ID</th>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium">Amount</th>
              <th className="px-6 py-4 font-medium">Reason</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {adjustments.map(adj => (
              <tr key={adj.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{adj.id}</td>
                <td className="px-6 py-4 text-neutral-600">{adj.customer}</td>
                <td className="px-6 py-4 text-neutral-600">{adj.type}</td>
                <td className="px-6 py-4 text-neutral-600">${adj.amount}</td>
                <td className="px-6 py-4 text-neutral-600">{adj.reason}</td>
                <td className="px-6 py-4 text-neutral-600">{adj.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};



export const ReconciliationDetail = () => {
  const { reconciliationId } = useParams();
  const { getReconciliation } = useFinance();
  const rec = getReconciliation(reconciliationId) || useFinance().reconciliations[0];
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-serif text-neutral-900">Reconciliation {rec.id}</h1>
      <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm text-center">
        <FileCheck2 className="w-12 h-12 mx-auto text-neutral-300 mb-4" />
        <h3 className="font-medium text-neutral-900">Period: {rec.period}</h3>
        <p className="text-sm text-neutral-500 mt-1">Expected: ${rec.expectedAmount} | Received: ${rec.receivedAmount} | Difference: ${rec.difference}</p>
        <p className="text-sm text-neutral-500 mt-1 italic">Mock reconciliation view. No real bank integration.</p>
      </div>
    </div>
  );
};

export const ExpenseCenter = () => {
  const { expenses } = useFinance();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-serif text-neutral-900">Expenses Foundation</h1>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Expense ID</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Amount</th>
              <th className="px-6 py-4 font-medium">Description</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {expenses.map(exp => (
              <tr key={exp.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{exp.id}</td>
                <td className="px-6 py-4 text-neutral-600">{exp.category}</td>
                <td className="px-6 py-4 font-medium">${exp.amount}</td>
                <td className="px-6 py-4 text-neutral-600">{exp.description}</td>
                <td className="px-6 py-4 text-neutral-600">{exp.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const AccountCenter = () => {
  const { accounts } = useFinance();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-serif text-neutral-900">Accounting Categories (Chart of Accounts)</h1>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Code</th>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {accounts.map(acc => (
              <tr key={acc.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{acc.code}</td>
                <td className="px-6 py-4 font-medium text-neutral-900">{acc.name}</td>
                <td className="px-6 py-4 text-neutral-600">{acc.type}</td>
                <td className="px-6 py-4 text-neutral-600">{acc.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const FinancialPeriods = () => {
  const { periods } = useFinance();
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-serif text-neutral-900">Financial Periods</h1>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Period</th>
              <th className="px-6 py-4 font-medium">Start Date</th>
              <th className="px-6 py-4 font-medium">End Date</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {periods.map(per => (
              <tr key={per.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{per.name}</td>
                <td className="px-6 py-4 text-neutral-600">{per.startDate}</td>
                <td className="px-6 py-4 text-neutral-600">{per.endDate}</td>
                <td className="px-6 py-4 text-neutral-600">{per.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const FinancialReports = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-serif text-neutral-900">Financial Reports</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/admin/finance/reports/profit-loss" className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm hover:border-indigo-300 transition-colors">
          <h3 className="font-medium text-neutral-900 text-lg mb-2">Profit & Loss</h3>
          <p className="text-sm text-neutral-500">View revenue, costs, and net profit over time.</p>
        </Link>
        <Link to="/admin/finance/reports/cash-flow" className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm hover:border-indigo-300 transition-colors">
          <h3 className="font-medium text-neutral-900 text-lg mb-2">Cash Flow</h3>
          <p className="text-sm text-neutral-500">Track cash inflows and outflows.</p>
        </Link>
      </div>
    </div>
  );
};

export const ProfitLossReport = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-serif text-neutral-900">Profit & Loss Foundation</h1>
      <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm text-center">
        <BarChart2 className="w-12 h-12 mx-auto text-neutral-300 mb-4" />
        <h3 className="font-medium text-neutral-900">Placeholder</h3>
        <p className="text-sm text-neutral-500 mt-1">Backend accounting calculation required. No real financial results available.</p>
      </div>
    </div>
  );
};

export const CashFlowReport = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-serif text-neutral-900">Cash Flow Foundation</h1>
      <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm text-center">
        <TrendingUp className="w-12 h-12 mx-auto text-neutral-300 mb-4" />
        <h3 className="font-medium text-neutral-900">Placeholder</h3>
        <p className="text-sm text-neutral-500 mt-1">Backend cash calculation required. No real cash flow available.</p>
      </div>
    </div>
  );
};
