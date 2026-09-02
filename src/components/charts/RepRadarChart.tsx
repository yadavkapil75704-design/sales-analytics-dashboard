import React, { useState } from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip
} from 'recharts';
import { useDashboard } from '../../context/DashboardContext';
import { Award, Check } from 'lucide-react';

export const RepRadarChart: React.FC = () => {
  const { repPerformance, darkMode } = useDashboard();
  const top4Reps = repPerformance.slice(0, 4);

  const [selectedRepIds, setSelectedRepIds] = useState<string[]>(top4Reps.slice(0, 2).map(r => r.rep.id));

  const toggleRep = (id: string) => {
    if (selectedRepIds.includes(id)) {
      if (selectedRepIds.length > 1) {
        setSelectedRepIds(selectedRepIds.filter(i => i !== id));
      }
    } else {
      setSelectedRepIds([...selectedRepIds, id]);
    }
  };

  const radarData = [
    {
      subject: 'Quota Attainment',
      ...repPerformance.reduce((acc, r) => ({ ...acc, [r.rep.id]: Math.min(100, r.quotaAttainmentPct) }), {})
    },
    {
      subject: 'Win Rate %',
      ...repPerformance.reduce((acc, r) => ({ ...acc, [r.rep.id]: r.winRatePct }), {})
    },
    {
      subject: 'CSAT Score (x20)',
      ...repPerformance.reduce((acc, r) => ({ ...acc, [r.rep.id]: Math.round(r.csatScore * 20) }), {})
    },
    {
      subject: 'Upsell Rate %',
      ...repPerformance.reduce((acc, r) => ({ ...acc, [r.rep.id]: r.upsellPct }), {})
    },
    {
      subject: 'Deal Speed Score',
      ...repPerformance.reduce((acc, r) => ({ ...acc, [r.rep.id]: Math.max(20, 100 - r.avgCycleDays * 2) }), {})
    },
  ];

  const colors = ['#6366f1', '#10b981', '#f59e0b', '#ec4899'];

  return (
    <div className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 shadow-xs transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base flex items-center space-x-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span>Rep Competency Radar</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Multi-metric performance comparison between top account reps
          </p>
        </div>

        {/* Rep Selector Toggle Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {top4Reps.map((r, idx) => {
            const active = selectedRepIds.includes(r.rep.id);
            return (
              <button
                key={r.rep.id}
                onClick={() => toggleRep(r.rep.id)}
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg font-semibold transition-all border ${
                  active
                    ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white border-slate-300 dark:border-slate-600'
                    : 'bg-transparent text-slate-400 border-transparent hover:text-slate-600'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: active ? colors[idx] : '#94a3b8' }}
                />
                <span>{r.rep.name.split(' ')[0]}</span>
                {active && <Check className="w-3 h-3 text-indigo-500" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
            <PolarGrid stroke={darkMode ? '#334155' : '#e2e8f0'} />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: darkMode ? '#cbd5e1' : '#475569', fontSize: 11 }}
            />
            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke={darkMode ? '#475569' : '#cbd5e1'} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: '12px' }} />

            {top4Reps.map((r, idx) => {
              if (!selectedRepIds.includes(r.rep.id)) return null;
              return (
                <Radar
                  key={r.rep.id}
                  name={r.rep.name}
                  dataKey={r.rep.id}
                  stroke={colors[idx]}
                  fill={colors[idx]}
                  fillOpacity={0.25}
                />
              );
            })}
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
