import React, { useState } from 'react';
import { BookOpen, Plus, Search, Edit2, Trash2, Layers, CheckCircle } from 'lucide-react';
import { useLibraryStore } from '../store/useLibraryStore';

export default function LibrarianBooksPage() {
  const { books, addBook } = useLibraryStore();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    isbn: '',
    author: '',
    category: 'Computer Science',
    description: '',
    publisher: 'Prentice Hall',
    publicationYear: 2026,
    language: 'English',
    pages: 400,
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    price: 1200.00,
    totalCopies: 3,
    location: 'Shelf CS-04'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addBook(formData);
    setIsAddModalOpen(false);
    setFormData({
      title: '',
      isbn: '',
      author: '',
      category: 'Computer Science',
      description: '',
      publisher: 'Prentice Hall',
      publicationYear: 2026,
      language: 'English',
      pages: 400,
      coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
      price: 1200.00,
      totalCopies: 3,
      location: 'Shelf CS-04'
    });
  };

  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.isbn.includes(searchQuery)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Catalog Administration</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Book Inventory Management
          </h1>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs sm:text-sm flex items-center space-x-2 shadow-lg shadow-indigo-600/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Book to Catalog</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter by title, author, or ISBN..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl glass-input text-sm"
        />
      </div>

      {/* Books Table */}
      <div className="glass-panel rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
            <tr>
              <th className="p-4">Book Title</th>
              <th className="p-4">ISBN</th>
              <th className="p-4">Category</th>
              <th className="p-4">Copies</th>
              <th className="p-4">Store Price</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {filteredBooks.map(b => (
              <tr key={b.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="p-4 flex items-center space-x-3">
                  <img src={b.coverImage} alt={b.title} className="w-9 h-12 object-cover rounded-lg" />
                  <div>
                    <h4 className="font-bold text-white text-sm line-clamp-1">{b.title}</h4>
                    <p className="text-xs text-slate-400">by {b.author}</p>
                  </div>
                </td>
                <td className="p-4 font-mono font-semibold text-slate-300">{b.isbn}</td>
                <td className="p-4">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    {b.category}
                  </span>
                </td>
                <td className="p-4 font-bold text-white">
                  <span className="text-emerald-400">{b.availableCopies}</span> / {b.totalCopies}
                </td>
                <td className="p-4 font-extrabold text-amber-400">₹{b.price.toFixed(2)}</td>
                <td className="p-4 text-right space-x-2">
                  <button className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Book Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-3xl max-w-2xl w-full border border-slate-700 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-slate-700">
              <h3 className="text-base font-bold text-white">Add New Book & Physical Copies</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white font-bold">✕</button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Title *</label>
                  <input required type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full px-3 py-2 rounded-xl glass-input text-xs" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">ISBN *</label>
                  <input required type="text" name="isbn" value={formData.isbn} onChange={handleInputChange} className="w-full px-3 py-2 rounded-xl glass-input text-xs font-mono" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Author *</label>
                  <input required type="text" name="author" value={formData.author} onChange={handleInputChange} className="w-full px-3 py-2 rounded-xl glass-input text-xs" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Category *</label>
                  <input required type="text" name="category" value={formData.category} onChange={handleInputChange} className="w-full px-3 py-2 rounded-xl glass-input text-xs" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Store Sale Price (₹)</label>
                  <input required type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full px-3 py-2 rounded-xl glass-input text-xs" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Total Physical Copies</label>
                  <input required type="number" name="totalCopies" value={formData.totalCopies} onChange={handleInputChange} className="w-full px-3 py-2 rounded-xl glass-input text-xs" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Description</label>
                <textarea rows="3" name="description" value={formData.description} onChange={handleInputChange} className="w-full px-3 py-2 rounded-xl glass-input text-xs"></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Cover Image URL</label>
                <input type="text" name="coverImage" value={formData.coverImage} onChange={handleInputChange} className="w-full px-3 py-2 rounded-xl glass-input text-xs font-mono" />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-lg transition-all"
              >
                Add Book & Generate Copy QR Codes
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
