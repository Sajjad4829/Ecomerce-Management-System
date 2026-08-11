import { useState } from 'react';
import { FiDollarSign, FiPlus, FiTrash2 } from 'react-icons/fi';

const MOCK_CURRENCIES = [
  { code: 'USD', symbol: '$', rate: 1, isBase: true },
  { code: 'EUR', symbol: '€', rate: 0.92, isBase: false },
  { code: 'GBP', symbol: '£', rate: 0.79, isBase: false },
  { code: 'CAD', symbol: '$', rate: 1.35, isBase: false },
];

export default function CurrencySettings() {
  const [currencies, setCurrencies] = useState(MOCK_CURRENCIES);

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-xl font-serif font-bold text-[#1A1A1A] mb-2">Currency Architecture</h2>
            <p className="text-sm text-gray-500 max-w-lg">
              Manage base currency and supported exchange currencies. Live rates and dynamic conversion are scheduled for a future phase.
            </p>
          </div>
          <button className="px-4 py-2 bg-gray-100 text-[#1A1A1A] rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2">
            <FiPlus size={16} /> Add Currency
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-[#F7F5F2] p-6 rounded-xl border border-black/5">
            <h3 className="text-sm font-bold text-[#1A1A1A] mb-4">Base Currency</h3>
            <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-black/10">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700">
                <FiDollarSign size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-[#1A1A1A]">United States Dollar (USD)</p>
                <p className="text-xs text-gray-500 mt-0.5">Used for base pricing and inventory costs.</p>
              </div>
              <div className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold uppercase tracking-wider rounded">
                Base
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#1A1A1A] mb-4">Supported Currencies</h3>
            <div className="bg-white border border-black/5 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-black/5">
                    <th className="p-4 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">Currency Code</th>
                    <th className="p-4 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">Symbol</th>
                    <th className="p-4 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">Exchange Rate (Manual)</th>
                    <th className="p-4 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {currencies.filter(c => !c.isBase).map(currency => (
                    <tr key={currency.code}>
                      <td className="p-4">
                        <span className="font-bold text-[#1A1A1A]">{currency.code}</span>
                      </td>
                      <td className="p-4">
                        <span className="font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">{currency.symbol}</span>
                      </td>
                      <td className="p-4">
                        <input 
                          type="number" 
                          value={currency.rate}
                          readOnly
                          className="w-24 px-3 py-1.5 bg-[#F7F5F2] border-transparent rounded text-sm focus:outline-none"
                        />
                      </td>
                      <td className="p-4 text-right">
                        <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                          <FiTrash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
