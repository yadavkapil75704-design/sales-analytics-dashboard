export type Region = 'North America' | 'Europe' | 'Asia Pacific' | 'Latin America' | 'Middle East';
export type CustomerSegment = 'Enterprise' | 'SMB' | 'Consumer';
export type SalesChannel = 'Direct Sales' | 'Online Store' | 'Partner Network' | 'Inbound Marketing';
export type OrderStatus = 'Completed' | 'Processing' | 'Pending Approval' | 'Refunded' | 'Cancelled';
export type PaymentMethod = 'Credit Card' | 'Wire Transfer' | 'ACH Direct' | 'Invoice 30-Day';
export type ProductCategory = 'SaaS Enterprise' | 'Cloud Infrastructure' | 'Consulting Services' | 'API Subscriptions' | 'Hardware Peripherals';

export interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  avatar: string;
  segment: CustomerSegment;
}

export interface SalesRep {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  region: Region;
  quota: number;
}

export interface SalesOrder {
  id: string;
  date: string; // YYYY-MM-DD format
  timestamp: string; // ISO format
  customer: Customer;
  productName: string;
  category: ProductCategory;
  salesRep: SalesRep;
  region: Region;
  channel: SalesChannel;
  quantity: number;
  unitPrice: number;
  amount: number;
  discountPct: number;
  cost: number;
  margin: number;
  marginPct: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
}

export interface DateRangePreset {
  key: 'today' | '7d' | '30d' | '90d' | 'q1' | 'q2' | 'q3' | 'q4' | 'ytd' | '12m' | 'custom';
  label: string;
}

export interface FilterState {
  datePreset: 'today' | '7d' | '30d' | '90d' | 'q1' | 'q2' | 'q3' | 'q4' | 'ytd' | '12m' | 'custom';
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  region: Region | 'All';
  category: ProductCategory | 'All';
  channel: SalesChannel | 'All';
  segment: CustomerSegment | 'All';
  salesRepId: string | 'All';
  status: OrderStatus | 'All';
  searchQuery: string;
  minAmount?: number;
  maxAmount?: number;
}

export interface KPIMetrics {
  totalRevenue: number;
  revenueChangePct: number;
  totalOrders: number;
  ordersChangePct: number;
  avgOrderValue: number;
  aovChangePct: number;
  netProfit: number;
  marginPct: number;
  marginChangePct: number;
  conversionRate: number;
  conversionChangePct: number;
  customerAcquisitionCost: number;
  cacChangePct: number;
  quotaAttainmentPct: number;
  targetRevenue: number;
}

export interface MonthlyTrendData {
  month: string;
  revenue: number;
  previousRevenue: number;
  orders: number;
  profit: number;
  target: number;
}

export interface DailyTrendData {
  date: string;
  shortDate: string;
  revenue: number;
  orders: number;
  profit: number;
}

export interface ChannelMetrics {
  channel: SalesChannel;
  revenue: number;
  orders: number;
  percentage: number;
  color: string;
}

export interface RegionalMetrics {
  region: Region;
  revenue: number;
  orders: number;
  growthPct: number;
  topProduct: string;
}

export interface SegmentMetrics {
  segment: CustomerSegment;
  revenue: number;
  orders: number;
  avgOrderValue: number;
  retentionPct: number;
}

export interface ProductMetrics {
  name: string;
  category: ProductCategory;
  revenue: number;
  unitsSold: number;
  avgPrice: number;
  marginPct: number;
  growthPct: number;
  stockLevel: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

export interface RepPerformance {
  rep: SalesRep;
  revenue: number;
  ordersCount: number;
  quotaAttainmentPct: number;
  winRatePct: number;
  avgDealSize: number;
  csatScore: number;
  upsellPct: number;
  avgCycleDays: number;
}

export interface ForecastParams {
  priceChangePct: number;      // -20% to +30%
  marketingSpendBoost: number; // 0 to $100k
  churnReductionPct: number;   // 0% to 15%
  conversionBoostPct: number;  // 0% to 10%
}

export interface SavedViewPreset {
  id: string;
  name: string;
  description: string;
  filters: FilterState;
}

export type ThemePreset = 'indigo' | 'emerald' | 'cyber' | 'sunset';
