import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  INITIAL_BOOKS,
  INITIAL_COPIES,
  INITIAL_TRANSACTIONS,
  INITIAL_RESERVATIONS,
  INITIAL_NOTIFICATIONS,
  INITIAL_SETTINGS,
  INITIAL_USERS
} from '../data/initialData';

export const useLibraryStore = create(
  persist(
    (set, get) => ({
      books: INITIAL_BOOKS,
      copies: INITIAL_COPIES,
      transactions: INITIAL_TRANSACTIONS,
      reservations: INITIAL_RESERVATIONS,
      notifications: INITIAL_NOTIFICATIONS,
      settings: INITIAL_SETTINGS,
      users: INITIAL_USERS,

      // Smart Dual QR Workflow
      analyzeDualScan: (studentQr, copyQr) => {
        const { users, copies, transactions, reservations, settings } = get();

        const student = users.find(u => u.qrCode === studentQr || u.studentId === studentQr);
        const copy = copies.find(c => c.qrCode === copyQr || c.copyId === copyQr);

        if (!student || !copy) {
          return {
            actionType: 'INVALID',
            eligible: false,
            message: `Invalid QR code! ${!student ? 'Student profile not found. ' : ''}${!copy ? 'Book copy not found.' : ''}`
          };
        }

        const book = get().books.find(b => b.id === copy.bookId);

        // Check active transaction
        const activeTxn = transactions.find(t => t.bookCopyId === copy.id && (t.status === 'ISSUED' || t.status === 'OVERDUE'));

        if (activeTxn) {
          if (activeTxn.userId === student.id) {
            const today = new Date();
            const due = new Date(activeTxn.dueDate);
            const diffTime = today - due;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            const overdueDays = Math.max(0, diffDays);
            const fine = overdueDays * settings.finePerDay;

            return {
              actionType: activeTxn.renewalCount < settings.maxRenewals && overdueDays === 0 ? 'RETURN_OR_RENEW' : 'RETURN',
              eligible: true,
              message: `Book currently issued to ${student.name}. Ready for return/renewal processing.`,
              student,
              copy,
              book,
              existingTransaction: activeTxn,
              calculatedFine: fine,
              overdueDays
            };
          } else {
            const otherUser = users.find(u => u.id === activeTxn.userId);
            return {
              actionType: 'INVALID',
              eligible: false,
              message: `Book copy is currently issued to another student (${otherUser ? otherUser.name : 'Unknown'}). Return required first.`,
              student,
              copy,
              book
            };
          }
        }

        // Check if student limit reached
        const studentIssued = transactions.filter(t => t.userId === student.id && (t.status === 'ISSUED' || t.status === 'OVERDUE'));
        if (studentIssued.length >= settings.maxBooksPerStudent) {
          return {
            actionType: 'INVALID',
            eligible: false,
            message: `Student ${student.name} has reached max borrowing limit (${settings.maxBooksPerStudent} books).`,
            student,
            copy,
            book
          };
        }

        // Calculate issue dates
        const todayStr = new Date().toISOString().split('T')[0];
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + settings.maxLoanDays);
        const dueDateStr = dueDate.toISOString().split('T')[0];

        return {
          actionType: 'ISSUE',
          eligible: true,
          message: `Ready to issue "${book.title}" to ${student.name}.`,
          student,
          copy,
          book,
          issueDate: todayStr,
          dueDate: dueDateStr
        };
      },

      // Perform Issue
      confirmIssue: (studentId, copyId, librarianName = "Sarah Jenkins") => {
        const { books, copies, transactions, users, settings } = get();
        const copy = copies.find(c => c.id === copyId);
        const book = books.find(b => b.id === copy.bookId);
        const student = users.find(u => u.id === studentId);

        const todayStr = new Date().toISOString().split('T')[0];
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + settings.maxLoanDays);
        const dueDateStr = dueDate.toISOString().split('T')[0];

        const newTxn = {
          id: Date.now(),
          transactionId: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
          userId: studentId,
          bookCopyId: copyId,
          copyCode: copy.copyId,
          bookTitle: book.title,
          issueDate: todayStr,
          dueDate: dueDateStr,
          returnDate: null,
          status: 'ISSUED',
          renewalCount: 0,
          fineAmount: 0.00,
          issuedBy: librarianName
        };

        const updatedCopies = copies.map(c => c.id === copyId ? { ...c, status: 'ISSUED', currentBorrowerId: studentId } : c);
        const updatedBooks = books.map(b => b.id === book.id ? { ...b, availableCopies: Math.max(0, b.availableCopies - 1) } : b);

        const newNotif = {
          id: Date.now(),
          userId: studentId,
          title: "Book Issued",
          message: `"${book.title}" (Copy: ${copy.copyId}) has been issued. Due date: ${dueDateStr}`,
          type: "ISSUE",
          readStatus: false,
          createdAt: new Date().toISOString()
        };

        set({
          transactions: [newTxn, ...transactions],
          copies: updatedCopies,
          books: updatedBooks,
          notifications: [newNotif, ...get().notifications]
        });

        return newTxn;
      },

      // Perform Return
      confirmReturn: (transactionId, librarianName = "Sarah Jenkins") => {
        const { transactions, copies, books, users, notifications } = get();
        const txn = transactions.find(t => t.id === transactionId);
        if (!txn) return;

        const copy = copies.find(c => c.id === txn.bookCopyId);
        const book = books.find(b => b.id === copy.bookId);

        const todayStr = new Date().toISOString().split('T')[0];

        const updatedTxns = transactions.map(t => t.id === transactionId ? {
          ...t,
          status: 'RETURNED',
          returnDate: todayStr,
          returnedBy: librarianName
        } : t);

        const updatedCopies = copies.map(c => c.id === copy.id ? { ...c, status: 'AVAILABLE', currentBorrowerId: null } : c);
        const updatedBooks = books.map(b => b.id === book.id ? { ...b, availableCopies: b.availableCopies + 1 } : b);

        const newNotif = {
          id: Date.now(),
          userId: txn.userId,
          title: "Book Returned Successfully",
          message: `"${book.title}" (Copy: ${copy.copyId}) returned to library on ${todayStr}.`,
          type: "RETURN",
          readStatus: false,
          createdAt: new Date().toISOString()
        };

        set({
          transactions: updatedTxns,
          copies: updatedCopies,
          books: updatedBooks,
          notifications: [newNotif, ...notifications]
        });
      },

      // Perform Renew
      confirmRenew: (transactionId) => {
        const { transactions, settings, notifications } = get();
        const txn = transactions.find(t => t.id === transactionId);
        if (!txn) return;

        const currentDue = new Date(txn.dueDate);
        currentDue.setDate(currentDue.getDate() + settings.maxLoanDays);
        const newDueStr = currentDue.toISOString().split('T')[0];

        const updatedTxns = transactions.map(t => t.id === transactionId ? {
          ...t,
          dueDate: newDueStr,
          renewalCount: t.renewalCount + 1,
          status: 'RENEWED'
        } : t);

        const newNotif = {
          id: Date.now(),
          userId: txn.userId,
          title: "Book Renewed",
          message: `"${txn.bookTitle}" loan extended. New due date is ${newDueStr}`,
          type: "RENEW",
          readStatus: false,
          createdAt: new Date().toISOString()
        };

        set({
          transactions: updatedTxns,
          notifications: [newNotif, ...notifications]
        });
      },

      // Reserve Book
      reserveBook: (userId, bookId) => {
        const { reservations, books, notifications } = get();
        const book = books.find(b => b.id === bookId);
        const userReservations = reservations.filter(r => r.bookId === bookId && r.status === 'PENDING');
        const pos = userReservations.length + 1;

        const newRes = {
          id: Date.now(),
          reservationId: `RES-${Math.floor(10000 + Math.random() * 90000)}`,
          userId,
          bookId,
          bookTitle: book.title,
          position: pos,
          status: 'PENDING',
          reservationDate: new Date().toISOString(),
          expiryDate: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString()
        };

        const newNotif = {
          id: Date.now(),
          userId,
          title: "Reservation Placed",
          message: `You reserved "${book.title}". Your queue position is #${pos}.`,
          type: "RESERVATION",
          readStatus: false,
          createdAt: new Date().toISOString()
        };

        set({
          reservations: [newRes, ...reservations],
          notifications: [newNotif, ...notifications]
        });

        return newRes;
      },

      // Add New Book (Librarian/Admin)
      addBook: (bookData) => {
        const { books, copies } = get();
        const newId = Date.now();
        const totalCopies = parseInt(bookData.totalCopies || 1, 10);

        const newBook = {
          ...bookData,
          id: newId,
          availableCopies: totalCopies,
          status: "AVAILABLE",
          rating: 5.0,
          reviewsCount: 0,
          createdAt: new Date().toISOString()
        };

        const newCopiesList = [];
        const isbnLast = bookData.isbn.slice(-4) || '9999';

        for (let i = 1; i <= totalCopies; i++) {
          const cId = `LIB-${isbnLast}-${String(i).padStart(3, '0')}`;
          newCopiesList.push({
            id: newId + i,
            copyId: cId,
            bookId: newId,
            status: "AVAILABLE",
            qrCode: `BOOK-COPY-${cId}`,
            currentBorrowerId: null,
            location: bookData.location || "Shelf MAIN",
            condition: "NEW"
          });
        }

        set({
          books: [newBook, ...books],
          copies: [...newCopiesList, ...copies]
        });
      },

      // Update Settings
      updateSettings: (newSettings) => {
        set({ settings: { ...get().settings, ...newSettings } });
      },

      // Pay Fine
      payFine: (userId, amount) => {
        const { users, notifications } = get();
        const updatedUsers = users.map(u => u.id === userId ? { ...u, totalFines: 0.00 } : u);

        const notif = {
          id: Date.now(),
          userId,
          title: "Fine Payment Received",
          message: `₹${amount.toFixed(2)} fine paid successfully via Razorpay/Stripe.`,
          type: "FINE",
          readStatus: false,
          createdAt: new Date().toISOString()
        };

        set({ users: updatedUsers, notifications: [notif, ...notifications] });
      }
    }),
    {
      name: 'digital_library_data'
    }
  )
);
