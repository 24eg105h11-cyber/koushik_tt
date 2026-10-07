import React from 'react';
import { ShoppingBag, CheckCircle, Clock, Truck } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';

export default function OrderHistoryPage() {
  const { user } = useAuthStore();
  const { orders } = useCartStore();

  const userOrders = orders.filter(o => o.userId === user?.id);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
          <ShoppingBag className="w-4 h-4" />
          <span>Bookstore Purchase History</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Your Purchased Bookstore Orders
        </h1>
      </div>

      {userOrders.length === 0 ? (
        <div className="text-center py-16 glass-panel rounded-3xl border border-slate-800 text-slate-400 text-xs">
          No bookstore orders found in your order history.
        </div>
      ) : (
        <div className="space-y-6">
          {userOrders.map(o => (
            <div key={o.id} className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <div>
                  <span className="text-xs font-mono font-bold text-amber-400">{o.orderNumber}</span>
                  <p className="text-xs text-slate-400">Placed on: {new Date(o.createdAt).toLocaleString()}</p>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {o.orderStatus}
                  </span>
                  <span className="text-base font-extrabold text-white">₹{o.totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2">
                {o.items.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3 text-xs text-slate-300">
                    <img src={item.coverImage} alt={item.bookTitle} className="w-8 h-10 object-cover rounded" />
                    <span className="font-bold text-white flex-1">{item.bookTitle}</span>
                    <span>Qty: {item.quantity}</span>
                    <span className="font-extrabold text-amber-400">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
