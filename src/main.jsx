import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { notificationService } from './admin/services/notification/NotificationService';

const originalFetch = window.fetch;
window.fetch = async (...args) => {
  const [resource, config] = args;
  
  const response = await originalFetch(...args);

  if (config && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(config.method?.toUpperCase())) {
    if (response.ok) {
      let moduleName = 'System';
      let title = 'Data Updated';
      let message = 'An update was made successfully.';

      if (typeof resource === 'string') {
        if (resource.includes('/api/cms/pages') || resource.includes('/sections/')) {
           moduleName = 'CMS'; title = 'Page/Section Updated'; message = 'A page or section has been updated.';
        } else if (resource.includes('/api/cms/config')) {
           moduleName = 'CMS'; title = 'Config Updated'; message = 'System configuration was updated.';
        } else if (resource.includes('/api/categories')) {
           moduleName = 'Catalog'; title = 'Category Updated'; message = 'A category was modified.';
        } else if (resource.includes('/api/products')) {
           moduleName = 'Catalog'; title = 'Product Updated'; message = 'A product was modified.';
        }
      }

      notificationService.createNotification({
        type: 'System',
        title,
        message,
        priority: 'Normal',
        module: moduleName,
      });
    }
  }

  return response;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
