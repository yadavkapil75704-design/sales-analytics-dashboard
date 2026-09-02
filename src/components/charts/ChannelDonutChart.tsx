import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useDashboard } from '../../context/DashboardContext';
import { formatCurrency } from '../../utils/formatters';
import { Share2, Filter } from 'lucide-react';
import { SalesChannel } from '../../types/dashboard';

export const ChannelDonutChart: React.FC = () => {
  const { channelMetrics, crossFilter, filters } = useDashboard();

  const handleChannelClick = (channelName: SalesChannel) => {
    if (filters.channel === channelName) {
      crossFilter({ channel: 'All' });
    } else {
      crossFilter({ channel: channelName });
    }
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md p-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl text-xs">
          <p className="font-semibold text-slate-800 dark:text-slate-100 flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: data.color }} />
            <span>{data.channel}</span>
          </p>
          <div className="mt-2 space-y-1 text-slate-600 dark:text-slate-300">
            <p>
              Revenue: <span className="font-bold text-slate-900 dark:text-white">{formatCurrency(data.revenue)}</span>
            </p>
            <p>
              Orders: <span className="font-bold text-slate-900 dark:text-white">{data.orders}</span>
            </p>
            <p>
              Share: <span className="font-bold text-indigo-600 dark:text-indigo-400">{data.percentage}%</span>
            </p>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 border-t border-slate-100 dark:border-slate-700/60 pt-1">
            Click slice to filter dashboard
          </p>
        </div>
      );
    }
    return null;
  };

  const totalRev = channelMetrics.reduce((a, b) => a + b.revenue, 0);

  return (
    <div className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 shadow-xs transition-colors flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base flex items-center space-x-2">
            <Share2 className="w-5 h-5 text-emerald-500" />
            <span>Sales Channel Mix</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Distribution across origin channels
          </p>
        </div>
        {filters.channel !== 'All' && (
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
            <Filter className="w-3 h-3" />
            <span>Filtered</span>
          </span>
        )}
      </div>

      {/* Donut Chart Container */}
      <div className="h-52 w-full relative my-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={channelMetrics}
              cx="50%"
              cy="50%"
              innerRadius={58}
              outerRadius={82}
              paddingAngle={4}
              dataKey="revenue"
              cursor="pointer"
              onClick={(entry: any) => handleChannelClick(entry.payload.channel)}
            >
              {channelMetrics.map((entry, index) => {
                const isSelected = filters.channel === entry.channel;
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke={isSelected ? '#ffffff' : 'transparent'}
                    strokeWidth={isSelected ? 3 : 0}
                    style={{
                      opacity: filters.channel === 'All' || isSelected ? 1 : 0.4,
                      transition: 'all 0.3s ease'
                    }}
                  />
                );
              })}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total</span>
          <span className="text-sm font-extrabold text-slate-900 dark:text-white">
            {formatCurrency(totalRev, true)}
          </span>
        </div>
      </div>

      {/* Interactive Legend List */}
      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-700/60">
        {channelMetrics.map(item => {
          const isSelected = filters.channel === item.channel;
          return (
            <button
              key={item.channel}
              onClick={() => handleChannelClick(item.channel)}
              className={`w-full flex items-center justify-between p-2 rounded-xl text-xs transition-all ${
                isSelected
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800'
                  : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'
              }`}
            >
              <div className="flex items-center space-x-2 truncate">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="font-medium text-slate-700 dark:text-slate-200 truncate">{item.channel}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-slate-900 dark:text-white">{formatCurrency(item.revenue, true)}</span>
                <span className="text-[11px] font-semibold px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                  {item.percentage}%
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
