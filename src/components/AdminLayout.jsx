import React, { useEffect, useMemo, useState } from 'react';
import { Navigate, Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '@/lib/auth';
import {
  LayoutDashboard,
  Users,
  FileEdit,
  Briefcase,
  Search,
  LogOut,
  Menu,
  X,
  Clock
} from 'lucide-react';

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Start with a safe session read
  const [session, setSession] = useState(() => auth.getSession());
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Keep session in sync (login/logout in another tab, storage updates, etc.)
  useEffect(() => {
    const syncSession = () => {
      const current = auth.getSession();
      setSession(current);
      // If session removed, redirect to login
      if (!current) navigate('/admin/login', { replace: true });
    };

    // Initial sync (in case auth changes after first render)
    syncSession();

    // Listen storage changes (if auth stores session in localStorage)
    const onStorage = (e) => {
      // If your auth uses a specific key, you can filter here
      // e.g. if (e.key !== 'admin_session') return;
      syncSession();
    };

    // When tab becomes visible again, re-check session
    const onVisibility = () => {
      if (document.visibilityState === 'visible') syncSession();
    };

    window.addEventListener('storage', onStorage);
    document.addEventListener('visibilitychange', onVisibility);

    // Periodic check
    const interval = setInterval(syncSession, 60_000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', onStorage);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [navigate]);

  // Close sidebar when route changes (mobile UX)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    auth.logout();
    setSession(null);
    navigate('/admin/login', { replace: true });
  };

  // If session missing => redirect
  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  // Safe user object
  const user = session?.user || {};

  // Build displayName safely
  const displayName = useMemo(() => {
    return (
      user?.name ||
      user?.full_name ||
      user?.username ||
      user?.email?.split?.('@')?.[0] ||
      'Admin'
    );
  }, [user]);

  const displayRole = useMemo(() => {
    return user?.role || user?.user_role || 'ADMIN';
  }, [user]);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Users, label: 'Leads', path: '/admin/leads' },
    { icon: FileEdit, label: 'Site Content', path: '/admin/content' },
    { icon: Clock, label: 'Timeline', path: '/admin/timeline' },
    { icon: Briefcase, label: 'Ventures', path: '/admin/ventures' },
    { icon: Search, label: 'SEO Manager', path: '/admin/seo' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1e3a8a] text-white transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:inset-auto ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <span className="text-xl font-bold">Admin Panel</span>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden" aria-label="Close sidebar">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 border-b border-white/10">
          <div className="text-sm opacity-70">Welcome back,</div>
          {/* ✅ fixed: safe name */}
          <div className="font-semibold">{displayName}</div>
          {/* ✅ fixed: safe role */}
          <div className="text-xs bg-white/20 inline-block px-2 py-0.5 rounded mt-1">
            {displayRole}
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  active ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 text-white/70 hover:text-white px-4 py-2 w-full transition-colors"
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-white shadow-sm p-4 flex justify-between items-center z-40">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-600" aria-label="Open sidebar">
            <Menu size={24} />
          </button>
          <span className="font-bold text-gray-800">Admin Panel</span>
          <div className="w-6" />
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;