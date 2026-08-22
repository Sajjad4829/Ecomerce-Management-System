/**
 * Resolves a responsive property using cascading fallback logic.
 * Mobile -> Tablet -> Desktop -> Default
 */
export const getResponsiveValue = (section, property, currentDevice) => {
  const responsive = section?.responsive || {};
  const settings = section?.settings || {};

  // Check mobile first if we are on mobile
  if (currentDevice === 'mobile' && responsive.mobile && responsive.mobile[property] !== undefined) {
    return responsive.mobile[property];
  }

  // Check tablet if we are on mobile or tablet
  if ((currentDevice === 'mobile' || currentDevice === 'tablet') && responsive.tablet && responsive.tablet[property] !== undefined) {
    return responsive.tablet[property];
  }

  // Check desktop
  if (responsive.desktop && responsive.desktop[property] !== undefined) {
    return responsive.desktop[property];
  }

  // Fallback to standard settings
  if (settings[property] !== undefined) {
    return settings[property];
  }
  
  return null;
};
