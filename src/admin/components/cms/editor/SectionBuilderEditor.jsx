import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiX, FiMonitor, FiTablet, FiSmartphone, FiPlus, FiChevronDown, FiChevronUp,
    FiType, FiAlignLeft, FiDollarSign, FiTag, FiMap, FiMapPin, FiMail,
    FiPhone, FiGlobe, FiImage, FiGrid, FiLayout, FiClock, FiCalendar,
    FiCheckSquare, FiCircle, FiUpload, FiMoreHorizontal, FiTrash2, FiSettings, FiPlay, FiCopy,
    FiBold, FiItalic, FiUnderline, FiLink, FiList, FiCode, FiLoader
} from 'react-icons/fi';
import { cn } from '../../../../utils/cn';
import { useToast } from '../../../../components/ui/Toast/ToastContext';

const PRESET_FIELDS = [
    { id: 'p_desc', type: 'Description', icon: FiAlignLeft, label: 'Description' },
    { id: 'p_pricing', type: 'Pricing', icon: FiDollarSign, label: 'Pricing' },
    { id: 'p_excerpt', type: 'Excerpt', icon: FiAlignLeft, label: 'Excerpt' },
    { id: 'p_tags', type: 'Tags', icon: FiTag, label: 'Tags' },
    { id: 'p_map', type: 'Map', icon: FiMap, label: 'Map' },
    { id: 'p_location', type: 'Location', icon: FiMapPin, label: 'Location' },
    { id: 'p_zip', type: 'ZipCode', icon: FiMapPin, label: 'Zip or post code' },
    { id: 'p_address', type: 'Address', icon: FiMapPin, label: 'Address' },
    { id: 'p_phone', type: 'Phone', icon: FiPhone, label: 'Phone' },
    { id: 'p_website', type: 'Website', icon: FiGlobe, label: 'Website' },
    { id: 'p_email', type: 'Email', icon: FiMail, label: 'Email' },
    { id: 'p_image', type: 'Image', icon: FiImage, label: 'Image' },
    { id: 'p_social', type: 'SocialInfo', icon: FiGlobe, label: 'Social info' },
    { id: 'p_fax', type: 'Fax', icon: FiPhone, label: 'Fax' }
];

const LAYOUT_FIELDS = [
    { id: 'l_grid', type: 'Grid', icon: FiGrid, label: 'Grid' },
    { id: 'l_flex', type: 'Flex', icon: FiLayout, label: 'Flex' },
    { id: 'l_container', type: 'Container', icon: FiLayout, label: 'Container' }
];

const CUSTOM_FIELDS = [
    { id: 'c_text', type: 'Text', icon: FiType, label: 'Text' },
    { id: 'c_textarea', type: 'Textarea', icon: FiAlignLeft, label: 'Textarea' },
    { id: 'c_number', type: 'Number', icon: FiType, label: 'Number' },
    { id: 'c_url', type: 'URL', icon: FiGlobe, label: 'URL' },
    { id: 'c_date', type: 'Date', icon: FiCalendar, label: 'Date' },
    { id: 'c_time', type: 'Time', icon: FiClock, label: 'Time' },
    { id: 'c_color', type: 'ColorPicker', icon: FiImage, label: 'Color picker' },
    { id: 'c_select', type: 'Select', icon: FiChevronDown, label: 'Select' },
    { id: 'c_checkbox', type: 'Checkbox', icon: FiCheckSquare, label: 'Checkbox' },
    { id: 'c_radio', type: 'Radio', icon: FiCircle, label: 'Radio' },
];

const DropZone = ({ onDrop, isContainerEnd = false, disabled = false }) => {
    const [isOver, setIsOver] = useState(false);
    return (
        <div
            className={cn(
                "w-full transition-all duration-200 ease-in-out",
                (isOver && !disabled) ? (isContainerEnd ? "h-12 py-3" : "h-6 py-2") : (isContainerEnd ? "h-6 py-1" : "h-2 py-0")
            )}
            onDragOver={(e) => { 
                if (disabled) return;
                e.preventDefault(); 
                setIsOver(true); 
            }}
            onDragLeave={() => setIsOver(false)}
            onDrop={(e) => { 
                if (disabled) return;
                e.preventDefault();
                setIsOver(false);
                onDrop(e);
            }}
        >
            <div className={cn("w-full rounded-full transition-all duration-200", isOver ? "bg-indigo-600 h-full opacity-100" : "bg-transparent h-full opacity-0")} />
        </div>
    );
};

const GridDropZone = ({ onDrop, disabled = false }) => {
    const [isOver, setIsOver] = useState(false);
    if (disabled) return null;
    return (
        <div
            className="absolute left-[-12px] top-0 bottom-0 w-6 z-20 flex items-center justify-center cursor-pointer group/gdz"
            onDragOver={(e) => { e.preventDefault(); setIsOver(true); }}
            onDragLeave={() => setIsOver(false)}
            onDrop={(e) => { e.preventDefault(); setIsOver(false); onDrop(e); }}
        >
            <div className={cn("w-1.5 h-full rounded transition-colors group-hover/gdz:bg-indigo-300", isOver ? "bg-indigo-600" : "bg-transparent")} />
        </div>
    );
};

// --- Recursive Utilities ---
const getFieldAtPath = (layoutState, path) => {
    if (path.length === 0) return null;
    let current = layoutState[path[0]];
    for (let i = 1; i < path.length; i++) {
        current = current.fields[path[i]];
    }
    return current;
};

const removeFieldAtPath = (layoutState, path) => {
    if (path.length === 1) {
        layoutState.splice(path[0], 1);
        return;
    }
    const parentPath = path.slice(0, -1);
    const parent = getFieldAtPath(layoutState, parentPath);
    parent.fields.splice(path[path.length - 1], 1);
};

const insertFieldAtPath = (layoutState, path, field) => {
    const parentPath = path.slice(0, -1);
    let parent = null;
    if (parentPath.length === 0) {
        parent = layoutState[parentPath[0]];
    } else {
        parent = getFieldAtPath(layoutState, parentPath);
    }
    if (!parent.fields) parent.fields = [];
    
    const index = path[path.length - 1];
    
    // Pad with empty spaces if inserting beyond length (useful for specific Grid placement)
    while (parent.fields.length < index) {
        parent.fields.push({ 
            id: `f_empty_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, 
            type: 'EmptySpace', 
            label: 'Empty Space',
            icon: 'FiLayout'
        });
    }
    
    // If the target index is exactly an EmptySpace, REPLACE it instead of shifting it
    if (parent.fields[index] && parent.fields[index].type === 'EmptySpace') {
        parent.fields[index] = field;
    } else {
        parent.fields.splice(index, 0, field);
    }
};

const adjustPathAfterRemoval = (targetPath, sourcePath) => {
    const newPath = [...targetPath];
    for (let depth = 0; depth < Math.min(sourcePath.length, newPath.length); depth++) {
        // If they diverge before the last element of sourcePath, no shift happens in this branch
        if (depth < sourcePath.length - 1 && sourcePath[depth] !== newPath[depth]) {
            break; 
        }
        
        // If we reach the end of sourcePath and it is less than the target index at the same depth, shift it
        if (depth === sourcePath.length - 1) {
            if (sourcePath[depth] < newPath[depth]) {
                newPath[depth] -= 1;
            }
        } else {
            break;
        }
    }
    return newPath;
};

// --- Recursive Renderer ---
const RecursiveFieldRenderer = ({ 
    field, 
    path, 
    activeFieldPath, 
    setActiveFieldPath, 
    handleDragStartCanvas, 
    handleDropField, 
    handleDragOver, 
    removeField, 
    renderIcon,
    isMotherDrag,
    targetContainerPath,
    setTargetContainerPath
}) => {
    const isContainer = field.type === 'Container';
    const isGrid = field.type === 'Grid';
    const isFlex = field.type === 'Flex';
    const isDescription = field.type === 'Description';
    const isImage = field.type === 'Image';
    const isEmptySpace = field.type === 'EmptySpace';
    const isActive = activeFieldPath && activeFieldPath.join(',') === path.join(',');
    
    const gridCols = field.columns || 3;
    const gridRows = field.rows || (isFlex ? 1 : 2); // Flex defaults to 1 row

    // Grid properties
    const columnGap = field.columnGap !== undefined ? field.columnGap : 20;
    const rowGap = field.rowGap !== undefined ? field.rowGap : 20;
    const gridAlignItems = field.gridAlignItems || 'stretch';
    const justifyItems = field.justifyItems || 'stretch';

    // Flex properties
    const flexWrap = field.flexWrap || 'wrap';
    const flexDirection = field.flexDirection || 'row';
    const justifyContent = field.justifyContent || 'flex-start';
    const alignItems = field.alignItems || 'stretch';
    const gap = field.gap !== undefined ? field.gap : 20;
    const minHeight = field.minHeight || (isFlex ? 300 : 160);

    return (
        <div 
            draggable
            onDragStart={(e) => handleDragStartCanvas(e, path)}
            className={cn(
                "flex items-start bg-white border cursor-pointer shadow-sm hover:border-blue-300 transition-colors group/subfield relative w-full",
                isActive ? "border-indigo-600 ring-1 ring-indigo-600 z-10" : "border-gray-200",
                isContainer ? "min-h-[200px] border-2 border-[#6366F1] rounded-none p-4 flex-col gap-3" : 
                (isGrid || isFlex) ? "p-0 border-0 shadow-none bg-transparent gap-3" :
                isEmptySpace ? "min-h-[140px] border-dashed border-[#b6c6fa] bg-[#f8faff] rounded justify-center items-center shadow-none hover:bg-[#ebf0ff]" :
                isImage ? "rounded-xl border-2 border-[#6366F1] flex-col overflow-hidden" :
                isDescription ? "rounded-lg p-0 flex-col gap-3" : "rounded-lg px-3 py-2 flex-col gap-3",
                (!isContainer && !isGrid && !isFlex && !isImage && !isDescription && !isEmptySpace && field.bottomUnderline) ? "border-b-2 border-gray-200" : ""
            )}
            onClick={(e) => { e.stopPropagation(); setActiveFieldPath(path); }}
        >
            {/* Grab icon */}
            {(!isGrid && !isFlex && !isEmptySpace) && (
                <div className="absolute left-[-20px] top-3 text-gray-300 cursor-grab hover:text-gray-500 opacity-0 group-hover/subfield:opacity-100 transition-opacity">
                    <FiGrid size={14} />
                </div>
            )}

            {/* Field Header / Content based on type */}
            {isEmptySpace ? (
                <div 
                    className="flex flex-col items-center text-[#94a3b8] w-full h-full justify-center relative"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDropField(e, path)}
                >
                    <div className="w-8 h-8 rounded-full bg-white text-gray-400 flex items-center justify-center mb-2 shadow-sm pointer-events-none">
                        <FiLayout size={14} />
                    </div>
                    <span className="text-xs font-semibold pointer-events-none">Empty Space</span>
                    <button 
                        onClick={(e) => { e.stopPropagation(); removeField(path); }}
                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover/subfield:opacity-100 p-1"
                        title="Delete Space"
                    >
                        <FiTrash2 size={14} />
                    </button>
                </div>
            ) : (isGrid || isFlex) ? (
                <div className="w-full h-full flex flex-col relative rounded-lg border border-[#3b82f6] bg-white">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center gap-2 text-blue-500 font-bold text-[15px]">
                            {isFlex ? <FiLayout size={18} /> : <FiGrid size={18} />} <span>{field.label}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-500 transition-colors"><FiCopy size={16} /></button>
                            <button onClick={(e) => { e.stopPropagation(); removeField(path); }} className="w-8 h-8 flex items-center justify-center rounded hover:bg-red-50 text-gray-500 hover:text-red-500 transition-colors"><FiTrash2 size={16} /></button>
                            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-500 transition-colors"><FiChevronUp size={16} /></button>
                        </div>
                    </div>
                    {/* Body */}
                    <div 
                        className={cn("p-5 bg-white rounded-b-lg", isGrid ? "grid min-h-[160px]" : "flex")}
                        style={isGrid ? { 
                            gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
                            columnGap: `${columnGap}px`,
                            rowGap: `${rowGap}px`,
                            alignItems: gridAlignItems,
                            justifyItems: justifyItems
                        } : {
                            flexDirection,
                            flexWrap,
                            justifyContent,
                            alignItems,
                            gap: `${gap}px`,
                            minHeight: `${minHeight}px`
                        }}
                    >
                        {field.fields && field.fields.map((subField, idx) => (
                            <div key={subField.id} className="relative flex flex-col" style={isFlex ? { flex: `1 1 calc(${100 / gridCols}% - ${gap}px)`, minWidth: `calc(${100 / gridCols}% - ${gap}px)` } : {}}>
                                <GridDropZone disabled={isMotherDrag} onDrop={(e) => handleDropField(e, [...path, idx])} />
                                <RecursiveFieldRenderer 
                                    field={subField} 
                                    path={[...path, idx]} 
                                    {...{activeFieldPath, setActiveFieldPath, handleDragStartCanvas, handleDropField, handleDragOver, removeField, renderIcon, isMotherDrag, targetContainerPath, setTargetContainerPath}} 
                                />
                            </div>
                        ))}
                        {[...Array(Math.max(0, (gridCols * gridRows) - (field.fields?.length || 0)))].map((_, i) => (
                            <div 
                                key={`placeholder-${i}`} 
                                className="border border-dashed border-[#b6c6fa] rounded bg-[#f8faff] min-h-[140px] flex flex-col items-center justify-center cursor-pointer transition-colors hover:bg-[#ebf0ff]"
                                style={isFlex ? { flex: `1 1 calc(${100 / gridCols}% - ${gap}px)`, minWidth: `calc(${100 / gridCols}% - ${gap}px)` } : {}}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDropField(e, [...path, (field.fields?.length || 0) + i])}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveFieldPath(null);
                                    setTargetContainerPath(path);
                                }}
                            >
                                <div className="w-10 h-10 rounded-full bg-[#e0ebff] text-blue-500 flex items-center justify-center mb-3 pointer-events-none">
                                    <FiPlus size={20} strokeWidth={3} />
                                </div>
                                <span className="text-[13px] font-semibold text-[#8da6e3] pointer-events-none">Drag element here</span>
                            </div>
                        ))}
                    </div>
                </div>
            ) : isContainer ? (
                <div className="w-full h-full flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-[#6366F1] font-semibold text-sm">
                            {renderIcon(field.icon)} <span>{field.label}</span>
                        </div>
                        <button 
                            onClick={(e) => { e.stopPropagation(); removeField(path); }}
                            className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover/subfield:opacity-100 p-1"
                            title="Delete Container"
                        >
                            <FiTrash2 size={14} />
                        </button>
                    </div>
                    {/* Render children */}
                    <div 
                        className="flex-1 border border-dashed border-gray-300 min-h-[100px] p-2 bg-gray-50/50 flex flex-col"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDropField(e, [...path, field.fields ? field.fields.length : 0])}
                    >
                        {field.fields && field.fields.map((subField, idx) => (
                            <React.Fragment key={subField.id}>
                                <DropZone disabled={isMotherDrag} onDrop={(e) => handleDropField(e, [...path, idx])} />
                                <div className="py-1" onDragOver={handleDragOver} onDrop={(e) => handleDropField(e, [...path, idx])}>
                                    <RecursiveFieldRenderer 
                                        field={subField} 
                                        path={[...path, idx]} 
                                        {...{activeFieldPath, setActiveFieldPath, handleDragStartCanvas, handleDropField, handleDragOver, removeField, renderIcon, isMotherDrag, targetContainerPath, setTargetContainerPath}} 
                                    />
                                </div>
                            </React.Fragment>
                        ))}
                        <DropZone disabled={isMotherDrag} onDrop={(e) => handleDropField(e, [...path, field.fields ? field.fields.length : 0])} isContainerEnd={true} />
                        {(!field.fields || field.fields.length === 0) && (
                            <div 
                                className="w-full h-full flex-1 min-h-[40px] flex flex-col items-center justify-center text-sm font-medium text-gray-400 group/add cursor-pointer transition-colors hover:bg-white border-2 border-transparent hover:border-indigo-100 rounded-lg p-4"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveFieldPath(null); // Clear active field to show Elements
                                    setTargetContainerPath(path);
                                }}
                            >
                                <span>Drag Element here</span>
                                <div className="mt-2 w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-sm group-hover/add:bg-indigo-600 group-hover/add:text-white transition-colors">
                                    <FiPlus size={16} />
                                </div>
                            </div>
                        )}
                        {field.fields && field.fields.length > 0 && (
                            <div 
                                className="w-full mt-2 py-2 flex items-center justify-center text-xs font-medium text-indigo-500 cursor-pointer hover:bg-indigo-50 rounded transition-colors"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveFieldPath(null);
                                    setTargetContainerPath(path);
                                }}
                            >
                                + Add Element to {field.label}
                            </div>
                        )}
                    </div>
                </div>
            ) : isDescription ? (
                <div className={cn("flex-1 flex flex-col items-start gap-3 w-full px-0 py-2", field.bottomUnderline ? "border-b-2 border-gray-200 pb-4 mb-2" : "")}>
                    <div className="flex items-center justify-between w-full px-4">
                        <label className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                        </label>
                        <button 
                            onClick={(e) => { e.stopPropagation(); removeField(path); }}
                            className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover/subfield:opacity-100 p-1"
                            title="Delete Field"
                        >
                            <FiTrash2 size={14} />
                        </button>
                    </div>
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
                    </div>
                    {/* Render children inside Description! */}
                    <div className="w-full mt-2 bg-gray-50/50 rounded-lg p-2 min-h-[40px]">
                        {field.fields && field.fields.map((subField, idx) => (
                            <React.Fragment key={subField.id}>
                                <DropZone disabled={isMotherDrag} onDrop={(e) => handleDropField(e, [...path, idx])} />
                                <div className="py-1" onDragOver={handleDragOver} onDrop={(e) => handleDropField(e, [...path, idx])}>
                                    <RecursiveFieldRenderer 
                                        field={subField} 
                                        path={[...path, idx]} 
                                        {...{activeFieldPath, setActiveFieldPath, handleDragStartCanvas, handleDropField, handleDragOver, removeField, renderIcon, isMotherDrag, targetContainerPath, setTargetContainerPath}} 
                                    />
                                </div>
                            </React.Fragment>
                        ))}
                        <DropZone disabled={isMotherDrag} onDrop={(e) => handleDropField(e, [...path, field.fields ? field.fields.length : 0])} isContainerEnd={true} />
                        {(!field.fields || field.fields.length === 0) && (
                            <div 
                                className="w-full h-full flex-1 min-h-[40px] flex flex-col items-center justify-center text-sm font-medium text-gray-400 group/add cursor-pointer transition-colors hover:bg-white border-2 border-transparent hover:border-indigo-100 rounded-lg p-2"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveFieldPath(null);
                                    setTargetContainerPath(path);
                                }}
                            >
                                <span>Drag Element here</span>
                                <div className="mt-1 w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-sm group-hover/add:bg-indigo-600 group-hover/add:text-white transition-colors">
                                    <FiPlus size={14} />
                                </div>
                            </div>
                        )}
                        {field.fields && field.fields.length > 0 && (
                            <div 
                                className="w-full mt-2 py-1 flex items-center justify-center text-xs font-medium text-indigo-500 cursor-pointer hover:bg-indigo-50 rounded transition-colors"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveFieldPath(null);
                                    setTargetContainerPath(path);
                                }}
                            >
                                + Add Element
                            </div>
                        )}
                    </div>
                </div>
            ) : isImage ? (
                <div 
                    className={`flex-1 flex flex-col items-center justify-center relative group/image bg-center bg-no-repeat ${field.imageFit === 'contain' ? 'bg-contain' : 'bg-cover'}`}
                    style={{
                        ...(field.imageUrl ? { backgroundImage: `url(${field.imageUrl})` } : {}),
                        width: field.imageWidth ? (!isNaN(field.imageWidth) ? `${field.imageWidth}px` : field.imageWidth) : '100%',
                        minHeight: field.imageHeight ? (!isNaN(field.imageHeight) ? `${field.imageHeight}px` : field.imageHeight) : '250px',
                        boxShadow: field.imageBoxShadow ? `${field.imageBoxShadow} ${field.imageBoxShadowColor || ''}`.trim() : undefined
                    }}
                >
                    {/* Header Controls */}
                    <div className="absolute top-2 right-2 flex items-center justify-end z-10 opacity-0 group-hover/image:opacity-100 transition-opacity">
                        <button 
                            onClick={(e) => { e.stopPropagation(); removeField(path); }}
                            className="bg-white rounded-full p-2 text-gray-400 hover:text-red-500 shadow-sm border border-gray-100 transition-colors"
                            title="Delete Field"
                        >
                            <FiTrash2 size={14} />
                        </button>
                    </div>
                    {/* Label */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-[#6366F1] z-20">
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                    </div>

                    {field.enableOverlay && (
                        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-4 p-4 pointer-events-none z-10">
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
                                        "px-6 py-2.5 font-semibold transition-colors",
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
                    
                    {/* Big Icon Placeholder */}
                    {!field.imageUrl && (
                        <div className="w-full h-full flex items-center justify-center text-[#6366F1]">
                            <FiImage size={72} strokeWidth={2} />
                        </div>
                    )}

                    {/* Support nested fields, always visible to allow dropping into empty image */}
                    <div className="w-full mt-auto bg-white/70 backdrop-blur-sm border-t border-gray-200 p-2 min-h-[40px]">
                        {field.fields && field.fields.map((subField, idx) => (
                            <React.Fragment key={subField.id}>
                                <DropZone disabled={isMotherDrag} onDrop={(e) => handleDropField(e, [...path, idx])} />
                                <div className="py-1" onDragOver={handleDragOver} onDrop={(e) => handleDropField(e, [...path, idx])}>
                                    <RecursiveFieldRenderer 
                                        field={subField} 
                                        path={[...path, idx]} 
                                        {...{activeFieldPath, setActiveFieldPath, handleDragStartCanvas, handleDropField, handleDragOver, removeField, renderIcon, isMotherDrag}} 
                                    />
                                </div>
                            </React.Fragment>
                        ))}
                        <DropZone disabled={isMotherDrag} onDrop={(e) => handleDropField(e, [...path, field.fields ? field.fields.length : 0])} isContainerEnd={true} />
                        {(!field.fields || field.fields.length === 0) && (
                            <div className="w-full text-center text-xs text-gray-500 py-1 pointer-events-none">Drop nested fields here</div>
                        )}
                    </div>
                </div>
            ) : (
                <div className={cn("flex-1 flex flex-col w-full", field.bottomUnderline ? "border-b-2 border-gray-200 pb-3 mb-1" : "")}>
                    <div className="flex items-center justify-between py-1 w-full">
                        <div className="flex items-center gap-3">
                            <span className="text-gray-400">{renderIcon(field.icon)}</span>
                            <span className="text-sm font-medium text-gray-700">{field.label}</span>
                        </div>
                        <button 
                            onClick={(e) => { e.stopPropagation(); removeField(path); }}
                            className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover/subfield:opacity-100 p-1"
                            title="Delete Field"
                        >
                            <FiTrash2 size={14} />
                        </button>
                    </div>
                    {/* Render children inside generic fields too! */}
                    <div className="w-full mt-2 border-l-2 border-dashed border-gray-200 pl-4 py-1 min-h-[30px]">
                        {field.fields && field.fields.map((subField, idx) => (
                            <React.Fragment key={subField.id}>
                                <DropZone disabled={isMotherDrag} onDrop={(e) => handleDropField(e, [...path, idx])} />
                                <div className="py-1" onDragOver={handleDragOver} onDrop={(e) => handleDropField(e, [...path, idx])}>
                                    <RecursiveFieldRenderer 
                                        field={subField} 
                                        path={[...path, idx]} 
                                        {...{activeFieldPath, setActiveFieldPath, handleDragStartCanvas, handleDropField, handleDragOver, removeField, renderIcon, isMotherDrag}} 
                                    />
                                </div>
                            </React.Fragment>
                        ))}
                        <DropZone disabled={isMotherDrag} onDrop={(e) => handleDropField(e, [...path, field.fields ? field.fields.length : 0])} isContainerEnd={true} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default function SectionBuilderEditor({ section, pageName, onSave, onClose, isLoading = false }) {
    const { addToast } = useToast();
    const [device, setDevice] = useState('desktop');
    const [enablePreview, setEnablePreview] = useState(true);

    const defaultLayout = [
        {
            id: 's_general', title: 'General Section', isExpanded: true, fields: [
                { id: 'f_1', type: 'Description', label: 'Description', icon: 'FiAlignLeft' },
                { id: 'f_2', type: 'Location', label: 'Location', icon: 'FiMapPin' },
                { id: 'f_3', type: 'Email', label: 'Email', icon: 'FiMail' }
            ]
        },
        { id: 's_pricing', title: 'Pricing', isExpanded: false, fields: [] }
    ];

    // Layout structure: Array of objects { id, title, fields: [{ id, type, label, fields: [...] }] }
    const [layout, setLayout] = useState(() => {
        if (section?.content?.layout && section.content.layout.length > 0) {
            return section.content.layout;
        }
        return defaultLayout;
    });

    const [draggedItem, setDraggedItem] = useState(null);
    const [dragType, setDragType] = useState(null); // 'sidebar' or 'canvas'
    const [draggedSectionIndex, setDraggedSectionIndex] = useState(null);

    // Expand/Collapse Sidebar groups
    const [showLayout, setShowLayout] = useState(true);
    const [showPresets, setShowPresets] = useState(true);
    const [showCustom, setShowCustom] = useState(true);

    // Active field for property editing
    const [activeFieldPath, setActiveFieldPath] = useState(null); // { sIdx, fIdx }
    const [targetContainerPath, setTargetContainerPath] = useState(null);

    const [initialLayoutString, setInitialLayoutString] = useState(JSON.stringify(layout));

    // Sync layout if section prop updates (e.g. after libraryConfigurations loads)
    React.useEffect(() => {
        if (section?.content?.layout && section.content.layout.length > 0) {
            // Only update if it's different from initial to avoid wiping unsaved changes 
            // if the prop happens to change for other reasons, though typically it only changes on load
            const incomingString = JSON.stringify(section.content.layout);
            if (incomingString !== initialLayoutString) {
                setLayout(section.content.layout);
                setInitialLayoutString(incomingString);
            }
        }
    }, [section?.content?.layout]);

    const handleSave = () => {
        const hasChanged = JSON.stringify(layout) !== initialLayoutString;
        onSave({
            content: {
                ...section.content,
                layout
            }
        }, hasChanged);
    };

    const handleAddSection = () => {
        setLayout([...layout, {
            id: `s_${Date.now()}`,
            title: 'New Section',
            isExpanded: true,
            fields: []
        }]);
        addToast({ type: 'success', message: 'New section added!' });
    };

    const removeSection = (sectionIndex) => {
        const newLayout = [...layout];
        newLayout.splice(sectionIndex, 1);
        setLayout(newLayout);
    };

    const removeField = (path) => {
        const newLayout = [...layout];
        removeFieldAtPath(newLayout, path);
        setLayout(newLayout);
        setActiveFieldPath(null);
    };

    const toggleSection = (index) => {
        const newLayout = [...layout];
        newLayout[index].isExpanded = !newLayout[index].isExpanded;
        setLayout(newLayout);
    };

    const updateActiveField = (updates) => {
        if (!activeFieldPath) return;
        const newLayout = [...layout];
        let field = getFieldAtPath(newLayout, activeFieldPath);
        Object.assign(field, updates);
        setLayout(newLayout);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;
                    
                    const MAX_WIDTH = 1200;
                    const MAX_HEIGHT = 1200;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    const dataUrl = canvas.toDataURL('image/webp', 0.6);
                    updateActiveField({ imageUrl: dataUrl });
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    // --- Drag and Drop Handlers ---
    const handleDragStartSidebar = (e, field) => {
        e.dataTransfer.setData('text/plain', ''); // Required for Firefox
        setDraggedItem(field);
        setDragType('sidebar');
    };

    const handleDragStartCanvas = (e, path) => {
        e.stopPropagation();
        e.dataTransfer.setData('text/plain', '');
        setDraggedItem({ path });
        setDragType('canvas_field');
    };

    const handleDragStartSection = (e, sectionIndex) => {
        e.stopPropagation();
        e.dataTransfer.setData('text/plain', '');
        setDraggedSectionIndex(sectionIndex);
        setDragType('canvas_section');
    };

    const handleDragOver = (e) => {
        e.preventDefault(); // Necessary to allow dropping
    };

    const handleDropField = (e, targetPath) => {
        e.preventDefault();
        e.stopPropagation();

        if (dragType === 'canvas_section') return;

        const newLayout = JSON.parse(JSON.stringify(layout));
        let fieldToDrop = null;
        let finalTargetPath = [...targetPath];

        if (dragType === 'sidebar' && draggedItem) {
            if (draggedItem.type === 'Container' && finalTargetPath.length > 2) {
                alert("Containers cannot be nested inside other fields.");
                return;
            }
            fieldToDrop = {
                id: `f_${Date.now()}`,
                type: draggedItem.type,
                label: draggedItem.label,
                icon: draggedItem.icon.name || 'FiType',
                fields: []
            };
        } else if (dragType === 'canvas_field' && draggedItem) {
            const sourcePath = draggedItem.path;
            const sourceField = getFieldAtPath(newLayout, sourcePath);

            if (finalTargetPath.length > 2 && sourceField.type === 'Container') {
                alert("Containers cannot be nested inside other fields.");
                return;
            }

            // Check if trying to drop a parent into its own child
            if (finalTargetPath.join(',').startsWith(sourcePath.join(','))) {
                alert("Cannot drop a field inside itself.");
                return;
            }

            fieldToDrop = sourceField;
            
            finalTargetPath = adjustPathAfterRemoval(finalTargetPath, sourcePath);
            removeFieldAtPath(newLayout, sourcePath);
        }

        if (!fieldToDrop) return;

        insertFieldAtPath(newLayout, finalTargetPath, fieldToDrop);

        setLayout(newLayout);
        setDraggedItem(null);
        setDragType(null);
        setActiveFieldPath(finalTargetPath);
    };

    const handleDropSection = (e, targetSectionIndex) => {
        e.preventDefault();
        e.stopPropagation();

        if (dragType === 'canvas_section' && draggedSectionIndex !== null) {
            const newLayout = [...layout];
            const sectionToMove = newLayout[draggedSectionIndex];
            newLayout.splice(draggedSectionIndex, 1);

            let adjustedTargetIdx = targetSectionIndex;
            if (targetSectionIndex > draggedSectionIndex) {
                adjustedTargetIdx--;
            }

            newLayout.splice(adjustedTargetIdx, 0, sectionToMove);
            setLayout(newLayout);
            setDraggedSectionIndex(null);
            setDragType(null);
        }
    };

    const handleSidebarItemClick = (field) => {
        if (layout.length === 0) return; // Need a section first

        const newField = {
            id: `f_${Date.now()}`,
            type: field.type,
            label: field.label,
            icon: field.icon.name || 'FiType'
        };

        const newLayout = [...layout];
        
        if (targetContainerPath) {
            let target = newLayout[targetContainerPath[0]];
            for (let i = 1; i < targetContainerPath.length; i++) {
                target = target.fields[targetContainerPath[i]];
            }
            if (!target.fields) target.fields = [];
            target.fields.push(newField);
            
            setLayout(newLayout);
            setTargetContainerPath(null);
            setActiveFieldPath([...targetContainerPath, target.fields.length - 1]);
        } else {
            // Find the first expanded section, or default to the last section
            let targetSectionIdx = layout.findIndex(s => s.isExpanded);
            if (targetSectionIdx === -1) targetSectionIdx = layout.length - 1;

            newLayout[targetSectionIdx].fields.push(newField);
            setLayout(newLayout);
            setActiveFieldPath([targetSectionIdx, newLayout[targetSectionIdx].fields.length - 1]);
        }
    };

    const renderIcon = (iconName) => {
        switch (iconName) {
            case 'FiAlignLeft': return <FiAlignLeft />;
            case 'FiDollarSign': return <FiDollarSign />;
            case 'FiTag': return <FiTag />;
            case 'FiMap': return <FiMap />;
            case 'FiMapPin': return <FiMapPin />;
            case 'FiPhone': return <FiPhone />;
            case 'FiGlobe': return <FiGlobe />;
            case 'FiMail': return <FiMail />;
            case 'FiImage': return <FiImage />;
            case 'FiGrid': return <FiGrid />;
            case 'FiLayout': return <FiLayout />;
            case 'FiType': return <FiType />;
            case 'FiCalendar': return <FiCalendar />;
            case 'FiClock': return <FiClock />;
            case 'FiChevronDown': return <FiChevronDown />;
            case 'FiCheckSquare': return <FiCheckSquare />;
            case 'FiCircle': return <FiCircle />;
            case 'FiUpload': return <FiUpload />;
            default: return <FiType />;
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex bg-black/50 backdrop-blur-sm font-sans">
            {isLoading ? (
                <div className="w-full h-full flex items-center justify-center bg-[#F5F7FA]">
                    <div className="bg-white p-6 rounded-lg shadow-xl flex items-center gap-4">
                        <FiLoader className="animate-spin text-indigo-600" size={24} />
                        <span className="text-gray-700 font-medium">Loading section data...</span>
                    </div>
                </div>
            ) : (
                <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="w-full h-full bg-[#F5F7FA] flex flex-col"
                >
                {/* Header */}
                <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0 shadow-sm z-10">
                    <div className="flex items-center gap-4">
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500">
                            <FiX size={20} />
                        </button>
                        <div className="flex gap-4">
                            <button className="px-4 py-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors bg-gray-50 rounded-lg flex items-center gap-2">
                                <FiLayout size={14} /> All Directories
                            </button>
                            <div className="px-4 py-2 text-sm font-semibold text-gray-900 bg-gray-100 rounded-lg">
                                Untitled directory
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button onClick={handleSave} className="px-6 py-2 bg-indigo-600 text-white text-sm font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
                            Update Section
                        </button>
                    </div>
                </div>

                {/* Top Navigation Bar */}
                <div className="bg-white border-b border-gray-100 px-8 py-3 flex gap-8 justify-center items-center shadow-sm z-10">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-500 cursor-pointer hover:text-gray-900 transition-colors">
                        <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center"><FiLayout size={12} /></div> General
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold text-indigo-600 border-b-2 border-indigo-600 pb-3 -mb-3 cursor-pointer">
                        <div className="w-6 h-6 bg-blue-100 text-indigo-600 rounded flex items-center justify-center"><FiCheckSquare size={12} /></div> Add Listing Form
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-500 cursor-pointer hover:text-gray-900 transition-colors">
                        <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center"><FiLayout size={12} /></div> Single Page Layout
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-500 cursor-pointer hover:text-gray-900 transition-colors">
                        <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center"><FiGrid size={12} /></div> All Listings Layout
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-500 cursor-pointer hover:text-gray-900 transition-colors">
                        <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center"><FiSettings size={12} /></div> Search Form
                    </div>
                </div>

                {/* Title Bar */}
                <div className="bg-white px-6 py-6 flex items-center justify-between shadow-sm z-0 relative">
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold text-indigo-600">Add Listing Form</h1>
                        <button className="px-3 py-1 bg-blue-50 text-indigo-600 text-xs font-bold rounded-full flex items-center gap-1">
                            <FiPlay size={10} /> Watch Tutorial
                        </button>
                    </div>
                    <button className="px-4 py-2 border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors">
                        <FiMonitor size={14} /> Preview
                    </button>
                </div>

                {/* Workspace */}
                <div className="flex-1 flex overflow-hidden w-full bg-white">

                    {/* Canvas (Left side now) */}
                    <div
                        className="flex-1 overflow-y-auto relative p-0 flex justify-center custom-scrollbar bg-white"
                    >
                        {/* The white paper */}
                        <div className="w-full bg-white border-r border-gray-200 flex flex-col h-full">

                            <div className="space-y-4 flex-1 pb-12">
                                {layout.map((sec, secIdx) => (
                                    <div
                                        key={sec.id}
                                        draggable
                                        onDragStart={(e) => handleDragStartSection(e, secIdx)}
                                        onDragOver={handleDragOver}
                                        onDrop={(e) => handleDropSection(e, secIdx)}
                                        className="w-full relative group/section"
                                    >
                                        {/* Section Header */}
                                        <div className="flex items-center gap-3">
                                            <div className="text-gray-300 cursor-grab px-1 hover:text-gray-500">
                                                <FiGrid size={14} />
                                            </div>
                                            <div
                                                className="flex-1 bg-indigo-600 text-white rounded-lg flex items-center justify-between px-5 py-3 cursor-pointer hover:bg-indigo-700 transition-colors shadow-sm"
                                                onClick={() => toggleSection(secIdx)}
                                            >
                                                <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                                                    <input
                                                        type="text"
                                                        value={sec.title}
                                                        onChange={(e) => {
                                                            const newLayout = [...layout];
                                                            newLayout[secIdx].title = e.target.value;
                                                            setLayout(newLayout);
                                                        }}
                                                        className="font-bold text-[15px] bg-transparent outline-none border-b border-transparent focus:border-white w-48 text-white"
                                                    />
                                                    <span className="text-indigo-200 text-xs flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
                                                        <FiSettings size={10} /> Options
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-3 text-indigo-200">
                                                    {sec.isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                                                </div>
                                            </div>
                                            <div className="text-gray-400 hover:text-gray-600 cursor-pointer p-2 rounded relative group/menu">
                                                <FiMoreHorizontal />
                                                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 w-32 hidden group-hover/menu:block z-20">
                                                    <button onClick={() => removeSection(secIdx)} className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2">
                                                        <FiTrash2 size={12} /> Remove section
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Section Body (Droppable) */}
                                        {sec.isExpanded && (
                                            <div
                                                className="px-2 mt-3 pb-2 min-h-[60px]"
                                                onDragOver={handleDragOver}
                                                onDrop={(e) => handleDropField(e, [secIdx, sec.fields.length])}
                                            >
                                                <div className="space-y-0">
                                                    {sec.fields.map((field, fieldIdx) => (
                                                        <React.Fragment key={field.id}>
                                                            <DropZone disabled={dragType === 'canvas_field' && draggedItem && draggedItem.path[0] === secIdx && draggedItem.path.length === 2 && field.type === 'Container'} onDrop={(e) => handleDropField(e, [secIdx, fieldIdx])} />
                                                            <div className="py-1" onDragOver={handleDragOver} onDrop={(e) => handleDropField(e, [secIdx, fieldIdx])}>
                                                                <RecursiveFieldRenderer
                                                                    field={field}
                                                                    path={[secIdx, fieldIdx]}
                                                                    {...{activeFieldPath, setActiveFieldPath, handleDragStartCanvas, handleDropField, handleDragOver, removeField, renderIcon, targetContainerPath, setTargetContainerPath}}
                                                                    isMotherDrag={dragType === 'canvas_field' && draggedItem && draggedItem.path[0] === secIdx && draggedItem.path.length === 2 && field.type === 'Container'}
                                                                />
                                                            </div>
                                                        </React.Fragment>
                                                    ))}

                                                    <DropZone disabled={dragType === 'canvas_field' && draggedItem && draggedItem.path.length === 2 && draggedItem.path[0] === secIdx} onDrop={(e) => handleDropField(e, [secIdx, sec.fields.length])} isContainerEnd={true} />

                                                    {sec.fields.length === 0 && (
                                                        <div 
                                                            className="border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center text-gray-400 text-sm font-medium bg-gray-50/50 hover:bg-white hover:border-indigo-200 transition-colors cursor-pointer group/add"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setActiveFieldPath(null);
                                                                setTargetContainerPath([secIdx]);
                                                            }}
                                                        >
                                                            <span>Drag element here</span>
                                                            <div className="mt-2 w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-sm group-hover/add:bg-indigo-600 group-hover/add:text-white transition-colors">
                                                                <FiPlus size={16} />
                                                            </div>
                                                        </div>
                                                    )}
                                                    {sec.fields.length > 0 && (
                                                        <div 
                                                            className="w-full mt-4 py-2 flex items-center justify-center text-xs font-medium text-indigo-500 cursor-pointer hover:bg-indigo-50 rounded transition-colors"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setActiveFieldPath(null);
                                                                setTargetContainerPath([secIdx]);
                                                            }}
                                                        >
                                                            + Add Element to Section
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {/* Add Section Button */}
                                <div className="px-2 pt-4">
                                    <button
                                        onClick={handleAddSection}
                                        className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-lg flex items-center gap-2 hover:bg-gray-50 hover:border-gray-300 shadow-sm transition-all"
                                    >
                                        <FiPlus /> Add Section
                                    </button>
                                </div>
                            </div>

                            {/* Bottom Footer Actions */}
                            <div className="mt-12 border-t border-gray-100 pt-6 px-2 flex justify-between items-center">
                                <div>
                                    <div className="flex items-center gap-4 mb-1">
                                        <span className="text-sm font-bold text-gray-800">Enable listing preview</span>
                                        <button
                                            onClick={() => setEnablePreview(!enablePreview)}
                                            className={cn(
                                                "w-10 h-5 rounded-full transition-colors relative flex items-center",
                                                enablePreview ? "bg-indigo-600" : "bg-gray-200"
                                            )}
                                        >
                                            <div className={cn(
                                                "w-4 h-4 bg-white rounded-full absolute shadow-sm transition-transform",
                                                enablePreview ? "translate-x-5" : "translate-x-1"
                                            )}></div>
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-500">Help text here.</p>
                                </div>
                            </div>

                            <div className="mt-8">
                                <button
                                    onClick={handleSave}
                                    className="w-full py-4 bg-[#2C3338] text-white font-bold rounded-xl shadow-lg hover:bg-[#1E2327] hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                                >
                                    Save & Preview
                                </button>
                            </div>

                        </div>
                    </div>

                    {/* Right Sidebar - Fields & Properties */}
                    <div className="w-[360px] bg-white border-l border-gray-200 flex flex-col shadow-sm shrink-0 relative z-10">
                        {activeFieldPath && getFieldAtPath(layout, activeFieldPath) ? (
                            <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                                <div className="flex items-center gap-4 mb-8">
                                    <button onClick={() => setActiveFieldPath(null)} className="w-10 h-10 flex items-center justify-center bg-gray-50 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors">
                                        <FiChevronDown className="rotate-90" size={20} />
                                    </button>
                                    <h3 className="text-xl font-bold text-gray-900">Field Settings</h3>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Field Label</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 outline-none transition-all"
                                            value={getFieldAtPath(layout, activeFieldPath)?.label || ''}
                                            onChange={(e) => updateActiveField({ label: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Content / Placeholder Text</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 outline-none transition-all"
                                            value={getFieldAtPath(layout, activeFieldPath)?.placeholder || ''}
                                            onChange={(e) => updateActiveField({ placeholder: e.target.value })}
                                            placeholder="Enter placeholder text"
                                        />
                                    </div>

                                    <div className="pt-6 border-t border-gray-100 space-y-5">
                                        <h4 className="text-sm font-bold text-gray-900">Style Settings</h4>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 mb-2">Text Color</label>
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="color"
                                                    className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                                                    value={getFieldAtPath(layout, activeFieldPath)?.textColor || '#000000'}
                                                    onChange={(e) => updateActiveField({ textColor: e.target.value })}
                                                />
                                                <input
                                                    type="text"
                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-indigo-600 uppercase"
                                                    value={getFieldAtPath(layout, activeFieldPath)?.textColor || '#000000'}
                                                    onChange={(e) => updateActiveField({ textColor: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 mb-2">Font Family</label>
                                            <select
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 outline-none bg-white"
                                                value={getFieldAtPath(layout, activeFieldPath)?.fontFamily || 'sans-serif'}
                                                onChange={(e) => updateActiveField({ fontFamily: e.target.value })}
                                            >
                                                <option value="sans-serif">System Sans</option>
                                                <option value="serif">System Serif</option>
                                                <option value="mono">Monospace</option>
                                                <option value="Inter">Inter</option>
                                                <option value="Roboto">Roboto</option>
                                                <option value="Playfair Display">Playfair Display</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-gray-100 flex flex-wrap gap-6">
                                        <label className="flex items-center gap-3 text-sm font-semibold text-gray-700 cursor-pointer">
                                            <div className="relative flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="peer sr-only"
                                                    checked={getFieldAtPath(layout, activeFieldPath)?.required || false}
                                                    onChange={(e) => updateActiveField({ required: e.target.checked })}
                                                />
                                                <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                                            </div>
                                            Required Field
                                        </label>

                                        <label className="flex items-center gap-3 text-sm font-semibold text-gray-700 cursor-pointer">
                                            <div className="relative flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="peer sr-only"
                                                    checked={getFieldAtPath(layout, activeFieldPath)?.bottomUnderline || false}
                                                    onChange={(e) => updateActiveField({ bottomUnderline: e.target.checked })}
                                                />
                                                <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                                            </div>
                                            Bottom Underline
                                        </label>
                                    </div>

                                    {getFieldAtPath(layout, activeFieldPath)?.type === 'Image' && (
                                        <div className="pt-6 border-t border-gray-100 space-y-5">
                                            <h4 className="text-sm font-bold text-gray-900">Image Settings</h4>
                                            
                                            <div>
                                                <label className="block text-sm font-medium text-gray-600 mb-2">Upload Image</label>
                                                <div className="flex flex-col gap-3">
                                                    {getFieldAtPath(layout, activeFieldPath)?.imageUrl && (
                                                        <div className="w-full h-32 rounded-lg border border-gray-200 overflow-hidden shrink-0 bg-gray-50 flex items-center justify-center">
                                                            <img src={getFieldAtPath(layout, activeFieldPath)?.imageUrl} alt="Preview" className="max-w-full max-h-full object-contain" />
                                                        </div>
                                                    )}
                                                    <input 
                                                        type="file" 
                                                        accept="image/*"
                                                        onChange={handleImageUpload}
                                                        className="w-full px-2 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 outline-none transition-all bg-white file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-600 mb-2">Height</label>
                                                    <input 
                                                        type="text" 
                                                        value={getFieldAtPath(layout, activeFieldPath)?.imageHeight || ''}
                                                        onChange={(e) => updateActiveField({ imageHeight: e.target.value })}
                                                        placeholder="e.g. 200px or 100%"
                                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 outline-none transition-all bg-white"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-600 mb-2">Width</label>
                                                    <input 
                                                        type="text" 
                                                        value={getFieldAtPath(layout, activeFieldPath)?.imageWidth || ''}
                                                        onChange={(e) => updateActiveField({ imageWidth: e.target.value })}
                                                        placeholder="e.g. 100%"
                                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 outline-none transition-all bg-white"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-600 mb-2">Object Fit</label>
                                                <select
                                                    value={getFieldAtPath(layout, activeFieldPath)?.imageFit || 'cover'}
                                                    onChange={(e) => updateActiveField({ imageFit: e.target.value })}
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 outline-none transition-all bg-white mb-4"
                                                >
                                                    <option value="cover">Cover (Fills area)</option>
                                                    <option value="contain">Contain (Shows full image)</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-600 mb-2">Box Shadow</label>
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="color"
                                                        className="w-8 h-8 rounded cursor-pointer border-0 p-0 shrink-0"
                                                        value={getFieldAtPath(layout, activeFieldPath)?.imageBoxShadowColor || '#000000'}
                                                        onChange={(e) => updateActiveField({ imageBoxShadowColor: e.target.value })}
                                                    />
                                                    <input 
                                                        type="text" 
                                                        value={getFieldAtPath(layout, activeFieldPath)?.imageBoxShadow || ''}
                                                        onChange={(e) => updateActiveField({ imageBoxShadow: e.target.value })}
                                                        placeholder="e.g. 0 4px 6px"
                                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 outline-none transition-all bg-white"
                                                    />
                                                </div>
                                            </div>

                                            <div className="pt-4 border-t border-gray-100 space-y-4">
                                                <h5 className="text-xs font-bold text-gray-700">Overlay Options</h5>
                                                <div>
                                                    <label className="flex items-center gap-3 text-sm font-medium text-gray-600 cursor-pointer">
                                                        <div className="relative flex items-center">
                                                            <input
                                                                type="checkbox"
                                                                className="peer sr-only"
                                                                checked={getFieldAtPath(layout, activeFieldPath)?.enableOverlay || false}
                                                                onChange={(e) => updateActiveField({ enableOverlay: e.target.checked })}
                                                            />
                                                            <div className="w-8 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-indigo-600"></div>
                                                        </div>
                                                        Enable Overlay Image / Color
                                                    </label>
                                                </div>
                                                
                                                {getFieldAtPath(layout, activeFieldPath)?.enableOverlay && (
                                                    <div className="space-y-4">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-600 mb-2">Overlay Text</label>
                                                            <input 
                                                                type="text" 
                                                                value={getFieldAtPath(layout, activeFieldPath)?.overlayText || ''}
                                                                onChange={(e) => updateActiveField({ overlayText: e.target.value })}
                                                                placeholder="Text to show on overlay"
                                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 outline-none transition-all bg-white"
                                                            />
                                                        </div>

                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-600 mb-2">Text Size (px)</label>
                                                                <input
                                                                    type="number"
                                                                    value={getFieldAtPath(layout, activeFieldPath)?.overlayTextSize || 18}
                                                                    onChange={(e) => updateActiveField({ overlayTextSize: e.target.value })}
                                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 outline-none transition-all bg-white"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-600 mb-2">Font Family</label>
                                                                <select
                                                                    value={getFieldAtPath(layout, activeFieldPath)?.overlayTextFont || 'sans-serif'}
                                                                    onChange={(e) => updateActiveField({ overlayTextFont: e.target.value })}
                                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 outline-none transition-all bg-white"
                                                                >
                                                                    <option value="sans-serif">System Sans</option>
                                                                    <option value="serif">System Serif</option>
                                                                    <option value="mono">Monospace</option>
                                                                    <option value="Inter">Inter</option>
                                                                    <option value="Roboto">Roboto</option>
                                                                    <option value="Playfair Display">Playfair Display</option>
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-600 mb-2">Text Color</label>
                                                            <div className="flex items-center gap-3">
                                                                <input
                                                                    type="color"
                                                                    className="w-8 h-8 rounded cursor-pointer border-0 p-0 shrink-0"
                                                                    value={getFieldAtPath(layout, activeFieldPath)?.overlayTextColor || '#ffffff'}
                                                                    onChange={(e) => updateActiveField({ overlayTextColor: e.target.value })}
                                                                />
                                                                <input 
                                                                    type="text" 
                                                                    value={getFieldAtPath(layout, activeFieldPath)?.overlayTextColor || '#ffffff'}
                                                                    onChange={(e) => updateActiveField({ overlayTextColor: e.target.value })}
                                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 outline-none transition-all bg-white uppercase"
                                                                />
                                                            </div>
                                                        </div>
                                                        
                                                        <div>
                                                            <label className="flex items-center gap-3 text-sm font-medium text-gray-600 cursor-pointer">
                                                                <div className="relative flex items-center">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="peer sr-only"
                                                                        checked={getFieldAtPath(layout, activeFieldPath)?.enableOverlayButton || false}
                                                                        onChange={(e) => updateActiveField({ enableOverlayButton: e.target.checked })}
                                                                    />
                                                                    <div className="w-8 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-indigo-600"></div>
                                                                </div>
                                                                Enable Overlay Button
                                                            </label>
                                                        </div>

                                                        {getFieldAtPath(layout, activeFieldPath)?.enableOverlayButton && (
                                                            <div className="space-y-4 pl-4 border-l-2 border-gray-100">
                                                                <div>
                                                                    <label className="block text-sm font-medium text-gray-600 mb-2">Button Text</label>
                                                                    <input 
                                                                        type="text" 
                                                                        value={getFieldAtPath(layout, activeFieldPath)?.overlayButtonText || ''}
                                                                        onChange={(e) => updateActiveField({ overlayButtonText: e.target.value })}
                                                                        placeholder="Click Here"
                                                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 outline-none transition-all bg-white"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="block text-sm font-medium text-gray-600 mb-2">Button Link</label>
                                                                    <input 
                                                                        type="text" 
                                                                        value={getFieldAtPath(layout, activeFieldPath)?.overlayButtonLink || ''}
                                                                        onChange={(e) => updateActiveField({ overlayButtonLink: e.target.value })}
                                                                        placeholder="https:// or /path"
                                                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 outline-none transition-all bg-white"
                                                                    />
                                                                </div>
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <div>
                                                                        <label className="block text-sm font-medium text-gray-600 mb-2">Style</label>
                                                                        <select
                                                                            value={getFieldAtPath(layout, activeFieldPath)?.overlayButtonStyle || 'solid'}
                                                                            onChange={(e) => updateActiveField({ overlayButtonStyle: e.target.value })}
                                                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 outline-none transition-all bg-white"
                                                                        >
                                                                            <option value="solid">Solid</option>
                                                                            <option value="outline">Outline</option>
                                                                        </select>
                                                                    </div>
                                                                    <div>
                                                                        <label className="block text-sm font-medium text-gray-600 mb-2">Text Color</label>
                                                                        <div className="flex items-center gap-3 h-10">
                                                                            <input
                                                                                type="color"
                                                                                className="w-8 h-8 rounded cursor-pointer border-0 p-0 shrink-0"
                                                                                value={getFieldAtPath(layout, activeFieldPath)?.overlayButtonTextColor || (getFieldAtPath(layout, activeFieldPath)?.overlayButtonStyle === 'outline' ? '#ffffff' : '#000000')}
                                                                                onChange={(e) => updateActiveField({ overlayButtonTextColor: e.target.value })}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <label className="block text-sm font-medium text-gray-600 mb-2">Border Radius</label>
                                                                    <select
                                                                        value={getFieldAtPath(layout, activeFieldPath)?.overlayButtonBorderRadius || 'rounded'}
                                                                        onChange={(e) => updateActiveField({ overlayButtonBorderRadius: e.target.value })}
                                                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 outline-none transition-all bg-white"
                                                                    >
                                                                        <option value="none">None</option>
                                                                        <option value="rounded">Rounded</option>
                                                                        <option value="pill">Pill</option>
                                                                    </select>
                                                                </div>
                                                                <div>
                                                                    <label className="block text-sm font-medium text-gray-600 mb-2">Border Width (px)</label>
                                                                    <div className="grid grid-cols-4 gap-2">
                                                                        <input 
                                                                            type="number" 
                                                                            value={getFieldAtPath(layout, activeFieldPath)?.overlayButtonBorderTop ?? ''}
                                                                            onChange={(e) => updateActiveField({ overlayButtonBorderTop: e.target.value })}
                                                                            placeholder="T"
                                                                            className="w-full px-2 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 outline-none transition-all bg-white text-center"
                                                                            title="Top"
                                                                        />
                                                                        <input 
                                                                            type="number" 
                                                                            value={getFieldAtPath(layout, activeFieldPath)?.overlayButtonBorderRight ?? ''}
                                                                            onChange={(e) => updateActiveField({ overlayButtonBorderRight: e.target.value })}
                                                                            placeholder="R"
                                                                            className="w-full px-2 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 outline-none transition-all bg-white text-center"
                                                                            title="Right"
                                                                        />
                                                                        <input 
                                                                            type="number" 
                                                                            value={getFieldAtPath(layout, activeFieldPath)?.overlayButtonBorderBottom ?? ''}
                                                                            onChange={(e) => updateActiveField({ overlayButtonBorderBottom: e.target.value })}
                                                                            placeholder="B"
                                                                            className="w-full px-2 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 outline-none transition-all bg-white text-center"
                                                                            title="Bottom"
                                                                        />
                                                                        <input 
                                                                            type="number" 
                                                                            value={getFieldAtPath(layout, activeFieldPath)?.overlayButtonBorderLeft ?? ''}
                                                                            onChange={(e) => updateActiveField({ overlayButtonBorderLeft: e.target.value })}
                                                                            placeholder="L"
                                                                            className="w-full px-2 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 outline-none transition-all bg-white text-center"
                                                                            title="Left"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <label className="block text-sm font-medium text-gray-600 mb-2">Margin (px)</label>
                                                                    <div className="grid grid-cols-4 gap-2">
                                                                        <input 
                                                                            type="number" 
                                                                            value={getFieldAtPath(layout, activeFieldPath)?.overlayButtonMarginTop ?? ''}
                                                                            onChange={(e) => updateActiveField({ overlayButtonMarginTop: e.target.value })}
                                                                            placeholder="T"
                                                                            className="w-full px-2 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 outline-none transition-all bg-white text-center"
                                                                            title="Top"
                                                                        />
                                                                        <input 
                                                                            type="number" 
                                                                            value={getFieldAtPath(layout, activeFieldPath)?.overlayButtonMarginRight ?? ''}
                                                                            onChange={(e) => updateActiveField({ overlayButtonMarginRight: e.target.value })}
                                                                            placeholder="R"
                                                                            className="w-full px-2 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 outline-none transition-all bg-white text-center"
                                                                            title="Right"
                                                                        />
                                                                        <input 
                                                                            type="number" 
                                                                            value={getFieldAtPath(layout, activeFieldPath)?.overlayButtonMarginBottom ?? ''}
                                                                            onChange={(e) => updateActiveField({ overlayButtonMarginBottom: e.target.value })}
                                                                            placeholder="B"
                                                                            className="w-full px-2 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 outline-none transition-all bg-white text-center"
                                                                            title="Bottom"
                                                                        />
                                                                        <input 
                                                                            type="number" 
                                                                            value={getFieldAtPath(layout, activeFieldPath)?.overlayButtonMarginLeft ?? ''}
                                                                            onChange={(e) => updateActiveField({ overlayButtonMarginLeft: e.target.value })}
                                                                            placeholder="L"
                                                                            className="w-full px-2 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 outline-none transition-all bg-white text-center"
                                                                            title="Left"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {getFieldAtPath(layout, activeFieldPath)?.type === 'Grid' && (
                                        <div className="pt-6 border-t border-gray-100 space-y-5">
                                            <h4 className="text-sm font-bold text-gray-900">Grid Layout</h4>
                                            
                                            <div>
                                                <label className="block text-sm font-medium text-gray-600 mb-2">Columns</label>
                                                <input 
                                                    type="number" 
                                                    min="1" 
                                                    value={getFieldAtPath(layout, activeFieldPath)?.columns || 3}
                                                    onChange={(e) => updateActiveField({ columns: Math.max(1, parseInt(e.target.value) || 1) })}
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 outline-none transition-all bg-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-600 mb-2">Rows</label>
                                                <input 
                                                    type="number" 
                                                    min="1" 
                                                    value={getFieldAtPath(layout, activeFieldPath)?.rows || 2}
                                                    onChange={(e) => updateActiveField({ rows: Math.max(1, parseInt(e.target.value) || 1) })}
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 outline-none transition-all bg-white"
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-600 mb-2">Column Gap (px)</label>
                                                    <input 
                                                        type="number" 
                                                        value={getFieldAtPath(layout, activeFieldPath)?.columnGap !== undefined ? getFieldAtPath(layout, activeFieldPath)?.columnGap : 20}
                                                        onChange={(e) => updateActiveField({ columnGap: parseInt(e.target.value) || 0 })}
                                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 outline-none transition-all bg-white"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-600 mb-2">Row Gap (px)</label>
                                                    <input 
                                                        type="number" 
                                                        value={getFieldAtPath(layout, activeFieldPath)?.rowGap !== undefined ? getFieldAtPath(layout, activeFieldPath)?.rowGap : 20}
                                                        onChange={(e) => updateActiveField({ rowGap: parseInt(e.target.value) || 0 })}
                                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 outline-none transition-all bg-white"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-600 mb-2">Align Items</label>
                                                <select
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 outline-none bg-white"
                                                    value={getFieldAtPath(layout, activeFieldPath)?.gridAlignItems || 'stretch'}
                                                    onChange={(e) => updateActiveField({ gridAlignItems: e.target.value })}
                                                >
                                                    <option value="start">Start</option>
                                                    <option value="center">Center</option>
                                                    <option value="end">End</option>
                                                    <option value="stretch">Stretch</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-600 mb-2">Justify Items</label>
                                                <select
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 outline-none bg-white"
                                                    value={getFieldAtPath(layout, activeFieldPath)?.justifyItems || 'stretch'}
                                                    onChange={(e) => updateActiveField({ justifyItems: e.target.value })}
                                                >
                                                    <option value="start">Start</option>
                                                    <option value="center">Center</option>
                                                    <option value="end">End</option>
                                                    <option value="stretch">Stretch</option>
                                                </select>
                                            </div>
                                        </div>
                                    )}

                                    {getFieldAtPath(layout, activeFieldPath)?.type === 'Flex' && (
                                        <div className="pt-6 border-t border-gray-100 space-y-5">
                                            <h4 className="text-sm font-bold text-gray-900">Flex Layout</h4>
                                            
                                            <div>
                                                <label className="block text-sm font-medium text-gray-600 mb-2">Number of Placeholders</label>
                                                <input 
                                                    type="number" 
                                                    min="1" 
                                                    value={getFieldAtPath(layout, activeFieldPath)?.columns || 3}
                                                    onChange={(e) => updateActiveField({ columns: Math.max(1, parseInt(e.target.value) || 1) })}
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 outline-none transition-all bg-white"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-600 mb-2">Content Width</label>
                                                <select
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 outline-none bg-white"
                                                    value={getFieldAtPath(layout, activeFieldPath)?.contentWidth || 'boxed'}
                                                    onChange={(e) => updateActiveField({ contentWidth: e.target.value })}
                                                >
                                                    <option value="boxed">Boxed</option>
                                                    <option value="full">Full Width</option>
                                                </select>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-600 mb-2">Width (px)</label>
                                                    <input 
                                                        type="number" 
                                                        value={getFieldAtPath(layout, activeFieldPath)?.width || 1000}
                                                        onChange={(e) => updateActiveField({ width: parseInt(e.target.value) || 1000 })}
                                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 outline-none transition-all bg-white"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-600 mb-2">Min Height (px)</label>
                                                    <input 
                                                        type="number" 
                                                        value={getFieldAtPath(layout, activeFieldPath)?.minHeight || 300}
                                                        onChange={(e) => updateActiveField({ minHeight: parseInt(e.target.value) || 300 })}
                                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 outline-none transition-all bg-white"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-600 mb-2">Direction</label>
                                                <select
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 outline-none bg-white"
                                                    value={getFieldAtPath(layout, activeFieldPath)?.flexDirection || 'row'}
                                                    onChange={(e) => updateActiveField({ flexDirection: e.target.value })}
                                                >
                                                    <option value="row">Row (→)</option>
                                                    <option value="column">Column (↓)</option>
                                                    <option value="row-reverse">Row Reverse (←)</option>
                                                    <option value="column-reverse">Column Reverse (↑)</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-600 mb-2">Justify Content</label>
                                                <select
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 outline-none bg-white"
                                                    value={getFieldAtPath(layout, activeFieldPath)?.justifyContent || 'flex-start'}
                                                    onChange={(e) => updateActiveField({ justifyContent: e.target.value })}
                                                >
                                                    <option value="flex-start">Start</option>
                                                    <option value="center">Center</option>
                                                    <option value="flex-end">End</option>
                                                    <option value="space-between">Space Between</option>
                                                    <option value="space-around">Space Around</option>
                                                    <option value="space-evenly">Space Evenly</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-600 mb-2">Align Items</label>
                                                <select
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 outline-none bg-white"
                                                    value={getFieldAtPath(layout, activeFieldPath)?.alignItems || 'stretch'}
                                                    onChange={(e) => updateActiveField({ alignItems: e.target.value })}
                                                >
                                                    <option value="flex-start">Start</option>
                                                    <option value="center">Center</option>
                                                    <option value="flex-end">End</option>
                                                    <option value="stretch">Stretch</option>
                                                </select>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-600 mb-2">Gap (px)</label>
                                                    <input 
                                                        type="number" 
                                                        value={getFieldAtPath(layout, activeFieldPath)?.gap !== undefined ? getFieldAtPath(layout, activeFieldPath)?.gap : 20}
                                                        onChange={(e) => updateActiveField({ gap: parseInt(e.target.value) || 0 })}
                                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 outline-none transition-all bg-white"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-600 mb-2">Wrap</label>
                                                    <select
                                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 outline-none bg-white"
                                                        value={getFieldAtPath(layout, activeFieldPath)?.flexWrap || 'wrap'}
                                                        onChange={(e) => updateActiveField({ flexWrap: e.target.value })}
                                                    >
                                                        <option value="nowrap">No Wrap</option>
                                                        <option value="wrap">Wrap</option>
                                                        <option value="wrap-reverse">Wrap Reverse</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="pt-6 border-t border-gray-100">
                                        <button
                                            onClick={() => {
                                                removeField(activeFieldPath);
                                            }}
                                            className="w-full py-3 bg-red-50 text-red-600 text-sm font-bold rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <FiTrash2 size={18} /> Delete Field
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col h-full">
                                <div className="flex border-b border-gray-200">
                                    <button className="flex-1 py-4 text-sm font-bold text-indigo-600 border-b-2 border-indigo-600">Elements</button>
                                    <button className="flex-1 py-4 text-sm font-semibold text-gray-400 hover:text-gray-600 transition-colors">Content Library</button>
                                </div>

                                <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                                    {/* Layout Section */}
                                    <div className="mb-8">
                                        <button
                                            onClick={() => setShowLayout(!showLayout)}
                                            className="w-full flex justify-between items-center mb-5 text-[15px] font-bold text-gray-900"
                                        >
                                            Layout Section
                                            {showLayout ? <FiChevronUp className="text-gray-400" /> : <FiChevronDown className="text-gray-400" />}
                                        </button>

                                        <AnimatePresence>
                                            {showLayout && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="grid grid-cols-2 gap-3 overflow-hidden"
                                                >
                                                    {LAYOUT_FIELDS.map(field => (
                                                        <div
                                                            key={field.id}
                                                            draggable
                                                            onClick={() => handleSidebarItemClick(field)}
                                                            onDragStart={(e) => handleDragStartSidebar(e, field)}
                                                            className="border border-gray-200 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-indigo-600 hover:shadow-md transition-all bg-white group"
                                                        >
                                                            <div className="text-[#4F46E5] group-hover:scale-110 transition-transform">
                                                                <field.icon size={22} strokeWidth={1.5} />
                                                            </div>
                                                            <span className="text-[12px] font-bold text-gray-700 text-center">{field.label}</span>
                                                        </div>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    <div className="h-px bg-gray-100 my-8"></div>

                                    {/* Content Fields */}
                                    <div className="mb-8">
                                        <button
                                            onClick={() => setShowPresets(!showPresets)}
                                            className="w-full flex justify-between items-center mb-5 text-[15px] font-bold text-gray-900"
                                        >
                                            Content Fields
                                            {showPresets ? <FiChevronUp className="text-gray-400" /> : <FiChevronDown className="text-gray-400" />}
                                        </button>

                                        <AnimatePresence>
                                            {showPresets && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="grid grid-cols-2 gap-3 overflow-hidden"
                                                >
                                                    {PRESET_FIELDS.map(field => (
                                                        <div
                                                            key={field.id}
                                                            draggable
                                                            onClick={() => handleSidebarItemClick(field)}
                                                            onDragStart={(e) => handleDragStartSidebar(e, field)}
                                                            className="border border-gray-200 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-indigo-600 hover:shadow-md transition-all bg-white group"
                                                        >
                                                            <div className="text-[#4F46E5] group-hover:scale-110 transition-transform">
                                                                <field.icon size={22} strokeWidth={1.5} />
                                                            </div>
                                                            <span className="text-[12px] font-bold text-gray-700 text-center">{field.label}</span>
                                                        </div>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    <div className="h-px bg-gray-100 my-8"></div>

                                    {/* Dynamic Fields */}
                                    <div className="mb-8">
                                        <button
                                            onClick={() => setShowCustom(!showCustom)}
                                            className="w-full flex justify-between items-center mb-5 text-[15px] font-bold text-gray-900"
                                        >
                                            Dynamic Fields
                                            {showCustom ? <FiChevronUp className="text-gray-400" /> : <FiChevronDown className="text-gray-400" />}
                                        </button>

                                        <AnimatePresence>
                                            {showCustom && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="grid grid-cols-2 gap-3 overflow-hidden"
                                                >
                                                    {CUSTOM_FIELDS.map(field => (
                                                        <div
                                                            key={field.id}
                                                            draggable
                                                            onClick={() => handleSidebarItemClick(field)}
                                                            onDragStart={(e) => handleDragStartSidebar(e, field)}
                                                            className="border border-gray-200 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-indigo-600 hover:shadow-md transition-all bg-white group"
                                                        >
                                                            <div className="text-[#4F46E5] group-hover:scale-110 transition-transform">
                                                                <field.icon size={22} strokeWidth={1.5} />
                                                            </div>
                                                            <span className="text-[12px] font-bold text-gray-700 text-center">{field.label}</span>
                                                        </div>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
            )}
        </div>
    );
}
