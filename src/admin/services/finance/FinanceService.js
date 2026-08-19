export const FinanceService = {
  getTransactions: async () => [],
  getTransaction: async (id) => ({ id }),
  getPaymentMethods: async () => [],
  updatePaymentMethod: async (id, data) => ({ id, ...data }),
  getRefunds: async () => [],
  requestRefund: async (data) => ({ id: `ref-${Date.now()}`, ...data }),
  approveRefund: async (id) => ({ id, status: 'Approved' }),
  getInvoices: async () => [],
  getCreditNotes: async () => [],
  getPayouts: async () => [],
  getReconciliation: async () => [],
  reconcileTransaction: async (id) => ({ id, status: 'Matched' }),
  getFinancialReports: async () => ({}),
  getFinanceAnalytics: async () => ({})
};

export const PaymentAdapter = {
  initializePayment: async () => ({ success: true }),
  verifyPayment: async () => ({ success: true }),
  capturePaymentPlaceholder: async () => ({ success: true }),
  cancelPaymentPlaceholder: async () => ({ success: true }),
  refundPaymentPlaceholder: async () => ({ success: true })
};

export const RefundAdapter = {
  requestRefund: async () => ({ success: true }),
  approveRefund: async () => ({ success: true }),
  processRefundPlaceholder: async () => ({ success: true }),
  getRefundStatus: async () => ({ status: 'Completed' })
};

export const ReconciliationAdapter = {
  importStatement: async () => ({ success: true }),
  matchTransaction: async () => ({ success: true }),
  markResolved: async () => ({ success: true }),
  getExceptions: async () => []
};
