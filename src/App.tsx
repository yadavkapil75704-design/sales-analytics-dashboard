import React, { useState } from 'react';
import { DashboardProvider, useDashboard } from './context/DashboardContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';

import { OverviewView } from './components/views/OverviewView';
import { SalesPerformanceView } from './components/views/SalesPerformanceView';
import { ProductAnalyticsView } from './components/views/ProductAnalyticsView';
import { CustomerInsightsView } from './components/views/CustomerInsightsView';
import { TeamLeaderboardView } from './components/views/TeamLeaderboardView';
import { ForecastSimulatorView } from './components/views/ForecastSimulatorView';
import { TransactionsTableView } from './components/views/TransactionsTableView';
import { SettingsView } from './components/views/SettingsView';

import { TransactionDetailModal } from './components/modals/TransactionDetailModal';
import { NewTransactionModal } from './components/modals/NewTransactionModal';
import { SavedViewsModal } from './components/modals/SavedViewsModal';
import { ExportReportModal } from './components/modals/ExportReportModal';

const DashboardContent: React.FC = () => {
  const { activeTab, setIsNewOrderModalOpen } = useDashboard();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [isSavedViewsOpen, setIsSavedViewsOpen] = useState<boolean>(false);
  const [isExportReportOpen, setIsExportReportOpen] = useState<boolean>(false);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewView />;
      case 'performance':
        return <SalesPerformanceView />;
      case 'products':
        return <ProductAnalyticsView />;
      case 'customers':
        return <CustomerInsightsView />;
      case 'team':
        return <TeamLeaderboardView />;
      case 'forecast':
        return <ForecastSimulatorView />;
      case 'table':
        return <TransactionsTableView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <OverviewView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex font-sans transition-colors">
      {/* Sidebar Navigation */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Container */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          collapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        {/* Top Header Bar */}
        <Header
          onOpenNewOrder={() => setIsNewOrderModalOpen(true)}
          onOpenSavedViews={() => setIsSavedViewsOpen(true)}
          onOpenExportReport={() => setIsExportReportOpen(true)}
        />

        {/* Global Live Filter Bar */}
        <FilterBar />

        {/* Main View Tab Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          {renderActiveView()}
        </main>
      </div>

      {/* Global Modals & Detail Receipt Drawers */}
      <TransactionDetailModal />
      <NewTransactionModal />
      <SavedViewsModal
        isOpen={isSavedViewsOpen}
        onClose={() => setIsSavedViewsOpen(false)}
      />
      <ExportReportModal
        isOpen={isExportReportOpen}
        onClose={() => setIsExportReportOpen(false)}
      />
    </div>
  );
};

export function App() {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
}

export default App;
