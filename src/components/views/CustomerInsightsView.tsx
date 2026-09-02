import React from 'react';
import { CohortHeatmap } from '../charts/CohortHeatmap';
import { useDashboard } from '../../context/DashboardContext';
import { formatCurrency, formatPercent } from '../../utils/formatters';
import { Users2, Building2, UserCheck, ShieldCheck, ArrowUpRight } from 'lucide-react';

export const CustomerInsightsView: React.FC = () => {
  const { segmentMetrics, crossFilter, filters } = useDashboard();

  return (
    <div className="space-y-6">
      {/* Customer Segment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {segmentMetrics.map(seg => {
          const isSelected = filters.segment === seg.segment;
          return (
            <div
              key={seg.segment}
              onClick={() => crossFilter({ segment: isSelected ? 'All' : seg.segment })}
              className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-xs hover:shadow-md ${
                isSelected
                  ? 'bg-indigo-50/80 dark:bg-indigo-950/60 border-indigo-500 shadow-indigo-500/10'
                  : 'bg-white dark:bg-slate-800/90 border-slate-200 dark:border-slate-700/80'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                  {seg.segment === 'Enterprise' ? (
                    <Building2 className="w-4 h-4 text-indigo-500" />
                  ) : seg.segment === 'SMB' ? (
                    <UserCheck className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Users2 className="w-4 h-4 text-purple-500" />
                  )}
                  <span>{seg.segment} Segment</span>
                </span>
                <span className="text-xs font-bold text-emerald-500 flex items-center">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +12.4%
                </span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                {formatCurrency(seg.revenue)}
              </h3>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex justify-between">
                  <span>Order Volume:</span>
                  <strong className="text-slate-900 dark:text-white">{seg.orders} orders</strong>
                </div>
                <div className="flex justify-between">
                  <span>Avg Deal Size (AOV):</span>
                  <strong className="text-slate-900 dark:text-white">{formatCurrency(seg.avgOrderValue)}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Gross Retention:</span>
                  <strong className="text-emerald-600 dark:text-emerald-400">{formatPercent(seg.retentionPct)}</strong>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cohort Heatmap */}
      <CohortHeatmap />

      {/* LTV vs CAC Efficiency Box */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-indigo-500" />
            <span>Customer Lifetime Value (LTV) Ratio</span>
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            LTV to CAC ratio currently stands at <strong className="text-emerald-500 font-bold">5.8x</strong> (Target Benchmark &gt; 3.0x).
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold">
            Avg Enterprise LTV: $148,000
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold">
            CAC: $1,420
          </div>
        </div>
      </div>
    </div>
  );
};
