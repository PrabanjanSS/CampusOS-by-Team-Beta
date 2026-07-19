import type { Role, NavItem } from '../types';

export const APP_NAME = 'CampusOS';
export const APP_TAGLINE = 'One Platform. Every Club.';
export const APP_DESCRIPTION = 'University Club Management Platform';
export const APP_VERSION = '1.0.0';

export const ROLES: Record<
  Role,
  {
    id: Role;
    title: string;
    tagline: string;
    description: string;
    loginPath: string;
    dashboardPath: string;
    accent: string;
    gradient: string;
  }
> = {
  member: {
    id: 'member',
    title: 'Club Member',
    tagline: 'Join. Contribute. Grow.',
    description:
      'Discover events, track projects, build your portfolio, and earn recognition across every club you belong to.',
    loginPath: '/login/member',
    dashboardPath: '/app/member',
    accent: '#19376D',
    gradient: 'from-navy to-navy-400',
  },
  lead: {
    id: 'lead',
    title: 'Club Lead',
    tagline: 'Lead. Organize. Inspire.',
    description:
      'Run your club like a product team — manage events, coordinate members, publish announcements, and track momentum.',
    loginPath: '/login/lead',
    dashboardPath: '/app/lead',
    accent: '#19376D',
    gradient: 'from-navy-600 to-navy',
  },
  faculty: {
    id: 'faculty',
    title: 'Faculty Coordinator',
    tagline: 'Oversee. Approve. Mentor.',
    description:
      'Get full visibility across every club you oversee — review proposals, monitor budgets, and guide student leaders.',
    loginPath: '/login/faculty',
    dashboardPath: '/app/faculty',
    accent: '#19376D',
    gradient: 'from-navy-800 to-navy-500',
  },
};

export const DEPARTMENTS = [
  'Computer Science',
  'Electronics & Communication',
  'Mechanical Engineering',
  'Civil Engineering',
  'Business Administration',
  'Design & Architecture',
  'Sciences',
  'Humanities',
];

export const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Postgraduate'];

// Per-role navigation menus
export const NAV_ITEMS_BY_ROLE: Record<Role, NavItem[]> = {
  member: [
    { id: 'dashboard', label: 'Dashboard',    to: '/app/member',              icon: 'LayoutDashboard' },
    { id: 'events',    label: 'Events',        to: '/app/events',              icon: 'Rocket'          },
    { id: 'planner',   label: 'Planner',       to: '/app/planner',             icon: 'CalendarDays'    },
    { id: 'polls',     label: 'Polls',         to: '/app/polls',               icon: 'ClipboardList'   },
    { id: 'projects',  label: 'Projects',      to: '/app/projects',            icon: 'FolderKanban'    },
    { id: 'announcements', label: 'Announcements', to: '/app/announcements',    icon: 'Megaphone'       },
    { id: 'blogs',     label: 'Blogs',         to: '/app/blogs',               icon: 'PenLine'         },
    { id: 'gallery',   label: 'Gallery',       to: '/app/gallery',             icon: 'Images'          },
    { id: 'leaderboard', label: 'Leaderboard', to: '/app/leaderboard',         icon: 'Trophy'          },
    { id: 'badges',    label: 'Badges',        to: '/app/badges',              icon: 'Award'           },
    { id: 'profile',   label: 'Profile',       to: '/app/profile',             icon: 'UserRound'       },
    { id: 'settings',  label: 'Settings',      to: '/app/settings',            icon: 'Settings'        },
  ],
  lead: [
    { id: 'dashboard',      label: 'Dashboard',        to: '/app/lead',              icon: 'LayoutDashboard' },
    { id: 'manage-events',  label: 'Manage Events',    to: '/app/events',            icon: 'Rocket'          },
    { id: 'planner',        label: 'Planner',          to: '/app/planner',           icon: 'CalendarDays'    },
    { id: 'polls',          label: 'Polls',            to: '/app/polls',             icon: 'ClipboardList'   },
    { id: 'projects',       label: 'Projects',         to: '/app/projects',          icon: 'FolderKanban'    },
    { id: 'members',        label: 'Members',          to: '/app/members',           icon: 'Users'           },
    { id: 'announcements',  label: 'Announcements',    to: '/app/announcements',     icon: 'Megaphone'       },
    { id: 'blogs',          label: 'Blogs',            to: '/app/blogs',             icon: 'PenLine'         },
    { id: 'gallery',        label: 'Gallery',          to: '/app/gallery',           icon: 'Images'          },
    { id: 'leaderboard',    label: 'Leaderboard',      to: '/app/leaderboard',       icon: 'Trophy'          },
    { id: 'badges',         label: 'Badges',           to: '/app/badges',            icon: 'Award'           },
    { id: 'profile',        label: 'Profile',          to: '/app/profile',           icon: 'UserRound'       },
    { id: 'settings',       label: 'Settings',         to: '/app/settings',          icon: 'Settings'        },
  ],
  faculty: [
    { id: 'dashboard',   label: 'Dashboard',   to: '/app/faculty',         icon: 'LayoutDashboard' },
    { id: 'planner',     label: 'Planner',     to: '/app/planner',         icon: 'CalendarDays'    },
    { id: 'polls',       label: 'Polls',       to: '/app/polls',           icon: 'ClipboardList'   },
    { id: 'projects',    label: 'Projects',    to: '/app/projects',         icon: 'FolderKanban'    },
    { id: 'approvals',   label: 'Approvals',   to: '/app/approvals',       icon: 'CheckSquare'     },
    { id: 'analytics',   label: 'Analytics',   to: '/app/analytics',       icon: 'BarChart3'       },
    { id: 'reports',     label: 'Reports',     to: '/app/reports',         icon: 'FileText'        },
    { id: 'clubs',       label: 'Clubs',       to: '/app/clubs',           icon: 'Layers'          },
    { id: 'members',     label: 'Members',     to: '/app/members',         icon: 'Users'           },
    { id: 'announcements', label: 'Announcements', to: '/app/announcements', icon: 'Megaphone'       },
    
    { id: 'settings',    label: 'Settings',    to: '/app/settings',        icon: 'Settings'        },
  ],
};

// Fallback for pages that don't need role-specific nav
export const NAV_ITEMS: NavItem[] = NAV_ITEMS_BY_ROLE.member;

export const SUPPORT_EMAIL = 'support@campusos.app';

export const LANDING_STATS = [
  { value: '40+',  label: 'Active Clubs'     },
  { value: '2.4k', label: 'Members'          },
  { value: '180+', label: 'Events Per Year'  },
  { value: '98%',  label: 'Satisfaction'     },
];
