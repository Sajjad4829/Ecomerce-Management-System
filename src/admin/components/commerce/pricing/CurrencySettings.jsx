import { useState, useEffect } from 'react';
import { FiDollarSign, FiPlus, FiTrash2, FiSave } from 'react-icons/fi';
import { useSettings } from '../../../context/settings/SettingsContext';

const AVAILABLE_CURRENCIES = [
  { code: 'USD', symbol: '$', rate: 1, name: 'United States Dollar' },
  { code: 'BDT', symbol: '৳', rate: 120, name: 'Bangladeshi Taka' },
  { code: 'EUR', symbol: '€', rate: 0.92, name: 'Euro' },
  { code: 'GBP', symbol: '£', rate: 0.79, name: 'British Pound' },
  { code: 'CAD', symbol: '$', rate: 1.35, name: 'Canadian Dollar' },
];

export default function CurrencySettings() {
  const { settings, updateSetting, saveSettings, loading } = useSettings();
  const [currencies, setCurrencies] = useState(AVAILABLE_CURRENCIES);

  const activeCurrency = currencies.find(c => c.code === settings.currency) || currencies[0];

  const handleSetBaseCurrency = (code) => {
    updateSetting('currency', code);
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-xl font-serif font-bold text-text-primary mb-2">Currency Architecture</h2>
            <p className="text-sm text-text-muted max-w-lg">
              Manage base currency and supported exchange currencies. Live rates and dynamic conversion are scheduled for a future phase.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-gray-100 text-text-primary rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2">
              <FiPlus size={16} /> Add Currency
            </button>
            <button 
              onClick={saveSettings}
              disabled={loading}
              className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-hover transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <FiSave size={16} /> {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-background p-6 rounded-xl border border-black/5">
            <h3 className="text-sm font-bold text-text-primary mb-4">Base Currency</h3>
            <div className="flex items-center gap-4 bg-surface p-4 rounded-lg border border-black/10">
              <div className="w-10 h-10 bg-success-soft rounded-full flex items-center justify-center text-success">
                <span className="font-bold text-lg">{activeCurrency.symbol}</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-text-primary">{activeCurrency.name} ({activeCurrency.code})</p>
                <p className="text-xs text-text-muted mt-0.5">Currently used globally for base pricing and inventory.</p>
              </div>
              <div className="px-3 py-1 bg-success-soft text-success text-xs font-bold uppercase tracking-wider rounded">
                Active Base
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-text-primary mb-4">Supported Currencies</h3>
            <div className="bg-surface border border-black/5 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-background border-b border-black/5">
                    <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Currency Code</th>
                    <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Symbol</th>
                    <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Exchange Rate</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {currencies.map(currency => (
                    <tr key={currency.code} className={settings.currency === currency.code ? 'bg-primary-50/10' : ''}>
                      <td className="p-4">
                        <span className="font-bold text-text-primary">{currency.code}</span>
                        {settings.currency === currency.code && (
                          <span className="ml-2 text-[10px] font-bold text-primary uppercase tracking-wider">Base</span>
                        )}
                      </td>
                      <td className="p-4">
                        <span className="font-mono text-text-muted bg-gray-100 px-2 py-1 rounded">{currency.symbol}</span>
                      </td>
                      <td className="p-4">
                        <input 
                          type="number" 
                          value={currency.rate}
                          readOnly
                          className="w-24 px-3 py-1.5 bg-background border-transparent rounded text-sm focus:outline-none"
                        />
                      </td>
                      <td className="p-4 text-right flex justify-end items-center gap-2">
                        {settings.currency !== currency.code ? (
                          <button 
                            onClick={() => handleSetBaseCurrency(currency.code)}
                            className="text-xs font-bold text-primary hover:text-primary-hover transition-colors px-2 py-1 rounded border border-primary/20 hover:border-primary/50"
                          >
                            Set Base
                          </button>
                        ) : (
                          <span className="text-xs font-bold text-text-muted px-2 py-1">Active</span>
                        )}
                        <button className="p-2 text-text-muted hover:text-danger transition-colors">
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
