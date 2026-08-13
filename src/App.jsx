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
import CartPage from './storefront/pages/cart/CartPage';
import WishlistPage from './storefront/pages/wishlist/WishlistPage';
import ProductsPage from './storefront/pages/product/ProductsPage';
import ProductDetailPage from './storefront/pages/product/ProductDetailPage';
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

import CategoryManager from './admin/pages/commerce/categories/CategoryManager';
import { CategoryProvider } from './admin/context/commerce/CategoryContext';
import { ProductProvider } from './admin/context/commerce/ProductContext';
import { CollectionProvider } from './admin/context/commerce/CollectionContext';
import CategoryEditor from './admin/pages/commerce/categories/CategoryEditor';
import CollectionManager from './admin/pages/commerce/collections/CollectionManager';
import CollectionEditor from './admin/pages/commerce/collections/CollectionEditor';
import BrandManager from './admin/pages/commerce/brands/BrandManager';
import BrandEditor from './admin/pages/commerce/brands/BrandEditor';
import AttributeManager from './admin/pages/commerce/attributes/AttributeManager';
import AttributeEditor from './admin/pages/commerce/attributes/AttributeEditor';
import AttributeGroupManager from './admin/pages/commerce/attributes/AttributeGroupManager';

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

                                              </CollectionProvider></ProductProvider></CategoryProvider></ExperienceProvider></SEOProvider></CustomerProvider></SearchProvider></GlobalSearchProvider></MediaProvider>
                                          </CMSProvider>
                                        </MarketingProvider>
                                      </SettingsProvider>
                                    </AnalyticsProvider>
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
              </CRMProvider>
            </HRProvider>
          </ProcurementProvider>
        </InventoryProvider>
      </CommerceProvider>
    </AuthProvider>
    </ToastProvider>
    </ThemeProvider>

  );
}
