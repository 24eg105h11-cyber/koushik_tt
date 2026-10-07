import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Bookmark, 
  Sparkles,
  Type,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEbookStore } from '../store/useEbookStore';
import { useAuthStore } from '../store/useAuthStore';

export default function EBookReaderPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { ebooks, getProgress, updateProgress } = useEbookStore();

  const ebook = ebooks.find(e => e.id === Number(id)) || ebooks[0];

  const existingProgress = getProgress(user?.id || 1, ebook.id);

  const [currentPage, setCurrentPage] = useState(existingProgress ? existingProgress.currentPage : 1);
  const [theme, setTheme] = useState('dark'); // 'dark', 'sepia', 'light', 'oled'
  const [fontSize, setFontSize] = useState(16); // 14, 16, 18, 20
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [jumpInput, setJumpInput] = useState('');

  const chapters = ebook.chapters || [
    { id: 1, title: "Chapter 1: Foundations & Clean Philosophy", startPage: 1 },
    { id: 2, title: "Chapter 2: Meaningful Names & Identifiers", startPage: 24 },
    { id: 3, title: "Chapter 3: Writing Clean Functions", startPage: 52 },
    { id: 4, title: "Chapter 4: Comments, Formatting & Structure", startPage: 86 },
    { id: 5, title: "Chapter 5: Error Handling & System Boundaries", startPage: 140 }
  ];

  // Auto-determine current chapter
  const currentChapterObj = [...chapters].reverse().find(ch => currentPage >= ch.startPage) || chapters[0];

  useEffect(() => {
    // Persist progress to Zustand and backend API
    updateProgress(user?.id || 1, ebook.id, currentPage, currentChapterObj.title);
  }, [currentPage]);

  const totalPages = ebook.totalPages || 200;
  const progressPercent = Math.min(100, Math.round((currentPage / totalPages) * 100));

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleJumpSubmit = (e) => {
    e.preventDefault();
    const target = parseInt(jumpInput, 10);
    if (!isNaN(target) && target >= 1 && target <= totalPages) {
      setCurrentPage(target);
      setJumpInput('');
    }
  };

  // Theme styling helpers
  const getThemeStyles = () => {
    if (theme === 'sepia') return 'bg-[#f4ecd8] text-[#433422] border-[#e2d7be]';
    if (theme === 'light') return 'bg-white text-slate-900 border-slate-200';
    if (theme === 'oled') return 'bg-black text-slate-200 border-slate-900';
    return 'bg-slate-950 text-slate-200 border-slate-900'; // dark default
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${getThemeStyles()}`}>
      
      {/* Top Reader Navbar */}
      <header className={`sticky top-0 z-40 border-b px-4 py-3 backdrop-blur-md transition-colors ${theme === 'light' ? 'bg-white/90 border-slate-200' : theme === 'sepia' ? 'bg-[#f4ecd8]/90 border-[#e2d7be]' : 'bg-slate-900/90 border-slate-800'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => navigate('/online-books')}
              className="p-2 rounded-xl hover:bg-slate-800/40 transition-colors"
              title="Back to Online Bookshelf"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div>
              <h2 className="text-sm font-bold truncate max-w-xs sm:max-w-md">{ebook.title}</h2>
              <p className="text-[11px] opacity-70">{currentChapterObj.title}</p>
            </div>
          </div>

          {/* Center: Reading Progress Badge */}
          <div className="hidden md:flex items-center space-x-3 text-xs font-mono font-bold">
            <span>Page {currentPage} of {totalPages}</span>
            <div className="w-32 bg-slate-800/40 h-2 rounded-full overflow-hidden border border-slate-700/50">
              <div 
                className="bg-purple-500 h-full rounded-full transition-all duration-300" 
                style={{ width: `${progressPercent}%` }} 
              />
            </div>
            <span className="text-purple-400">{progressPercent}%</span>
          </div>

          {/* Right Reader Control Buttons */}
          <div className="flex items-center space-x-2">
            
            {/* Font Size Selector */}
            <button
              onClick={() => setFontSize(fontSize >= 20 ? 14 : fontSize + 2)}
              className="p-2 rounded-xl hover:bg-slate-800/40 transition-colors flex items-center space-x-1 text-xs font-bold"
              title="Adjust Font Size"
            >
              <Type className="w-4 h-4" />
              <span>{fontSize}px</span>
            </button>

            {/* Theme Selector Toggle */}
            <button
              onClick={() => {
                if (theme === 'dark') setTheme('sepia');
                else if (theme === 'sepia') setTheme('light');
                else if (theme === 'light') setTheme('oled');
                else setTheme('dark');
              }}
              className="p-2 rounded-xl hover:bg-slate-800/40 transition-colors text-xs font-semibold capitalize"
              title="Switch Theme (Dark/Sepia/Light/OLED)"
            >
              {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            {/* Chapter Drawer Toggle */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="p-2 rounded-xl hover:bg-slate-800/40 transition-colors"
              title="Table of Contents"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Reading Area */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-8 w-full space-y-6">
        
        {/* Saved Progress Notice Banner */}
        {existingProgress && currentPage === existingProgress.currentPage && (
          <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Resumed reading from saved bookmark (Page {currentPage})</span>
            </div>
            <span className="text-[10px] opacity-70">Saved: {new Date(existingProgress.lastReadAt).toLocaleTimeString()}</span>
          </div>
        )}

        {/* Chapter Header */}
        <div className="border-b pb-4 opacity-80">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400">
            {currentChapterObj.title}
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight mt-1">{ebook.title}</h1>
        </div>

        {/* Formatted Book Page Content Container */}
        <div 
          className="leading-relaxed space-y-6 font-serif tracking-normal"
          style={{ fontSize: `${fontSize}px` }}
        >
          <p className="first-letter:text-4xl first-letter:font-extrabold first-letter:mr-2 first-letter:float-left">
            Software development is a continuous discipline of clarity, craftsmanship, and structure. When writing code for complex systems, the primary audience is not the compiler—it is the team of engineers who will read, maintain, and evolve the codebase over the coming years.
          </p>

          <blockquote className="p-4 border-l-4 border-purple-500 italic bg-purple-500/5 rounded-r-2xl my-4 text-sm font-sans">
            "Any fool can write code that a computer can understand. Good programmers write code that humans can understand." — Martin Fowler
          </blockquote>

          <h3 className="font-sans font-bold text-lg text-purple-300 pt-2">Key Principles for Page {currentPage}:</h3>

          <ul className="list-disc pl-6 space-y-2 text-sm font-sans opacity-90">
            <li><strong>Use Intention-Revealing Names:</strong> Names of variables, functions, and classes should tell you why it exists, what it does, and how it is used.</li>
            <li><strong>Functions Should Do One Thing:</strong> Keep functions small, focused, and operating at a single level of abstraction.</li>
            <li><strong>Don't Repeat Yourself (DRY):</strong> Duplication is the root of all software maintenance evil.</li>
          </ul>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 font-mono text-xs text-indigo-300 my-4 overflow-x-auto">
            <span className="text-slate-500">// Example Refactoring Pattern (Page {currentPage})</span>
            <br />
            <span className="text-purple-400">public class</span> <span className="text-amber-300">BookLoanService</span> &#123;
            <br />
            &nbsp;&nbsp;<span className="text-purple-400">public boolean</span> <span className="text-indigo-400">isEligibleForIssue</span>(Student student, BookCopy copy) &#123;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">return</span> student.getActiveLoansCount() &lt; 5 &amp;&amp; !student.hasOverdueFines();
            <br />
            &nbsp;&nbsp;&#125;
            <br />
            &#125;
          </div>

          <p>
            As software architecture grows in scope, maintaining clean interfaces and predictable data pipelines ensures high velocity without sacrificing reliability or testability.
          </p>
        </div>

        {/* Page Footer Navigation */}
        <div className="pt-8 border-t flex items-center justify-between text-xs font-sans">
          
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-4 py-2.5 rounded-xl font-bold flex items-center space-x-1 transition-all ${currentPage === 1 ? 'opacity-40 cursor-not-allowed' : 'bg-purple-600/20 text-purple-300 border border-purple-500/30 hover:bg-purple-600 hover:text-white'}`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Page</span>
          </button>

          {/* Jump To Page Form */}
          <form onSubmit={handleJumpSubmit} className="flex items-center space-x-2">
            <span className="opacity-70">Page</span>
            <input
              type="text"
              value={jumpInput}
              onChange={(e) => setJumpInput(e.target.value)}
              placeholder={String(currentPage)}
              className="w-14 px-2 py-1 rounded-lg text-center bg-slate-800 text-white font-mono font-bold text-xs border border-slate-700"
            />
            <span className="opacity-70">of {totalPages}</span>
          </form>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-4 py-2.5 rounded-xl font-bold flex items-center space-x-1 transition-all ${currentPage === totalPages ? 'opacity-40 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/30'}`}
          >
            <span>Next Page</span>
            <ChevronRight className="w-4 h-4" />
          </button>

        </div>

      </main>

      {/* Table of Contents Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex justify-end"
          >
            <motion.div
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-80 h-full glass-panel p-6 border-l border-slate-800 shadow-2xl space-y-4 overflow-y-auto"
            >
              <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">Table of Contents</h3>
                <button onClick={() => setIsDrawerOpen(false)} className="text-slate-400 hover:text-white font-bold">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                {chapters.map(ch => (
                  <button
                    key={ch.id}
                    onClick={() => {
                      setCurrentPage(ch.startPage);
                      setIsDrawerOpen(false);
                    }}
                    className={`w-full text-left p-3 rounded-xl text-xs font-medium transition-colors ${currentPage >= ch.startPage ? 'bg-purple-600/20 text-purple-300 font-bold border border-purple-500/30' : 'text-slate-300 hover:bg-slate-800'}`}
                  >
                    <p className="line-clamp-2">{ch.title}</p>
                    <span className="text-[10px] opacity-70 font-mono">Starts on Page {ch.startPage}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
