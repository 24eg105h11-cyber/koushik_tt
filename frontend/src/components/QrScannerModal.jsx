import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Camera, QrCode, Sparkles, Check, X, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function QrScannerModal({ isOpen, onClose, onScanSuccess, title = "Scan QR Code" }) {
  const [manualCode, setManualCode] = useState('');
  const [activeTab, setActiveTab] = useState('preset'); // 'preset', 'camera', 'manual'

  useEffect(() => {
    let scanner;
    if (isOpen && activeTab === 'camera') {
      scanner = new Html5QrcodeScanner(
        "qr-reader-container",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        /* verbose= */ false
      );

      scanner.render(
        (decodedText) => {
          onScanSuccess(decodedText);
          scanner.clear();
          onClose();
        },
        (error) => {
          // ignore scan frame errors
        }
      );
    }

    return () => {
      if (scanner) {
        scanner.clear().catch(e => console.error(e));
      }
    };
  }, [isOpen, activeTab]);

  if (!isOpen) return null;

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualCode.trim()) {
      onScanSuccess(manualCode.trim());
      setManualCode('');
      onClose();
    }
  };

  const handleSelectPreset = (code) => {
    onScanSuccess(code);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="glass-panel max-w-lg w-full rounded-3xl p-6 border border-slate-700 shadow-2xl relative"
      >
        <div className="flex justify-between items-center pb-4 border-b border-slate-700">
          <div className="flex items-center space-x-2">
            <QrCode className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-xl bg-slate-900/80 p-1 border border-slate-800 my-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('preset')}
            className={`flex-1 py-2 rounded-lg flex items-center justify-center space-x-1.5 transition-all ${activeTab === 'preset' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant Demo Presets</span>
          </button>
          <button
            onClick={() => setActiveTab('camera')}
            className={`flex-1 py-2 rounded-lg flex items-center justify-center space-x-1.5 transition-all ${activeTab === 'camera' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Live Camera Scanner</span>
          </button>
          <button
            onClick={() => setActiveTab('manual')}
            className={`flex-1 py-2 rounded-lg flex items-center justify-center space-x-1.5 transition-all ${activeTab === 'manual' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Manual Input</span>
          </button>
        </div>

        {/* Tab 1: Instant Demo Presets */}
        {activeTab === 'preset' && (
          <div className="space-y-4 py-2">
            <p className="text-xs text-slate-400">
              Select one of the sample QR codes below to instantly test the QR library workflow without a camera:
            </p>

            <div className="space-y-2">
              <p className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">Student Digital Pass QR Codes:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={() => handleSelectPreset("USER-STU-2026-042")}
                  className="p-3 rounded-xl bg-slate-800/80 hover:bg-indigo-900/40 border border-slate-700 hover:border-indigo-500/50 text-left transition-all group"
                >
                  <p className="text-xs font-bold text-white group-hover:text-indigo-300">Revanth Kumar (Student)</p>
                  <p className="text-[10px] font-mono text-indigo-400">USER-STU-2026-042</p>
                </button>

                <button
                  onClick={() => handleSelectPreset("USER-STU-2026-108")}
                  className="p-3 rounded-xl bg-slate-800/80 hover:bg-indigo-900/40 border border-slate-700 hover:border-indigo-500/50 text-left transition-all group"
                >
                  <p className="text-xs font-bold text-white group-hover:text-indigo-300">Ananya Sharma (Student)</p>
                  <p className="text-[10px] font-mono text-indigo-400">USER-STU-2026-108</p>
                </button>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <p className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Book Copy QR Codes:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={() => handleSelectPreset("BOOK-COPY-LIB-CC-001")}
                  className="p-3 rounded-xl bg-slate-800/80 hover:bg-emerald-900/40 border border-slate-700 hover:border-emerald-500/50 text-left transition-all group"
                >
                  <p className="text-xs font-bold text-white group-hover:text-emerald-300">Clean Code (Copy #1)</p>
                  <p className="text-[10px] font-mono text-emerald-400">BOOK-COPY-LIB-CC-001</p>
                </button>

                <button
                  onClick={() => handleSelectPreset("BOOK-COPY-LIB-CC-002")}
                  className="p-3 rounded-xl bg-slate-800/80 hover:bg-emerald-900/40 border border-slate-700 hover:border-emerald-500/50 text-left transition-all group"
                >
                  <p className="text-xs font-bold text-white group-hover:text-emerald-300">Clean Code (Copy #2 Issued)</p>
                  <p className="text-[10px] font-mono text-emerald-400">BOOK-COPY-LIB-CC-002</p>
                </button>

                <button
                  onClick={() => handleSelectPreset("BOOK-COPY-LIB-DP-001")}
                  className="p-3 rounded-xl bg-slate-800/80 hover:bg-emerald-900/40 border border-slate-700 hover:border-emerald-500/50 text-left transition-all group"
                >
                  <p className="text-xs font-bold text-white group-hover:text-emerald-300">Design Patterns (Copy #1)</p>
                  <p className="text-[10px] font-mono text-emerald-400">BOOK-COPY-LIB-DP-001</p>
                </button>

                <button
                  onClick={() => handleSelectPreset("BOOK-COPY-LIB-DDIA-001")}
                  className="p-3 rounded-xl bg-slate-800/80 hover:bg-emerald-900/40 border border-slate-700 hover:border-emerald-500/50 text-left transition-all group"
                >
                  <p className="text-xs font-bold text-white group-hover:text-emerald-300">Data-Intensive (Copy #1)</p>
                  <p className="text-[10px] font-mono text-emerald-400">BOOK-COPY-LIB-DDIA-001</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Live Camera Scanner */}
        {activeTab === 'camera' && (
          <div className="py-4 flex flex-col items-center">
            <div id="qr-reader-container" className="w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 text-slate-300 min-h-[250px]" />
            <p className="text-xs text-slate-400 mt-3 text-center">
              Point your device camera at a printed or digital QR code.
            </p>
          </div>
        )}

        {/* Tab 3: Manual Code Entry */}
        {activeTab === 'manual' && (
          <form onSubmit={handleManualSubmit} className="py-4 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Enter QR Identifier or Code:
              </label>
              <input
                type="text"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                placeholder="e.g. USER-STU-2026-042 or BOOK-COPY-LIB-CC-001"
                className="w-full px-4 py-3 rounded-xl glass-input text-sm font-mono"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-500/20"
            >
              Process QR Code
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
