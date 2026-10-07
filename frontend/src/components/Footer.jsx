import React from 'react';
import { BookOpen, ShieldCheck, QrCode, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-800 bg-slate-950 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">LIBRAPASS</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Next-Generation Digital Library Pass & Bookstore Management System. Empowered with instant QR verification & real-time automated loan workflows.
          </p>
          <div className="flex items-center space-x-2 text-[11px] text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 w-fit">
            <ShieldCheck className="w-4 h-4" />
            <span>Spring Security JWT Protected</span>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Student Hub</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/my-library-pass" className="hover:text-indigo-400 transition-colors">Digital Library Pass</Link></li>
            <li><Link to="/books" className="hover:text-indigo-400 transition-colors">Search & Discover Books</Link></li>
            <li><Link to="/my-issued-books" className="hover:text-indigo-400 transition-colors">Issued Books & Renewals</Link></li>
            <li><Link to="/my-reservations" className="hover:text-indigo-400 transition-colors">Book Reservations Queue</Link></li>
            <li><Link to="/my-fines" className="hover:text-indigo-400 transition-colors">Fine Payment Portal</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Librarian Portal</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/librarian/scan" className="hover:text-indigo-400 transition-colors">Smart QR Issue & Return</Link></li>
            <li><Link to="/librarian/books" className="hover:text-indigo-400 transition-colors">Manage Book Catalog</Link></li>
            <li><Link to="/librarian/copies" className="hover:text-indigo-400 transition-colors">Physical Copy Tracker</Link></li>
            <li><Link to="/admin/settings" className="hover:text-indigo-400 transition-colors">Library Fine & Policy Config</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Integrated Bookstore</h4>
          <p className="text-xs text-slate-400 mb-3">
            Purchase physical copies directly from campus publishers with Razorpay & Stripe integration.
          </p>
          <Link to="/store" className="inline-flex items-center space-x-2 text-xs font-semibold px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:from-amber-400 hover:to-orange-400 transition-all shadow-md shadow-amber-500/20">
            <Sparkles className="w-4 h-4" />
            <span>Visit Bookstore</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-800/80 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© 2026 Digital Library Management System. Built with Spring Boot, React, Vite & Tailwind CSS.</p>
        <div className="flex space-x-4">
          <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
          <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
          <span className="hover:text-slate-400 cursor-pointer">Support</span>
        </div>
      </div>
    </footer>
  );
}
