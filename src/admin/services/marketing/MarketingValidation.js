export const validateCampaign = (data) => {
  const errors = {};
  if (!data.name) errors.name = 'Campaign name is required';
  if (data.startDate && data.endDate && new Date(data.startDate) > new Date(data.endDate)) {
    errors.endDate = 'End date must be after start date';
  }
  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validatePromotion = (data) => {
  const errors = {};
  if (!data.name) errors.name = 'Promotion name is required';
  if (!data.type) errors.type = 'Promotion type is required';
  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validateCoupon = (data) => {
  const errors = {};
  if (!data.code) errors.code = 'Coupon code is required';
  if (!data.promotionId) errors.promotionId = 'Promotion is required';
  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validateSegment = (data) => {
  const errors = {};
  if (!data.name) errors.name = 'Segment name is required';
  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validateBanner = (data) => {
  const errors = {};
  if (!data.name) errors.name = 'Banner name is required';
  if (!data.placement) errors.placement = 'Placement is required';
  return { isValid: Object.keys(errors).length === 0, errors };
};
