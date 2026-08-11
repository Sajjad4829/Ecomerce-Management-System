import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSettings } from '../../context/settings/SettingsContext';
import { SettingsSection, SettingsCard, SettingsField, SettingsInput, SettingsSelect, SettingsToggle } from '../../components/settings/SettingsShared';
import { FiImage } from 'react-icons/fi';

export function GeneralSettings() {
  const { settings, updateSetting } = useSettings();
  
  return (
    <div className="p-8 max-w-4xl">
      <SettingsSection title="Store Information" description="Basic details about your online store.">
        <SettingsCard>
          <SettingsField label="Store Name" description="The public name of your store.">
            <SettingsInput value={settings.store_name} onChange={v => updateSetting('store_name', v)} placeholder="e.g. Aurora Premium Furniture" />
          </SettingsField>
          <SettingsField label="Contact Email" description="The primary email address customers will use to contact you.">
            <SettingsInput type="email" value={settings.store_email} onChange={v => updateSetting('store_email', v)} placeholder="e.g. hello@aurora.com" />
          </SettingsField>
          <SettingsField label="Phone Number" description="Customer support phone number.">
            <SettingsInput type="tel" value={settings.store_phone} onChange={v => updateSetting('store_phone', v)} placeholder="e.g. +1 555 123 4567" />
          </SettingsField>
          <SettingsField label="Store Status" description="Control public access to your storefront.">
            <SettingsSelect 
              value={settings.store_status} 
              onChange={v => updateSetting('store_status', v)} 
              options={[
                { label: 'Open (Live)', value: 'Open' },
                { label: 'Maintenance Mode', value: 'Maintenance' },
                { label: 'Closed', value: 'Closed' }
              ]} 
            />
          </SettingsField>
        </SettingsCard>
      </SettingsSection>
    </div>
  );
}

export function BrandingSettings() {
  const { settings, updateSetting } = useSettings();
  
  return (
    <div className="p-8 max-w-4xl">
      <SettingsSection title="Branding" description="Manage your store's visual identity.">
        <SettingsCard>
          <SettingsField label="Primary Logo" description="Used on your storefront header and transactional emails.">
            <div className="flex items-center gap-4">
              <div className="w-32 h-16 bg-stone-100 border border-stone-200 rounded-lg flex items-center justify-center text-stone-400">
                <FiImage size={24} />
              </div>
              <button className="px-4 py-2 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-800 transition-colors">
                Select from Media
              </button>
            </div>
          </SettingsField>
          
          <SettingsField label="Favicon" description="Small icon displayed in the browser tab (32x32px recommended).">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-stone-100 border border-stone-200 rounded-lg flex items-center justify-center text-stone-400">
                <FiImage size={16} />
              </div>
              <button className="px-4 py-2 bg-stone-100 text-stone-700 text-sm font-medium rounded-lg hover:bg-stone-200 transition-colors">
                Select
              </button>
            </div>
          </SettingsField>

          <SettingsField label="Default Social Image (OG Image)" description="The default image shown when your store is shared on social media.">
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-stone-100 text-stone-700 text-sm font-medium rounded-lg hover:bg-stone-200 transition-colors">
                Select from Media
              </button>
            </div>
          </SettingsField>
        </SettingsCard>
      </SettingsSection>
    </div>
  );
}

export function BusinessSettings() {
  const { settings, updateSetting } = useSettings();
  
  return (
    <div className="p-8 max-w-4xl">
      <SettingsSection title="Business Information" description="Legal and operational business details.">
        <SettingsCard>
          <SettingsField label="Legal Business Name" description="Used for billing and legal documents.">
            <SettingsInput value={settings.legal_name || ''} onChange={v => updateSetting('legal_name', v)} placeholder="e.g. Aurora Holdings LLC" />
          </SettingsField>
          <SettingsField label="Business Registration Number" description="Tax ID or VAT number.">
            <SettingsInput value={settings.tax_id || ''} onChange={v => updateSetting('tax_id', v)} placeholder="" />
          </SettingsField>
          <div className="pt-4 border-t border-stone-100">
            <SettingsField label="Business Address" description="Your primary operating address.">
              <div className="space-y-3 max-w-md">
                <SettingsInput value={settings.address_1 || ''} onChange={v => updateSetting('address_1', v)} placeholder="Address Line 1" />
                <SettingsInput value={settings.address_2 || ''} onChange={v => updateSetting('address_2', v)} placeholder="Apartment, suite, etc." />
                <div className="flex gap-3">
                  <SettingsInput value={settings.city || ''} onChange={v => updateSetting('city', v)} placeholder="City" />
                  <SettingsInput value={settings.zip || ''} onChange={v => updateSetting('zip', v)} placeholder="Postal Code" />
                </div>
                <SettingsSelect 
                  value={settings.country || 'US'} 
                  onChange={v => updateSetting('country', v)} 
                  options={[
                    { label: 'United States', value: 'US' },
                    { label: 'Canada', value: 'CA' },
                    { label: 'United Kingdom', value: 'UK' }
                  ]} 
                />
              </div>
            </SettingsField>
          </div>
        </SettingsCard>
      </SettingsSection>
    </div>
  );
}
