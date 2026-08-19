import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiSave, FiEye, FiGrid, FiSliders, FiCheck } from 'react-icons/fi';
import { cn } from '../../../../utils/cn';
import FieldLibrary from '../../../components/cms/forms/FieldLibrary';
import FormCanvas from '../../../components/cms/forms/FormCanvas';
import FieldInspector from '../../../components/cms/forms/FieldInspector';
import FormSettingsTab from '../../../components/cms/forms/FormSettingsTab';
import FormPreviewModal from '../../../components/cms/forms/FormPreviewModal';

const INITIAL_FIELDS = [
  { id: 'f1', type: 'text', label: 'Full Client Name', required: true, width: 'half', placeholder: 'e.g. Lord Harrington' },
  { id: 'f2', type: 'email', label: 'Direct Email Address', required: true, width: 'half', placeholder: 'harrington@estate.co.uk' },
  { id: 'f3', type: 'select', label: 'Inquiry Subject', required: true, width: 'full', options: ['Bespoke Custom Velvet Upholstery', 'White-Glove In-Room Assembly', 'Smoked Oak Dining Table Inquiry', 'Trade Account Application'] },
  { id: 'f4', type: 'textarea', label: 'Special Project Instructions', required: false, width: 'full', placeholder: 'Describe your custom dimensions or velvet fabric preferences...' },
  { id: 'f5', type: 'consent', label: 'I agree to receive VIP private consultations from Aurelian Senior Designers.', required: true, width: 'full' }
];

export default function FormBuilderPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const formId = searchParams.get('id');

  const [activeTab, setActiveTab] = useState('canvas'); // 'canvas' | 'settings'
  const [fields, setFields] = useState(INITIAL_FIELDS);
  const [selectedFieldId, setSelectedFieldId] = useState('f1');
  
  const [formSettings, setFormSettings] = useState({
    name: formId ? 'Custom Bespoke Inquiry' : 'New Bespoke Furniture Form',
    type: 'Quote Request',
    submitText: 'Submit Consultation Request',
    successMessage: 'Thank you! An Aurelian interior consultant will review your specifications and respond shortly.',
    errorMessage: 'Please review all highlighted required fields.',
    redirectUrl: '',
    requireConsent: true
  });

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Field manipulation handlers
  const handleAddField = (template) => {
    const newField = {
      id: `field-${Date.now()}`,
      type: template.type,
      label: template.defaultLabel || 'New Field',
      placeholder: template.placeholder || '',
      helpText: template.helpText || '',
      required: false,
      width: 'full',
      options: template.options || [],
      defaultValue: template.defaultValue || ''
    };
    setFields([...fields, newField]);
    setSelectedFieldId(newField.id);
  };

  const handleUpdateField = (id, updates) => {
    setFields(fields.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const handleDuplicateField = (id) => {
    const target = fields.find(f => f.id === id);
    if (!target) return;
    const dup = {
      ...target,
      id: `field-${Date.now()}`,
      label: `${target.label} (Copy)`
    };
    setFields([...fields, dup]);
    setSelectedFieldId(dup.id);
  };

  const handleDeleteField = (id) => {
    setFields(fields.filter(f => f.id !== id));
    if (selectedFieldId === id) {
      setSelectedFieldId(null);
    }
  };

  const handleMoveField = (fromIdx, toIdx) => {
    if (toIdx < 0 || toIdx >= fields.length) return;
    const updated = [...fields];
    const [moved] = updated.splice(fromIdx, 1);
    updated.splice(toIdx, 0, moved);
    setFields(updated);
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const selectedField = fields.find(f => f.id === selectedFieldId);

  return (
    <div className="space-y-4 pb-12">
      
      {/* Builder Navigation Top Bar */}
      <div className="bg-surface border border-black/10 rounded-xl p-3 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/cms/forms')}
            className="p-1.5 text-text-muted hover:text-black hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            title="Back to Forms"
          >
            <FiArrowLeft size={18} />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-black/5 text-[9px] font-mono font-bold uppercase text-text-secondary">
                Form Builder
              </span>
              <h2 className="font-serif font-bold text-base text-text-primary">
                {formSettings.name}
              </h2>
            </div>
            <p className="text-xs text-text-muted font-mono">Category: {formSettings.type}</p>
          </div>
        </div>

        {/* Workspace Tab Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-black/5 text-xs font-bold text-text-secondary">
            <button
              type="button"
              onClick={() => setActiveTab('canvas')}
              className={cn(
                "px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer",
                activeTab === 'canvas' ? "bg-surface text-black shadow-2xs font-bold" : "hover:text-black"
              )}
            >
              <FiGrid size={14} /> Field Layout
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className={cn(
                "px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer",
                activeTab === 'settings' ? "bg-surface text-black shadow-2xs font-bold" : "hover:text-black"
              )}
            >
              <FiSliders size={14} /> Form Settings
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            className="px-3 py-2 bg-surface border border-black/10 rounded-xl text-xs font-bold text-text-secondary hover:bg-background flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <FiEye size={14} /> Preview
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-[#1A1A1A] hover:bg-black text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
          >
            {isSaved ? <FiCheck size={14} className="text-green-400" /> : <FiSave size={14} />}
            <span>{isSaved ? 'Form Saved!' : 'Save Form'}</span>
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      {activeTab === 'canvas' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          
          {/* Left Panel: Field Library (3 cols) */}
          <div className="lg:col-span-3 h-[680px]">
            <FieldLibrary onAddField={handleAddField} />
          </div>

          {/* Center Panel: Live Canvas (5 cols) */}
          <div className="lg:col-span-5">
            <FormCanvas
              fields={fields}
              selectedFieldId={selectedFieldId}
              onSelectField={(id) => setSelectedFieldId(id)}
              onDuplicateField={handleDuplicateField}
              onDeleteField={handleDeleteField}
              onMoveField={handleMoveField}
              submitButtonText={formSettings.submitText}
            />
          </div>

          {/* Right Panel: Field Inspector (4 cols) */}
          <div className="lg:col-span-4 h-[680px]">
            <FieldInspector
              field={selectedField}
              onUpdateField={handleUpdateField}
              onDeleteField={handleDeleteField}
            />
          </div>

        </div>
      ) : (
        /* Settings View */
        <FormSettingsTab
          settings={formSettings}
          onChangeSettings={setFormSettings}
        />
      )}

      {/* Live Responsive Preview Modal */}
      <FormPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        formName={formSettings.name}
        fields={fields}
        settings={formSettings}
      />

    </div>
  );
}
