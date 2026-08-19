export class SEOIntegrationAdapter {
  static async syncSearchConsole() {
    return new Promise(resolve => setTimeout(() => resolve({ success: true, message: 'Sync complete' }), 1000));
  }
}
