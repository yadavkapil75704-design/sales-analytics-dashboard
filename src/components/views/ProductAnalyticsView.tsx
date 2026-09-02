import React from 'react';
import { ProductPerformanceChart } from '../charts/ProductPerformanceChart';
import { useDashboard } from '../../context/DashboardContext';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { Package } from 'lucide-react';

export const ProductAnalyticsView: React.FC = () => {
  const { productMetrics, crossFilter } = useDashboard();

  return (
    <div className="space-y-6">
      <ProductPerformanceChart />

      {/* Product Catalog Table */}
      <div className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 shadow-xs transition-colors">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base flex items-center space-x-2">
              <Package className="w-5 h-5 text-indigo-500" />
              <span>Catalog Revenue & Margin Ranking</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Breakdown by catalog offering and operational stock status
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold text-[10px]">
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-right">Units Sold</th>
                <th className="py-3 px-4 text-right">Avg Price</th>
                <th className="py-3 px-4 text-right">Total Revenue</th>
                <th className="py-3 px-4 text-right">Margin %</th>
                <th className="py-3 px-4 text-center">Stock Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 font-medium">
              {productMetrics.map(p => (
                <tr
                  key={p.name}
                  onClick={() => crossFilter({ category: p.category })}
                  className="hover:bg-indigo-50/40 dark:hover:bg-indigo-950/30 cursor-pointer transition-colors"
                >
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                    {p.name}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                      {p.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right text-slate-700 dark:text-slate-300">
                    {formatNumber(p.unitsSold)}
                  </td>
                  <td className="py-3.5 px-4 text-right text-slate-700 dark:text-slate-300">
                    {formatCurrency(p.avgPrice)}
                  </td>
                  <td className="py-3.5 px-4 text-right font-extrabold text-indigo-600 dark:text-indigo-400">
                    {formatCurrency(p.revenue)}
                  </td>
                  <td className="py-3.5 px-4 text-right text-emerald-600 dark:text-emerald-400 font-bold">
                    {p.marginPct}%
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        p.stockLevel === 'In Stock'
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400'
                          : p.stockLevel === 'Low Stock'
                          ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400'
                          : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400'
                      }`}
                    >
                      {p.stockLevel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
