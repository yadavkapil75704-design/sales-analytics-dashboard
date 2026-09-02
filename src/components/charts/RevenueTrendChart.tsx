import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { useDashboard } from '../../context/DashboardContext';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { Calendar, BarChart3, TrendingUp } from 'lucide-react';

export const RevenueTrendChart: React.FC = () => {
  const { monthlyTrend, dailyTrend, darkMode } = useDashboard();
  const [timeframe, setTimeframe] = useState<'monthly' | 'daily'>('monthly');
  const [metric, setMetric] = useState<'revenue' | 'orders' | 'profit'>('revenue');

  const chartData = useMemo(() => {
    if (timeframe === 'monthly') {
      return monthlyTrend.map(m => ({
        label: m.month,
        revenue: m.revenue,
        previousRevenue: m.previousRevenue,
        orders: m.orders,
        profit: m.profit,
        target: m.target
      }));
    } else {
      return dailyTrend.map(d => ({
        label: d.shortDate,
        revenue: d.revenue,
        previousRevenue: Math.round(d.revenue * 0.85),
        orders: d.orders,
        profit: d.profit,
        target: 0
      }));
    }
  }, [timeframe, monthlyTrend, dailyTrend]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md p-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl text-xs">
          <p className="font-semibold text-slate-800 dark:text-slate-100 mb-2 border-b border-slate-100 dark:border-slate-700 pb-1">
            {timeframe === 'monthly' ? `Month: ${label}` : `Date: ${label}`}
          </p>
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex items-center justify-between space-x-4 my-1">
              <span className="flex items-center space-x-1.5" style={{ color: entry.color }}>
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="font-medium text-slate-600 dark:text-slate-300">{entry.name}:</span>
              </span>
              <span className="font-bold text-slate-900 dark:text-white">
                {metric === 'orders' ? formatNumber(entry.value) : formatCurrency(entry.value)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 shadow-xs transition-colors">
      {/* Chart Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-indigo-500" />
            <span>Revenue & Growth Trajectory</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time interactive trend performance comparison
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {/* Metric Selector */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-700/60 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setMetric('revenue')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                metric === 'revenue'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Revenue
            </button>
            <button
              onClick={() => setMetric('orders')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                metric === 'orders'
                  ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Orders
            </button>
            <button
              onClick={() => setMetric('profit')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                metric === 'profit'
                  ? 'bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Profit
            </button>
          </div>

          {/* Timeframe Selector */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-700/60 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setTimeframe('monthly')}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center space-x-1 ${
                timeframe === 'monthly'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <Calendar className="w-3 h-3" />
              <span>Monthly</span>
            </button>
            <button
              onClick={() => setTimeframe('daily')}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center space-x-1 ${
                timeframe === 'daily'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-3 h-3" />
              <span>Daily (30D)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={darkMode ? '#334155' : '#e2e8f0'}
            />

            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: darkMode ? '#94a3b8' : '#64748b', fontSize: 11 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: darkMode ? '#94a3b8' : '#64748b', fontSize: 11 }}
              tickFormatter={value => (metric === 'orders' ? value : `$${(value / 1000).toFixed(0)}k`)}
            />

            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ paddingBottom: '10px', fontSize: '12px' }}
            />

            {metric === 'revenue' && (
              <>
                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="Current Revenue"
                  stroke="#6366f1"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
                {timeframe === 'monthly' && (
                  <Line
                    type="monotone"
                    dataKey="previousRevenue"
                    name="Previous Period"
                    stroke="#94a3b8"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    dot={false}
                  />
                )}
                {timeframe === 'monthly' && (
                  <Line
                    type="monotone"
                    dataKey="target"
                    name="Monthly Target"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={false}
                  />
                )}
              </>
            )}

            {metric === 'orders' && (
              <Area
                type="monotone"
                dataKey="orders"
                name="Order Count"
                stroke="#10b981"
                strokeWidth={3}
                fillOpacity={0.2}
                fill="#10b981"
              />
            )}

            {metric === 'profit' && (
              <Area
                type="monotone"
                dataKey="profit"
                name="Net Profit"
                stroke="#a855f7"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorProfit)"
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
