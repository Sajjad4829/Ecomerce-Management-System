import React from 'react';
import { useSettings } from '../../context/settings/SettingsContext';
import { SettingsSection, SettingsCard, SettingsField, SettingsToggle, SettingsInput, SettingsSelect } from '../../components/settings/SettingsShared';

export function CustomerSettings() {
  const { settings, updateSetting } = useSettings();
  
  return (
    <div className="p-8 max-w-4xl">
      <SettingsSection title="Customer Accounts" description="Manage how customers interact with their profiles.">
        <SettingsCard>
          <SettingsField label="Account Creation">
            <SettingsToggle 
              checked={settings.allow_account_creation ?? true} 
              onChange={v => updateSetting('allow_account_creation', v)} 
              label="Allow Registration" 
              description="Customers can create accounts on the storefront." 
            />
          </SettingsField>
        </SettingsCard>
      </SettingsSection>
    </div>
  );
}

export function SystemSettings() {
  const { settings, updateSetting } = useSettings();
  
  return (
    <div className="p-8 max-w-4xl">
      <SettingsSection title="System Settings" description="Global platform configuration.">
        <SettingsCard>
          <SettingsField label="Localization">
            <div className="space-y-4 max-w-md">
              <SettingsSelect 
                value={settings.currency} 
                onChange={v => updateSetting('currency', v)} 
                options={[
                  { label: 'US Dollar (USD)', value: 'USD' },
                  { label: 'Euro (EUR)', value: 'EUR' },
                  { label: 'British Pound (GBP)', value: 'GBP' }
                ]} 
              />
              <SettingsSelect 
                value={settings.timezone} 
                onChange={v => updateSetting('timezone', v)} 
                options={[
                  { label: 'Eastern Time (ET)', value: 'America/New_York' },
                  { label: 'Pacific Time (PT)', value: 'America/Los_Angeles' },
                  { label: 'Universal Coordinated Time (UTC)', value: 'UTC' }
                ]} 
              />
            </div>
          </SettingsField>
        </SettingsCard>
      </SettingsSection>
    </div>
  );
}

export function PlatformSettings() {
  const { settings, updateSetting } = useSettings();
  
  return (
    <div className="p-8 max-w-4xl">
      <SettingsSection title="Platform Settings" description="Configure CMS and Communication defaults.">
        <SettingsCard>
          <SettingsField label="Content Management">
             <SettingsToggle 
              checked={settings.visual_editor_enabled ?? true} 
              onChange={v => updateSetting('visual_editor_enabled', v)} 
              label="Enable Visual Editor" 
              description="Allow staff to use the drag-and-drop page builder." 
            />
          </SettingsField>
        </SettingsCard>
      </SettingsSection>
    </div>
  );
}
