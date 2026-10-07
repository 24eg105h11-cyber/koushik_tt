import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import StudentDashboard from './pages/StudentDashboard';
import BookCatalog from './pages/BookCatalog';
import BookDetails from './pages/BookDetails';
import DigitalPassPage from './pages/DigitalPassPage';
import IssuedBooksPage from './pages/IssuedBooksPage';
import ReservationsPage from './pages/ReservationsPage';
import FinesPage from './pages/FinesPage';
import NotificationsPage from './pages/NotificationsPage';

import OnlineBooksPage from './pages/OnlineBooksPage';
import EBookReaderPage from './pages/EBookReaderPage';

import LibrarianDashboard from './pages/LibrarianDashboard';
import SmartScanPage from './pages/SmartScanPage';
import LibrarianBooksPage from './pages/LibrarianBooksPage';
import LibrarianCopiesPage from './pages/LibrarianCopiesPage';

import BookstorePage from './pages/BookstorePage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderHistoryPage from './pages/OrderHistoryPage';

import AdminSettingsPage from './pages/AdminSettingsPage';
import LoginPage from './pages/LoginPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
        <Navbar />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<StudentDashboard />} />
            <Route path="/books" element={<BookCatalog />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="/my-library-pass" element={<DigitalPassPage />} />
            <Route path="/my-issued-books" element={<IssuedBooksPage />} />
            <Route path="/my-reservations" element={<ReservationsPage />} />
            <Route path="/my-fines" element={<FinesPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />

            <Route path="/online-books" element={<OnlineBooksPage />} />
            <Route path="/read-online/:id" element={<EBookReaderPage />} />

            <Route path="/librarian" element={<LibrarianDashboard />} />
            <Route path="/librarian/scan" element={<SmartScanPage />} />
            <Route path="/librarian/books" element={<LibrarianBooksPage />} />
            <Route path="/librarian/copies" element={<LibrarianCopiesPage />} />

            <Route path="/store" element={<BookstorePage />} />
            <Route path="/store/cart" element={<CartPage />} />
            <Route path="/store/checkout" element={<CheckoutPage />} />
            <Route path="/store/orders" element={<OrderHistoryPage />} />

            <Route path="/admin/settings" element={<AdminSettingsPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
