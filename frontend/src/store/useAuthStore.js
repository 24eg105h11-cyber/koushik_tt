import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { INITIAL_USERS } from '../data/initialData';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: INITIAL_USERS[0], // Default logged in as Student Revanth
      token: "demo-jwt-token-revanth-2026",
      isAuthenticated: true,

      login: (email, password) => {
        const found = INITIAL_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (found) {
          set({
            user: found,
            token: `demo-token-${found.id}-${Date.now()}`,
            isAuthenticated: true
          });
          return { success: true, user: found };
        }
        return { success: false, message: "Invalid email or password" };
      },

      switchUserRole: (role) => {
        const target = INITIAL_USERS.find(u => u.role === role) || INITIAL_USERS[0];
        set({
          user: target,
          token: `demo-token-${target.id}-${Date.now()}`,
          isAuthenticated: true
        });
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },

      updateProfile: (updatedData) => {
        set((state) => ({
          user: { ...state.user, ...updatedData }
        }));
      }
    }),
    {
      name: 'digital_library_auth'
    }
  )
);
