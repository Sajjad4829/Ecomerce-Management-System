import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiClock, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';

export default function TransactionDetail() {
  const { id } = useParams();

  // Mock data for the placeholder
  const transaction = {
    id: id || 'TXN-1001',
    orderId: 'ORD-2026-1102',
    customer: { name: 'John Doe', email: 'john@example.com' },
    provider: 'stripe',
    method: 'online',
    amount: 150.00,
    currency: 'USD',
    status: 'Succeeded',
    reference: 'ch_1Mxxxx2eZvKYlo2Cxxxxxx',
    createdAt: '2026-08-08T10:00:00Z',
    updatedAt: '2026-08-08T10:01:12Z',
    events: [
      { id: 'ev_1', type: 'payment_intent.created', date: '2026-08-08T10:00:00Z', note: 'Intent created.' },
      { id: 'ev_2', type: 'charge.succeeded', date: '2026-08-08T10:01:10Z', note: 'Provider confirmed success.' },
      { id: 'ev_3', type: 'order.updated', date: '2026-08-08T10:01:12Z', note: 'Order status updated to Paid.' }
    ]
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Link to="/admin/payments" className="p-2 border border-border rounded-lg hover:bg-background transition-colors">
          <FiArrowLeft size={20} className="text-text-secondary" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Transaction {transaction.id}</h1>
          <p className="text-sm text-text-muted mt-1">Order: {transaction.orderId}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Main Info */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-surface rounded-lg shadow-sm border border-border p-6">
            <h2 className="text-lg font-bold text-text-primary mb-4">Payment Details</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-text-muted">Amount</p>
                <p className="text-2xl font-bold text-text-primary">${transaction.amount.toFixed(2)} <span className="text-base font-normal text-text-muted">{transaction.currency}</span></p>
              </div>
              <div>
                <p className="text-sm font-medium text-text-muted">Status</p>
                <div className="mt-1">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    transaction.status === 'Succeeded' ? 'bg-success-soft text-green-800' :
                    transaction.status === 'Failed' ? 'bg-danger-soft text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {transaction.status}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-text-muted">Provider</p>
                <p className="text-base text-text-primary font-medium">{transaction.provider}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-text-muted">Method</p>
                <p className="text-base text-text-primary font-medium uppercase">{transaction.method}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-medium text-text-muted">Provider Reference</p>
                <p className="text-sm text-text-primary font-mono bg-background p-2 rounded border border-border mt-1">
                  {transaction.reference}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-lg shadow-sm border border-border p-6">
            <h2 className="text-lg font-bold text-text-primary mb-4">Timeline (Mock)</h2>
            <div className="space-y-6">
              {transaction.events.map((ev, i) => (
                <div key={ev.id} className="relative pl-6">
                  {i !== transaction.events.length - 1 && (
                    <div className="absolute top-6 left-[11px] bottom-[-24px] w-px bg-gray-200" />
                  )}
                  <div className="absolute top-1 left-0 w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center">
                    <FiClock size={12} className="text-text-muted" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{ev.type}</p>
                    <p className="text-xs text-text-muted">{new Date(ev.date).toLocaleString()}</p>
                    <p className="text-sm text-text-secondary mt-1">{ev.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-surface rounded-lg shadow-sm border border-border p-6">
            <h2 className="text-lg font-bold text-text-primary mb-4">Customer</h2>
            <p className="text-sm font-medium text-text-primary">{transaction.customer.name}</p>
            <p className="text-sm text-text-muted">{transaction.customer.email}</p>
            <Link to="#" className="text-sm text-primary hover:underline mt-2 inline-block">View Customer</Link>
          </div>

          <div className="bg-surface rounded-lg shadow-sm border border-border p-6">
            <h2 className="text-lg font-bold text-text-primary mb-4">Actions (Placeholders)</h2>
            <div className="space-y-3">
              <button className="w-full py-2 px-4 bg-surface border border-border-hover rounded-lg text-sm font-medium text-text-secondary hover:bg-background transition-colors">
                Refund Transaction
              </button>
              <button className="w-full py-2 px-4 bg-surface border border-border-hover rounded-lg text-sm font-medium text-text-secondary hover:bg-background transition-colors">
                View Provider Logs
              </button>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg flex gap-3 text-sm text-blue-800">
              <FiCheckCircle className="shrink-0 mt-0.5 text-blue-500" />
              <p>This is a mock transaction representation. No real payment credentials or secrets are stored here.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
