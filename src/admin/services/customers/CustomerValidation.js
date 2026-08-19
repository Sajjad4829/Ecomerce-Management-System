export const validateCustomer = (customer) => {
  const errors = {};
  if (!customer.firstName?.trim()) errors.firstName = 'First name is required';
  if (!customer.lastName?.trim()) errors.lastName = 'Last name is required';
  if (!customer.email?.trim() || !/\S+@\S+\.\S+/.test(customer.email)) {
    errors.email = 'Valid email is required';
  }
  if (!customer.status) errors.status = 'Status is required';
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
