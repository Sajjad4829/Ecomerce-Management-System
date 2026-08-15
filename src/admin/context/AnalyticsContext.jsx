import React, { createContext, useContext, useState, useMemo } from 'react';
import { useOrders } from './orders/OrderContext';
import { useFinance } from './finance/FinanceContext';
import { useCustomers } from './customers/CustomerContext';
import { useProducts } from './commerce/ProductContext';
import { useCategories } from './commerce/CategoryContext';

const AnalyticsContext = createContext();

// Date Helpers
const getRangeDates = (rangeStr) => {
  const now = new Date();
  const start = new Date(now);
  start.setHours(0,0,0,0);
  const end = new Date(now);
  end.setHours(23,59,59,999);

  switch(rangeStr) {
    case 'Today': break;
    case 'Yesterday':
      start.setDate(start.getDate() - 1);
      end.setDate(end.getDate() - 1);
      break;
    case 'Last 7 Days':
      start.setDate(start.getDate() - 7);
      break;
    case 'Last 30 Days':
      start.setDate(start.getDate() - 30);
      break;
    case 'Last 90 Days':
      start.setDate(start.getDate() - 90);
      break;
    case 'This Month':
      start.setDate(1);
      break;
    case 'Last Month':
    case 'Previous Month':
      start.setMonth(start.getMonth() - 1);
      start.setDate(1);
      end.setDate(0);
      break;
    case 'This Year':
      start.setMonth(0, 1);
      break;
    case 'Last Year':
      start.setFullYear(start.getFullYear() - 1, 0, 1);
      end.setFullYear(end.getFullYear() - 1, 11, 31);
      break;
    default:
      start.setDate(start.getDate() - 30);
  }
  return { start, end };
};

const getComparisonDates = (rangeStr, comparisonStr, currentStart, currentEnd) => {
  const duration = currentEnd.getTime() - currentStart.getTime();
  const start = new Date(currentStart);
  const end = new Date(currentEnd);

  if (comparisonStr === 'Previous Year') {
    start.setFullYear(start.getFullYear() - 1);
    end.setFullYear(end.getFullYear() - 1);
  } else {
    // Previous Period
    start.setTime(start.getTime() - duration);
    end.setTime(end.getTime() - duration);
  }
  return { start, end };
};

const isWithinInterval = (dateString, start, end) => {
  if (!dateString) return false;
  const t = new Date(dateString).getTime();
  return t >= start.getTime() && t <= end.getTime();
};

const calculateGrowth = (current, previous) => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
};

export function AnalyticsProvider({ children }) {
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [comparisonRange, setComparisonRange] = useState('Previous Period');
  const [filters, setFilters] = useState({});

  const { orders } = useOrders();
  const { transactions } = useFinance();
  const { customers } = useCustomers();
  const { products } = useProducts();
  const { categories } = useCategories();

  // Filter datasets
  const filteredData = useMemo(() => {
    const currentDates = getRangeDates(dateRange);
    const prevDates = getComparisonDates(dateRange, comparisonRange, currentDates.start, currentDates.end);

    const currOrders = orders.filter(o => isWithinInterval(o.date, currentDates.start, currentDates.end));
    const prevOrders = orders.filter(o => isWithinInterval(o.date, prevDates.start, prevDates.end));

    const currTxns = transactions.filter(t => isWithinInterval(t.date, currentDates.start, currentDates.end));
    const prevTxns = transactions.filter(t => isWithinInterval(t.date, prevDates.start, prevDates.end));

    return { currOrders, prevOrders, currTxns, prevTxns, currentDates, prevDates };
  }, [orders, transactions, dateRange, comparisonRange]);

  // Aggregation Engine
  const getOverviewMetrics = useMemo(() => {
    return () => {
      const calcMetrics = (ords, txns) => {
        let grossRevenue = 0;
        let totalRefunds = 0;
        
        txns.forEach(txn => {
          if (txn.status === 'Completed') {
            if (txn.type === 'Payment') grossRevenue += txn.amount;
            if (txn.type === 'Refund') totalRefunds += txn.amount;
          }
        });
        
        const netRevenue = grossRevenue - totalRefunds;
        
        // Count valid orders (not cancelled/refunded as "sales")
        const qualifyingOrders = ords.filter(o => o.status !== 'cancelled');
        const totalOrders = qualifyingOrders.length;
        const aov = totalOrders > 0 ? netRevenue / totalOrders : 0;
        
        const returns = ords.filter(o => o.status === 'returned').length;
        
        let newCustomers = 0;
        // In a real system, we check if customer's first order is in this interval
        const uniqueCustomers = new Set(ords.map(o => o.customerId));
        
        return { grossRevenue, netRevenue, totalOrders, aov, returns, uniqueCustomers: uniqueCustomers.size };
      };

      const curr = calcMetrics(filteredData.currOrders, filteredData.currTxns);
      const prev = calcMetrics(filteredData.prevOrders, filteredData.prevTxns);

      return {
        revenue: { current: curr.grossRevenue, previous: prev.grossRevenue, trend: calculateGrowth(curr.grossRevenue, prev.grossRevenue) },
        netRevenue: { current: curr.netRevenue, previous: prev.netRevenue, trend: calculateGrowth(curr.netRevenue, prev.netRevenue) },
        orders: { current: curr.totalOrders, previous: prev.totalOrders, trend: calculateGrowth(curr.totalOrders, prev.totalOrders) },
        aov: { current: curr.aov, previous: prev.aov, trend: calculateGrowth(curr.aov, prev.aov) },
        customers: { current: curr.uniqueCustomers, previous: prev.uniqueCustomers, trend: calculateGrowth(curr.uniqueCustomers, prev.uniqueCustomers) },
        returns: { current: curr.returns, previous: prev.returns, trend: calculateGrowth(curr.returns, prev.returns) },
        returningRate: { current: 15, previous: 12, trend: 25 }, // Mocked until complex cohort analysis
        conversionRate: { current: 3.2, previous: 2.8, trend: 14 } // External traffic mock
      };
    };
  }, [filteredData]);

  const getSalesMetrics = useMemo(() => {
    return () => {
      let grossSales = 0;
      let refunds = 0;
      let discounts = 0;
      let unitsSold = 0;

      filteredData.currTxns.forEach(txn => {
        if (txn.status === 'Completed') {
          if (txn.type === 'Payment') grossSales += txn.amount;
          if (txn.type === 'Refund') refunds += txn.amount;
        }
      });

      filteredData.currOrders.forEach(o => {
        if (o.status !== 'cancelled') {
          discounts += (o.discountAmount || 0);
          o.items.forEach(i => unitsSold += i.quantity);
        }
      });

      const netSales = grossSales - refunds;

      // Group by date for trend
      const trendMap = {};
      filteredData.currTxns.forEach(txn => {
        if (txn.status === 'Completed') {
          const date = new Date(txn.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          if (!trendMap[date]) trendMap[date] = { date, revenue: 0, orders: 0 };
          if (txn.type === 'Payment') trendMap[date].revenue += txn.amount;
          if (txn.type === 'Refund') trendMap[date].revenue -= txn.amount;
        }
      });
      
      filteredData.currOrders.forEach(o => {
        if (o.status !== 'cancelled') {
           const date = new Date(o.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
           if (!trendMap[date]) trendMap[date] = { date, revenue: 0, orders: 0 };
           trendMap[date].orders += 1;
        }
      });

      const trend = Object.values(trendMap).sort((a, b) => new Date(a.date) - new Date(b.date));

      return {
        trend,
        grossSales,
        discounts,
        refunds,
        netSales,
        unitsSold
      };
    };
  }, [filteredData]);

  const service = {
    getOverviewMetrics,
    getSalesMetrics,
    getOrderMetrics: () => {
       const statusCount = {};
       filteredData.currOrders.forEach(o => {
         statusCount[o.status] = (statusCount[o.status] || 0) + 1;
       });
       const statusDistribution = Object.keys(statusCount).map(k => ({ name: k, value: statusCount[k] }));
       return {
         statusDistribution,
         totalOrders: filteredData.currOrders.length,
         cancelled: filteredData.currOrders.filter(o => o.status === 'cancelled').length,
         returned: filteredData.currOrders.filter(o => o.status === 'returned').length
       }
    },
    getCustomerMetrics: () => {
       const customerStats = {};
       
       filteredData.currOrders.forEach(o => {
         if (o.status === 'cancelled') return;
         if (!customerStats[o.customerId]) {
           const c = customers.find(cust => cust.id === o.customerId) || {};
           customerStats[o.customerId] = {
             id: o.customerId,
             name: c.firstName ? `\${c.firstName} \${c.lastName}` : (o.customerName || 'Guest'),
             orders: 0,
             units: 0,
             grossSales: 0,
             discount: 0,
             refund: 0
           };
         }
         const st = customerStats[o.customerId];
         st.orders += 1;
         st.discount += (o.discountAmount || 0);
         o.items.forEach(i => {
           st.units += i.quantity;
           st.grossSales += (i.quantity * i.price);
         });
       });

       filteredData.currTxns.forEach(t => {
         if (t.type === 'Refund' && t.status === 'Completed') {
           const o = filteredData.currOrders.find(ord => ord.id === t.orderId);
           if (o && customerStats[o.customerId]) {
             customerStats[o.customerId].refund += t.amount;
           }
         }
       });

       const allCustomers = Object.values(customerStats).map(c => {
         c.netRevenue = c.grossSales - c.refund;
         c.aov = c.orders > 0 ? c.netRevenue / c.orders : 0;
         return c;
       });

       const newCustomers = customers.filter(c => {
         // Using simplified logic: joined in current period
         return isWithinInterval(c.joinedAt, filteredData.currentDates.start, filteredData.currentDates.end);
       }).length;

       const returningCustomers = customers.filter(c => c.totalOrders > 1).length;

       return {
         totalCustomers: customers.length,
         newCustomers,
         returningCustomers,
         activeCustomers: allCustomers.length,
         atRiskCustomers: customers.filter(c => c.tags?.includes('At Risk')).length,
         vipCustomers: customers.filter(c => c.tags?.includes('VIP')).length,
         growth: [],
         topCustomers: allCustomers.sort((a, b) => b.netRevenue - a.netRevenue)
       };
    },
    getProductMetrics: () => {
       const productMap = {};
       filteredData.currOrders.forEach(o => {
         if (o.status === 'cancelled') return;
         o.items.forEach(i => {
           if (!productMap[i.id]) {
             const prod = products.find(p => p.id === i.id) || {};
             productMap[i.id] = { id: i.id, name: i.name, category: prod.category || 'Unknown', units: 0, revenue: 0, orders: 0 };
           }
           productMap[i.id].units += i.quantity;
           productMap[i.id].revenue += (i.quantity * i.price);
           productMap[i.id].orders += 1;
         });
       });
       const sorted = Object.values(productMap).sort((a,b) => b.revenue - a.revenue);
       return {
         bestSellers: sorted.slice(0, 5),
         lowPerforming: sorted.slice(-5),
         all: sorted,
         mostViewed: [],
         mostAddedToCart: []
       };
    },
    getCategoryMetrics: () => {
      const catMap = {};
      filteredData.currOrders.forEach(o => {
        if (o.status === 'cancelled') return;
        o.items.forEach(i => {
          const prod = products.find(p => p.id === i.id) || {};
          const catName = prod.category || 'Unknown';
          if (!catMap[catName]) {
            catMap[catName] = { name: catName, units: 0, revenue: 0, orders: 0 };
          }
          catMap[catName].units += i.quantity;
          catMap[catName].revenue += (i.quantity * i.price);
          catMap[catName].orders += 1;
        });
      });
      return {
        all: Object.values(catMap).sort((a,b) => b.revenue - a.revenue)
      };
    },
    getCollectionMetrics: () => ({ revenue: [], orders: [] }),
    getInventoryMetrics: () => {
      let totalItems = 0;
      let lowStock = 0;
      let outOfStock = 0;
      let inventoryValue = 0;

      const items = products.map(p => {
        totalItems += p.stock;
        inventoryValue += (p.stock * p.price);
        if (p.stock === 0) outOfStock++;
        else if (p.stock < 10) lowStock++;

        return {
          id: p.id,
          sku: p.sku,
          name: p.name,
          category: p.category,
          stock: p.stock,
          price: p.price,
          value: p.stock * p.price,
          status: p.stock === 0 ? 'Out of Stock' : (p.stock < 10 ? 'Low Stock' : 'In Stock')
        };
      });

      return {
        totalItems,
        lowStock,
        outOfStock,
        inventoryValue,
        items: items.sort((a,b) => a.stock - b.stock) // lowest stock first
      };
    },
    getMarketingMetrics: () => {
      const promoMap = {};
      const couponMap = {};
      const campaignMap = {};

      filteredData.currOrders.forEach(o => {
        if (o.status === 'cancelled') return;

        const netRev = o.total - (o.discountAmount || 0);

        if (o.promotionId) {
          if (!promoMap[o.promotionId]) promoMap[o.promotionId] = { id: o.promotionId, name: o.promotionId, orders: 0, discount: 0, revenue: 0 };
          promoMap[o.promotionId].orders += 1;
          promoMap[o.promotionId].discount += (o.discountAmount || 0);
          promoMap[o.promotionId].revenue += netRev;
        }

        if (o.couponCode) {
          if (!couponMap[o.couponCode]) couponMap[o.couponCode] = { id: o.couponCode, code: o.couponCode, orders: 0, discount: 0, revenue: 0 };
          couponMap[o.couponCode].orders += 1;
          couponMap[o.couponCode].discount += (o.discountAmount || 0);
          couponMap[o.couponCode].revenue += netRev;
        }

        if (o.campaignId) {
          if (!campaignMap[o.campaignId]) campaignMap[o.campaignId] = { id: o.campaignId, name: o.campaignId, orders: 0, discount: 0, revenue: 0 };
          campaignMap[o.campaignId].orders += 1;
          campaignMap[o.campaignId].discount += (o.discountAmount || 0);
          campaignMap[o.campaignId].revenue += netRev;
        }
      });

      return {
        promotions: Object.values(promoMap).sort((a,b) => b.revenue - a.revenue),
        coupons: Object.values(couponMap).sort((a,b) => b.revenue - a.revenue),
        campaigns: Object.values(campaignMap).sort((a,b) => b.revenue - a.revenue)
      };
    },
    getPromotionMetrics: () => ({ active: 3, usage: 450, discountValue: 12500, revenueImpact: 45000 }),
    getSearchMetrics: () => ({ total: 12000, unique: 4500, zeroResultRate: 2.4, conversion: 1.8 }),
    getLoyaltyMetrics: () => ({ members: 4500, pointsIssued: 150000, pointsRedeemed: 45000 }),
    getReviewMetrics: () => ({ total: 1250, averageRating: 4.6, pending: 15 }),
    getReturnMetrics: () => ({ requests: 45, approved: 40, completed: 35, returnRate: 3.1 }),
    getSupportMetrics: () => ({ openTickets: 12, resolvedTickets: 450, resolutionTime: 4.5, satisfaction: 4.8 }),
    getCMSMetrics: () => ({ pageViews: 145000, bounceRate: 45.2 }),
    getReportData: () => ({ data: [], status: 'mock' })
  };

  const value = {
    dateRange,
    setDateRange,
    comparisonRange,
    setComparisonRange,
    filters,
    setFilters,
    clearFilters: () => setFilters({}),
    reports: [],
    saveReport: () => {},
    widgets: [],
    updateWidgetLayout: () => {},
    service
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export const useAnalytics = () => useContext(AnalyticsContext);
