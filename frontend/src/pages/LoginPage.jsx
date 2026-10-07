import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ShieldCheck, User, Lock, ArrowRight, Sparkles, QrCode } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, switchUserRole } = useAuthStore();

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('student@library.com');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('Computer Science');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(email, password);
    if (result.success) {
      if (result.user.role === 'STUDENT') navigate('/');
      else if (result.user.role === 'LIBRARIAN') navigate('/librarian');
      else if (result.user.role === 'ADMIN') navigate('/admin/settings');
    } else {
      setErrorMessage(result.message);
    }
  };

  const handleQuickLogin = (role) => {
    switchUserRole(role);
    if (role === 'STUDENT') navigate('/');
    else if (role === 'LIBRARIAN') navigate('/librarian');
    else if (role === 'ADMIN') navigate('/admin/settings');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full glass-panel p-8 rounded-3xl border border-slate-700 shadow-2xl space-y-6 relative overflow-hidden">
        
        {/* Glow Effects */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Header */}
        <div className="text-center space-y-2 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 p-0.5 mx-auto shadow-lg">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-indigo-400" />
            </div>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            {isRegisterMode ? "Create Student Account" : "Sign In to LibraPass"}
          </h2>
          <p className="text-xs text-slate-400">
            Digital Pass & Library Management Platform
          </p>
        </div>

        {/* Quick Demo Instant Buttons */}
        <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 relative z-10">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 text-center">
            ⚡ Quick Demo One-Click Sign In:
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('STUDENT')}
              className="py-2 px-1 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/30 text-[11px] font-bold text-center transition-colors"
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('LIBRARIAN')}
              className="py-2 px-1 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold text-center transition-colors"
            >
              Librarian
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('ADMIN')}
              className="py-2 px-1 rounded-xl bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 border border-purple-500/30 text-[11px] font-bold text-center transition-colors"
            >
              Admin
            </button>
          </div>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold text-center">
            {errorMessage}
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          {isRegisterMode && (
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Revanth Kumar"
                className="w-full px-4 py-3 rounded-2xl glass-input text-xs"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl glass-input text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl glass-input text-xs"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/30 transition-all"
          >
            <span>{isRegisterMode ? "Complete Registration" : "Sign In with Spring Security"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-400 border-t border-slate-800 pt-4 relative z-10">
          <button
            onClick={() => setIsRegisterMode(!isRegisterMode)}
            className="hover:text-indigo-400 transition-colors"
          >
            {isRegisterMode ? "Already have an account? Sign In" : "Don't have a Digital Pass yet? Register"}
          </button>
        </div>

      </div>
    </div>
  );
}
