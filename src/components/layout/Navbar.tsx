import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, ChevronDown, LogOut, UserRound, Settings, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useScrollPosition } from '../../hooks';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { mockNotifications } from '../../utils/mockData';
import { APP_NAME, NAV_ITEMS_BY_ROLE } from '../../utils/constants';
import { cn } from '../../utils/cn';
import type { NotificationItem } from '../../types';

interface NavbarProps {
  onMenuClick: () => void;
}

const NOTIFICATIONS_KEY = 'campusos_notifications';

function getNotifications(): NotificationItem[] {
  try {
    const stored = localStorage.getItem(NOTIFICATIONS_KEY);
    return stored ? JSON.parse(stored) : mockNotifications;
  } catch {
    return mockNotifications;
  }
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const scrolled = useScrollPosition();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(getNotifications);

  const role = user?.role ?? 'member';
  const navItems = NAV_ITEMS_BY_ROLE[role];
  const current = navItems.find((n) =>
    location.pathname === n.to ||
    (n.to !== '/app/member' && n.to !== '/app/lead' && n.to !== '/app/faculty' && location.pathname.startsWith(n.to))
  );

  const unread = notifications.filter((n) => !n.read).length;

  const saveNotifications = (next: NotificationItem[]) => {
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(next));
    setNotifications(next);
  };

  const markRead = (id: string) => {
    saveNotifications(notifications.map((n) => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    saveNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-border-soft bg-cream/80 backdrop-blur-xl shadow-soft'
          : 'bg-transparent'
      )}
    >
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
        {/* Mobile hamburger */}
        <button
          onClick={onMenuClick}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-soft transition-colors hover:bg-cream-200 hover:text-navy lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Breadcrumb */}
        <div className="hidden items-center gap-2 text-sm md:flex">
          <span className="font-bold text-navy">{APP_NAME}</span>
          <span className="text-ink-soft/40">/</span>
          <span className="font-medium capitalize text-ink-soft">{current?.label ?? 'Dashboard'}</span>
        </div>

        <div className="flex-1" />





        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setNotifOpen((o) => !o); setProfileOpen(false); }}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-ink-soft transition-colors hover:bg-cream-200 hover:text-navy"
          >
            <Bell className="h-5 w-5" />
            {unread > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[0.6rem] font-bold text-white">
                {unread}
              </span>
            )}
          </button>
          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                className="absolute right-0 mt-2 w-80 overflow-hidden rounded-2xl border border-border-soft bg-white shadow-lift"
              >
                <div className="flex items-center justify-between border-b border-border-soft px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-ink">Notifications</span>
                    {unread > 0 && <Badge tone="navy">{unread} new</Badge>}
                  </div>
                  {unread > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-xs font-semibold text-navy hover:underline"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto p-2">
                  {notifications.map((n) => (
                    <button
                      type="button"
                      key={n.id}
                      onClick={() => {
                        markRead(n.id);
                        setNotifOpen(false);
                      }}
                      className={cn(
                        'w-full text-left rounded-xl p-3 transition-colors hover:bg-cream-100 focus:outline-none',
                        !n.read && 'bg-navy/[0.03]'
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold text-ink">{n.title}</p>
                        {!n.read && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-navy" />}
                      </div>
                      <p className="mt-0.5 text-xs text-ink-soft">{n.description}</p>
                      <p className="mt-1 text-[0.7rem] text-ink-soft/70">{n.time}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setProfileOpen((o) => !o); setNotifOpen(false); }}
            className="flex items-center gap-2 rounded-xl p-1 pr-2 transition-colors hover:bg-cream-200"
          >
            <Avatar name={user?.name ?? 'User'} src={user?.avatarUrl} size="sm" />
            <div className="hidden text-left sm:block">
              <p className="text-xs font-semibold leading-tight text-ink">{user?.name?.split(' ')[0]}</p>
              <p className="text-[0.7rem] capitalize leading-tight text-ink-soft">{user?.role}</p>
            </div>
            <ChevronDown className="hidden h-4 w-4 text-ink-soft sm:block" />
          </button>
          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-border-soft bg-white p-1.5 shadow-lift"
              >
                <div className="px-3 py-2.5">
                  <p className="text-sm font-semibold text-ink">{user?.name}</p>
                  <p className="truncate text-xs text-ink-soft">{user?.email}</p>
                  <p className="mt-1 text-[0.7rem] capitalize font-medium text-ink-soft/70">{user?.role}</p>
                </div>
                <div className="my-1 h-px bg-border-soft" />
                <Link
                  to="/app/profile"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-ink transition-colors hover:bg-cream-100"
                >
                  <UserRound className="h-4 w-4 text-ink-soft" /> Profile
                </Link>
                {role === 'faculty' && (
                  <Link
                    to="/app/settings"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-ink transition-colors hover:bg-cream-100"
                  >
                    <Settings className="h-4 w-4 text-ink-soft" /> Settings
                  </Link>
                )}
                <div className="my-1 h-px bg-border-soft" />
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-danger transition-colors hover:bg-danger/8"
                >
                  <LogOut className="h-4 w-4" /> Log out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}
