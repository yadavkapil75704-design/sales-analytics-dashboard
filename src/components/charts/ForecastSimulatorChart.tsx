import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { useDashboard } from '../../context/DashboardContext';
import { formatCurrency } from '../../utils/formatters';
import { Sparkles } from 'lucide-react';
import { ForecastParams } from '../../types/dashboard';

interface ForecastSimulatorChartProps {
  params: ForecastParams;
}

export const ForecastSimulatorChart: React.FC<ForecastSimulatorChartProps> = ({ params }) => {
  const { kpis, darkMode } = useDashboard();

  // Compute 6-month future prediction based on baseline and parameter sliders
  const monthlyBaseline = kpis.totalRevenue / 12 || 180000;

  // Impact calculation formula
  const priceMultiplier = 1 + params.priceChangePct / 100;
  const marketingGain = (params.marketingSpendBoost / 10000) * 0.035; // 3.5% revenue boost per $10k
  const churnGain = params.churnReductionPct * 0.012;
  const conversionGain = params.conversionBoostPct * 0.025;

  const totalGrowthMultiplier = priceMultiplier + marketingGain + churnGain + conversionGain;

  const forecastMonths = ['M+1 (Next)', 'M+2', 'M+3 (Qtr)', 'M+4', 'M+5', 'M+6 (Half)'];

  const chartData = forecastMonths.map((m, idx) => {
    const compoundingFactor = 1 + idx * 0.02;
    const baselineVal = Math.round(monthlyBaseline * compoundingFactor);
    const scenarioVal = Math.round(monthlyBaseline * totalGrowthMultiplier * compoundingFactor);

    return {
      month: m,
      Baseline: baselineVal,
      SimulatedForecast: scenarioVal,
      OptimisticUpper: Math.round(scenarioVal * 1.12),
      PessimisticLower: Math.round(scenarioVal * 0.9)
    };
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl text-xs">
          <p className="font-semibold text-slate-800 dark:text-slate-100 mb-2 border-b border-slate-100 dark:border-slate-700 pb-1">
            Projection Period: {label}
          </p>
          {payload.map((p: any, idx: number) => (
            <div key={idx} className="flex items-center justify-between space-x-4 my-1">
              <span className="flex items-center space-x-1.5" style={{ color: p.color }}>
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                <span>{p.name}:</span>
              </span>
              <span className="font-bold text-slate-900 dark:text-white">
                {formatCurrency(p.value)}
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
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-indigo-500 animate-pulse" />
            <span>6-Month AI Revenue Projection</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Comparing status quo baseline vs scenario simulation
          </p>
        </div>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSim" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? '#334155' : '#e2e8f0'} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: darkMode ? '#94a3b8' : '#64748b', fontSize: 11 }} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: darkMode ? '#94a3b8' : '#64748b', fontSize: 11 }}
              tickFormatter={v => `$${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" align="right" wrapperStyle={{ fontSize: '12px' }} />

            <Line type="monotone" dataKey="Baseline" name="Baseline (Status Quo)" stroke="#94a3b8" strokeWidth={2} strokeDasharray="4 4" dot={false} />
            <Area type="monotone" dataKey="SimulatedForecast" name="Simulated Scenario" stroke="#10b981" strokeWidth={3} fill="url(#colorSim)" />
            <Line type="monotone" dataKey="OptimisticUpper" name="Upper Confidence Limit" stroke="#38bdf8" strokeWidth={1} strokeDasharray="2 2" dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
