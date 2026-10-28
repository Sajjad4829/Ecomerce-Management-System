import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSettings } from '../../context/settings/SettingsContext';
import { SettingsSection, SettingsCard, SettingsField, SettingsInput, SettingsSelect, SettingsToggle, SettingsImageUpload } from '../../components/settings/SettingsShared';
import { FiImage } from 'react-icons/fi';

export function GeneralSettings() {
  const { settings, updateSetting } = useSettings();
  const navigate = useNavigate();
  
  return (
    <div className="p-8 max-w-4xl">
      <SettingsSection title="Store Information" description="Basic details about your online store.">
        <SettingsCard>
          <SettingsField label="Store Name" description="The public name of your store.">
            <SettingsInput value={settings.store_name || ''} onChange={v => updateSetting('store_name', v)} placeholder="e.g. Aurora Premium Furniture" />
          </SettingsField>
          <SettingsField label="Contact Email" description="The primary email address customers will use to contact you.">
            <SettingsInput type="email" value={settings.store_email || ''} onChange={v => updateSetting('store_email', v)} placeholder="e.g. hello@aurora.com" />
          </SettingsField>
          <SettingsField label="Phone Number" description="Customer support phone number.">
            <SettingsInput type="tel" value={settings.store_phone || ''} onChange={v => updateSetting('store_phone', v)} placeholder="e.g. +1 555 123 4567" />
          </SettingsField>
          <SettingsField label="Store Status" description="Control public access to your storefront.">
            <SettingsSelect 
              value={settings.store_status || 'Open'} 
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

      <SettingsSection title="Admin Dashboard & Account" description="Manage dashboard appearance and administrator credentials.">
        <SettingsCard>
          <SettingsField label="Dashboard Name" description="The name displayed in the top left of the admin sidebar.">
            <SettingsInput value={settings.dashboard_name || ''} onChange={v => updateSetting('dashboard_name', v)} placeholder="e.g. ShopEase" />
          </SettingsField>
          <SettingsField label="Dashboard Logo" description="Upload a custom logo for the admin sidebar.">
            <SettingsImageUpload 
              value={settings.dashboard_logo} 
              onChange={v => updateSetting('dashboard_logo', v)} 
              placeholderIcon={<FiImage size={24} className="text-text-muted" />}
              label="Select Logo"
            />
          </SettingsField>
          
          <div className="pt-6 mt-6 border-t border-gray-100">
            <SettingsField label="Admin Name" description="The display name of the primary administrator account.">
              <SettingsInput value={settings.admin_name || ''} onChange={v => updateSetting('admin_name', v)} placeholder="e.g. Admin User" />
            </SettingsField>
            <SettingsField label="Admin Login Email" description="The email address used to log into the admin dashboard.">
              <SettingsInput type="email" value={settings.admin_username || ''} onChange={v => updateSetting('admin_username', v)} placeholder="e.g. admin@example.com" />
            </SettingsField>
            <SettingsField label="Admin Password" description="The password for the admin account.">
              <SettingsInput type="password" value={settings.admin_password || ''} onChange={v => updateSetting('admin_password', v)} placeholder="Enter new password" />
            </SettingsField>
          </div>
        </SettingsCard>
      </SettingsSection>

      <SettingsSection title="Localization" description="Configure global currency and language for your storefront.">
        <SettingsCard>
          <SettingsField label="System Currency" description="The primary currency used globally for pricing, analytics, and frontend.">
            <SettingsSelect 
              value={settings.currency || 'USD'} 
              onChange={v => {
                updateSetting('currency', v);
                if (v === 'BDT') updateSetting('language', 'bn');
                if (['USD', 'GBP', 'CAD', 'AUD'].includes(v)) updateSetting('language', 'en');
              }} 
              options={[
                { label: 'United States Dollar (USD - $)', value: 'USD' },
                { label: 'Bangladeshi Taka (BDT - ৳)', value: 'BDT' },
                { label: 'Euro (EUR - €)', value: 'EUR' },
                { label: 'British Pound (GBP - £)', value: 'GBP' },
                { label: 'Canadian Dollar (CAD - $)', value: 'CAD' },
                { label: 'Australian Dollar (AUD - $)', value: 'AUD' },
                { label: 'Indian Rupee (INR - ₹)', value: 'INR' },
                { label: 'Japanese Yen (JPY - ¥)', value: 'JPY' },
                { label: 'Chinese Yuan (CNY - ¥)', value: 'CNY' },
                { label: 'Emirati Dirham (AED - د.إ)', value: 'AED' }
              ]} 
            />
          </SettingsField>

          <SettingsField label="Frontend Language" description="The default language presented to customers on the storefront.">
            <SettingsSelect 
              value={settings.language || 'en'} 
              onChange={v => updateSetting('language', v)} 
              options={[
                { label: 'English', value: 'en' },
                { label: 'Bengali (BD)', value: 'bn' },
                { label: 'Spanish', value: 'es' },
                { label: 'French', value: 'fr' },
                { label: 'German', value: 'de' },
                { label: 'Hindi', value: 'hi' },
                { label: 'Arabic', value: 'ar' }
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
            <SettingsImageUpload 
              value={settings.store_logo} 
              onChange={v => updateSetting('store_logo', v)} 
              placeholderIcon={<FiImage size={24} className="text-text-muted" />}
              label="Upload Logo"
            />
          </SettingsField>
          
          <SettingsField label="Favicon" description="Small icon displayed in the browser tab (32x32px recommended).">
            <SettingsImageUpload 
              value={settings.store_favicon} 
              onChange={v => updateSetting('store_favicon', v)} 
              placeholderIcon={<FiImage size={16} className="text-text-muted" />}
              label="Upload Favicon"
            />
          </SettingsField>

          <SettingsField label="Default Social Image (OG Image)" description="The default image shown when your store is shared on social media.">
            <SettingsImageUpload 
              value={settings.store_og_image} 
              onChange={v => updateSetting('store_og_image', v)} 
              placeholderIcon={<FiImage size={24} className="text-text-muted" />}
              label="Upload Image"
            />
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
