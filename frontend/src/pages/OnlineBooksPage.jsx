import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BookMarked, 
  Search, 
  BookOpen, 
  Play, 
  Clock, 
  CheckCircle, 
  Sparkles, 
  ArrowRight,
  Bookmark
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useEbookStore } from '../store/useEbookStore';
import { useAuthStore } from '../store/useAuthStore';

export default function OnlineBooksPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { ebooks, getUserContinueReading } = useEbookStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = [
    'ALL',
    'Programming',
    'Engineering',
    'Science',
    'Technology',
    'Business',
    'Fiction',
    'Self Development',
    'History',
    'Computer Science'
  ];

  const continueReadingItems = getUserContinueReading(user?.id || 1);

  const filteredEbooks = ebooks.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          e.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || e.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-900 border border-purple-500/30 shadow-2xl">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center space-x-2 text-xs font-bold text-pink-400 uppercase tracking-wider">
            <BookMarked className="w-4 h-4" />
            <span>Digital E-Reader Portal</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            ONLINE LIBRARY
          </h1>
          <p className="text-purple-200 text-sm font-medium max-w-xl">
            Discover something worth reading. Read complete digital textbooks, programming manuals, and literature directly inside your browser.
          </p>
        </div>
      </div>

      {/* Search & Category Filter Pills */}
      <div className="space-y-4">
        <div className="relative max-w-xl">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search online books by title or author..."
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl glass-input text-sm"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${selectedCategory === cat ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-500/20' : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* CONTINUE READING SECTION */}
      {continueReadingItems.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-extrabold text-white tracking-tight">Continue Reading</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {continueReadingItems.map(item => (
              <motion.div
                key={item.id}
                whileHover={{ y: -4 }}
                className="glass-panel p-5 rounded-3xl border border-purple-500/30 bg-slate-900/80 shadow-xl flex items-center space-x-4"
              >
                <img
                  src={item.ebook.coverImage}
                  alt={item.ebook.title}
                  className="w-20 h-28 object-cover rounded-xl shadow-md shrink-0"
                />

                <div className="flex-1 space-y-2">
                  <div>
                    <h3 className="font-bold text-sm text-white line-clamp-1">{item.ebook.title}</h3>
                    <p className="text-xs text-slate-400">by {item.ebook.author}</p>
                  </div>

                  {/* Reading Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-semibold text-slate-300">
                      <span>Page {item.currentPage} of {item.ebook.totalPages}</span>
                      <span className="text-purple-400 font-extrabold">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/read-online/${item.ebook.id}`)}
                    className="w-full py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600 text-purple-200 hover:text-white font-bold text-xs flex items-center justify-center space-x-1.5 border border-purple-500/40 transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>CONTINUE READING</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* ALL ONLINE BOOKS CATALOG */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-extrabold text-white tracking-tight">All Online Books</h2>
          </div>
          <span className="text-xs text-slate-400">Showing {filteredEbooks.length} eBooks</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredEbooks.map(ebook => {
            const userProg = continueReadingItems.find(p => p.ebookId === ebook.id);

            return (
              <motion.div
                key={ebook.id}
                whileHover={{ y: -6 }}
                className="glass-card rounded-3xl overflow-hidden flex flex-col h-full border border-slate-800 bg-slate-900/60 hover:border-purple-500/40 shadow-xl group"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-slate-950">
                  <img src={ebook.coverImage} alt={ebook.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-600/90 text-white flex items-center space-x-1 shadow-md">
                    <span>📖 Available Online</span>
                  </div>

                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-950/80 text-purple-300 border border-purple-500/30">
                    {ebook.category}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-bold text-base text-white group-hover:text-purple-300 transition-colors line-clamp-2">{ebook.title}</h3>
                    <p className="text-xs text-slate-400 mt-1">by {ebook.author}</p>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{ebook.description}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Total Pages: <strong className="text-slate-200">{ebook.totalPages}</strong></span>
                      <span>{ebook.language}</span>
                    </div>

                    <button
                      onClick={() => navigate(`/read-online/${ebook.id}`)}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs flex items-center justify-center space-x-1.5 shadow-md transition-all"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>{userProg ? `CONTINUE (Page ${userProg.currentPage})` : 'READ ONLINE'}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
