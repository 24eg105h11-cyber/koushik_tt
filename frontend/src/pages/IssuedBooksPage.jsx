import React from 'react';
import { Clock, RefreshCw, AlertTriangle, CheckCircle, BookOpen, Calendar } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useLibraryStore } from '../store/useLibraryStore';

export default function IssuedBooksPage() {
  const { user } = useAuthStore();
  const { transactions, confirmRenew } = useLibraryStore();

  const userTransactions = transactions.filter(t => t.userId === user?.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>Issued Book Management</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          My Borrowed Books & Loan Status
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl">
          Track issue dates, upcoming due dates, renewal limits, and return statuses for all physical library copies.
        </p>
      </div>

      {/* Transactions List */}
      {userTransactions.length === 0 ? (
        <div className="text-center py-16 glass-panel rounded-3xl border border-slate-800">
          <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white">No borrowing history found</h3>
          <p className="text-xs text-slate-400 mt-1">Visit the campus library to check out physical book copies.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {userTransactions.map(t => {
            const isOverdue = t.status === 'OVERDUE';
            const isReturned = t.status === 'RETURNED';

            return (
              <div 
                key={t.id}
                className={`glass-panel p-6 rounded-3xl border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${isOverdue ? 'border-rose-500/40 bg-rose-950/10' : isReturned ? 'border-slate-800/80 bg-slate-900/40' : 'border-slate-800 bg-slate-900/60'}`}
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-mono font-bold text-indigo-400 px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                      {t.transactionId}
                    </span>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${isReturned ? 'bg-slate-800 text-slate-400' : isOverdue ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'}`}>
                      {t.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white">{t.bookTitle}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                    <span>Copy: <strong className="text-slate-200 font-mono">{t.copyCode}</strong></span>
                    <span>Issued Date: <strong className="text-slate-300">{t.issueDate}</strong></span>
                    <span>Issued By: <strong className="text-slate-300">{t.issuedBy}</strong></span>
                    <span>Renewals Used: <strong className="text-slate-300">{t.renewalCount}/2</strong></span>
                  </div>
                </div>

                <div className="flex flex-col md:items-end space-y-3 shrink-0 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 border-slate-800">
                  <div className="text-left md:text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Due Date</span>
                    <span className={`text-base font-extrabold px-3 py-1 rounded-xl ${isOverdue ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'}`}>
                      {t.dueDate}
                    </span>
                  </div>

                  {!isReturned && (
                    <button
                      onClick={() => confirmRenew(t.id)}
                      disabled={t.renewalCount >= 2 || isOverdue}
                      className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${t.renewalCount >= 2 || isOverdue ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20'}`}
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>{t.renewalCount >= 2 ? 'Max Renewals Reached' : 'Renew Loan (+14 Days)'}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
