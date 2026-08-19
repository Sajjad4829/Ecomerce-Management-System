export class CustomerAdapter {
  constructor(client) {
    this.client = client;
  }
  
  toDomain(apiCustomer) {
    return {
      id: apiCustomer.id,
      firstName: apiCustomer.first_name,
      lastName: apiCustomer.last_name,
      email: apiCustomer.email,
      phone: apiCustomer.phone,
      status: apiCustomer.status,
      joinedAt: apiCustomer.created_at,
    };
  }

  toApi(domainCustomer) {
    return {
      first_name: domainCustomer.firstName,
      last_name: domainCustomer.lastName,
      email: domainCustomer.email,
      phone: domainCustomer.phone,
      status: domainCustomer.status,
    };
  }
}
