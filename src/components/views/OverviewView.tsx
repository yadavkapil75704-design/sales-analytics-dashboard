import React from 'react';
import { KPICards } from '../KPICards';
import { RevenueTrendChart } from '../charts/RevenueTrendChart';
import { ChannelDonutChart } from '../charts/ChannelDonutChart';
import { RegionalBarChart } from '../charts/RegionalBarChart';
import { useDashboard } from '../../context/DashboardContext';
import {
  Sparkles,
  Zap,
  ArrowRight,
  ShoppingCart,
  Calendar
} from 'lucide-react';
import { formatCurrency, formatShortDate } from '../../utils/formatters';

export const OverviewView: React.FC = () => {
  const { filteredOrders, kpis, setSelectedOrder, setActiveTab, filters } = useDashboard();

  const recentOrders = filteredOrders.slice(0, 6);

  const getAIInsights = () => {
    const insights = [];

    if (kpis.revenueChangePct > 10) {
      insights.push({
        title: 'Strong Revenue Velocity',
        desc: `Revenue is up +${kpis.revenueChangePct}% year-over-year. North America Enterprise accounts contributed the largest margin uptick.`,
        type: 'positive'
      });
    }

    if (filters.region !== 'All') {
      insights.push({
        title: `${filters.region} Focused Performance`,
        desc: `Viewing localized metrics for ${filters.region}. Top revenue contributor in this region is Enterprise SaaS licenses.`,
        type: 'info'
      });
    } else {
      insights.push({
        title: 'Direct Sales Dominance',
        desc: 'Direct Enterprise sales generate over 42% of gross quarterly bookings with an average deal size of $24,500.',
        type: 'info'
      });
    }

    insights.push({
      title: 'Target Attainment Rate',
      desc: `Current pipeline is at ${kpis.quotaAttainmentPct}% of quarterly targets. On track to reach full goal in 18 days.`,
      type: 'positive'
    });

    return insights;
  };

  const insights = getAIInsights();

  return (
    <div className="space-y-6">
      {/* KPI Cards Bar */}
      <KPICards />

      {/* Main Row: Revenue Trend & Channel Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueTrendChart />
        </div>
        <div className="lg:col-span-1">
          <ChannelDonutChart />
        </div>
      </div>

      {/* Second Row: Regional Bar Chart & AI Automated Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RegionalBarChart />
        </div>

        {/* AI Quick Insights Column */}
        <div className="lg:col-span-1 bg-gradient-to-br from-indigo-900/90 via-slate-900 to-slate-950 text-white rounded-2xl p-5 border border-indigo-800/50 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base flex items-center space-x-2 text-indigo-300">
                <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
                <span>AI Automated Insights</span>
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full">
                LIVE AI
              </span>
            </div>

            <div className="space-y-3">
              {insights.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-800/80 border border-indigo-500/20 backdrop-blur-xs text-xs space-y-1"
                >
                  <p className="font-bold text-slate-100 flex items-center space-x-1.5">
                    <Zap className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{item.title}</span>
                  </p>
                  <p className="text-slate-300/80 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveTab('forecast')}
            className="mt-4 w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-xs flex items-center justify-center space-x-2 text-white shadow-md shadow-indigo-600/30 transition-all"
          >
            <span>Launch AI Scenario Simulator</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Third Row: Live Recent Transactions Snippet */}
      <div className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 shadow-xs transition-colors">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base flex items-center space-x-2">
              <ShoppingCart className="w-5 h-5 text-indigo-500" />
              <span>Recent Sales Transactions</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Latest incoming orders matching current active filters
            </p>
          </div>
          <button
            onClick={() => setActiveTab('table')}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center space-x-1"
          >
            <span>View All ({filteredOrders.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {recentOrders.map(order => (
            <div
              key={order.id}
              onClick={() => setSelectedOrder(order)}
              className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/70 hover:border-indigo-500 dark:hover:border-indigo-500 bg-slate-50/50 dark:bg-slate-800/60 hover:bg-indigo-50/30 dark:hover:bg-indigo-950/30 transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3 truncate">
                <img
                  src={order.customer.avatar}
                  alt={order.customer.name}
                  className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                />
                <div className="truncate text-xs">
                  <p className="font-bold text-slate-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                    {order.customer.company}
                  </p>
                  <p className="text-slate-400 truncate">{order.productName}</p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <p className="font-extrabold text-slate-900 dark:text-white text-xs">
                  {formatCurrency(order.amount)}
                </p>
                <p className="text-[10px] text-slate-400 flex items-center justify-end space-x-1">
                  <Calendar className="w-3 h-3 text-slate-400 inline" />
                  <span>{formatShortDate(order.date)}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
