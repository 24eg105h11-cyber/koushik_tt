import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Clock, 
  AlertTriangle, 
  DollarSign, 
  Bookmark, 
  Bell, 
  QrCode, 
  ArrowRight, 
  CheckCircle, 
  TrendingUp, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/useAuthStore';
import { useLibraryStore } from '../store/useLibraryStore';
import DigitalPassCard from '../components/DigitalPassCard';
import BookCard from '../components/BookCard';

export default function StudentDashboard() {
  const { user } = useAuthStore();
  const { books, transactions, reservations, notifications, reserveBook } = useLibraryStore();

  const userTransactions = transactions.filter(t => t.userId === user?.id);
  const activeIssues = userTransactions.filter(t => t.status === 'ISSUED' || t.status === 'RENEWED');
  const overdueIssues = userTransactions.filter(t => t.status === 'OVERDUE');
  const userReservations = reservations.filter(r => r.userId === user?.id && r.status === 'PENDING');
  const userNotifications = notifications.filter(n => n.userId === user?.id);

  // Calculate total fine
  const totalFine = userTransactions.reduce((sum, t) => sum + (t.fineAmount || 0), 0) + (user?.totalFines || 0);

  const recommendedBooks = books.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 border border-indigo-500/30 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-indigo-300 uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Student Portal Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Welcome back, <span className="bg-gradient-to-r from-indigo-300 to-pink-300 bg-clip-text text-transparent">{user?.name}</span>!
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-xl">
              Access your digital library pass, track issued books, manage due dates, and explore physical copies or bookstore purchases.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/my-library-pass"
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm flex items-center space-x-2 shadow-lg shadow-indigo-500/30 transition-all hover:scale-105"
            >
              <QrCode className="w-4 h-4" />
              <span>Open Digital Pass</span>
            </Link>

            <Link
              to="/books"
              className="px-5 py-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm border border-slate-700 transition-all"
            >
              Browse Library
            </Link>
          </div>
        </div>
      </div>

      {/* Grid: Stats Cards & Digital Pass Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left 2 Cols: Dashboard Stats Cards */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Stat 1: Total Issued */}
            <motion.div whileHover={{ y: -4 }} className="glass-card p-5 rounded-2xl border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3">
                <BookOpen className="w-5 h-5" />
              </div>
              <p className="text-2xl font-extrabold text-white">{activeIssues.length}</p>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Active Issued Books</p>
            </motion.div>

            {/* Stat 2: Overdue */}
            <motion.div whileHover={{ y: -4 }} className="glass-card p-5 rounded-2xl border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-3">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <p className="text-2xl font-extrabold text-rose-400">{overdueIssues.length}</p>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Overdue Books</p>
            </motion.div>

            {/* Stat 3: Reservations */}
            <motion.div whileHover={{ y: -4 }} className="glass-card p-5 rounded-2xl border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
                <Bookmark className="w-5 h-5" />
              </div>
              <p className="text-2xl font-extrabold text-white">{userReservations.length}</p>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Active Reservations</p>
            </motion.div>

            {/* Stat 4: Pending Fines */}
            <motion.div whileHover={{ y: -4 }} className="glass-card p-5 rounded-2xl border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
                <DollarSign className="w-5 h-5" />
              </div>
              <p className="text-2xl font-extrabold text-emerald-400">₹{totalFine.toFixed(0)}</p>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Pending Fines</p>
            </motion.div>
          </div>

          {/* Active Issued Books Section */}
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white">Currently Issued Books</h3>
              </div>
              <Link to="/my-issued-books" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center space-x-1">
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {activeIssues.length === 0 ? (
              <div className="text-center py-8 text-slate-400 bg-slate-900/50 rounded-2xl border border-slate-800">
                <BookOpen className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="text-sm font-semibold">No books currently issued</p>
                <p className="text-xs text-slate-500 mt-1">Visit the librarian counter with your Digital Pass to borrow books.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {activeIssues.map(t => (
                  <div key={t.id} className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">{t.bookTitle}</h4>
                      <div className="flex items-center space-x-3 text-xs text-slate-400 mt-1">
                        <span>Copy: <strong className="text-indigo-400 font-mono">{t.copyCode}</strong></span>
                        <span>Issued: {t.issueDate}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Due Date</span>
                      <span className="text-xs font-extrabold text-amber-400 px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30">
                        {t.dueDate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Notifications Feed */}
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white">Recent Alerts & Notifications</h3>
              </div>
              <Link to="/notifications" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300">
                Notification Center
              </Link>
            </div>

            <div className="space-y-3">
              {userNotifications.slice(0, 3).map(n => (
                <div key={n.id} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start space-x-3">
                  <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 mt-0.5">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-xs font-bold text-white">{n.title}</h5>
                    <p className="text-xs text-slate-400 mt-0.5">{n.message}</p>
                    <span className="text-[10px] text-slate-500 mt-1 block">
                      {new Date(n.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right 1 Col: Digital Pass Preview */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Your Digital Pass</h3>
            <span className="text-xs text-emerald-400 font-semibold flex items-center space-x-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified</span>
            </span>
          </div>

          <DigitalPassCard 
            user={user} 
            issuedCount={activeIssues.length} 
            fineAmount={totalFine} 
          />

          {/* Quick Info Box */}
          <div className="p-5 rounded-3xl glass-panel border border-indigo-500/20 bg-indigo-950/20 text-xs text-slate-300 space-y-2">
            <h4 className="font-bold text-indigo-300 flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>How Library Issue Works</span>
            </h4>
            <p className="leading-relaxed text-slate-400">
              1. Show your Digital Pass QR code to the Librarian.<br/>
              2. The librarian scans your student QR, then scans the Book Copy QR.<br/>
              3. The system automatically verifies loan limits & calculates due dates.
            </p>
          </div>
        </div>

      </div>

      {/* Recommended Books Carousel/Grid */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-white tracking-tight">Explore Top Books</h2>
          <Link to="/books" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center space-x-1">
            <span>View All Books</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {recommendedBooks.map(book => (
            <BookCard 
              key={book.id} 
              book={book} 
              onReserve={(bId) => reserveBook(user?.id, bId)} 
            />
          ))}
        </div>
      </div>

    </div>
  );
}
