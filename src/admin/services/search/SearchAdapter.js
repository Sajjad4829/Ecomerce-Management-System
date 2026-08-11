// Mock Search Adapter for future Elasticsearch/Algolia integration
export class SearchAdapter {
  constructor(provider = 'internal') {
    this.provider = provider;
  }
  
  async executeQuery(queryObject) {
    console.log(`Executing via ${this.provider}:`, queryObject);
    return { results: [], total: 0 };
  }
}
