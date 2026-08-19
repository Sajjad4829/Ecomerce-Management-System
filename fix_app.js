const fs = require('fs');

let appContent = fs.readFileSync('src/App.jsx', 'utf8');

// Replace imports
appContent = appContent.replace(
  "import MarketingWorkspace from './admin/pages/marketing/MarketingWorkspace';",
  `import MarketingLayout from './admin/layouts/MarketingLayout';
import {
  MarketingDashboard,
  CampaignCenter,
  CampaignDetail,
  CampaignForm,
  PromotionCenter,
  PromotionForm,
  CouponCenter,
  CouponForm,
  SegmentCenter,
  BannerCenter,
  AbandonedCartCenter,
  EmailCampaignCenter,
  NotificationCenter,
  MarketingCalendar,
  MarketingAnalytics,
  CustomerEngagement
} from './admin/pages/marketing';`
);

appContent = appContent.replace(
  "import { MarketingProvider } from './admin/context/MarketingContext';",
  "import { MarketingProvider } from './admin/context/marketing/MarketingContext';"
);

// We should also remove the old marketing imports lines 412-427 to avoid errors
const linesToRemove = [
  "import AudienceManager from './admin/pages/commerce/marketing/audiences/AudienceManager';",
  "import AutomationDashboard from './admin/pages/commerce/marketing/automations/AutomationDashboard';",
  "import AutomationBuilder from './admin/pages/commerce/marketing/automations/AutomationBuilder';",
  "import AutomationDetail from './admin/pages/commerce/marketing/automations/AutomationDetail';",
  "import MarketingSettings from './admin/pages/commerce/marketing/settings/MarketingSettings';",
  "import { PromotionProvider } from './admin/context/PromotionContext';",
  "import CampaignDashboard from './admin/pages/commerce/marketing/campaigns/CampaignDashboard';",
  "import CampaignBuilder from './admin/pages/commerce/marketing/campaigns/CampaignBuilder';",
  "import CampaignDetail from './admin/pages/commerce/marketing/campaigns/CampaignDetail';",
  "import CampaignAnalytics from './admin/pages/commerce/marketing/campaigns/CampaignAnalytics';",
  "import PromotionManager from './admin/pages/commerce/marketing/promotions/PromotionManager';",
  "import PromotionBuilder from './admin/pages/commerce/marketing/promotions/PromotionBuilder';",
  "import CouponManager from './admin/pages/commerce/marketing/coupons/CouponManager';",
  "import CouponCreator from './admin/pages/commerce/marketing/coupons/CouponCreator';",
  "import FlashSaleManager from './admin/pages/commerce/marketing/flash-sales/FlashSaleManager';"
];

for (const line of linesToRemove) {
  appContent = appContent.replace(line, '');
}

// Replace the marketing routes
const oldMarketingRoutesRegex = /<Route path="marketing" element={<MarketingWorkspace \/>} \/>[\s\S]*?<Route path="settings\/marketing" element={<MarketingSettings \/>} \/>/;

const newMarketingRoutes = `
          <Route path="marketing" element={<MarketingLayout />}>
            <Route index element={<MarketingDashboard />} />
            <Route path="campaigns" element={<CampaignCenter />} />
            <Route path="campaigns/new" element={<CampaignForm />} />
            <Route path="campaigns/:campaignId" element={<CampaignDetail />} />
            <Route path="campaigns/:campaignId/edit" element={<CampaignForm />} />
            <Route path="promotions" element={<PromotionCenter />} />
            <Route path="promotions/new" element={<PromotionForm />} />
            <Route path="coupons" element={<CouponCenter />} />
            <Route path="coupons/new" element={<CouponForm />} />
            <Route path="segments" element={<SegmentCenter />} />
            <Route path="banners" element={<BannerCenter />} />
            <Route path="abandoned-carts" element={<AbandonedCartCenter />} />
            <Route path="email-campaigns" element={<EmailCampaignCenter />} />
            <Route path="notifications" element={<NotificationCenter />} />
            <Route path="calendar" element={<MarketingCalendar />} />
            <Route path="analytics" element={<MarketingAnalytics />} />
            <Route path="engagement" element={<CustomerEngagement />} />
          </Route>`;

appContent = appContent.replace(oldMarketingRoutesRegex, newMarketingRoutes);

// Remove `<PromotionProvider>` since we removed it
appContent = appContent.replace(/<PromotionProvider>/g, '');
appContent = appContent.replace(/<\/PromotionProvider>/g, '');

fs.writeFileSync('src/App.jsx', appContent);
