import React, { useState, useMemo } from 'react';
import { Search, Filter, ArrowUpDown, BookOpen, Sparkles } from 'lucide-react';
import { useLibraryStore } from '../store/useLibraryStore';
import { useAuthStore } from '../store/useAuthStore';
import BookCard from '../components/BookCard';

export default function BookCatalog() {
  const { books, reserveBook } = useLibraryStore();
  const { user } = useAuthStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [availabilityFilter, setAvailabilityFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('rating');

  const categories = useMemo(() => {
    const cats = new Set(books.map(b => b.category));
    return ['ALL', ...Array.from(cats)];
  }, [books]);

  const filteredBooks = useMemo(() => {
    return books
      .filter(b => {
        const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              b.isbn.includes(searchQuery);
        const matchesCategory = selectedCategory === 'ALL' || b.category === selectedCategory;
        const matchesAvailability = availabilityFilter === 'ALL' ||
                                    (availabilityFilter === 'AVAILABLE' && b.availableCopies > 0) ||
                                    (availabilityFilter === 'OUT_OF_STOCK' && b.availableCopies === 0);
        return matchesSearch && matchesCategory && matchesAvailability;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        return 0;
      });
  }, [books, searchQuery, selectedCategory, availabilityFilter, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>Library Discovery Catalog</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Explore Books & Digital Inventory
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl">
          Search physical library copies for issue/reservation or purchase digital/printed copies from the integrated bookstore.
        </p>
      </div>

      {/* Filter & Search Bar Panel */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Title, Author, or ISBN..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl glass-input text-sm"
            />
          </div>

          {/* Category Selector */}
          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl glass-input text-sm bg-slate-900 text-slate-200"
            >
              {categories.map(cat => (
                <option key={cat} value={cat} className="bg-slate-900 text-white">
                  Category: {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Selector */}
          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl glass-input text-sm bg-slate-900 text-slate-200"
            >
              <option value="rating" className="bg-slate-900 text-white">Sort by: Top Rated</option>
              <option value="title" className="bg-slate-900 text-white">Sort by: Title A-Z</option>
              <option value="price-low" className="bg-slate-900 text-white">Sort by: Price Low to High</option>
              <option value="price-high" className="bg-slate-900 text-white">Sort by: Price High to Low</option>
            </select>
          </div>

        </div>

        {/* Sub-filters Pill Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800">
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400 font-semibold">Availability:</span>
            <button
              onClick={() => setAvailabilityFilter('ALL')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${availabilityFilter === 'ALL' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
            >
              All Books
            </button>
            <button
              onClick={() => setAvailabilityFilter('AVAILABLE')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${availabilityFilter === 'AVAILABLE' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
            >
              Available Now
            </button>
            <button
              onClick={() => setAvailabilityFilter('OUT_OF_STOCK')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${availabilityFilter === 'OUT_OF_STOCK' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
            >
              Reserved Only
            </button>
          </div>

          <span className="text-xs text-slate-400 font-semibold">
            Showing <strong className="text-indigo-400">{filteredBooks.length}</strong> of {books.length} books
          </span>
        </div>
      </div>

      {/* Book Grid */}
      {filteredBooks.length === 0 ? (
        <div className="text-center py-16 glass-panel rounded-3xl border border-slate-800">
          <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white">No books match your criteria</h3>
          <p className="text-xs text-slate-400 mt-1">Try adjusting your search keywords or reset category filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map(book => (
            <BookCard 
              key={book.id} 
              book={book} 
              onReserve={(bId) => reserveBook(user?.id, bId)} 
            />
          ))}
        </div>
      )}

    </div>
  );
}
