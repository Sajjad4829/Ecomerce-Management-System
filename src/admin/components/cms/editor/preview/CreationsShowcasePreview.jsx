import React from 'react';
import CreationsWithPurpose from '../../../../../storefront/components/home/CreationsWithPurpose';

export default function CreationsShowcasePreview({ section = {} }) {
  const content = section.content || {};
  const settings = section.settings || {};
  return (
    <div className="w-full relative bg-white pointer-events-none select-none">
      <CreationsWithPurpose data={section} />
    </div>
  );
}
