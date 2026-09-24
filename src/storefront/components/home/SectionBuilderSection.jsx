import React from 'react';
import { cn } from '../../../utils/cn';
import { FiChevronDown, FiBold, FiItalic, FiUnderline, FiLink, FiList, FiAlignLeft, FiImage, FiCode } from 'react-icons/fi';

const FieldRenderer = ({ field }) => {
  const commonInputClass = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all";
  
  switch (field.type) {
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
    case 'Text':
    case 'Description':
      return (
        <div 
            className={cn("w-full mb-5 text-gray-800", field.customClass)}
            style={{
                fontSize: field.fontSize ? `${field.fontSize}px` : '16px',
                fontWeight: field.fontWeight || 'normal',
                textAlign: field.textAlign || 'left',
                color: field.textColor || '#000000',
            }}
        >
            {field.content || field.placeholder || (field.type === 'Description' ? "Description block" : "Text block")}
        </div>
      );
    case 'LegacyDescription':
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
              <img src={field.imageUrl} alt={field.altText || field.label || 'Image'} className="w-full h-full" style={{ objectFit: field.objectFit || 'cover' }} />
              {field.enableOverlay && (
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-4 p-4 z-10">
                  {field.overlayText && (
                    <span 
                      className="font-bold text-center"
                      style={{ 
                        fontSize: field.overlayTextSize ? `${field.overlayTextSize}px` : '18px',
                        color: field.overlayTextColor || '#ffffff',
                        fontFamily: field.overlayTextFont || 'sans-serif'
                      }}
                    >
                      {field.overlayText}
                    </span>
                  )}
                  {field.enableOverlayButton && (
                    <button 
                      className={cn(
                        "px-6 py-2.5 font-semibold transition-colors cursor-pointer",
                        field.overlayButtonStyle === 'outline' 
                          ? "bg-transparent hover:bg-white/10" 
                          : "bg-white hover:bg-gray-100",
                        field.overlayButtonBorderRadius === 'none' ? "rounded-none" :
                        field.overlayButtonBorderRadius === 'pill' ? "rounded-full" : "rounded-lg"
                      )}
                      style={{ 
                        color: field.overlayButtonTextColor || (field.overlayButtonStyle === 'outline' ? '#ffffff' : '#000000'),
                        borderColor: field.overlayButtonStyle === 'outline' ? (field.overlayButtonTextColor || '#ffffff') : 'transparent',
                        borderTopWidth: field.overlayButtonBorderTop !== undefined && field.overlayButtonBorderTop !== '' ? `${field.overlayButtonBorderTop}px` : (field.overlayButtonStyle === 'outline' ? '2px' : '0px'),
                        borderRightWidth: field.overlayButtonBorderRight !== undefined && field.overlayButtonBorderRight !== '' ? `${field.overlayButtonBorderRight}px` : (field.overlayButtonStyle === 'outline' ? '2px' : '0px'),
                        borderBottomWidth: field.overlayButtonBorderBottom !== undefined && field.overlayButtonBorderBottom !== '' ? `${field.overlayButtonBorderBottom}px` : (field.overlayButtonStyle === 'outline' ? '2px' : '0px'),
                        borderLeftWidth: field.overlayButtonBorderLeft !== undefined && field.overlayButtonBorderLeft !== '' ? `${field.overlayButtonBorderLeft}px` : (field.overlayButtonStyle === 'outline' ? '2px' : '0px'),
                        borderStyle: 'solid',
                        marginTop: field.overlayButtonMarginTop !== undefined && field.overlayButtonMarginTop !== '' ? `${field.overlayButtonMarginTop}px` : undefined,
                        marginRight: field.overlayButtonMarginRight !== undefined && field.overlayButtonMarginRight !== '' ? `${field.overlayButtonMarginRight}px` : undefined,
                        marginBottom: field.overlayButtonMarginBottom !== undefined && field.overlayButtonMarginBottom !== '' ? `${field.overlayButtonMarginBottom}px` : undefined,
                        marginLeft: field.overlayButtonMarginLeft !== undefined && field.overlayButtonMarginLeft !== '' ? `${field.overlayButtonMarginLeft}px` : undefined,
                      }}
                    >
                      {field.overlayButtonText || 'Click Here'}
                    </button>
                  )}
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
    case 'Video':
      return (
        <div className={cn("flex flex-col gap-1.5 mb-5 w-full items-center", field.customClass)}>
            <div 
                className="relative overflow-hidden w-full max-w-full flex shrink-0"
                style={{
                    width: field.videoWidth ? (!isNaN(field.videoWidth) ? `${field.videoWidth}px` : field.videoWidth) : '100%',
                    height: field.videoHeight ? (!isNaN(field.videoHeight) ? `${field.videoHeight}px` : field.videoHeight) : '400px',
                }}
            >
                {field.videoUrl ? (
                    field.videoUrl.match(/\.(mp4|webm|ogg)$/i) ? (
                        <video 
                            src={field.videoUrl} 
                            className="w-full h-full object-cover"
                            autoPlay={field.autoPlay}
                            controls={field.controls !== false}
                            loop={field.loop}
                            muted={field.muted}
                        />
                    ) : (
                        <iframe 
                            src={field.videoUrl.includes('youtube') ? field.videoUrl.replace('watch?v=', 'embed/') : field.videoUrl} 
                            className="w-full h-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                        ></iframe>
                    )
                ) : (
                    <div className="w-full h-full bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400">
                        <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                        <span className="text-sm font-medium">Video element</span>
                    </div>
                )}
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
      const containerId = field.customId || `storefront-container-${field.id}`;
      return (
        <div className={cn("flex flex-col w-full mb-5 relative", field.customClass)} id={containerId}>
          <style dangerouslySetInnerHTML={{__html: `
              #${containerId} {
                  width: ${(!isNaN(field.width) && field.width ? `${field.width}px` : field.width) || (field.fullWidth ? '100%' : '100%')};
                  height: ${(!isNaN(field.height) && field.height ? `${field.height}px` : field.height) || 'auto'};
                  background-color: ${field.backgroundColor || 'transparent'};
                  background-image: ${field.backgroundImage ? `url(${field.backgroundImage})` : 'none'};
                  background-size: ${field.backgroundSize || 'cover'};
                  background-position: center;
                  padding-top: ${(!isNaN(field.paddingTop) && field.paddingTop ? `${field.paddingTop}px` : field.paddingTop) || '0'};
                  padding-right: ${(!isNaN(field.paddingRight) && field.paddingRight ? `${field.paddingRight}px` : field.paddingRight) || '0'};
                  padding-bottom: ${(!isNaN(field.paddingBottom) && field.paddingBottom ? `${field.paddingBottom}px` : field.paddingBottom) || '0'};
                  padding-left: ${(!isNaN(field.paddingLeft) && field.paddingLeft ? `${field.paddingLeft}px` : field.paddingLeft) || '0'};
                  margin-top: ${(!isNaN(field.marginTop) && field.marginTop ? `${field.marginTop}px` : field.marginTop) || '0'};
                  margin-right: ${(!isNaN(field.marginRight) && field.marginRight ? `${field.marginRight}px` : field.marginRight) || '0'};
                  margin-bottom: ${(!isNaN(field.marginBottom) && field.marginBottom ? `${field.marginBottom}px` : field.marginBottom) || '0'};
                  margin-left: ${(!isNaN(field.marginLeft) && field.marginLeft ? `${field.marginLeft}px` : field.marginLeft) || '0'};
                  ${field.border ? `border: ${field.border};` : ''}
                  border-radius: ${(!isNaN(field.borderRadius) && field.borderRadius ? `${field.borderRadius}px` : field.borderRadius) || '0'};
                  box-shadow: ${field.boxShadow || 'none'};
                  display: ${(field.visibleDesktop === false) ? 'none' : 'flex'};
              }
              @media (max-width: 1024px) {
                  #${containerId} {
                      width: ${(!isNaN(field.widthTablet) && field.widthTablet ? `${field.widthTablet}px` : field.widthTablet) || (!isNaN(field.width) && field.width ? `${field.width}px` : field.width) || (field.fullWidth ? '100%' : '100%')};
                      height: ${(!isNaN(field.heightTablet) && field.heightTablet ? `${field.heightTablet}px` : field.heightTablet) || (!isNaN(field.height) && field.height ? `${field.height}px` : field.height) || 'auto'};
                      padding-top: ${(!isNaN(field.paddingTopTablet) && field.paddingTopTablet ? `${field.paddingTopTablet}px` : field.paddingTopTablet) || (!isNaN(field.paddingTop) && field.paddingTop ? `${field.paddingTop}px` : field.paddingTop) || '0'};
                      padding-right: ${(!isNaN(field.paddingRightTablet) && field.paddingRightTablet ? `${field.paddingRightTablet}px` : field.paddingRightTablet) || (!isNaN(field.paddingRight) && field.paddingRight ? `${field.paddingRight}px` : field.paddingRight) || '0'};
                      padding-bottom: ${(!isNaN(field.paddingBottomTablet) && field.paddingBottomTablet ? `${field.paddingBottomTablet}px` : field.paddingBottomTablet) || (!isNaN(field.paddingBottom) && field.paddingBottom ? `${field.paddingBottom}px` : field.paddingBottom) || '0'};
                      padding-left: ${(!isNaN(field.paddingLeftTablet) && field.paddingLeftTablet ? `${field.paddingLeftTablet}px` : field.paddingLeftTablet) || (!isNaN(field.paddingLeft) && field.paddingLeft ? `${field.paddingLeft}px` : field.paddingLeft) || '0'};
                      margin-top: ${(!isNaN(field.marginTopTablet) && field.marginTopTablet ? `${field.marginTopTablet}px` : field.marginTopTablet) || (!isNaN(field.marginTop) && field.marginTop ? `${field.marginTop}px` : field.marginTop) || '0'};
                      margin-right: ${(!isNaN(field.marginRightTablet) && field.marginRightTablet ? `${field.marginRightTablet}px` : field.marginRightTablet) || (!isNaN(field.marginRight) && field.marginRight ? `${field.marginRight}px` : field.marginRight) || '0'};
                      margin-bottom: ${(!isNaN(field.marginBottomTablet) && field.marginBottomTablet ? `${field.marginBottomTablet}px` : field.marginBottomTablet) || (!isNaN(field.marginBottom) && field.marginBottom ? `${field.marginBottom}px` : field.marginBottom) || '0'};
                      margin-left: ${(!isNaN(field.marginLeftTablet) && field.marginLeftTablet ? `${field.marginLeftTablet}px` : field.marginLeftTablet) || (!isNaN(field.marginLeft) && field.marginLeft ? `${field.marginLeft}px` : field.marginLeft) || '0'};
                      display: ${(field.visibleTablet === false) ? 'none' : 'flex'};
                  }
              }
              @media (max-width: 768px) {
                  #${containerId} {
                      width: ${(!isNaN(field.widthMobile) && field.widthMobile ? `${field.widthMobile}px` : field.widthMobile) || (!isNaN(field.widthTablet) && field.widthTablet ? `${field.widthTablet}px` : field.widthTablet) || (!isNaN(field.width) && field.width ? `${field.width}px` : field.width) || (field.fullWidth ? '100%' : '100%')};
                      height: ${(!isNaN(field.heightMobile) && field.heightMobile ? `${field.heightMobile}px` : field.heightMobile) || (!isNaN(field.heightTablet) && field.heightTablet ? `${field.heightTablet}px` : field.heightTablet) || (!isNaN(field.height) && field.height ? `${field.height}px` : field.height) || 'auto'};
                      padding-top: ${(!isNaN(field.paddingTopMobile) && field.paddingTopMobile ? `${field.paddingTopMobile}px` : field.paddingTopMobile) || (!isNaN(field.paddingTopTablet) && field.paddingTopTablet ? `${field.paddingTopTablet}px` : field.paddingTopTablet) || (!isNaN(field.paddingTop) && field.paddingTop ? `${field.paddingTop}px` : field.paddingTop) || '0'};
                      padding-right: ${(!isNaN(field.paddingRightMobile) && field.paddingRightMobile ? `${field.paddingRightMobile}px` : field.paddingRightMobile) || (!isNaN(field.paddingRightTablet) && field.paddingRightTablet ? `${field.paddingRightTablet}px` : field.paddingRightTablet) || (!isNaN(field.paddingRight) && field.paddingRight ? `${field.paddingRight}px` : field.paddingRight) || '0'};
                      padding-bottom: ${(!isNaN(field.paddingBottomMobile) && field.paddingBottomMobile ? `${field.paddingBottomMobile}px` : field.paddingBottomMobile) || (!isNaN(field.paddingBottomTablet) && field.paddingBottomTablet ? `${field.paddingBottomTablet}px` : field.paddingBottomTablet) || (!isNaN(field.paddingBottom) && field.paddingBottom ? `${field.paddingBottom}px` : field.paddingBottom) || '0'};
                      padding-left: ${(!isNaN(field.paddingLeftMobile) && field.paddingLeftMobile ? `${field.paddingLeftMobile}px` : field.paddingLeftMobile) || (!isNaN(field.paddingLeftTablet) && field.paddingLeftTablet ? `${field.paddingLeftTablet}px` : field.paddingLeftTablet) || (!isNaN(field.paddingLeft) && field.paddingLeft ? `${field.paddingLeft}px` : field.paddingLeft) || '0'};
                      margin-top: ${(!isNaN(field.marginTopMobile) && field.marginTopMobile ? `${field.marginTopMobile}px` : field.marginTopMobile) || (!isNaN(field.marginTopTablet) && field.marginTopTablet ? `${field.marginTopTablet}px` : field.marginTopTablet) || (!isNaN(field.marginTop) && field.marginTop ? `${field.marginTop}px` : field.marginTop) || '0'};
                      margin-right: ${(!isNaN(field.marginRightMobile) && field.marginRightMobile ? `${field.marginRightMobile}px` : field.marginRightMobile) || (!isNaN(field.marginRightTablet) && field.marginRightTablet ? `${field.marginRightTablet}px` : field.marginRightTablet) || (!isNaN(field.marginRight) && field.marginRight ? `${field.marginRight}px` : field.marginRight) || '0'};
                      margin-bottom: ${(!isNaN(field.marginBottomMobile) && field.marginBottomMobile ? `${field.marginBottomMobile}px` : field.marginBottomMobile) || (!isNaN(field.marginBottomTablet) && field.marginBottomTablet ? `${field.marginBottomTablet}px` : field.marginBottomTablet) || (!isNaN(field.marginBottom) && field.marginBottom ? `${field.marginBottom}px` : field.marginBottom) || '0'};
                      margin-left: ${(!isNaN(field.marginLeftMobile) && field.marginLeftMobile ? `${field.marginLeftMobile}px` : field.marginLeftMobile) || (!isNaN(field.marginLeftTablet) && field.marginLeftTablet ? `${field.marginLeftTablet}px` : field.marginLeftTablet) || (!isNaN(field.marginLeft) && field.marginLeft ? `${field.marginLeft}px` : field.marginLeft) || '0'};
                      display: ${(field.visibleMobile === false) ? 'none' : 'flex'};
                  }
              }
          `}} />
          {field.imageOverlay && (
              <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: field.imageOverlay, borderRadius: (!isNaN(field.borderRadius) && field.borderRadius ? `${field.borderRadius}px` : field.borderRadius) }}></div>
          )}
          <div className="w-full flex flex-col relative z-10" style={field.contentWidth ? { maxWidth: '1200px', margin: '0 auto' } : {}}>
            {field.fields && field.fields.length > 0 ? (
                field.fields.map((subField) => <FieldRenderer key={subField.id} field={subField} />)
            ) : null}
          </div>
        </div>
      );
    case 'Flex':
      const flexId = field.customId || `storefront-flex-${field.id}`;
      return (
        <div className={cn("flex w-full mb-5", field.customClass)} id={flexId}>
          <style dangerouslySetInnerHTML={{__html: `
              #${flexId} {
                  flex-direction: ${field.flexDirection || 'row'};
                  flex-wrap: ${field.flexWrap || 'wrap'};
                  justify-content: ${field.justifyContent || 'flex-start'};
                  align-items: ${field.alignItems || 'stretch'};
                  row-gap: ${(field.rowGap !== undefined && field.rowGap !== '') ? field.rowGap : ((field.gap !== undefined && field.gap !== '') ? field.gap : 20)}px;
                  column-gap: ${(field.columnGap !== undefined && field.columnGap !== '') ? field.columnGap : ((field.gap !== undefined && field.gap !== '') ? field.gap : 20)}px;
                  width: ${field.width ? (!isNaN(field.width) ? `${field.width}px` : field.width) : '100%'};
                  min-height: ${field.minHeight ? (!isNaN(field.minHeight) ? `${field.minHeight}px` : field.minHeight) : 'auto'};
              }
              #${flexId} > .flex-item {
                  width: ${field.itemWidth || 'auto'};
                  height: ${field.itemHeight || 'auto'};
                  background: ${field.itemBackground || 'transparent'};
                  ${field.itemBorder ? `border: ${field.itemBorder} ${field.itemBorderColor || ''};` : (field.itemBorderColor ? `border: 1px solid ${field.itemBorderColor};` : '')}
                  border-radius: ${field.itemBorderRadius ? `${field.itemBorderRadius}px` : '0'};
                  flex-grow: ${field.flexGrow !== undefined && field.flexGrow !== '' ? field.flexGrow : '1'};
                  flex-shrink: ${field.flexShrink !== undefined && field.flexShrink !== '' ? field.flexShrink : '1'};
                  flex-basis: ${field.flexBasis || 'auto'};
                  min-width: ${field.flexBasis ? '0' : '250px'};
                  overflow: hidden;
              }
              @media (max-width: 1024px) {
                  #${flexId} {
                      flex-direction: ${field.flexDirectionTablet || field.flexDirection || 'row'};
                      flex-wrap: ${field.flexWrapTablet || field.flexWrap || 'wrap'};
                      justify-content: ${field.justifyContentTablet || field.justifyContent || 'flex-start'};
                      align-items: ${field.alignItemsTablet || field.alignItems || 'stretch'};
                  }
                  #${flexId} > .flex-item {
                      width: ${field.itemWidthTablet || field.itemWidth || 'auto'};
                      height: ${field.itemHeightTablet || field.itemHeight || 'auto'};
                      flex-grow: ${field.flexGrowTablet !== undefined && field.flexGrowTablet !== '' ? field.flexGrowTablet : (field.flexGrow !== undefined && field.flexGrow !== '' ? field.flexGrow : '1')};
                      flex-shrink: ${field.flexShrinkTablet !== undefined && field.flexShrinkTablet !== '' ? field.flexShrinkTablet : (field.flexShrink !== undefined && field.flexShrink !== '' ? field.flexShrink : '1')};
                      flex-basis: ${field.flexBasisTablet || field.flexBasis || 'auto'};
                  }
              }
              @media (max-width: 768px) {
                  #${flexId} {
                      flex-direction: ${field.flexDirectionMobile || field.flexDirectionTablet || field.flexDirection || 'column'};
                      flex-wrap: ${field.flexWrapMobile || field.flexWrapTablet || field.flexWrap || 'wrap'};
                      justify-content: ${field.justifyContentMobile || field.justifyContentTablet || field.justifyContent || 'flex-start'};
                      align-items: ${field.alignItemsMobile || field.alignItemsTablet || field.alignItems || 'stretch'};
                  }
                  #${flexId} > .flex-item {
                      width: ${field.itemWidthMobile || field.itemWidthTablet || field.itemWidth || 'auto'};
                      height: ${field.itemHeightMobile || field.itemHeightTablet || field.itemHeight || 'auto'};
                      flex-grow: ${field.flexGrowMobile !== undefined && field.flexGrowMobile !== '' ? field.flexGrowMobile : (field.flexGrowTablet !== undefined && field.flexGrowTablet !== '' ? field.flexGrowTablet : (field.flexGrow !== undefined && field.flexGrow !== '' ? field.flexGrow : '1'))};
                      flex-shrink: ${field.flexShrinkMobile !== undefined && field.flexShrinkMobile !== '' ? field.flexShrinkMobile : (field.flexShrinkTablet !== undefined && field.flexShrinkTablet !== '' ? field.flexShrinkTablet : (field.flexShrink !== undefined && field.flexShrink !== '' ? field.flexShrink : '1'))};
                      flex-basis: ${field.flexBasisMobile || field.flexBasisTablet || field.flexBasis || 'auto'};
                  }
              }
          `}} />
          {field.fields && field.fields.length > 0 ? (
            field.fields.map((subField) => (
              <div key={subField.id} className="flex-item flex flex-col relative">
                <FieldRenderer field={subField} />
              </div>
            ))
          ) : null}
        </div>
      );
    case 'Grid':
      const gridId = field.customId || `storefront-grid-${field.id}`;
      return (
        <div className={cn("grid w-full mb-5", field.customClass)} id={gridId}>
          <style dangerouslySetInnerHTML={{__html: `
              #${gridId} {
                  grid-template-columns: repeat(${field.columns || 3}, minmax(0, 1fr));
                  column-gap: ${(field.columnGap !== undefined && field.columnGap !== '') ? field.columnGap : ((field.gap !== undefined && field.gap !== '') ? field.gap : 20)}px;
                  row-gap: ${(field.rowGap !== undefined && field.rowGap !== '') ? field.rowGap : ((field.gap !== undefined && field.gap !== '') ? field.gap : 20)}px;
                  align-items: ${field.gridAlignItems || 'stretch'};
                  justify-items: ${field.justifyItems || 'stretch'};
                  width: ${field.width ? (!isNaN(field.width) ? `${field.width}px` : field.width) : '100%'};
                  min-height: ${field.minHeight ? (!isNaN(field.minHeight) ? `${field.minHeight}px` : field.minHeight) : 'auto'};
              }
              #${gridId} > .grid-item {
                  width: ${field.itemWidth || 'auto'};
                  height: ${field.itemHeight || 'auto'};
                  background: ${field.itemBackground || 'transparent'};
                  ${field.itemBorder ? `border: ${field.itemBorder} ${field.itemBorderColor || ''};` : (field.itemBorderColor ? `border: 1px solid ${field.itemBorderColor};` : '')}
                  border-radius: ${field.itemBorderRadius ? `${field.itemBorderRadius}px` : '0'};
                  overflow: hidden;
              }
              @media (max-width: 1024px) {
                  #${gridId} {
                      grid-template-columns: repeat(${field.columnsTablet || field.columns || 3}, minmax(0, 1fr));
                  }
                  #${gridId} > .grid-item {
                      width: ${field.itemWidthTablet || field.itemWidth || 'auto'};
                      height: ${field.itemHeightTablet || field.itemHeight || 'auto'};
                  }
              }
              @media (max-width: 768px) {
                  #${gridId} {
                      grid-template-columns: repeat(${field.columnsMobile || field.columnsTablet || field.columns || 3}, minmax(0, 1fr));
                  }
                  #${gridId} > .grid-item {
                      width: ${field.itemWidthMobile || field.itemWidthTablet || field.itemWidth || 'auto'};
                      height: ${field.itemHeightMobile || field.itemHeightTablet || field.itemHeight || 'auto'};
                  }
              }
          `}} />
          {field.fields && field.fields.length > 0 ? (
            field.fields.map((subField) => (
              <div key={subField.id} className="grid-item flex flex-col relative">
                <FieldRenderer field={subField} />
              </div>
            ))
          ) : null}
        </div>
      );
    case 'Text':
      return (
        <div 
          className={cn("w-full text-gray-800", field.customClass)}
          style={{
            fontFamily: field.fontFamily && field.fontFamily !== 'inherit' ? field.fontFamily : undefined,
            fontSize: field.fontSize ? `${field.fontSize}px` : '16px',
            fontWeight: field.isBold ? 'bold' : (field.fontWeight || 'normal'),
            fontStyle: field.isItalic ? 'italic' : 'normal',
            textDecoration: field.isUnderline ? 'underline' : 'none',
            textAlign: field.textAlign || 'left',
            color: field.textColor || '#000000',
          }}
        >
          {field.content || field.placeholder || ''}
        </div>
      );
    case 'EmptySpace':
      return <div className="w-full flex-1"></div>;
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

export default function SectionBuilderSection({ section, data }) {
  const sectionData = data || section;
  const layout = sectionData?.content?.layout || [];

  if (!layout || layout.length === 0) {
    return (
      <section className="w-full py-16 bg-gray-50 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Section Builder</h2>
        <p className="text-gray-500">Configure this section in the CMS Editor to add forms and layouts.</p>
      </section>
    );
  }

  return (
    <section className="w-full">
      <div className="w-full">
        <div className="w-full flex flex-col gap-12">
          {layout.map((sec) => (
            <div key={sec.id} className="w-full">
              {sec.fields && sec.fields.length > 0 ? (
                <div className="w-full">
                  {sec.fields.map((field) => (
                    <FieldRenderer key={field.id} field={field} />
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
