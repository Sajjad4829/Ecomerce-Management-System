import { FiType, FiLayout, FiBox } from 'react-icons/fi';
import PropertyGroup from './controls/PropertyGroup';
import TextInput from './controls/TextInput';
import SelectControl from './controls/SelectControl';
import RangeControl from './controls/RangeControl';

export default function ProductEditor({ section, onUpdate }) {
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
        <TextInput label="Section Title" value={content.title} onChange={(v) => handleContentChange('title', v)} />
        <TextInput label="Subtitle" value={content.subtitle} onChange={(v) => handleContentChange('subtitle', v)} />
        
        <div className="pt-2 border-t border-black/5 mt-4">
          <SelectControl 
            label="Product Source" 
            value={content.source || 'manual'} 
            onChange={(v) => handleContentChange('source', v)}
            options={[
              { label: 'Manual Selection', value: 'manual' },
              { label: 'Existing Mock Data', value: 'mock' },
              { label: 'By Category', value: 'category' }
            ]}
          />
        </div>
      </PropertyGroup>

      <PropertyGroup title="Layout & Grid" icon={FiLayout}>
        <RangeControl label="Number of Products" value={settings.limit || 4} min={1} max={12} step={1} onChange={(v) => handleSettingsChange('limit', v)} />
        
        <div className="mt-4">
          <SelectControl 
            label="Columns (Desktop)" 
            value={settings.columns || 4} 
            onChange={(v) => handleSettingsChange('columns', Number(v))}
            options={[
              { label: '2 Columns', value: 2 },
              { label: '3 Columns', value: 3 },
              { label: '4 Columns', value: 4 },
              { label: '5 Columns', value: 5 }
            ]}
          />
        </div>

        <div className="mt-4">
          <SelectControl 
            label="Layout Style" 
            value={settings.layout || 'grid'} 
            onChange={(v) => handleSettingsChange('layout', v)}
            options={[
              { label: 'Standard Grid', value: 'grid' },
              { label: 'Carousel / Slider', value: 'carousel' }
            ]}
          />
        </div>
        
        <div className="mt-4">
          <SelectControl 
            label="Card Style" 
            value={settings.cardStyle || 'standard'} 
            onChange={(v) => handleSettingsChange('cardStyle', v)}
            options={[
              { label: 'Standard', value: 'standard' },
              { label: 'Minimal', value: 'minimal' },
              { label: 'Bordered', value: 'bordered' }
            ]}
          />
        </div>
      </PropertyGroup>
    </>
  );
}
