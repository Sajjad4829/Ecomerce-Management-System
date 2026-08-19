import React from 'react';
import { useSettings } from '../../context/settings/SettingsContext';
import { SettingsSection, SettingsCard, SettingsField, SettingsToggle, SettingsInput, SettingsSelect } from '../../components/settings/SettingsShared';

export function CatalogSettings() {
  const { settings, updateSetting } = useSettings();
  
  return (
    <div className="p-8 max-w-4xl">
      <SettingsSection title="Catalog Settings" description="Configure how your products and collections are managed and displayed.">
        <SettingsCard>
          <SettingsField label="Product Identifiers">
            <SettingsToggle 
              checked={settings.sku_required} 
              onChange={v => updateSetting('sku_required', v)} 
              label="Require SKU" 
              description="Make SKU a mandatory field when creating or editing products." 
            />
          </SettingsField>
          
          <div className="pt-4 border-t border-stone-100">
            <SettingsField label="Default Sorting">
              <SettingsSelect 
                value={settings.catalog_sorting} 
                onChange={v => updateSetting('catalog_sorting', v)} 
                options={[
                  { label: 'Newest First', value: 'newest' },
                  { label: 'Price: Low to High', value: 'price_asc' },
                  { label: 'Price: High to Low', value: 'price_desc' },
                  { label: 'Alphabetical: A-Z', value: 'name_asc' }
                ]} 
              />
            </SettingsField>
          </div>
          
          <div className="pt-4 border-t border-stone-100">
            <SettingsField label="Customer Engagement">
              <div className="space-y-4">
                <SettingsToggle 
                  checked={settings.reviews_enabled} 
                  onChange={v => updateSetting('reviews_enabled', v)} 
                  label="Enable Product Reviews" 
                  description="Allow customers to leave reviews on product pages." 
                />
                <SettingsToggle 
                  checked={settings.wishlist_enabled} 
                  onChange={v => updateSetting('wishlist_enabled', v)} 
                  label="Enable Wishlist" 
                  description="Allow customers to save products to their wishlist." 
                />
              </div>
            </SettingsField>
          </div>
        </SettingsCard>
      </SettingsSection>
    </div>
  );
}

export function CheckoutSettings() {
  const { settings, updateSetting } = useSettings();
  
  return (
    <div className="p-8 max-w-4xl">
      <SettingsSection title="Orders & Checkout" description="Control the checkout experience and order processing rules.">
        <SettingsCard>
          <SettingsField label="Customer Accounts">
            <SettingsSelect 
              value={settings.guest_checkout ? 'optional' : 'required'} 
              onChange={v => updateSetting('guest_checkout', v === 'optional')} 
              options={[
                { label: 'Accounts are optional (Guest checkout allowed)', value: 'optional' },
                { label: 'Accounts are required', value: 'required' }
              ]} 
            />
          </SettingsField>
          
          <div className="pt-4 border-t border-stone-100">
            <SettingsField label="Form Options">
              <div className="space-y-4">
                <SettingsToggle 
                  checked={settings.require_phone} 
                  onChange={v => updateSetting('require_phone', v)} 
                  label="Require Phone Number" 
                  description="Make phone number mandatory during checkout." 
                />
                <SettingsToggle 
                  checked={settings.order_notes} 
                  onChange={v => updateSetting('order_notes', v)} 
                  label="Order Notes" 
                  description="Allow customers to add notes to their order." 
                />
              </div>
            </SettingsField>
          </div>
          
          <div className="pt-4 border-t border-stone-100">
            <SettingsField label="Order Processing">
              <SettingsInput 
                value={settings.order_prefix || '#'} 
                onChange={v => updateSetting('order_prefix', v)} 
                placeholder="e.g. #" 
                description="Prefix added to all order numbers."
              />
            </SettingsField>
          </div>
        </SettingsCard>
      </SettingsSection>
    </div>
  );
}

export function InventorySettings() {
  const { settings, updateSetting } = useSettings();
  
  return (
    <div className="p-8 max-w-4xl">
      <SettingsSection title="Inventory" description="Manage stock tracking and availability rules.">
        <SettingsCard>
          <SettingsField label="Inventory Tracking">
            <SettingsToggle 
              checked={settings.inventory_tracking} 
              onChange={v => updateSetting('inventory_tracking', v)} 
              label="Track Inventory Levels" 
              description="Automatically decrease stock levels when orders are placed." 
            />
          </SettingsField>
          
          <div className="pt-4 border-t border-stone-100">
            <SettingsField label="Out of Stock Behavior">
              <SettingsSelect 
                value={settings.out_of_stock_behavior} 
                onChange={v => updateSetting('out_of_stock_behavior', v)} 
                options={[
                  { label: 'Stop selling when out of stock', value: 'stop' },
                  { label: 'Allow backorders', value: 'backorder' },
                  { label: 'Hide out of stock products', value: 'hide' }
                ]} 
              />
            </SettingsField>
          </div>
          
          <div className="pt-4 border-t border-stone-100">
            <SettingsField label="Low Stock Threshold" description="Notify when a product's stock reaches this level.">
              <SettingsInput 
                type="number"
                value={settings.low_stock_threshold} 
                onChange={v => updateSetting('low_stock_threshold', parseInt(v))} 
              />
            </SettingsField>
          </div>
        </SettingsCard>
      </SettingsSection>
    </div>
  );
}
