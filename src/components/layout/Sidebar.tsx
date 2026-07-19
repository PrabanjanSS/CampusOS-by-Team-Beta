import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PanelLeftClose, PanelLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { NAV_ITEMS_BY_ROLE, APP_NAME } from '../../utils/constants';
import { Icon } from '../ui/Icon';
import { Tooltip } from '../ui/Tooltip';
import { cn } from '../../utils/cn';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const roleLabels = {
  member:  'Club Member',
  lead:    'Club Lead',
  faculty: 'Faculty Coordinator',
};

const roleBadgeColors = {
  member:  'bg-navy/10 text-navy',
  lead:    'bg-sand/30 text-[#8a6d3b]',
  faculty: 'bg-success/12 text-success',
};

export function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const role = user?.role ?? 'member';
  const navItems = NAV_ITEMS_BY_ROLE[role];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (to: string) =>
    location.pathname === to ||
    (to !== '/app/member' && to !== '/app/lead' && to !== '/app/faculty' && location.pathname.startsWith(to));

  const content = (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className={cn(
        'flex h-16 items-center gap-2.5 border-b border-border-soft px-4',
        collapsed && 'justify-center px-2'
      )}>
        <img
  src="/favicon.png"
  alt="CampusOS"
  className="h-10 w-10 rounded-xl object-contain shadow-soft"
/>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-sm font-bold leading-tight text-ink">{APP_NAME}</p>
            <p className={cn('truncate text-[0.68rem] font-medium px-2 py-0.5 rounded-full mt-0.5 w-fit', roleBadgeColors[role])}>
              {roleLabels[role]}
            </p>
          </div>
        )}
      </div>

      {/* Toggle (desktop) */}
      <button
        onClick={onToggle}
        className={cn(
          'mx-3 mt-3 hidden items-center justify-center gap-2 rounded-lg border border-border-soft bg-white py-2 text-xs font-medium text-ink-soft transition-colors hover:border-navy/30 hover:text-navy lg:flex',
          collapsed && 'mx-auto'
        )}
      >
        {collapsed
          ? <PanelLeft className="h-4 w-4" />
          : <><PanelLeftClose className="h-4 w-4" /> <span>Collapse</span></>
        }
      </button>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3 no-scrollbar">
        <p className={cn(
          'mb-2 px-3 text-[0.68rem] font-semibold uppercase tracking-wider text-ink-soft/60',
          collapsed && 'text-center px-0'
        )}>
          {collapsed ? '·' : 'Menu'}
        </p>
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const active = isActive(item.to);
            const link = (
              <Link
                to={item.to}
                key={item.id}
                onClick={onMobileClose}
                className={cn(
                  'relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  active
                    ? 'text-navy'
                    : 'text-ink-soft hover:bg-cream-200 hover:text-navy',
                  collapsed && 'justify-center px-2'
                )}
                style={active ? { backgroundColor: 'rgba(25,55,109,0.08)' } : undefined}
              >
                {active && (
                  <motion.span
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-navy"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <Icon
                  name={item.icon}
                  className={cn(
                    'h-5 w-5 shrink-0 transition-transform duration-200',
                    active ? 'text-navy' : 'group-hover:scale-110'
                  )}
                />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );

            return (
              <li key={item.id}>
                {collapsed
                  ? <Tooltip label={item.label} side="right">{link}</Tooltip>
                  : link
                }
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="border-t border-border-soft p-3">
        <button
          onClick={handleLogout}
          className={cn(
            'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-danger transition-colors hover:bg-danger/8',
            collapsed && 'justify-center px-2'
          )}
        >
          <Icon name="LogOut" className="h-5 w-5 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <motion.aside
        animate={{ width: collapsed ? 76 : 256 }}
        transition={{ type: 'spring', stiffness: 300, damping: 32 }}
        className="sticky top-0 hidden h-screen shrink-0 border-r border-border-soft bg-white/60 backdrop-blur-xl lg:block"
      >
        {content}
      </motion.aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[90] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-navy-900/40 backdrop-blur-sm"
              onClick={onMobileClose}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              className="absolute left-0 top-0 h-full w-64 bg-cream shadow-lift"
            >
              {content}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
