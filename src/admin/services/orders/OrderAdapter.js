export class OrderAdapter {
  constructor(client) {
    this.client = client;
  }
  
  toDomain(apiOrder) {
    return {
      id: apiOrder.id,
      customerId: apiOrder.customer_id,
      status: apiOrder.status,
      paymentStatus: apiOrder.payment_status,
      fulfillmentStatus: apiOrder.fulfillment_status,
      total: apiOrder.total,
      createdAt: apiOrder.created_at,
    };
  }

  toApi(domainOrder) {
    return {
      status: domainOrder.status,
    };
  }
}
