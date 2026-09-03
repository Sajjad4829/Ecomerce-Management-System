import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/context/AuthContext';
import { CommerceProvider } from './storefront/context/CommerceContext';
import { AdminRoute } from './auth/components/AdminRoute';
import { CustomerRoute } from './auth/components/CustomerRoute';
import AdminLayout from './admin/layouts/AdminLayout';
import { ToastProvider } from './components/ui/Toast/ToastContext';

import { MediaProvider } from "./admin/context/media/MediaContext";
import MediaLibrary from "./admin/pages/media/MediaLibrary";
import MediaDetails from "./admin/pages/media/MediaDetails";
import MediaUsage from "./admin/pages/media/MediaUsage";
import { MediaFolderManager, MediaCollectionManager, MediaTagManager, MediaFavorites, MediaAnalytics } from "./admin/pages/media/MediaManagementPages";
import MediaCollectionForm from "./admin/pages/media/MediaCollectionForm";


import { GlobalSearchProvider } from "./admin/context/search/GlobalSearchContext";
import SearchOverlay from "./admin/components/search/SearchOverlay";
import GlobalSearchPage from "./admin/pages/search/GlobalSearchPage";
import AdvancedSearch from "./admin/pages/search/AdvancedSearch";
import SavedSearches from "./admin/pages/search/SavedSearches";
import CommandCenter from "./admin/pages/command/CommandCenter";
import { SearchAnalytics as GlobalSearchAnalytics, ZeroResultAnalysis, SearchRedirects as GlobalSearchRedirects, SearchSynonyms as GlobalSearchSynonyms, SearchBoosts as GlobalSearchBoosts, SearchPins as GlobalSearchPins, SearchExclusions } from "./admin/pages/search/SearchManagementPages";

import StorefrontLayout from './storefront/layouts/StorefrontLayout';
import CMSPage from './storefront/pages/cms/CMSPage';
import CartPage from './storefront/pages/cart/CartPage';
import CategoriesPage from './storefront/pages/category/CategoriesPage';
import CategoryPage from './storefront/pages/category/CategoryPage';
import ProductDetailPage from './storefront/pages/product/ProductDetailPage';
import ShopPage from './storefront/pages/product/ShopPage';
import WishlistPage from './storefront/pages/wishlist/WishlistPage';
import DashboardHome from './admin/pages/DashboardHome';
import AdminLogin from './admin/pages/auth/AdminLogin';
import CustomerLogin from './storefront/pages/auth/CustomerLogin';
import CustomerRegister from './storefront/pages/auth/CustomerRegister';
import ForgotPassword from './storefront/pages/auth/ForgotPassword';
import ResetPassword from './storefront/pages/auth/ResetPassword';
import VerifyEmail from './storefront/pages/auth/VerifyEmail';
import AccountLayout from './storefront/layouts/AccountLayout';
import AccountDashboard from './storefront/pages/account/AccountDashboard';
import AccountSecurity from './storefront/pages/account/AccountSecurity';
import CatalogWorkspace from './admin/pages/commerce/CatalogWorkspace';
import ProductManager from './admin/pages/commerce/products/ProductManager';
import ProductEditor from './admin/pages/commerce/products/ProductEditor';

import { CategoryProvider } from './admin/context/commerce/CategoryContext';
import { ProductProvider } from './admin/context/commerce/ProductContext';
import { CollectionProvider } from './admin/context/commerce/CollectionContext';
import { BrandProvider } from './admin/context/commerce/BrandContext';
import CategoryManager from './admin/pages/commerce/categories/CategoryManager';
import CategoryEditor from './admin/pages/commerce/categories/CategoryEditor';
import CollectionManager from './admin/pages/commerce/collections/CollectionManager';
import CollectionEditor from './admin/pages/commerce/collections/CollectionEditor';
import BrandManager from './admin/pages/commerce/brands/BrandManager';
import BrandEditor from './admin/pages/commerce/brands/BrandEditor';
import AttributeManager from './admin/pages/commerce/attributes/AttributeManager';
import AttributeEditor from './admin/pages/commerce/attributes/AttributeEditor';
import AttributeGroupManager from './admin/pages/commerce/attributes/AttributeGroupManager';
import CatalogInventoryPage from './admin/pages/commerce/catalog/inventory/CatalogInventoryPage';
import CatalogWarehousesPage from './admin/pages/commerce/catalog/warehouses/CatalogWarehousesPage';

// SEO Imports (Phase 5.24)
import { SEOProvider } from './admin/context/seo/SEOContext';
import SEOLayout from './admin/layouts/SEOLayout';
import { SEODashboard } from './admin/pages/seo/SEODashboard';
import { GlobalSettings as SEOGlobalSettings } from './admin/pages/seo/GlobalSettings';
import { SEOResources } from './admin/pages/seo/SEOResources';
import { SEOEditorWrapper } from './admin/pages/seo/SEOEditorWrapper';
import { SEOUrls } from './admin/pages/seo/SEOUrls';
import { RedirectManager } from './admin/pages/seo/RedirectManager';
import { SitemapManager } from './admin/pages/seo/SitemapManager';
import { RobotsManager } from './admin/pages/seo/RobotsManager';
import { SEOInternalLinks } from './admin/pages/seo/SEOInternalLinks';
import { SEOTemplates } from './admin/pages/seo/SEOTemplates';
import { BulkSEOEditor } from './admin/pages/seo/BulkSEOEditor';
import { SEOAudit } from './admin/pages/seo/SEOAudit';
import { SEOAnalytics } from './admin/pages/seo/SEOAnalytics';
import { SearchConsoleIntegration } from './admin/pages/seo/integrations/SearchConsoleIntegration';


// Customer Experience Center Imports (Phase 5.25)
import { CustomerProvider } from './admin/context/customers/CustomerContext';
import CustomerLayout from './admin/layouts/CustomerLayout';
import { CustomerDashboard } from './admin/pages/customers/CustomerDashboard';
import CustomerEditor from './admin/pages/customers/CustomerEditor';
import { Customer360 } from './admin/pages/customers/Customer360';
import { CustomerProfile } from './admin/pages/customers/CustomerProfile';
import { CustomerOrders } from './admin/pages/customers/CustomerOrders';
import { CustomerPayments } from './admin/pages/customers/CustomerPayments';
import { CustomerReturns as AdminCustomerReturns } from './admin/pages/customers/CustomerReturns';
import { CustomerRefunds } from './admin/pages/customers/CustomerRefunds';
import { CustomerNotes } from './admin/pages/customers/CustomerNotes';
import { CustomerActivity } from './admin/pages/customers/CustomerActivity';
import {
  CustomerWishlist,
  CustomerReviews as AdminCustomerReviews,
  CustomerTagsSegments,
  CustomerCommunication
} from './admin/pages/customers/CustomerPlaceholderViews';
import { CustomerLoyaltyProfile } from './admin/pages/customers/CustomerLoyaltyProfile';
import CustomerSegmentation from './admin/pages/commerce/customers/segments/CustomerSegmentation';
import {
  CustomerSegments,
  CustomerLoyaltyManager,
  CustomerImport as AdminCustomerImport,
  CustomerExport as AdminCustomerExport,
  CustomerMergeManager,
  CustomerAnalyticsInsights
} from './admin/pages/customers/CustomerPlaceholderDashboards';

// Search & Merchandising Imports
import { AnalyticsProvider } from './admin/context/AnalyticsContext';
import { SearchProvider } from './admin/context/SearchContext';
import SearchDashboard from './admin/pages/commerce/catalog/search/SearchDashboard';
import SearchFacetManager from './admin/pages/commerce/catalog/search/SearchFacetManager';
import SearchRankingManager from './admin/pages/commerce/catalog/search/SearchRankingManager';
import SearchBoostManager from './admin/pages/commerce/catalog/search/SearchBoostManager';
import SearchPinManager from './admin/pages/commerce/catalog/search/SearchPinManager';
import SearchRedirectManager from './admin/pages/commerce/catalog/search/SearchRedirectManager';
import SearchSynonymManager from './admin/pages/commerce/catalog/search/SearchSynonymManager';
import PopularSearchesManager from './admin/pages/commerce/catalog/search/PopularSearchesManager';
import NoResultsAnalytics from './admin/pages/commerce/catalog/search/NoResultsAnalytics';
import SearchAnalytics from './admin/pages/commerce/catalog/search/SearchAnalytics';
import SearchPreview from './admin/pages/commerce/catalog/search/SearchPreview';
import SearchSettings from './admin/pages/commerce/catalog/search/SearchSettings';

import AnalyticsDashboard from './admin/pages/analytics/AnalyticsDashboard';
import SalesAnalytics from "./admin/pages/analytics/SalesAnalytics";
import OrderAnalytics from "./admin/pages/analytics/OrderAnalytics";
import CustomerAnalytics from "./admin/pages/analytics/CustomerAnalytics";
import ProductAnalytics from "./admin/pages/analytics/ProductAnalytics";
import CategoryAnalytics from "./admin/pages/analytics/CategoryAnalytics";
import CollectionAnalytics from "./admin/pages/analytics/CollectionAnalytics";
import MarketingAnalytics from './admin/pages/analytics/MarketingAnalytics';
import PromotionAnalytics from './admin/pages/analytics/PromotionAnalytics';
import CouponAnalytics from './admin/pages/analytics/CouponAnalytics';
import SearchAnalyticsDashboard from './admin/pages/analytics/SearchAnalytics';
import LoyaltyAnalytics from './admin/pages/analytics/LoyaltyAnalytics';
import ReviewAnalytics from './admin/pages/analytics/ReviewAnalytics';
import ReturnAnalytics from './admin/pages/analytics/ReturnAnalytics';
import SupportAnalytics from './admin/pages/analytics/SupportAnalytics';
import CMSAnalytics from './admin/pages/analytics/CMSAnalytics';
import ReportManager from './admin/pages/analytics/reports/ReportManager';
import ReportBuilder from './admin/pages/analytics/reports/ReportBuilder';
import AnalyticsAlerts from './admin/pages/analytics/AnalyticsAlerts';

import MerchandisingDashboard from './admin/pages/commerce/catalog/merchandising/MerchandisingDashboard';
import MerchandisingRuleManager from './admin/pages/commerce/catalog/merchandising/MerchandisingRuleManager';
import MerchandisingRuleBuilder from './admin/pages/commerce/catalog/merchandising/MerchandisingRuleBuilder';
import SearchResultsPage from './storefront/pages/search/SearchResultsPage';
import CustomerSearchHistory from './storefront/pages/account/search/CustomerSearchHistory';

import CustomerGroupEditor from './admin/pages/customers/groups/CustomerGroupEditor';


// Other imports

import StaffManager from './admin/pages/settings/staff/StaffManager';
import StaffForm from './admin/pages/settings/staff/StaffForm';
import StaffDetail from './admin/pages/settings/staff/StaffDetail';
import StaffActivity from './admin/pages/settings/staff/StaffActivity';
import StaffInvitations from './admin/pages/settings/staff/StaffInvitations';
import RoleManager from './admin/pages/settings/roles/RoleManager';
import RoleCreator from './admin/pages/settings/roles/RoleCreator';
import RoleDetail from './admin/pages/settings/roles/RoleDetail';
import PermissionMatrix from './admin/pages/settings/roles/PermissionMatrix';
import PermissionManager from './admin/pages/settings/permissions/PermissionManager';
import AccessReview from './admin/pages/settings/access-review/AccessReview';
import AccessRequests from './admin/pages/settings/access-requests/AccessRequests';
import TemporaryAccess from './admin/pages/settings/temporary-access/TemporaryAccess';
import RBACAnalytics from './admin/pages/settings/access-analytics/RBACAnalytics';
import AuditDashboard from './admin/pages/audit/AuditDashboard';
import AuditLogs from './admin/pages/audit/AuditLogs';
import AuditDetail from './admin/pages/audit/AuditDetail';
import ActorActivity from './admin/pages/audit/ActorActivity';
import ActorActivityDetail from './admin/pages/audit/ActorActivityDetail';
import ModuleActivity from './admin/pages/audit/ModuleActivity';
import SecurityEvents from './admin/pages/audit/SecurityEvents';
import LoginActivity from './admin/pages/audit/LoginActivity';
import ExportActivity from './admin/pages/audit/ExportActivity';
import ImportActivity from './admin/pages/audit/ImportActivity';
import AuditRetention from './admin/pages/audit/AuditRetention';
import AuditArchive from './admin/pages/audit/AuditArchive';
import AuditAlerts from './admin/pages/audit/AuditAlerts';
import ComplianceCenter from './admin/pages/compliance/ComplianceCenter';
import ComplianceReports from './admin/pages/compliance/ComplianceReports';
import ComplianceReportBuilder from './admin/pages/compliance/ComplianceReportBuilder';

import SecuritySettings from './admin/pages/settings/security/SecuritySettings';
import SessionManager from './admin/pages/settings/security/SessionManager';


import SKUManager from './admin/pages/inventory/skus/SKUManager';
import SKUDetail from './admin/pages/inventory/skus/SKUDetail';
import StockAdjustments from './admin/pages/inventory/adjustments/StockAdjustmentForm';
import StockTransfers from './admin/pages/inventory/transfers/StockTransfers';
import StockTransferBuilder from './admin/pages/inventory/transfers/StockTransferBuilder';
import StockTransferDetail from './admin/pages/inventory/transfers/StockTransferDetail';
import OutOfStockManager from './admin/pages/inventory/out-of-stock/OutOfStockManager';
import InventoryHistory from './admin/pages/inventory/history/InventoryHistory';
import InventoryValuation from './admin/pages/inventory/valuation/InventoryValuation';
import InventoryForecast from './admin/pages/inventory/forecast/InventoryForecast';
import InventoryAlerts from './admin/pages/inventory/alerts/InventoryAlerts';
import InventorySettings from './admin/pages/inventory/settings/InventorySettings';

import PricingDashboard from './admin/pages/commerce/pricing/PricingDashboard';
import PricingRuleBuilder from './admin/pages/commerce/pricing/PricingRuleBuilder';

import StockMovements from './admin/pages/inventory/movements/StockMovements';
import LowStockManager from './admin/pages/inventory/low-stock/LowStockManager';
import WarehouseManager from './admin/pages/inventory/warehouses/WarehouseManager';
import WarehouseEditor from './admin/pages/inventory/warehouses/WarehouseEditor';

import TransactionManager from './admin/pages/commerce/payments/transactions/TransactionManager';
import TransactionDetail from './admin/pages/commerce/payments/transactions/TransactionDetail';
import PaymentMethodManager from './admin/pages/commerce/payments/methods/PaymentMethodManager';
import PaymentProviderManager from './admin/pages/commerce/payments/providers/PaymentProviderManager';
import PaymentSettings from './admin/pages/commerce/payments/settings/PaymentSettings';


import OrderLayout from './admin/layouts/OrderLayout';
import OrderDashboard from './admin/pages/orders/OrderDashboard';
import OrderDetail from './admin/pages/orders/OrderDetail';
import {
  FulfillmentCenter,
  ShipmentManager as OrderShipmentManager,
  ReturnManager as OrderReturnManager,
  RefundManager as OrderRefundManager,
  InvoiceCenter,
  OrderAnalytics as OrdersAnalyticsDashboard
} from './admin/pages/orders/PlaceholderPages';

import FulfillmentManager from './admin/pages/commerce/fulfillment/FulfillmentManager';
import FulfillmentWorkspace from './admin/pages/commerce/fulfillment/FulfillmentWorkspace';

import { OrderProvider } from './admin/context/orders/OrderContext';
import { InventoryProvider } from './admin/context/inventory/InventoryContext';
import { ProcurementProvider } from './admin/context/procurement/ProcurementContext';


import {
  PaymentCenter as FinancePaymentCenter,
  PaymentDetail as FinancePaymentDetail,
  CreditNoteCenter as FinanceCreditNoteCenter,
  DebitNoteCenter as FinanceDebitNoteCenter,
  TaxCenter as FinanceTaxCenter,
  TaxTransactions as FinanceTaxTransactions,
  TaxReports as FinanceTaxReports,
  DiscountCenter as FinanceDiscountCenter,
  CustomerBalances as FinanceCustomerBalances,
  AdjustmentCenter as FinanceAdjustmentCenter,
  ReconciliationDetail as FinanceReconciliationDetail,
  ExpenseCenter as FinanceExpenseCenter,
  AccountCenter as FinanceAccountCenter,
  FinancialPeriods as FinancePeriods,
  FinancialReports as FinanceReportsNew,
  ProfitLossReport as FinanceProfitLoss,
  CashFlowReport as FinanceCashFlow
} from './admin/pages/finance/FinancePages';
import { ReconciliationCenter as FinanceReconciliationCenter } from './admin/pages/finance/reconciliation/ReconciliationCenter';

import { FinanceProvider } from './admin/context/finance/FinanceContext';

import FinanceLayout from './admin/layouts/FinanceLayout';
import {
  FinanceDashboard,
  TransactionCenter as FinanceTransactionCenter,
  TransactionDetail as FinanceTransactionDetail,
  RefundCenter as FinanceRefundCenter,
  RefundDetail as FinanceRefundDetail,
  PayoutCenter as FinancePayoutCenter,
  ReconciliationCenter,
  PaymentMethods as FinancePaymentMethods,
  ChargebackCenter,
  InvoiceCenter as FinanceInvoiceCenter,
  InvoiceDetail as FinanceInvoiceDetail,
  TaxSettings,
  CurrencySettings,
  FinanceAnalytics,
  FinanceImport,
  PaymentFailures
} from './admin/pages/finance';
import ProcurementLayout from './admin/layouts/ProcurementLayout';
import {
  ProcurementDashboard, SupplierCenter, SupplierDetail,
  SupplierCategories, SupplierPerformance,
  PurchaseRequestCenter, PurchaseRequestDetail,
  PurchaseOrderCenter, PurchaseOrderDetail,
  GoodsReceiptCenter, SupplierInvoiceCenter,
  SupplierPaymentCenter, ProcurementBudgets,
  ProcurementCategories, ProcurementAnalytics
} from './admin/pages/procurement/ProcurementPages';

import { HRProvider } from './admin/context/hr/HRContext';
import HRLayout from './admin/layouts/HRLayout';
import {
  HRDashboard, EmployeeDirectory, EmployeeProfile,
  DepartmentCenter, TeamCenter, PositionCenter,
  AttendanceCenter, AttendanceCalendar, ShiftCenter,
  WorkScheduleCenter, LeaveCenter, LeaveDetail,
  LeaveTypeCenter, HolidayCalendar, PerformanceCenter,
  PerformanceDetail, WorkforceAnalytics
} from './admin/pages/hr/HRPages';
import { CRMProvider } from './admin/context/crm/CRMContext';
import CRMLayout from './admin/layouts/CRMLayout';
import {
  CRMDashboard, LeadCenter, LeadDetail, LeadSources,
  SalesPipeline, PipelineStages, OpportunityCenter, OpportunityDetail,
  SalesActivities, FollowUps, Tasks, Segments, CustomerGroups, Tags,
  SalesTeams, SalesForecast, CRMAnalytics
} from './admin/pages/crm/CRMPages';


import InventoryLayout from './admin/layouts/InventoryLayout';
import InventoryDashboard from './admin/pages/inventory/InventoryDashboard';
import WarehouseCenter from './admin/pages/inventory/warehouses/WarehouseCenter';
import StockAdjustment from './admin/pages/inventory/stock/StockAdjustment';
import StockTransfer from './admin/pages/inventory/stock/StockTransfer';
import { MarketingProvider } from './admin/context/marketing/MarketingContext';
import { MarketingProvider as MarketingAutomationProvider } from './admin/context/MarketingContext';
import MarketingLayout from './admin/layouts/MarketingLayout';
import MarketingDashboard from './admin/pages/marketing/MarketingDashboard';
import CampaignCenter from './admin/pages/marketing/campaigns/CampaignCenter';
import CampaignBuilder from './admin/pages/marketing/campaigns/CampaignBuilder';
import CampaignDetail from './admin/pages/marketing/campaigns/CampaignDetail';

import {
  CampaignTypes,
  Channels, Audiences, MarketingLists, Promotions, Banners, MarketingAssets,
  EmailCampaigns, SMSCampaigns, SocialCampaigns, Automations, MarketingTasks,
  Calendar, MarketingROI, Attribution
} from './admin/pages/marketing/MarketingPages';
import StockMovementHistory from './admin/pages/inventory/movements/StockMovementHistory';
import { PageVersions } from './admin/pages/cms/CMSPages';

import {
  ProductInventoryDetail,
  WarehouseCreator,
  WarehouseDetail,
  StockMovementDetail,
  StockReservation,
  LowStockCenter,
  OutOfStockCenter,
  InventoryAnalytics,
  ReorderSettings,
  InventoryImport
} from './admin/pages/inventory/PlaceholderPages';
import { ShippingProvider } from './admin/context/shipping/ShippingContext';

import CheckoutPage from './storefront/pages/checkout/CheckoutPage';
import OrderConfirmation from './storefront/pages/checkout/OrderConfirmation';

import OrderHistory from './storefront/pages/account/OrderHistory';
import TrackOrder from './storefront/pages/tracking/TrackOrder';

import ShippingLayout from './admin/layouts/ShippingLayout';
import {
  ShippingDashboard,
  ShipmentCenter,
  ShipmentDetail,
  DeliveryCenter,
  DeliveryDetail,
  ExceptionCenter,
  CarrierCenter,
  ShippingMethods,
  ShippingZones,
  ShippingRates,
  DeliveryAgents,
  PackageManagement,
  ShippingAnalytics
} from './admin/pages/shipping';

import { ReturnProvider } from './admin/context/ReturnContext';
import ReturnsDashboard from './admin/pages/commerce/returns/ReturnsDashboard';
import ReturnManager from './admin/pages/commerce/returns/ReturnManager';
import ReturnDetail from './admin/pages/commerce/returns/ReturnDetail';
import RefundManager from './admin/pages/commerce/returns/RefundManager';
import ExchangeManager from './admin/pages/commerce/returns/ExchangeManager';
import ReturnSettings from './admin/pages/commerce/returns/ReturnSettings';
import ReturnReasonManager from './admin/pages/commerce/returns/ReturnReasonManager';

import CustomerReturns from './storefront/pages/account/returns/CustomerReturns';
import CustomerReturnDetail from './storefront/pages/account/returns/CustomerReturnDetail';
import NewReturnRequest from './storefront/pages/account/returns/NewReturnRequest';

import { ReviewProvider } from './admin/context/ReviewContext';
import ReviewsDashboard from './admin/pages/commerce/reviews/ReviewsDashboard';
import ReviewManager from './admin/pages/commerce/reviews/ReviewManager';
import ReviewDetail from './admin/pages/commerce/reviews/ReviewDetail';
import ReviewReportManager from './admin/pages/commerce/reviews/ReviewReportManager';
import ReviewSettings from './admin/pages/commerce/reviews/ReviewSettings';
import ReviewReasonManager from './admin/pages/commerce/reviews/ReviewReasonManager';

import CustomerReviews from './storefront/pages/account/reviews/CustomerReviews';
import CustomerReviewDetail from './storefront/pages/account/reviews/CustomerReviewDetail';
import NewReviewRequest from './storefront/pages/account/reviews/NewReviewRequest';

import { SupportProvider } from './admin/context/SupportContext';
import SupportDashboard from './admin/pages/commerce/support/SupportDashboard';
import TicketManager from './admin/pages/commerce/support/TicketManager';
import TicketDetail from './admin/pages/commerce/support/TicketDetail';
import AgentManager from './admin/pages/commerce/support/AgentManager';
import TeamManager from './admin/pages/commerce/support/TeamManager';
import CannedResponseManager from './admin/pages/commerce/support/CannedResponseManager';
import SupportSettings from './admin/pages/commerce/support/SupportSettings';

import CustomerSupportPortal from './storefront/pages/account/support/CustomerSupportPortal';
import CustomerTicketCreation from './storefront/pages/account/support/CustomerTicketCreation';
import CustomerTicketDetail from './storefront/pages/account/support/CustomerTicketDetail';

import { NotificationProvider } from './admin/context/NotificationContext';
import NotificationSettings from './admin/pages/commerce/notifications/NotificationSettings';
import NotificationCenter from './admin/pages/notifications/NotificationCenter';
import NotificationDetail from './admin/pages/notifications/NotificationDetail';
import NotificationTemplates from './admin/pages/notifications/NotificationTemplates';
import TemplateEditor from './admin/pages/notifications/TemplateEditor';
import NotificationRules from './admin/pages/notifications/NotificationRules';
import RuleBuilder from './admin/pages/notifications/RuleBuilder';
import NotificationPreferences from './admin/pages/notifications/NotificationPreferences';
import StaffNotifications from './admin/pages/notifications/StaffNotifications';
import CustomerCommunications from './admin/pages/communications/CustomerCommunications';
import MessageComposer from './admin/pages/communications/MessageComposer';
import ScheduledCommunications from './admin/pages/communications/ScheduledCommunications';
import CommunicationLogs from './admin/pages/communications/CommunicationLogs';
import CommunicationLogDetail from './admin/pages/communications/CommunicationLogDetail';
import CommunicationCampaigns from './admin/pages/communications/CommunicationCampaigns';
import CommunicationCampaignBuilder from './admin/pages/communications/CampaignBuilder';


import CustomerNotificationCenter from './storefront/pages/account/notifications/CustomerNotificationCenter';
import CustomerNotificationPreferences from './storefront/pages/account/notifications/CustomerNotificationPreferences';


// After-Sales Imports
import { AfterSalesProvider } from './admin/context/after-sales/AfterSalesContext';
import AfterSalesLayout from './admin/layouts/AfterSalesLayout';
import {
  AfterSalesDashboard,
  AfterSalesAnalytics
} from './admin/pages/after-sales/PlaceholderPages';
import AfterSalesReturnCenter from './admin/pages/after-sales/returns/ReturnCenter';
import AfterSalesReturnDetail from './admin/pages/after-sales/returns/ReturnDetail';
import InspectionCenter from './admin/pages/after-sales/inspections/InspectionCenter';
import RMACenter from './admin/pages/after-sales/rma/RMACenter';
import WarrantyCenter from './admin/pages/after-sales/warranty/WarrantyCenter';
import WarrantyPolicyCenter from './admin/pages/after-sales/warranty/policies/WarrantyPolicyCenter';
import WarrantyClaimCenter from './admin/pages/after-sales/warranty/claims/WarrantyClaimCenter';
import RepairCenter from './admin/pages/after-sales/repairs/RepairCenter';
import ReplacementCenter from './admin/pages/after-sales/replacements/ReplacementCenter';
import AfterSalesCaseCenter from './admin/pages/after-sales/cases/AfterSalesCaseCenter';

import { LoyaltyProvider } from './admin/context/LoyaltyContext';
import LoyaltyDashboard from './admin/pages/commerce/loyalty/LoyaltyDashboard';
import PointsLedger from './admin/pages/commerce/loyalty/PointsLedger';
import LoyaltyTiers from './admin/pages/commerce/loyalty/LoyaltyTiers';
import LoyaltyRewards from './admin/pages/commerce/loyalty/LoyaltyRewards';
import EarningRules from './admin/pages/commerce/loyalty/EarningRules';
import LoyaltyReferrals from './admin/pages/commerce/loyalty/LoyaltyReferrals';
import LoyaltySettings from './admin/pages/commerce/loyalty/LoyaltySettings';

import CustomerLoyaltyPortal from './storefront/pages/account/loyalty/CustomerLoyaltyPortal';
import CustomerLoyaltyHistory from './storefront/pages/account/loyalty/CustomerLoyaltyHistory';
import CustomerRewards from './storefront/pages/account/loyalty/CustomerRewards';
import CustomerReferrals from './storefront/pages/account/loyalty/CustomerReferrals';

import { ThemeProvider } from './admin/context/theme/ThemeContext';
import { SettingsProvider } from './admin/context/settings/SettingsContext';
import SettingsLayout from './admin/layouts/SettingsLayout';
import { SettingsHome } from './admin/pages/settings/SettingsHome';
import { GeneralSettings, BrandingSettings, BusinessSettings } from './admin/pages/settings/StoreSettings';
import { CatalogSettings, CheckoutSettings, InventorySettings as StoreInventorySettings } from './admin/pages/settings/CommerceSettings';
import { ShippingSettings as StoreShippingSettings, ReturnsSettings as StoreReturnsSettings } from './admin/pages/settings/OperationsSettings';
import { CustomerSettings, SystemSettings, PlatformSettings } from './admin/pages/settings/OtherSettings';
import { BusinessRules } from './admin/pages/settings/BusinessRules';

import SegmentBuilder from './admin/pages/commerce/customers/segments/SegmentBuilder';
import SegmentDetail from './admin/pages/commerce/customers/segments/SegmentDetail';
import SegmentAnalytics from './admin/pages/commerce/customers/segments/SegmentAnalytics';
import AppearanceSettings from './admin/pages/settings/appearance/AppearanceSettings';
import ThemeCustomizer from './admin/pages/settings/appearance/ThemeCustomizer';
import { StorefrontThemeProvider } from './storefront/context/StorefrontThemeContext';








import { CMSProvider } from './admin/context/cms/CMSContext';
import CMSLayout from './admin/layouts/CMSLayout';
import {
  CMSDashboard, PageCenter, PageForm, PageBuilder,
  BlockCenter, NavigationCenter, FooterManager,
  BannerManager, SEOCenter, RedirectCenter, PagePreview,
  PageTypeCenter, PageTypeForm
} from './admin/pages/cms/CMSPages';
import SectionLibrary from './admin/pages/cms/SectionLibrary';
import NavbarEditor from './admin/pages/cms/editor/NavbarEditor';
import VisualEditor from './admin/pages/cms/editor/VisualEditor';

import { ExperienceProvider } from './admin/context/experience/ExperienceContext';
import {
  ExperienceDashboard, HomepageExperience, FeaturedProducts, FeaturedCategories,
  ProductRecommendations, UpSell, ProductBundles,
  ExperienceCollections, SeasonalMerchandising, PromotionalPlacement,
  ProductPlacementRules, PersonalizationRules, CustomerSegmentRules,
  HomepageSections, BannerContentPlacement, ExperienceVariants,
  ABExperiments, ExperiencePreview, MerchandisingAnalytics,
  RelatedProductsManager, RelatedProductsForm,
  CrossSellManager, CrossSellForm
} from './admin/pages/experience/ExperiencePages';
import HeroManager from './admin/pages/experience/HeroManager';









export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <CommerceProvider>
            <MediaProvider><GlobalSearchProvider><SearchProvider><CustomerProvider><SEOProvider><ExperienceProvider><CategoryProvider><ProductProvider><CollectionProvider><BrandProvider>
              <InventoryProvider>
                <ProcurementProvider>
                  <HRProvider>
                    <CRMProvider>
                      <MarketingAutomationProvider>
                        <MarketingProvider>
                          <CMSProvider>
                            <OrderProvider>
                              <ShippingProvider>
                                <ReturnProvider>
                                  <AfterSalesProvider>
                                    <LoyaltyProvider>
                                      <ReviewProvider>
                                        <SupportProvider>
                                          <NotificationProvider>
                                            <FinanceProvider>
                                              <AnalyticsProvider>
                                                <SettingsProvider>
                                                  <StorefrontThemeProvider>
                                                    <Router>
                                                      <Routes>
                                                        {/* Storefront Layout Routes */}
                                                        <Route element={<StorefrontLayout />}>
                                                          <Route index element={<CMSPage />} />
                                                          <Route path="/cart" element={<CartPage />} />
                                                          <Route path="/checkout" element={<CheckoutPage />} />
                                                          <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
                                                          <Route path="/tracking" element={<TrackOrder />} />
                                                          <Route path="/wishlist" element={<WishlistPage />} />
                                                          <Route path="/categories" element={<CategoriesPage />} />
                                                          <Route path="/categories/:slug" element={<CategoryPage />} />
                                                          <Route path="/products" element={<ShopPage />} />
                                                          <Route path="/product/:slug" element={<ProductDetailPage />} />
                                                          <Route path="/products/:id" element={<ProductDetailPage />} />
                                                          <Route path="/search" element={<SearchResultsPage />} />
                                                          <Route path="/:slug" element={<CMSPage />} />
                                                        </Route>

                                                        {/* Auth Routes */}
                                                        <Route path="/admin/login" element={<AdminLogin />} />
                                                        <Route path="/account/login" element={<CustomerLogin />} />
                                                        <Route path="/account/register" element={<CustomerRegister />} />
                                                        <Route path="/account/forgot-password" element={<ForgotPassword />} />
                                                        <Route path="/account/reset-password" element={<ResetPassword />} />
                                                        <Route path="/account/verify-email" element={<VerifyEmail />} />

                                                        {/* Customer Account Workspace (Protected) */}
                                                        <Route path="/account" element={
                                                          <CustomerRoute>
                                                            <AccountLayout />
                                                          </CustomerRoute>
                                                        }>
                                                          <Route index element={<AccountDashboard />} />
                                                          <Route path="security" element={<AccountSecurity />} />
                                                          <Route path="orders" element={<OrderHistory />} />
                                                          <Route path="returns" element={<CustomerReturns />} />
                                                          <Route path="returns/new" element={<NewReturnRequest />} />
                                                          <Route path="returns/:id" element={<CustomerReturnDetail />} />
                                                          <Route path="reviews" element={<AdminCustomerReviews />} />
                                                          <Route path="reviews/new" element={<NewReviewRequest />} />
                                                          <Route path="reviews/:id" element={<CustomerReviewDetail />} />
                                                          <Route path="support" element={<CustomerSupportPortal />} />
                                                          <Route path="support/new" element={<CustomerTicketCreation />} />
                                                          <Route path="support/:id" element={<CustomerTicketDetail />} />
                                                          <Route path="notifications" element={<CustomerNotificationCenter />} />
                                                          <Route path="settings/notifications" element={<CustomerNotificationPreferences />} />
                                                          <Route path="loyalty" element={<CustomerLoyaltyPortal />} />
                                                          <Route path="loyalty/history" element={<CustomerLoyaltyHistory />} />
                                                          <Route path="loyalty/rewards" element={<CustomerRewards />} />
                                                          <Route path="loyalty/referrals" element={<CustomerReferrals />} />
                                                          <Route path="search-history" element={<CustomerSearchHistory />} />
                                                          {/* Fallbacks for other customer account routes */}
                                                          <Route path="*" element={<div className="p-8 text-center text-gray-500">Page under construction</div>} />
                                                        </Route>


                                                        <Route path="/admin" element={
                                                          <AdminRoute>
                                                            <AdminLayout />
                                                          </AdminRoute>
                                                        }>
                                                          <Route index element={<DashboardHome />} />

                                                          <Route path="search" element={<GlobalSearchPage />} />
                                                          <Route path="search/advanced" element={<AdvancedSearch />} />
                                                          <Route path="search/saved" element={<SavedSearches />} />
                                                          <Route path="search/analytics" element={<GlobalSearchAnalytics />} />
                                                          <Route path="search/zero-results" element={<ZeroResultAnalysis />} />
                                                          <Route path="search/redirects" element={<GlobalSearchRedirects />} />
                                                          <Route path="search/synonyms" element={<GlobalSearchSynonyms />} />
                                                          <Route path="search/boosts" element={<GlobalSearchBoosts />} />
                                                          <Route path="search/pins" element={<GlobalSearchPins />} />
                                                          <Route path="search/exclusions" element={<SearchExclusions />} />
                                                          <Route path="command" element={<CommandCenter />} />

                                                          <Route path="media">
                                                            <Route index element={<MediaLibrary />} />
                                                            <Route path="folders" element={<MediaFolderManager />} />
                                                            <Route path="collections" element={<MediaCollectionManager />} />
                                                            <Route path="collections/new" element={<MediaCollectionForm />} />
                                                            <Route path="tags" element={<MediaTagManager />} />
                                                            <Route path="favorites" element={<MediaFavorites />} />
                                                            <Route path="analytics" element={<MediaAnalytics />} />
                                                            <Route path=":assetId" element={<MediaDetails />} />
                                                            <Route path=":assetId/usage" element={<MediaUsage />} />
                                                          </Route>



                                                          <Route path="theme" element={<ThemeCustomizer />} />
                                                          
                                                          <Route path="settings" element={<SettingsLayout />}>
                                                            <Route index element={<SettingsHome />} />
                                                            <Route path="appearance" element={<AppearanceSettings />} />
                                                            <Route path="store" element={<GeneralSettings />} />
                                                            <Route path="branding" element={<BrandingSettings />} />
                                                            <Route path="business" element={<BusinessSettings />} />

                                                            <Route path="catalog" element={<CatalogSettings />} />
                                                            <Route path="checkout" element={<CheckoutSettings />} />
                                                            <Route path="inventory" element={<StoreInventorySettings />} />

                                                            <Route path="shipping" element={<StoreShippingSettings />} />
                                                            <Route path="returns" element={<StoreReturnsSettings />} />

                                                            <Route path="customers" element={<CustomerSettings />} />
                                                            <Route path="reviews" element={<div className="p-8">Reviews Settings Placeholder</div>} />

                                                            <Route path="cms" element={<PlatformSettings />} />
                                                            <Route path="communications" element={<div className="p-8">Communications Settings Placeholder</div>} />
                                                            <Route path="localization" element={<SystemSettings />} />
                                                            <Route path="features" element={<div className="p-8">Feature Flags Placeholder</div>} />
                                                            <Route path="business-rules" element={<BusinessRules />} />
                                                            <Route path="audit">
                                                              <Route index element={<AuditDashboard />} />
                                                              <Route path="logs" element={<AuditLogs />} />
                                                              <Route path="logs/:eventId" element={<AuditDetail />} />
                                                              <Route path="actors" element={<ActorActivity />} />
                                                              <Route path="actors/:staffId" element={<ActorActivityDetail />} />
                                                              <Route path="modules" element={<ModuleActivity />} />
                                                              <Route path="security" element={<SecurityEvents />} />
                                                              <Route path="logins" element={<LoginActivity />} />
                                                              <Route path="exports" element={<ExportActivity />} />
                                                              <Route path="imports" element={<ImportActivity />} />
                                                              <Route path="retention" element={<AuditRetention />} />
                                                              <Route path="archive" element={<AuditArchive />} />
                                                              <Route path="alerts" element={<AuditAlerts />} />
                                                            </Route>

                                                            <Route path="staff">
                                                              <Route index element={<StaffManager />} />
                                                              <Route path="new" element={<StaffForm />} />
                                                              <Route path="invitations" element={<StaffInvitations />} />
                                                              <Route path=":staffId" element={<StaffDetail />} />
                                                              <Route path=":staffId/activity" element={<StaffActivity />} />
                                                            </Route>
                                                            <Route path="roles">
                                                              <Route index element={<RoleManager />} />
                                                              <Route path="new" element={<RoleCreator />} />
                                                              <Route path=":roleId" element={<RoleDetail />} />
                                                              <Route path=":roleId/permissions" element={<PermissionMatrix />} />
                                                            </Route>
                                                            <Route path="permissions" element={<PermissionManager />} />
                                                            <Route path="access-review" element={<AccessReview />} />
                                                            <Route path="access-requests" element={<AccessRequests />} />
                                                            <Route path="temporary-access" element={<TemporaryAccess />} />
                                                            <Route path="access-analytics" element={<RBACAnalytics />} />
                                                            <Route path="security">
                                                              <Route index element={<SecuritySettings />} />
                                                              <Route path="sessions" element={<SessionManager />} />
                                                            </Route>
                                                          </Route>



                                                          <Route path="compliance">
                                                            <Route index element={<ComplianceCenter />} />
                                                            <Route path="reports" element={<ComplianceReports />} />
                                                            <Route path="reports/new" element={<ComplianceReportBuilder />} />
                                                          </Route>


                                                          <Route path="catalog/inventory" element={<CatalogInventoryPage />} />
                                                          <Route path="catalog/warehouses" element={<CatalogWarehousesPage />} />
                                                          <Route path="catalog" element={<CatalogWorkspace />} />
                                                          <Route path="catalog/products" element={<ProductManager />} />
                                                          <Route path="catalog/products/new" element={<ProductEditor />} />
                                                          <Route path="catalog/products/:id" element={<ProductEditor />} />
                                                          <Route path="catalog/categories" element={<CategoryManager />} />
                                                          <Route path="catalog/categories/new" element={<CategoryEditor />} />
                                                          <Route path="catalog/categories/:id" element={<CategoryEditor />} />
                                                          <Route path="catalog/collections" element={<CollectionManager />} />
                                                          <Route path="catalog/collections/new" element={<CollectionEditor />} />
                                                          <Route path="catalog/collections/:id" element={<CollectionEditor />} />
                                                          <Route path="catalog/brands" element={<BrandManager />} />
                                                          <Route path="catalog/brands/new" element={<BrandEditor />} />
                                                          <Route path="catalog/brands/:id" element={<BrandEditor />} />

                                                          <Route path="catalog/attributes" element={<AttributeManager />} />
                                                          <Route path="catalog/attributes/groups" element={<AttributeGroupManager />} />
                                                          <Route path="catalog/attributes/new" element={<AttributeEditor />} />
                                                          <Route path="catalog/attributes/:id" element={<AttributeEditor />} />
                                                          <Route path="catalog/pricing" element={<PricingDashboard />} />
                                                          <Route path="catalog/pricing/rules/new" element={<PricingRuleBuilder />} />
                                                          <Route path="catalog/pricing/rules/:id" element={<PricingRuleBuilder />} />

                                                          {/* Finance System Routes */}
                                                          <Route path="finance" element={<FinanceLayout />}>
                                                            <Route index element={<FinanceDashboard />} />
                                                            <Route path="transactions" element={<FinanceTransactionCenter />} />
                                                            <Route path="transactions/:transactionId" element={<FinanceTransactionDetail />} />
                                                            <Route path="payments" element={<FinancePaymentCenter />} />
                                                            <Route path="payments/:paymentId" element={<FinancePaymentDetail />} />
                                                            <Route path="refunds" element={<FinanceRefundCenter />} />
                                                            <Route path="refunds/:refundId" element={<FinanceRefundDetail />} />
                                                            <Route path="invoices" element={<FinanceInvoiceCenter />} />
                                                            <Route path="invoices/:invoiceId" element={<FinanceInvoiceDetail />} />
                                                            <Route path="credit-notes" element={<FinanceCreditNoteCenter />} />
                                                            <Route path="debit-notes" element={<FinanceDebitNoteCenter />} />
                                                            <Route path="tax" element={<FinanceTaxCenter />} />
                                                            <Route path="tax/transactions" element={<FinanceTaxTransactions />} />
                                                            <Route path="tax/reports" element={<FinanceTaxReports />} />
                                                            <Route path="discounts" element={<FinanceDiscountCenter />} />
                                                            <Route path="customer-balances" element={<FinanceCustomerBalances />} />
                                                            <Route path="adjustments" element={<FinanceAdjustmentCenter />} />
                                                            <Route path="reconciliation" element={<FinanceReconciliationCenter />} />
                                                            <Route path="reconciliation/:reconciliationId" element={<FinanceReconciliationDetail />} />
                                                            <Route path="expenses" element={<FinanceExpenseCenter />} />
                                                            <Route path="accounts" element={<FinanceAccountCenter />} />
                                                            <Route path="periods" element={<FinancePeriods />} />
                                                            <Route path="reports" element={<FinanceReportsNew />} />
                                                            <Route path="reports/profit-loss" element={<FinanceProfitLoss />} />
                                                            <Route path="reports/cash-flow" element={<FinanceCashFlow />} />
                                                            <Route path="analytics" element={<FinanceAnalytics />} />
                                                            <Route path="import" element={<FinanceImport />} />
                                                          </Route>

                                                          {/* Procurement System Routes */}
                                                          <Route path="procurement" element={<ProcurementLayout />}>
                                                            <Route index element={<ProcurementDashboard />} />
                                                            <Route path="suppliers" element={<SupplierCenter />} />
                                                            <Route path="suppliers/:supplierId" element={<SupplierDetail />} />
                                                            <Route path="supplier-categories" element={<SupplierCategories />} />
                                                            <Route path="supplier-performance" element={<SupplierPerformance />} />
                                                            <Route path="requests" element={<PurchaseRequestCenter />} />
                                                            <Route path="requests/:requestId" element={<PurchaseRequestDetail />} />
                                                            <Route path="purchase-orders" element={<PurchaseOrderCenter />} />
                                                            <Route path="purchase-orders/:poId" element={<PurchaseOrderDetail />} />
                                                            <Route path="goods-receipts" element={<GoodsReceiptCenter />} />
                                                            <Route path="invoices" element={<SupplierInvoiceCenter />} />
                                                            <Route path="payments" element={<SupplierPaymentCenter />} />
                                                            <Route path="budgets" element={<ProcurementBudgets />} />
                                                            <Route path="categories" element={<ProcurementCategories />} />
                                                            <Route path="analytics" element={<ProcurementAnalytics />} />
                                                          </Route>

                                                          {/* HR System Routes */}
                                                          <Route path="hr" element={<HRLayout />}>
                                                            <Route index element={<HRDashboard />} />
                                                            <Route path="employees" element={<EmployeeDirectory />} />
                                                            <Route path="employees/:employeeId" element={<EmployeeProfile />} />
                                                            <Route path="departments" element={<DepartmentCenter />} />
                                                            <Route path="teams" element={<TeamCenter />} />
                                                            <Route path="positions" element={<PositionCenter />} />
                                                            <Route path="attendance" element={<AttendanceCenter />} />
                                                            <Route path="attendance/calendar" element={<AttendanceCalendar />} />
                                                            <Route path="shifts" element={<ShiftCenter />} />
                                                            <Route path="schedules" element={<WorkScheduleCenter />} />
                                                            <Route path="leaves" element={<LeaveCenter />} />
                                                            <Route path="leaves/:leaveId" element={<LeaveDetail />} />
                                                            <Route path="leave-types" element={<LeaveTypeCenter />} />
                                                            <Route path="holidays" element={<HolidayCalendar />} />
                                                            <Route path="performance" element={<PerformanceCenter />} />
                                                            <Route path="performance/:reviewId" element={<PerformanceDetail />} />
                                                            <Route path="analytics" element={<WorkforceAnalytics />} />
                                                          </Route>

                                                          {/* CRM System Routes */}
                                                          <Route path="crm" element={<CRMLayout />}>
                                                            <Route index element={<CRMDashboard />} />
                                                            <Route path="leads" element={<LeadCenter />} />
                                                            <Route path="leads/:leadId" element={<LeadDetail />} />
                                                            <Route path="lead-sources" element={<LeadSources />} />
                                                            <Route path="pipeline" element={<SalesPipeline />} />
                                                            <Route path="pipeline/stages" element={<PipelineStages />} />
                                                            <Route path="opportunities" element={<OpportunityCenter />} />
                                                            <Route path="opportunities/:opportunityId" element={<OpportunityDetail />} />
                                                            <Route path="activities" element={<SalesActivities />} />
                                                            <Route path="follow-ups" element={<FollowUps />} />
                                                            <Route path="tasks" element={<Tasks />} />
                                                            <Route path="segments" element={<Segments />} />
                                                            <Route path="customer-groups" element={<CustomerGroups />} />
                                                            <Route path="tags" element={<Tags />} />
                                                            <Route path="sales-teams" element={<SalesTeams />} />
                                                            <Route path="forecast" element={<SalesForecast />} />
                                                            <Route path="analytics" element={<CRMAnalytics />} />
                                                          </Route>

                                                          {/* Marketing System Routes */}
                                                          <Route path="marketing" element={<MarketingLayout />}>
                                                            <Route index element={<MarketingDashboard />} />
                                                            <Route path="campaigns" element={<CampaignCenter />} />
                                                            <Route path="campaigns/create" element={<CampaignBuilder />} />
                                                            <Route path="campaigns/:campaignId" element={<CampaignDetail />} />
                                                            <Route path="campaign-types" element={<CampaignTypes />} />
                                                            <Route path="channels" element={<Channels />} />
                                                            <Route path="audiences" element={<Audiences />} />
                                                            <Route path="lists" element={<MarketingLists />} />
                                                            <Route path="promotions" element={<Promotions />} />
                                                            <Route path="banners" element={<Banners />} />
                                                            <Route path="assets" element={<MarketingAssets />} />
                                                            <Route path="email" element={<EmailCampaigns />} />
                                                            <Route path="sms" element={<SMSCampaigns />} />
                                                            <Route path="social" element={<SocialCampaigns />} />
                                                            <Route path="automations" element={<Automations />} />
                                                            <Route path="tasks" element={<MarketingTasks />} />
                                                            <Route path="calendar" element={<Calendar />} />
                                                            <Route path="analytics" element={<MarketingAnalytics />} />
                                                            <Route path="roi" element={<MarketingROI />} />
                                                            <Route path="attribution" element={<Attribution />} />
                                                          </Route>

                                                          {/* CMS Routes */}
                                                          <Route path="cms" element={<CMSLayout />}>
                                                            <Route index element={<Navigate to="pages" replace />} />
                                                            <Route path="pages" element={<PageCenter />} />
                                                            <Route path="pages/create" element={<PageForm />} />
                                                            <Route path="pages/:pageId/edit" element={<PageForm />} />
                                                            <Route path="pages/:pageId/builder" element={<VisualEditor />} />
                                                            <Route path="pages/:pageId/preview" element={<PagePreview />} />
                                                            <Route path="page-types" element={<PageTypeCenter />} />
                                                            <Route path="page-types/create" element={<PageTypeForm />} />
                                                            <Route path="page-types/:id/edit" element={<PageTypeForm />} />
                                                            <Route path="sections" element={<SectionLibrary />} />
                                                            <Route path="blocks" element={<BlockCenter />} />
                                                            <Route path="navigation" element={<NavigationCenter />} />
                                                            <Route path="header" element={<NavbarEditor />} />
                                                            <Route path="footer" element={<FooterManager />} />
                                                            <Route path="banners" element={<BannerManager />} />
                                                            <Route path="seo" element={<SEOCenter />} />
                                                            <Route path="redirects" element={<RedirectCenter />} />
                                                            <Route path="versions" element={<PageVersions />} />
                                                          </Route>

                                                          {/* Inventory System Routes */}
                                                          <Route path="inventory" element={<InventoryLayout />}>
                                                            <Route index element={<InventoryDashboard />} />
                                                            <Route path="products/:productId" element={<ProductInventoryDetail />} />
                                                            <Route path="warehouses" element={<WarehouseCenter />} />
                                                            <Route path="warehouses/new" element={<WarehouseCreator />} />
                                                            <Route path="warehouses/:warehouseId" element={<WarehouseDetail />} />
                                                            <Route path="movements" element={<StockMovementHistory />} />
                                                            <Route path="movements/:movementId" element={<StockMovementDetail />} />
                                                            <Route path="adjustments" element={<StockAdjustment />} />
                                                            <Route path="transfers" element={<StockTransfer />} />
                                                            <Route path="reservations" element={<StockReservation />} />
                                                            <Route path="low-stock" element={<LowStockCenter />} />
                                                            <Route path="out-of-stock" element={<OutOfStockCenter />} />
                                                            <Route path="analytics" element={<InventoryAnalytics />} />
                                                            <Route path="import" element={<InventoryImport />} />
                                                            <Route path="settings" element={<ReorderSettings />} />
                                                          </Route>




                                                          <Route path="orders" element={<OrderLayout />}>
                                                            <Route index element={<OrderDashboard />} />
                                                            <Route path="fulfillment" element={<FulfillmentCenter />} />
                                                            <Route path="shipments" element={<OrderShipmentManager />} />
                                                            <Route path="returns" element={<OrderReturnManager />} />
                                                            <Route path="refunds" element={<OrderRefundManager />} />
                                                            <Route path="invoices" element={<InvoiceCenter />} />
                                                            <Route path="analytics" element={<OrdersAnalyticsDashboard />} />
                                                            <Route path=":orderId" element={<OrderDetail />} />
                                                          </Route>

                                                          <Route path="fulfillment">
                                                            <Route index element={<FulfillmentManager />} />
                                                            <Route path=":id" element={<FulfillmentWorkspace />} />
                                                          </Route>

                                                          {/* Shipping & Logistics Center Routes */}
                                                          <Route path="shipping" element={<ShippingLayout />}>
                                                            <Route index element={<ShippingDashboard />} />
                                                            <Route path="shipments" element={<ShipmentCenter />} />
                                                            <Route path="shipments/:shipmentId" element={<ShipmentDetail />} />
                                                            <Route path="deliveries" element={<DeliveryCenter />} />
                                                            <Route path="deliveries/:deliveryId" element={<DeliveryDetail />} />
                                                            <Route path="exceptions" element={<ExceptionCenter />} />
                                                            <Route path="exceptions/:exceptionId" element={<ExceptionCenter />} />
                                                            <Route path="carriers" element={<CarrierCenter />} />
                                                            <Route path="carriers/:carrierId" element={<CarrierCenter />} />
                                                            <Route path="methods" element={<ShippingMethods />} />
                                                            <Route path="zones" element={<ShippingZones />} />
                                                            <Route path="rates" element={<ShippingRates />} />
                                                            <Route path="agents" element={<DeliveryAgents />} />
                                                            <Route path="packages" element={<PackageManagement />} />
                                                            <Route path="analytics" element={<ShippingAnalytics />} />
                                                          </Route>

                                                          <Route path="returns">
                                                            <Route index element={<ReturnsDashboard />} />
                                                            <Route path="all" element={<ReturnManager />} />
                                                            <Route path=":id" element={<ReturnDetail />} />
                                                          </Route>

                                                          <Route path="reviews">
                                                            <Route index element={<ReviewsDashboard />} />
                                                            <Route path="all" element={<ReviewManager />} />
                                                            <Route path="reports" element={<ReviewReportManager />} />
                                                            <Route path=":id" element={<ReviewDetail />} />
                                                          </Route>

                                                          <Route path="support">
                                                            <Route index element={<SupportDashboard />} />
                                                            <Route path="tickets" element={<TicketManager />} />
                                                            <Route path="tickets/:id" element={<TicketDetail />} />
                                                            <Route path="agents" element={<AgentManager />} />
                                                            <Route path="teams" element={<TeamManager />} />
                                                            <Route path="canned-responses" element={<CannedResponseManager />} />
                                                          </Route>


                                                          <Route path="notifications">
                                                            <Route index element={<NotificationCenter />} />
                                                            <Route path=":notificationId" element={<NotificationDetail />} />
                                                            <Route path="templates">
                                                              <Route index element={<NotificationTemplates />} />
                                                              <Route path=":templateId" element={<TemplateEditor />} />
                                                            </Route>
                                                            <Route path="rules">
                                                              <Route index element={<NotificationRules />} />
                                                              <Route path="new" element={<RuleBuilder />} />
                                                            </Route>
                                                            <Route path="preferences" element={<NotificationPreferences />} />
                                                            <Route path="staff" element={<StaffNotifications />} />
                                                          </Route>

                                                          <Route path="communications">
                                                            <Route path="customers">
                                                              <Route index element={<CustomerCommunications />} />
                                                              <Route path=":customerId/compose" element={<MessageComposer />} />
                                                            </Route>
                                                            <Route path="scheduled" element={<ScheduledCommunications />} />
                                                            <Route path="logs">
                                                              <Route index element={<CommunicationLogs />} />
                                                              <Route path=":messageId" element={<CommunicationLogDetail />} />
                                                            </Route>
                                                            <Route path="campaigns">
                                                              <Route index element={<CommunicationCampaigns />} />
                                                              <Route path="new" element={<CommunicationCampaignBuilder />} />
                                                              <Route path=":campaignId" element={<CommunicationCampaignBuilder />} />
                                                            </Route>
                                                          </Route>

                                                          <Route path="settings/support" element={<SupportSettings />} />
                                                          <Route path="settings/notifications" element={<NotificationSettings />} />

                                                          <Route path="settings/reviews" element={<ReviewSettings />} />
                                                          <Route path="settings/reviews/reasons" element={<ReviewReasonManager />} />

                                                          <Route path="refunds" element={<OrderRefundManager />} />
                                                          <Route path="exchanges" element={<ExchangeManager />} />
                                                          <Route path="settings/returns" element={<ReturnSettings />} />
                                                          <Route path="settings/returns/reasons" element={<ReturnReasonManager />} />

                                                          <Route path="payments">
                                                            <Route index element={<TransactionManager />} />
                                                            <Route path="transactions/:id" element={<TransactionDetail />} />
                                                            <Route path="methods" element={<PaymentMethodManager />} />
                                                            <Route path="providers" element={<PaymentProviderManager />} />
                                                            <Route path="settings" element={<PaymentSettings />} />
                                                          </Route>


                                                          <Route path="loyalty">
                                                            <Route index element={<LoyaltyDashboard />} />
                                                            <Route path="ledger" element={<PointsLedger />} />
                                                            <Route path="tiers" element={<LoyaltyTiers />} />
                                                            <Route path="rewards" element={<LoyaltyRewards />} />
                                                            <Route path="earning-rules" element={<EarningRules />} />
                                                            <Route path="referrals" element={<LoyaltyReferrals />} />
                                                          </Route>

                                                          <Route path="settings/loyalty" element={<LoyaltySettings />} />



                                                          <Route path="customers" element={<CustomerLayout />}>

                                                            <Route index element={<CustomerDashboard />} />
                                                            <Route path="new" element={<CustomerEditor />} />
                                                            <Route path=":customerId/edit" element={<CustomerEditor />} />
                                                            <Route path="export" element={<AdminCustomerExport />} />
                                                            <Route path="merge" element={<CustomerMergeManager />} />
                                                            <Route path="segments" element={<CustomerSegmentation />} />
                                                            <Route path="loyalty" element={<LoyaltyDashboard />} />
                                                            <Route path="import" element={<AdminCustomerImport />} />
                                                            <Route path="analytics" element={<CustomerAnalyticsInsights />} />
                                                            <Route path=":customerId" element={<Customer360 />}>
                                                              <Route index element={<CustomerProfile />} />
                                                              <Route path="orders" element={<CustomerOrders />} />
                                                              <Route path="payments" element={<CustomerPayments />} />
                                                              <Route path="returns" element={<AdminCustomerReturns />} />
                                                              <Route path="refunds" element={<CustomerRefunds />} />
                                                              <Route path="wishlist" element={<CustomerWishlist />} />
                                                              <Route path="reviews" element={<AdminCustomerReviews />} />
                                                              <Route path="notes" element={<CustomerNotes />} />
                                                              <Route path="activity" element={<CustomerActivity />} />
                                                              <Route path="segments" element={<CustomerTagsSegments />} />
                                                              <Route path="communication" element={<CustomerCommunication />} />
                                                              <Route path="loyalty" element={<CustomerLoyaltyProfile />} />
                                                            </Route>
                                                          </Route>

                                                          <Route path="catalog/search" element={<SearchDashboard />} />
                                                          <Route path="catalog/search/facets" element={<SearchFacetManager />} />
                                                          <Route path="catalog/search/ranking" element={<SearchRankingManager />} />
                                                          <Route path="catalog/search/boosting" element={<SearchBoostManager />} />
                                                          <Route path="catalog/search/pinning" element={<SearchPinManager />} />
                                                          <Route path="catalog/search/redirects" element={<SearchRedirectManager />} />
                                                          <Route path="catalog/search/synonyms" element={<SearchSynonymManager />} />
                                                          <Route path="catalog/search/popular" element={<PopularSearchesManager />} />
                                                          <Route path="catalog/search/no-results" element={<NoResultsAnalytics />} />
                                                          <Route path="catalog/search/analytics" element={<SearchAnalytics />} />
                                                          <Route path="catalog/search/preview" element={<SearchPreview />} />
                                                          <Route path="catalog/search/settings" element={<SearchSettings />} />

                                                          <Route path="analytics">
                                                            <Route index element={<AnalyticsDashboard />} />
                                                            <Route path="sales" element={<SalesAnalytics />} />
                                                            <Route path="orders" element={<OrderAnalytics />} />
                                                            <Route path="customers" element={<CustomerAnalytics />} />
                                                            <Route path="products" element={<ProductAnalytics />} />
                                                            <Route path="categories" element={<CategoryAnalytics />} />
                                                            <Route path="collections" element={<CollectionAnalytics />} />
                                                            <Route path="inventory" element={<InventoryAnalytics />} />
                                                            <Route path="marketing" element={<MarketingAnalytics />} />
                                                            <Route path="promotions" element={<PromotionAnalytics />} />
                                                            <Route path="coupons" element={<CouponAnalytics />} />
                                                            <Route path="search" element={<SearchAnalyticsDashboard />} />
                                                            <Route path="loyalty" element={<LoyaltyAnalytics />} />
                                                            <Route path="reviews" element={<ReviewAnalytics />} />
                                                            <Route path="returns" element={<ReturnAnalytics />} />
                                                            <Route path="support" element={<SupportAnalytics />} />
                                                            <Route path="cms" element={<CMSAnalytics />} />
                                                            <Route path="reports" element={<ReportManager />} />
                                                            <Route path="reports/new" element={<ReportBuilder />} />
                                                            <Route path="alerts" element={<AnalyticsAlerts />} />
                                                          </Route>


                                                          <Route path="catalog/merchandising" element={<MerchandisingDashboard />} />
                                                          <Route path="catalog/merchandising/rules" element={<MerchandisingRuleManager />} />
                                                          <Route path="catalog/merchandising/rules/new" element={<MerchandisingRuleBuilder />} />

                                                          <Route path="seo" element={<SEOLayout />}>
                                                            <Route index element={<SEODashboard />} />
                                                            <Route path="global" element={<SEOGlobalSettings />} />
                                                            <Route path="resources" element={<SEOResources />} />
                                                            <Route path="resources/:id" element={<SEOEditorWrapper />} />
                                                            <Route path="urls" element={<SEOUrls />} />
                                                            <Route path="redirects" element={<RedirectManager />} />
                                                            <Route path="sitemap" element={<SitemapManager />} />
                                                            <Route path="robots" element={<RobotsManager />} />
                                                            <Route path="internal-links" element={<SEOInternalLinks />} />
                                                            <Route path="templates" element={<SEOTemplates />} />
                                                            <Route path="bulk" element={<BulkSEOEditor />} />
                                                            <Route path="audit" element={<SEOAudit />} />
                                                            <Route path="analytics" element={<SEOAnalytics />} />
                                                            <Route path="integrations/search-console" element={<SearchConsoleIntegration />} />
                                                          </Route>

                                                          {/* Experience Routes */}
                                                          <Route path="experience">
                                                            <Route index element={<ExperienceDashboard />} />
                                                            <Route path="homepage" element={<HomepageExperience />} />
                                                            <Route path="homepage/sections" element={<HomepageSections />} />
                                                            <Route path="homepage/banners" element={<BannerContentPlacement />} />
                                                            <Route path="merchandising/featured-products" element={<FeaturedProducts />} />
                                                            <Route path="merchandising/featured-categories" element={<FeaturedCategories />} />
                                                            <Route path="merchandising/seasonal" element={<SeasonalMerchandising />} />
                                                            <Route path="merchandising/promotions" element={<PromotionalPlacement />} />
                                                            <Route path="merchandising/collections" element={<ExperienceCollections />} />
                                                            <Route path="recommendations/products" element={<ProductRecommendations />} />
                                                            <Route path="related-products" element={<RelatedProductsManager />} />
                                                            <Route path="related-products/new" element={<RelatedProductsForm />} />
                                                            <Route path="related-products/:id/edit" element={<RelatedProductsForm />} />
                                                            <Route path="cross-sell" element={<CrossSellManager />} />
                                                            <Route path="cross-sell/new" element={<CrossSellForm />} />
                                                            <Route path="cross-sell/:id/edit" element={<CrossSellForm />} />
                                                            <Route path="recommendations/up-sell" element={<UpSell />} />
                                                            <Route path="recommendations/bundles" element={<ProductBundles />} />
                                                            <Route path="recommendations/rules" element={<ProductPlacementRules />} />
                                                            <Route path="personalization/rules" element={<PersonalizationRules />} />
                                                            <Route path="personalization/segments" element={<CustomerSegmentRules />} />
                                                            <Route path="optimization/variants" element={<ExperienceVariants />} />
                                                            <Route path="optimization/experiments" element={<ABExperiments />} />
                                                            <Route path="optimization/preview" element={<ExperiencePreview />} />
                                                            <Route path="optimization/analytics" element={<MerchandisingAnalytics />} />
                                                          </Route>
                                                        </Route>
                                                      </Routes>
                                                    </Router>
                                                  </StorefrontThemeProvider>
                                                </SettingsProvider>
                                              </AnalyticsProvider>
                                            </FinanceProvider>
                                          </NotificationProvider>
                                        </SupportProvider>
                                      </ReviewProvider>
                                    </LoyaltyProvider>
                                  </AfterSalesProvider>
                                </ReturnProvider>
                              </ShippingProvider>
                            </OrderProvider>
                          </CMSProvider>
                        </MarketingProvider>
                      </MarketingAutomationProvider>
                    </CRMProvider>
                  </HRProvider>
                </ProcurementProvider>
              </InventoryProvider>
            </BrandProvider></CollectionProvider></ProductProvider></CategoryProvider></ExperienceProvider></SEOProvider></CustomerProvider></SearchProvider></GlobalSearchProvider></MediaProvider>
          </CommerceProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>

  );
}
