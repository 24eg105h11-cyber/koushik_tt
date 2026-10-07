import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Star, 
  BookOpen, 
  ShoppingCart, 
  Bookmark, 
  CheckCircle, 
  AlertTriangle, 
  QrCode, 
  Layers, 
  MapPin, 
  ShieldCheck,
  ArrowLeft,
  MessageSquare
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useLibraryStore } from '../store/useLibraryStore';
import { useAuthStore } from '../store/useAuthStore';
import { useCartStore } from '../store/useCartStore';

export default function BookDetails() {
  const { id } = useParams();
  const { books, copies, reservations, reserveBook } = useLibraryStore();
  const { user } = useAuthStore();
  const { addToCart } = useCartStore();

  const [selectedQrCopy, setSelectedQrCopy] = useState(null);
  const [reservedSuccess, setReservedSuccess] = useState(false);

  const book = books.find(b => b.id === Number(id)) || books[0];
  const bookCopies = copies.filter(c => c.bookId === book.id);
  const bookReservations = reservations.filter(r => r.bookId === book.id && r.status === 'PENDING');

  const handleReserve = () => {
    reserveBook(user?.id, book.id);
    setReservedSuccess(true);
    setTimeout(() => setReservedSuccess(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back Button */}
      <Link to="/books" className="inline-flex items-center space-x-2 text-xs font-bold text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Catalog</span>
      </Link>

      {/* Main Details Hero Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left 4 Cols: Cover Image & Quick Actions */}
        <div className="md:col-span-4 space-y-4">
          <div className="glass-panel p-4 rounded-3xl border border-slate-800 bg-slate-950/60 shadow-2xl">
            <img 
              src={book.coverImage} 
              alt={book.title} 
              className="w-full aspect-[3/4] object-cover rounded-2xl shadow-xl" 
            />
          </div>

          <div className="space-y-3">
            <button
              onClick={() => addToCart(book, 1)}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/20 transition-all"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Purchase Copy for ₹{book.price.toFixed(2)}</span>
            </button>

            {book.availableCopies === 0 ? (
              <button
                onClick={handleReserve}
                className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/30 transition-all"
              >
                <Bookmark className="w-5 h-5" />
                <span>Reserve Next Copy (Queue #{bookReservations.length + 1})</span>
              </button>
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold text-center">
                <CheckCircle className="w-5 h-5 mx-auto mb-1 text-emerald-400" />
                <span>Available for Immediate Library Issue!</span>
                <p className="text-[11px] text-slate-400 mt-1">Visit librarian counter with your Digital Pass.</p>
              </div>
            )}

            {reservedSuccess && (
              <div className="p-3 rounded-xl bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold text-center animate-in fade-in duration-300">
                Reservation placed successfully! Check queue status in My Reservations.
              </div>
            )}
          </div>
        </div>

        {/* Right 8 Cols: Book Specs & Information */}
        <div className="md:col-span-8 space-y-6">
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
                {book.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300">
                {book.language}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">{book.title}</h1>
            <p className="text-sm text-slate-300 font-medium">Author: <strong className="text-indigo-400">{book.author}</strong></p>

            <div className="flex items-center space-x-4 text-xs text-slate-400 py-2 border-y border-slate-800">
              <div className="flex items-center space-x-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{book.rating}</span>
                <span className="text-slate-400 font-normal">({book.reviewsCount} reviews)</span>
              </div>
              <span>Publisher: <strong className="text-slate-200">{book.publisher} ({book.publicationYear})</strong></span>
              <span>Pages: <strong className="text-slate-200">{book.pages}</strong></span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Book Overview</h3>
            <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/40 p-4 rounded-2xl border border-slate-800/80">
              {book.description}
            </p>
          </div>

          {/* Physical Copies Inventory Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                <span>Physical Copies & QR Verification</span>
              </h3>
              <span className="text-xs text-indigo-400 font-bold">
                {book.availableCopies} of {book.totalCopies} Available
              </span>
            </div>

            <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-3">Physical Copy ID</th>
                    <th className="p-3">Location</th>
                    <th className="p-3">Condition</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Copy QR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {bookCopies.map(copy => (
                    <tr key={copy.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3 font-mono font-bold text-indigo-300">{copy.copyId}</td>
                      <td className="p-3 flex items-center space-x-1 text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        <span>{copy.location}</span>
                      </td>
                      <td className="p-3">{copy.condition}</td>
                      <td className="p-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${copy.status === 'AVAILABLE' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'}`}>
                          {copy.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => setSelectedQrCopy(copy)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 font-mono text-[11px] inline-flex items-center space-x-1 border border-slate-700 transition-colors"
                        >
                          <QrCode className="w-3.5 h-3.5" />
                          <span>View QR</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* User Reviews Section */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
              <MessageSquare className="w-4 h-4 text-indigo-400" />
              <span>Student Reviews & Ratings</span>
            </h3>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Aditya R.</span>
                  <div className="flex text-amber-400"><Star className="w-3 h-3 fill-amber-400" /><Star className="w-3 h-3 fill-amber-400" /><Star className="w-3 h-3 fill-amber-400" /><Star className="w-3 h-3 fill-amber-400" /><Star className="w-3 h-3 fill-amber-400" /></div>
                </div>
                <p className="text-xs text-slate-300">"Must-read book for every computer science student. The physical copy in shelf CS-01 was in brand new condition!"</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Sneha P.</span>
                  <div className="flex text-amber-400"><Star className="w-3 h-3 fill-amber-400" /><Star className="w-3 h-3 fill-amber-400" /><Star className="w-3 h-3 fill-amber-400" /><Star className="w-3 h-3 fill-amber-400" /></div>
                </div>
                <p className="text-xs text-slate-300">"Scanned and borrowed in less than 5 seconds using the Digital Pass QR scanner!"</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Copy QR Code Modal */}
      {selectedQrCopy && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-3xl max-w-sm w-full text-center border border-indigo-500/40 shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-700">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Book Copy QR Identifier</h3>
              <button onClick={() => setSelectedQrCopy(null)} className="text-slate-400 hover:text-white font-bold">✕</button>
            </div>

            <div className="bg-white p-4 rounded-2xl flex justify-center shadow-xl">
              <QRCodeSVG value={selectedQrCopy.qrCode} size={180} level="H" />
            </div>

            <div>
              <p className="text-sm font-mono font-bold text-indigo-400">{selectedQrCopy.qrCode}</p>
              <p className="text-xs text-slate-400 mt-1">Location: {selectedQrCopy.location}</p>
            </div>

            <button 
              onClick={() => setSelectedQrCopy(null)}
              className="w-full py-2.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
