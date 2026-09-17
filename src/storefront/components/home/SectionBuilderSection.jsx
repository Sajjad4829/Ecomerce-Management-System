import React from 'react';
import { cn } from '../../../utils/cn';
import { FiChevronDown, FiBold, FiItalic, FiUnderline, FiLink, FiList, FiAlignLeft, FiImage, FiCode } from 'react-icons/fi';

const FieldRenderer = ({ field }) => {
  const commonInputClass = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all";
  
  switch (field.type) {
    case 'Text':
    case 'URL':
    case 'Email':
    case 'Phone':
    case 'Website':
    case 'Fax':
    case 'ZipCode':
    case 'Address':
    case 'Location':
      return (
        <div className="flex flex-col gap-1.5 mb-5">
          <label className="text-sm font-semibold text-gray-700">{field.label}</label>
          <input 
            type={field.type === 'Email' ? 'email' : field.type === 'URL' || field.type === 'Website' ? 'url' : field.type === 'Phone' || field.type === 'Fax' ? 'tel' : 'text'} 
            className={commonInputClass} 
            placeholder={field.placeholder || field.label} 
          />
        </div>
      );
    case 'Textarea':
    case 'Excerpt':
      return (
        <div className="flex flex-col gap-1.5 mb-5">
          <label className="text-sm font-semibold text-gray-700">{field.label}</label>
          <textarea rows={4} className={`${commonInputClass} resize-none`} placeholder={field.placeholder || field.label} />
        </div>
      );
    case 'Description':
      return (
          <div className="w-full flex flex-col items-start gap-3 mb-5">
              <label className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>
              <div className="w-full border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                  <div className="bg-[#f8fafc] border-b border-gray-200 px-4 py-3 flex items-center gap-6 text-gray-700 overflow-x-auto custom-scrollbar">
                      <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 px-2 py-1 rounded">
                          <span className="text-sm font-medium">Paragraph</span>
                          <FiChevronDown size={14} />
                      </div>
                      <div className="w-px h-5 bg-gray-300"></div>
                      <div className="flex items-center gap-4 text-[15px]">
                          <FiBold className="cursor-pointer hover:text-gray-900 transition-colors" />
                          <FiItalic className="cursor-pointer hover:text-gray-900 transition-colors" />
                          <FiUnderline className="cursor-pointer hover:text-gray-900 transition-colors" />
                          <FiLink className="cursor-pointer hover:text-gray-900 transition-colors" />
                      </div>
                      <div className="w-px h-5 bg-gray-300"></div>
                      <div className="flex items-center gap-4 text-[15px]">
                          <FiList className="cursor-pointer hover:text-gray-900 transition-colors" />
                          <FiAlignLeft className="cursor-pointer hover:text-gray-900 transition-colors" />
                      </div>
                      <div className="w-px h-5 bg-gray-300"></div>
                      <div className="flex items-center gap-4 text-[15px]">
                          <FiImage className="cursor-pointer hover:text-gray-900 transition-colors" />
                          <FiCode className="cursor-pointer hover:text-gray-900 transition-colors" />
                      </div>
                  </div>
                  <div className="p-5 min-h-[160px] text-gray-400 text-[15px] leading-relaxed">
                      {field.placeholder || "Write a detailed description about this listing. You can add images, links, and format the content as needed..."}
                  </div>
                  <div className="px-5 py-3 flex justify-end text-sm text-gray-500 font-medium">
                      0/5000
                  </div>
              </div>
          </div>
      );
    case 'Pricing':
    case 'Number':
      return (
        <div className="flex flex-col gap-1.5 mb-5">
          <label className="text-sm font-semibold text-gray-700">{field.label}</label>
          <div className="relative">
            {field.type === 'Pricing' && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>}
            <input type="number" className={cn(commonInputClass, field.type === 'Pricing' && "pl-8")} placeholder="0.00" />
          </div>
        </div>
      );
    case 'Date':
      return (
        <div className="flex flex-col gap-1.5 mb-5">
          <label className="text-sm font-semibold text-gray-700">{field.label}</label>
          <input type="date" className={commonInputClass} />
        </div>
      );
    case 'Time':
      return (
        <div className="flex flex-col gap-1.5 mb-5">
          <label className="text-sm font-semibold text-gray-700">{field.label}</label>
          <input type="time" className={commonInputClass} />
        </div>
      );
    case 'ColorPicker':
      return (
        <div className="flex flex-col gap-1.5 mb-5">
          <label className="text-sm font-semibold text-gray-700">{field.label}</label>
          <div className="flex items-center gap-3">
            <input type="color" className="w-10 h-10 p-1 border border-gray-300 rounded-lg cursor-pointer" defaultValue="#635BFF" />
            <span className="text-sm text-gray-500">Pick a color</span>
          </div>
        </div>
      );
    case 'Select':
      return (
        <div className="flex flex-col gap-1.5 mb-5">
          <label className="text-sm font-semibold text-gray-700">{field.label}</label>
          <select className={commonInputClass}>
            <option>Select an option</option>
            <option>Option 1</option>
            <option>Option 2</option>
          </select>
        </div>
      );
    case 'Checkbox':
      return (
        <div className="flex items-center gap-3 mb-5">
          <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-600" />
          <label className="text-sm font-medium text-gray-700">{field.label}</label>
        </div>
      );
    case 'Radio':
      return (
        <div className="flex flex-col gap-1.5 mb-5">
          <label className="text-sm font-semibold text-gray-700">{field.label}</label>
          <div className="flex gap-4">
             <label className="flex items-center gap-2 text-sm text-gray-700"><input type="radio" name={`radio-${field.id}`} className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-600" /> Option 1</label>
             <label className="flex items-center gap-2 text-sm text-gray-700"><input type="radio" name={`radio-${field.id}`} className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-600" /> Option 2</label>
          </div>
        </div>
      );
    case 'FileUpload':
      return (
        <div className="flex flex-col gap-1.5 mb-5">
          <label className="text-sm font-semibold text-gray-700">{field.label}</label>
          <div className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer">
            <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
            <span className="text-sm font-medium text-gray-700">Click to upload file</span>
            <span className="text-xs text-gray-500 mt-1">or drag and drop</span>
          </div>
        </div>
      );
    case 'Image':
      if (field.imageUrl) {
        const borderStyle = field.imageBorder ? `${field.imageBorder} ${field.imageBorderColor || ''}`.trim() : undefined;
        const shadowStyle = field.imageBoxShadow ? `${field.imageBoxShadow} ${field.imageBoxShadowColor || ''}`.trim() : undefined;
        return (
          <div className="flex flex-col gap-1.5 mb-5 w-full items-center">
            <div 
              className="relative overflow-hidden flex shrink-0 max-w-full"
              style={{
                width: field.imageWidth ? (!isNaN(field.imageWidth) ? `${field.imageWidth}px` : field.imageWidth) : '100%',
                height: field.imageHeight ? (!isNaN(field.imageHeight) ? `${field.imageHeight}px` : field.imageHeight) : 'auto',
                border: borderStyle,
                boxShadow: shadowStyle
              }}
            >
              <img src={field.imageUrl} alt={field.label || 'Image'} className="w-full h-full object-cover" />
              {field.enableOverlay && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
                   <span className="text-white font-bold text-center text-lg">{field.overlayText}</span>
                </div>
              )}
            </div>
          </div>
        );
      }
      return (
        <div className="flex flex-col gap-1.5 mb-5">
          <label className="text-sm font-semibold text-gray-700">{field.label}</label>
          <div className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer">
            <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
            <span className="text-sm font-medium text-gray-700">Click to upload image</span>
            <span className="text-xs text-gray-500 mt-1">or drag and drop</span>
          </div>
        </div>
      );
    case 'Tags':
      return (
        <div className="flex flex-col gap-1.5 mb-5">
          <label className="text-sm font-semibold text-gray-700">{field.label}</label>
          <div className={cn(commonInputClass, "flex items-center gap-2")}>
             <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium text-gray-700 flex items-center gap-1">Example Tag <button className="text-gray-400 hover:text-gray-600">×</button></span>
             <input type="text" className="border-none outline-none flex-1 text-sm bg-transparent" placeholder={field.placeholder || "Add tag..."} />
          </div>
        </div>
      );
    case 'Map':
      return (
        <div className="flex flex-col gap-1.5 mb-5">
          <label className="text-sm font-semibold text-gray-700">{field.label}</label>
          <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500 flex flex-col items-center gap-2">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
               <span className="text-sm font-medium">Interactive Map Embed</span>
            </div>
          </div>
        </div>
      );
    case 'SocialInfo':
      return (
        <div className="flex flex-col gap-1.5 mb-5">
          <label className="text-sm font-semibold text-gray-700">{field.label}</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
             <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">FB</span>
                <input type="url" className={cn(commonInputClass, "pl-10")} placeholder="Facebook URL" />
             </div>
             <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">IG</span>
                <input type="url" className={cn(commonInputClass, "pl-10")} placeholder="Instagram URL" />
             </div>
          </div>
        </div>
      );
    case 'Container':
      return (
        <div className="flex flex-col gap-1.5 mb-5 w-full">
          {field.label && <label className="text-sm font-semibold text-gray-700">{field.label}</label>}
          <div className="w-full border border-dashed border-gray-300 bg-gray-50/50 min-h-[100px] flex flex-col p-6">
            {field.fields && field.fields.length > 0 ? (
                field.fields.map((subField) => <FieldRenderer key={subField.id} field={subField} />)
            ) : (
                <div className="flex-1 flex items-center justify-center">
                    <span className="text-gray-400 font-medium text-sm">Container Area ({field.placeholder || 'Empty Container'})</span>
                </div>
            )}
          </div>
        </div>
      );
    default:
      return (
        <div className="flex flex-col gap-1.5 mb-5">
          <label className="text-sm font-semibold text-gray-700">{field.label}</label>
          <div className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-lg text-sm text-gray-500 italic flex items-center justify-center">
            [{field.type} Layout Block Placeholder]
          </div>
        </div>
      );
  }
};

export default function SectionBuilderSection({ section }) {
  const layout = section?.content?.layout || [];

  if (!layout || layout.length === 0) {
    return (
      <section className="w-full py-16 bg-gray-50 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Section Builder</h2>
        <p className="text-gray-500">Configure this section in the CMS Editor to add forms and layouts.</p>
      </section>
    );
  }

  return (
    <section className="w-full py-12 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          {layout.map((sec, idx) => (
            <div key={sec.id} className={cn("w-full p-8", idx !== layout.length - 1 && "border-b border-gray-200")}>
              <h3 className="text-xl font-bold text-gray-900 mb-6">{sec.title}</h3>
              
              {sec.fields && sec.fields.length > 0 ? (
                <div className="w-full">
                  {sec.fields.map((field) => (
                    <FieldRenderer key={field.id} field={field} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">No fields in this section.</p>
              )}
            </div>
          ))}
          <div className="p-8 bg-gray-50 border-t border-gray-200 flex justify-end">
             <button className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors">
                Submit Form
             </button>
          </div>
        </div>
      </div>
    </section>
  );
}
