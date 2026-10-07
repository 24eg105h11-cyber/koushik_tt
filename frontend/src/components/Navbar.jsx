import React, { useState } from 'react';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import { 
  BookOpen, 
  QrCode, 
  ShoppingCart, 
  Bell, 
  User, 
  LogOut, 
  Shield, 
  Scan, 
  Bookmark, 
  DollarSign, 
  Layers, 
  Sparkles,
  Menu,
  X,
  ChevronDown,
  BookMarked
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useLibraryStore } from '../store/useLibraryStore';
import { useCartStore } from '../store/useCartStore';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, switchUserRole } = useAuthStore();
  const { notifications } = useLibraryStore();
  const { cart } = useCartStore();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const unreadCount = notifications.filter(n => n.userId === user?.id && !n.readStatus).length;
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleRoleSwitch = (role) => {
    switchUserRole(role);
    setIsRoleDropdownOpen(false);
    if (role === 'STUDENT') navigate('/');
    else if (role === 'LIBRARIAN') navigate('/librarian');
    else if (role === 'ADMIN') navigate('/admin/settings');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <RouterLink to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-indigo-400 group-hover:rotate-6 transition-transform" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent tracking-tight">
                LIBRA<span className="text-indigo-400 font-extrabold">PASS</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Digital QR Platform
              </span>
            </div>
          </RouterLink>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            <RouterLink 
              to="/" 
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/') ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'}`}
            >
              Dashboard
            </RouterLink>

            <RouterLink 
              to="/books" 
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/books') ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'}`}
            >
              Books
            </RouterLink>

            {user?.role === 'STUDENT' && (
              <>
                <RouterLink 
                  to="/my-issued-books" 
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/my-issued-books') ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'}`}
                >
                  My Books
                </RouterLink>

                <RouterLink 
                  to="/online-books" 
                  className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center space-x-1.5 transition-all ${isActive('/online-books') ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-500/20' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'}`}
                >
                  <BookMarked className="w-4 h-4 text-pink-400" />
                  <span>Online Books</span>
                </RouterLink>

                <RouterLink 
                  to="/my-library-pass" 
                  className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center space-x-1.5 transition-all ${isActive('/my-library-pass') ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'}`}
                >
                  <QrCode className="w-4 h-4 text-indigo-400" />
                  <span>Digital Pass</span>
                </RouterLink>

                <RouterLink 
                  to="/my-reservations" 
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/my-reservations') ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'}`}
                >
                  Reservations
                </RouterLink>
              </>
            )}

            {(user?.role === 'LIBRARIAN' || user?.role === 'ADMIN') && (
              <>
                <RouterLink 
                  to="/librarian" 
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/librarian') ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'}`}
                >
                  Librarian Dashboard
                </RouterLink>
                <RouterLink 
                  to="/librarian/scan" 
                  className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center space-x-1.5 transition-all ${isActive('/librarian/scan') ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/20' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'}`}
                >
                  <Scan className="w-4 h-4 text-emerald-400" />
                  <span>Smart QR Scanner</span>
                </RouterLink>
                <RouterLink 
                  to="/online-books" 
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/online-books') ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'}`}
                >
                  Online Books
                </RouterLink>
              </>
            )}

            {user?.role === 'ADMIN' && (
              <RouterLink 
                to="/admin/settings" 
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/admin/settings') ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'}`}
              >
                Settings
              </RouterLink>
            )}

            <RouterLink 
              to="/store" 
              className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center space-x-1 transition-colors ${isActive('/store') ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'}`}
            >
              <ShoppingCart className="w-4 h-4 text-amber-400" />
              <span>Store</span>
            </RouterLink>
          </nav>

          {/* Right Action Icons & User Menu */}
          <div className="flex items-center space-x-3">

            {/* Bookstore Cart */}
            <RouterLink to="/store/cart" className="relative p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors">
              <ShoppingCart className="w-5 h-5 text-amber-400" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-slate-950 font-bold text-xs rounded-full flex items-center justify-center animate-bounce">
                  {cartItemCount}
                </span>
              )}
            </RouterLink>

            {/* Notifications */}
            <RouterLink to="/notifications" className="relative p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors">
              <Bell className="w-5 h-5 text-indigo-400" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
              )}
            </RouterLink>

            {/* Quick Demo Role Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-200 hover:bg-slate-700/80 transition-all cursor-pointer"
              >
                <img 
                  src={user?.avatarUrl} 
                  alt={user?.name} 
                  className="w-7 h-7 rounded-full object-cover ring-2 ring-indigo-500/50" 
                />
                <div className="text-left hidden lg:block">
                  <p className="text-xs font-semibold text-white leading-none">{user?.name}</p>
                  <p className="text-[10px] text-indigo-400 font-medium leading-tight mt-0.5">
                    {user?.role.replace('ROLE_', '')}
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {isRoleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 glass-panel rounded-2xl shadow-2xl p-2 border border-slate-700/80 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-3 py-2 border-b border-slate-700/60">
                    <p className="text-xs text-slate-400">Signed in as</p>
                    <p className="text-sm font-bold text-white truncate">{user?.name}</p>
                    <p className="text-xs text-indigo-400">{user?.email}</p>
                  </div>

                  <div className="py-2">
                    <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Quick Demo Switch Role:
                    </p>
                    <button
                      onClick={() => handleRoleSwitch('STUDENT')}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${user?.role === 'STUDENT' ? 'bg-indigo-600/30 text-indigo-300 font-semibold' : 'text-slate-300 hover:bg-slate-800'}`}
                    >
                      <span>Student (Revanth)</span>
                      {user?.role === 'STUDENT' && <span className="w-2 h-2 rounded-full bg-indigo-400"></span>}
                    </button>
                    <button
                      onClick={() => handleRoleSwitch('LIBRARIAN')}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${user?.role === 'LIBRARIAN' ? 'bg-emerald-600/30 text-emerald-300 font-semibold' : 'text-slate-300 hover:bg-slate-800'}`}
                    >
                      <span>Librarian (Sarah)</span>
                      {user?.role === 'LIBRARIAN' && <span className="w-2 h-2 rounded-full bg-emerald-400"></span>}
                    </button>
                    <button
                      onClick={() => handleRoleSwitch('ADMIN')}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${user?.role === 'ADMIN' ? 'bg-purple-600/30 text-purple-300 font-semibold' : 'text-slate-300 hover:bg-slate-800'}`}
                    >
                      <span>Admin (Dr. Vance)</span>
                      {user?.role === 'ADMIN' && <span className="w-2 h-2 rounded-full bg-purple-400"></span>}
                    </button>
                  </div>

                  <div className="pt-1 border-t border-slate-700/60">
                    <button
                      onClick={() => {
                        logout();
                        navigate('/login');
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 flex items-center space-x-2 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}
