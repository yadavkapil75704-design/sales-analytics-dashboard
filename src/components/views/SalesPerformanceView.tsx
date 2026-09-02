import React from 'react';
import { RevenueTrendChart } from '../charts/RevenueTrendChart';
import { RegionalBarChart } from '../charts/RegionalBarChart';
import { useDashboard } from '../../context/DashboardContext';
import { formatCurrency } from '../../utils/formatters';
import { Target, Zap, Clock, ShieldCheck, Percent } from 'lucide-react';

export const SalesPerformanceView: React.FC = () => {
  const { kpis, filteredOrders } = useDashboard();

  const avgDiscount = filteredOrders.length > 0
    ? (filteredOrders.reduce((a, b) => a + b.discountPct, 0) / filteredOrders.length).toFixed(1)
    : '5.0';

  return (
    <div className="space-y-6">
      {/* Target Attainment Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white shadow-xl border border-indigo-800/60 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center space-x-1.5">
              <Target className="w-4 h-4" />
              <span>Quarterly Sales Target Attainment</span>
            </span>
            <h2 className="text-3xl font-black tracking-tight">
              {kpis.quotaAttainmentPct}% Goal Completed
            </h2>
            <p className="text-xs text-indigo-200/80 leading-relaxed">
              Revenue closed is <strong className="text-white">{formatCurrency(kpis.totalRevenue)}</strong> against target goal of <strong className="text-white">{formatCurrency(kpis.targetRevenue)}</strong>.
            </p>
          </div>

          <div className="flex items-center space-x-4 bg-slate-900/80 p-4 rounded-2xl border border-indigo-500/30 shrink-0">
            <div>
              <span className="text-[11px] text-slate-400 block font-semibold">Remaining Target</span>
              <span className="text-xl font-black text-amber-400">
                {formatCurrency(Math.max(0, kpis.targetRevenue - kpis.totalRevenue))}
              </span>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-indigo-500 border-t-emerald-400 flex items-center justify-center font-bold text-xs text-emerald-400">
              {kpis.quotaAttainmentPct}%
            </div>
          </div>
        </div>
      </div>

      {/* Grid Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800/90 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase">Win Rate %</span>
            <Zap className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">68.4%</p>
          <span className="text-[11px] text-emerald-500 font-semibold">+3.2% vs last month</span>
        </div>

        <div className="bg-white dark:bg-slate-800/90 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase">Avg Deal Cycle</span>
            <Clock className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">19.2 Days</p>
          <span className="text-[11px] text-indigo-500 font-semibold">-2.1 days faster</span>
        </div>

        <div className="bg-white dark:bg-slate-800/90 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase">Avg Discount Give</span>
            <Percent className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{avgDiscount}%</p>
          <span className="text-[11px] text-slate-400 font-semibold">Max threshold: 15%</span>
        </div>

        <div className="bg-white dark:bg-slate-800/90 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase">CAC Payback</span>
            <ShieldCheck className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">4.2 Months</p>
          <span className="text-[11px] text-emerald-500 font-semibold">Top tier efficiency</span>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueTrendChart />
        <RegionalBarChart />
      </div>
    </div>
  );
};
