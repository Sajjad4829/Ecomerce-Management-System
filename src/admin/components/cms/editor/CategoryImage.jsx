import React, { useState, useEffect } from 'react';

export default function CategoryImage({ src, alt, categoryName, className = "w-full h-full object-cover" }) {
  const [error, setError] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);
  const [retryCount, setRetryCount] = useState(0);

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'h4bdwdnv';

  useEffect(() => {
    // If the provided src is truthy and not empty, start with it
    if (src) {
      setImgSrc(src);
      setError(false);
      setRetryCount(0);
    } else if (categoryName) {
      // If no src provided but we have a name, construct Cloudinary URLs
      const encodedName = encodeURIComponent(categoryName);
      setImgSrc(`https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/v1/${encodedName}`);
      setError(false);
      setRetryCount(0);
    } else {
      setError(true);
    }
  }, [src, categoryName, cloudName]);

  const handleError = () => {
    if (!categoryName) {
      setError(true);
      return;
    }

    const encodedName = encodeURIComponent(categoryName);
    const slugName = categoryName.toLowerCase().replace(/ /g, '-');
    const slugNameEncoded = encodeURIComponent(slugName);

    if (retryCount === 0) {
      // Try URL-encoded name with .jpg
      setImgSrc(`https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/v1/${encodedName}.jpg`);
      setRetryCount(1);
    } else if (retryCount === 1) {
      // Try URL-encoded name with .png
      setImgSrc(`https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/v1/${encodedName}.png`);
      setRetryCount(2);
    } else if (retryCount === 2) {
      // Try slugified name
      setImgSrc(`https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/v1/${slugNameEncoded}`);
      setRetryCount(3);
    } else if (retryCount === 3) {
      // Try slugified name with .jpg
      setImgSrc(`https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/v1/${slugNameEncoded}.jpg`);
      setRetryCount(4);
    } else if (retryCount === 4) {
      // Try slugified name with .png
      setImgSrc(`https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/v1/${slugNameEncoded}.png`);
      setRetryCount(5);
    } else {
      setError(true);
    }
  };

  if (error) {
    const initials = (categoryName || 'C').substring(0, 2).toUpperCase();
    return (
      <div className={`flex items-center justify-center bg-gray-100 text-gray-400 font-bold tracking-widest ${className}`}>
        {initials}
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={alt || categoryName}
      className={className}
      onError={handleError}
    />
  );
}
