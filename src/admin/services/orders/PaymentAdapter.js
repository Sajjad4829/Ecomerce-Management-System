// Placeholder for future payment gateway integrations
export class PaymentAdapter {
  async capturePayment(transactionId, amount) {
    console.log(`Mock capturing payment for ${transactionId}: ${amount}`);
    return { status: 'success', transactionId };
  }
  
  async refundPayment(transactionId, amount) {
    console.log(`Mock refunding payment for ${transactionId}: ${amount}`);
    return { status: 'success', transactionId };
  }
}
