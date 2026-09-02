import React, { useState } from 'react';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Plus,
  Radio,
  FileSpreadsheet,
  Bookmark,
  CheckCircle2,
  AlertTriangle,
  Info,
  X
} from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import { exportToCSV } from '../utils/formatters';

interface HeaderProps {
  onOpenNewOrder: () => void;
  onOpenSavedViews: () => void;
  onOpenExportReport: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenNewOrder,
  onOpenSavedViews,
  onOpenExportReport
}) => {
  const {
    filters,
    updateFilter,
    darkMode,
    setDarkMode,
    isLiveSimulation,
    setIsLiveSimulation,
    notifications,
    filteredOrders,
    triggerConfetti
  } = useDashboard();

  const [showNotifications, setShowNotifications] = useState(false);

  const handleQuickExportCSV = () => {
    const exportData = filteredOrders.map(o => ({
      'Order ID': o.id,
      'Date': o.date,
      'Customer': o.customer.name,
      'Company': o.customer.company,
      'Segment': o.customer.segment,
      'Product': o.productName,
      'Category': o.category,
      'Sales Rep': o.salesRep.name,
      'Region': o.region,
      'Channel': o.channel,
      'Amount ($)': o.amount,
      'Discount (%)': o.discountPct,
      'Margin ($)': o.margin,
      'Margin (%)': o.marginPct,
      'Status': o.status,
      'Payment Method': o.paymentMethod,
    }));

    exportToCSV(`Sales_Analytics_Report_${new Date().toISOString().split('T')[0]}`, exportData);
    triggerConfetti();
  };

  return (
    <header className="sticky top-0 z-20 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 lg:px-6 flex items-center justify-between transition-colors">
      {/* Search Bar */}
      <div className="flex items-center space-x-3 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search orders, customers, reps, or products..."
            value={filters.searchQuery}
            onChange={e => updateFilter('searchQuery', e.target.value)}
            className="w-full pl-9 pr-8 py-2 text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:text-slate-100 text-slate-800 placeholder-slate-400 transition-all"
          />
          {filters.searchQuery && (
            <button
              onClick={() => updateFilter('searchQuery', '')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Action Controls & Toggles */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Live Ticker Toggle */}
        <button
          onClick={() => setIsLiveSimulation(!isLiveSimulation)}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
            isLiveSimulation
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/40 shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
          title="Toggle live order generation simulator"
        >
          <Radio className={`w-3.5 h-3.5 ${isLiveSimulation ? 'animate-pulse text-emerald-500' : ''}`} />
          <span className="hidden md:inline">
            {isLiveSimulation ? 'Live Stream ON' : 'Live Stream OFF'}
          </span>
        </button>

        {/* Saved Filter Views Modal Button */}
        <button
          onClick={onOpenSavedViews}
          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors relative"
          title="Saved Filter Presets"
        >
          <Bookmark className="w-4 h-4" />
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
        </button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {notifications.length > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
                <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-100">Live Insights & Alerts</h4>
                <span className="text-xs bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-medium px-2 py-0.5 rounded-full">
                  {notifications.length} new
                </span>
              </div>
              <div className="mt-3 space-y-2.5 max-h-72 overflow-y-auto">
                {notifications.map(n => (
                  <div key={n.id} className="flex items-start space-x-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-xs">
                    {n.type === 'sale' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    ) : n.type === 'alert' ? (
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    ) : (
                      <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-800 dark:text-slate-200">{n.title}</p>
                      <p className="text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">{n.message}</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick CSV Export */}
        <button
          onClick={handleQuickExportCSV}
          className="hidden sm:flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all"
          title="Export active table rows to CSV"
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>CSV</span>
        </button>

        {/* Full PDF Summary Report Trigger */}
        <button
          onClick={onOpenExportReport}
          className="hidden md:flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800 transition-all"
        >
          <span>Summary PDF</span>
        </button>

        {/* Add New Transaction Button */}
        <button
          onClick={onOpenNewOrder}
          className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Sale</span>
        </button>
      </div>
    </header>
  );
};
