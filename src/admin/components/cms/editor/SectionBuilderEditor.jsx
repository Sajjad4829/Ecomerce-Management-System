import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiX, FiMonitor, FiArrowLeft, FiEye, FiSave, FiLayers, FiFileText, FiTag, FiTablet, FiSmartphone, FiPlus, FiChevronDown, FiChevronUp,
    FiType, FiAlignLeft, FiDollarSign, FiMap, FiMapPin, FiMail,
    FiPhone, FiGlobe, FiImage, FiGrid, FiLayout, FiClock, FiCalendar, FiMessageSquare, FiHelpCircle,
    FiCheckSquare, FiCircle, FiUpload, FiMoreHorizontal, FiTrash2, FiSettings, FiPlay, FiCopy,
    FiBold, FiItalic, FiUnderline, FiLink, FiList, FiCode, FiLoader
} from 'react-icons/fi';
import { cn } from '../../../../utils/cn';
import { useToast } from '../../../../components/ui/Toast/ToastContext';

const SIDEBAR_ELEMENTS = [
    {
        title: 'Layout Elements',
        subtitle: 'Structure your section with layout components',
        isOpen: true,
        items: [
            { id: 'l_grid', type: 'Grid', icon: { name: 'FiGrid' }, label: 'Grid Layout', description: 'Multi-column layout' },
            { id: 'l_flex', type: 'Flex', icon: { name: 'FiLayout' }, label: 'Flex Layout', description: 'Flexible arrangement' },
            { id: 'l_container', type: 'Container', icon: { name: 'FiLayout' }, label: 'Container', description: 'Content container' }
        ]
    },
    {
        title: 'Content Elements',
        subtitle: 'Add text and interactive content',
        isOpen: true,
        items: [
            { id: 'c_text', type: 'Text', icon: { name: 'FiType' }, label: 'Text Block', description: 'Add headings & text' },
            { id: 'c_image', type: 'Image', icon: { name: 'FiImage' }, label: 'Image', description: 'Add images' },
            { id: 'c_button', type: 'Button', icon: { name: 'FiCode' }, label: 'Button', description: 'Add action button' }
        ]
    },
    {
        title: 'Media Elements',
        subtitle: 'Showcase your products and media',
        isOpen: true,
        items: [
            { id: 'm_grid', type: 'ProductGrid', icon: { name: 'FiGrid' }, label: 'Product Grid', description: 'Display products' },
            { id: 'm_slider', type: 'Slider', icon: { name: 'FiLayout' }, label: 'Slider', description: 'Image slider' },
            { id: 'm_video', type: 'Video', icon: { name: 'FiPlay' }, label: 'Video', description: 'Embed video' }
        ]
    },
    {
        title: 'Advanced Elements',
        subtitle: 'Extra features for better engagement',
        isOpen: true,
        items: [
            { id: 'a_testimonial', type: 'Testimonial', icon: { name: 'FiMessageSquare' }, label: 'Testimonial', description: 'Customer feedback' },
            { id: 'a_faq', type: 'FAQ', icon: { name: 'FiHelpCircle' }, label: 'FAQ', description: 'Question & answer' },
            { id: 'a_countdown', type: 'Countdown', icon: { name: 'FiClock' }, label: 'Countdown', description: 'Limited offer' }
        ]
    }
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

// --- Container Properties Component ---
const ContainerProperties = ({ field, onChange, device, setDevice }) => {
    const respMode = device === 'tablet' ? 'Tablet' : device === 'mobile' ? 'Mobile' : '';

    const getProp = (key) => field[key + respMode];
    const setProp = (key, val) => onChange({ [key + respMode]: val });

    // Helper to extract value and unit
    const parseDimension = (val, fallbackUnit = 'px') => {
        if (!val) return { number: '', unit: fallbackUnit };
        const match = String(val).match(/^([\d.]+)(px|%|vh|vw|rem|em)?$/);
        if (match) return { number: match[1], unit: match[2] || fallbackUnit };
        return { number: val, unit: fallbackUnit }; // fallback
    };

    const widthData = parseDimension(getProp('width'), getProp('widthUnit') || 'px');
    const heightData = parseDimension(getProp('height'), getProp('heightUnit') || 'px');

    return (
        <div className="space-y-6">
            {/* Responsive Mode Switcher */}
            <div className="flex bg-gray-100 p-1 rounded-lg">
                <button 
                    onClick={() => setDevice('desktop')} 
                    className={`flex-1 py-1.5 text-[12px] font-semibold rounded-md transition-colors ${respMode === '' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Desktop
                </button>
                <button 
                    onClick={() => setDevice('tablet')} 
                    className={`flex-1 py-1.5 text-[12px] font-semibold rounded-md transition-colors ${respMode === 'Tablet' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Tablet
                </button>
                <button 
                    onClick={() => setDevice('mobile')} 
                    className={`flex-1 py-1.5 text-[12px] font-semibold rounded-md transition-colors ${respMode === 'Mobile' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Mobile
                </button>
            </div>

            {/* Dimensions */}
            <div className="space-y-4 pt-2">
                <h4 className="text-[13px] font-bold text-gray-900 uppercase tracking-wider">Dimensions</h4>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Width</label>
                        <div className="flex bg-gray-50 border border-gray-200 rounded-lg overflow-hidden focus-within:border-[#5946ff] focus-within:bg-white transition-all">
                            <input 
                                type="number" 
                                className="w-full px-3 py-2 bg-transparent text-[13px] outline-none" 
                                placeholder="Auto" 
                                value={widthData.number} 
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setProp('width', val ? `${val}${widthData.unit}` : '');
                                }} 
                            />
                            <select 
                                className="bg-gray-100 border-l border-gray-200 px-2 text-[12px] text-gray-600 outline-none cursor-pointer"
                                value={widthData.unit}
                                onChange={(e) => {
                                    const unit = e.target.value;
                                    setProp('widthUnit', unit);
                                    setProp('width', widthData.number ? `${widthData.number}${unit}` : '');
                                }}
                            >
                                <option value="px">px</option>
                                <option value="%">%</option>
                                <option value="vw">vw</option>
                                <option value="vh">vh</option>
                                <option value="rem">rem</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Height</label>
                        <div className="flex bg-gray-50 border border-gray-200 rounded-lg overflow-hidden focus-within:border-[#5946ff] focus-within:bg-white transition-all">
                            <input 
                                type="number" 
                                className="w-full px-3 py-2 bg-transparent text-[13px] outline-none" 
                                placeholder="Auto" 
                                value={heightData.number} 
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setProp('height', val ? `${val}${heightData.unit}` : '');
                                }} 
                            />
                            <select 
                                className="bg-gray-100 border-l border-gray-200 px-2 text-[12px] text-gray-600 outline-none cursor-pointer"
                                value={heightData.unit}
                                onChange={(e) => {
                                    const unit = e.target.value;
                                    setProp('heightUnit', unit);
                                    setProp('height', heightData.number ? `${heightData.number}${unit}` : '');
                                }}
                            >
                                <option value="px">px</option>
                                <option value="%">%</option>
                                <option value="vh">vh</option>
                                <option value="vw">vw</option>
                                <option value="rem">rem</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <label className="text-[13px] font-medium text-gray-700">Full Width</label>
                    <input type="checkbox" className="w-4 h-4 text-[#5946ff] rounded border-gray-300" checked={getProp('fullWidth') || false} onChange={(e) => setProp('fullWidth', e.target.checked)} />
                </div>
                <div className="flex items-center justify-between">
                    <label className="text-[13px] font-medium text-gray-700">Content Width</label>
                    <input type="checkbox" className="w-4 h-4 text-[#5946ff] rounded border-gray-300" checked={getProp('contentWidth') || false} onChange={(e) => setProp('contentWidth', e.target.checked)} />
                </div>
            </div>

            {/* Background & Overlay */}
            <div className="space-y-4 pt-5 border-t border-gray-100">
                <h4 className="text-[13px] font-bold text-gray-900 uppercase tracking-wider">Background</h4>
                <div>
                    <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Background Color</label>
                    <div className="flex items-center gap-2">
                        <input type="color" className="w-8 h-8 rounded cursor-pointer border border-gray-200 p-0.5" value={getProp('backgroundColor') || '#ffffff'} onChange={(e) => setProp('backgroundColor', e.target.value)} />
                        <input type="text" className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-[#5946ff] focus:bg-white" value={getProp('backgroundColor') || '#ffffff'} onChange={(e) => setProp('backgroundColor', e.target.value)} />
                    </div>
                </div>
                <div>
                    <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Background Image URL</label>
                    <input type="text" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-[#5946ff] focus:bg-white" placeholder="https://..." value={getProp('backgroundImage') || ''} onChange={(e) => setProp('backgroundImage', e.target.value)} />
                </div>
                <div>
                    <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Background Size</label>
                    <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-[#5946ff]" value={getProp('backgroundSize') || 'cover'} onChange={(e) => setProp('backgroundSize', e.target.value)}>
                        <option value="cover">Cover</option>
                        <option value="contain">Contain</option>
                        <option value="auto">Auto</option>
                    </select>
                </div>
                <div>
                    <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Image Overlay (Color / Gradient)</label>
                    <input type="text" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-[#5946ff] focus:bg-white" placeholder="e.g. rgba(0,0,0,0.5)" value={getProp('imageOverlay') || ''} onChange={(e) => setProp('imageOverlay', e.target.value)} />
                </div>
            </div>

            {/* Spacing (Padding & Margin) */}
            <div className="space-y-4 pt-5 border-t border-gray-100">
                <h4 className="text-[13px] font-bold text-gray-900 uppercase tracking-wider">Spacing</h4>
                <div>
                    <label className="block text-[12px] font-medium text-gray-600 mb-2">Padding (T / R / B / L)</label>
                    <div className="flex gap-2">
                        <input type="text" className="w-full px-2 py-1.5 bg-gray-50 border border-gray-200 rounded text-xs text-center" placeholder="Top" value={getProp('paddingTop') || ''} onChange={(e) => setProp('paddingTop', e.target.value)} />
                        <input type="text" className="w-full px-2 py-1.5 bg-gray-50 border border-gray-200 rounded text-xs text-center" placeholder="Right" value={getProp('paddingRight') || ''} onChange={(e) => setProp('paddingRight', e.target.value)} />
                        <input type="text" className="w-full px-2 py-1.5 bg-gray-50 border border-gray-200 rounded text-xs text-center" placeholder="Bottom" value={getProp('paddingBottom') || ''} onChange={(e) => setProp('paddingBottom', e.target.value)} />
                        <input type="text" className="w-full px-2 py-1.5 bg-gray-50 border border-gray-200 rounded text-xs text-center" placeholder="Left" value={getProp('paddingLeft') || ''} onChange={(e) => setProp('paddingLeft', e.target.value)} />
                    </div>
                </div>
                <div>
                    <label className="block text-[12px] font-medium text-gray-600 mb-2">Margin (T / R / B / L)</label>
                    <div className="flex gap-2">
                        <input type="text" className="w-full px-2 py-1.5 bg-gray-50 border border-gray-200 rounded text-xs text-center" placeholder="Top" value={getProp('marginTop') || ''} onChange={(e) => setProp('marginTop', e.target.value)} />
                        <input type="text" className="w-full px-2 py-1.5 bg-gray-50 border border-gray-200 rounded text-xs text-center" placeholder="Right" value={getProp('marginRight') || ''} onChange={(e) => setProp('marginRight', e.target.value)} />
                        <input type="text" className="w-full px-2 py-1.5 bg-gray-50 border border-gray-200 rounded text-xs text-center" placeholder="Bottom" value={getProp('marginBottom') || ''} onChange={(e) => setProp('marginBottom', e.target.value)} />
                        <input type="text" className="w-full px-2 py-1.5 bg-gray-50 border border-gray-200 rounded text-xs text-center" placeholder="Left" value={getProp('marginLeft') || ''} onChange={(e) => setProp('marginLeft', e.target.value)} />
                    </div>
                </div>
            </div>

            {/* Borders & Shadows */}
            <div className="space-y-4 pt-5 border-t border-gray-100">
                <h4 className="text-[13px] font-bold text-gray-900 uppercase tracking-wider">Borders & Shadows</h4>
                <div>
                    <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Border (CSS)</label>
                    <input type="text" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-[#5946ff] focus:bg-white" placeholder="e.g. 1px solid #eee" value={getProp('border') || ''} onChange={(e) => setProp('border', e.target.value)} />
                </div>
                <div>
                    <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Border Radius</label>
                    <input type="text" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-[#5946ff] focus:bg-white" placeholder="e.g. 8px, 50%" value={getProp('borderRadius') || ''} onChange={(e) => setProp('borderRadius', e.target.value)} />
                </div>
                <div>
                    <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Box Shadow</label>
                    <input type="text" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-[#5946ff] focus:bg-white" placeholder="e.g. 0 4px 6px rgba(0,0,0,0.1)" value={getProp('boxShadow') || ''} onChange={(e) => setProp('boxShadow', e.target.value)} />
                </div>
            </div>

            {/* Responsive & Visibility */}
            <div className="space-y-4 pt-5 border-t border-gray-100">
                <h4 className="text-[13px] font-bold text-gray-900 uppercase tracking-wider">Responsive Settings</h4>
                <div>
                    <label className="block text-[12px] font-medium text-gray-600 mb-2">Visibility</label>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                            <input type="checkbox" className="rounded text-[#5946ff]" checked={field.visibleDesktop !== false} onChange={(e) => onChange({ visibleDesktop: e.target.checked })} /> Desktop
                        </label>
                        <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                            <input type="checkbox" className="rounded text-[#5946ff]" checked={field.visibleTablet !== false} onChange={(e) => onChange({ visibleTablet: e.target.checked })} /> Tablet
                        </label>
                        <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                            <input type="checkbox" className="rounded text-[#5946ff]" checked={field.visibleMobile !== false} onChange={(e) => onChange({ visibleMobile: e.target.checked })} /> Mobile
                        </label>
                    </div>
                </div>
                <div>
                    <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Custom CSS Class</label>
                    <input type="text" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-[#5946ff] focus:bg-white" placeholder="e.g. my-custom-container" value={field.customClass || ''} onChange={(e) => onChange({ customClass: e.target.value })} />
                </div>
                <div>
                    <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Custom ID</label>
                    <input type="text" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-[#5946ff] focus:bg-white" placeholder="e.g. section-hero" value={field.customId || ''} onChange={(e) => onChange({ customId: e.target.value })} />
                </div>
            </div>
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
        parent = layoutState[path[0]];
    } else {
        parent = getFieldAtPath(layoutState, parentPath);
    }
    if (!parent.fields) parent.fields = [];
    
    // Auto-wrap non-Container items dropped directly into Flex/Grid with a Container
    if (parent && (parent.type === 'Flex' || parent.type === 'Grid') && field.type !== 'Container' && field.type !== 'EmptySpace') {
        field = {
            id: `c_${Date.now()}_wrapper_${Math.random().toString(36).substr(2, 5)}`,
            type: 'Container',
            label: 'Column Container',
            icon: 'FiLayout',
            fields: [field]
        };
    }

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

// --- Grid Properties Component ---
const GridProperties = ({ field, onChange, device, setDevice }) => {
    const respMode = device === 'tablet' ? 'Tablet' : device === 'mobile' ? 'Mobile' : '';
    
    const getProp = (key) => field[key + respMode];
    const setProp = (key, val) => onChange({ [key + respMode]: val });

    const parseDimension = (val, fallbackUnit = 'px') => {
        if (!val) return { number: '', unit: fallbackUnit };
        const match = String(val).match(/^([\d.]+)(px|%|vh|vw|rem|em)?$/);
        if (match) return { number: match[1], unit: match[2] || fallbackUnit };
        return { number: val, unit: fallbackUnit };
    };

    const itemWidthData = parseDimension(getProp('itemWidth'), getProp('itemWidthUnit') || 'px');
    const itemHeightData = parseDimension(getProp('itemHeight'), getProp('itemHeightUnit') || 'px');

    return (
        <div className="space-y-6">
            <div className="flex bg-gray-100 p-1 rounded-lg">
                <button onClick={() => setDevice('desktop')} className={`flex-1 py-1.5 text-[12px] font-semibold rounded-md transition-colors ${respMode === '' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Desktop</button>
                <button onClick={() => setDevice('tablet')} className={`flex-1 py-1.5 text-[12px] font-semibold rounded-md transition-colors ${respMode === 'Tablet' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Tablet</button>
                <button onClick={() => setDevice('mobile')} className={`flex-1 py-1.5 text-[12px] font-semibold rounded-md transition-colors ${respMode === 'Mobile' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Mobile</button>
            </div>

            <div className="space-y-4 pt-2">
                <h4 className="text-[13px] font-bold text-gray-900 uppercase tracking-wider">Container Layout</h4>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Width</label>
                        <div className="flex bg-gray-50 border border-gray-200 rounded-lg overflow-hidden focus-within:border-[#5946ff] transition-all">
                            <input type="number" className="w-full px-3 py-2 bg-transparent text-[13px] outline-none" placeholder="100" value={parseDimension(getProp('width'), getProp('widthUnit') || '%').number} onChange={(e) => {
                                const unit = getProp('widthUnit') || '%';
                                setProp('width', e.target.value ? e.target.value + unit : '');
                            }} />
                            <select className="bg-gray-100 border-l border-gray-200 px-2 text-[12px] outline-none text-gray-600" value={parseDimension(getProp('width'), getProp('widthUnit') || '%').unit} onChange={(e) => {
                                setProp('widthUnit', e.target.value);
                                const num = parseDimension(getProp('width'), '%').number;
                                if (num) setProp('width', num + e.target.value);
                            }}>
                                <option value="px">px</option><option value="%">%</option><option value="vw">vw</option><option value="rem">rem</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Min Height</label>
                        <div className="flex bg-gray-50 border border-gray-200 rounded-lg overflow-hidden focus-within:border-[#5946ff] transition-all">
                            <input type="number" className="w-full px-3 py-2 bg-transparent text-[13px] outline-none" placeholder="Auto" value={parseDimension(getProp('minHeight'), getProp('minHeightUnit') || 'px').number} onChange={(e) => {
                                const unit = getProp('minHeightUnit') || 'px';
                                setProp('minHeight', e.target.value ? e.target.value + unit : '');
                            }} />
                            <select className="bg-gray-100 border-l border-gray-200 px-2 text-[12px] outline-none text-gray-600" value={parseDimension(getProp('minHeight'), getProp('minHeightUnit') || 'px').unit} onChange={(e) => {
                                setProp('minHeightUnit', e.target.value);
                                const num = parseDimension(getProp('minHeight'), 'px').number;
                                if (num) setProp('minHeight', num + e.target.value);
                            }}>
                                <option value="px">px</option><option value="%">%</option><option value="vh">vh</option><option value="rem">rem</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100">
                <h4 className="text-[13px] font-bold text-gray-900 uppercase tracking-wider">Grid Settings</h4>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Columns</label>
                        <input type="number" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px]" value={getProp('columns') || ''} onChange={(e) => setProp('columns', e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Rows</label>
                        <input type="number" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px]" value={getProp('rows') || ''} onChange={(e) => setProp('rows', e.target.value)} />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    <div>
                        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Gap (px)</label>
                        <input type="number" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px]" value={getProp('gap') || ''} onChange={(e) => {
                            setProp('gap', e.target.value);
                            if (e.target.value) {
                                setProp('rowGap', '');
                                setProp('columnGap', '');
                            }
                        }} placeholder="20" />
                    </div>
                    <div>
                        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Row Gap</label>
                        <input type="number" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px]" value={getProp('rowGap') || ''} onChange={(e) => setProp('rowGap', e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Col Gap</label>
                        <input type="number" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px]" value={getProp('columnGap') || ''} onChange={(e) => setProp('columnGap', e.target.value)} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Horiz. Align</label>
                        <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px]" value={getProp('justifyItems') || 'stretch'} onChange={(e) => setProp('justifyItems', e.target.value)}>
                            <option value="stretch">Stretch</option>
                            <option value="start">Start</option>
                            <option value="center">Center</option>
                            <option value="end">End</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Vert. Align</label>
                        <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px]" value={getProp('gridAlignItems') || 'stretch'} onChange={(e) => setProp('gridAlignItems', e.target.value)}>
                            <option value="stretch">Stretch</option>
                            <option value="start">Start</option>
                            <option value="center">Center</option>
                            <option value="end">End</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100">
                <h4 className="text-[13px] font-bold text-gray-900 uppercase tracking-wider">Item Settings</h4>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Item Width</label>
                        <div className="flex bg-gray-50 border border-gray-200 rounded-lg overflow-hidden focus-within:border-[#5946ff] transition-all">
                            <input type="number" className="w-full px-3 py-2 bg-transparent text-[13px] outline-none" placeholder="Auto" value={itemWidthData.number} onChange={(e) => {
                                setProp('itemWidth', e.target.value ? e.target.value + itemWidthData.unit : '');
                            }} />
                            <select className="bg-gray-100 border-l border-gray-200 px-2 text-[12px] outline-none text-gray-600" value={itemWidthData.unit} onChange={(e) => {
                                setProp('itemWidthUnit', e.target.value);
                                if (itemWidthData.number) setProp('itemWidth', itemWidthData.number + e.target.value);
                            }}>
                                <option value="px">px</option><option value="%">%</option><option value="vw">vw</option><option value="rem">rem</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Item Height</label>
                        <div className="flex bg-gray-50 border border-gray-200 rounded-lg overflow-hidden focus-within:border-[#5946ff] transition-all">
                            <input type="number" className="w-full px-3 py-2 bg-transparent text-[13px] outline-none" placeholder="Auto" value={itemHeightData.number} onChange={(e) => {
                                setProp('itemHeight', e.target.value ? e.target.value + itemHeightData.unit : '');
                            }} />
                            <select className="bg-gray-100 border-l border-gray-200 px-2 text-[12px] outline-none text-gray-600" value={itemHeightData.unit} onChange={(e) => {
                                setProp('itemHeightUnit', e.target.value);
                                if (itemHeightData.number) setProp('itemHeight', itemHeightData.number + e.target.value);
                            }}>
                                <option value="px">px</option><option value="%">%</option><option value="vh">vh</option><option value="rem">rem</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div>
                    <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Item Background</label>
                    <div className="flex items-center gap-2">
                        <input type="color" className="w-9 h-9 rounded cursor-pointer border border-gray-200 p-0.5" value={getProp('itemBackground') || '#ffffff'} onChange={(e) => setProp('itemBackground', e.target.value)} />
                        <input type="text" className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px] outline-none" placeholder="e.g. #ffffff or transparent" value={getProp('itemBackground') || ''} onChange={(e) => setProp('itemBackground', e.target.value)} />
                    </div>
                </div>
                <div>
                    <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Item Border</label>
                    <div className="flex gap-2">
                         <input type="text" className="w-1/2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px] outline-none" placeholder="e.g. 1px solid" value={getProp('itemBorder') || ''} onChange={(e) => setProp('itemBorder', e.target.value)} />
                         <div className="flex-1 flex items-center gap-2 border border-gray-200 bg-gray-50 rounded-lg px-2">
                             <input type="color" className="w-6 h-6 rounded cursor-pointer border border-gray-200 p-0.5" value={getProp('itemBorderColor') || '#000000'} onChange={(e) => setProp('itemBorderColor', e.target.value)} />
                             <input type="text" className="w-full bg-transparent text-[12px] outline-none" placeholder="#000000" value={getProp('itemBorderColor') || ''} onChange={(e) => setProp('itemBorderColor', e.target.value)} />
                         </div>
                    </div>
                </div>
                <div>
                    <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Item Border Radius</label>
                    <input type="number" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px]" placeholder="e.g. 8" value={getProp('itemBorderRadius') || ''} onChange={(e) => setProp('itemBorderRadius', e.target.value)} />
                </div>
            </div>
        </div>
    );
};

// --- Flex Properties Component ---
const FlexProperties = ({ field, onChange, device, setDevice }) => {
    const respMode = device === 'tablet' ? 'Tablet' : device === 'mobile' ? 'Mobile' : '';
    
    const getProp = (key) => field[key + respMode];
    const setProp = (key, val) => onChange({ [key + respMode]: val });

    const parseDimension = (val, fallbackUnit = 'px') => {
        if (!val) return { number: '', unit: fallbackUnit };
        const match = String(val).match(/^([\d.-]+)(px|%|vh|vw|rem|em)?$/);
        if (match) return { number: match[1], unit: match[2] || fallbackUnit };
        return { number: val, unit: fallbackUnit };
    };

    const itemWidthData = parseDimension(getProp('itemWidth'), getProp('itemWidthUnit') || 'px');
    const itemHeightData = parseDimension(getProp('itemHeight'), getProp('itemHeightUnit') || 'px');

    return (
        <div className="space-y-6">
            <div className="flex bg-gray-100 p-1 rounded-lg">
                <button onClick={() => setDevice('desktop')} className={`flex-1 py-1.5 text-[12px] font-semibold rounded-md transition-colors ${respMode === '' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Desktop</button>
                <button onClick={() => setDevice('tablet')} className={`flex-1 py-1.5 text-[12px] font-semibold rounded-md transition-colors ${respMode === 'Tablet' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Tablet</button>
                <button onClick={() => setDevice('mobile')} className={`flex-1 py-1.5 text-[12px] font-semibold rounded-md transition-colors ${respMode === 'Mobile' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Mobile</button>
            </div>

            <div className="space-y-4 pt-2">
                <h4 className="text-[13px] font-bold text-gray-900 uppercase tracking-wider">Container Layout</h4>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Width</label>
                        <div className="flex bg-gray-50 border border-gray-200 rounded-lg overflow-hidden focus-within:border-[#5946ff] transition-all">
                            <input type="number" className="w-full px-3 py-2 bg-transparent text-[13px] outline-none" placeholder="100" value={parseDimension(getProp('width'), getProp('widthUnit') || '%').number} onChange={(e) => {
                                const unit = getProp('widthUnit') || '%';
                                setProp('width', e.target.value ? e.target.value + unit : '');
                            }} />
                            <select className="bg-gray-100 border-l border-gray-200 px-2 text-[12px] outline-none text-gray-600" value={parseDimension(getProp('width'), getProp('widthUnit') || '%').unit} onChange={(e) => {
                                setProp('widthUnit', e.target.value);
                                const num = parseDimension(getProp('width'), '%').number;
                                if (num) setProp('width', num + e.target.value);
                            }}>
                                <option value="px">px</option><option value="%">%</option><option value="vw">vw</option><option value="rem">rem</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Min Height</label>
                        <div className="flex bg-gray-50 border border-gray-200 rounded-lg overflow-hidden focus-within:border-[#5946ff] transition-all">
                            <input type="number" className="w-full px-3 py-2 bg-transparent text-[13px] outline-none" placeholder="Auto" value={parseDimension(getProp('minHeight'), getProp('minHeightUnit') || 'px').number} onChange={(e) => {
                                const unit = getProp('minHeightUnit') || 'px';
                                setProp('minHeight', e.target.value ? e.target.value + unit : '');
                            }} />
                            <select className="bg-gray-100 border-l border-gray-200 px-2 text-[12px] outline-none text-gray-600" value={parseDimension(getProp('minHeight'), getProp('minHeightUnit') || 'px').unit} onChange={(e) => {
                                setProp('minHeightUnit', e.target.value);
                                const num = parseDimension(getProp('minHeight'), 'px').number;
                                if (num) setProp('minHeight', num + e.target.value);
                            }}>
                                <option value="px">px</option><option value="%">%</option><option value="vh">vh</option><option value="rem">rem</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100">
                <h4 className="text-[13px] font-bold text-gray-900 uppercase tracking-wider">Flex Settings</h4>
                <div className="mb-3">
                    <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Number of Items</label>
                    <input type="number" min="1" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px]" value={getProp('columns') || ''} onChange={(e) => setProp('columns', e.target.value)} placeholder="3" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Direction</label>
                        <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px]" value={getProp('flexDirection') || 'row'} onChange={(e) => setProp('flexDirection', e.target.value)}>
                            <option value="row">Row</option>
                            <option value="column">Column</option>
                            <option value="row-reverse">Row Reverse</option>
                            <option value="column-reverse">Column Reverse</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Wrap</label>
                        <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px]" value={getProp('flexWrap') || 'wrap'} onChange={(e) => setProp('flexWrap', e.target.value)}>
                            <option value="nowrap">No Wrap</option>
                            <option value="wrap">Wrap</option>
                            <option value="wrap-reverse">Wrap Reverse</option>
                        </select>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Justify Content</label>
                        <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px]" value={getProp('justifyContent') || 'flex-start'} onChange={(e) => setProp('justifyContent', e.target.value)}>
                            <option value="flex-start">Start</option>
                            <option value="center">Center</option>
                            <option value="flex-end">End</option>
                            <option value="space-between">Space Between</option>
                            <option value="space-around">Space Around</option>
                            <option value="space-evenly">Space Evenly</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Align Items</label>
                        <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px]" value={getProp('alignItems') || 'stretch'} onChange={(e) => setProp('alignItems', e.target.value)}>
                            <option value="flex-start">Start</option>
                            <option value="center">Center</option>
                            <option value="flex-end">End</option>
                            <option value="stretch">Stretch</option>
                        </select>
                    </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                    <div>
                        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Gap (px)</label>
                        <input type="number" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px]" value={getProp('gap') || ''} onChange={(e) => { 
                            setProp('gap', e.target.value);
                            if (e.target.value) {
                                setProp('rowGap', '');
                                setProp('columnGap', '');
                            }
                        }} placeholder="20" />
                    </div>
                    <div>
                        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Row Gap</label>
                        <input type="number" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px]" value={getProp('rowGap') || ''} onChange={(e) => setProp('rowGap', e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Col Gap</label>
                        <input type="number" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px]" value={getProp('columnGap') || ''} onChange={(e) => setProp('columnGap', e.target.value)} />
                    </div>
                </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100">
                <h4 className="text-[13px] font-bold text-gray-900 uppercase tracking-wider">Item Flex Settings</h4>
                <div className="grid grid-cols-3 gap-3">
                    <div>
                        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Grow</label>
                        <input type="number" step="0.1" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px]" value={getProp('flexGrow') || ''} onChange={(e) => setProp('flexGrow', e.target.value)} placeholder="0" />
                    </div>
                    <div>
                        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Shrink</label>
                        <input type="number" step="0.1" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px]" value={getProp('flexShrink') || ''} onChange={(e) => setProp('flexShrink', e.target.value)} placeholder="1" />
                    </div>
                    <div>
                        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Basis</label>
                        <input type="text" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px]" value={getProp('flexBasis') || ''} onChange={(e) => setProp('flexBasis', e.target.value)} placeholder="auto" />
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Item Width</label>
                        <div className="flex bg-gray-50 border border-gray-200 rounded-lg overflow-hidden focus-within:border-[#5946ff] transition-all">
                            <input type="number" className="w-full px-3 py-2 bg-transparent text-[13px] outline-none" placeholder="Auto" value={itemWidthData.number} onChange={(e) => {
                                setProp('itemWidth', e.target.value ? e.target.value + itemWidthData.unit : '');
                            }} />
                            <select className="bg-gray-100 border-l border-gray-200 px-2 text-[12px] outline-none text-gray-600" value={itemWidthData.unit} onChange={(e) => {
                                setProp('itemWidthUnit', e.target.value);
                                if (itemWidthData.number) setProp('itemWidth', itemWidthData.number + e.target.value);
                            }}>
                                <option value="px">px</option><option value="%">%</option><option value="vw">vw</option><option value="rem">rem</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Item Height</label>
                        <div className="flex bg-gray-50 border border-gray-200 rounded-lg overflow-hidden focus-within:border-[#5946ff] transition-all">
                            <input type="number" className="w-full px-3 py-2 bg-transparent text-[13px] outline-none" placeholder="Auto" value={itemHeightData.number} onChange={(e) => {
                                setProp('itemHeight', e.target.value ? e.target.value + itemHeightData.unit : '');
                            }} />
                            <select className="bg-gray-100 border-l border-gray-200 px-2 text-[12px] outline-none text-gray-600" value={itemHeightData.unit} onChange={(e) => {
                                setProp('itemHeightUnit', e.target.value);
                                if (itemHeightData.number) setProp('itemHeight', itemHeightData.number + e.target.value);
                            }}>
                                <option value="px">px</option><option value="%">%</option><option value="vh">vh</option><option value="rem">rem</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Text Properties Component ---
const TextProperties = ({ field, onChange }) => {
    return (
        <div className="space-y-6">
            <div className="space-y-4 pt-2">
                <h4 className="text-[13px] font-bold text-gray-900 uppercase tracking-wider">Text Settings</h4>
                <div>
                    <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Content</label>
                    <textarea 
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-[#5946ff] focus:bg-white transition-all"
                        rows={5}
                        placeholder="Enter your text here..."
                        value={field.content || field.placeholder || ''}
                        onChange={(e) => onChange({ content: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Font Family</label>
                    <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px]" value={field.fontFamily || 'inherit'} onChange={(e) => onChange({ fontFamily: e.target.value })}>
                        <option value="inherit">Default Font</option>
                        <option value="Arial, sans-serif">Arial</option>
                        <option value="'Helvetica Neue', Helvetica, sans-serif">Helvetica</option>
                        <option value="'Times New Roman', Times, serif">Times New Roman</option>
                        <option value="'Georgia', serif">Georgia</option>
                        <option value="'Courier New', Courier, monospace">Courier New</option>
                    </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Font Size (px)</label>
                        <input type="number" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px]" value={field.fontSize || ''} onChange={(e) => onChange({ fontSize: e.target.value })} placeholder="16" />
                    </div>
                    <div>
                        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Text Align</label>
                        <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px]" value={field.textAlign || 'left'} onChange={(e) => onChange({ textAlign: e.target.value })}>
                            <option value="left">Left</option>
                            <option value="center">Center</option>
                            <option value="right">Right</option>
                            <option value="justify">Justify</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Style</label>
                        <div className="flex items-center gap-1">
                            <button 
                                className={`flex-1 p-1.5 border rounded flex justify-center items-center ${field.isBold ? 'bg-[#5946ff] text-white border-[#5946ff]' : 'bg-gray-50 text-gray-600 border-gray-200'}`}
                                onClick={(e) => { e.preventDefault(); onChange({ isBold: !field.isBold }) }}
                                title="Bold"
                            >
                                <FiBold size={14} />
                            </button>
                            <button 
                                className={`flex-1 p-1.5 border rounded flex justify-center items-center ${field.isItalic ? 'bg-[#5946ff] text-white border-[#5946ff]' : 'bg-gray-50 text-gray-600 border-gray-200'}`}
                                onClick={(e) => { e.preventDefault(); onChange({ isItalic: !field.isItalic }) }}
                                title="Italic"
                            >
                                <FiItalic size={14} />
                            </button>
                            <button 
                                className={`flex-1 p-1.5 border rounded flex justify-center items-center ${field.isUnderline ? 'bg-[#5946ff] text-white border-[#5946ff]' : 'bg-gray-50 text-gray-600 border-gray-200'}`}
                                onClick={(e) => { e.preventDefault(); onChange({ isUnderline: !field.isUnderline }) }}
                                title="Underline"
                            >
                                <FiUnderline size={14} />
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Font Weight</label>
                        <select className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-[13px]" value={field.fontWeight || 'normal'} onChange={(e) => onChange({ fontWeight: e.target.value })}>
                            <option value="normal">Normal</option>
                            <option value="medium">Medium</option>
                            <option value="600">Semi Bold</option>
                            <option value="bold">Bold</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Text Color</label>
                    <div className="flex items-center gap-2">
                        <input type="color" className="w-10 h-10 rounded cursor-pointer border border-gray-200 p-0.5" value={field.textColor || '#000000'} onChange={(e) => onChange({ textColor: e.target.value })} />
                        <input type="text" className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px] outline-none uppercase" value={field.textColor || '#000000'} onChange={(e) => onChange({ textColor: e.target.value })} />
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Image Properties Component ---
const ImageProperties = ({ field, onChange, handleImageUpload }) => {
    return (
        <div className="space-y-6">
            <div className="space-y-4 pt-2">
                <h4 className="text-[13px] font-bold text-gray-900 uppercase tracking-wider">Image Settings</h4>
                <div>
                    <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Upload Image</label>
                    <input type="file" accept="image/*" className="w-full text-[12px]" onChange={handleImageUpload} />
                </div>
                <div>
                    <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Or Image URL</label>
                    <input type="text" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px]" value={field.imageUrl || ''} onChange={(e) => onChange({ imageUrl: e.target.value })} placeholder="https://..." />
                </div>
                <div>
                    <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Alt Text</label>
                    <input type="text" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px]" value={field.altText || ''} onChange={(e) => onChange({ altText: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Width</label>
                        <input type="text" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px]" value={field.imageWidth || ''} onChange={(e) => onChange({ imageWidth: e.target.value })} placeholder="100%" />
                    </div>
                    <div>
                        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Height</label>
                        <input type="text" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px]" value={field.imageHeight || ''} onChange={(e) => onChange({ imageHeight: e.target.value })} placeholder="auto" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Object Fit</label>
                        <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px]" value={field.objectFit || 'cover'} onChange={(e) => onChange({ objectFit: e.target.value })}>
                            <option value="cover">Cover</option>
                            <option value="contain">Contain</option>
                            <option value="fill">Fill</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Border Radius</label>
                        <input type="text" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px]" value={field.borderRadius || ''} onChange={(e) => onChange({ borderRadius: e.target.value })} placeholder="0px or 50%" />
                    </div>
                </div>
                <div className="pt-2 border-t border-gray-100 mt-2">
                    <label className="flex items-center gap-2 text-[12px] font-medium text-gray-700 cursor-pointer mb-3">
                        <input type="checkbox" className="rounded text-[#5946ff] focus:ring-[#5946ff]" checked={field.enableOverlay || false} onChange={(e) => onChange({ enableOverlay: e.target.checked })} />
                        Enable Overlay Text & Button
                    </label>
                    
                    {field.enableOverlay && (
                        <div className="space-y-3 pl-6 border-l-2 border-gray-100">
                            <div>
                                <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Overlay Text</label>
                                <input type="text" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px]" value={field.overlayText || ''} onChange={(e) => onChange({ overlayText: e.target.value })} placeholder="Enter text..." />
                            </div>
                            <div className="pt-2 border-t border-gray-100">
                                <label className="flex items-center gap-2 text-[12px] font-medium text-gray-700 cursor-pointer mb-3">
                                    <input type="checkbox" className="rounded text-[#5946ff] focus:ring-[#5946ff]" checked={field.enableOverlayButton || false} onChange={(e) => onChange({ enableOverlayButton: e.target.checked })} />
                                    Enable Overlay Button
                                </label>
                            </div>
                            {field.enableOverlayButton && (
                                <>
                                    <div>
                                        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Button Text</label>
                                        <input type="text" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px]" value={field.overlayButtonText || ''} onChange={(e) => onChange({ overlayButtonText: e.target.value })} placeholder="Click Here" />
                                    </div>
                                    <div>
                                        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Button Style</label>
                                        <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px]" value={field.overlayButtonStyle || 'outline'} onChange={(e) => onChange({ overlayButtonStyle: e.target.value })}>
                                            <option value="outline">Outline</option>
                                            <option value="solid">Solid Background</option>
                                        </select>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Video Properties Component ---
const VideoProperties = ({ field, onChange }) => {
    return (
        <div className="space-y-6">
            <div className="space-y-4 pt-2">
                <h4 className="text-[13px] font-bold text-gray-900 uppercase tracking-wider">Video Settings</h4>
                <div>
                    <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Video URL (YouTube/MP4)</label>
                    <input type="text" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px]" value={field.videoUrl || ''} onChange={(e) => onChange({ videoUrl: e.target.value })} placeholder="https://..." />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Width</label>
                        <input type="text" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px]" value={field.videoWidth || ''} onChange={(e) => onChange({ videoWidth: e.target.value })} placeholder="100%" />
                    </div>
                    <div>
                        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Height</label>
                        <input type="text" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px]" value={field.videoHeight || ''} onChange={(e) => onChange({ videoHeight: e.target.value })} placeholder="400px" />
                    </div>
                </div>
                <div className="space-y-2 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-600" checked={field.autoPlay || false} onChange={(e) => onChange({ autoPlay: e.target.checked })} />
                        <span className="text-[13px] font-medium text-gray-700">Auto Play</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-600" checked={field.controls !== false} onChange={(e) => onChange({ controls: e.target.checked })} />
                        <span className="text-[13px] font-medium text-gray-700">Show Controls</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-600" checked={field.loop || false} onChange={(e) => onChange({ loop: e.target.checked })} />
                        <span className="text-[13px] font-medium text-gray-700">Loop Video</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-600" checked={field.muted || false} onChange={(e) => onChange({ muted: e.target.checked })} />
                        <span className="text-[13px] font-medium text-gray-700">Muted</span>
                    </label>
                </div>
            </div>
        </div>
    );
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
    setTargetContainerPath,
    device
}) => {
    const isContainer = field.type === 'Container';
    const isGrid = field.type === 'Grid';
    const isFlex = field.type === 'Flex';
    const isDescription = field.type === 'Description';
    const isImage = field.type === 'Image';
    const isText = field.type === 'Text';
    const isVideo = field.type === 'Video';
    const isEmptySpace = field.type === 'EmptySpace';
    const isActive = activeFieldPath && activeFieldPath.join(',') === path.join(',');
    
    const getGridProp = (key) => {
        if (device === 'mobile') {
            if (field[key + 'Mobile'] !== undefined && field[key + 'Mobile'] !== '') return field[key + 'Mobile'];
            if (field[key + 'Tablet'] !== undefined && field[key + 'Tablet'] !== '') return field[key + 'Tablet'];
            return field[key];
        }
        if (device === 'tablet') {
            if (field[key + 'Tablet'] !== undefined && field[key + 'Tablet'] !== '') return field[key + 'Tablet'];
            return field[key];
        }
        return field[key];
    };

    const gridCols = getGridProp('columns') || 3;
    const gridRows = getGridProp('rows') || (isFlex ? 1 : 2); // Flex defaults to 1 row

    // Grid properties
    const columnGap = (getGridProp('columnGap') !== undefined && getGridProp('columnGap') !== '') ? getGridProp('columnGap') : ((getGridProp('gap') !== undefined && getGridProp('gap') !== '') ? getGridProp('gap') : 20);
    const rowGap = (getGridProp('rowGap') !== undefined && getGridProp('rowGap') !== '') ? getGridProp('rowGap') : ((getGridProp('gap') !== undefined && getGridProp('gap') !== '') ? getGridProp('gap') : 20);
    const gridAlignItems = getGridProp('gridAlignItems') || 'stretch';
    const justifyItems = getGridProp('justifyItems') || 'stretch';
    
    const itemStyles = (isGrid || isFlex) ? {
        width: getGridProp('itemWidth'),
        height: getGridProp('itemHeight'),
        background: getGridProp('itemBackground'),
        border: getGridProp('itemBorder') ? `${getGridProp('itemBorder')} ${getGridProp('itemBorderColor') || ''}`.trim() : (getGridProp('itemBorderColor') ? `1px solid ${getGridProp('itemBorderColor')}` : undefined),
        borderRadius: getGridProp('itemBorderRadius') ? `${getGridProp('itemBorderRadius')}px` : undefined,
    } : {};

    if (isFlex) {
        if ((getGridProp('flexGrow') !== undefined && getGridProp('flexGrow') !== '') || 
            (getGridProp('flexShrink') !== undefined && getGridProp('flexShrink') !== '') || 
            getGridProp('flexBasis')) {
            itemStyles.flexGrow = getGridProp('flexGrow');
            itemStyles.flexShrink = getGridProp('flexShrink');
            itemStyles.flexBasis = getGridProp('flexBasis');
        } else {
            itemStyles.flex = `1 1 calc(${100 / gridCols}% - ${columnGap}px)`;
            itemStyles.minWidth = `calc(${100 / gridCols}% - ${columnGap}px)`;
        }
    }

    // Flex properties
    const flexWrap = getGridProp('flexWrap') || 'wrap';
    const flexDirection = getGridProp('flexDirection') || 'row';
    const justifyContent = getGridProp('justifyContent') || 'flex-start';
    const flexAlignItems = getGridProp('alignItems') || 'stretch';
    const rowGapFlex = (getGridProp('rowGap') !== undefined && getGridProp('rowGap') !== '') ? getGridProp('rowGap') : ((getGridProp('gap') !== undefined && getGridProp('gap') !== '') ? getGridProp('gap') : 20);
    const columnGapFlex = (getGridProp('columnGap') !== undefined && getGridProp('columnGap') !== '') ? getGridProp('columnGap') : ((getGridProp('gap') !== undefined && getGridProp('gap') !== '') ? getGridProp('gap') : 20);
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
                isImage ? "flex-col h-full overflow-hidden p-0" :
                isDescription ? "rounded-lg p-0 flex-col gap-3 h-full" : 
                isText ? "rounded-none p-3 flex-col h-full bg-transparent border-dashed" : 
                isVideo ? "rounded-none p-0 flex-col overflow-hidden h-full" : 
                "rounded-lg px-3 py-2 flex-col gap-3 h-full",
                (!isContainer && !isGrid && !isFlex && !isImage && !isDescription && !isText && !isVideo && !isEmptySpace && field.bottomUnderline) ? "border-b-2 border-gray-200" : ""
            )}
            id={isContainer ? `editor-container-${field.id}` : undefined}
            style={isImage ? { borderRadius: field.borderRadius || '0' } : {}}
            onClick={(e) => { e.stopPropagation(); setActiveFieldPath(path); }}
        >
            {isContainer && (() => {
                const getProp = (key) => {
                    if (device === 'mobile') {
                        if (field[key + 'Mobile'] !== undefined && field[key + 'Mobile'] !== '') return field[key + 'Mobile'];
                        if (field[key + 'Tablet'] !== undefined && field[key + 'Tablet'] !== '') return field[key + 'Tablet'];
                        return field[key];
                    }
                    if (device === 'tablet') {
                        if (field[key + 'Tablet'] !== undefined && field[key + 'Tablet'] !== '') return field[key + 'Tablet'];
                        return field[key];
                    }
                    return field[key];
                };
                const val = (k) => {
                    const v = getProp(k);
                    return (!isNaN(v) && v ? `${v}px` : v);
                };
                
                return (
                    <style dangerouslySetInnerHTML={{__html: `
                        #editor-container-${field.id} {
                            width: ${val('width') || (field.fullWidth ? '100%' : '100%')};
                            height: ${val('height') || 'auto'};
                            background-color: ${getProp('backgroundColor') || 'transparent'};
                            background-image: ${getProp('backgroundImage') ? `url(${getProp('backgroundImage')})` : 'none'};
                            background-size: ${getProp('backgroundSize') || 'cover'};
                            background-position: center;
                            padding-top: ${val('paddingTop') || '0'};
                            padding-right: ${val('paddingRight') || '0'};
                            padding-bottom: ${val('paddingBottom') || '0'};
                            padding-left: ${val('paddingLeft') || '0'};
                            margin-top: ${val('marginTop') || '0'};
                            margin-right: ${val('marginRight') || '0'};
                            margin-bottom: ${val('marginBottom') || '0'};
                            margin-left: ${val('marginLeft') || '0'};
                            ${getProp('border') ? `border: ${getProp('border')};` : ''}
                            border-radius: ${val('borderRadius') || '0'};
                            box-shadow: ${getProp('boxShadow') || 'none'};
                            display: ${(device === 'desktop' && field.visibleDesktop === false) || (device === 'tablet' && field.visibleTablet === false) || (device === 'mobile' && field.visibleMobile === false) ? 'none' : 'flex'};
                        }
                    `}} />
                );
            })()}
            {field.imageOverlay && isContainer && (
                <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: field.imageOverlay, borderRadius: (!isNaN(field.borderRadius) && field.borderRadius ? `${field.borderRadius}px` : field.borderRadius) }}></div>
            )}
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
                <div 
                    className={cn("flex flex-col relative border border-[#3b82f6] bg-white", !getGridProp('width') && "w-full flex-1")}
                    style={{
                        width: getGridProp('width') ? (!isNaN(getGridProp('width')) ? `${getGridProp('width')}px` : getGridProp('width')) : undefined
                    }}
                >
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
                        className={cn("p-5 bg-white", isGrid ? "grid" : "flex")}
                        style={isGrid ? { 
                            gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
                            columnGap: `${columnGap}px`,
                            rowGap: `${rowGap}px`,
                            alignItems: gridAlignItems,
                            justifyItems: justifyItems,
                            minHeight: getGridProp('minHeight') ? (!isNaN(getGridProp('minHeight')) ? `${getGridProp('minHeight')}px` : getGridProp('minHeight')) : '160px'
                        } : {
                            flexDirection,
                            flexWrap,
                            justifyContent,
                            alignItems: flexAlignItems,
                            rowGap: `${rowGapFlex}px`,
                            columnGap: `${columnGapFlex}px`,
                            minHeight: (!isNaN(minHeight) && minHeight ? `${minHeight}px` : minHeight)
                        }}
                    >
                        {field.fields && field.fields.map((subField, idx) => (
                            <div key={subField.id} className="relative flex flex-col overflow-hidden" style={itemStyles}>
                                <GridDropZone disabled={isMotherDrag} onDrop={(e) => handleDropField(e, [...path, idx])} />
                                <RecursiveFieldRenderer 
                                    field={subField} 
                                    path={[...path, idx]} 
                                    {...{activeFieldPath, setActiveFieldPath, handleDragStartCanvas, handleDropField, handleDragOver, removeField, renderIcon, isMotherDrag, targetContainerPath, setTargetContainerPath, device}} 
                                />
                            </div>
                        ))}
                        {[...Array(Math.max(0, (gridCols * gridRows) - (field.fields?.length || 0)))].map((_, i) => (
                            <div 
                                key={`placeholder-${i}`} 
                                className="border border-dashed border-[#b6c6fa] rounded bg-[#f8faff] min-h-[140px] flex flex-col items-center justify-center cursor-pointer transition-colors hover:bg-[#ebf0ff] overflow-hidden"
                                style={itemStyles}
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
                <div className="w-full flex-1 flex flex-col">
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
                                        {...{activeFieldPath, setActiveFieldPath, handleDragStartCanvas, handleDropField, handleDragOver, removeField, renderIcon, isMotherDrag, targetContainerPath, setTargetContainerPath, device}} 
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
                </div>
            ) : isText ? (
                <div className="flex-1 flex flex-col w-full relative group/text min-h-[30px]">
                    <div className="absolute top-1 right-1 flex items-center justify-end z-10 opacity-0 group-hover/text:opacity-100 transition-opacity">
                        <button 
                            onClick={(e) => { e.stopPropagation(); removeField(path); }}
                            className="bg-white rounded-full p-1.5 text-gray-400 hover:text-red-500 shadow-sm border border-gray-100 transition-colors"
                        >
                            <FiTrash2 size={12} />
                        </button>
                    </div>
                    <div 
                        className="w-full text-gray-800"
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
                        {field.content || field.placeholder || "Enter your text here..."}
                    </div>
                </div>
            ) : isVideo ? (
                <div className="flex-1 flex flex-col w-full relative group/video items-center bg-gray-100">
                    <div className="absolute top-2 right-2 flex items-center justify-end z-20 opacity-0 group-hover/video:opacity-100 transition-opacity">
                        <button 
                            onClick={(e) => { e.stopPropagation(); removeField(path); }}
                            className="bg-white rounded-full p-2 text-gray-400 hover:text-red-500 shadow-sm border border-gray-100 transition-colors"
                        >
                            <FiTrash2 size={14} />
                        </button>
                    </div>
                    {/* Label */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-[#6366F1] z-20 pointer-events-none">
                        {field.label || 'Video'}
                    </div>
                    
                    <div 
                        className="w-full max-w-full flex items-center justify-center shrink-0"
                        style={{
                            width: field.videoWidth ? (!isNaN(field.videoWidth) ? `${field.videoWidth}px` : field.videoWidth) : '100%',
                            height: field.videoHeight ? (!isNaN(field.videoHeight) ? `${field.videoHeight}px` : field.videoHeight) : '400px',
                        }}
                    >
                        {field.videoUrl ? (
                            field.videoUrl.match(/\.(mp4|webm|ogg)$/i) ? (
                                <video 
                                    src={field.videoUrl} 
                                    className="w-full h-full object-cover pointer-events-none"
                                />
                            ) : (
                                <iframe 
                                    src={field.videoUrl.includes('youtube') ? field.videoUrl.replace('watch?v=', 'embed/') : field.videoUrl} 
                                    className="w-full h-full border-0 pointer-events-none"
                                ></iframe>
                            )
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                                <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                                <span className="text-sm font-medium">Video Player</span>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className={cn("flex-1 flex flex-col w-full", field.bottomUnderline ? "border-b-2 border-gray-200 pb-3 mb-1" : "")}>
                    <div className="flex items-center justify-between py-1 w-full">
                        <div className="flex items-center gap-3">
                            <span className="text-gray-400">{renderIcon(field.icon)}</span>
                            <span className="text-sm font-medium text-gray-700">{field.label || field.type}</span>
                        </div>
                        <button 
                            onClick={(e) => { e.stopPropagation(); removeField(path); }}
                            className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover/subfield:opacity-100 p-1"
                            title="Delete Field"
                        >
                            <FiTrash2 size={14} />
                        </button>
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
            id: 's_general', title: 'General Section', isExpanded: true, fields: []
        }
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
    const [activeMainTab, setActiveMainTab] = useState('Add Elements');
    const [activeSidebarTab, setActiveSidebarTab] = useState('Elements');
    const [sectionInfo, setSectionInfo] = useState({ name: section?.name || '', description: section?.description || '' });


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
            if (fieldToDrop.type === 'Flex' || fieldToDrop.type === 'Grid') {
                fieldToDrop.fields = [
                    { id: `c_${Date.now()}_1`, type: 'Container', label: 'Column Container', icon: 'FiLayout', fields: [] },
                    { id: `c_${Date.now()}_2`, type: 'Container', label: 'Column Container', icon: 'FiLayout', fields: [] }
                ];
                if (fieldToDrop.type === 'Grid') {
                    fieldToDrop.columns = 2;
                }
            }
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

        let newField = {
            id: `f_${Date.now()}`,
            type: field.type,
            label: field.label,
            icon: field.icon.name || 'FiType',
            fields: []
        };
        
        if (newField.type === 'Flex' || newField.type === 'Grid') {
            newField.fields = [
                { id: `c_${Date.now()}_1`, type: 'Container', label: 'Column Container', icon: 'FiLayout', fields: [] },
                { id: `c_${Date.now()}_2`, type: 'Container', label: 'Column Container', icon: 'FiLayout', fields: [] }
            ];
            if (newField.type === 'Grid') {
                newField.columns = 2;
            }
        }

        const newLayout = [...layout];
        
        if (targetContainerPath) {
            let target = newLayout[targetContainerPath[0]];
            for (let i = 1; i < targetContainerPath.length; i++) {
                target = target.fields[targetContainerPath[i]];
            }
            if (!target.fields) target.fields = [];
            
            // Auto-wrap if targeting Flex/Grid
            if ((target.type === 'Flex' || target.type === 'Grid') && newField.type !== 'Container' && newField.type !== 'EmptySpace') {
                newField = {
                    id: `c_${Date.now()}_wrapper`,
                    type: 'Container',
                    label: 'Column Container',
                    icon: 'FiLayout',
                    fields: [newField]
                };
            }
            
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
            case 'FiGrid': return <FiGrid />;
            case 'FiLayout': return <FiLayout />;
            case 'FiType': return <FiType />;
            case 'FiImage': return <FiImage />;
            case 'FiCode': return <FiCode />;
            case 'FiPlay': return <FiPlay />;
            case 'FiMessageSquare': return <FiMessageSquare />;
            case 'FiHelpCircle': return <FiHelpCircle />;
            case 'FiClock': return <FiClock />;
            case 'FiAlignLeft': return <FiAlignLeft />;
            case 'FiMapPin': return <FiMapPin />;
            case 'FiMail': return <FiMail />;
            case 'FiDollarSign': return <FiDollarSign />;
            case 'FiTag': return <FiTag />;
            case 'FiCalendar': return <FiCalendar />;
            case 'FiCheckSquare': return <FiCheckSquare />;
            case 'FiCircle': return <FiCircle />;
            case 'FiUpload': return <FiUpload />;
            default: return <FiType />;
        }
    };

    
    return (
        <div className="fixed inset-0 z-[100] flex flex-col bg-[#F9FAFB] font-sans h-screen overflow-hidden">
            {isLoading ? (
                <div className="w-full h-full flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-xl flex items-center gap-4">
                        <FiLoader className="animate-spin text-[#5946ff]" size={24} />
                        <span className="text-gray-700 font-medium">Loading section data...</span>
                    </div>
                </div>
            ) : (
                <>
                    {/* Top Header Bar */}
                    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 relative z-30">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-3 pr-6 border-r border-gray-200">
                                <div className="w-8 h-8 bg-[#5946ff] rounded flex items-center justify-center text-white">
                                    <FiLayout size={16} />
                                </div>
                                <div>
                                    <h2 className="text-sm font-bold text-gray-900 leading-none">Dory Furniture</h2>
                                    <span className="text-[11px] text-gray-500">CMS Dashboard</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <button onClick={onClose} className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                                    <FiArrowLeft size={18} />
                                </button>
                                <div>
                                    <h1 className="text-lg font-bold text-gray-900 leading-tight">Section Builder</h1>
                                    <p className="text-[13px] text-gray-500 leading-none">Create and customize your section with flexible layouts and elements.</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => {
                                    if (window.confirm('Are you sure you want to clear the canvas? This will remove all elements.')) {
                                        setLayout(defaultLayout);
                                    }
                                }} 
                                className="px-5 py-2.5 bg-white border border-gray-200 text-red-600 hover:text-red-700 text-sm font-semibold rounded-lg flex items-center gap-2 hover:bg-red-50 hover:border-red-200 transition-all shadow-sm"
                            >
                                <FiTrash2 size={16} /> Clear Canvas
                            </button>
                            <button className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg flex items-center gap-2 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                                <FiEye size={16} /> Preview
                            </button>
                            <button onClick={handleSave} className="px-5 py-2.5 bg-[#5946ff] text-white text-sm font-semibold rounded-lg flex items-center gap-2 hover:bg-[#4a39e0] transition-all shadow-sm">
                                <FiSave size={16} /> Save Section
                            </button>
                        </div>
                    </div>

                    {/* Main Layout */}
                    <div className="flex-1 flex overflow-hidden">
                        
                        {/* Left Workspace Panel */}
                        <div className="flex-1 flex flex-col bg-[#F9FAFB] overflow-y-auto custom-scrollbar">
                            
                            {/* Navigation Tabs */}
                            <div className="bg-white border-b border-gray-200 px-8 flex items-center gap-8 mb-6 shadow-sm sticky top-0 z-20">
                                {['General', 'Add Elements', 'Single Page Layout', 'All Sections', 'Search'].map(tab => (
                                    <button 
                                        key={tab}
                                        onClick={() => setActiveMainTab(tab)}
                                        className={cn(
                                            "py-4 text-[13px] font-bold flex items-center gap-2 relative transition-colors",
                                            activeMainTab === tab ? "text-[#5946ff]" : "text-gray-500 hover:text-gray-900"
                                        )}
                                    >
                                        {tab === 'Add Elements' && (
                                            <div className={cn("w-5 h-5 rounded-full flex items-center justify-center text-[10px]", activeMainTab === tab ? "bg-[#5946ff] text-white" : "bg-gray-200 text-gray-500")}>
                                                <FiPlus strokeWidth={3} />
                                            </div>
                                        )}
                                        {tab}
                                        {activeMainTab === tab && (
                                            <motion.div layoutId="mainTabIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5946ff]" />
                                        )}
                                    </button>
                                ))}
                            </div>

                            <div className="px-8 pb-12 max-w-5xl mx-auto w-full">
                                {/* Combined Editor Workspace */}
                                <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
                                    
                                    {/* Section Information Panel */}
                                    <div className="p-6 border-b border-gray-100 bg-gray-50/30">
                                        <div className="flex items-start gap-4 mb-6">
                                            <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-500 shrink-0 shadow-sm">
                                                <FiLayout size={18} />
                                            </div>
                                            <div>
                                                <h3 className="text-[15px] font-bold text-gray-900">Section Information</h3>
                                                <p className="text-[13px] text-gray-500 mt-1">Give your section a name and description. <span className="font-semibold text-gray-700">This helps you identify it later in the section library.</span></p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 gap-6 max-w-xl">
                                            <div>
                                                <label className="block text-[13px] font-bold text-gray-700 mb-2">Section Name <span className="text-red-500">*</span></label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                                        <FiTag size={14} />
                                                    </div>
                                                    <input 
                                                        type="text" 
                                                        value={sectionInfo.name}
                                                        onChange={e => setSectionInfo({...sectionInfo, name: e.target.value})}
                                                        className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] font-medium text-gray-900 focus:border-[#5946ff] focus:ring-1 focus:ring-[#5946ff] outline-none transition-all placeholder:text-gray-400"
                                                        placeholder="e.g. Hero Banner, Category Carousel..."
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Drag & Drop Canvas Zone */}
                                    <div className="bg-gradient-to-b from-[#fbfcff] to-white min-h-[400px] flex flex-col">
                                    
                                    {/* The Canvas Content */}
                                    <div className="w-full flex justify-center bg-gray-50 p-2 sm:p-4">
                                        <div className={cn("flex-1 space-y-4 relative z-10 transition-all duration-300 bg-white min-h-[400px]", 
                                            device === 'desktop' ? "w-full max-w-none" : 
                                            device === 'tablet' ? "w-full max-w-[768px] shadow-2xl border border-gray-300 mx-auto" : 
                                            "w-full max-w-[375px] shadow-2xl border border-gray-300 mx-auto"
                                        )}>
                                        {layout.map((sec, secIdx) => (
                                            <div key={sec.id} className="w-full">
                                                <div 
                                                    className="w-full bg-white shadow-sm border border-gray-100 rounded-xl p-4 min-h-[120px]"
                                                    onDragOver={handleDragOver}
                                                    onDrop={(e) => handleDropField(e, [secIdx, sec.fields.length])}
                                                >
                                                    {sec.fields.length === 0 ? (
                                                        <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 pointer-events-none opacity-80 relative z-0">
                                                            <div className="w-16 h-16 bg-[#f4f2ff] rounded-full flex items-center justify-center text-[#5946ff] mb-4">
                                                                <FiLayers size={24} strokeWidth={2.5} />
                                                            </div>
                                                            <h3 className="text-[17px] font-bold text-gray-900 mb-2">Drag & Drop Your Elements</h3>
                                                            <p className="text-[13px] text-gray-500 max-w-sm mb-6">Choose elements from the right sidebar and drop them here to build your section.</p>
                                                            <div className="pointer-events-auto">
                                                                <button className="px-5 py-2.5 bg-[#5946ff] text-white text-sm font-semibold rounded-full flex items-center gap-2 hover:bg-[#4a39e0] transition-colors shadow-sm">
                                                                    <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center"><FiPlus size={14} /></div> Add Element
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="space-y-0 w-full relative z-10">
                                                            {sec.fields.map((field, fieldIdx) => (
                                                                <React.Fragment key={field.id}>
                                                                    <DropZone disabled={dragType === 'canvas_field' && draggedItem && draggedItem.path[0] === secIdx && draggedItem.path.length === 2 && field.type === 'Container'} onDrop={(e) => handleDropField(e, [secIdx, fieldIdx])} />
                                                                    <div className="py-1" onDragOver={handleDragOver} onDrop={(e) => handleDropField(e, [secIdx, fieldIdx])}>
                                                                        <RecursiveFieldRenderer
                                                                            field={field}
                                                                            path={[secIdx, fieldIdx]}
                                                                            {...{activeFieldPath, setActiveFieldPath, handleDragStartCanvas, handleDropField, handleDragOver, removeField, renderIcon, targetContainerPath, setTargetContainerPath, device}}
                                                                            isMotherDrag={dragType === 'canvas_field' && draggedItem && draggedItem.path[0] === secIdx && draggedItem.path.length === 2 && field.type === 'Container'}
                                                                        />
                                                                    </div>
                                                                </React.Fragment>
                                                            ))}
                                                            <DropZone disabled={dragType === 'canvas_field' && draggedItem && draggedItem.path.length === 2 && draggedItem.path[0] === secIdx} onDrop={(e) => handleDropField(e, [secIdx, sec.fields.length])} isContainerEnd={true} />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar (Elements / Library) */}
                        <div className="w-[380px] bg-white border-l border-gray-200 flex flex-col shadow-sm shrink-0 relative z-20">
                            {/* Properties Overlay if a field is active */}
                            {activeFieldPath && getFieldAtPath(layout, activeFieldPath) ? (
                                (() => {
                                    const field = getFieldAtPath(layout, activeFieldPath);
                                    return (
                                        <div className="absolute inset-0 bg-white z-30 flex flex-col">
                                            <div className="flex items-center gap-4 px-6 py-5 border-b border-gray-100">
                                                <button onClick={() => setActiveFieldPath(null)} className="w-8 h-8 flex items-center justify-center bg-gray-50 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors">
                                                    <FiArrowLeft size={16} />
                                                </button>
                                                <h3 className="text-[15px] font-bold text-gray-900">{field.type} Properties</h3>
                                            </div>
                                            <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                                                {field.type === 'Container' ? (
                                                    <ContainerProperties field={field} onChange={updateActiveField} device={device} setDevice={setDevice} />
                                                ) : field.type === 'Grid' ? (
                                                    <GridProperties field={field} onChange={updateActiveField} device={device} setDevice={setDevice} />
                                                ) : field.type === 'Flex' ? (
                                                    <FlexProperties field={field} onChange={updateActiveField} device={device} setDevice={setDevice} />
                                                ) : (field.type === 'Text' || field.type === 'Description') ? (
                                                    <TextProperties field={field} onChange={updateActiveField} />
                                                ) : field.type === 'Image' ? (
                                                    <ImageProperties field={field} onChange={updateActiveField} handleImageUpload={handleImageUpload} />
                                                ) : field.type === 'Video' ? (
                                                    <VideoProperties field={field} onChange={updateActiveField} />
                                                ) : (
                                                    <div className="space-y-5">
                                                        <div>
                                                            <label className="block text-[13px] font-bold text-gray-700 mb-2">Label</label>
                                                            <input
                                                                type="text"
                                                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[13px] focus:border-[#5946ff] focus:bg-white outline-none transition-all"
                                                                value={field.label || ''}
                                                                onChange={(e) => updateActiveField({ label: e.target.value })}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-[13px] font-bold text-gray-700 mb-2">Content / Placeholder</label>
                                                            <input
                                                                type="text"
                                                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[13px] focus:border-[#5946ff] focus:bg-white outline-none transition-all"
                                                                value={field.placeholder || ''}
                                                                onChange={(e) => updateActiveField({ placeholder: e.target.value })}
                                                            />
                                                        </div>
                                                        
                                                        {/* Style Settings for generic text */}
                                                        <div className="pt-5 border-t border-gray-100 space-y-4">
                                                            <h4 className="text-[13px] font-bold text-gray-900 uppercase tracking-wider">Style Settings</h4>
                                                            <div>
                                                                <label className="block text-[13px] font-medium text-gray-600 mb-2">Text Color</label>
                                                                <div className="flex items-center gap-2">
                                                                    <input type="color" className="w-9 h-9 rounded cursor-pointer border border-gray-200 p-0.5" value={field.textColor || '#000000'} onChange={(e) => updateActiveField({ textColor: e.target.value })} />
                                                                    <input type="text" className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-[#5946ff] focus:bg-white uppercase" value={field.textColor || '#000000'} onChange={(e) => updateActiveField({ textColor: e.target.value })} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })()
                            ) : null}

                            {/* Sidebar Tabs */}
                            <div className="flex bg-[#f8fafc] p-2 m-4 border border-gray-200/60 rounded-xl shadow-sm">
                                {['Elements', 'Content Library'].map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveSidebarTab(tab)}
                                        className={cn(
                                            "flex-1 py-2 rounded-lg text-[13px] font-bold transition-all flex items-center justify-center gap-2",
                                            activeSidebarTab === tab ? "bg-white text-gray-900 shadow-[0_2px_8px_rgba(0,0,0,0.04)]" : "text-gray-500 hover:text-gray-700 hover:bg-black/5"
                                        )}
                                    >
                                        {tab === 'Elements' && <FiGrid size={14} className={activeSidebarTab === tab ? 'text-[#5946ff]' : ''} />}
                                        {tab === 'Content Library' && <FiFileText size={14} className={activeSidebarTab === tab ? 'text-[#5946ff]' : ''} />}
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {/* Sidebar Content */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar px-5 pb-6 space-y-6">
                                {SIDEBAR_ELEMENTS.map((group, gIdx) => (
                                    <div key={gIdx} className="space-y-4">
                                        <div className="flex items-center justify-between cursor-pointer px-1">
                                            <div>
                                                <h4 className="text-[14px] font-bold text-gray-900">{group.title}</h4>
                                                <p className="text-[12px] text-gray-500 mt-0.5">{group.subtitle}</p>
                                            </div>
                                            <FiChevronUp className="text-gray-400" size={18} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            {group.items.map(item => (
                                                <div 
                                                    key={item.id}
                                                    draggable
                                                    onDragStart={(e) => handleDragStartSidebar(e, item)}
                                                    className="bg-white border border-gray-200 rounded-xl p-3.5 cursor-grab hover:border-[#5946ff] hover:shadow-[0_4px_12px_rgba(89,70,255,0.08)] transition-all flex flex-col items-center justify-center text-center gap-2.5 group/item"
                                                >
                                                    <div className="w-10 h-10 rounded-xl bg-[#f8fafc] group-hover/item:bg-[#f4f2ff] text-gray-400 group-hover/item:text-[#5946ff] transition-colors flex items-center justify-center">
                                                        {renderIcon(item.icon.name)}
                                                    </div>
                                                    <div>
                                                        <h5 className="text-[12px] font-bold text-gray-900 leading-tight mb-1">{item.label}</h5>
                                                        <p className="text-[10px] font-medium text-gray-500 leading-[1.2]">{item.description}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </>
            )}
        </div>
    );
}
