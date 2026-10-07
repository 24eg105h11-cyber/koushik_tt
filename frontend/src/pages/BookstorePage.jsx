import React, { useState } from 'react';
import { ShoppingCart, Sparkles, Search, Star, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLibraryStore } from '../store/useLibraryStore';
import { useCartStore } from '../store/useCartStore';

export default function BookstorePage() {
  const { books } = useLibraryStore();
  const { addToCart, cart } = useCartStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = ['ALL', 'Computer Science', 'Artificial Intelligence', 'Software Engineering'];

  const filteredBooks = books.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || b.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || b.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Store Banner */}
      <div className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-r from-amber-950 via-orange-950 to-slate-900 border border-amber-500/30 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Campus Digital Bookstore</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Buy Physical & Digital Books
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-xl">
              Order your personal permanent copies directly from university publishing partners. Free campus delivery for all enrolled students.
            </p>
          </div>

          <Link
            to="/store/cart"
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-sm flex items-center space-x-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>View Shopping Cart ({cartItemCount})</span>
          </Link>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search bookstore titles..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl glass-input text-sm"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedCategory === cat ? 'bg-amber-500 text-slate-950 shadow' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBooks.map(book => (
          <div key={book.id} className="glass-card rounded-3xl overflow-hidden flex flex-col h-full border border-slate-800 bg-slate-900/60 hover:border-amber-500/40 shadow-xl group">
            <div className="relative aspect-[3/4] overflow-hidden bg-slate-950">
              <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950">
                In Stock
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-bold text-base text-white group-hover:text-amber-300 transition-colors line-clamp-2">{book.title}</h3>
                <p className="text-xs text-slate-400 mt-1">by {book.author}</p>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Price</span>
                  <span className="text-base font-extrabold text-amber-400">₹{book.price.toFixed(2)}</span>
                </div>

                <button
                  onClick={() => addToCart(book, 1)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs flex items-center space-x-1 hover:from-amber-400 hover:to-orange-400 transition-all shadow"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
