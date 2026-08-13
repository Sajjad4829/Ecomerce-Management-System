import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiSave, FiInfo, FiMapPin, FiSettings, FiPhone, FiCheck, FiMonitor, FiTablet, FiSmartphone, FiAlertCircle } from 'react-icons/fi';
import { Rocket } from 'lucide-react';
import { useToast } from '../../../../components/ui/Toast/ToastContext';
import CatalogStatusBadge from '../../../components/commerce/shared/CatalogStatusBadge';

const STEPS = [
  { id: 'basic', label: 'Basic Info', number: '1', icon: FiInfo },
  { id: 'location', label: 'Location & Contact', number: '2', icon: FiMapPin },
  { id: 'operational', label: 'Operational Settings', number: '3', icon: FiSettings }
];

export default function WarehouseEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new' || !id;

  const { addToast } = useToast();
  
  const [activeTab, setActiveTab] = useState('basic');
  const [isSaving, setIsSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState('desktop');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    status: 'active',
    description: '',
    address: '',
    city: '',
    country: '',
    contactPerson: '',
    phone: '',
    email: '',
    isDefault: false,
    allowFulfillment: true,
    allowTransfers: true
  });

  useEffect(() => {
    if (!isNew) {
      setFormData({
        name: 'Main Hub - LA',
        code: 'WH-LAX',
        status: 'active',
        description: 'Primary west coast distribution center.',
        address: '123 Logistics Way',
        city: 'Los Angeles',
        country: 'United States',
        contactPerson: 'Jane Doe',
        phone: '+1 555-0198',
        email: 'lax-hub@example.com',
        isDefault: true,
        allowFulfillment: true,
        allowTransfers: true
      });
    }
  }, [id, isNew]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  const saveWarehouse = (status) => {
    setIsSaving(true);
    setTimeout(() => {
      setFormData(prev => ({ ...prev, status }));
      setIsSaving(false);
      setHasUnsavedChanges(false);
      
      addToast({ type: 'success', message: `Warehouse ${status === 'inactive' ? 'saved as inactive' : 'activated'} successfully` });
      
      navigate('/admin/catalog/warehouses');
    }, 800);
  };

  const handleSaveDraft = () => {
    saveWarehouse('inactive');
  };

  const handlePublish = () => {
    const errors = [];
    if (!formData.name.trim()) errors.push('Warehouse Name is required');
    if (!formData.code.trim()) errors.push('Warehouse Code is required');
    
    if (errors.length > 0) {
      errors.forEach(err => addToast({ type: 'error', message: err }));
      return;
    }
    
    saveWarehouse('active');
  };

  return (
    <div className="min-h-screen h-screen bg-background font-sans text-text-primary overflow-hidden flex flex-col relative">
      
      {/* Top Header */}
      <header className="px-8 py-6 shrink-0 flex items-center justify-between">
        <div className="flex items-start gap-4">
          <button 
            onClick={() => navigate('/admin/catalog/warehouses')}
            className="mt-1 p-2 bg-surface text-text-muted hover:text-text-primary transition-colors rounded-xl border border-border shadow-sm"
          >
            <FiArrowLeft size={20} />
          </button>
          <div>
            <p className="text-[10px] font-bold text-text-muted tracking-widest uppercase mb-1">
              Location Manager
            </p>
            <div className="flex items-center gap-3">
               <h1 className="font-serif text-3xl font-bold text-text-primary">
                 {isNew ? 'Create New Warehouse' : formData.name || 'Untitled'}
               </h1>
               {!isNew && <CatalogStatusBadge status={formData.status === 'active' ? 'published' : 'draft'} />}
               {hasUnsavedChanges && (
                  <span className="flex items-center gap-1 text-xs font-semibold text-warning bg-warning-soft border border-amber-200 px-2 py-1 rounded-full">
                    <FiAlertCircle /> Unsaved Changes
                  </span>
               )}
            </div>
            <p className="text-sm text-text-muted mt-1">
              {isNew ? 'Register a new warehouse facility' : `Code: ${formData.code}`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={handleSaveDraft}
            disabled={isSaving}
            className="flex items-center gap-2 px-5 py-2.5 bg-surface border border-primary/30 text-primary font-semibold text-sm rounded-xl hover:bg-primary-soft transition-colors shadow-sm"
          >
            {isSaving ? <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" /> : <FiSave size={18} />}
            {isSaving ? 'Saving...' : 'Save as Inactive'}
          </button>
          <button 
            onClick={handlePublish}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#4F46FF] to-[#6D63FF] text-white font-semibold text-sm rounded-xl hover:opacity-90 transition-opacity shadow-[0_4px_14px_rgba(79,70,255,0.3)] disabled:opacity-50"
          >
            <Rocket size={18} />
            Activate Warehouse
          </button>
        </div>
      </header>

      {/* Step Navigation */}
      <div className="px-8 pb-6 shrink-0 border-b border-border/50">
        <div className="flex flex-wrap items-center gap-3">
          {STEPS.map(step => {
            const isActive = activeTab === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setActiveTab(step.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                  isActive 
                    ? 'bg-primary text-white border-primary shadow-sm' 
                    : 'bg-surface border-border text-text-primary hover:bg-primary-soft/50'
                }`}
              >
                <span className={`flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-bold ${
                  isActive ? 'bg-surface text-primary' : 'bg-background text-text-muted'
                }`}>
                  {step.number}
                </span>
                {step.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Two-Column */}
      <div className="flex-1 overflow-hidden flex">
        
        {/* LEFT COLUMN: Form Cards (55%) */}
        <div className="w-[55%] h-full overflow-y-auto px-8 py-6 no-scrollbar pb-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {activeTab === 'basic' && (
                <div className="bg-surface rounded-2xl border border-border shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-[#111A4A] text-white rounded-lg"><FiInfo size={16} /></div>
                    <h2 className="text-lg font-bold text-text-primary">Basic Information</h2>
                  </div>
                  <p className="text-sm text-text-muted mb-6 ml-11">Identity and status of this location.</p>
                  
                  <div className="space-y-5">
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-text-primary mb-1.5">Warehouse Name <span className="text-[#FF4D4F]">*</span></label>
                        <input 
                          type="text" 
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          placeholder="e.g. Main Hub - LA"
                          className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-text-primary placeholder-[#7C849F]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-text-primary mb-1.5">Warehouse Code <span className="text-[#FF4D4F]">*</span></label>
                        <input 
                          type="text" 
                          value={formData.code}
                          onChange={(e) => handleChange('code', e.target.value.toUpperCase().replace(/\s/g, ''))}
                          placeholder="e.g. WH-LAX"
                          className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm font-mono font-bold text-text-primary placeholder-[#7C849F]"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-bold text-text-primary mb-1.5">Status</label>
                      <select 
                        value={formData.status}
                        onChange={(e) => handleChange('status', e.target.value)}
                        className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-text-primary"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-text-primary mb-1.5">Description</label>
                      <textarea 
                        rows={3}
                        value={formData.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-text-primary resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'location' && (
                <div className="bg-surface rounded-2xl border border-border shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-[#111A4A] text-white rounded-lg"><FiMapPin size={16} /></div>
                    <h2 className="text-lg font-bold text-text-primary">Location & Contact</h2>
                  </div>
                  <p className="text-sm text-text-muted mb-6 ml-11">Physical address and primary contact details.</p>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold text-text-primary mb-1.5">Street Address</label>
                      <input 
                        type="text" 
                        value={formData.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                        className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-text-primary"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-text-primary mb-1.5">City</label>
                        <input 
                          type="text" 
                          value={formData.city}
                          onChange={(e) => handleChange('city', e.target.value)}
                          className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-text-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-text-primary mb-1.5">Country</label>
                        <input 
                          type="text" 
                          value={formData.country}
                          onChange={(e) => handleChange('country', e.target.value)}
                          className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-text-primary"
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <h3 className="text-sm font-bold text-text-primary mb-4">Contact Information</h3>
                      <div className="space-y-5">
                        <div>
                          <label className="block text-xs font-bold text-text-primary mb-1.5">Contact Person</label>
                          <input 
                            type="text" 
                            value={formData.contactPerson}
                            onChange={(e) => handleChange('contactPerson', e.target.value)}
                            className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-text-primary"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                          <div>
                            <label className="block text-xs font-bold text-text-primary mb-1.5">Phone</label>
                            <input 
                              type="tel" 
                              value={formData.phone}
                              onChange={(e) => handleChange('phone', e.target.value)}
                              className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-text-primary"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-text-primary mb-1.5">Email</label>
                            <input 
                              type="email" 
                              value={formData.email}
                              onChange={(e) => handleChange('email', e.target.value)}
                              className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-text-primary"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'operational' && (
                <div className="bg-surface rounded-2xl border border-border shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-[#111A4A] text-white rounded-lg"><FiSettings size={16} /></div>
                    <h2 className="text-lg font-bold text-text-primary">Operational Settings</h2>
                  </div>
                  <p className="text-sm text-text-muted mb-6 ml-11">Configure how this warehouse behaves in the system.</p>

                  <div className="space-y-4">
                    <label className="flex items-center justify-between p-4 bg-background rounded-xl border border-border cursor-pointer hover:border-primary transition-colors">
                      <div>
                        <span className="text-sm font-bold text-text-primary block">Default Warehouse</span>
                        <span className="text-xs text-text-muted">Automatically assign new stock and fallback fulfillment to this location.</span>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={formData.isDefault}
                        onChange={(e) => handleChange('isDefault', e.target.checked)}
                        className="w-5 h-5 rounded border-border-hover text-primary focus:ring-primary" 
                      />
                    </label>

                    <label className="flex items-center justify-between p-4 bg-background rounded-xl border border-border cursor-pointer hover:border-primary transition-colors">
                      <div>
                        <span className="text-sm font-bold text-text-primary block">Allow Fulfillment</span>
                        <span className="text-xs text-text-muted">Orders can be shipped directly from this location to customers.</span>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={formData.allowFulfillment}
                        onChange={(e) => handleChange('allowFulfillment', e.target.checked)}
                        className="w-5 h-5 rounded border-border-hover text-primary focus:ring-primary" 
                      />
                    </label>

                    <label className="flex items-center justify-between p-4 bg-background rounded-xl border border-border cursor-pointer hover:border-primary transition-colors">
                      <div>
                        <span className="text-sm font-bold text-text-primary block">Allow Transfers</span>
                        <span className="text-xs text-text-muted">Enable stock transfers to and from this location.</span>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={formData.allowTransfers}
                        onChange={(e) => handleChange('allowTransfers', e.target.checked)}
                        className="w-5 h-5 rounded border-border-hover text-primary focus:ring-primary" 
                      />
                    </label>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT COLUMN: Live Preview (45%) */}
        <div className="w-[45%] h-full flex flex-col relative pr-8 pb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-[#4F46FF]/5 to-[#6D63FF]/5 rounded-[24px] pointer-events-none blur-3xl opacity-50" />
          
          <div className="relative flex-1 bg-surface rounded-[24px] shadow-[0_8px_32px_rgba(17,26,74,0.06)] border border-border flex flex-col overflow-hidden">
            
            <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-surface shrink-0 z-20">
               <div className="flex items-center gap-2.5 px-3 py-1.5 bg-success-soft rounded-full">
                 <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                 <span className="text-[11px] font-bold text-text-primary uppercase tracking-wide">Live Preview</span>
               </div>
               
               <div className="flex items-center gap-1 bg-background p-1 rounded-lg">
                 <button onClick={() => setPreviewMode('desktop')} className={`p-1.5 rounded-md transition-colors ${previewMode === 'desktop' ? 'bg-surface shadow-sm text-text-primary' : 'text-text-muted hover:text-text-primary'}`} title="Desktop View"><FiMonitor size={14} /></button>
                 <button onClick={() => setPreviewMode('tablet')} className={`p-1.5 rounded-md transition-colors ${previewMode === 'tablet' ? 'bg-surface shadow-sm text-text-primary' : 'text-text-muted hover:text-text-primary'}`} title="Tablet View"><FiTablet size={14} /></button>
                 <button onClick={() => setPreviewMode('mobile')} className={`p-1.5 rounded-md transition-colors ${previewMode === 'mobile' ? 'bg-surface shadow-sm text-text-primary' : 'text-text-muted hover:text-text-primary'}`} title="Mobile View"><FiSmartphone size={14} /></button>
               </div>
            </div>
            
            <div className="flex-1 overflow-y-auto bg-stone-100 flex justify-center no-scrollbar items-start pt-4 pb-12">
              <div className={`bg-surface shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-all duration-300 ease-in-out border border-border overflow-hidden ${
                previewMode === 'mobile' ? 'w-[375px] rounded-[32px] min-h-[812px]' : 
                previewMode === 'tablet' ? 'w-[768px] rounded-2xl min-h-[1024px]' : 
                'w-full h-full border-t-0 border-b-0 border-r-0'
              }`}>
                <div className="h-full overflow-y-auto p-8 flex flex-col items-center justify-center">
                  
                  {/* Preview Card */}
                  <div className="w-full max-w-sm bg-background border border-border rounded-2xl overflow-hidden shadow-sm">
                    <div className="h-24 bg-stone-200 relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5"></div>
                      <div className="absolute top-4 right-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${formData.status === 'active' ? 'bg-success-soft text-success' : 'bg-stone-200 text-stone-500'}`}>
                          {formData.status === 'active' ? 'ACTIVE' : 'INACTIVE'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6 relative">
                      <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-border flex items-center justify-center absolute -top-6 left-6 text-primary">
                        <FiMapPin size={24} />
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="font-serif font-bold text-xl mb-1">{formData.name || 'Warehouse Name'}</h3>
                        <p className="text-xs font-mono text-text-muted mb-4">{formData.code || 'CODE'}</p>
                        
                        {formData.description && (
                          <p className="text-sm text-text-secondary mb-6 line-clamp-2">{formData.description}</p>
                        )}
                        
                        <div className="space-y-3 pt-4 border-t border-border">
                          {(formData.address || formData.city || formData.country) && (
                            <div className="flex items-start gap-3">
                              <FiMapPin className="text-text-muted mt-0.5 shrink-0" size={14} />
                              <p className="text-sm text-text-secondary">
                                {[formData.address, formData.city, formData.country].filter(Boolean).join(', ')}
                              </p>
                            </div>
                          )}
                          
                          {formData.contactPerson && (
                            <div className="flex items-center gap-3">
                              <FiInfo className="text-text-muted shrink-0" size={14} />
                              <p className="text-sm text-text-secondary">{formData.contactPerson}</p>
                            </div>
                          )}
                          
                          {formData.phone && (
                            <div className="flex items-center gap-3">
                              <FiPhone className="text-text-muted shrink-0" size={14} />
                              <p className="text-sm text-text-secondary">{formData.phone}</p>
                            </div>
                          )}
                        </div>

                        <div className="mt-6 flex flex-wrap gap-2">
                          {formData.isDefault && (
                            <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded">Default Hub</span>
                          )}
                          {formData.allowFulfillment && (
                            <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded">Fulfillment Ready</span>
                          )}
                          {formData.allowTransfers && (
                            <span className="px-2 py-1 bg-stone-100 text-stone-600 text-[10px] font-bold rounded">Transfers Enabled</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
