import React from 'react';
import { useSettings } from '../../context/settings/SettingsContext';
import { SettingsSection, SettingsCard, SettingsField, SettingsToggle, SettingsInput } from '../../components/settings/SettingsShared';

export function ShippingSettings() {
  const { settings, updateSetting } = useSettings();
  
  return (
    <div className="p-8 max-w-4xl">
      <SettingsSection title="Shipping & Delivery" description="Configure global shipping zones, rates, and methods.">
        <SettingsCard>
          <SettingsField label="Shipping Methods">
            <SettingsToggle 
              checked={settings.shipping_enabled ?? true} 
              onChange={v => updateSetting('shipping_enabled', v)} 
              label="Enable Shipping" 
              description="Allow customers to select shipping during checkout." 
            />
          </SettingsField>
          
          <div className="pt-4 border-t border-stone-100">
            <SettingsField label="Free Shipping">
              <div className="space-y-4">
                <SettingsToggle 
                  checked={settings.free_shipping_enabled} 
                  onChange={v => updateSetting('free_shipping_enabled', v)} 
                  label="Offer Free Shipping" 
                />
                {settings.free_shipping_enabled && (
                  <SettingsInput 
                    type="number"
                    value={settings.free_shipping_threshold} 
                    onChange={v => updateSetting('free_shipping_threshold', parseFloat(v))} 
                    placeholder="Minimum order amount"
                    description="Customers must spend this amount to qualify for free shipping."
                  />
                )}
              </div>
            </SettingsField>
          </div>
        </SettingsCard>
      </SettingsSection>
    </div>
  );
}

export function ReturnsSettings() {
  const { settings, updateSetting } = useSettings();
  
  return (
    <div className="p-8 max-w-4xl">
      <SettingsSection title="Returns" description="Manage return policies and procedures.">
        <SettingsCard>
          <SettingsField label="Return Policy">
            <SettingsToggle 
              checked={settings.returns_enabled} 
              onChange={v => updateSetting('returns_enabled', v)} 
              label="Accept Returns" 
              description="Allow customers to request returns for their orders." 
            />
          </SettingsField>
          
          {settings.returns_enabled && (
            <div className="pt-4 border-t border-stone-100">
              <SettingsField label="Return Window" description="Number of days customers have to return an item after delivery.">
                <SettingsInput 
                  type="number"
                  value={settings.return_window} 
                  onChange={v => updateSetting('return_window', parseInt(v))} 
                />
              </SettingsField>
              <div className="mt-4">
                <SettingsField label="Return Requirements">
                   <SettingsToggle 
                    checked={settings.return_approval_required} 
                    onChange={v => updateSetting('return_approval_required', v)} 
                    label="Require Approval" 
                    description="Returns must be manually approved by staff before instructions are sent." 
                  />
                </SettingsField>
              </div>
            </div>
          )}
        </SettingsCard>
      </SettingsSection>
    </div>
  );
}
