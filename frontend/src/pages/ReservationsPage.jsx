import React from 'react';
import { Bookmark, Clock, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useLibraryStore } from '../store/useLibraryStore';

export default function ReservationsPage() {
  const { user } = useAuthStore();
  const { reservations } = useLibraryStore();

  const userReservations = reservations.filter(r => r.userId === user?.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
          <Bookmark className="w-4 h-4" />
          <span>Queue Reservation Tracker</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Active Book Reservations
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl">
          When high-demand books are returned, students in the reservation queue are notified in priority order.
        </p>
      </div>

      {userReservations.length === 0 ? (
        <div className="text-center py-16 glass-panel rounded-3xl border border-slate-800">
          <Bookmark className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white">No active reservations</h3>
          <p className="text-xs text-slate-400 mt-1">When a book is out of stock, click Reserve to hold your place in line.</p>
          <Link to="/books" className="inline-block mt-4 px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 transition-colors">
            Browse Catalog
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {userReservations.map(r => (
            <div key={r.id} className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Queue Position: #{r.position}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{r.reservationId}</span>
                </div>
                <h3 className="text-lg font-bold text-white">{r.bookTitle}</h3>
                <p className="text-xs text-slate-400">
                  Reserved on: {new Date(r.reservationDate).toLocaleString()}
                </p>
              </div>

              <div className="text-left md:text-right space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Reservation Expiry</span>
                <span className="text-xs font-semibold text-slate-300">
                  {new Date(r.expiryDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
