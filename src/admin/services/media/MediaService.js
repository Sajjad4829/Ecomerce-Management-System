// Mock Media Service
export class MediaService {
  static async getAssets() { return []; }
  static async getAsset(id) { return null; }
  static async uploadAsset(file) { return null; }
  static async updateAsset(id, data) { return null; }
  static async moveAsset(id, folderId) { return null; }
  static async archiveAsset(id) { return null; }
  static async restoreAsset(id) { return null; }
  static async getUsage(id) { return []; }
}
