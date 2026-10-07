export const INITIAL_BOOKS = [
  {
    id: 1,
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    isbn: "9780132350884",
    author: "Robert C. Martin",
    description: "Even bad code can function. But if code isn't clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code. But it doesn't have to be that way.",
    publisher: "Prentice Hall",
    publicationYear: 2008,
    category: "Computer Science",
    language: "English",
    pages: 464,
    coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&q=80",
    price: 1250.00,
    totalCopies: 4,
    availableCopies: 3,
    status: "AVAILABLE",
    rating: 4.9,
    reviewsCount: 45,
    createdAt: "2026-01-10T10:00:00Z"
  },
  {
    id: 2,
    title: "Design Patterns: Elements of Reusable Object-Oriented Software",
    isbn: "9780201633610",
    author: "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides",
    description: "Capturing a wealth of experience about the design of object-oriented software, four top-notch designers present a catalog of simple and succinct solutions to commonly occurring design problems.",
    publisher: "Addison-Wesley",
    publicationYear: 1994,
    category: "Computer Science",
    language: "English",
    pages: 395,
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    price: 1499.00,
    totalCopies: 3,
    availableCopies: 2,
    status: "AVAILABLE",
    rating: 4.8,
    reviewsCount: 32,
    createdAt: "2026-01-12T10:00:00Z"
  },
  {
    id: 3,
    title: "Designing Data-Intensive Applications",
    isbn: "9781449373320",
    author: "Martin Kleppmann",
    description: "Data is at the center of many challenges in system design today. Difficult issues such as scalability, consistency, reliability, efficiency, and maintainability need to be figured out.",
    publisher: "O'Reilly Media",
    publicationYear: 2017,
    category: "Computer Science",
    language: "English",
    pages: 616,
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
    price: 1850.00,
    totalCopies: 5,
    availableCopies: 4,
    status: "AVAILABLE",
    rating: 5.0,
    reviewsCount: 68,
    createdAt: "2026-01-15T10:00:00Z"
  },
  {
    id: 4,
    title: "Artificial Intelligence: A Modern Approach",
    isbn: "9780134610993",
    author: "Stuart Russell, Peter Norvig",
    description: "The long-anticipated revision of this best-selling text offers the most comprehensive, up-to-date introduction to the theory and practice of artificial intelligence.",
    publisher: "Pearson",
    publicationYear: 2020,
    category: "Artificial Intelligence",
    language: "English",
    pages: 1168,
    coverImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80",
    price: 2200.00,
    totalCopies: 3,
    availableCopies: 3,
    status: "AVAILABLE",
    rating: 4.9,
    reviewsCount: 29,
    createdAt: "2026-02-01T10:00:00Z"
  },
  {
    id: 5,
    title: "The Pragmatic Programmer: Your Journey To Mastery",
    isbn: "9780135957059",
    author: "David Thomas, Andrew Hunt",
    description: "The Pragmatic Programmer cuts through the increasing specialization and technicalities of modern software development to examine the core process.",
    publisher: "Addison-Wesley",
    publicationYear: 2019,
    category: "Software Engineering",
    language: "English",
    pages: 352,
    coverImage: "https://images.unsplash.com/photo-1526243741027-444d633d7342?auto=format&fit=crop&w=600&q=80",
    price: 1399.00,
    totalCopies: 2,
    availableCopies: 0,
    status: "OUT_OF_STOCK",
    rating: 4.9,
    reviewsCount: 51,
    createdAt: "2026-02-10T10:00:00Z"
  }
];

export const INITIAL_COPIES = [
  { id: 101, copyId: "LIB-CC-001", bookId: 1, status: "AVAILABLE", qrCode: "BOOK-COPY-LIB-CC-001", currentBorrowerId: null, location: "Shelf CS-01, Row 1", condition: "EXCELLENT" },
  { id: 102, copyId: "LIB-CC-002", bookId: 1, status: "ISSUED", qrCode: "BOOK-COPY-LIB-CC-002", currentBorrowerId: 1, location: "Shelf CS-01, Row 1", condition: "GOOD" },
  { id: 103, copyId: "LIB-CC-003", bookId: 1, status: "AVAILABLE", qrCode: "BOOK-COPY-LIB-CC-003", location: "Shelf CS-01, Row 1", condition: "NEW" },
  { id: 104, copyId: "LIB-CC-004", bookId: 1, status: "AVAILABLE", qrCode: "BOOK-COPY-LIB-CC-004", location: "Shelf CS-01, Row 1", condition: "GOOD" },

  { id: 201, copyId: "LIB-DP-001", bookId: 2, status: "AVAILABLE", qrCode: "BOOK-COPY-LIB-DP-001", location: "Shelf CS-02, Row 2", condition: "EXCELLENT" },
  { id: 202, copyId: "LIB-DP-002", bookId: 2, status: "ISSUED", qrCode: "BOOK-COPY-LIB-DP-002", currentBorrowerId: 2, location: "Shelf CS-02, Row 2", condition: "FAIR" },
  { id: 203, copyId: "LIB-DP-003", bookId: 2, status: "AVAILABLE", qrCode: "BOOK-COPY-LIB-DP-003", location: "Shelf CS-02, Row 2", condition: "NEW" }
];

export const INITIAL_USERS = [
  {
    id: 1,
    name: "Revanth Kumar",
    email: "student@library.com",
    role: "STUDENT",
    department: "Computer Science & Engineering",
    studentId: "STU-2026-042",
    qrCode: "USER-STU-2026-042",
    phone: "+91 98765 43210",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    totalFines: 0.00,
    status: "ACTIVE"
  },
  {
    id: 2,
    name: "Ananya Sharma",
    email: "ananya@library.com",
    role: "STUDENT",
    department: "Information Technology",
    studentId: "STU-2026-108",
    qrCode: "USER-STU-2026-108",
    phone: "+91 98123 45678",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    totalFines: 30.00,
    status: "ACTIVE"
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    email: "librarian@library.com",
    role: "LIBRARIAN",
    department: "Central Library Services",
    studentId: "LIB-STAFF-01",
    qrCode: "USER-LIB-STAFF-01",
    phone: "+91 91234 56789",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    totalFines: 0.00,
    status: "ACTIVE"
  },
  {
    id: 4,
    name: "Dr. Robert Vance",
    email: "admin@library.com",
    role: "ADMIN",
    department: "Library Administration & IT",
    studentId: "ADM-SYS-00",
    qrCode: "USER-ADM-SYS-00",
    phone: "+91 90000 11111",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
    totalFines: 0.00,
    status: "ACTIVE"
  }
];

export const INITIAL_EBOOKS = [
  {
    id: 101,
    title: "Clean Code: Digital Interactive Edition",
    author: "Robert C. Martin",
    description: "Master software craftsmanship with interactive code snippets, refactoring exercises, and chapter highlights.",
    coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&q=80",
    category: "Programming",
    language: "English",
    totalPages: 248,
    isbn: "9780132350884",
    publisher: "Prentice Hall",
    publicationYear: 2024,
    isFeatured: true,
    chapters: [
      { id: 1, title: "Chapter 1: Clean Code Philosophy", startPage: 1 },
      { id: 2, title: "Chapter 2: Meaningful Names", startPage: 24 },
      { id: 3, title: "Chapter 3: Functions & Clean Arguments", startPage: 52 },
      { id: 4, title: "Chapter 4: Comments & Documentation Rules", startPage: 86 },
      { id: 5, title: "Chapter 5: Formatting & Structure", startPage: 120 },
      { id: 6, title: "Chapter 6: Objects & Data Abstraction", startPage: 160 },
      { id: 7, title: "Chapter 7: Error Handling & System Boundaries", startPage: 200 }
    ]
  },
  {
    id: 102,
    title: "Design Patterns: Digital Masterclass",
    author: "Erich Gamma, Gang of Four",
    description: "Explore reusable object-oriented solutions with high-resolution UML diagrams and full-text search.",
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    category: "Computer Science",
    language: "English",
    totalPages: 320,
    isbn: "9780201633610",
    publisher: "Addison-Wesley",
    publicationYear: 2023,
    isFeatured: true,
    chapters: [
      { id: 1, title: "Chapter 1: Introduction to Object-Oriented Design Patterns", startPage: 1 },
      { id: 2, title: "Chapter 2: Case Study: Designing a Document Editor", startPage: 35 },
      { id: 3, title: "Chapter 3: Creational Patterns - Singleton, Factory, Builder", startPage: 85 },
      { id: 4, title: "Chapter 4: Structural Patterns - Adapter, Decorator, Proxy", startPage: 165 },
      { id: 5, title: "Chapter 5: Behavioral Patterns - Observer, Strategy, Command", startPage: 240 }
    ]
  },
  {
    id: 103,
    title: "Designing Data-Intensive Applications (EBook)",
    author: "Martin Kleppmann",
    description: "The ultimate guide to distributed systems, consensus algorithms, storage engines, and stream processing.",
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
    category: "Technology",
    language: "English",
    totalPages: 550,
    isbn: "9781449373320",
    publisher: "O'Reilly Media",
    publicationYear: 2024,
    isFeatured: true,
    chapters: [
      { id: 1, title: "Part I: Foundations of Data Systems", startPage: 1 },
      { id: 2, title: "Part II: Distributed Data Systems & Replication", startPage: 180 },
      { id: 3, title: "Part III: Derived Data & Stream Processing", startPage: 390 }
    ]
  },
  {
    id: 104,
    title: "Artificial Intelligence: Modern Practice",
    author: "Stuart Russell, Peter Norvig",
    description: "Comprehensive guide covering neural networks, deep learning, reinforcement learning, and AI ethics.",
    coverImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80",
    category: "Science",
    language: "English",
    totalPages: 720,
    isbn: "9780134610993",
    publisher: "Pearson",
    publicationYear: 2025,
    isFeatured: true,
    chapters: [
      { id: 1, title: "Chapter 1: Intelligent Agents & Problem Solving", startPage: 1 },
      { id: 2, title: "Chapter 2: Machine Learning Foundations", startPage: 250 },
      { id: 3, title: "Chapter 3: Deep Neural Networks & Robotics", startPage: 510 }
    ]
  },
  {
    id: 105,
    title: "Zero to One: Notes on Startups",
    author: "Peter Thiel, Blake Masters",
    description: "How to build the future, discover hidden truths, and create innovative technology companies.",
    coverImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
    category: "Business",
    language: "English",
    totalPages: 210,
    isbn: "9780804139298",
    publisher: "Crown Business",
    publicationYear: 2023,
    isFeatured: false,
    chapters: [
      { id: 1, title: "Chapter 1: The Challenge of the Future", startPage: 1 },
      { id: 2, title: "Chapter 2: You Are Not a Lottery Ticket", startPage: 60 },
      { id: 3, title: "Chapter 3: Secrets & Foundations", startPage: 130 }
    ]
  },
  {
    id: 106,
    title: "Atomic Habits: An Easy & Proven Way",
    author: "James Clear",
    description: "Tiny changes, remarkable results. Learn how small habit loops build exponential personal transformation.",
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    category: "Self Development",
    language: "English",
    totalPages: 320,
    isbn: "9780735211292",
    publisher: "Avery",
    publicationYear: 2024,
    isFeatured: false,
    chapters: [
      { id: 1, title: "The Fundamentals: Why Tiny Changes Make a Big Difference", startPage: 1 },
      { id: 2, title: "The 1st Law: Make It Obvious", startPage: 55 },
      { id: 3, title: "The 2nd Law: Make It Attractive", startPage: 125 }
    ]
  }
];

export const INITIAL_READING_PROGRESS = [
  {
    id: 2001,
    userId: 1, // Student Revanth
    ebookId: 101, // Clean Code
    currentPage: 87,
    currentChapter: "Chapter 4: Comments & Documentation Rules",
    percentage: 35,
    lastReadAt: "2026-10-08T01:30:00Z",
    completed: false
  },
  {
    id: 2002,
    userId: 1,
    ebookId: 102, // Design Patterns
    currentPage: 142,
    currentChapter: "Chapter 3: Creational Patterns - Factory Method",
    percentage: 44,
    lastReadAt: "2026-10-07T18:15:00Z",
    completed: false
  }
];

export const INITIAL_TRANSACTIONS = [
  {
    id: 1001,
    transactionId: "TXN-982347",
    userId: 1,
    bookCopyId: 102,
    copyCode: "LIB-CC-002",
    bookTitle: "Clean Code: A Handbook of Agile Software Craftsmanship",
    issueDate: "2026-10-01",
    dueDate: "2026-10-15",
    returnDate: null,
    status: "ISSUED",
    renewalCount: 0,
    fineAmount: 0.00,
    issuedBy: "Sarah Jenkins"
  }
];

export const INITIAL_RESERVATIONS = [
  {
    id: 501,
    reservationId: "RES-40291",
    userId: 1,
    bookId: 5,
    bookTitle: "The Pragmatic Programmer: Your Journey To Mastery",
    position: 1,
    status: "PENDING",
    reservationDate: "2026-10-05T14:30:00Z",
    expiryDate: "2026-10-07T14:30:00Z"
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 901,
    userId: 1,
    title: "Digital Library Pass Active",
    message: "Your Digital Pass has been verified. Present your personal QR code at library checkout counter.",
    type: "SYSTEM",
    readStatus: false,
    createdAt: "2026-10-07T10:00:00Z"
  }
];

export const INITIAL_SETTINGS = {
  finePerDay: 10.0,
  maxBooksPerStudent: 5,
  maxLoanDays: 14,
  maxRenewals: 2,
  reservationExpiryHours: 48,
  storeTaxPercent: 5.0,
  storeShippingFee: 40.0
};
