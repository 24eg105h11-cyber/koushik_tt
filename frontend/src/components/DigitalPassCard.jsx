import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ShieldCheck, Maximize2, Sparkles, BookOpen, AlertTriangle, CheckCircle, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DigitalPassCard({ user, issuedCount = 1, fineAmount = 0.0 }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyQr = () => {
    navigator.clipboard.writeText(user?.qrCode || "USER-STU-2026-042");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Holographic Digital Pass Card */}
      <motion.div 
        whileHover={{ scale: 1.02, rotateY: 2, rotateX: -2 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 shadow-2xl shadow-indigo-950/80 group"
      >
        {/* Decorative Background Glow & Grid */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl group-hover:bg-indigo-500/30 transition-all pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl group-hover:bg-purple-500/30 transition-all pointer-events-none" />
        
        {/* Holographic lines overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-indigo-500/20 pb-4 mb-6 relative z-10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 p-0.5 shadow-md">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <h3 className="text-xs uppercase font-extrabold tracking-widest text-indigo-300">Central University Library</h3>
              <p className="text-sm font-bold text-white tracking-tight">DIGITAL STUDENT PASS</p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>ACTIVE PASS</span>
          </div>
        </div>

        {/* Card Body */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center relative z-10">
          
          {/* User Info & Photo */}
          <div className="sm:col-span-2 flex items-center space-x-5">
            <div className="relative">
              <img 
                src={user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"} 
                alt={user?.name} 
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-indigo-500/30 shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-1 rounded-lg text-[10px] font-bold shadow">
                VERIFIED
              </div>
            </div>

            <div className="space-y-1">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">{user?.name || "Revanth Kumar"}</h2>
              <p className="text-xs text-indigo-300 font-medium">{user?.department || "Computer Science & Engineering"}</p>
              <div className="inline-block mt-1 px-2.5 py-1 rounded-lg bg-slate-800/90 border border-slate-700 text-[11px] font-mono text-slate-300">
                ID: <span className="text-indigo-400 font-bold">{user?.studentId || "STU-2026-042"}</span>
              </div>

              {/* Status Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Issued Books: {issuedCount}
                </span>
                {fineAmount > 0 ? (
                  <span className="inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Fine: ₹{fineAmount}
                  </span>
                ) : (
                  <span className="inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    No Fines
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Personal QR Code Container */}
          <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/90 shadow-xl text-slate-900 border-2 border-indigo-400/40 relative">
            <div className="p-2 bg-white rounded-xl">
              <QRCodeSVG 
                value={user?.qrCode || "USER-STU-2026-042"} 
                size={110} 
                level="H" 
                includeMargin={false}
              />
            </div>
            
            <p className="text-[10px] font-mono font-bold text-slate-800 mt-1 tracking-wider">
              {user?.qrCode || "USER-STU-2026-042"}
            </p>

            <div className="flex items-center space-x-2 mt-2 w-full">
              <button 
                onClick={handleCopyQr}
                className="flex-1 text-[10px] font-semibold py-1 px-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 flex items-center justify-center space-x-1 transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? "Copied" : "Copy QR"}</span>
              </button>

              <button 
                onClick={() => setIsZoomed(true)}
                className="p-1 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
                title="Zoom QR Code for Librarian Scan"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Card Footer */}
        <div className="mt-6 pt-4 border-t border-indigo-500/20 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 relative z-10">
          <span>Valid Through: <strong className="text-white">MAY 2027</strong></span>
          <span className="flex items-center space-x-1 text-indigo-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Present at Librarian QR Scanner to Borrow / Return</span>
          </span>
        </div>
      </motion.div>

      {/* QR Code Full-Screen Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel p-8 rounded-3xl max-w-sm w-full text-center border border-indigo-500/40 shadow-2xl space-y-4"
            >
              <div className="flex justify-between items-center pb-2 border-b border-slate-700">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Librarian Pass QR</h3>
                <button onClick={() => setIsZoomed(false)} className="text-slate-400 hover:text-white font-bold text-lg">✕</button>
              </div>

              <div className="bg-white p-6 rounded-2xl flex justify-center shadow-2xl">
                <QRCodeSVG 
                  value={user?.qrCode || "USER-STU-2026-042"} 
                  size={220} 
                  level="H" 
                />
              </div>

              <div>
                <p className="text-lg font-mono font-bold text-indigo-400 tracking-wider">
                  {user?.qrCode || "USER-STU-2026-042"}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Hold this screen up to the Librarian QR Scanner to initiate book transactions.
                </p>
              </div>

              <button 
                onClick={() => setIsZoomed(false)} 
                className="w-full py-2.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-colors"
              >
                Close QR Screen
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
