import { FiType, FiLayout, FiImage } from 'react-icons/fi';
import PropertyGroup from './controls/PropertyGroup';
import TextInput from './controls/TextInput';
import TextArea from './controls/TextArea';
import ImageSelectControl from './controls/ImageSelectControl';
import SelectControl from './controls/SelectControl';
import ToggleControl from './controls/ToggleControl';
import RangeControl from './controls/RangeControl';

export default function HeroEditor({ section, onUpdate }) {
  const content = section.content || {};
  const settings = section.settings || {};

  const handleContentChange = (key, value) => {
    onUpdate({ content: { ...content, [key]: value } });
  };

  const handleSettingsChange = (key, value) => {
    onUpdate({ settings: { ...settings, [key]: value } });
  };

  return (
    <>
      <PropertyGroup title="Content" icon={FiType} defaultOpen={true}>
        <TextInput label="Heading" value={content.heading} onChange={(v) => handleContentChange('heading', v)} />
        <TextInput label="Subtitle" value={content.subtitle} onChange={(v) => handleContentChange('subtitle', v)} />
        <TextArea label="Description" value={content.description} onChange={(v) => handleContentChange('description', v)} />
        
        <div className="grid grid-cols-2 gap-4">
          <TextInput label="Primary CTA" value={content.primaryCtaText} onChange={(v) => handleContentChange('primaryCtaText', v)} />
          <TextInput label="Link" value={content.primaryCtaLink} onChange={(v) => handleContentChange('primaryCtaLink', v)} />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <TextInput label="Secondary CTA" value={content.secondaryCtaText} onChange={(v) => handleContentChange('secondaryCtaText', v)} />
          <TextInput label="Link" value={content.secondaryCtaLink} onChange={(v) => handleContentChange('secondaryCtaLink', v)} />
        </div>

        <ImageSelectControl label="Background Image" value={content.image} onChange={(v) => handleContentChange('image', v)} />
      </PropertyGroup>

      <PropertyGroup title="Layout & Appearance" icon={FiLayout}>
        <SelectControl 
          label="Alignment" 
          value={settings.alignment || 'center'} 
          onChange={(v) => handleSettingsChange('alignment', v)}
          options={[
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' }
          ]}
        />
        <SelectControl 
          label="Height" 
          value={settings.height || 'h-screen'} 
          onChange={(v) => handleSettingsChange('height', v)}
          options={[
            { label: 'Full Screen', value: 'h-screen' },
            { label: 'Large (600px)', value: 'h-[600px]' },
            { label: 'Medium (400px)', value: 'h-[400px]' }
          ]}
        />
        <div className="pt-2 border-t border-black/5 mt-4">
          <ToggleControl label="Enable Overlay" checked={settings.overlay} onChange={(v) => handleSettingsChange('overlay', v)} />
          {settings.overlay && (
            <div className="mt-4">
              <RangeControl label="Overlay Opacity" value={settings.overlayOpacity || 50} onChange={(v) => handleSettingsChange('overlayOpacity', v)} />
            </div>
          )}
        </div>
      </PropertyGroup>
    </>
  );
}
