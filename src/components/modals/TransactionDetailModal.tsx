import React from 'react';
import {
  X,
  Printer,
  Calendar,
  Building2,
  Mail,
  UserCheck,
  CreditCard,
  Tag,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText
} from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { formatCurrency, formatDate } from '../../utils/formatters';

export const TransactionDetailModal: React.FC = () => {
  const { selectedOrder, setSelectedOrder, triggerConfetti } = useDashboard();

  if (!selectedOrder) return null;

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

  const handlePrint = () => {
    window.print();
    triggerConfetti();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-2xl w-full border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Order Receipt #{selectedOrder.id}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-2 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{formatDate(selectedOrder.date)}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition-colors"
              title="Print Receipt"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedOrder(null)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Status & Financial Overview Bar */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Order Status
              </span>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(selectedOrder.status)}`}>
                {selectedOrder.status === 'Completed' && <CheckCircle2 className="w-3.5 h-3.5 mr-1" />}
                {selectedOrder.status === 'Processing' && <Clock className="w-3.5 h-3.5 mr-1" />}
                {selectedOrder.status === 'Pending Approval' && <AlertCircle className="w-3.5 h-3.5 mr-1" />}
                {selectedOrder.status}
              </span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Total Paid Amount
              </span>
              <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">
                {formatCurrency(selectedOrder.amount)}
              </span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Net Margin
              </span>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                {formatCurrency(selectedOrder.margin)} ({selectedOrder.marginPct}%)
              </span>
            </div>
          </div>

          {/* Customer & Rep Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Customer Information */}
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5 mb-2">
                <Building2 className="w-4 h-4 text-indigo-500" />
                <span>Customer Account</span>
              </h4>
              <div className="flex items-center space-x-3">
                <img
                  src={selectedOrder.customer.avatar}
                  alt={selectedOrder.customer.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                />
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-sm">
                    {selectedOrder.customer.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {selectedOrder.customer.company}
                  </p>
                </div>
              </div>
              <div className="pt-2 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <p className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{selectedOrder.customer.email}</span>
                </p>
                <p className="flex items-center space-x-2">
                  <Tag className="w-3.5 h-3.5 text-slate-400" />
                  <span>Segment: <strong className="text-indigo-600 dark:text-indigo-400">{selectedOrder.customer.segment}</strong></span>
                </p>
              </div>
            </div>

            {/* Sales Rep Information */}
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5 mb-2">
                <UserCheck className="w-4 h-4 text-emerald-500" />
                <span>Assigned Account Rep</span>
              </h4>
              <div className="flex items-center space-x-3">
                <img
                  src={selectedOrder.salesRep.avatar}
                  alt={selectedOrder.salesRep.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                />
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-sm">
                    {selectedOrder.salesRep.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {selectedOrder.salesRep.role}
                  </p>
                </div>
              </div>
              <div className="pt-2 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <p>Region Territory: <strong>{selectedOrder.region}</strong></p>
                <p>Channel Source: <strong>{selectedOrder.channel}</strong></p>
              </div>
            </div>
          </div>

          {/* Itemized Invoice Table */}
          <div className="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-900/80 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold text-[10px]">
                <tr>
                  <th className="py-3 px-4">Item Description</th>
                  <th className="py-3 px-4 text-center">Qty</th>
                  <th className="py-3 px-4 text-right">Unit Price</th>
                  <th className="py-3 px-4 text-right">Discount</th>
                  <th className="py-3 px-4 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 font-medium">
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                    {selectedOrder.productName}
                    <span className="block text-[11px] font-normal text-slate-400">
                      Category: {selectedOrder.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-700 dark:text-slate-300">
                    {selectedOrder.quantity}
                  </td>
                  <td className="py-3.5 px-4 text-right text-slate-700 dark:text-slate-300">
                    {formatCurrency(selectedOrder.unitPrice)}
                  </td>
                  <td className="py-3.5 px-4 text-right text-rose-500 font-semibold">
                    -{selectedOrder.discountPct}%
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-slate-900 dark:text-white">
                    {formatCurrency(selectedOrder.amount)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Payment Method Footer */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-700/60">
            <span className="flex items-center space-x-1.5">
              <CreditCard className="w-4 h-4 text-indigo-500" />
              <span>Payment Method: <strong>{selectedOrder.paymentMethod}</strong></span>
            </span>
            <span>Transaction Ref: <strong className="font-mono text-slate-700 dark:text-slate-300">{selectedOrder.timestamp}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};
