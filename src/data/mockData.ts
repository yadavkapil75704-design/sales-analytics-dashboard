import {
  SalesOrder,
  SalesRep,
  Customer,
  OrderStatus,
  PaymentMethod,
  ProductCategory,
  SalesChannel
} from '../types/dashboard';

export const REPS: SalesRep[] = [
  {
    id: 'rep-1',
    name: 'Sarah Jenkins',
    role: 'Senior Enterprise AE',
    email: 'sarah.j@velocesales.io',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    region: 'North America',
    quota: 450000,
  },
  {
    id: 'rep-2',
    name: 'Marcus Vance',
    role: 'Global VP of Sales',
    email: 'marcus.v@velocesales.io',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    region: 'Europe',
    quota: 520000,
  },
  {
    id: 'rep-3',
    name: 'Aisha Patel',
    role: 'APAC Regional Director',
    email: 'aisha.p@velocesales.io',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    region: 'Asia Pacific',
    quota: 380000,
  },
  {
    id: 'rep-4',
    name: 'Carlos Mendez',
    role: 'LATAM Enterprise Lead',
    email: 'carlos.m@velocesales.io',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    region: 'Latin America',
    quota: 310000,
  },
  {
    id: 'rep-5',
    name: 'Tariq Al-Mansoor',
    role: 'EMEA Strategic Accounts',
    email: 'tariq.a@velocesales.io',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    region: 'Middle East',
    quota: 340000,
  },
  {
    id: 'rep-6',
    name: 'Elena Rostova',
    role: 'Cloud Solutions Lead',
    email: 'elena.r@velocesales.io',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    region: 'Europe',
    quota: 400000,
  }
];

export const CUSTOMERS: Customer[] = [
  { id: 'c-1', name: 'Apex Tech Solutions', company: 'Apex Global', email: 'billing@apextech.com', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100', segment: 'Enterprise' },
  { id: 'c-2', name: 'Nexus BioHealth', company: 'Nexus Health Inc', email: 'procurement@nexusbio.io', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100', segment: 'Enterprise' },
  { id: 'c-3', name: 'Finovate Capital', company: 'Finovate Group', email: 'accounts@finovate.com', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100', segment: 'Enterprise' },
  { id: 'c-4', name: 'CloudScale Logistics', company: 'CloudScale', email: 'ops@cloudscale.net', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100', segment: 'SMB' },
  { id: 'c-5', name: 'Quantum Commerce', company: 'Quantum Retail', email: 'sales@quantumcommerce.io', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100', segment: 'SMB' },
  { id: 'c-6', name: 'Vanguard Media Group', company: 'Vanguard MG', email: 'it@vanguardmedia.org', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100', segment: 'Enterprise' },
  { id: 'c-7', name: 'Lumina Creative Studio', company: 'Lumina Design', email: 'hello@luminastudio.com', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100', segment: 'Consumer' },
  { id: 'c-8', name: 'Starlight Robotics', company: 'Starlight AI', email: 'purchasing@starlightrobotics.com', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100', segment: 'Enterprise' },
  { id: 'c-9', name: 'GreenGrid Energy', company: 'GreenGrid Global', email: 'finance@greengrid.com', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100', segment: 'Enterprise' },
  { id: 'c-10', name: 'Hyperion CyberSec', company: 'Hyperion Sec', email: 'orders@hyperionsec.io', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100', segment: 'SMB' },
];

export const PRODUCTS: { name: string; category: ProductCategory; basePrice: number; baseCostPct: number }[] = [
  { name: 'Veloce Platform Ultimate (Annual)', category: 'SaaS Enterprise', basePrice: 42000, baseCostPct: 0.15 },
  { name: 'Veloce Team Pro (100 Licenses)', category: 'SaaS Enterprise', basePrice: 18500, baseCostPct: 0.18 },
  { name: 'Cloud Server Rack Infrastructure (Managed)', category: 'Cloud Infrastructure', basePrice: 28000, baseCostPct: 0.42 },
  { name: 'Edge Compute Node Array v4', category: 'Cloud Infrastructure', basePrice: 15400, baseCostPct: 0.48 },
  { name: 'Enterprise Implementation & Setup Consulting', category: 'Consulting Services', basePrice: 12500, baseCostPct: 0.25 },
  { name: '24/7 Priority Support SLA Subscription', category: 'Consulting Services', basePrice: 8000, baseCostPct: 0.20 },
  { name: 'High-Volume API Access Gateway (5M Calls)', category: 'API Subscriptions', basePrice: 6500, baseCostPct: 0.12 },
  { name: 'Developer API Scale Plan', category: 'API Subscriptions', basePrice: 2400, baseCostPct: 0.10 },
  { name: 'Smart IoT Gateway Controller Hardware', category: 'Hardware Peripherals', basePrice: 4500, baseCostPct: 0.55 },
  { name: 'Biometric Access Sensor Terminal', category: 'Hardware Peripherals', basePrice: 1200, baseCostPct: 0.50 },
];

function generateOrders(): SalesOrder[] {
  const orders: SalesOrder[] = [];
  const channels: SalesChannel[] = ['Direct Sales', 'Online Store', 'Partner Network', 'Inbound Marketing'];
  const statuses: OrderStatus[] = ['Completed', 'Completed', 'Completed', 'Completed', 'Processing', 'Pending Approval', 'Refunded', 'Cancelled'];
  const paymentMethods: PaymentMethod[] = ['Credit Card', 'Wire Transfer', 'ACH Direct', 'Invoice 30-Day'];
  
  const now = new Date();
  
  let seed = 42;
  function pseudoRandom() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  }

  const numOrders = 150;
  
  for (let i = 0; i < numOrders; i++) {
    const daysAgo = Math.floor(pseudoRandom() * 360);
    const orderDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    const dateStr = orderDate.toISOString().split('T')[0];
    
    const prod = PRODUCTS[Math.floor(pseudoRandom() * PRODUCTS.length)];
    const rep = REPS[Math.floor(pseudoRandom() * REPS.length)];
    const cust = CUSTOMERS[Math.floor(pseudoRandom() * CUSTOMERS.length)];
    const channel = channels[Math.floor(pseudoRandom() * channels.length)];
    const status = statuses[Math.floor(pseudoRandom() * statuses.length)];
    const payMethod = paymentMethods[Math.floor(pseudoRandom() * paymentMethods.length)];
    
    const qty = Math.floor(pseudoRandom() * 5) + 1;
    const discountPct = Math.round(pseudoRandom() * 20);
    const listPrice = prod.basePrice * qty;
    const discountedPrice = Math.round(listPrice * (1 - discountPct / 100));
    const cost = Math.round(discountedPrice * prod.baseCostPct);
    const margin = discountedPrice - cost;
    const marginPct = Number(((margin / discountedPrice) * 100).toFixed(1));

    orders.push({
      id: `ORD-${8000 + i}`,
      date: dateStr,
      timestamp: orderDate.toISOString(),
      customer: cust,
      productName: prod.name,
      category: prod.category,
      salesRep: rep,
      region: rep.region,
      channel,
      quantity: qty,
      unitPrice: prod.basePrice,
      amount: discountedPrice,
      discountPct,
      cost,
      margin,
      marginPct,
      status,
      paymentMethod: payMethod,
    });
  }

  return orders.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export const INITIAL_ORDERS = generateOrders();

export const SAVED_PRESETS = [
  {
    id: 'preset-1',
    name: 'Enterprise North America Deals',
    description: 'High value SaaS & Cloud deals in NA',
    filters: {
      datePreset: 'ytd' as const,
      startDate: '',
      endDate: '',
      region: 'North America' as const,
      category: 'All' as const,
      channel: 'All' as const,
      segment: 'Enterprise' as const,
      salesRepId: 'All',
      status: 'All' as const,
      searchQuery: '',
    }
  },
  {
    id: 'preset-2',
    name: 'Q3 Direct Sales Top Margin',
    description: 'Direct sales performance across all regions',
    filters: {
      datePreset: 'q3' as const,
      startDate: '',
      endDate: '',
      region: 'All' as const,
      category: 'All' as const,
      channel: 'Direct Sales' as const,
      segment: 'All' as const,
      salesRepId: 'All',
      status: 'Completed' as const,
      searchQuery: '',
    }
  },
  {
    id: 'preset-3',
    name: 'Recent 30 Days SaaS Orders',
    description: 'SaaS product performance in the past month',
    filters: {
      datePreset: '30d' as const,
      startDate: '',
      endDate: '',
      region: 'All' as const,
      category: 'SaaS Enterprise' as const,
      channel: 'All' as const,
      segment: 'All' as const,
      salesRepId: 'All',
      status: 'All' as const,
      searchQuery: '',
    }
  }
];
