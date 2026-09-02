import React, { useState } from 'react';
import { ForecastSimulatorChart } from '../charts/ForecastSimulatorChart';
import { useDashboard } from '../../context/DashboardContext';
import { formatCurrency, formatPercent } from '../../utils/formatters';
import { ForecastParams } from '../../types/dashboard';
import { Sparkles, Sliders, TrendingUp, DollarSign, RotateCcw } from 'lucide-react';

export const ForecastSimulatorView: React.FC = () => {
  const { kpis, triggerConfetti } = useDashboard();

  const [params, setParams] = useState<ForecastParams>({
    priceChangePct: 5,
    marketingSpendBoost: 25000,
    churnReductionPct: 3,
    conversionBoostPct: 2
  });

  const resetParams = () => {
    setParams({
      priceChangePct: 0,
      marketingSpendBoost: 0,
      churnReductionPct: 0,
      conversionBoostPct: 0
    });
  };

  // Projected metrics calculation
  const baselineMonthly = kpis.totalRevenue / 12 || 180000;
  const priceMultiplier = 1 + params.priceChangePct / 100;
  const marketingGain = (params.marketingSpendBoost / 10000) * 0.035;
  const churnGain = params.churnReductionPct * 0.012;
  const conversionGain = params.conversionBoostPct * 0.025;

  const totalMultiplier = priceMultiplier + marketingGain + churnGain + conversionGain;

  const baseline6Mo = baselineMonthly * 6;
  const projected6Mo = baseline6Mo * totalMultiplier;
  const revenueDelta = projected6Mo - baseline6Mo;
  const estimatedMarketingCost6Mo = params.marketingSpendBoost * 6;
  const netProfitDelta = revenueDelta * 0.7 - estimatedMarketingCost6Mo;
  const roiPct = estimatedMarketingCost6Mo > 0 ? (netProfitDelta / estimatedMarketingCost6Mo) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-950 to-slate-900 text-white shadow-xl border border-indigo-800/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>AI Scenario & "What-If" Predictive Engine</span>
          </span>
          <h2 className="text-2xl font-black tracking-tight mt-1">
            Sales Growth & Revenue Simulator
          </h2>
          <p className="text-xs text-indigo-200/80 mt-1 max-w-xl">
            Adjust growth levers to simulate forward-looking revenue impact, profit margins, and marketing campaign ROI over a 6-month horizon.
          </p>
        </div>

        <button
          onClick={() => {
            triggerConfetti();
          }}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-xs flex items-center space-x-2 text-white shadow-lg shrink-0 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>Simulate Best Case</span>
        </button>
      </div>

      {/* Sliders Control Panel & Results Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sliders Sidebar */}
        <div className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-indigo-500" />
              <span>Simulation Levers</span>
            </h3>
            <button
              onClick={resetParams}
              className="text-xs font-semibold text-rose-500 hover:underline flex items-center space-x-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* 1. Price Change Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Price Adjustment</span>
              <strong className="text-indigo-600 dark:text-indigo-400">
                {params.priceChangePct >= 0 ? `+${params.priceChangePct}%` : `${params.priceChangePct}%`}
              </strong>
            </div>
            <input
              type="range"
              min="-20"
              max="30"
              step="1"
              value={params.priceChangePct}
              onChange={e => setParams({ ...params, priceChangePct: Number(e.target.value) })}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>-20% Discount</span>
              <span>Baseline</span>
              <span>+30% Premium</span>
            </div>
          </div>

          {/* 2. Monthly Marketing Spend Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Monthly Ad Budget Boost</span>
              <strong className="text-indigo-600 dark:text-indigo-400">
                +${(params.marketingSpendBoost / 1000).toFixed(0)}k/mo
              </strong>
            </div>
            <input
              type="range"
              min="0"
              max="100000"
              step="5000"
              value={params.marketingSpendBoost}
              onChange={e => setParams({ ...params, marketingSpendBoost: Number(e.target.value) })}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>$0</span>
              <span>+$50k</span>
              <span>+$100k</span>
            </div>
          </div>

          {/* 3. Churn Reduction Rate Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Churn Reduction Target</span>
              <strong className="text-indigo-600 dark:text-indigo-400">
                -{params.churnReductionPct}%
              </strong>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              step="0.5"
              value={params.churnReductionPct}
              onChange={e => setParams({ ...params, churnReductionPct: Number(e.target.value) })}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>0% Baseline</span>
              <span>-7.5%</span>
              <span>-15% Retention</span>
            </div>
          </div>

          {/* 4. Lead Conversion Boost Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Inbound Conversion Uplift</span>
              <strong className="text-indigo-600 dark:text-indigo-400">
                +{params.conversionBoostPct}%
              </strong>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={params.conversionBoostPct}
              onChange={e => setParams({ ...params, conversionBoostPct: Number(e.target.value) })}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>0% Baseline</span>
              <span>+5%</span>
              <span>+10% Boost</span>
            </div>
          </div>
        </div>

        {/* Forecast Output Projection Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Top Calculated Impact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-4 shadow-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                6-Month Projected Revenue
              </span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                {formatCurrency(projected6Mo, true)}
              </h3>
              <span
                className={`inline-flex items-center text-xs font-bold mt-1 ${
                  revenueDelta >= 0 ? 'text-emerald-500' : 'text-rose-500'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5 mr-1" />
                {revenueDelta >= 0 ? '+' : ''}
                {formatCurrency(revenueDelta, true)} Uplift
              </span>
            </div>

            <div className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-4 shadow-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Net Profit Impact
              </span>
              <h3 className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                {formatCurrency(netProfitDelta, true)}
              </h3>
              <span className="text-[11px] text-slate-400 block mt-1">
                After marketing expenditure
              </span>
            </div>

            <div className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-4 shadow-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Projected Marketing ROI
              </span>
              <h3 className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                {estimatedMarketingCost6Mo > 0 ? `${formatPercent(roiPct)}` : 'N/A'}
              </h3>
              <span className="text-[11px] text-slate-400 block mt-1 flex items-center">
                <DollarSign className="w-3 h-3 text-emerald-500 inline" />
                <span>Return on ad spend</span>
              </span>
            </div>
          </div>

          {/* Interactive Chart */}
          <ForecastSimulatorChart params={params} />
        </div>
      </div>
    </div>
  );
};
