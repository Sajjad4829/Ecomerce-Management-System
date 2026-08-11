// Placeholder for future shipping provider integrations
export class ShippingAdapter {
  async getRates(origin, destination, weight) {
    return [];
  }
  
  async createLabel(shipmentId) {
    return { labelUrl: '#', trackingNumber: 'MOCK-TRACK-123' };
  }
}
