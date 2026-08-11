export default function PromotionEligibility({ formData, setFormData }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-serif font-bold text-[#1A1A1A] mb-1">Eligibility & Requirements</h2>
        <p className="text-sm text-gray-500">Determine who can use this promotion and what they must buy.</p>
      </div>

      <div className="space-y-8">
        {/* Applies To */}
        <div>
          <label className="block text-xs font-mono font-bold text-gray-500 uppercase mb-3">Applies To</label>
          <div className="space-y-3">
            {[
              { id: 'all', label: 'All Products' },
              { id: 'categories', label: 'Specific Categories' },
              { id: 'collections', label: 'Specific Collections' },
              { id: 'products', label: 'Specific Products' }
            ].map(option => (
              <label key={option.id} className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="radio" 
                  name="appliesTo" 
                  checked={formData.appliesTo === option.id}
                  onChange={() => setFormData(prev => ({ ...prev, appliesTo: option.id }))}
                  className="w-4 h-4 text-[#1A1A1A] focus:ring-[#1A1A1A]" 
                />
                <span className="text-sm font-medium text-[#1A1A1A]">{option.label}</span>
              </label>
            ))}
          </div>
          {formData.appliesTo !== 'all' && (
            <div className="mt-4 p-4 bg-[#F7F5F2] rounded-lg border border-black/5">
              <button className="px-4 py-2 bg-white border border-black/10 text-gray-700 rounded text-sm font-medium hover:bg-gray-50 transition-colors">
                Browse {formData.appliesTo}...
              </button>
            </div>
          )}
        </div>

        <hr className="border-black/5" />

        {/* Minimum Requirements */}
        <div>
          <label className="block text-xs font-mono font-bold text-gray-500 uppercase mb-3">Minimum Requirements</label>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="radio" 
                name="hasMinimumRequirements" 
                checked={!formData.hasMinimumRequirements}
                onChange={() => setFormData(prev => ({ ...prev, hasMinimumRequirements: false }))}
                className="w-4 h-4 text-[#1A1A1A] focus:ring-[#1A1A1A]" 
              />
              <span className="text-sm font-medium text-[#1A1A1A]">None</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="radio" 
                name="hasMinimumRequirements" 
                checked={formData.hasMinimumRequirements && formData.minimumRequirementType === 'amount'}
                onChange={() => setFormData(prev => ({ ...prev, hasMinimumRequirements: true, minimumRequirementType: 'amount' }))}
                className="w-4 h-4 text-[#1A1A1A] focus:ring-[#1A1A1A]" 
              />
              <span className="text-sm font-medium text-[#1A1A1A]">Minimum purchase amount ($)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="radio" 
                name="hasMinimumRequirements" 
                checked={formData.hasMinimumRequirements && formData.minimumRequirementType === 'quantity'}
                onChange={() => setFormData(prev => ({ ...prev, hasMinimumRequirements: true, minimumRequirementType: 'quantity' }))}
                className="w-4 h-4 text-[#1A1A1A] focus:ring-[#1A1A1A]" 
              />
              <span className="text-sm font-medium text-[#1A1A1A]">Minimum quantity of items</span>
            </label>
          </div>
          
          {formData.hasMinimumRequirements && (
            <div className="mt-4 p-4 bg-[#F7F5F2] rounded-lg border border-black/5">
              <input 
                type="number" 
                value={formData.minimumRequirementValue}
                onChange={(e) => setFormData(prev => ({ ...prev, minimumRequirementValue: e.target.value }))}
                placeholder={formData.minimumRequirementType === 'amount' ? "e.g. 100" : "e.g. 2"}
                className="w-full md:w-1/2 px-4 py-2.5 bg-white border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 transition-all text-sm font-medium text-[#1A1A1A]"
              />
            </div>
          )}
        </div>

        <hr className="border-black/5" />

        {/* Customer Eligibility */}
        <div>
          <label className="block text-xs font-mono font-bold text-gray-500 uppercase mb-3">Customer Eligibility</label>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="radio" 
                name="customerEligibility" 
                checked={formData.customerEligibility === 'all'}
                onChange={() => setFormData(prev => ({ ...prev, customerEligibility: 'all' }))}
                className="w-4 h-4 text-[#1A1A1A] focus:ring-[#1A1A1A]" 
              />
              <span className="text-sm font-medium text-[#1A1A1A]">All Customers</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="radio" 
                name="customerEligibility" 
                checked={formData.customerEligibility === 'groups'}
                onChange={() => setFormData(prev => ({ ...prev, customerEligibility: 'groups' }))}
                className="w-4 h-4 text-[#1A1A1A] focus:ring-[#1A1A1A]" 
              />
              <span className="text-sm font-medium text-[#1A1A1A]">Specific Customer Groups</span>
            </label>
          </div>
          {formData.customerEligibility === 'groups' && (
            <div className="mt-4 p-4 bg-[#F7F5F2] rounded-lg border border-black/5">
              <button className="px-4 py-2 bg-white border border-black/10 text-gray-700 rounded text-sm font-medium hover:bg-gray-50 transition-colors">
                Browse Customer Groups...
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
