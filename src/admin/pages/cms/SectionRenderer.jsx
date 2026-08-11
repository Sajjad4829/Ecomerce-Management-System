import React from 'react';

// Example of a reusable section renderer that would be used both in CMS preview and frontend
export const SectionRenderer = ({ section }) => {
  switch (section.type) {
    case 'Hero':
      return (
        <div className="relative bg-neutral-900 text-white flex items-center justify-center min-h-[500px]">
          <div className="text-center space-y-6 z-10 px-4">
            <h1 className="text-5xl font-serif">{section.content?.heading || 'Hero Heading'}</h1>
            <p className="text-xl max-w-2xl mx-auto text-neutral-300">{section.content?.subtitle || 'Hero subtitle text'}</p>
            {section.content?.cta && (
              <button className="px-8 py-3 bg-white text-neutral-900 font-medium rounded hover:bg-neutral-100">
                {section.content.cta}
              </button>
            )}
          </div>
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 z-0"></div>
          {/* Placeholder for background image */}
          {section.content?.backgroundImage && (
            <div className="absolute inset-0 z-[-1] opacity-50 bg-cover bg-center" style={{ backgroundImage: `url(${section.content.backgroundImage})` }}></div>
          )}
        </div>
      );
    case 'Banner':
      return (
        <div className="bg-indigo-600 text-white p-12 text-center">
          <h2 className="text-3xl font-serif mb-4">{section.content?.heading || 'Banner Heading'}</h2>
          <p className="mb-6">{section.content?.description || 'Banner description'}</p>
          <button className="px-6 py-2 border border-white rounded hover:bg-indigo-700">
            {section.content?.cta || 'Learn More'}
          </button>
        </div>
      );
    case 'Text':
      return (
        <div className={`py-16 px-4 max-w-4xl mx-auto text-${section.layout?.alignment || 'left'}`}>
          <h2 className="text-3xl font-serif text-neutral-900 mb-6">{section.content?.heading || 'Heading'}</h2>
          <div className="text-neutral-600 space-y-4">
            {section.content?.text || <p>Text content placeholder.</p>}
          </div>
        </div>
      );
    case 'ImageText':
      return (
        <div className="py-16 px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className={`h-80 bg-neutral-200 rounded ${section.layout?.imagePosition === 'right' ? 'md:order-2' : ''}`}></div>
          <div className="space-y-6">
            <h2 className="text-3xl font-serif text-neutral-900">{section.content?.heading || 'Heading'}</h2>
            <p className="text-neutral-600">{section.content?.description || 'Description text goes here.'}</p>
            <button className="px-6 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800">{section.content?.cta || 'Action'}</button>
          </div>
        </div>
      );
    case 'CardGrid':
      return (
        <div className="py-16 px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-neutral-900 mb-4">{section.content?.heading || 'Grid Heading'}</h2>
            <p className="text-neutral-600">{section.content?.description || 'Grid description'}</p>
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-${section.layout?.columns || 3} gap-8`}>
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-sm">
                <div className="h-48 bg-neutral-100"></div>
                <div className="p-6">
                  <h3 className="font-medium text-lg mb-2">Card Title {i}</h3>
                  <p className="text-sm text-neutral-600 mb-4">Card description placeholder text.</p>
                  <a href="#" className="text-indigo-600 font-medium text-sm hover:underline">Read more</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    case 'Gallery':
      return (
        <div className="py-16 px-8 max-w-7xl mx-auto">
          <div className={`grid grid-cols-2 md:grid-cols-${section.layout?.columns || 4} gap-${section.layout?.gap || 4}`}>
             {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
               <div key={i} className="aspect-square bg-neutral-200 rounded"></div>
             ))}
          </div>
        </div>
      );
    default:
      return (
        <div className="py-12 px-8 border-2 border-dashed border-neutral-300 text-center text-neutral-500 bg-neutral-50 m-4 rounded">
          Unknown Section Type: {section.type}
        </div>
      );
  }
};
