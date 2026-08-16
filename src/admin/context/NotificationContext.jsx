import React, { createContext, useContext, useState, useCallback } from 'react';

import { notificationService } from '../services/notification/NotificationService';
import { useEffect } from 'react';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(notificationService.getNotifications());

  useEffect(() => {
    const unsubscribe = notificationService.subscribe((data) => {
      setNotifications(data);
    });
    return unsubscribe;
  }, []);

  const [templates, setTemplates] = useState([
    {
      id: 'tpl_1',
      name: 'Order Confirmation',
      event: 'order_confirmed',
      channel: 'Email',
      audience: 'Customer',
      subject: 'Order Confirmation #{{orderNumber}}',
      message: 'Thank you for your order, {{customerName}}! Your order status is {{orderStatus}}.',
      variables: ['orderNumber', 'customerName', 'orderStatus'],
      status: 'Active',
      updatedAt: '2026-08-01T10:00:00Z'
    },
    {
      id: 'tpl_2',
      name: 'Low Stock Alert',
      event: 'inventory_low',
      channel: 'In-App',
      audience: 'Staff',
      subject: 'Low Stock: {{productName}}',
      message: 'Product {{productName}} has dropped below threshold. Quantity remaining: {{quantity}}.',
      variables: ['productName', 'quantity'],
      status: 'Active',
      updatedAt: '2026-08-02T14:00:00Z'
    }
  ]);

  const [rules, setRules] = useState([
    {
      id: 'rule_1',
      name: 'Low Stock Alert Rule',
      event: 'inventory_low',
      conditions: 'Quantity < Threshold',
      template: 'tpl_2',
      channel: 'In-App',
      audience: 'Inventory Manager',
      status: 'Active',
      lastTriggered: '2026-08-09T07:30:00Z'
    }
  ]);

  const [preferences, setPreferences] = useState([
    { category: 'Orders', channels: { 'In-App': true, Email: true, SMS: false, Push: false } },
    { category: 'Inventory', channels: { 'In-App': true, Email: false, SMS: false, Push: true } },
    { category: 'CMS', channels: { 'In-App': true, Email: false, SMS: false, Push: false } },
    { category: 'Marketing', channels: { 'In-App': true, Email: true, SMS: false, Push: false } },
    { category: 'Security', channels: { 'In-App': true, Email: true, SMS: true, Push: true } },
    { category: 'System', channels: { 'In-App': true, Email: true, SMS: false, Push: true } },
  ]);

  const [communicationLogs, setCommunicationLogs] = useState([
    {
      id: 'log_1',
      recipient: 'sarah.jenkins@example.com',
      channel: 'Email',
      template: 'Order Confirmation',
      event: 'order_confirmed',
      subject: 'Order Confirmation #ORD-1092',
      message: 'Thank you for your order, Sarah! Your order status is Processing.',
      status: 'Sent',
      source: 'System Automation',
      createdAt: '2026-08-09T08:15:00Z',
      sentAt: '2026-08-09T08:15:02Z',
    },
    {
      id: 'log_2',
      recipient: '+1234567890',
      channel: 'SMS',
      template: 'Shipping Update',
      event: 'order_shipped',
      subject: '',
      message: 'Your Aurora order #ORD-1090 has shipped! Tracking: TRK901239',
      status: 'Delivered',
      source: 'System Automation',
      createdAt: '2026-08-08T14:00:00Z',
      sentAt: '2026-08-08T14:00:05Z',
    }
  ]);

  const [campaigns, setCampaigns] = useState([
    {
      id: 'camp_1',
      name: 'Summer Sale Announcement',
      audience: 'VIP Customers',
      channel: 'Email',
      template: 'Summer Sale Promo',
      status: 'Completed',
      schedule: '2026-06-01T09:00:00Z',
      updatedAt: '2026-06-01T09:00:00Z'
    },
    {
      id: 'camp_2',
      name: 'Autumn Collection Preview',
      audience: 'All Newsletter Subscribers',
      channel: 'Email',
      template: 'Autumn Preview',
      status: 'Scheduled',
      schedule: '2026-09-01T10:00:00Z',
      updatedAt: '2026-08-05T11:00:00Z'
    }
  ]);

  const [scheduledMessages, setScheduledMessages] = useState([
    {
      id: 'sch_1',
      message: 'Autumn Collection Preview',
      audience: 'All Newsletter Subscribers',
      channel: 'Email',
      schedule: '2026-09-01T10:00:00Z',
      status: 'Scheduled'
    }
  ]);

  const getUnreadCount = useCallback(() => {
    return notifications.filter(n => n.status === 'Unread').length;
  }, [notifications]);

  const markAsRead = (id) => notificationService.markAsRead(id);
  const markAllAsRead = () => notificationService.markAllAsRead();
  const archiveNotification = (id) => notificationService.archive(id);

  const getNotification = (id) => notifications.find(n => n.id === id);

  const updatePreferences = (newPrefs) => setPreferences(newPrefs);

  const value = useMemo(() => ({
    notifications,
    templates,
    rules,
    preferences,
    communicationLogs,
    campaigns,
    scheduledMessages,
    getUnreadCount,
    markAsRead,
    markAllAsRead,
    archiveNotification,
    getNotification,
    updatePreferences
  }), [notifications, templates, rules, preferences, communicationLogs, campaigns, scheduledMessages, getUnreadCount, markAsRead, markAllAsRead, archiveNotification, getNotification, updatePreferences]);

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotification = () => useContext(NotificationContext);
