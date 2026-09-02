import React from 'react';
import { X, Printer, BarChart2, ShieldCheck } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { formatCurrency, formatPercent } from '../../utils/formatters';

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportReportModal: React.FC<ExportReportModalProps> = ({ isOpen, onClose }) => {
  const { kpis, regionalMetrics, productMetrics, repPerformance, triggerConfetti } = useDashboard();

  if (!isOpen) return null;

  const handlePrint = () => {
    triggerConfetti();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-3xl w-full border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between no-print">
          <div className="flex items-center space-x-2">
            <BarChart2 className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-base">Executive Analytics Summary Report</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
            <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Content Container */}
        <div className="p-8 space-y-6 overflow-y-auto bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 print-full">
          {/* Report Cover Header */}
          <div className="border-b border-slate-200 dark:border-slate-700 pb-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black tracking-tight text-indigo-600 dark:text-indigo-400">
                VELOCESALES INTELLIGENCE
              </h1>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-0.5">
                Executive Sales Performance Brief • Generated on {new Date().toLocaleDateString()}
              </p>
            </div>
            <div className="text-right text-xs text-slate-400">
              <p className="font-bold text-slate-700 dark:text-slate-300">CONFIDENTIAL</p>
              <p>For Executive Leadership</p>
            </div>
          </div>

          {/* High Level KPI Matrix */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              1. Key Financial Highlights
            </h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <span className="text-[11px] font-semibold text-slate-400 block">Total Revenue</span>
                <span className="text-lg font-black text-slate-900 dark:text-white">
                  {formatCurrency(kpis.totalRevenue)}
                </span>
                <span className="text-[10px] text-emerald-500 font-bold block mt-0.5">
                  +{kpis.revenueChangePct}% YoY Growth
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <span className="text-[11px] font-semibold text-slate-400 block">Net Profit</span>
                <span className="text-lg font-black text-slate-900 dark:text-white">
                  {formatCurrency(kpis.netProfit)}
                </span>
                <span className="text-[10px] text-indigo-500 font-bold block mt-0.5">
                  {kpis.marginPct}% Net Margin
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <span className="text-[11px] font-semibold text-slate-400 block">Total Deals Closed</span>
                <span className="text-lg font-black text-slate-900 dark:text-white">
                  {kpis.totalOrders}
                </span>
                <span className="text-[10px] text-slate-500 font-bold block mt-0.5">
                  Avg AOV: {formatCurrency(kpis.avgOrderValue, true)}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <span className="text-[11px] font-semibold text-slate-400 block">Target Attainment</span>
                <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                  {kpis.quotaAttainmentPct}%
                </span>
                <span className="text-[10px] text-slate-500 font-bold block mt-0.5">
                  Target: {formatCurrency(kpis.targetRevenue, true)}
                </span>
              </div>
            </div>
          </div>

          {/* Regional & Product Leaderboard Side-by-Side */}
          <div className="grid grid-cols-2 gap-6">
            {/* Top Regional Breakdown */}
            <div className="border border-slate-200 dark:border-slate-700 rounded-2xl p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                2. Regional Territory Rankings
              </h4>
              <div className="space-y-2 text-xs">
                {regionalMetrics.slice(0, 4).map(reg => (
                  <div key={reg.region} className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-700/50">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{reg.region}</span>
                    <div className="text-right">
                      <span className="font-bold text-slate-900 dark:text-white">{formatCurrency(reg.revenue)}</span>
                      <span className="text-[10px] text-emerald-500 block font-semibold">+{reg.growthPct}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Products */}
            <div className="border border-slate-200 dark:border-slate-700 rounded-2xl p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                3. Top Revenue Products
              </h4>
              <div className="space-y-2 text-xs">
                {productMetrics.slice(0, 4).map(prod => (
                  <div key={prod.name} className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-700/50">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[180px]">
                      {prod.name}
                    </span>
                    <div className="text-right">
                      <span className="font-bold text-slate-900 dark:text-white">{formatCurrency(prod.revenue)}</span>
                      <span className="text-[10px] text-indigo-500 block font-semibold">{prod.marginPct}% Margin</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Rep Leaderboard */}
          <div className="border border-slate-200 dark:border-slate-700 rounded-2xl p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              4. Top Account Executive Attainment
            </h4>
            <div className="grid grid-cols-3 gap-3 text-xs">
              {repPerformance.slice(0, 3).map((rep, idx) => (
                <div key={rep.rep.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700">
                  <p className="font-bold text-slate-900 dark:text-white">
                    #{idx + 1} {rep.rep.name}
                  </p>
                  <p className="text-[11px] text-slate-400">{rep.rep.region}</p>
                  <p className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400 mt-2">
                    {formatCurrency(rep.revenue)}
                  </p>
                  <p className="text-[10px] text-emerald-500 font-bold mt-0.5">
                    {formatPercent(rep.quotaAttainmentPct)} Quota Attainment
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer sign-off */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center space-x-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Verified Analytics Data Engine</span>
            </span>
            <span>VeloceSales Enterprise Analytics v4.2</span>
          </div>
        </div>
      </div>
    </div>
  );
};
