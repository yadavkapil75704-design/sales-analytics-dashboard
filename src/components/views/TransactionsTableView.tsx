import React, { useState, useMemo } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { formatCurrency, formatDate, exportToCSV } from '../../utils/formatters';
import {
  FileSpreadsheet,
  ArrowUpDown,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  ChevronLeft,
  ChevronRight,
  Plus
} from 'lucide-react';
import { SalesOrder } from '../../types/dashboard';

export const TransactionsTableView: React.FC = () => {
  const { filteredOrders, setSelectedOrder, setIsNewOrderModalOpen, triggerConfetti } = useDashboard();

  const [sortField, setSortField] = useState<keyof SalesOrder | 'customer.name'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const handleSort = (field: keyof SalesOrder | 'customer.name') => {
    if (sortField === field) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedOrders = useMemo(() => {
    return [...filteredOrders].sort((a, b) => {
      let valA: any = a[sortField as keyof SalesOrder];
      let valB: any = b[sortField as keyof SalesOrder];

      if (sortField === 'customer.name') {
        valA = a.customer.name;
        valB = b.customer.name;
      }

      if (typeof valA === 'string') {
        return sortDirection === 'asc'
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }
      return sortDirection === 'asc' ? valA - valB : valB - valA;
    });
  }, [filteredOrders, sortField, sortDirection]);

  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage) || 1;
  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedOrders.slice(start, start + itemsPerPage);
  }, [sortedOrders, currentPage, itemsPerPage]);

  const handleExportCSV = () => {
    const exportData = sortedOrders.map(o => ({
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
      'Payment Method': o.paymentMethod
    }));

    exportToCSV(`Sales_Transactions_Export_${new Date().toISOString().split('T')[0]}`, exportData);
    triggerConfetti();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border-emerald-300';
      case 'Processing':
        return 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 border-blue-300';
      case 'Pending Approval':
        return 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border-amber-300';
      case 'Refunded':
        return 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-400 border-purple-300';
      case 'Cancelled':
        return 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400 border-rose-300';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-4">
      {/* Table Action Bar */}
      <div className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 transition-colors">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
            Sales Transactions Master Table
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Showing {paginatedOrders.length} of {sortedOrders.length} filtered transaction records
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-all"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setIsNewOrderModalOpen(true)}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Sale</span>
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 rounded-2xl shadow-xs overflow-hidden transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-900/80 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold text-[10px]">
              <tr>
                <th className="py-3.5 px-4 cursor-pointer hover:text-slate-900 dark:hover:text-white" onClick={() => handleSort('id')}>
                  <div className="flex items-center space-x-1">
                    <span>Order ID</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3.5 px-4 cursor-pointer hover:text-slate-900 dark:hover:text-white" onClick={() => handleSort('date')}>
                  <div className="flex items-center space-x-1">
                    <span>Date</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3.5 px-4 cursor-pointer hover:text-slate-900 dark:hover:text-white" onClick={() => handleSort('customer.name')}>
                  <div className="flex items-center space-x-1">
                    <span>Customer</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3.5 px-4">Product</th>
                <th className="py-3.5 px-4">Sales Rep</th>
                <th className="py-3.5 px-4 cursor-pointer hover:text-slate-900 dark:hover:text-white text-right" onClick={() => handleSort('amount')}>
                  <div className="flex items-center justify-end space-x-1">
                    <span>Amount</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3.5 px-4 cursor-pointer hover:text-slate-900 dark:hover:text-white text-right" onClick={() => handleSort('margin')}>
                  <div className="flex items-center justify-end space-x-1">
                    <span>Margin %</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 font-medium">
              {paginatedOrders.map(order => (
                <tr
                  key={order.id}
                  className="hover:bg-indigo-50/40 dark:hover:bg-indigo-950/30 transition-colors group"
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-800 dark:text-slate-200">
                    {order.id}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    {formatDate(order.date)}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-2.5">
                      <img
                        src={order.customer.avatar}
                        alt={order.customer.name}
                        className="w-7 h-7 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                      />
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white text-xs">
                          {order.customer.company}
                        </p>
                        <p className="text-[10px] text-slate-400">{order.customer.segment}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[180px]">
                      {order.productName}
                    </p>
                    <p className="text-[10px] text-slate-400">{order.category}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      {order.salesRep.name}
                    </p>
                    <p className="text-[10px] text-slate-400">{order.region}</p>
                  </td>
                  <td className="py-3.5 px-4 text-right font-black text-slate-900 dark:text-white text-sm">
                    {formatCurrency(order.amount)}
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-emerald-600 dark:text-emerald-400">
                    {order.marginPct}%
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(order.status)}`}>
                      {order.status === 'Completed' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                      {order.status === 'Processing' && <Clock className="w-3 h-3 mr-1" />}
                      {order.status === 'Pending Approval' && <AlertCircle className="w-3 h-3 mr-1" />}
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-colors"
                      title="View Order Invoice Receipt"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-6 py-3.5 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
            <span>Rows per page:</span>
            <select
              value={itemsPerPage}
              onChange={e => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-slate-500 dark:text-slate-400 font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex items-center space-x-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-40"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
