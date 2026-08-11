export const validateReview = (data) => {
  const errors = {};
  if (!data.productId) errors.productId = 'Product is required';
  if (!data.customerId) errors.customerId = 'Customer is required';
  if (!data.rating || data.rating < 1 || data.rating > 5) errors.rating = 'Rating must be between 1 and 5';
  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validateReviewResponse = (data) => {
  const errors = {};
  if (!data.response) errors.response = 'Response content is required';
  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validateQuestion = (data) => {
  const errors = {};
  if (!data.productId) errors.productId = 'Product is required';
  if (!data.question) errors.question = 'Question content is required';
  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validateQuestionResponse = (data) => {
  const errors = {};
  if (!data.answer) errors.answer = 'Answer content is required';
  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validateReport = (data) => {
  const errors = {};
  if (!data.reason) errors.reason = 'Report reason is required';
  return { isValid: Object.keys(errors).length === 0, errors };
};
