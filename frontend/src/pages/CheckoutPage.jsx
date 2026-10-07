import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, CreditCard, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';
import { useLibraryStore } from '../store/useLibraryStore';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, placeOrder } = useCartStore();
  const { user } = useAuthStore();
  const { settings } = useLibraryStore();

  const [address, setAddress] = useState('Hostel Block B, Room 304, Campus Hostel');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  const subtotal = cart.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
  const tax = subtotal * ((settings?.storeTaxPercent || 5) / 100);
  const shippingFee = settings?.storeShippingFee || 40;
  const grandTotal = subtotal + tax + shippingFee;

  const handlePayAndOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const order = placeOrder(user?.id, {
        taxPercent: settings?.storeTaxPercent || 5,
        shippingFee: settings?.storeShippingFee || 40,
        paymentMethod,
        shippingAddress: address
      });

      setCompletedOrder(order);
      setIsProcessing(false);
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
    }, 1500);
  };

  if (completedOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-2xl">
          <CheckCircle className="w-12 h-12" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-white">Order Confirmed!</h1>
          <p className="text-xs text-slate-400">Order Number: <strong className="font-mono text-amber-400">{completedOrder.orderNumber}</strong></p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800 text-left text-xs text-slate-300 space-y-3">
          <h3 className="font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">Order Receipt Summary</h3>
          <p><strong>Shipping Address:</strong> {completedOrder.shippingAddress}</p>
          <p><strong>Payment Status:</strong> <span className="text-emerald-400 font-bold">PAID ({completedOrder.paymentMethod})</span></p>
          <p><strong>Total Paid:</strong> <strong className="text-amber-400 font-extrabold">₹{completedOrder.totalAmount.toFixed(2)}</strong></p>
        </div>

        <div className="flex justify-center space-x-4">
          <button onClick={() => navigate('/store/orders')} className="px-6 py-3 rounded-2xl bg-amber-500 text-slate-950 font-extrabold text-xs hover:bg-amber-400 transition-colors">
            View My Orders
          </button>
          <button onClick={() => navigate('/store')} className="px-6 py-3 rounded-2xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700 transition-colors">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Razorpay / Stripe Secure Checkout</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Complete Your Purchase
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Form */}
        <div className="md:col-span-7 space-y-6">
          
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">1. Campus Shipping Address</h3>
            <textarea
              rows="3"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 rounded-2xl glass-input text-xs"
              placeholder="Hostel, Block, Room Number or Department..."
            ></textarea>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">2. Payment Method</h3>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setPaymentMethod('UPI')}
                className={`p-3 rounded-2xl text-xs font-bold border transition-all ${paymentMethod === 'UPI' ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-900 text-slate-400 border-slate-800'}`}
              >
                UPI / GPay
              </button>
              <button
                onClick={() => setPaymentMethod('CARD')}
                className={`p-3 rounded-2xl text-xs font-bold border transition-all ${paymentMethod === 'CARD' ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-900 text-slate-400 border-slate-800'}`}
              >
                Card
              </button>
              <button
                onClick={() => setPaymentMethod('NET')}
                className={`p-3 rounded-2xl text-xs font-bold border transition-all ${paymentMethod === 'NET' ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-900 text-slate-400 border-slate-800'}`}
              >
                NetBanking
              </button>
            </div>
          </div>

        </div>

        {/* Right Summary */}
        <div className="md:col-span-5 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Payment Breakdown</h3>

          <div className="space-y-2 text-xs text-slate-300 border-b border-slate-800 pb-4">
            <div className="flex justify-between">
              <span>Subtotal ({cart.length} items)</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (5%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Fee</span>
              <span>₹{shippingFee.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-between text-lg font-extrabold text-white">
            <span>Total Payable</span>
            <span className="text-amber-400">₹{grandTotal.toFixed(2)}</span>
          </div>

          <button
            onClick={handlePayAndOrder}
            disabled={isProcessing}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/20 transition-all"
          >
            <Sparkles className="w-5 h-5" />
            <span>{isProcessing ? "Processing Payment..." : `Authorize Payment ₹${grandTotal.toFixed(2)}`}</span>
          </button>
        </div>

      </div>

    </div>
  );
}
