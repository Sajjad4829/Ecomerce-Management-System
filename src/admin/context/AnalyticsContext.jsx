import React, { createContext, useContext, useState, useMemo } from 'react';
import { useOrders } from './orders/OrderContext';
import { useFinance } from './finance/FinanceContext';
import { useCustomers } from './customers/CustomerContext';
import { useProducts } from './commerce/ProductContext';
import { useCategories } from './commerce/CategoryContext';
import { useMarketing } from './MarketingContext';

const AnalyticsContext = createContext();

// Format Currency Utility
export const formatCurrency = (value, currency = 'USD') => {
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value);
  } catch (e) {
    return `$${value.toFixed(2)}`;
  }
};

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
  const { abandonedCarts, segments } = useMarketing();

  // Filter datasets globally
  const filteredData = useMemo(() => {
    const currentDates = getRangeDates(dateRange);
    const prevDates = getComparisonDates(dateRange, comparisonRange, currentDates.start, currentDates.end);

    const applyFilters = (dataset, type) => {
      return dataset.filter(item => {
        // Global category filter
        if (filters.category && type === 'orders') {
          const hasCategory = item.items?.some(i => {
            const p = products.find(prod => prod.id === i.id);
            return p && p.categoryId === filters.category;
          });
          if (!hasCategory) return false;
        }
        if (filters.product && type === 'orders') {
          const hasProduct = item.items?.some(i => i.id === filters.product);
          if (!hasProduct) return false;
        }
        if (filters.customerSegment && type === 'orders') {
          const c = customers.find(cust => cust.id === item.customerId);
          if (!c || c.segmentId !== filters.customerSegment) return false;
        }
        if (filters.loyaltyTier && type === 'orders') {
           const c = customers.find(cust => cust.id === item.customerId);
           if (!c || c.loyaltyTier !== filters.loyaltyTier) return false;
        }
        if (filters.promotion && type === 'orders') {
           if (item.promotionId !== filters.promotion) return false;
        }
        if (filters.campaign && type === 'orders') {
           if (item.campaignId !== filters.campaign) return false;
        }
        return true;
      });
    };

    const currOrdersRaw = orders.filter(o => isWithinInterval(o.date, currentDates.start, currentDates.end));
    const prevOrdersRaw = orders.filter(o => isWithinInterval(o.date, prevDates.start, prevDates.end));
    
    const currOrders = applyFilters(currOrdersRaw, 'orders');
    const prevOrders = applyFilters(prevOrdersRaw, 'orders');

    const currTxns = transactions.filter(t => isWithinInterval(t.date, currentDates.start, currentDates.end));
    const prevTxns = transactions.filter(t => isWithinInterval(t.date, prevDates.start, prevDates.end));

    const currCarts = (abandonedCarts || []).filter(c => isWithinInterval(c.createdAt, currentDates.start, currentDates.end));

    // Guess base currency from txns
    const baseCurrency = transactions.length > 0 ? transactions[0].currency || 'USD' : 'USD';

    return { currOrders, prevOrders, currTxns, prevTxns, currCarts, currentDates, prevDates, baseCurrency };
  }, [orders, transactions, customers, products, abandonedCarts, dateRange, comparisonRange, filters]);

  // Aggregation Engine
  const getOverviewMetrics = useMemo(() => {
    return () => {
      const calcMetrics = (ords, txns) => {
        let grossRevenue = 0;
        let totalRefunds = 0;
        let discounts = 0;
        
        txns.forEach(txn => {
          if (txn.status === 'Completed') {
            if (txn.type === 'Payment') grossRevenue += txn.amount;
            if (txn.type === 'Refund') totalRefunds += txn.amount;
          }
        });
        
        const netRevenue = grossRevenue - totalRefunds;
        const qualifyingOrders = ords.filter(o => o.status !== 'cancelled');
        const totalOrders = qualifyingOrders.length;
        const aov = totalOrders > 0 ? netRevenue / totalOrders : 0;
        const returns = ords.filter(o => o.status === 'returned').length;
        
        let unitsSold = 0;
        qualifyingOrders.forEach(o => {
          discounts += (o.discountAmount || 0);
          o.items?.forEach(i => unitsSold += i.quantity);
        });

        const uniqueCustomers = new Set(qualifyingOrders.map(o => o.customerId));
        return { grossRevenue, netRevenue, totalOrders, aov, returns, uniqueCustomers: uniqueCustomers.size, unitsSold, discounts };
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
        unitsSold: { current: curr.unitsSold, previous: prev.unitsSold, trend: calculateGrowth(curr.unitsSold, prev.unitsSold) },
        discounts: { current: curr.discounts, previous: prev.discounts, trend: calculateGrowth(curr.discounts, prev.discounts) }
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
          o.items?.forEach(i => unitsSold += i.quantity);
        }
      });

      const netSales = grossSales - refunds;

      // Group by date for trend based on range
      const trendMap = {};
      const addTrend = (dateStr, type, amount, count) => {
         if (!trendMap[dateStr]) trendMap[dateStr] = { date: dateStr, revenue: 0, orders: 0, units: 0, refunds: 0 };
         if (type === 'payment') trendMap[dateStr].revenue += amount;
         if (type === 'refund') trendMap[dateStr].refunds += amount;
         if (type === 'order') trendMap[dateStr].orders += count;
         if (type === 'units') trendMap[dateStr].units += count;
      };

      filteredData.currTxns.forEach(txn => {
        if (txn.status === 'Completed') {
          const dateStr = new Date(txn.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          addTrend(dateStr, txn.type.toLowerCase(), txn.amount, 1);
        }
      });
      
      filteredData.currOrders.forEach(o => {
        if (o.status !== 'cancelled') {
           const dateStr = new Date(o.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
           addTrend(dateStr, 'order', o.total, 1);
           const units = o.items?.reduce((acc, i) => acc + i.quantity, 0) || 0;
           addTrend(dateStr, 'units', 0, units);
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

  const getBusinessInsights = useMemo(() => {
    return () => {
      const insights = [];
      const over = getOverviewMetrics();
      
      // Revenue Growth
      if (over.netRevenue.trend > 10) {
         insights.push({ type: 'Positive', text: `Net revenue increased by ${over.netRevenue.trend.toFixed(1)}% compared to the previous period.` });
      } else if (over.netRevenue.trend < -10) {
         insights.push({ type: 'Needs Attention', text: `Net revenue decreased by ${Math.abs(over.netRevenue.trend).toFixed(1)}% compared to the previous period.` });
      } else {
         insights.push({ type: 'Neutral', text: `Revenue remained relatively stable.` });
      }

      // Return Rate
      const currentOrders = over.orders.current;
      const currentReturns = over.returns.current;
      const returnRate = currentOrders > 0 ? (currentReturns / currentOrders) * 100 : 0;
      if (returnRate > 5) {
         insights.push({ type: 'Needs Attention', text: `High return rate of ${returnRate.toFixed(1)}% detected.` });
      }

      // AOV
      if (over.aov.trend > 5) {
         insights.push({ type: 'Positive', text: `Average Order Value grew by ${over.aov.trend.toFixed(1)}%.` });
      }

      return insights;
    };
  }, [getOverviewMetrics]);

  const service = {
    baseCurrency: filteredData.baseCurrency,
    formatCurrency: (val) => formatCurrency(val, filteredData.baseCurrency),
    getOverviewMetrics,
    getSalesMetrics,
    getBusinessInsights,
    getOrderMetrics: () => {
       const statusCount = {};
       filteredData.currOrders.forEach(o => {
         statusCount[o.status] = (statusCount[o.status] || 0) + 1;
       });
       const statusDistribution = Object.keys(statusCount).map(k => ({ name: k, value: statusCount[k] }));
       return {
         statusDistribution,
         totalOrders: filteredData.currOrders.length,
         completed: filteredData.currOrders.filter(o => o.status === 'completed' || o.status === 'delivered').length,
         pending: filteredData.currOrders.filter(o => o.status === 'pending').length,
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
             name: c.firstName ? `${c.firstName} ${c.lastName}` : (o.customerName || 'Guest'),
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
         o.items?.forEach(i => {
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

       const newCustomers = customers.filter(c => isWithinInterval(c.joinedAt, filteredData.currentDates.start, filteredData.currentDates.end)).length;
       const returningCustomers = customers.filter(c => c.totalOrders > 1).length;

       return {
         totalCustomers: customers.length,
         newCustomers,
         returningCustomers,
         activeCustomers: allCustomers.length,
         topCustomers: allCustomers.sort((a, b) => b.netRevenue - a.netRevenue),
         bySegment: segments?.map(seg => ({
            name: seg.name,
            customers: seg.customerCount,
            revenue: Math.floor(Math.random() * 50000) // Mocked segment revenue for now since we don't have historical order tags by segment
         })) || []
       };
    },
    getProductMetrics: () => {
       const productMap = {};
       filteredData.currOrders.forEach(o => {
         if (o.status === 'cancelled') return;
         o.items?.forEach(i => {
           if (!productMap[i.id]) {
             const prod = products.find(p => p.id === i.id) || {};
             productMap[i.id] = { id: i.id, name: i.name, category: prod.category || 'Unknown', units: 0, revenue: 0, orders: 0, returns: 0, stock: prod.stock || 0 };
           }
           productMap[i.id].units += i.quantity;
           productMap[i.id].revenue += (i.quantity * i.price);
           productMap[i.id].orders += 1;
         });
         
         if (o.status === 'returned') {
            o.items?.forEach(i => {
               if (productMap[i.id]) productMap[i.id].returns += i.quantity;
            });
         }
       });

       const all = Object.values(productMap);
       all.forEach(p => {
          p.returnRate = p.units > 0 ? (p.returns / p.units) * 100 : 0;
       });

       const sortedByRev = [...all].sort((a,b) => b.revenue - a.revenue);
       const sortedByUnits = [...all].sort((a,b) => b.units - a.units);
       
       const needsAttention = all.filter(p => p.returnRate > 10 || (p.stock > 50 && p.units < 2)).sort((a,b) => b.returnRate - a.returnRate);

       return {
         bestSellersRev: sortedByRev.slice(0, 10),
         bestSellersUnits: sortedByUnits.slice(0, 10),
         needsAttention: needsAttention,
         all: sortedByRev
       };
    },
    getCategoryMetrics: () => {
      const catMap = {};
      filteredData.currOrders.forEach(o => {
        if (o.status === 'cancelled') return;
        o.items?.forEach(i => {
          const prod = products.find(p => p.id === i.id) || {};
          const catName = prod.category || 'Unknown';
          if (!catMap[catName]) {
            catMap[catName] = { name: catName, units: 0, revenue: 0, orders: 0, returns: 0, refunds: 0 };
          }
          catMap[catName].units += i.quantity;
          catMap[catName].revenue += (i.quantity * i.price);
          catMap[catName].orders += 1;
        });

        if (o.status === 'returned') {
           o.items?.forEach(i => {
              const prod = products.find(p => p.id === i.id) || {};
              const catName = prod.category || 'Unknown';
              if (catMap[catName]) catMap[catName].returns += i.quantity;
           });
        }
      });

      const all = Object.values(catMap).map(c => {
         c.aov = c.orders > 0 ? c.revenue / c.orders : 0;
         return c;
      }).sort((a,b) => b.revenue - a.revenue);

      return { all };
    },
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

        // Calculate sales velocity (units / days in range)
        const days = (filteredData.currentDates.end.getTime() - filteredData.currentDates.start.getTime()) / (1000 * 3600 * 24) || 30;
        let unitsSold = 0;
        filteredData.currOrders.forEach(o => {
           if (o.status !== 'cancelled') {
              o.items?.forEach(i => { if(i.id === p.id) unitsSold += i.quantity; });
           }
        });
        const velocity = unitsSold / days;

        return {
          id: p.id,
          sku: p.sku,
          name: p.name,
          category: p.category,
          stock: p.stock,
          price: p.price,
          value: p.stock * p.price,
          unitsSold,
          velocity: velocity.toFixed(2),
          status: p.stock === 0 ? 'Out of Stock' : (p.stock < 10 ? 'Low Stock' : 'In Stock')
        };
      });

      return {
        totalItems,
        lowStock,
        outOfStock,
        inventoryValue,
        items: items.sort((a,b) => a.stock - b.stock)
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
    getAbandonedCartMetrics: () => {
       const carts = filteredData.currCarts;
       const totalCarts = carts.length;
       const recovered = carts.filter(c => c.status === 'Recovered');
       const recoveredCarts = recovered.length;
       const recoveryRate = totalCarts > 0 ? (recoveredCarts / totalCarts) * 100 : 0;
       
       let potentialRevenue = 0;
       let recoveredRevenue = 0;
       
       carts.forEach(c => potentialRevenue += c.total);
       recovered.forEach(c => recoveredRevenue += c.total);

       return {
          totalCarts,
          recoveredCarts,
          recoveryRate,
          potentialRevenue,
          recoveredRevenue,
          all: carts
       };
    },
    getPaymentMetrics: () => {
       const methods = {};
       filteredData.currTxns.forEach(t => {
          if (!methods[t.method]) methods[t.method] = { method: t.method, transactions: 0, amount: 0, refunds: 0, successCount: 0 };
          methods[t.method].transactions += 1;
          if (t.type === 'Payment') methods[t.method].amount += t.amount;
          if (t.type === 'Refund') methods[t.method].refunds += t.amount;
          if (t.status === 'Completed') methods[t.method].successCount += 1;
       });

       const all = Object.values(methods).map(m => {
          m.successRate = m.transactions > 0 ? (m.successCount / m.transactions) * 100 : 0;
          return m;
       }).sort((a,b) => b.amount - a.amount);

       return { all };
    },
    getReturnMetrics: () => {
       const returns = filteredData.currOrders.filter(o => o.status === 'returned');
       let returnedUnits = 0;
       returns.forEach(o => o.items?.forEach(i => returnedUnits += i.quantity));
       
       let refundAmount = 0;
       filteredData.currTxns.forEach(t => {
          if (t.type === 'Refund' && t.status === 'Completed') refundAmount += t.amount;
       });

       return {
          returnedOrders: returns.length,
          returnedUnits,
          refundAmount,
          returnRate: filteredData.currOrders.length > 0 ? (returns.length / filteredData.currOrders.length) * 100 : 0
       };
    }
  };

  const value = {
    dateRange,
    setDateRange,
    comparisonRange,
    setComparisonRange,
    filters,
    setFilters,
    clearFilters: () => setFilters({}),
    service
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export const useAnalytics = () => useContext(AnalyticsContext);
