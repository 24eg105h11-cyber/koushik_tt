import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useLibraryStore } from '../store/useLibraryStore';

export default function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity } = useCartStore();
  const { settings } = useLibraryStore();

  const subtotal = cart.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
  const tax = subtotal * ((settings?.storeTaxPercent || 5) / 100);
  const shippingFee = subtotal > 0 ? (settings?.storeShippingFee || 40) : 0;
  const grandTotal = subtotal + tax + shippingFee;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
          <ShoppingCart className="w-4 h-4" />
          <span>Campus Bookstore Cart</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Your Shopping Cart
        </h1>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-16 glass-panel rounded-3xl border border-slate-800 space-y-4">
          <ShoppingCart className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">Your cart is currently empty</h3>
          <p className="text-xs text-slate-400">Explore the campus bookstore to purchase physical copies.</p>
          <Link to="/store" className="inline-block px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors">
            Browse Bookstore
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map(item => (
              <div key={item.book.id} className="glass-panel p-5 rounded-3xl border border-slate-800 flex items-center justify-between gap-4">
                <img src={item.book.coverImage} alt={item.book.title} className="w-16 h-20 object-cover rounded-xl" />

                <div className="flex-1 space-y-1">
                  <h4 className="text-sm font-bold text-white">{item.book.title}</h4>
                  <p className="text-xs text-slate-400">by {item.book.author}</p>
                  <p className="text-xs font-extrabold text-amber-400">₹{item.book.price.toFixed(2)} each</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
                  <button onClick={() => updateQuantity(item.book.id, item.quantity - 1)} className="text-slate-400 hover:text-white">
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold text-white w-6 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.book.id, item.quantity + 1)} className="text-slate-400 hover:text-white">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button onClick={() => removeFromCart(item.book.id)} className="p-2 rounded-xl text-rose-400 hover:bg-rose-500/10">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary Panel */}
          <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Order Summary</h3>

            <div className="space-y-2 text-xs text-slate-300 border-b border-slate-800 pb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (5%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Campus Shipping Fee</span>
                <span>₹{shippingFee.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between text-base font-extrabold text-white">
              <span>Total Amount</span>
              <span className="text-amber-400">₹{grandTotal.toFixed(2)}</span>
            </div>

            <button
              onClick={() => navigate('/store/checkout')}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/20 transition-all"
            >
              <span>Proceed to Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
