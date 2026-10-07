import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Scan, 
  CheckCircle, 
  AlertTriangle, 
  Bookmark, 
  Users, 
  Layers, 
  RefreshCw, 
  ArrowRight,
  TrendingUp,
  Plus
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useLibraryStore } from '../store/useLibraryStore';

export default function LibrarianDashboard() {
  const { books, copies, transactions, reservations, users } = useLibraryStore();

  const activeIssues = transactions.filter(t => t.status === 'ISSUED' || t.status === 'RENEWED');
  const overdueIssues = transactions.filter(t => t.status === 'OVERDUE');
  const availableCopies = copies.filter(c => c.status === 'AVAILABLE');
  const pendingReservations = reservations.filter(r => r.status === 'PENDING');

  const monthlyTrendData = [
    { month: 'May', issues: 45, returns: 40 },
    { month: 'Jun', issues: 62, returns: 58 },
    { month: 'Jul', issues: 85, returns: 72 },
    { month: 'Aug', issues: 95, returns: 88 },
    { month: 'Sep', issues: 110, returns: 94 },
    { month: 'Oct', issues: 125, returns: 105 },
  ];

  const categoryData = [
    { name: 'Computer Science', value: 12 },
    { name: 'Artificial Intelligence', value: 8 },
    { name: 'Software Eng.', value: 6 },
    { name: 'Data Systems', value: 9 },
  ];

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ec4899'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
            <Scan className="w-4 h-4" />
            <span>Librarian Management Station</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Library Operations Dashboard
          </h1>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/librarian/scan"
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs sm:text-sm flex items-center space-x-2 shadow-lg shadow-emerald-600/30 transition-all hover:scale-105"
          >
            <Scan className="w-4 h-4" />
            <span>Launch Smart QR Scanner</span>
          </Link>

          <Link
            to="/librarian/books"
            className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-700 transition-colors flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Book</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row (8 Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div className="glass-card p-5 rounded-3xl border border-slate-800">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Total Book Titles</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1">{books.length}</p>
        </div>

        <div className="glass-card p-5 rounded-3xl border border-slate-800">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Total Physical Copies</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-indigo-400 mt-1">{copies.length}</p>
        </div>

        <div className="glass-card p-5 rounded-3xl border border-slate-800">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Available Copies</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1">{availableCopies.length}</p>
        </div>

        <div className="glass-card p-5 rounded-3xl border border-slate-800">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Currently Issued</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-400 mt-1">{activeIssues.length}</p>
        </div>

        <div className="glass-card p-5 rounded-3xl border border-slate-800">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Overdue Loans</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-rose-400 mt-1">{overdueIssues.length}</p>
        </div>

        <div className="glass-card p-5 rounded-3xl border border-slate-800">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Pending Reservations</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-purple-400 mt-1">{pendingReservations.length}</p>
        </div>

        <div className="glass-card p-5 rounded-3xl border border-slate-800">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Active Students</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-teal-400 mt-1">{users.length}</p>
        </div>

        <div className="glass-card p-5 rounded-3xl border border-slate-800">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Today's Transactions</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1">14</p>
        </div>

      </div>

      {/* Recharts Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Bar Chart */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
              <span>Monthly Issue vs Return Analytics</span>
            </h3>
            <span className="text-xs text-slate-400">2026 Academic Term</span>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                <Bar dataKey="issues" fill="#6366f1" radius={[6, 6, 0, 0]} name="Books Issued" />
                <Bar dataKey="returns" fill="#10b981" radius={[6, 6, 0, 0]} name="Books Returned" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Pie Chart */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white">Category Circulation</h3>
          
          <div className="h-60 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 text-xs">
            {categoryData.map((cat, idx) => (
              <div key={cat.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }}></span>
                  <span className="text-slate-300 font-medium">{cat.name}</span>
                </div>
                <span className="text-white font-bold">{cat.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Quick Navigation Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <Link to="/librarian/books" className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-indigo-500/40 transition-all group">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">Book Catalog Manager</h4>
          <p className="text-xs text-slate-400 mt-1">Add, edit, or remove book titles, authors, categories, and cover images.</p>
        </Link>

        <Link to="/librarian/copies" className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-emerald-500/40 transition-all group">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Layers className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">Physical Copy Tracker</h4>
          <p className="text-xs text-slate-400 mt-1">View unique QR codes, update copy locations (shelf/row), and manage copy conditions.</p>
        </Link>

        <Link to="/admin/settings" className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-purple-500/40 transition-all group">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">System Settings</h4>
          <p className="text-xs text-slate-400 mt-1">Configure fine rate per day, max loan days, max renewals, and bookstore fees.</p>
        </Link>

      </div>

    </div>
  );
}
