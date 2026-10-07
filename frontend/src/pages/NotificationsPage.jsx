import React from 'react';
import { Bell, CheckCircle, Clock, AlertTriangle, BookOpen, DollarSign } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useLibraryStore } from '../store/useLibraryStore';

export default function NotificationsPage() {
  const { user } = useAuthStore();
  const { notifications } = useLibraryStore();

  const userNotifications = notifications.filter(n => n.userId === user?.id);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
          <Bell className="w-4 h-4" />
          <span>Real-Time Notifications & Logs</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          System Alerts & Activity
        </h1>
        <p className="text-slate-400 text-sm max-w-xl">
          Automated Spring Boot notification logs for book issues, returns, due dates, fines, and bookstore order updates.
        </p>
      </div>

      {userNotifications.length === 0 ? (
        <div className="text-center py-16 glass-panel rounded-3xl border border-slate-800 text-slate-400 text-sm">
          No notifications in your inbox.
        </div>
      ) : (
        <div className="space-y-3">
          {userNotifications.map(n => {
            return (
              <div 
                key={n.id}
                className="glass-panel p-5 rounded-3xl border border-slate-800 flex items-start space-x-4 hover:border-indigo-500/30 transition-all"
              >
                <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 shrink-0">
                  <Bell className="w-5 h-5" />
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white">{n.title}</h3>
                    <span className="text-[10px] text-slate-500">
                      {new Date(n.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{n.message}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
