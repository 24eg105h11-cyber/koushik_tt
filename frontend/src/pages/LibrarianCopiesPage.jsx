import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Layers, QrCode, MapPin, CheckCircle, AlertTriangle, Search } from 'lucide-react';
import { useLibraryStore } from '../store/useLibraryStore';

export default function LibrarianCopiesPage() {
  const { copies, books } = useLibraryStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedQrCopy, setSelectedQrCopy] = useState(null);

  const filteredCopies = copies.filter(c => {
    const book = books.find(b => b.id === c.bookId);
    return c.copyId.toLowerCase().includes(searchQuery.toLowerCase()) ||
           c.qrCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
           (book && book.title.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
          <Layers className="w-4 h-4" />
          <span>Physical Copy Inventory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Physical Book Copy & QR Tracker
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl">
          Every physical copy has a unique QR code sticker, shelf location, and condition status.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter by Copy ID (e.g. LIB-CC-001) or Title..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl glass-input text-sm"
        />
      </div>

      {/* Copies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCopies.map(c => {
          const book = books.find(b => b.id === c.bookId);

          return (
            <div key={c.id} className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-4 hover:border-indigo-500/30 transition-all">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Copy ID</span>
                  <p className="text-base font-mono font-extrabold text-indigo-400">{c.copyId}</p>
                </div>

                <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${c.status === 'AVAILABLE' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'}`}>
                  {c.status}
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white line-clamp-1">{book ? book.title : "Book Title"}</h4>
                <p className="text-xs text-slate-400 flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>Location: <strong className="text-slate-300">{c.location}</strong></span>
                </p>
                <p className="text-xs text-slate-400">Condition: <strong className="text-slate-300">{c.condition}</strong></p>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500 truncate max-w-[150px]">{c.qrCode}</span>
                <button
                  onClick={() => setSelectedQrCopy(c)}
                  className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs flex items-center space-x-1 shadow transition-colors"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>View QR</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Copy QR Code Modal */}
      {selectedQrCopy && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-3xl max-w-sm w-full text-center border border-indigo-500/40 shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-700">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Copy QR Sticker</h3>
              <button onClick={() => setSelectedQrCopy(null)} className="text-slate-400 hover:text-white font-bold">✕</button>
            </div>

            <div className="bg-white p-4 rounded-2xl flex justify-center shadow-xl">
              <QRCodeSVG value={selectedQrCopy.qrCode} size={180} level="H" />
            </div>

            <div>
              <p className="text-sm font-mono font-bold text-indigo-400">{selectedQrCopy.qrCode}</p>
              <p className="text-xs text-slate-400 mt-1">Copy ID: {selectedQrCopy.copyId}</p>
            </div>

            <button 
              onClick={() => setSelectedQrCopy(null)}
              className="w-full py-2.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-colors"
            >
              Close QR View
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
