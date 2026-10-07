import React from 'react';
import { Link } from 'react-router-dom';
import { Star, BookOpen, ShoppingCart, Bookmark, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '../store/useCartStore';

export default function BookCard({ book, onReserve }) {
  const { addToCart } = useCartStore();

  const isAvailable = book.availableCopies > 0;

  return (
    <motion.div 
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="glass-card rounded-3xl overflow-hidden flex flex-col h-full border border-slate-800/80 bg-slate-900/60 hover:border-indigo-500/40 shadow-xl group"
    >
      {/* Cover Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-slate-950">
        <img 
          src={book.coverImage} 
          alt={book.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        
        {/* Overlay Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 backdrop-blur-md text-indigo-300 border border-indigo-500/30">
            {book.category}
          </span>
        </div>

        <div className="absolute top-3 right-3">
          {isAvailable ? (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/90 text-slate-950 flex items-center space-x-1 shadow-md">
              <CheckCircle className="w-3 h-3" />
              <span>{book.availableCopies} Available</span>
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/90 text-slate-950 flex items-center space-x-1 shadow-md">
              <AlertCircle className="w-3 h-3" />
              <span>Reserved Only</span>
            </span>
          )}
        </div>

        {/* Rating pill */}
        <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-700/80 flex items-center space-x-1 text-xs text-amber-400 font-bold">
          <Star className="w-3.5 h-3.5 fill-amber-400" />
          <span>{book.rating}</span>
          <span className="text-[10px] text-slate-400 font-normal">({book.reviewsCount})</span>
        </div>
      </div>

      {/* Book Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="font-bold text-base text-white group-hover:text-indigo-300 transition-colors line-clamp-2 leading-snug">
            <Link to={`/book/${book.id}`}>{book.title}</Link>
          </h3>
          <p className="text-xs text-slate-400 mt-1 line-clamp-1">by <span className="text-slate-300 font-medium">{book.author}</span></p>
          <p className="text-[11px] text-slate-500 mt-1 font-mono">ISBN: {book.isbn}</p>
        </div>

        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Purchase Price</span>
            <span className="text-base font-extrabold text-amber-400">₹{book.price.toFixed(2)}</span>
          </div>

          <div className="flex items-center space-x-2">
            {!isAvailable && onReserve && (
              <button
                onClick={() => onReserve(book.id)}
                className="p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 transition-colors"
                title="Reserve this book"
              >
                <Bookmark className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => addToCart(book, 1)}
              className="p-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/40 transition-colors"
              title="Add to Bookstore Cart"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>

            <Link
              to={`/book/${book.id}`}
              className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors flex items-center justify-center shadow-md shadow-indigo-600/30"
              title="View Details"
            >
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
