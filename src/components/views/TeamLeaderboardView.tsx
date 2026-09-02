import React from 'react';
import { RepRadarChart } from '../charts/RepRadarChart';
import { useDashboard } from '../../context/DashboardContext';
import { formatCurrency, formatPercent } from '../../utils/formatters';
import { Trophy, Star } from 'lucide-react';

export const TeamLeaderboardView: React.FC = () => {
  const { repPerformance, crossFilter } = useDashboard();

  return (
    <div className="space-y-6">
      <RepRadarChart />

      {/* Leaderboard Table */}
      <div className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 shadow-xs transition-colors">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span>Sales Representative Rankings</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Quota attainment and efficiency metrics across sales team
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold text-[10px]">
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Sales Representative</th>
                <th className="py-3 px-4">Territory</th>
                <th className="py-3 px-4 text-right">Revenue Closed</th>
                <th className="py-3 px-4 text-center">Quota Attainment</th>
                <th className="py-3 px-4 text-right">Win Rate</th>
                <th className="py-3 px-4 text-right">Avg Deal Size</th>
                <th className="py-3 px-4 text-center">CSAT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 font-medium">
              {repPerformance.map((item, idx) => (
                <tr
                  key={item.rep.id}
                  onClick={() => crossFilter({ salesRepId: item.rep.id })}
                  className="hover:bg-indigo-50/40 dark:hover:bg-indigo-950/30 cursor-pointer transition-colors"
                >
                  <td className="py-3.5 px-4 font-extrabold text-slate-400 text-sm">
                    {idx === 0 ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black text-xs">
                        1
                      </span>
                    ) : idx === 1 ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-300 text-slate-950 font-black text-xs">
                        2
                      </span>
                    ) : idx === 2 ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-700 text-white font-black text-xs">
                        3
                      </span>
                    ) : (
                      `#${idx + 1}`
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.rep.avatar}
                        alt={item.rep.name}
                        className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                      />
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white text-xs">
                          {item.rep.name}
                        </p>
                        <p className="text-[10px] text-slate-400">{item.rep.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                      {item.rep.region}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-black text-indigo-600 dark:text-indigo-400 text-sm">
                    {formatCurrency(item.revenue)}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="w-full max-w-[120px] mx-auto space-y-1">
                      <div className="flex justify-between text-[10px] font-bold text-slate-700 dark:text-slate-300">
                        <span>{item.quotaAttainmentPct}%</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            item.quotaAttainmentPct >= 100
                              ? 'bg-emerald-500'
                              : item.quotaAttainmentPct >= 80
                              ? 'bg-indigo-500'
                              : 'bg-amber-500'
                          }`}
                          style={{ width: `${Math.min(100, item.quotaAttainmentPct)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right text-emerald-600 dark:text-emerald-400 font-bold">
                    {formatPercent(item.winRatePct)}
                  </td>
                  <td className="py-3.5 px-4 text-right text-slate-700 dark:text-slate-300">
                    {formatCurrency(item.avgDealSize)}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center space-x-1 font-bold text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{item.csatScore}</span>
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
