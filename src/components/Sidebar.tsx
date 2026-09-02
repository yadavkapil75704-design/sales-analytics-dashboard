import React from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  Package,
  Users,
  Award,
  Sparkles,
  Table,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
  BarChart2
} from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const { activeTab, setActiveTab, filteredOrders, isLiveSimulation } = useDashboard();

  const navItems = [
    { id: 'overview', label: 'Executive Overview', icon: LayoutDashboard, badge: null },
    { id: 'performance', label: 'Sales Performance', icon: TrendingUp, badge: null },
    { id: 'products', label: 'Product Analytics', icon: Package, badge: null },
    { id: 'customers', label: 'Customer Insights', icon: Users, badge: null },
    { id: 'team', label: 'Rep Leaderboard', icon: Award, badge: null },
    { id: 'forecast', label: 'AI Forecast Simulator', icon: Sparkles, badge: 'AI' },
    { id: 'table', label: 'Transactions Table', icon: Table, badge: filteredOrders.length.toString() },
    { id: 'settings', label: 'Target & Settings', icon: Settings, badge: null },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-30 h-screen transition-all duration-300 ease-in-out bg-slate-900 text-slate-100 flex flex-col border-r border-slate-800 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Header Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
        <div className="flex items-center space-x-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 shrink-0">
            <BarChart2 className="w-6 h-6" />
          </div>
          {!collapsed && (
            <div className="truncate">
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                Veloce<span className="text-indigo-400">Sales</span>
              </span>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider -mt-1">
                Analytics Engine
              </p>
            </div>
          )}
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Live Simulation Indicator Badge */}
      {!collapsed && isLiveSimulation && (
        <div className="mx-4 mt-4 p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center space-x-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 pulse-ring shrink-0" />
          <div className="text-xs">
            <p className="font-semibold text-emerald-400">Live Simulation Active</p>
            <p className="text-[11px] text-emerald-300/70">Receiving live orders...</p>
          </div>
        </div>
      )}

      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-sm transition-all group ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <div className="flex items-center space-x-3 truncate">
                <Icon
                  className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'
                  }`}
                />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </div>

              {!collapsed && item.badge && (
                <span
                  className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                    item.badge === 'AI'
                      ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-xs'
                      : isActive
                      ? 'bg-indigo-700 text-indigo-100'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom User / Quick Action Card */}
      {!collapsed ? (
        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-between">
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-300 font-bold text-xs shrink-0">
                VP
              </div>
              <div className="truncate text-xs">
                <p className="font-semibold text-slate-200 truncate">Executive Lead</p>
                <p className="text-slate-400 text-[11px] truncate">Admin Console</p>
              </div>
            </div>
            <span className="p-1 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
              PRO
            </span>
          </div>
        </div>
      ) : (
        <div className="p-3 border-t border-slate-800 flex justify-center">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
            <Zap className="w-4 h-4" />
          </div>
        </div>
      )}
    </aside>
  );
};
