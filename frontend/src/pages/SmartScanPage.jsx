import React, { useState } from 'react';
import { 
  Scan, 
  QrCode, 
  User, 
  BookOpen, 
  CheckCircle, 
  AlertTriangle, 
  RefreshCw, 
  Sparkles, 
  ArrowRight,
  RotateCcw,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useLibraryStore } from '../store/useLibraryStore';
import { useAuthStore } from '../store/useAuthStore';
import QrScannerModal from '../components/QrScannerModal';

export default function SmartScanPage() {
  const { analyzeDualScan, confirmIssue, confirmReturn, confirmRenew } = useLibraryStore();
  const { user: librarianUser } = useAuthStore();

  const [studentQr, setStudentQr] = useState('');
  const [copyQr, setCopyQr] = useState('');
  const [activeScanTarget, setActiveScanTarget] = useState(null); // 'student' or 'copy'
  const [scanResult, setScanResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [actionSuccess, setActionSuccess] = useState(null);

  const handleScanSuccess = (code) => {
    if (activeScanTarget === 'student') {
      setStudentQr(code);
    } else if (activeScanTarget === 'copy') {
      setCopyQr(code);
    }
  };

  const handleAnalyze = () => {
    if (!studentQr || !copyQr) return;
    const result = analyzeDualScan(studentQr, copyQr);
    setScanResult(result);
    setActionSuccess(null);
  };

  const handleReset = () => {
    setStudentQr('');
    setCopyQr('');
    setScanResult(null);
    setActionSuccess(null);
  };

  const handleExecuteAction = () => {
    if (!scanResult) return;
    setIsProcessing(true);

    setTimeout(() => {
      if (scanResult.actionType === 'ISSUE' || scanResult.actionType === 'RESERVATION_VERIFY') {
        confirmIssue(scanResult.student.id, scanResult.copy.id, librarianUser?.name);
        setActionSuccess(`Book "${scanResult.book.title}" successfully issued to ${scanResult.student.name}!`);
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      } else if (scanResult.actionType === 'RETURN') {
        confirmReturn(scanResult.existingTransaction.id, librarianUser?.name);
        setActionSuccess(`Book "${scanResult.book.title}" returned to inventory successfully.`);
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } else if (scanResult.actionType === 'RETURN_OR_RENEW' || scanResult.actionType === 'RENEW') {
        confirmRenew(scanResult.existingTransaction.id);
        setActionSuccess(`Loan for "${scanResult.book.title}" extended by 14 days!`);
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }

      setIsProcessing(false);
    }, 800);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
          <Scan className="w-4 h-4" />
          <span>Smart Dual QR Library System</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Librarian QR Verification Terminal
        </h1>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Scan Student Pass QR + Book Copy QR. The engine automatically detects whether to Issue, Return, Renew, or Verify Reservation.
        </p>
      </div>

      {/* 2-Step Scanner Input Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Step 1: Student QR */}
        <div className={`glass-panel p-6 rounded-3xl border transition-all ${studentQr ? 'border-indigo-500 bg-indigo-950/20' : 'border-slate-800'}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">
                1
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Student Digital Pass QR</h3>
            </div>
            {studentQr && <CheckCircle className="w-5 h-5 text-indigo-400" />}
          </div>

          <p className="text-xs text-slate-400 mb-4">
            Scan the QR code displayed on the student's phone screen or enter Student ID.
          </p>

          <div className="space-y-3">
            <div className="relative">
              <input
                type="text"
                value={studentQr}
                onChange={(e) => setStudentQr(e.target.value)}
                placeholder="e.g. USER-STU-2026-042"
                className="w-full px-4 py-3 rounded-2xl glass-input text-sm font-mono text-indigo-300"
              />
            </div>

            <button
              onClick={() => setActiveScanTarget('student')}
              className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-colors shadow-lg shadow-indigo-600/20"
            >
              <QrCode className="w-4 h-4" />
              <span>Scan Student QR Code</span>
            </button>
          </div>
        </div>

        {/* Step 2: Book Copy QR */}
        <div className={`glass-panel p-6 rounded-3xl border transition-all ${copyQr ? 'border-emerald-500 bg-emerald-950/20' : 'border-slate-800'}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                2
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Book Copy QR</h3>
            </div>
            {copyQr && <CheckCircle className="w-5 h-5 text-emerald-400" />}
          </div>

          <p className="text-xs text-slate-400 mb-4">
            Scan the physical QR code sticker pasted on the book copy cover.
          </p>

          <div className="space-y-3">
            <div className="relative">
              <input
                type="text"
                value={copyQr}
                onChange={(e) => setCopyQr(e.target.value)}
                placeholder="e.g. BOOK-COPY-LIB-CC-001"
                className="w-full px-4 py-3 rounded-2xl glass-input text-sm font-mono text-emerald-300"
              />
            </div>

            <button
              onClick={() => setActiveScanTarget('copy')}
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-colors shadow-lg shadow-emerald-600/20"
            >
              <QrCode className="w-4 h-4" />
              <span>Scan Book Copy QR</span>
            </button>
          </div>
        </div>

      </div>

      {/* Action Trigger Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={handleAnalyze}
          disabled={!studentQr || !copyQr}
          className={`px-8 py-4 rounded-2xl font-extrabold text-sm flex items-center space-x-2 transition-all shadow-xl ${!studentQr || !copyQr ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:scale-105 shadow-purple-500/25'}`}
        >
          <Sparkles className="w-5 h-5 text-amber-300" />
          <span>Analyze Transaction Engine</span>
        </button>

        {(studentQr || copyQr) && (
          <button
            onClick={handleReset}
            className="px-5 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center space-x-2 border border-slate-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Scanner</span>
          </button>
        )}
      </div>

      {/* Smart Scan Analysis Output Panel */}
      {scanResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-8 rounded-3xl border border-indigo-500/40 bg-slate-900/90 shadow-2xl space-y-6"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Smart Engine Decision</span>
              <h2 className="text-xl font-extrabold text-white flex items-center space-x-2 mt-0.5">
                <span>Operation:</span>
                <span className={`px-3 py-1 rounded-xl text-xs font-mono font-extrabold ${scanResult.eligible ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'}`}>
                  {scanResult.actionType}
                </span>
              </h2>
            </div>

            <p className="text-xs text-slate-300 font-medium max-w-sm text-right">
              {scanResult.message}
            </p>
          </div>

          {/* Student & Book Details Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Student Card */}
            {scanResult.student && (
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Student Profile</span>
                <div className="flex items-center space-x-3">
                  <img src={scanResult.student.avatarUrl} alt={scanResult.student.name} className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <h4 className="text-sm font-bold text-white">{scanResult.student.name}</h4>
                    <p className="text-xs text-slate-400">{scanResult.student.department}</p>
                    <p className="text-[11px] font-mono text-indigo-400">{scanResult.student.studentId}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Book Copy Card */}
            {scanResult.book && (
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Book Copy Record</span>
                <div className="flex items-center space-x-3">
                  <img src={scanResult.book.coverImage} alt={scanResult.book.title} className="w-10 h-14 object-cover rounded-lg" />
                  <div>
                    <h4 className="text-sm font-bold text-white line-clamp-1">{scanResult.book.title}</h4>
                    <p className="text-xs text-slate-400">Copy ID: <strong className="font-mono text-emerald-400">{scanResult.copy.copyId}</strong></p>
                    <p className="text-[11px] text-slate-400">Shelf: {scanResult.copy.location}</p>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Issue / Return Calculation Details */}
          {scanResult.eligible && (
            <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              {scanResult.calculatedIssueDate && (
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Issue Date</span>
                  <strong className="text-white text-sm">{scanResult.calculatedIssueDate}</strong>
                </div>
              )}
              {scanResult.calculatedDueDate && (
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Calculated Due Date</span>
                  <strong className="text-amber-400 text-sm">{scanResult.calculatedDueDate}</strong>
                </div>
              )}
              {scanResult.overdueDays !== undefined && (
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Overdue Days</span>
                  <strong className={scanResult.overdueDays > 0 ? "text-rose-400 text-sm" : "text-emerald-400 text-sm"}>
                    {scanResult.overdueDays} Days
                  </strong>
                </div>
              )}
              {scanResult.calculatedFine !== undefined && (
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Accumulated Fine</span>
                  <strong className={scanResult.calculatedFine > 0 ? "text-rose-400 text-sm" : "text-emerald-400 text-sm"}>
                    ₹{scanResult.calculatedFine.toFixed(2)}
                  </strong>
                </div>
              )}
            </div>
          )}

          {/* Final Action Button */}
          {scanResult.eligible && !actionSuccess && (
            <button
              onClick={handleExecuteAction}
              disabled={isProcessing}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm flex items-center justify-center space-x-2 shadow-xl shadow-emerald-600/30 transition-all hover:scale-[1.01]"
            >
              {isProcessing ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  <span>CONFIRM {scanResult.actionType} TRANSACTION</span>
                </>
              )}
            </button>
          )}

          {actionSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-center text-sm animate-in fade-in">
              <CheckCircle className="w-6 h-6 mx-auto mb-1 text-emerald-400" />
              <p>{actionSuccess}</p>
            </div>
          )}

        </motion.div>
      )}

      {/* QR Camera Scanner Modal */}
      <QrScannerModal
        isOpen={activeScanTarget !== null}
        onClose={() => setActiveScanTarget(null)}
        onScanSuccess={handleScanSuccess}
        title={activeScanTarget === 'student' ? "Scan Student Pass QR" : "Scan Book Copy QR"}
      />

    </div>
  );
}
