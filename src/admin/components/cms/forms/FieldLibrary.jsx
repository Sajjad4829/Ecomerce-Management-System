import { 
  FiType, FiMail, FiPhone, FiHash, FiAlignLeft, FiList, FiCheckSquare, 
  FiRadio, FiCalendar, FiClock, FiUploadCloud, FiEyeOff, 
  FiFileText, FiMinus, FiShield, FiPlus
} from 'react-icons/fi';

export const FIELD_TYPES = [
  {
    category: 'Standard Inputs',
    items: [
      { type: 'text', label: 'Single Line Text', icon: FiType, defaultLabel: 'Full Name', placeholder: 'e.g. Eleanor Vance' },
      { type: 'email', label: 'Email Address', icon: FiMail, defaultLabel: 'Email Address', placeholder: 'e.g. eleanor@aurelian.com' },
      { type: 'phone', label: 'Phone Number', icon: FiPhone, defaultLabel: 'Phone Number', placeholder: '+1 (555) 000-0000' },
      { type: 'number', label: 'Number Input', icon: FiHash, defaultLabel: 'Estimated Budget ($)', placeholder: '5000' },
      { type: 'textarea', label: 'Multi-line Text', icon: FiAlignLeft, defaultLabel: 'Project Notes or Special Requirements', placeholder: 'Describe your custom dimensions or velvet fabric preferences...' },
    ]
  },
  {
    category: 'Selection Controls',
    items: [
      { type: 'select', label: 'Dropdown Select', icon: FiList, defaultLabel: 'Inquiry Type', options: ['Bespoke Custom Order', 'White-Glove Delivery Question', 'Trade & Designer Program', 'Showroom Appointment'] },
      { type: 'radio', label: 'Radio Buttons', icon: FiRadio, defaultLabel: 'Preferred Wood Finish', options: ['Italian Smoked Oak', 'Natural Nordic Oak', 'Ebonized Walnut'] },
      { type: 'checkbox', label: 'Checkbox Group', icon: FiCheckSquare, defaultLabel: 'Interested Furniture Categories', options: ['Modular Sofas', 'Marble Dining Tables', 'Accent Lighting'] },
    ]
  },
  {
    category: 'Date & Files',
    items: [
      { type: 'date', label: 'Date Picker', icon: FiCalendar, defaultLabel: 'Preferred Consultation Date' },
      { type: 'time', label: 'Time Slot', icon: FiClock, defaultLabel: 'Preferred Call Back Time' },
      { type: 'file', label: 'File Upload', icon: FiUploadCloud, defaultLabel: 'Floor Plan or Architectural Drawings (.pdf, .jpg)', helpText: 'Upload up to 10MB blueprint or room photos' },
    ]
  },
  {
    category: 'Layout & Compliance',
    items: [
      { type: 'heading', label: 'Section Heading', icon: FiType, defaultLabel: 'Project Specifications', placeholder: 'Section Title' },
      { type: 'paragraph', label: 'Help Paragraph', icon: FiFileText, defaultLabel: 'Our interior design specialists respond within 2 business hours.' },
      { type: 'divider', label: 'Visual Divider', icon: FiMinus },
      { type: 'consent', label: 'Consent Checkbox', icon: FiShield, defaultLabel: 'I agree to receive VIP design consultations and Aurelian privacy terms.' },
      { type: 'hidden', label: 'Hidden Field', icon: FiEyeOff, defaultLabel: 'Campaign Referral Source', defaultValue: 'utm_source_showroom' }
    ]
  }
];

export default function FieldLibrary({ onAddField }) {
  return (
    <div className="bg-white border border-black/10 rounded-xl p-4 shadow-2xs space-y-5 h-full flex flex-col">
      <div>
        <h3 className="font-serif font-bold text-sm text-[#1A1A1A]">Field Library</h3>
        <p className="text-[11px] text-gray-500 mt-0.5">Click any component to append it into your form layout.</p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 space-y-4">
        {FIELD_TYPES.map((cat, idx) => (
          <div key={idx} className="space-y-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block font-mono">
              {cat.category}
            </span>

            <div className="grid grid-cols-1 gap-1.5">
              {cat.items.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => onAddField(item)}
                    className="flex items-center justify-between p-2.5 bg-gray-50 hover:bg-black hover:text-white border border-black/5 rounded-lg text-xs font-semibold text-gray-700 transition-all cursor-pointer group text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon size={14} className="text-gray-500 group-hover:text-amber-400 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    <FiPlus size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
