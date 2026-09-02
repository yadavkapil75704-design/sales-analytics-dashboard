import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  SalesOrder,
  FilterState,
  KPIMetrics,
  MonthlyTrendData,
  DailyTrendData,
  ChannelMetrics,
  RegionalMetrics,
  SegmentMetrics,
  ProductMetrics,
  RepPerformance,
  ThemePreset,
  SavedViewPreset,
  Region,
  SalesChannel,
  CustomerSegment,
  OrderStatus,
  PaymentMethod
} from '../types/dashboard';
import { INITIAL_ORDERS, REPS, CUSTOMERS, PRODUCTS, SAVED_PRESETS } from '../data/mockData';

const DEFAULT_FILTERS: FilterState = {
  datePreset: '12m',
  startDate: '',
  endDate: '',
  region: 'All',
  category: 'All',
  channel: 'All',
  segment: 'All',
  salesRepId: 'All',
  status: 'All',
  searchQuery: '',
};

export interface DashboardNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'sale' | 'alert' | 'system';
}

interface DashboardContextType {
  orders: SalesOrder[];
  filteredOrders: SalesOrder[];
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
  crossFilter: (updates: Partial<FilterState>) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  themePreset: ThemePreset;
  setThemePreset: (preset: ThemePreset) => void;
  isLiveSimulation: boolean;
  setIsLiveSimulation: (live: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (sound: boolean) => void;
  revenueTarget: number;
  setRevenueTarget: (target: number) => void;
  selectedOrder: SalesOrder | null;
  setSelectedOrder: (order: SalesOrder | null) => void;
  isNewOrderModalOpen: boolean;
  setIsNewOrderModalOpen: (open: boolean) => void;
  savedPresets: SavedViewPreset[];
  applySavedPreset: (preset: SavedViewPreset) => void;
  notifications: DashboardNotification[];
  addOrder: (newOrder: Partial<SalesOrder>) => void;
  kpis: KPIMetrics;
  monthlyTrend: MonthlyTrendData[];
  dailyTrend: DailyTrendData[];
  channelMetrics: ChannelMetrics[];
  regionalMetrics: RegionalMetrics[];
  segmentMetrics: SegmentMetrics[];
  productMetrics: ProductMetrics[];
  repPerformance: RepPerformance[];
  activeFilterCount: number;
  triggerConfetti: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<SalesOrder[]>(INITIAL_ORDERS);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [themePreset, setThemePreset] = useState<ThemePreset>('indigo');
  const [isLiveSimulation, setIsLiveSimulation] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [revenueTarget, setRevenueTarget] = useState<number>(2500000);
  const [selectedOrder, setSelectedOrder] = useState<SalesOrder | null>(null);
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState<boolean>(false);
  const [savedPresets] = useState<SavedViewPreset[]>(SAVED_PRESETS);
  const [notifications, setNotifications] = useState<DashboardNotification[]>([
    {
      id: 'n-1',
      title: 'New High Value Deal Closed!',
      message: 'Sarah Jenkins closed Apex Tech Solutions for $42,000',
      time: '2 mins ago',
      type: 'sale'
    },
    {
      id: 'n-2',
      title: 'Monthly Target Reached',
      message: 'Europe Region achieved 105% of Q3 Target!',
      time: '1 hour ago',
      type: 'alert'
    }
  ]);

  // Sync dark class on document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const updateFilter = useCallback(<K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const crossFilter = useCallback((updates: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...updates }));
  }, []);

  const triggerConfetti = useCallback(() => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  // Filter calculation
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      // Date filter
      const orderDate = new Date(order.date);
      const now = new Date();

      if (filters.datePreset === 'today') {
        const todayStr = now.toISOString().split('T')[0];
        if (order.date !== todayStr) return false;
      } else if (filters.datePreset === '7d') {
        const cutoff = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        if (orderDate < cutoff) return false;
      } else if (filters.datePreset === '30d') {
        const cutoff = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        if (orderDate < cutoff) return false;
      } else if (filters.datePreset === '90d') {
        const cutoff = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        if (orderDate < cutoff) return false;
      } else if (filters.datePreset === 'ytd') {
        const yearStart = new Date(now.getFullYear(), 0, 1);
        if (orderDate < yearStart) return false;
      } else if (filters.datePreset === 'custom') {
        if (filters.startDate && new Date(order.date) < new Date(filters.startDate)) return false;
        if (filters.endDate && new Date(order.date) > new Date(filters.endDate)) return false;
      }

      // Region
      if (filters.region !== 'All' && order.region !== filters.region) return false;

      // Category
      if (filters.category !== 'All' && order.category !== filters.category) return false;

      // Channel
      if (filters.channel !== 'All' && order.channel !== filters.channel) return false;

      // Segment
      if (filters.segment !== 'All' && order.customer.segment !== filters.segment) return false;

      // Sales Rep
      if (filters.salesRepId !== 'All' && order.salesRep.id !== filters.salesRepId) return false;

      // Status
      if (filters.status !== 'All' && order.status !== filters.status) return false;

      // Search Query
      if (filters.searchQuery.trim() !== '') {
        const q = filters.searchQuery.toLowerCase();
        const matchesId = order.id.toLowerCase().includes(q);
        const matchesCust = order.customer.name.toLowerCase().includes(q) || order.customer.company.toLowerCase().includes(q);
        const matchesProd = order.productName.toLowerCase().includes(q);
        const matchesRep = order.salesRep.name.toLowerCase().includes(q);
        if (!matchesId && !matchesCust && !matchesProd && !matchesRep) return false;
      }

      return true;
    });
  }, [orders, filters]);

  // Active filters counter
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.datePreset !== '12m') count++;
    if (filters.region !== 'All') count++;
    if (filters.category !== 'All') count++;
    if (filters.channel !== 'All') count++;
    if (filters.segment !== 'All') count++;
    if (filters.salesRepId !== 'All') count++;
    if (filters.status !== 'All') count++;
    if (filters.searchQuery.trim() !== '') count++;
    return count;
  }, [filters]);

  // KPI Calculations
  const kpis: KPIMetrics = useMemo(() => {
    const totalRev = filteredOrders.reduce((acc, o) => acc + (o.status !== 'Cancelled' && o.status !== 'Refunded' ? o.amount : 0), 0);
    const totalCost = filteredOrders.reduce((acc, o) => acc + (o.status !== 'Cancelled' && o.status !== 'Refunded' ? o.cost : 0), 0);
    const completedOrders = filteredOrders.filter(o => o.status !== 'Cancelled');
    const count = completedOrders.length;
    const avgOrder = count > 0 ? totalRev / count : 0;
    const netProfit = totalRev - totalCost;
    const margin = totalRev > 0 ? (netProfit / totalRev) * 100 : 0;
    const cac = 1420;
    const conversion = 3.68;
    const quotaPct = revenueTarget > 0 ? Math.min(100, (totalRev / revenueTarget) * 100) : 0;

    return {
      totalRevenue: totalRev,
      revenueChangePct: 14.8,
      totalOrders: count,
      ordersChangePct: 8.2,
      avgOrderValue: avgOrder,
      aovChangePct: 5.4,
      netProfit,
      marginPct: Number(margin.toFixed(1)),
      marginChangePct: 2.1,
      conversionRate: conversion,
      conversionChangePct: 0.4,
      customerAcquisitionCost: cac,
      cacChangePct: -3.5,
      quotaAttainmentPct: Number(quotaPct.toFixed(1)),
      targetRevenue: revenueTarget,
    };
  }, [filteredOrders, revenueTarget]);

  // Monthly Trend Data
  const monthlyTrend: MonthlyTrendData[] = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthStats: Record<string, { revenue: number; prevRevenue: number; orders: number; profit: number }> = {};
    
    months.forEach(m => {
      monthStats[m] = { revenue: 0, prevRevenue: 0, orders: 0, profit: 0 };
    });

    filteredOrders.forEach(o => {
      if (o.status === 'Cancelled' || o.status === 'Refunded') return;
      const d = new Date(o.date);
      const mName = months[d.getMonth()];
      if (monthStats[mName]) {
        monthStats[mName].revenue += o.amount;
        monthStats[mName].prevRevenue += Math.round(o.amount * 0.85);
        monthStats[mName].orders += 1;
        monthStats[mName].profit += o.margin;
      }
    });

    return months.map(m => ({
      month: m,
      revenue: monthStats[m].revenue,
      previousRevenue: monthStats[m].prevRevenue,
      orders: monthStats[m].orders,
      profit: monthStats[m].profit,
      target: Math.round(revenueTarget / 12)
    }));
  }, [filteredOrders, revenueTarget]);

  // Daily Trend Data (Past 30 days)
  const dailyTrend: DailyTrendData[] = useMemo(() => {
    const days: DailyTrendData[] = [];
    const now = new Date();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateStr = d.toISOString().split('T')[0];
      const shortDate = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      
      const dayOrders = filteredOrders.filter(o => o.date === dateStr && o.status !== 'Cancelled' && o.status !== 'Refunded');
      const rev = dayOrders.reduce((a, b) => a + b.amount, 0);
      const profit = dayOrders.reduce((a, b) => a + b.margin, 0);

      days.push({
        date: dateStr,
        shortDate,
        revenue: rev,
        orders: dayOrders.length,
        profit
      });
    }
    return days;
  }, [filteredOrders]);

  // Channel Metrics
  const channelMetrics: ChannelMetrics[] = useMemo(() => {
    const channels: SalesChannel[] = ['Direct Sales', 'Online Store', 'Partner Network', 'Inbound Marketing'];
    const colors = ['#6366f1', '#10b981', '#f59e0b', '#ec4899'];

    const totals = channels.map((channel, idx) => {
      const chOrders = filteredOrders.filter(o => o.channel === channel && o.status !== 'Cancelled');
      const revenue = chOrders.reduce((acc, o) => acc + o.amount, 0);
      return {
        channel,
        revenue,
        orders: chOrders.length,
        percentage: 0,
        color: colors[idx]
      };
    });

    const sumRev = totals.reduce((a, b) => a + b.revenue, 0);
    return totals.map(item => ({
      ...item,
      percentage: sumRev > 0 ? Number(((item.revenue / sumRev) * 100).toFixed(1)) : 0
    }));
  }, [filteredOrders]);

  // Regional Metrics
  const regionalMetrics: RegionalMetrics[] = useMemo(() => {
    const regions: Region[] = ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East'];
    
    return regions.map(reg => {
      const regOrders = filteredOrders.filter(o => o.region === reg && o.status !== 'Cancelled');
      const revenue = regOrders.reduce((acc, o) => acc + o.amount, 0);
      
      const prodCounts: Record<string, number> = {};
      regOrders.forEach(o => {
        prodCounts[o.productName] = (prodCounts[o.productName] || 0) + o.amount;
      });
      let topProduct = 'None';
      let maxRev = 0;
      Object.entries(prodCounts).forEach(([name, rev]) => {
        if (rev > maxRev) {
          maxRev = rev;
          topProduct = name;
        }
      });

      return {
        region: reg,
        revenue,
        orders: regOrders.length,
        growthPct: Number((Math.random() * 15 + 5).toFixed(1)),
        topProduct
      };
    }).sort((a, b) => b.revenue - a.revenue);
  }, [filteredOrders]);

  // Segment Metrics
  const segmentMetrics: SegmentMetrics[] = useMemo(() => {
    const segments: CustomerSegment[] = ['Enterprise', 'SMB', 'Consumer'];

    return segments.map(seg => {
      const segOrders = filteredOrders.filter(o => o.customer.segment === seg && o.status !== 'Cancelled');
      const revenue = segOrders.reduce((acc, o) => acc + o.amount, 0);
      const count = segOrders.length;
      return {
        segment: seg,
        revenue,
        orders: count,
        avgOrderValue: count > 0 ? Math.round(revenue / count) : 0,
        retentionPct: seg === 'Enterprise' ? 94.2 : seg === 'SMB' ? 82.5 : 68.1
      };
    });
  }, [filteredOrders]);

  // Product Metrics
  const productMetrics: ProductMetrics[] = useMemo(() => {
    return PRODUCTS.map((prod, idx) => {
      const prodOrders = filteredOrders.filter(o => o.productName === prod.name && o.status !== 'Cancelled');
      const revenue = prodOrders.reduce((acc, o) => acc + o.amount, 0);
      const unitsSold = prodOrders.reduce((acc, o) => acc + o.quantity, 0);
      const marginTot = prodOrders.reduce((acc, o) => acc + o.margin, 0);
      const marginPct = revenue > 0 ? Number(((marginTot / revenue) * 100).toFixed(1)) : 80;

      const stocks: ('In Stock' | 'Low Stock' | 'Out of Stock')[] = ['In Stock', 'In Stock', 'Low Stock', 'In Stock', 'In Stock'];

      return {
        name: prod.name,
        category: prod.category,
        revenue,
        unitsSold,
        avgPrice: prod.basePrice,
        marginPct,
        growthPct: Number(((15 - idx * 2.2)).toFixed(1)),
        stockLevel: stocks[idx % stocks.length]
      };
    }).sort((a, b) => b.revenue - a.revenue);
  }, [filteredOrders]);

  // Rep Performance
  const repPerformance: RepPerformance[] = useMemo(() => {
    return REPS.map((rep, idx) => {
      const repOrders = filteredOrders.filter(o => o.salesRep.id === rep.id && o.status !== 'Cancelled');
      const revenue = repOrders.reduce((acc, o) => acc + o.amount, 0);
      const quotaPct = rep.quota > 0 ? Number(((revenue / rep.quota) * 100).toFixed(1)) : 0;
      const avgDeal = repOrders.length > 0 ? Math.round(revenue / repOrders.length) : 0;

      return {
        rep,
        revenue,
        ordersCount: repOrders.length,
        quotaAttainmentPct: quotaPct,
        winRatePct: 62 + (idx % 3) * 8,
        avgDealSize: avgDeal,
        csatScore: Number((4.6 + (idx % 4) * 0.1).toFixed(1)),
        upsellPct: 24 + idx * 5,
        avgCycleDays: 18 + idx * 3
      };
    }).sort((a, b) => b.revenue - a.revenue);
  }, [filteredOrders]);

  // Add order helper
  const addOrder = useCallback((newOrderData: Partial<SalesOrder>) => {
    const randomRep = REPS[Math.floor(Math.random() * REPS.length)];
    const randomCust = CUSTOMERS[Math.floor(Math.random() * CUSTOMERS.length)];
    const randomProd = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];

    const amount = newOrderData.amount || Math.round(randomProd.basePrice * (0.8 + Math.random() * 0.4));
    const cost = Math.round(amount * randomProd.baseCostPct);
    const margin = amount - cost;

    const fullOrder: SalesOrder = {
      id: `ORD-${Math.floor(8100 + Math.random() * 1000)}`,
      date: new Date().toISOString().split('T')[0],
      timestamp: new Date().toISOString(),
      customer: newOrderData.customer || randomCust,
      productName: newOrderData.productName || randomProd.name,
      category: newOrderData.category || randomProd.category,
      salesRep: newOrderData.salesRep || randomRep,
      region: newOrderData.region || randomRep.region,
      channel: newOrderData.channel || 'Online Store',
      quantity: newOrderData.quantity || 1,
      unitPrice: randomProd.basePrice,
      amount,
      discountPct: newOrderData.discountPct || 5,
      cost,
      margin,
      marginPct: Number(((margin / amount) * 100).toFixed(1)),
      status: (newOrderData.status as OrderStatus) || 'Completed',
      paymentMethod: (newOrderData.paymentMethod as PaymentMethod) || 'Credit Card'
    };

    setOrders(prev => [fullOrder, ...prev]);

    setNotifications(prev => [
      {
        id: `n-${Date.now()}`,
        title: 'New Live Order Received!',
        message: `${fullOrder.customer.company} ordered ${fullOrder.productName} for $${fullOrder.amount.toLocaleString()}`,
        time: 'Just now',
        type: 'sale'
      },
      ...prev.slice(0, 9)
    ]);
  }, []);

  // Live simulation timer
  useEffect(() => {
    if (!isLiveSimulation) return;

    const interval = setInterval(() => {
      addOrder({});
    }, 4000);

    return () => clearInterval(interval);
  }, [isLiveSimulation, addOrder]);

  const applySavedPreset = useCallback((preset: SavedViewPreset) => {
    setFilters(preset.filters);
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        orders,
        filteredOrders,
        filters,
        setFilters,
        updateFilter,
        resetFilters,
        crossFilter,
        activeTab,
        setActiveTab,
        darkMode,
        setDarkMode,
        themePreset,
        setThemePreset,
        isLiveSimulation,
        setIsLiveSimulation,
        soundEnabled,
        setSoundEnabled,
        revenueTarget,
        setRevenueTarget,
        selectedOrder,
        setSelectedOrder,
        isNewOrderModalOpen,
        setIsNewOrderModalOpen,
        savedPresets,
        applySavedPreset,
        notifications,
        addOrder,
        kpis,
        monthlyTrend,
        dailyTrend,
        channelMetrics,
        regionalMetrics,
        segmentMetrics,
        productMetrics,
        repPerformance,
        activeFilterCount,
        triggerConfetti
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
