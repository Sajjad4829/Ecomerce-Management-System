export class AuditAdapter {
  constructor() {
    this.apiBase = '/api/audit';
  }

  // Future integration points for backend
  async fetchEvents(filters = {}) {
    console.log('Fetching events from backend...', filters);
    return Promise.resolve([]);
  }

  async fetchEventDetails(eventId) {
    console.log(`Fetching details for event ${eventId}`);
    return Promise.resolve(null);
  }

  async fetchActorActivity(actorId) {
    console.log(`Fetching activity for actor ${actorId}`);
    return Promise.resolve([]);
  }
}

export const auditAdapter = new AuditAdapter();
