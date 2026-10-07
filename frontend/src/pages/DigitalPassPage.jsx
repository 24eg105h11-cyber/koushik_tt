import React from 'react';
import { QrCode, ShieldCheck, Sparkles, AlertCircle, BookOpen, Clock, Layers } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useLibraryStore } from '../store/useLibraryStore';
import DigitalPassCard from '../components/DigitalPassCard';

export default function DigitalPassPage() {
  const { user } = useAuthStore();
  const { transactions } = useLibraryStore();

  const userTransactions = transactions.filter(t => t.userId === user?.id);
  const activeIssues = userTransactions.filter(t => t.status === 'ISSUED' || t.status === 'RENEWED');
  const totalFine = userTransactions.reduce((sum, t) => sum + (t.fineAmount || 0), 0) + (user?.totalFines || 0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
          <QrCode className="w-4 h-4" />
          <span>Personal Library Verification Pass</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Your Digital Library Pass
        </h1>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Present this pass at any librarian scanner counter. Your unique QR code resolves to your student profile & loan records.
        </p>
      </div>

      {/* Main Holographic Pass */}
      <div className="py-4">
        <DigitalPassCard 
          user={user} 
          issuedCount={activeIssues.length} 
          fineAmount={totalFine} 
        />
      </div>

      {/* Instructions & Guidelines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>How to Use Your Pass</span>
          </h3>
          <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
            <li className="flex items-start space-x-2">
              <span className="w-5 h-5 rounded-full bg-indigo-600/30 text-indigo-300 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
              <span>Open this page or screenshot your personal QR code on your phone.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-5 h-5 rounded-full bg-indigo-600/30 text-indigo-300 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
              <span>Tap the zoom icon to enlarge the QR code for clear camera scanning.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-5 h-5 rounded-full bg-indigo-600/30 text-indigo-300 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</span>
              <span>Librarian scans your Pass QR + Book Copy QR to instantly process Issue/Return.</span>
            </li>
          </ul>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Security & Privileges</span>
          </h3>
          <div className="text-xs text-slate-300 space-y-2">
            <p><strong>Max Books Allowed:</strong> 5 Physical Copies concurrently</p>
            <p><strong>Standard Loan Duration:</strong> 14 Days with 2 online renewals</p>
            <p><strong>Overdue Fine Rate:</strong> ₹10.00 / day late</p>
            <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-800">
              JWT security protects your pass. Do not share your pass screenshot with other students.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
