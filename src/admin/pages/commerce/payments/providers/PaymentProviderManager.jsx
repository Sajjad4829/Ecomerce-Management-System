import { useState } from 'react';
import { FiSettings, FiAlertTriangle, FiActivity, FiRefreshCw } from 'react-icons/fi';

const MOCK_PROVIDERS = [
  { id: 'stripe', name: 'Stripe', env: 'Test', status: 'Configured', methods: ['Online Payment'] },
  { id: 'mfs_gateway', name: 'MFS Gateway (bKash/Nagad)', env: 'Live', status: 'Needs Config', methods: ['Mobile Financial Services'] },
  { id: 'manual', name: 'Manual Bank Transfer', env: 'Production', status: 'Configured', methods: ['Bank Transfer'] },
  { id: 'cod', name: 'Cash on Delivery', env: 'Production', status: 'Configured', methods: ['Cash on Delivery'] },
];

const MOCK_WEBHOOKS = [
  { id: 'evt_1', provider: 'Stripe', event: 'charge.succeeded', status: '200 OK', time: '10 mins ago' },
  { id: 'evt_2', provider: 'Stripe', event: 'payment_intent.created', status: '200 OK', time: '11 mins ago' },
  { id: 'evt_3', provider: 'MFS Gateway', event: 'transaction.failed', status: '500 ERR', time: '1 hour ago' },
];

export default function PaymentProviderManager() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payment Providers</h1>
          <p className="text-sm text-gray-500 mt-1">Configure backend provider integrations and monitor webhooks.</p>
        </div>
      </div>

      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3 text-sm text-yellow-800">
        <FiAlertTriangle className="shrink-0 mt-0.5 text-yellow-500" />
        <div>
          <p className="font-bold">Security Notice</p>
          <p>Never enter or store secret API keys in the frontend. Provider credentials must be securely configured on the backend.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_PROVIDERS.map(provider => (
          <div key={provider.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{provider.name}</h3>
                <p className="text-sm text-gray-500 mt-1">Env: <span className="font-mono">{provider.env}</span></p>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                provider.status === 'Configured' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {provider.status}
              </span>
            </div>
            
            <div className="mb-6">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Supported Methods</h4>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {provider.methods.map(m => <li key={m}>{m}</li>)}
              </ul>
            </div>

            <button className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
              <FiSettings size={16} /> Configure Placeholder
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-8">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiActivity className="text-gray-400" />
            <h2 className="text-lg font-bold text-gray-900">Recent Webhook Events</h2>
          </div>
          <button className="text-gray-500 hover:text-gray-900"><FiRefreshCw size={16} /></button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Provider</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {MOCK_WEBHOOKS.map(evt => (
                <tr key={evt.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">{evt.provider}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600 font-mono text-xs">{evt.event}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      evt.status.includes('200') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {evt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{evt.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
