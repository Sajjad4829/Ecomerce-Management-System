import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiFileText, FiPlus, FiSearch, FiEdit2, FiCopy, FiEye, 
  FiTrash2, FiBarChart2, FiCheckCircle, FiArchive, FiSliders 
} from 'react-icons/fi';
import { cn } from '../../../../utils/cn';
import FormPreviewModal from '../../../components/cms/forms/FormPreviewModal';

const INITIAL_FORMS = [
  {
    id: 'form-1',
    name: 'Bespoke Trade & Designer Inquiry',
    type: 'Quote Request',
    status: 'active',
    submissionsCount: 142,
    conversionRate: '18.4%',
    fieldsCount: 8,
    updatedAt: '2025-05-12',
    createdAt: '2025-01-10',
    fields: [
      { id: 'f1', type: 'text', label: 'Full Designer Name', required: true, width: 'half' },
      { id: 'f2', type: 'email', label: 'Business Email', required: true, width: 'half' },
      { id: 'f3', type: 'text', label: 'Design Firm / Studio Name', required: true, width: 'full' },
      { id: 'f4', type: 'select', label: 'Project Scope', required: true, width: 'full', options: ['Residential Living Room', 'Boutique Hotel Upholstery', 'Commercial Hospitality', 'Private Yacht'] },
      { id: 'f5', type: 'textarea', label: 'Bespoke Furniture Specifications', required: false, width: 'full', helpText: 'Include velvet color code, dimensions, or solid wood timber preferences.' },
      { id: 'f6', type: 'file', label: 'Floorplan or Blueprints', required: false, width: 'full' }
    ],
    settings: {
      submitText: 'Request VIP Trade Quote',
      successMessage: 'Thank you! An Aurelian Senior Trade Director will review your blueprint within 2 hours.'
    }
  },
  {
    id: 'form-2',
    name: 'VIP Newsletter & Private Salon Invite',
    type: 'Newsletter',
    status: 'active',
    submissionsCount: 890,
    conversionRate: '24.1%',
    fieldsCount: 3,
    updatedAt: '2025-05-18',
    createdAt: '2025-02-01',
    fields: [
      { id: 'f10', type: 'email', label: 'Your Direct Email', required: true, width: 'full' },
      { id: 'f11', type: 'select', label: 'Preferred Showroom Location', required: false, width: 'full', options: ['Milan Flagship', 'New York Madison Ave', 'London Mayfair', 'Online Exclusive'] },
      { id: 'f12', type: 'consent', label: 'I agree to receive early access to seasonal lookbooks and private collection launches.', required: true, width: 'full' }
    ],
    settings: {
      submitText: 'Join Aurelian Circle',
      successMessage: 'Welcome to Aurelian Private Circle. Check your inbox for your VIP invitation code.'
    }
  },
  {
    id: 'form-3',
    name: 'Showroom VIP Appointment Booking',
    type: 'Showroom Inquiry',
    status: 'active',
    submissionsCount: 68,
    conversionRate: '14.2%',
    fieldsCount: 6,
    updatedAt: '2025-05-10',
    createdAt: '2025-03-15',
    fields: [
      { id: 'f20', type: 'text', label: 'Client Full Name', required: true, width: 'half' },
      { id: 'f21', type: 'phone', label: 'Mobile Phone for SMS Confirmation', required: true, width: 'half' },
      { id: 'f22', type: 'date', label: 'Preferred Consultation Date', required: true, width: 'half' },
      { id: 'f23', type: 'time', label: 'Preferred Time Slot', required: true, width: 'half' },
      { id: 'f24', type: 'checkbox', label: 'Collections to View', required: false, width: 'full', options: ['Modular Velvet Sofas', 'Marble Dining', 'Bedroom Sanctuaries'] }
    ],
    settings: {
      submitText: 'Confirm Showroom Booking',
      successMessage: 'Your consultation is provisionally scheduled. Our showroom concierge will call to finalize details.'
    }
  },
  {
    id: 'form-4',
    name: 'Product Sample Swatch Request',
    type: 'Product Inquiry',
    status: 'draft',
    submissionsCount: 0,
    conversionRate: '0.0%',
    fieldsCount: 5,
    updatedAt: '2025-05-20',
    createdAt: '2025-05-20',
    fields: [
      { id: 'f30', type: 'text', label: 'Shipping Recipient Name', required: true, width: 'full' },
      { id: 'f31', type: 'text', label: 'Delivery Address', required: true, width: 'full' },
      { id: 'f32', type: 'checkbox', label: 'Select Velvet & Wood Swatches', required: true, width: 'full', options: ['Italian Cream Velvet', 'Smoked Espresso Velvet', 'Smoked Smoked Oak', 'Calacatta Marble Sample'] }
    ],
    settings: {
      submitText: 'Order Swatch Kit',
      successMessage: 'Your complimentary swatch kit will be dispatched via courier.'
    }
  }
];

export default function FormsManager() {
  const navigate = useNavigate();
  const [forms, setForms] = useState(INITIAL_FORMS);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [previewForm, setPreviewForm] = useState(null);

  // Filter forms
  const filteredForms = forms.filter(f => {
    if (typeFilter !== 'all' && f.type !== typeFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return f.name.toLowerCase().includes(q) || f.type.toLowerCase().includes(q);
    }
    return true;
  });

  const handleDuplicate = (form) => {
    const dup = {
      ...form,
      id: `form-${Date.now()}`,
      name: `${form.name} (Copy)`,
      status: 'draft',
      submissionsCount: 0,
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setForms([dup, ...forms]);
  };

  const handleDelete = (id) => {
    setForms(forms.filter(f => f.id !== id));
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 text-sm text-text-muted">
            <span>CMS</span>
            <span className="text-gray-300">/</span>
            <span className="text-text-primary font-semibold">Forms & Lead Capture</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-text-primary">Enterprise Form Builder</h1>
          <p className="text-sm text-text-muted mt-1 max-w-xl">
            Design, deploy, and embed custom lead generation forms, quote inquiries, and showroom booking widgets.
          </p>
        </div>

        <button
          onClick={() => navigate('/admin/cms/forms/builder')}
          className="px-5 py-2.5 bg-[#1A1A1A] hover:bg-black text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer shrink-0"
        >
          <FiPlus size={16} />
          <span>Create New Form</span>
        </button>
      </div>

      {/* Analytics KPI Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface border border-black/5 rounded-xl p-4 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-text-muted block mb-1">Active Forms</span>
          <div className="text-2xl font-serif font-bold text-text-primary">
            {forms.filter(f => f.status === 'active').length} <span className="text-xs text-text-muted font-sans font-normal">/ {forms.length} total</span>
          </div>
          <div className="text-[10px] text-success font-semibold mt-1 flex items-center gap-1">
            <FiCheckCircle size={10} /> Ready for embedding
          </div>
        </div>

        <div className="bg-surface border border-black/5 rounded-xl p-4 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-text-muted block mb-1">Total Submissions</span>
          <div className="text-2xl font-serif font-bold text-text-primary">
            1,100 <span className="text-xs text-text-muted font-sans font-normal">entries</span>
          </div>
          <div className="text-[10px] text-text-muted font-medium mt-1">
            Placeholder analytics
          </div>
        </div>

        <div className="bg-surface border border-black/5 rounded-xl p-4 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-text-muted block mb-1">Avg Conversion Rate</span>
          <div className="text-2xl font-serif font-bold text-emerald-700">
            18.9%
          </div>
          <div className="text-[10px] text-success font-semibold mt-1">
            +2.4% vs last quarter
          </div>
        </div>

        <div className="bg-surface border border-black/5 rounded-xl p-4 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-text-muted block mb-1">Lead Storage Engine</span>
          <div className="text-xl font-serif font-bold text-blue-800">
            Frontend Ready
          </div>
          <div className="text-[10px] text-text-muted font-medium mt-1">
            Backend API ready
          </div>
        </div>
      </div>

      {/* Toolbar & Filters */}
      <div className="bg-surface border border-black/5 rounded-xl p-3 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={14} />
          <input
            type="text"
            placeholder="Search forms by name or type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-background border border-black/10 rounded-lg text-xs focus:bg-surface focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          {['all', 'Quote Request', 'Newsletter', 'Showroom Inquiry', 'Product Inquiry'].map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={cn(
                "px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap cursor-pointer transition-all",
                typeFilter === t ? "bg-[#1A1A1A] text-white shadow-2xs" : "bg-gray-100 text-text-secondary hover:text-black"
              )}
            >
              {t === 'all' ? 'All Types' : t}
            </button>
          ))}
        </div>
      </div>

      {/* Forms Table */}
      <div className="bg-surface border border-black/5 rounded-xl overflow-hidden shadow-2xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-background/80 border-b border-black/5 text-[10px] font-bold text-text-muted uppercase tracking-widest">
              <th className="p-3.5">Form Name & Type</th>
              <th className="p-3.5 font-mono">Status</th>
              <th className="p-3.5 font-mono hidden md:table-cell">Fields</th>
              <th className="p-3.5 font-mono hidden md:table-cell">Submissions</th>
              <th className="p-3.5 font-mono hidden lg:table-cell">Conversion</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 text-xs">
            {filteredForms.map((form) => (
              <tr key={form.id} className="hover:bg-background/80 transition-colors">
                <td className="p-3.5">
                  <div className="font-bold text-text-primary">{form.name}</div>
                  <div className="text-[10px] text-text-muted font-mono mt-0.5">
                    Category: <span className="text-text-secondary font-bold">{form.type}</span> • Updated {form.updatedAt}
                  </div>
                </td>

                <td className="p-3.5 font-mono text-[11px]">
                  {form.status === 'active' ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-success-soft text-green-800 font-bold text-[10px] uppercase">
                      Active
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-text-secondary font-bold text-[10px] uppercase">
                      Draft
                    </span>
                  )}
                </td>

                <td className="p-3.5 font-mono hidden md:table-cell text-text-secondary">
                  {form.fields.length} inputs
                </td>

                <td className="p-3.5 font-mono font-bold hidden md:table-cell">
                  {form.submissionsCount}
                </td>

                <td className="p-3.5 font-mono text-emerald-700 font-bold hidden lg:table-cell">
                  {form.conversionRate}
                </td>

                <td className="p-3.5 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      type="button"
                      onClick={() => setPreviewForm(form)}
                      className="p-1.5 text-text-muted hover:text-black hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                      title="Live Preview"
                    >
                      <FiEye size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate(`/admin/cms/forms/builder?id=${form.id}`)}
                      className="p-1.5 text-text-muted hover:text-black hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                      title="Edit Form"
                    >
                      <FiEdit2 size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDuplicate(form)}
                      className="p-1.5 text-text-muted hover:text-black hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                      title="Duplicate"
                    >
                      <FiCopy size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(form.id)}
                      className="p-1.5 text-danger hover:text-red-700 hover:bg-danger-soft rounded-lg transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <FiTrash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Preview Modal */}
      {previewForm && (
        <FormPreviewModal
          isOpen={!!previewForm}
          onClose={() => setPreviewForm(null)}
          formName={previewForm.name}
          fields={previewForm.fields}
          settings={previewForm.settings}
        />
      )}

    </div>
  );
}
