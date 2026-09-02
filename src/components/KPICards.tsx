import React from 'react';
import {
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Percent,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck
} from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import { formatCurrency, formatNumber, formatPercent } from '../utils/formatters';

export const KPICards: React.FC = () => {
  const { kpis, dailyTrend } = useDashboard();

  // Simple inline sparkline renderer
  const renderSparkline = (key: 'revenue' | 'orders' | 'profit', colorClass: string) => {
    const data = dailyTrend.slice(-14).map(d => d[key]);
    if (data.length === 0) return null;
    const max = Math.max(...data) || 1;
    const min = Math.min(...data) || 0;
    const range = max - min || 1;

    const points = data
      .map((val, idx) => {
        const x = (idx / (data.length - 1)) * 100;
        const y = 30 - ((val - min) / range) * 24;
        return `${x},${y}`;
      })
      .join(' ');

    return (
      <svg className="w-24 h-8 overflow-visible" viewBox="0 0 100 32">
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={colorClass}
          points={points}
        />
      </svg>
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {/* 1. Total Revenue Card */}
      <div className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Revenue</span>
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {formatCurrency(kpis.totalRevenue, true)}
            </h3>
            <span
              className={`inline-flex items-center text-xs font-semibold px-1.5 py-0.5 rounded-md ${
                kpis.revenueChangePct >= 0
                  ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400'
                  : 'bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-400'
              }`}
            >
              {kpis.revenueChangePct >= 0 ? (
                <ArrowUpRight className="w-3 h-3 mr-0.5" />
              ) : (
                <ArrowDownRight className="w-3 h-3 mr-0.5" />
              )}
              {formatPercent(kpis.revenueChangePct)}
            </span>
          </div>
        </div>

        <div className="flex items-end justify-between mt-3 pt-2 border-t border-slate-100 dark:border-slate-700/50">
          <span className="text-[11px] text-slate-400 font-medium">14D Trend</span>
          {renderSparkline('revenue', 'text-indigo-500')}
        </div>
      </div>

      {/* 2. Total Orders Card */}
      <div className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Orders</span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <ShoppingCart className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {formatNumber(kpis.totalOrders)}
            </h3>
            <span
              className={`inline-flex items-center text-xs font-semibold px-1.5 py-0.5 rounded-md ${
                kpis.ordersChangePct >= 0
                  ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400'
                  : 'bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-400'
              }`}
            >
              {kpis.ordersChangePct >= 0 ? (
                <ArrowUpRight className="w-3 h-3 mr-0.5" />
              ) : (
                <ArrowDownRight className="w-3 h-3 mr-0.5" />
              )}
              {formatPercent(kpis.ordersChangePct)}
            </span>
          </div>
        </div>

        <div className="flex items-end justify-between mt-3 pt-2 border-t border-slate-100 dark:border-slate-700/50">
          <span className="text-[11px] text-slate-400 font-medium">14D Volume</span>
          {renderSparkline('orders', 'text-emerald-500')}
        </div>
      </div>

      {/* 3. Average Order Value Card */}
      <div className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Avg Order Value</span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {formatCurrency(kpis.avgOrderValue, true)}
            </h3>
            <span className="inline-flex items-center text-xs font-semibold px-1.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400">
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              {formatPercent(kpis.aovChangePct)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100 dark:border-slate-700/50 text-[11px] text-slate-400">
          <span>Enterprise Deal Benchmark</span>
          <span className="font-semibold text-slate-700 dark:text-slate-200">$22,500</span>
        </div>
      </div>

      {/* 4. Net Profit & Margin Card */}
      <div className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Net Profit</span>
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
              <Percent className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {formatCurrency(kpis.netProfit, true)}
            </h3>
            <span className="inline-flex items-center text-xs font-semibold px-1.5 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300">
              {kpis.marginPct}% Margin
            </span>
          </div>
        </div>

        <div className="flex items-end justify-between mt-3 pt-2 border-t border-slate-100 dark:border-slate-700/50">
          <span className="text-[11px] text-slate-400 font-medium">14D Net Margin</span>
          {renderSparkline('profit', 'text-purple-500')}
        </div>
      </div>

      {/* 5. Target Progress Card */}
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-indigo-800/50 col-span-1 sm:col-span-2 lg:col-span-1">
        <div>
          <div className="flex items-center justify-between text-indigo-200 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider flex items-center space-x-1">
              <Target className="w-3.5 h-3.5 text-indigo-400" />
              <span>Target Goal</span>
            </span>
            <span className="text-xs bg-indigo-500/30 border border-indigo-400/30 px-2 py-0.5 rounded-full font-bold text-indigo-300">
              {kpis.quotaAttainmentPct}%
            </span>
          </div>

          <div className="mt-1">
            <div className="flex items-baseline justify-between text-xs text-indigo-200/80 mb-1">
              <span>Goal: {formatCurrency(kpis.targetRevenue, true)}</span>
              <span>
                Left: {formatCurrency(Math.max(0, kpis.targetRevenue - kpis.totalRevenue), true)}
              </span>
            </div>

            {/* Smooth Progress Bar */}
            <div className="w-full bg-slate-800/80 rounded-full h-2.5 overflow-hidden border border-indigo-500/20">
              <div
                className="bg-gradient-to-r from-indigo-400 via-emerald-400 to-teal-300 h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${Math.min(100, kpis.quotaAttainmentPct)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-3 pt-2 border-t border-indigo-800/40 flex items-center justify-between text-[11px] text-indigo-200/80">
          <span className="flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Quota Pace</span>
          </span>
          <span className="font-semibold text-emerald-300">On Track (+4.2%)</span>
        </div>
      </div>
    </div>
  );
};
