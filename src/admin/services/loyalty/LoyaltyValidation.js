export const validateTier = (data) => {
  const errors = {};
  if (!data.name) errors.name = 'Tier Name is required';
  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validatePointAdjustment = (data) => {
  const errors = {};
  if (!data.customerId) errors.customerId = 'Customer is required';
  if (!data.points || data.points <= 0) errors.points = 'Points must be greater than zero';
  if (!data.reason) errors.reason = 'Reason is required';
  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validateReward = (data) => {
  const errors = {};
  if (!data.name) errors.name = 'Reward Name is required';
  if (!data.pointsCost || data.pointsCost <= 0) errors.pointsCost = 'Points Cost must be greater than zero';
  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validateRedemption = (data) => {
  const errors = {};
  if (!data.customerId) errors.customerId = 'Customer is required';
  if (!data.rewardId) errors.rewardId = 'Reward is required';
  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validateRule = (data) => {
  const errors = {};
  if (!data.name) errors.name = 'Rule Name is required';
  if (!data.trigger) errors.trigger = 'Trigger is required';
  if (!data.points || data.points <= 0) errors.points = 'Points must be greater than zero';
  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validateReferralSettings = (data) => {
  const errors = {};
  if (!data.referrerReward) errors.referrerReward = 'Referrer reward is required';
  return { isValid: Object.keys(errors).length === 0, errors };
};
