import React, { useState } from 'react';
import {
  FiMonitor, FiTablet, FiSmartphone,
  FiGlobe, FiLayout, FiGrid, FiCreditCard, FiShoppingBag,
  FiChevronRight, FiChevronDown, FiType, FiSquare, FiMaximize,
  FiBox, FiHeart, FiShoppingCart, FiArrowRight, FiCheckCircle
} from 'react-icons/fi';
import ProductPageLayout from './ProductPageLayout';
import ProductGalleryLayout from './ProductGalleryLayout';
import FabricLayout from './FabricLayout';
import ProductGridLayout from './ProductGridLayout';

export default function ThemeCustomizer() {
  const [activeTab, setActiveTab] = useState('product-page');
  const [expandedSection, setExpandedSection] = useState('product');

  return (
    <div className="flex h-full w-full bg-stone-50 overflow-hidden font-sans">

      {/* LEFT SIDEBAR */}
      <div className="w-64 bg-white border-r border-stone-200 flex flex-col h-full shrink-0">
        <div className="p-6 border-b border-stone-200">
          <h1 className="text-xl font-bold text-stone-900 tracking-tight">Theme</h1>
          <p className="text-sm text-stone-500">Settings</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">

          {/* Global Styles */}
          <div>
            <div className="flex items-center gap-3 text-xs font-semibold text-stone-500 tracking-wider mb-3 px-2 uppercase">
              <FiGlobe /> Global Styles
            </div>
            <div className="space-y-1">
              {['Colors', 'Typography', 'Buttons', 'Spacing'].map((item, i) => (
                <button key={item} className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-50">
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center text-white ${i === 0 ? 'bg-indigo-600' : i === 1 ? 'bg-blue-500' : i === 2 ? 'bg-green-500' : 'bg-yellow-500'
                      }`}>
                      {i === 0 ? <FiLayout size={12} /> : i === 1 ? <FiType size={12} /> : i === 2 ? <FiSquare size={12} /> : <FiMaximize size={12} />}
                    </div>
                    {item}
                  </div>
                  <FiChevronRight className="text-stone-400" size={16} />
                </button>
              ))}
            </div>
          </div>

          {/* Product Section */}
          <div>
            <div className="flex items-center gap-3 text-xs font-semibold text-stone-500 tracking-wider mb-3 px-2 uppercase">
              <FiBox /> Product
            </div>

            <div className="space-y-1">
              {/* Expandable Product Page */}
              <div className="bg-purple-50 rounded-xl overflow-hidden mb-2">
                <button
                  onClick={() => setExpandedSection(expandedSection === 'product' ? '' : 'product')}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-purple-700"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-md bg-purple-200 flex items-center justify-center text-purple-700">
                      <FiShoppingBag size={12} />
                    </div>
                    Product Page
                  </div>
                  {expandedSection === 'product' ? <FiChevronDown size={16} /> : <FiChevronRight size={16} />}
                </button>

                {expandedSection === 'product' && (
                  <div className="px-5 pb-3 space-y-2.5 relative">
                    <div className="absolute left-6 top-0 bottom-4 w-px bg-purple-200"></div>
                    {['Product Style', 'Product Gallery', 'Fabric'].map((sub, i) => (
                      <button
                        key={sub}
                        onClick={() => {
                          if (sub === 'Product Style') setActiveTab('product-layout');
                          else if (sub === 'Product Gallery') setActiveTab('product-gallery');
                          else if (sub === 'Fabric') setActiveTab('product-fabric');
                          else setActiveTab('main');
                        }}
                        className={`w-full flex items-center gap-3 text-sm font-medium pl-4 relative ${(activeTab === 'product-layout' && sub === 'Product Style') ||
                          (activeTab === 'product-gallery' && sub === 'Product Gallery') ||
                          (activeTab === 'product-fabric' && sub === 'Fabric')
                          ? 'text-purple-700' : 'text-stone-600 hover:text-purple-700'
                          }`}
                      >
                        <div className={`absolute left-[3px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full ${(activeTab === 'product-layout' && sub === 'Product Style') ||
                          (activeTab === 'product-gallery' && sub === 'Product Gallery') ||
                          (activeTab === 'product-fabric' && sub === 'Fabric')
                          ? 'bg-purple-600' : 'bg-purple-400'
                          }`}></div>
                        {sub}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Other product items */}
              {['Product Grid', 'Related Products'].map((item, i) => {
                const tabId = item.toLowerCase().replace(' ', '-');
                return (
                  <button 
                    key={item} 
                    onClick={() => setActiveTab(tabId)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium ${activeTab === tabId ? 'bg-stone-100 text-stone-900' : 'text-stone-700 hover:bg-stone-50'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center text-white ${item === 'Product Grid' ? 'bg-blue-500' : 'bg-rose-500'
                        }`}>
                        {item === 'Product Grid' ? <FiGrid size={12} /> : <FiHeart size={12} />}
                      </div>
                      {item}
                    </div>
                    <FiChevronRight className="text-stone-400" size={16} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Checkout Section */}
          <div>
            <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-50">
              <div className="flex items-center gap-3 text-xs font-semibold text-stone-500 tracking-wider uppercase">
                <div className="w-6 h-6 rounded-md bg-purple-100 flex items-center justify-center text-purple-600">
                  <FiShoppingCart size={12} />
                </div>
                Checkout
              </div>
              <FiChevronRight className="text-stone-400" size={16} />
            </button>
          </div>

        </div>
      </div>

      {/* MAIN CONTENT */}
      {activeTab === 'product-layout' ? (
        <ProductPageLayout onBack={() => setActiveTab('main')} />
      ) : activeTab === 'product-gallery' ? (
        <ProductGalleryLayout onBack={() => setActiveTab('main')} />
      ) : activeTab === 'product-fabric' ? (
        <FabricLayout onBack={() => setActiveTab('main')} />
      ) : activeTab === 'product-grid' ? (
        <ProductGridLayout />
      ) : (
        <div className="flex-1 flex flex-col h-full bg-stone-50 overflow-y-auto">

          {/* Header */}
          <div className="h-20 px-8 flex items-center justify-between shrink-0 sticky top-0 bg-stone-50/90 backdrop-blur-sm z-10">
            <div>
              <h2 className="text-2xl font-bold text-stone-900">Theme Settings</h2>
              <p className="text-sm text-stone-500 mt-1">Customize your store's appearance and layout</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center bg-white border border-stone-200 rounded-lg p-1 shadow-sm">
                <button className="p-2 rounded-md bg-purple-50 text-purple-600"><FiMonitor size={18} /></button>
                <button className="p-2 rounded-md text-stone-400 hover:bg-stone-50"><FiTablet size={18} /></button>
                <button className="p-2 rounded-md text-stone-400 hover:bg-stone-50"><FiSmartphone size={18} /></button>
              </div>

              <button className="flex items-center gap-2 px-6 py-2.5 bg-[#6b46c1] hover:bg-[#553c9a] text-white font-medium rounded-lg shadow-sm transition-colors">
                <FiCheckCircle size={18} /> Save Changes
              </button>
            </div>
          </div>

          {/* Dashboard Cards Area */}
          <div className="p-8 pt-4">

            <div className="grid grid-cols-12 gap-6">

              {/* Global Styles Card */}
              <div className="col-span-12 xl:col-span-5 bg-white rounded-2xl shadow-sm border border-stone-100 p-6 flex flex-col h-[320px]">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white"><FiGlobe size={16} /></div>
                    <div>
                      <h3 className="font-bold text-stone-900 text-sm">Global Styles</h3>
                      <p className="text-xs text-stone-500">Define the global look and feel of your store.</p>
                    </div>
                  </div>
                  <FiArrowRight className="text-stone-400" />
                </div>
                <div className="flex-1 bg-purple-50 rounded-xl p-6 relative flex flex-col justify-center">
                  <div className="text-4xl font-serif text-indigo-600 mb-6 font-bold">Aa</div>
                  <div className="flex gap-2 mb-6">
                    <div className="w-8 h-8 rounded-md bg-indigo-600 shadow-sm"></div>
                    <div className="w-8 h-8 rounded-md bg-blue-500 shadow-sm"></div>
                    <div className="w-8 h-8 rounded-md bg-green-500 shadow-sm"></div>
                    <div className="w-8 h-8 rounded-md bg-yellow-500 shadow-sm"></div>
                    <div className="w-8 h-8 rounded-md bg-white border border-stone-200 shadow-sm"></div>
                    <div className="w-8 h-8 rounded-md bg-stone-200 shadow-sm"></div>
                  </div>
                  <button className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg text-sm w-max shadow-sm">Button</button>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 border-2 border-dashed border-indigo-600 w-12 h-16 flex items-center justify-center">
                    <div className="w-full flex justify-between absolute -top-3"><FiChevronRight className="rotate-180 text-indigo-600" /><FiChevronRight className="text-indigo-600" /></div>
                  </div>
                </div>
              </div>

              {/* Product Card */}
              <div className="col-span-12 xl:col-span-7 bg-white rounded-2xl shadow-sm border border-stone-100 p-6 flex flex-col h-[320px]">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white"><FiBox size={16} /></div>
                    <div>
                      <h3 className="font-bold text-stone-900 text-sm">Product</h3>
                      <p className="text-xs text-stone-500">Customize how your products are displayed.</p>
                    </div>
                  </div>
                  <FiArrowRight className="text-stone-400" />
                </div>

                <div className="flex-1 flex gap-6 items-center">
                  <div className="w-48 h-48 bg-purple-100 rounded-xl flex-shrink-0 flex items-center justify-center relative">
                    <div className="absolute inset-0 m-4 border-2 border-dashed border-white/50 rounded-lg"></div>
                    <div className="text-purple-300 text-6xl"><FiLayout /></div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="w-3/4 h-3 bg-stone-200 rounded-full"></div>
                    <div className="w-full h-2 bg-stone-100 rounded-full"></div>
                    <div className="w-2/3 h-2 bg-stone-100 rounded-full mb-4"></div>
                    <div className="text-xl font-bold text-indigo-600 mb-2">$49.99</div>

                    <div className="flex gap-2 mb-4">
                      <div className="w-6 h-6 rounded-full bg-purple-100 border border-purple-300"></div>
                      <div className="w-6 h-6 rounded-full bg-purple-600 border border-purple-800 ring-2 ring-white ring-offset-1"></div>
                      <div className="w-6 h-6 rounded-full bg-white border border-stone-200"></div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex items-center bg-stone-100 rounded-lg border border-stone-200">
                        <button className="px-3 py-2 text-stone-500">-</button>
                        <span className="px-2 text-sm font-medium">1</span>
                        <button className="px-3 py-2 text-stone-500">+</button>
                      </div>
                      <button className="flex-1 bg-indigo-600 text-white font-medium rounded-lg text-sm shadow-sm hover:bg-indigo-700">Add to Cart</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Grid Card */}
              <div className="col-span-12 md:col-span-6 bg-white rounded-2xl shadow-sm border border-stone-100 p-6 flex flex-col h-[280px]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white"><FiGrid size={16} /></div>
                  <div>
                    <h3 className="font-bold text-stone-900 text-sm">Product Grid</h3>
                    <p className="text-xs text-stone-500 line-clamp-1">Customize the layout of the product listing grid.</p>
                  </div>
                </div>
                <div className="flex-1 bg-stone-50 rounded-xl p-4 flex flex-col gap-4">
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="space-y-2">
                        <div className="aspect-square bg-blue-100 rounded-lg flex items-center justify-center text-blue-300"><FiLayout size={20} /></div>
                        <div className="w-full h-1.5 bg-stone-200 rounded-full"></div>
                        <div className="w-2/3 h-1.5 bg-stone-200 rounded-full"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Related Products Card */}
              <div className="col-span-12 md:col-span-6 bg-white rounded-2xl shadow-sm border border-stone-100 p-6 flex flex-col h-[280px]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center text-white"><FiHeart size={16} /></div>
                  <div>
                    <h3 className="font-bold text-stone-900 text-sm">Related Products</h3>
                    <p className="text-xs text-stone-500 line-clamp-1">Customize the related products section.</p>
                  </div>
                </div>
                <div className="flex-1 flex gap-3 p-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex-1 space-y-2">
                      <div className="aspect-square bg-rose-50 rounded-lg flex items-center justify-center text-rose-300"><FiBox size={24} /></div>
                      <div className="w-full h-1.5 bg-stone-200 rounded-full"></div>
                      <div className="w-2/3 h-1.5 bg-stone-200 rounded-full"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checkout */}
              <div className="col-span-12 bg-white rounded-2xl shadow-sm border border-stone-100 p-6 h-[140px] flex items-center justify-between">
                <div className="flex items-center gap-3 w-1/3">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white"><FiShoppingCart size={20} /></div>
                  <div>
                    <h3 className="font-bold text-stone-900 text-base">Checkout</h3>
                    <p className="text-sm text-stone-500">Customize the checkout experience.</p>
                  </div>
                </div>

                <div className="flex-1 flex items-center justify-between px-12 relative">
                  <div className="absolute left-16 right-16 top-1/2 -translate-y-1/2 h-0.5 bg-stone-200"></div>
                  {['Cart', 'Information', 'Shipping', 'Payment'].map((step, i) => (
                    <div key={step} className="flex flex-col items-center gap-2 relative z-10">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${i === 0 ? 'bg-indigo-600 text-white' : 'bg-white border-2 border-stone-200 text-stone-400'}`}>
                        {i === 0 ? <FiShoppingCart size={14} /> : i === 1 ? <FiLayout size={14} /> : i === 2 ? <FiBox size={14} /> : <FiCreditCard size={14} />}
                      </div>
                      <span className={`text-xs font-medium ${i === 0 ? 'text-stone-900' : 'text-stone-500'}`}>{step}</span>
                    </div>
                  ))}
                </div>

                <FiChevronRight className="text-stone-400 ml-8" size={24} />
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
