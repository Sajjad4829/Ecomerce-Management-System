import { FiDollarSign, FiPercent } from 'react-icons/fi';

export default function DiscountEditor({ formData, setFormData }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-serif font-bold text-text-primary mb-1">Discount Value</h2>
        <p className="text-sm text-text-muted">How much will be deducted from the price.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-xs font-mono font-bold text-text-muted uppercase mb-3">Discount Type</label>
          <div className="flex gap-4">
            <button
              onClick={() => setFormData(prev => ({ ...prev, discountType: 'percentage' }))}
              className={`flex-1 py-3 px-4 rounded-xl border flex items-center justify-center gap-2 text-sm font-bold transition-all ${
                formData.discountType === 'percentage'
                  ? 'border-[#1A1A1A] bg-background shadow-sm text-text-primary'
                  : 'border-black/10 text-text-muted hover:border-black/30'
              }`}
            >
              <FiPercent /> Percentage
            </button>
            <button
              onClick={() => setFormData(prev => ({ ...prev, discountType: 'fixed' }))}
              className={`flex-1 py-3 px-4 rounded-xl border flex items-center justify-center gap-2 text-sm font-bold transition-all ${
                formData.discountType === 'fixed'
                  ? 'border-[#1A1A1A] bg-background shadow-sm text-text-primary'
                  : 'border-black/10 text-text-muted hover:border-black/30'
              }`}
            >
              <FiDollarSign /> Fixed Amount
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono font-bold text-text-muted uppercase mb-2">
            Discount Value {formData.discountType === 'percentage' ? '(%)' : '($)'}
          </label>
          <div className="relative w-1/2">
            {formData.discountType === 'fixed' && (
              <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            )}
            <input 
              type="number" 
              value={formData.discountValue}
              onChange={(e) => setFormData(prev => ({ ...prev, discountValue: e.target.value }))}
              placeholder={formData.discountType === 'percentage' ? "e.g. 20" : "e.g. 50"}
              className={`w-full pr-4 py-2.5 bg-background border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 focus:bg-surface transition-all text-sm font-medium text-text-primary ${
                formData.discountType === 'fixed' ? 'pl-8' : 'pl-4'
              }`}
            />
            {formData.discountType === 'percentage' && (
              <FiPercent className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted" />
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
