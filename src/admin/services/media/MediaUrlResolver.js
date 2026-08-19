// Mock Media URL Resolver for CDN integration
export class MediaUrlResolver {
  static resolve(asset, format = 'original') {
    if (!asset || !asset.url) return '';
    // In production, this would append CDN transformations (e.g. ?w=800&f=webp)
    return asset.url;
  }
}
