import React, { useState } from 'react';
import { X, Plus, DollarSign, Package } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { PRODUCTS, CUSTOMERS, REPS } from '../../data/mockData';
import { SalesChannel, PaymentMethod } from '../../types/dashboard';

export const NewTransactionModal: React.FC = () => {
  const { isNewOrderModalOpen, setIsNewOrderModalOpen, addOrder, triggerConfetti } = useDashboard();

  const [selectedProductId, setSelectedProductId] = useState(PRODUCTS[0].name);
  const [selectedCustomerId, setSelectedCustomerId] = useState(CUSTOMERS[0].id);
  const [selectedRepId, setSelectedRepId] = useState(REPS[0].id);
  const [quantity, setQuantity] = useState(1);
  const [discountPct, setDiscountPct] = useState(5);
  const [channel, setChannel] = useState<SalesChannel>('Direct Sales');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Credit Card');

  if (!isNewOrderModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const prod = PRODUCTS.find(p => p.name === selectedProductId) || PRODUCTS[0];
    const cust = CUSTOMERS.find(c => c.id === selectedCustomerId) || CUSTOMERS[0];
    const rep = REPS.find(r => r.id === selectedRepId) || REPS[0];

    const listPrice = prod.basePrice * quantity;
    const amount = Math.round(listPrice * (1 - discountPct / 100));

    addOrder({
      productName: prod.name,
      category: prod.category,
      customer: cust,
      salesRep: rep,
      region: rep.region,
      quantity,
      unitPrice: prod.basePrice,
      amount,
      discountPct,
      channel,
      paymentMethod,
      status: 'Completed'
    });

    triggerConfetti();
    setIsNewOrderModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-lg w-full border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
              <Plus className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Add New Sales Order
            </h3>
          </div>
          <button
            onClick={() => setIsNewOrderModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Select Product */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1 flex items-center space-x-1">
              <Package className="w-3.5 h-3.5 text-indigo-500" />
              <span>Product Item</span>
            </label>
            <select
              value={selectedProductId}
              onChange={e => setSelectedProductId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-medium focus:ring-2 focus:ring-indigo-500"
            >
              {PRODUCTS.map(p => (
                <option key={p.name} value={p.name}>
                  {p.name} (${p.basePrice.toLocaleString()})
                </option>
              ))}
            </select>
          </div>

          {/* Select Customer & Sales Rep */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Customer Account
              </label>
              <select
                value={selectedCustomerId}
                onChange={e => setSelectedCustomerId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-medium focus:ring-2 focus:ring-indigo-500"
              >
                {CUSTOMERS.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.company} ({c.segment})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Sales Rep
              </label>
              <select
                value={selectedRepId}
                onChange={e => setSelectedRepId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-medium focus:ring-2 focus:ring-indigo-500"
              >
                {REPS.map(r => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quantity & Discount */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={quantity}
                onChange={e => setQuantity(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Discount %
              </label>
              <input
                type="number"
                min="0"
                max="30"
                value={discountPct}
                onChange={e => setDiscountPct(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-medium"
              />
            </div>
          </div>

          {/* Channel & Payment */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Sales Channel
              </label>
              <select
                value={channel}
                onChange={e => setChannel(e.target.value as SalesChannel)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-medium"
              >
                <option value="Direct Sales">Direct Sales</option>
                <option value="Online Store">Online Store</option>
                <option value="Partner Network">Partner Network</option>
                <option value="Inbound Marketing">Inbound Marketing</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={e => setPaymentMethod(e.target.value as PaymentMethod)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-medium"
              >
                <option value="Credit Card">Credit Card</option>
                <option value="Wire Transfer">Wire Transfer</option>
                <option value="ACH Direct">ACH Direct</option>
                <option value="Invoice 30-Day">Invoice 30-Day</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end space-x-3 border-t border-slate-100 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setIsNewOrderModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/30 flex items-center space-x-1.5 transition-all"
            >
              <DollarSign className="w-4 h-4" />
              <span>Record Sale Order</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
