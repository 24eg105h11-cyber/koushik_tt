import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      orders: [
        {
          id: 991,
          orderNumber: "ORD-928104",
          userId: 1,
          subtotal: 1250.00,
          tax: 62.50,
          shippingFee: 40.00,
          totalAmount: 1352.50,
          paymentStatus: "PAID",
          paymentMethod: "UPI",
          orderStatus: "DELIVERED",
          shippingAddress: "Hostel Block B, Room 304, Tech Campus",
          createdAt: "2026-09-28T16:20:00Z",
          items: [
            {
              bookTitle: "Clean Code: A Handbook of Agile Software Craftsmanship",
              coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&q=80",
              quantity: 1,
              price: 1250.00
            }
          ]
        }
      ],

      addToCart: (book, quantity = 1) => {
        const { cart } = get();
        const existing = cart.find(item => item.book.id === book.id);
        if (existing) {
          set({
            cart: cart.map(item =>
              item.book.id === book.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          });
        } else {
          set({ cart: [...cart, { book, quantity }] });
        }
      },

      removeFromCart: (bookId) => {
        set({ cart: get().cart.filter(item => item.book.id !== bookId) });
      },

      updateQuantity: (bookId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(bookId);
          return;
        }
        set({
          cart: get().cart.map(item =>
            item.book.id === bookId ? { ...item, quantity } : item
          )
        });
      },

      clearCart: () => set({ cart: [] }),

      placeOrder: (userId, orderDetails) => {
        const { cart, orders } = get();
        if (cart.length === 0) return null;

        const subtotal = cart.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
        const tax = subtotal * (orderDetails.taxPercent / 100);
        const shippingFee = orderDetails.shippingFee;
        const totalAmount = subtotal + tax + shippingFee;

        const newOrder = {
          id: Date.now(),
          orderNumber: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
          userId,
          subtotal,
          tax,
          shippingFee,
          totalAmount,
          paymentStatus: "PAID",
          paymentMethod: orderDetails.paymentMethod || "CARD",
          orderStatus: "PROCESSING",
          shippingAddress: orderDetails.shippingAddress,
          createdAt: new Date().toISOString(),
          items: cart.map(item => ({
            bookId: item.book.id,
            bookTitle: item.book.title,
            coverImage: item.book.coverImage,
            quantity: item.quantity,
            price: item.book.price
          }))
        };

        set({
          orders: [newOrder, ...orders],
          cart: []
        });

        return newOrder;
      }
    }),
    {
      name: 'digital_library_cart'
    }
  )
);
