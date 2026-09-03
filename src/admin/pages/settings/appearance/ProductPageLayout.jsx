import React, { useState } from 'react';
import { FiArrowLeft, FiCheckCircle, FiShoppingCart, FiHeart } from 'react-icons/fi';

export default function ProductPageLayout({ onBack }) {
  const [selectedLayout, setSelectedLayout] = useState('left');

  const layouts = [
    { id: 'left', title: 'Image Left, Info Right', desc: 'Product image on the left side and information on the right side.', preview: 'left' },
    { id: 'right', title: 'Image Right, Info Left', desc: 'Product image on the right side and information on the left side.', preview: 'right' },
    { id: 'top', title: 'Image Top, Info Bottom', desc: 'Product image on the top and information below.', preview: 'top' },
    { id: 'bottom', title: 'Image Bottom, Info Top', desc: 'Product information on the top and image below.', preview: 'bottom' },
    { id: 'left-thumbs-bottom', title: 'Image Left, Info Right (Thumbnails Bottom)', desc: 'Main image on the left with thumbnails below and information on the right.', preview: 'left-thumbs' },
    { id: 'full', title: 'Full Width Image', desc: 'Large image on top (full width) with information below.', preview: 'full' }
  ];

  return (
    <div className="flex flex-col h-full bg-stone-50 overflow-y-auto w-full">

      {/* Header */}
      <div className="h-24 px-8 flex items-center justify-between shrink-0 sticky top-0 bg-stone-50/90 backdrop-blur-sm z-10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 rounded-full hover:bg-stone-200 text-stone-500 transition-colors">
            <FiArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-stone-900">Product Page Layout</h2>
            <p className="text-sm text-stone-500 mt-1">Choose how product image and information are arranged on the product page.</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-[#6b46c1] hover:bg-[#553c9a] text-white font-medium rounded-lg shadow-sm transition-colors">
          <FiCheckCircle size={18} /> Save Changes
        </button>
      </div>

      <div className="p-8 pt-0 space-y-6">

        {/* Layout Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {layouts.map(layout => {
            const isSelected = selectedLayout === layout.id;
            return (
              <div
                key={layout.id}
                onClick={() => setSelectedLayout(layout.id)}
                className={`bg-white rounded-xl p-5 border-2 cursor-pointer transition-all ${isSelected ? 'border-[#6b46c1] shadow-md relative' : 'border-stone-200 hover:border-purple-300'
                  }`}
              >
                {/* Visual Representation */}
                {(layout.id === 'left' || layout.id === 'right') ? (
                  <div className="mb-6 flex gap-3 sm:gap-4 h-auto min-h-[160px] bg-white rounded-lg p-0 items-stretch">
                    {layout.id === 'left' && (
                      <div className="w-1/2 rounded-lg overflow-hidden shrink-0">
                        <img src="/white-sofa.png" alt="Sofa" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="w-1/2 flex flex-col justify-center py-2">
                      <h4 className="font-bold text-[14px] sm:text-[16px] text-stone-900 leading-tight">Veteran-336</h4>
                      <div className="flex flex-wrap items-center text-yellow-500 text-[10px] mt-1 sm:mt-1.5 gap-0.5">
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        <span className="text-stone-500 ml-0.5 text-[10px] sm:text-[11px]">(24)</span>
                      </div>
                      <div className="text-[#c53030] font-bold text-[14px] sm:text-[16px] mt-1 sm:mt-2">৳ 42,500</div>
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                        <button className="bg-[#6b46c1] hover:bg-[#553c9a] text-white text-[10px] sm:text-[12px] font-medium py-1.5 px-2 sm:px-3 rounded-md flex items-center gap-1 sm:gap-1.5 transition-colors">
                          <FiShoppingCart size={12} className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> <span className="whitespace-nowrap">Add to Cart</span>
                        </button>
                        <button className="bg-stone-100 hover:bg-stone-200 text-stone-600 p-1.5 rounded-full transition-colors shrink-0">
                          <FiHeart size={12} className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </button>
                      </div>
                    </div>
                    {layout.id === 'right' && (
                      <div className="w-1/2 rounded-lg overflow-hidden shrink-0">
                        <img src="/white-sofa.png" alt="Sofa" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    {layout.id === 'top' && (
                      <div className="mb-6 flex flex-col h-auto min-h-[160px] bg-white rounded-lg overflow-hidden border border-stone-100 p-2 sm:p-3">
                        <div className="w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] mx-auto shrink-0 rounded-[20px] overflow-hidden">
                          <img src="/white-sofa.png" alt="Sofa" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col items-center justify-center p-2 text-center flex-1">
                          <h4 className="font-bold text-[14px] sm:text-[16px] text-stone-900 leading-tight">Veteran-336</h4>
                          <div className="text-[#c53030] font-bold text-[14px] sm:text-[16px] mt-1.5 sm:mt-2">৳ 42,500</div>
                          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2 sm:mt-3 justify-center w-full max-w-[200px]">
                            <button className="bg-[#6b46c1] hover:bg-[#553c9a] text-white text-[10px] sm:text-[12px] font-medium py-1.5 px-2 sm:px-3 rounded-md flex items-center justify-center gap-1 sm:gap-1.5 transition-colors flex-1">
                              <FiShoppingCart size={12} className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> <span className="whitespace-nowrap">Add to Cart</span>
                            </button>
                            <button className="bg-stone-100 hover:bg-stone-200 text-stone-600 p-1.5 rounded-full transition-colors shrink-0">
                              <FiHeart size={12} className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    {layout.id === 'bottom' && (
                      <div className="mb-6 flex flex-col h-auto min-h-[160px] bg-white rounded-lg overflow-hidden border border-stone-100 p-1 sm:p-2">
                        <div className="flex flex-col items-center justify-center p-2 text-center flex-1">
                          <h4 className="font-bold text-[14px] sm:text-[16px] text-stone-900 leading-tight">Veteran-336</h4>
                          <div className="text-[#c53030] font-bold text-[14px] sm:text-[16px] mt-1.5 sm:mt-2">৳ 42,500</div>
                          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2 sm:mt-3 justify-center w-full max-w-[200px]">
                            <button className="bg-[#6b46c1] hover:bg-[#553c9a] text-white text-[10px] sm:text-[12px] font-medium py-1.5 px-2 sm:px-3 rounded-md flex items-center justify-center gap-1 sm:gap-1.5 transition-colors flex-1">
                              <FiShoppingCart size={12} className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> <span className="whitespace-nowrap">Add to Cart</span>
                            </button>
                            <button className="bg-stone-100 hover:bg-stone-200 text-stone-600 p-1.5 rounded-full transition-colors shrink-0">
                              <FiHeart size={12} className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            </button>
                          </div>
                        </div>
                        <div className="w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] mx-auto shrink-0 rounded-[20px] overflow-hidden">
                          <img src="/white-sofa.png" alt="Sofa" className="w-full h-full object-cover" />
                        </div>
                      </div>
                    )}
                    {layout.id === 'left-thumbs-bottom' && (
                      <div className="-mx-5 -mt-5 mb-5 flex gap-3 sm:gap-4 h-auto bg-white p-5 border-b border-stone-100">
                        <div className="w-[35%] sm:w-[40%] rounded-[12px] overflow-hidden shrink-0">
                          <img src="/white-sofa.png" alt="Sofa" className="w-full h-[140px] sm:h-[160px] object-cover" />
                        </div>
                        <div className="w-[65%] sm:w-[60%] flex flex-col justify-center">
                          <h4 className="font-bold text-[16px] sm:text-[20px] text-[#0f172a] leading-tight mb-2">Veteran-336</h4>
                          <div className="flex items-center gap-1 sm:gap-1.5 w-full">
                             <span className="text-stone-500 text-[10px] sm:text-[11px] whitespace-nowrap">Starts from</span>
                             <span className="font-semibold text-[#0f172a] text-[11px] sm:text-[13px] whitespace-nowrap">34,425 BDT</span>
                             <span className="bg-[#e11d48] text-white text-[9px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap shrink-0">EMI 956 BDT</span>
                          </div>
                        </div>
                      </div>
                    )}
                    {layout.id === 'full' && (
                      <div className="-mx-5 -mt-5 mb-5 border-b border-stone-100 overflow-hidden rounded-t-[10px] bg-white pb-5">
                        <div className="w-full aspect-[4/3] sm:aspect-square md:aspect-[4/3] lg:aspect-square bg-stone-50 shrink-0 relative">
                          <img src="/white-sofa.png" alt="Sofa" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col items-center justify-center pt-5 px-4 text-center">
                          <h4 className="font-bold text-[18px] sm:text-[20px] text-[#0f172a] leading-tight">Kounilou-338</h4>
                          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-2">
                            <span className="text-stone-500 text-[13px] sm:text-[14px]">Starts from</span>
                            <span className="font-medium text-slate-700 text-[14px] sm:text-[15px]">34,425 BDT</span>
                            <span className="bg-[#e11d48] text-white text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded">EMI 956 BDT</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}

                <div className="flex gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-0.5 ${isSelected ? 'border-[#6b46c1]' : 'border-stone-300'
                    }`}>
                    {isSelected && <div className="w-2.5 h-2.5 bg-[#6b46c1] rounded-full"></div>}
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 text-sm mb-1">{layout.title}</h3>
                    <p className="text-xs text-stone-500 leading-relaxed">{layout.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Layout Settings */}
          <div className="lg:col-span-1 bg-white rounded-xl p-6 border border-stone-200">
            <h3 className="font-bold text-stone-900 mb-6">Layout Settings</h3>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-stone-700">Content Width</span>
                <select className="text-sm border border-stone-200 rounded-md px-3 py-1.5 bg-white w-32 focus:outline-none focus:border-[#6b46c1]">
                  <option>Wide</option>
                  <option>Standard</option>
                  <option>Narrow</option>
                </select>
              </div>

              {[
                { label: 'Image Width (Desktop)', val: '50 %' },
                { label: 'Image Width (Tablet)', val: '50 %' },
                { label: 'Image Width (Mobile)', val: '100 %', full: true }
              ].map(slider => (
                <div key={slider.label} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-stone-700">{slider.label}</span>
                  <div className="flex items-center gap-3 w-40">
                    <div className="flex-1 h-1 bg-stone-200 rounded-full relative">
                      <div className={`absolute left-0 top-0 bottom-0 bg-[#6b46c1] rounded-full ${slider.full ? 'w-full' : 'w-1/2'}`}></div>
                      <div className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#6b46c1] rounded-full shadow-sm ${slider.full ? 'right-0' : 'left-1/2 -translate-x-1/2'}`}></div>
                    </div>
                    <span className="text-xs text-stone-500 border border-stone-200 rounded px-2 py-1 bg-stone-50 w-12 text-center">{slider.val}</span>
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-stone-700">Vertical Alignment</span>
                <select className="text-sm border border-stone-200 rounded-md px-3 py-1.5 bg-white w-32 focus:outline-none focus:border-[#6b46c1]">
                  <option>Center</option>
                  <option>Top</option>
                  <option>Bottom</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-stone-700">Gap Between Image & Info</span>
                <select className="text-sm border border-stone-200 rounded-md px-3 py-1.5 bg-white w-32 focus:outline-none focus:border-[#6b46c1]">
                  <option>Large</option>
                  <option>Medium</option>
                  <option>Small</option>
                </select>
              </div>
            </div>
          </div>

          {/* Live Preview */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-stone-200 flex flex-col">
            <h3 className="font-bold text-stone-900 mb-6">Live Preview</h3>

            <div className="flex-1 bg-stone-50 rounded-xl p-8 flex gap-8 items-start border border-stone-100">

              {/* Product Images (Left side of preview) */}
              <div className="w-1/2 flex gap-4 h-full">
                {/* Thumbnails */}
                <div className="w-16 flex flex-col gap-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="aspect-square bg-purple-100 rounded-lg flex items-center justify-center opacity-70">
                      <div className="w-8 h-8 bg-purple-300 rounded-sm"></div>
                    </div>
                  ))}
                </div>
                {/* Main Image */}
                <div className="flex-1 bg-purple-100 rounded-xl flex items-center justify-center h-80 relative overflow-hidden">
                  <div className="w-32 h-40 bg-purple-400 rounded-t-xl rounded-b-md relative shadow-lg">
                    <div className="absolute -bottom-2 -left-2 w-4 h-12 bg-purple-600 rounded-full rotate-12"></div>
                    <div className="absolute -bottom-2 -right-2 w-4 h-12 bg-purple-600 rounded-full -rotate-12"></div>
                  </div>
                </div>
              </div>

              {/* Product Info (Right side of preview) */}
              <div className="w-1/2 space-y-5">
                <div>
                  <h1 className="text-2xl font-bold text-stone-900">HATIL Sofa Kounilou-338</h1>
                  <p className="text-xs text-stone-500 mt-1">HCL-201-338-UP-1-ST</p>
                </div>

                <div className="text-2xl font-bold text-[#6b46c1]">34,425 BDT</div>

                <div className="space-y-2">
                  <div className="w-full h-2 bg-stone-200 rounded-full"></div>
                  <div className="w-full h-2 bg-stone-200 rounded-full"></div>
                  <div className="w-3/4 h-2 bg-stone-200 rounded-full"></div>
                </div>

                <div>
                  <div className="text-sm font-medium text-stone-900 mb-2">Color: <span className="font-normal text-stone-500">Yellow</span></div>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded bg-yellow-500 ring-2 ring-white ring-offset-1 border border-yellow-600"></div>
                    <div className="w-8 h-8 rounded bg-green-500 border border-stone-200 opacity-50"></div>
                    <div className="w-8 h-8 rounded bg-stone-200 border border-stone-300 opacity-50"></div>
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-stone-900 mb-2">Quantity:</div>
                  <div className="flex gap-4">
                    <div className="flex items-center border border-stone-200 rounded-lg bg-white">
                      <button className="px-3 py-1.5 text-stone-500 hover:bg-stone-50 rounded-l-lg">-</button>
                      <span className="px-4 py-1.5 font-medium border-x border-stone-200 text-sm">1</span>
                      <button className="px-3 py-1.5 text-stone-500 hover:bg-stone-50 rounded-r-lg">+</button>
                    </div>
                    <button className="flex-1 bg-[#6b46c1] text-white font-medium rounded-lg text-sm hover:bg-[#553c9a] transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>

                <div className="space-y-1 pt-2">
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    Availability: In Stock
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <div className="w-2 h-2 rounded-full bg-stone-300"></div>
                    SKU: HCL-201-338-UP-1-ST
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
