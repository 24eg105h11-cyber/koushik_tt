import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { INITIAL_EBOOKS, INITIAL_READING_PROGRESS } from '../data/initialData';

export const useEbookStore = create(
  persist(
    (set, get) => ({
      ebooks: INITIAL_EBOOKS,
      readingProgress: INITIAL_READING_PROGRESS,

      updateProgress: (userId, ebookId, currentPage, currentChapter = "Chapter") => {
        const { readingProgress, ebooks } = get();
        const ebook = ebooks.find(e => e.id === Number(ebookId));
        if (!ebook) return;

        const totalPages = ebook.totalPages || 100;
        const page = Math.max(1, Math.min(totalPages, currentPage));
        const percentage = Math.min(100, Math.round((page / totalPages) * 100));
        const completed = page >= totalPages;

        const existing = readingProgress.find(p => p.userId === userId && p.ebookId === Number(ebookId));

        if (existing) {
          const updated = readingProgress.map(p => 
            p.userId === userId && p.ebookId === Number(ebookId)
              ? { ...p, currentPage: page, currentChapter, percentage, completed, lastReadAt: new Date().toISOString() }
              : p
          );
          set({ readingProgress: updated });
        } else {
          const newProgress = {
            id: Date.now(),
            userId,
            ebookId: Number(ebookId),
            currentPage: page,
            currentChapter,
            percentage,
            completed,
            lastReadAt: new Date().toISOString()
          };
          set({ readingProgress: [newProgress, ...readingProgress] });
        }
      },

      getProgress: (userId, ebookId) => {
        const { readingProgress } = get();
        return readingProgress.find(p => p.userId === userId && p.ebookId === Number(ebookId));
      },

      getUserContinueReading: (userId) => {
        const { readingProgress, ebooks } = get();
        const userProgs = readingProgress.filter(p => p.userId === userId);
        
        return userProgs.map(prog => {
          const ebook = ebooks.find(e => e.id === prog.ebookId);
          return {
            ...prog,
            ebook
          };
        }).filter(item => item.ebook !== undefined);
      }
    }),
    {
      name: 'digital_library_ebooks'
    }
  )
);
