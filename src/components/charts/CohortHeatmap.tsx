import React from 'react';
import { Users2, HelpCircle } from 'lucide-react';

export const CohortHeatmap: React.FC = () => {
  const cohorts = [
    { cohort: 'Jan 2024', users: 142, m0: 100, m1: 88, m2: 81, m3: 79, m4: 76, m5: 75 },
    { cohort: 'Feb 2024', users: 168, m0: 100, m1: 85, m2: 82, m3: 78, m4: 74, m5: null },
    { cohort: 'Mar 2024', users: 195, m0: 100, m1: 91, m2: 86, m3: 84, m4: null, m5: null },
    { cohort: 'Apr 2024', users: 210, m0: 100, m1: 89, m2: 84, m3: null, m4: null, m5: null },
    { cohort: 'May 2024', users: 235, m0: 100, m1: 92, m2: null, m3: null, m4: null, m5: null },
    { cohort: 'Jun 2024', users: 260, m0: 100, m1: null, m2: null, m3: null, m4: null, m5: null },
  ];

  const getHeatmapBg = (val: number | null) => {
    if (val === null) return 'bg-slate-50 dark:bg-slate-900/40 text-slate-300 dark:text-slate-700';
    if (val === 100) return 'bg-indigo-600 text-white font-bold';
    if (val >= 90) return 'bg-indigo-500/80 text-white font-bold';
    if (val >= 80) return 'bg-indigo-500/60 text-indigo-950 dark:text-white font-semibold';
    if (val >= 70) return 'bg-indigo-500/35 text-indigo-900 dark:text-indigo-200 font-semibold';
    return 'bg-indigo-500/20 text-indigo-800 dark:text-indigo-300';
  };

  return (
    <div className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 shadow-xs transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base flex items-center space-x-2">
            <Users2 className="w-5 h-5 text-indigo-500" />
            <span>Customer Retention Cohort Matrix</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Month-over-month recurring user retention rate (%)
          </p>
        </div>
        <div className="flex items-center space-x-1 text-slate-400 text-xs" title="Percentage of customers from cohort remaining active">
          <HelpCircle className="w-4 h-4" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[10px]">
              <th className="py-2.5 px-3">Cohort</th>
              <th className="py-2.5 px-3">Accounts</th>
              <th className="py-2.5 px-3 text-center">Month 0</th>
              <th className="py-2.5 px-3 text-center">Month 1</th>
              <th className="py-2.5 px-3 text-center">Month 2</th>
              <th className="py-2.5 px-3 text-center">Month 3</th>
              <th className="py-2.5 px-3 text-center">Month 4</th>
              <th className="py-2.5 px-3 text-center">Month 5</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 font-medium">
            {cohorts.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30">
                <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">{row.cohort}</td>
                <td className="py-2.5 px-3 text-slate-500 dark:text-slate-400">{row.users}</td>
                {[row.m0, row.m1, row.m2, row.m3, row.m4, row.m5].map((val, mIdx) => (
                  <td key={mIdx} className="py-1.5 px-1 text-center">
                    <div className={`py-1.5 rounded-lg text-[11px] transition-colors ${getHeatmapBg(val)}`}>
                      {val !== null ? `${val}%` : '-'}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
