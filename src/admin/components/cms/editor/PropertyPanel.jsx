import { useState } from 'react';
import { FiType, FiLayout, FiImage, FiSettings, FiMaximize, FiArrowRight, FiEye, FiMonitor, FiTablet, FiSmartphone, FiPlay, FiCode, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { cn } from '../../../../utils/cn';
import { getSectionSchema, FIELD_TYPES } from './sectionEditorSchemas';

const PropertyGroup = ({ title, icon: Icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-black/5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-black/5 transition-colors"
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className="text-text-muted" size={14} />}
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-primary">{title}</h3>
        </div>
        {isOpen ? <FiChevronUp size={14} className="text-text-muted" /> : <FiChevronDown size={14} className="text-text-muted" />}
      </button>
      {isOpen && (
        <div className="p-4 pt-0 space-y-4">
          {children}
        </div>
      )}
    </div>
  );
};

const DynamicField = ({ field, value, onChange }) => {
  const handleChange = (e) => {
    const val = field.type === FIELD_TYPES.TOGGLE ? e.target.checked : e.target.value;
    onChange(field.name, val);
  };

  const renderInput = () => {
    switch (field.type) {
      case FIELD_TYPES.TEXT:
      case FIELD_TYPES.URL:
        return (
          <input
            type="text"
            value={value || ''}
            onChange={handleChange}
            placeholder={field.defaultValue}
            className="w-full px-3 py-2 bg-background border border-black/5 rounded-lg text-sm focus:outline-none focus:bg-surface focus:border-black/30 transition-colors"
          />
        );
      case FIELD_TYPES.TEXTAREA:
        return (
          <textarea
            rows={3}
            value={value || ''}
            onChange={handleChange}
            placeholder={field.defaultValue}
            className="w-full px-3 py-2 bg-background border border-black/5 rounded-lg text-sm focus:outline-none focus:bg-surface focus:border-black/30 transition-colors resize-none"
          ></textarea>
        );
      case FIELD_TYPES.SELECT:
        return (
          <select
            value={value || field.defaultValue || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-background border border-black/5 rounded-lg text-sm focus:outline-none focus:bg-surface focus:border-black/30 transition-colors"
          >
            {field.options?.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        );
      case FIELD_TYPES.NUMBER:
        return (
          <input
            type="number"
            value={value || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-background border border-black/5 rounded-lg text-sm focus:outline-none focus:bg-surface focus:border-black/30 transition-colors"
          />
        );
      case FIELD_TYPES.TOGGLE:
        return (
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={value ?? field.defaultValue ?? false}
              onChange={handleChange}
              className="rounded border-border-hover text-text-primary focus:ring-[#1A1A1A]"
            />
            <label className="text-xs text-text-primary font-medium">{field.label}</label>
          </div>
        );
      case FIELD_TYPES.IMAGE:
        return (
          <div className="space-y-2">
            {value && (
              <div className="w-full h-24 rounded overflow-hidden relative">
                <img src={value} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
            <input
              type="text"
              value={value || ''}
              onChange={handleChange}
              placeholder="Image URL..."
              className="w-full px-3 py-2 bg-background border border-black/5 rounded-lg text-sm focus:outline-none focus:bg-surface focus:border-black/30 transition-colors"
            />
          </div>
        );
      default:
        return null;
    }
  };

  if (field.type === FIELD_TYPES.TOGGLE) {
    return renderInput();
  }

  return (
    <div>
      <label className="block text-xs font-semibold text-text-primary mb-1.5">{field.label}</label>
      {renderInput()}
    </div>
  );
};

export default function PropertyPanel({ activeSectionId, sections, onUpdateSection, device, setDevice }) {
  if (!activeSectionId) {
    return (
      <div className="w-[280px] bg-surface border-l border-black/10 flex flex-col h-full shrink-0 z-10 p-8 items-center justify-center text-center">
        <div className="w-16 h-16 bg-background rounded-2xl flex items-center justify-center text-gray-300 mb-4 border border-black/5 shadow-sm">
          <FiSettings size={24} />
        </div>
        <p className="text-xs text-text-muted font-medium leading-relaxed">Select a section from the canvas or structure panel to edit its properties.</p>
      </div>
    );
  }

  const section = sections.find(s => s.id === activeSectionId);
  if (!section) return null;

  const schema = getSectionSchema(section.type);

  const handleContentChange = (name, value) => {
    onUpdateSection(section.id, {
      content: {
        ...(section.content || {}),
        [name]: value
      }
    });
  };

  const handleSettingsChange = (name, value) => {
    onUpdateSection(section.id, {
      settings: {
        ...(section.settings || {}),
        [name]: value
      }
    });
  };

  const handleResponsiveChange = (name, value) => {
    onUpdateSection(section.id, {
      responsive: {
        [device]: {
          ...(section.responsive?.[device] || {}),
          [name]: value
        }
      }
    });
  };

  return (
    <div className="w-[280px] bg-surface border-l border-black/10 flex flex-col h-full shrink-0 z-10 overflow-hidden shadow-xl shadow-black/5">
      {/* Header */}
      <div className="p-4 border-b border-black/5 shrink-0 bg-background">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <FiLayout className="text-text-muted" size={14} />
            <h2 className="text-xs font-bold text-text-primary truncate max-w-[200px]">{section.name}</h2>
          </div>
          <span className="text-[9px] font-mono bg-surface px-1.5 py-0.5 rounded border border-black/10">ID: {section.id.split('-')[1]}</span>
        </div>
        <p className="text-[10px] text-text-muted uppercase tracking-widest">{section.type} Settings</p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">

        <PropertyGroup title="General" icon={FiSettings} defaultOpen={true}>
          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1.5">Section Name</label>
            <input
              type="text"
              value={section.name}
              onChange={(e) => onUpdateSection(section.id, { name: e.target.value })}
              className="w-full px-3 py-2 bg-background border border-black/5 rounded-lg text-sm focus:outline-none focus:bg-surface focus:border-black/30 transition-colors"
            />
          </div>
        </PropertyGroup>

        {schema.content && schema.content.length > 0 && (
          <PropertyGroup title="Content" icon={FiType} defaultOpen={true}>
            {schema.content.map(field => (
              <DynamicField
                key={field.name}
                field={field}
                value={section.content?.[field.name] ?? field.defaultValue}
                onChange={handleContentChange}
              />
            ))}
          </PropertyGroup>
        )}

        {schema.settings && schema.settings.length > 0 && (
          <PropertyGroup title="Settings" icon={FiMaximize} defaultOpen={true}>
            {schema.settings.map(field => (
              <DynamicField
                key={field.name}
                field={field}
                value={section.settings?.[field.name] ?? field.defaultValue}
                onChange={handleSettingsChange}
              />
            ))}
          </PropertyGroup>
        )}

        {schema.responsive && schema.responsive.length > 0 && (
          <PropertyGroup title="Responsive" icon={FiMonitor} defaultOpen={true}>
            <div className="flex items-center gap-1 bg-background p-1 rounded-lg border border-black/5 mb-4 justify-center">
              <button
                onClick={() => setDevice('desktop')}
                className={cn(
                  "p-1.5 flex-1 flex justify-center rounded-md transition-colors",
                  device === 'desktop' ? "bg-surface text-text-primary shadow-sm" : "text-text-muted hover:text-text-primary"
                )}
                title="Desktop"
              >
                <FiMonitor size={14} />
              </button>
              <button
                onClick={() => setDevice('tablet')}
                className={cn(
                  "p-1.5 flex-1 flex justify-center rounded-md transition-colors",
                  device === 'tablet' ? "bg-surface text-text-primary shadow-sm" : "text-text-muted hover:text-text-primary"
                )}
                title="Tablet"
              >
                <FiTablet size={14} />
              </button>
              <button
                onClick={() => setDevice('mobile')}
                className={cn(
                  "p-1.5 flex-1 flex justify-center rounded-md transition-colors",
                  device === 'mobile' ? "bg-surface text-text-primary shadow-sm" : "text-text-muted hover:text-text-primary"
                )}
                title="Mobile"
              >
                <FiSmartphone size={14} />
              </button>
            </div>

            {schema.responsive.map(field => (
              <DynamicField
                key={field.name}
                field={field}
                value={section.responsive?.[device]?.[field.name] ?? field.defaultValue}
                onChange={handleResponsiveChange}
              />
            ))}
          </PropertyGroup>
        )}
      </div>
    </div>
  );
}
