class NotificationService {
  constructor() {
    this.notifications = [
      {
        id: 'notif_1',
        type: 'System',
        title: 'High Resource Usage Detected',
        message: 'Server load exceeded 90% for 5 minutes.',
        priority: 'High',
        status: 'Unread',
        module: 'System',
        entityId: null,
        entityType: null,
        eventId: 'evt_sys_1',
        createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hr ago
      },
      {
        id: 'notif_2',
        type: 'Inventory',
        title: 'Low Stock: Aurora Lounge Chair',
        message: 'Inventory dropped below threshold (5 left).',
        priority: 'Normal',
        status: 'Unread',
        module: 'Inventory',
        entityId: 'SKU-001',
        entityType: 'Product',
        eventId: 'evt_inv_1',
        createdAt: new Date(Date.now() - 7200000).toISOString(), // 2 hrs ago
      }
    ];

    // Simple listeners mechanism
    this.listeners = new Set();
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  _notifyListeners() {
    const data = this.getNotifications();
    this.listeners.forEach(cb => cb(data));
  }

  getNotifications() {
    return [...this.notifications].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  createNotification(payload) {
    // Deduplication check: if there's already an active notification for this exact eventId, ignore
    if (payload.eventId && this.notifications.some(n => n.eventId === payload.eventId)) {
      return null;
    }

    const notification = {
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      type: payload.type || 'System',
      title: payload.title,
      message: payload.message,
      priority: payload.priority || 'Normal',
      status: 'Unread',
      module: payload.module,
      entityId: payload.entityId,
      entityType: payload.entityType,
      eventId: payload.eventId,
      actionUrl: payload.actionUrl,
      createdAt: new Date().toISOString(),
      metadata: payload.metadata || {}
    };

    this.notifications.unshift(notification);
    this._notifyListeners();
    return notification;
  }

  markAsRead(id) {
    const notification = this.notifications.find(n => n.id === id);
    if (notification) {
      notification.status = 'Read';
      notification.readAt = new Date().toISOString();
      this._notifyListeners();
    }
  }

  markAllAsRead() {
    this.notifications.forEach(n => {
      if (n.status === 'Unread') {
        n.status = 'Read';
        n.readAt = new Date().toISOString();
      }
    });
    this._notifyListeners();
  }

  archive(id) {
    const notification = this.notifications.find(n => n.id === id);
    if (notification) {
      notification.status = 'Archived';
      notification.archivedAt = new Date().toISOString();
      this._notifyListeners();
    }
  }
}

export const notificationService = new NotificationService();
