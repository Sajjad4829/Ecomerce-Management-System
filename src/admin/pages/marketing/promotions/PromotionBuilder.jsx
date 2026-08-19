import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiCheck, FiInfo, FiPercent, FiCalendar, FiUsers } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import PromotionEligibility from '../../../components/commerce/promotions/PromotionEligibility';
import DiscountEditor from '../../../components/commerce/promotions/DiscountEditor';
import ScheduleEditor from '../../../components/commerce/promotions/ScheduleEditor';

const STEPS = [
  { id: 'basic', label: 'Basic Info', icon: FiInfo },
  { id: 'discount', label: 'Discount', icon: FiPercent },
  { id: 'eligibility', label: 'Eligibility', icon: FiUsers },
  { id: 'schedule', label: 'Schedule', icon: FiCalendar }
];

export default function PromotionBuilder() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState('basic');
  const [formData, setFormData] = useState({
    name: '',
    type: 'discount_code', // 'discount_code' | 'automatic'
    code: '',
    discountType: 'percentage', // 'percentage' | 'fixed'
    discountValue: '',
    appliesTo: 'all', // 'all' | 'categories' | 'collections' | 'products'
    selectedItems: [],
    customerEligibility: 'all', // 'all' | 'groups'
    selectedGroups: [],
    hasMinimumRequirements: false,
    minimumRequirementType: 'amount', // 'amount' | 'quantity'
    minimumRequirementValue: '',
    usageLimit: false,
    usageLimitValue: '',
    oncePerCustomer: false,
    startDate: '',
    startTime: '',
    hasEndDate: false,
    endDate: '',
    endTime: ''
  });

  const handleSave = () => {
    // Save logic placeholder
    navigate('/admin/marketing/promotions');
  };

  const currentStepIndex = STEPS.findIndex(s => s.id === activeStep);

  const nextStep = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setActiveStep(STEPS[currentStepIndex + 1].id);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setActiveStep(STEPS[currentStepIndex - 1].id);
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-theme(spacing.20))]">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background pt-4 pb-4 border-b border-black/5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/admin/marketing/promotions" className="p-2 bg-surface border border-black/10 rounded-lg text-text-muted hover:text-black hover:border-black/20 transition-all shadow-sm">
            <FiArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-xl font-serif font-bold text-text-primary">
              {formData.name || 'Untitled Promotion'}
            </h1>
            <p className="text-xs text-text-muted mt-0.5">Promotion Builder</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            className="px-4 py-2 text-text-secondary hover:text-black text-sm font-medium transition-colors"
          >
            Save as Draft
          </button>
          <button 
            onClick={handleSave}
            className="px-6 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-semibold hover:bg-black transition-colors shadow-sm flex items-center gap-2"
          >
            <FiCheck size={16} /> Activate Promotion
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden mt-6">
        {/* Sidebar Steps */}
        <div className="w-64 shrink-0 pr-8 hidden md:block">
          <div className="sticky top-24 space-y-2">
            {STEPS.map((step, idx) => {
              const isPast = STEPS.findIndex(s => s.id === activeStep) > idx;
              const isActive = activeStep === step.id;
              
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium text-left ${
                    isActive 
                      ? 'bg-surface shadow-sm border border-black/5 text-text-primary' 
                      : 'text-text-muted hover:bg-gray-100 hover:text-text-primary border border-transparent'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border ${
                    isActive 
                      ? 'border-[#1A1A1A] text-text-primary' 
                      : isPast
                        ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white'
                        : 'border-border-hover text-text-muted'
                  }`}>
                    {isPast ? <FiCheck size={12} /> : <step.icon size={12} />}
                  </div>
                  {step.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto pb-24">
          <div className="max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-surface rounded-xl border border-black/5 shadow-sm p-8"
              >
                {activeStep === 'basic' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-lg font-serif font-bold text-text-primary mb-1">Basic Information</h2>
                      <p className="text-sm text-text-muted">Name and type of the promotion.</p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-xs font-mono font-bold text-text-muted uppercase mb-2">Promotion Name</label>
                        <input 
                          type="text" 
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="e.g. Summer Sale 2026"
                          className="w-full px-4 py-2.5 bg-background border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 focus:bg-surface transition-all text-sm font-medium text-text-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-text-muted uppercase mb-3">Method</label>
                        <div className="grid grid-cols-2 gap-4">
                          <label className={`border rounded-xl p-4 cursor-pointer transition-all ${formData.type === 'discount_code' ? 'border-[#1A1A1A] bg-background shadow-sm' : 'border-black/10 hover:border-black/30'}`}>
                            <div className="flex items-start gap-3">
                              <div className="pt-1">
                                <input 
                                  type="radio" 
                                  name="promoType" 
                                  checked={formData.type === 'discount_code'}
                                  onChange={() => setFormData(prev => ({ ...prev, type: 'discount_code' }))}
                                  className="w-4 h-4 text-text-primary focus:ring-[#1A1A1A]" 
                                />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-text-primary">Discount Code</p>
                                <p className="text-xs text-text-muted mt-1">Customers must enter this code at checkout.</p>
                              </div>
                            </div>
                          </label>
                          <label className={`border rounded-xl p-4 cursor-pointer transition-all ${formData.type === 'automatic' ? 'border-[#1A1A1A] bg-background shadow-sm' : 'border-black/10 hover:border-black/30'}`}>
                            <div className="flex items-start gap-3">
                              <div className="pt-1">
                                <input 
                                  type="radio" 
                                  name="promoType" 
                                  checked={formData.type === 'automatic'}
                                  onChange={() => setFormData(prev => ({ ...prev, type: 'automatic' }))}
                                  className="w-4 h-4 text-text-primary focus:ring-[#1A1A1A]" 
                                />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-text-primary">Automatic Discount</p>
                                <p className="text-xs text-text-muted mt-1">Applies automatically in cart and checkout.</p>
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>

                      {formData.type === 'discount_code' && (
                        <div className="pt-4 border-t border-black/5">
                          <label className="block text-xs font-mono font-bold text-text-muted uppercase mb-2">Discount Code</label>
                          <div className="flex gap-3">
                            <input 
                              type="text" 
                              value={formData.code}
                              onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value.toUpperCase().replace(/\s/g, '') }))}
                              placeholder="e.g. SUMMER20"
                              className="flex-1 px-4 py-2.5 bg-background border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 focus:bg-surface transition-all text-sm font-mono font-bold text-text-primary"
                            />
                            <button 
                              onClick={() => setFormData(prev => ({ ...prev, code: Math.random().toString(36).substring(2, 10).toUpperCase() }))}
                              className="px-4 py-2 bg-gray-100 text-text-primary rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors whitespace-nowrap"
                            >
                              Generate
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeStep === 'discount' && (
                  <DiscountEditor formData={formData} setFormData={setFormData} />
                )}

                {activeStep === 'eligibility' && (
                  <PromotionEligibility formData={formData} setFormData={setFormData} />
                )}

                {activeStep === 'schedule' && (
                  <ScheduleEditor formData={formData} setFormData={setFormData} />
                )}

              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-between">
              <button 
                onClick={prevStep}
                disabled={currentStepIndex === 0}
                className="px-6 py-2.5 bg-surface border border-black/10 text-text-secondary rounded-lg text-sm font-medium hover:bg-background transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous Step
              </button>
              
              {currentStepIndex < STEPS.length - 1 ? (
                <button 
                  onClick={nextStep}
                  className="px-6 py-2.5 bg-[#1A1A1A] text-white rounded-lg text-sm font-semibold hover:bg-black transition-colors shadow-sm"
                >
                  Continue
                </button>
              ) : (
                <button 
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors shadow-sm"
                >
                  Finish & Activate
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
