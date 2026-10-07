import React, { useState } from 'react';
import { Settings, Save, CheckCircle, ShieldCheck, DollarSign, Clock, BookOpen, Sparkles } from 'lucide-react';
import { useLibraryStore } from '../store/useLibraryStore';

export default function AdminSettingsPage() {
  const { settings, updateSettings } = useLibraryStore();

  const [formState, setFormState] = useState({ ...settings });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: parseFloat(value) || value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateSettings(formState);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-xs font-bold text-purple-400 uppercase tracking-wider">
          <Settings className="w-4 h-4" />
          <span>System Rules & Policy Administration</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Library & Bookstore Settings
        </h1>
        <p className="text-slate-400 text-sm max-w-xl">
          Adjust configurable fine calculations, loan parameters, student borrowing limits, and bookstore tax & shipping fees.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center space-x-2 animate-in fade-in">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span>Library system settings updated successfully!</span>
        </div>
      )}

      {/* Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Section 1: Fine & Loan Policies */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span>Fine & Loan Parameters</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Overdue Fine Rate (₹ / Day)</label>
              <input
                type="number"
                step="0.5"
                name="finePerDay"
                value={formState.finePerDay}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl glass-input text-sm font-bold text-emerald-400"
              />
              <p className="text-[11px] text-slate-500 mt-1">Calculated automatically on overdue book returns.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Max Books Allowed Per Student</label>
              <input
                type="number"
                name="maxBooksPerStudent"
                value={formState.maxBooksPerStudent}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl glass-input text-sm font-bold text-indigo-400"
              />
              <p className="text-[11px] text-slate-500 mt-1">Smart QR scanner blocks issues exceeding this limit.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Standard Loan Duration (Days)</label>
              <input
                type="number"
                name="maxLoanDays"
                value={formState.maxLoanDays}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl glass-input text-sm font-bold text-amber-400"
              />
              <p className="text-[11px] text-slate-500 mt-1">Default days until book is marked due.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Max Renewal Count</label>
              <input
                type="number"
                name="maxRenewals"
                value={formState.maxRenewals}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl glass-input text-sm font-bold text-purple-400"
              />
              <p className="text-[11px] text-slate-500 mt-1">Number of times student can extend a loan.</p>
            </div>
          </div>
        </div>

        {/* Section 2: Bookstore & Tax Parameters */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Bookstore Pricing & Shipping Parameters</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Store Sales Tax Rate (%)</label>
              <input
                type="number"
                step="0.1"
                name="storeTaxPercent"
                value={formState.storeTaxPercent}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl glass-input text-sm font-bold text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Campus Shipping Fee (₹)</label>
              <input
                type="number"
                name="storeShippingFee"
                value={formState.storeShippingFee}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl glass-input text-sm font-bold text-white"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-sm flex items-center justify-center space-x-2 shadow-xl shadow-purple-600/30 transition-all hover:scale-[1.01]"
        >
          <Save className="w-5 h-5" />
          <span>Save & Apply System Configuration</span>
        </button>

      </form>

    </div>
  );
}
