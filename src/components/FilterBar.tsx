import React from 'react';
import {
  Calendar,
  Globe,
  Tag,
  Share2,
  Users2,
  UserCheck,
  RotateCcw,
  X,
  SlidersHorizontal,
  CheckCircle2
} from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import { Region, SalesChannel, CustomerSegment, OrderStatus, ProductCategory } from '../types/dashboard';
import { REPS } from '../data/mockData';

export const FilterBar: React.FC = () => {
  const { filters, updateFilter, resetFilters, activeFilterCount } = useDashboard();

  const datePresets: { key: typeof filters.datePreset; label: string }[] = [
    { key: 'today', label: 'Today' },
    { key: '7d', label: 'Last 7 Days' },
    { key: '30d', label: 'Last 30 Days' },
    { key: '90d', label: 'Quarter (90d)' },
    { key: 'ytd', label: 'Year To Date' },
    { key: '12m', label: 'Full Year (12m)' },
    { key: 'custom', label: 'Custom' },
  ];

  const regions: (Region | 'All')[] = ['All', 'North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East'];
  const categories: (ProductCategory | 'All')[] = ['All', 'SaaS Enterprise', 'Cloud Infrastructure', 'Consulting Services', 'API Subscriptions', 'Hardware Peripherals'];
  const channels: (SalesChannel | 'All')[] = ['All', 'Direct Sales', 'Online Store', 'Partner Network', 'Inbound Marketing'];
  const segments: (CustomerSegment | 'All')[] = ['All', 'Enterprise', 'SMB', 'Consumer'];
  const statuses: (OrderStatus | 'All')[] = ['All', 'Completed', 'Processing', 'Pending Approval', 'Refunded', 'Cancelled'];

  return (
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 lg:px-6 py-3 transition-colors">
      <div className="flex flex-col space-y-3">
        {/* Top Row: Date Presets & Filter Summary */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Date Presets Group */}
          <div className="flex items-center space-x-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <div className="flex items-center space-x-1.5 mr-2 text-xs font-semibold text-slate-500 dark:text-slate-400 shrink-0">
              <Calendar className="w-3.5 h-3.5 text-indigo-500" />
              <span>Range:</span>
            </div>
            {datePresets.map(preset => {
              const active = filters.datePreset === preset.key;
              return (
                <button
                  key={preset.key}
                  onClick={() => updateFilter('datePreset', preset.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    active
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>

          {/* Custom Date Picker Inputs if 'custom' is selected */}
          {filters.datePreset === 'custom' && (
            <div className="flex items-center space-x-2 text-xs">
              <input
                type="date"
                value={filters.startDate}
                onChange={e => updateFilter('startDate', e.target.value)}
                className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
              />
              <span className="text-slate-400">to</span>
              <input
                type="date"
                value={filters.endDate}
                onChange={e => updateFilter('endDate', e.target.value)}
                className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
              />
            </div>
          )}

          {/* Reset Filters */}
          {activeFilterCount > 0 && (
            <button
              onClick={resetFilters}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters ({activeFilterCount})</span>
            </button>
          )}
        </div>

        {/* Bottom Row: Multi-Segment Dropdowns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 pt-1">
          {/* Region Dropdown */}
          <div className="relative">
            <div className="flex items-center space-x-1 mb-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              <Globe className="w-3 h-3 text-indigo-500" />
              <span>Region</span>
            </div>
            <select
              value={filters.region}
              onChange={e => updateFilter('region', e.target.value as Region | 'All')}
              className="w-full px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {regions.map(r => (
                <option key={r} value={r}>
                  {r === 'All' ? 'All Regions' : r}
                </option>
              ))}
            </select>
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <div className="flex items-center space-x-1 mb-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              <Tag className="w-3 h-3 text-emerald-500" />
              <span>Category</span>
            </div>
            <select
              value={filters.category}
              onChange={e => updateFilter('category', e.target.value as ProductCategory | 'All')}
              className="w-full px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {categories.map(c => (
                <option key={c} value={c}>
                  {c === 'All' ? 'All Categories' : c}
                </option>
              ))}
            </select>
          </div>

          {/* Channel Dropdown */}
          <div className="relative">
            <div className="flex items-center space-x-1 mb-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              <Share2 className="w-3 h-3 text-amber-500" />
              <span>Channel</span>
            </div>
            <select
              value={filters.channel}
              onChange={e => updateFilter('channel', e.target.value as SalesChannel | 'All')}
              className="w-full px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {channels.map(ch => (
                <option key={ch} value={ch}>
                  {ch === 'All' ? 'All Channels' : ch}
                </option>
              ))}
            </select>
          </div>

          {/* Customer Segment Dropdown */}
          <div className="relative">
            <div className="flex items-center space-x-1 mb-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              <Users2 className="w-3 h-3 text-purple-500" />
              <span>Segment</span>
            </div>
            <select
              value={filters.segment}
              onChange={e => updateFilter('segment', e.target.value as CustomerSegment | 'All')}
              className="w-full px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {segments.map(s => (
                <option key={s} value={s}>
                  {s === 'All' ? 'All Segments' : s}
                </option>
              ))}
            </select>
          </div>

          {/* Sales Rep Dropdown */}
          <div className="relative">
            <div className="flex items-center space-x-1 mb-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              <UserCheck className="w-3 h-3 text-cyan-500" />
              <span>Sales Rep</span>
            </div>
            <select
              value={filters.salesRepId}
              onChange={e => updateFilter('salesRepId', e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="All">All Reps</option>
              {REPS.map(rep => (
                <option key={rep.id} value={rep.id}>
                  {rep.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Dropdown */}
          <div className="relative">
            <div className="flex items-center space-x-1 mb-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              <CheckCircle2 className="w-3 h-3 text-rose-500" />
              <span>Status</span>
            </div>
            <select
              value={filters.status}
              onChange={e => updateFilter('status', e.target.value as OrderStatus | 'All')}
              className="w-full px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {statuses.map(st => (
                <option key={st} value={st}>
                  {st === 'All' ? 'All Statuses' : st}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filter Badges Pill Bar */}
        {activeFilterCount > 0 && (
          <div className="flex items-center space-x-2 flex-wrap pt-1 text-xs">
            <span className="text-slate-400 font-medium flex items-center space-x-1 text-[11px]">
              <SlidersHorizontal className="w-3 h-3" />
              <span>Filtered by:</span>
            </span>

            {filters.region !== 'All' && (
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-medium text-[11px]">
                <span>Region: {filters.region}</span>
                <button onClick={() => updateFilter('region', 'All')} className="hover:text-indigo-900 dark:hover:text-white">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.category !== 'All' && (
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-medium text-[11px]">
                <span>Cat: {filters.category}</span>
                <button onClick={() => updateFilter('category', 'All')} className="hover:text-emerald-900 dark:hover:text-white">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.channel !== 'All' && (
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-medium text-[11px]">
                <span>Channel: {filters.channel}</span>
                <button onClick={() => updateFilter('channel', 'All')} className="hover:text-amber-900 dark:hover:text-white">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.segment !== 'All' && (
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-medium text-[11px]">
                <span>Segment: {filters.segment}</span>
                <button onClick={() => updateFilter('segment', 'All')} className="hover:text-purple-900 dark:hover:text-white">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.salesRepId !== 'All' && (
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 font-medium text-[11px]">
                <span>Rep: {REPS.find(r => r.id === filters.salesRepId)?.name}</span>
                <button onClick={() => updateFilter('salesRepId', 'All')} className="hover:text-cyan-900 dark:hover:text-white">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.status !== 'All' && (
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-medium text-[11px]">
                <span>Status: {filters.status}</span>
                <button onClick={() => updateFilter('status', 'All')} className="hover:text-rose-900 dark:hover:text-white">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
