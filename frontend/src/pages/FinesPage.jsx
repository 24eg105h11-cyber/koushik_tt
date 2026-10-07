import React, { useState } from 'react';
import { DollarSign, ShieldCheck, CreditCard, AlertTriangle, CheckCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuthStore } from '../store/useAuthStore';
import { useLibraryStore } from '../store/useLibraryStore';

export default function FinesPage() {
  const { user } = useAuthStore();
  const { transactions, payFine } = useLibraryStore();

  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const userTransactions = transactions.filter(t => t.userId === user?.id);
  const overdueTxns = userTransactions.filter(t => (t.fineAmount || 0) > 0);
  const totalFine = userTransactions.reduce((sum, t) => sum + (t.fineAmount || 0), 0) + (user?.totalFines || 0);

  const handleProcessPayment = () => {
    payFine(user?.id, totalFine);
    setPaymentSuccess(true);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    setTimeout(() => {
      setPaymentSuccess(false);
      setIsPayModalOpen(false);
    }, 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
          <DollarSign className="w-4 h-4" />
          <span>Library Fine & Dues Portal</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Outstanding Fines & Account Balance
        </h1>
        <p className="text-slate-400 text-sm max-w-xl">
          View automated late return fine calculations and clear dues securely via Razorpay or Stripe payment gateways.
        </p>
      </div>

      {/* Main Fine Summary Card */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 bg-slate-900/80 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs uppercase font-bold text-slate-400">Total Outstanding Balance</span>
          <h2 className="text-4xl font-extrabold text-white mt-1">
            ₹<span className={totalFine > 0 ? "text-rose-400" : "text-emerald-400"}>{totalFine.toFixed(2)}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Configured Rate: ₹10.00 / day overdue</p>
        </div>

        {totalFine > 0 ? (
          <button
            onClick={() => setIsPayModalOpen(true)}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-sm flex items-center space-x-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
          >
            <CreditCard className="w-5 h-5" />
            <span>Pay Dues Online Now</span>
          </button>
        ) : (
          <div className="flex items-center space-x-2 px-4 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <CheckCircle className="w-5 h-5" />
            <span>No Outstanding Fines!</span>
          </div>
        )}
      </div>

      {/* Fine Breakdown List */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Fine History & Overdue Records</h3>

        {overdueTxns.length === 0 ? (
          <div className="text-center py-10 glass-panel rounded-3xl border border-slate-800 text-slate-400 text-xs">
            No overdue book fines linked to your account.
          </div>
        ) : (
          <div className="space-y-3">
            {overdueTxns.map(t => (
              <div key={t.id} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{t.bookTitle}</h4>
                  <div className="flex items-center space-x-3 text-xs text-slate-400 mt-1">
                    <span>Transaction: <strong className="font-mono text-indigo-400">{t.transactionId}</strong></span>
                    <span>Due Date: {t.dueDate}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-extrabold text-rose-400">₹{t.fineAmount.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Simulated Razorpay / Stripe Payment Modal */}
      {isPayModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-3xl max-w-md w-full border border-slate-700 shadow-2xl space-y-5 relative">
            <div className="flex justify-between items-center pb-3 border-b border-slate-700">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Razorpay / Stripe Gateway</h3>
              </div>
              <button onClick={() => setIsPayModalOpen(false)} className="text-slate-400 hover:text-white font-bold">✕</button>
            </div>

            {paymentSuccess ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h4 className="text-lg font-bold text-white">Payment Successful!</h4>
                <p className="text-xs text-slate-300">₹{totalFine.toFixed(2)} cleared from your library account.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                  <span className="text-xs text-slate-400">Amount Payable</span>
                  <p className="text-3xl font-extrabold text-white mt-0.5">₹{totalFine.toFixed(2)}</p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300">Select Payment Method:</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setPaymentMethod('UPI')}
                      className={`p-3 rounded-xl text-xs font-bold border transition-all ${paymentMethod === 'UPI' ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-900 text-slate-400 border-slate-800'}`}
                    >
                      UPI / GPay
                    </button>
                    <button
                      onClick={() => setPaymentMethod('CARD')}
                      className={`p-3 rounded-xl text-xs font-bold border transition-all ${paymentMethod === 'CARD' ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-900 text-slate-400 border-slate-800'}`}
                    >
                      Credit Card
                    </button>
                    <button
                      onClick={() => setPaymentMethod('NET')}
                      className={`p-3 rounded-xl text-xs font-bold border transition-all ${paymentMethod === 'NET' ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-900 text-slate-400 border-slate-800'}`}
                    >
                      NetBanking
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleProcessPayment}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Authorize Payment of ₹{totalFine.toFixed(2)}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
