import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid
} from 'recharts';
import { useDashboard } from '../../context/DashboardContext';
import { formatCurrency } from '../../utils/formatters';
import { Globe, ArrowUpRight } from 'lucide-react';
import { Region } from '../../types/dashboard';

export const RegionalBarChart: React.FC = () => {
  const { regionalMetrics, crossFilter, filters, darkMode } = useDashboard();

  const handleRegionClick = (regionName: Region) => {
    if (filters.region === regionName) {
      crossFilter({ region: 'All' });
    } else {
      crossFilter({ region: regionName });
    }
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md p-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl text-xs">
          <p className="font-semibold text-slate-800 dark:text-slate-100 flex items-center justify-between">
            <span>{data.region}</span>
            <span className="text-emerald-500 font-bold flex items-center">
              <ArrowUpRight className="w-3 h-3" /> +{data.growthPct}%
            </span>
          </p>
          <div className="mt-2 space-y-1 text-slate-600 dark:text-slate-300">
            <p>
              Revenue: <span className="font-bold text-slate-900 dark:text-white">{formatCurrency(data.revenue)}</span>
            </p>
            <p>
              Orders: <span className="font-bold text-slate-900 dark:text-white">{data.orders}</span>
            </p>
            <p>
              Top Product: <span className="font-bold text-indigo-600 dark:text-indigo-400">{data.topProduct}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const regionColors = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#06b6d4'];

  return (
    <div className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 shadow-xs transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base flex items-center space-x-2">
            <Globe className="w-5 h-5 text-indigo-500" />
            <span>Regional Territory Revenue</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Geographic sales distribution & top performing products
          </p>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={regionalMetrics} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={darkMode ? '#334155' : '#e2e8f0'} />
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fill: darkMode ? '#94a3b8' : '#64748b', fontSize: 11 }}
              tickFormatter={v => `$${(v / 1000).toFixed(0)}k`}
            />
            <YAxis
              type="category"
              dataKey="region"
              axisLine={false}
              tickLine={false}
              tick={{ fill: darkMode ? '#94a3b8' : '#64748b', fontSize: 11 }}
              width={90}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="revenue"
              radius={[0, 8, 8, 0]}
              cursor="pointer"
              onClick={(entry: any) => handleRegionClick(entry.region)}
            >
              {regionalMetrics.map((entry, index) => {
                const isSelected = filters.region === entry.region;
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={regionColors[index % regionColors.length]}
                    style={{
                      opacity: filters.region === 'All' || isSelected ? 1 : 0.35,
                      transition: 'all 0.3s ease'
                    }}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
