import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCommand, FiSearch, FiPlus, FiBox, FiUsers, FiShoppingCart, FiSettings, FiFileText, FiTag, FiBarChart2, FiArrowRight, FiLayers } from 'react-icons/fi';
import { useGlobalSearch } from '../../context/search/GlobalSearchContext';

export default function CommandCenter() {
  const navigate = useNavigate();
  const { openOverlay } = useGlobalSearch();

  const commandGroups = [
    {
      title: "Create & Add",
      items: [
        { name: "New Product", description: "Add a new item to catalog", icon: FiBox, action: "/admin/catalog/products/new" },
        { name: "New Category", description: "Organize products", icon: FiLayers, action: "/admin/catalog/categories" }, // Mock
        { name: "New Order", description: "Create a manual order", icon: FiShoppingCart, action: "/admin/orders/new" },
        { name: "New Promotion", description: "Set up a marketing campaign", icon: FiTag, action: "/admin/marketing/promotions/new" },
        { name: "New CMS Page", description: "Create storefront content", icon: FiFileText, action: "/admin/cms/pages/new" }
      ]
    },
    {
      title: "Manage & View",
      items: [
        { name: "Inventory", description: "Check stock levels", icon: FiBox, action: "/admin/inventory" },
        { name: "Customers", description: "View customer profiles", icon: FiUsers, action: "/admin/customers" },
        { name: "Analytics", description: "Store performance", icon: FiBarChart2, action: "/admin/analytics" },
        { name: "Global Settings", description: "Platform configuration", icon: FiSettings, action: "/admin/settings" }
      ]
    }
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-10 text-center">
        <div className="w-16 h-16 bg-stone-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-stone-900/10">
          <FiCommand size={32} />
        </div>
        <h1 className="text-4xl font-light text-[#1A1A1A] tracking-wide mb-4">Command Center</h1>
        <p className="text-stone-500 max-w-lg mx-auto">
          Welcome to the enterprise control hub. Access any module, create resources, and search your entire platform from one place.
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-16">
        <button 
          onClick={openOverlay}
          className="w-full bg-white border border-stone-200 p-4 rounded-2xl shadow-sm flex items-center justify-between text-stone-500 hover:border-stone-300 hover:shadow-md transition-all group"
        >
          <div className="flex items-center gap-3">
            <FiSearch className="text-xl group-hover:text-stone-900 transition-colors" />
            <span className="text-lg">Type a command or search...</span>
          </div>
          <div className="flex items-center gap-1 font-mono text-sm bg-stone-100 px-2.5 py-1 rounded-lg border border-stone-200">
            <span>⌘</span><span>K</span>
          </div>
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {commandGroups.map((group, idx) => (
          <div key={idx}>
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-widest mb-6 border-b border-stone-100 pb-2">{group.title}</h3>
            <div className="grid gap-3">
              {group.items.map((item, i) => (
                <button
                  key={i}
                  onClick={() => navigate(item.action)}
                  className="bg-white border border-stone-100 p-4 rounded-xl flex items-center justify-between group hover:border-stone-300 hover:shadow-sm transition-all text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-stone-50 flex items-center justify-center text-stone-600 group-hover:bg-stone-900 group-hover:text-white transition-colors">
                      <item.icon />
                    </div>
                    <div>
                      <div className="font-bold text-stone-900">{item.name}</div>
                      <div className="text-sm text-stone-500">{item.description}</div>
                    </div>
                  </div>
                  <FiArrowRight className="text-stone-300 group-hover:text-stone-900 transition-colors transform group-hover:translate-x-1" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Temporary FiLayers for the mock above, let's fix it by adding it directly
