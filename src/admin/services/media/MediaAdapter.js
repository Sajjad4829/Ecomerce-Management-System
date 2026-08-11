// Mock Media Adapter for future S3/Cloudinary integration
export class MediaAdapter {
  constructor(provider = 'local') {
    this.provider = provider;
  }
  
  async upload(file) {
    console.log(`Uploading via ${this.provider}:`, file.name);
    return { url: 'mock_url', id: 'mock_id' };
  }
}
