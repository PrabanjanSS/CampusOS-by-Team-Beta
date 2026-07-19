import type {
  StatCard,
  DashboardEvent,
  TimelineEntry,
  Project,
  Meeting,
  Announcement,
  NotificationItem,
  CalendarDay,
  User,
  ClubMember,
  PendingApproval,
  ClubOverview,
  ReportItem,
} from '../types';

// ─── Shared ──────────────────────────────────────────────────────────────────

export const mockStats: StatCard[] = [
  { id: 's1', label: 'Active Members',    value: 248,  delta: 12, icon: 'Users',        accent: 'navy'    },
  { id: 's2', label: 'Events This Month', value: 18,   delta: 4,  icon: 'CalendarDays', accent: 'sand'    },
  { id: 's3', label: 'Projects Live',     value: 9,    delta: 2,  icon: 'FolderKanban', accent: 'success' },
  { id: 's4', label: 'Club Points',       value: 1740, suffix: 'pts', delta: 8, icon: 'Trophy', accent: 'warning' },
];

export const mockTodayEvents: DashboardEvent[] = [
  { id: 'e1', title: 'Hackathon Kickoff',    time: '10:00 AM', location: 'Auditorium A',   category: 'Workshop', attendees: 120 },
  { id: 'e2', title: 'Design Systems Talk',  time: '2:00 PM',  location: 'Room 204',       category: 'Talk',     attendees: 45  },
  { id: 'e3', title: 'Robotics Lab Session', time: '4:30 PM',  location: 'Innovation Lab', category: 'Hands-on', attendees: 28  },
];

export const mockTimeline: TimelineEntry[] = [
  { id: 't1', title: 'Published new blog post',     description: '"Designing for Student Communities" is now live.',    time: '2h ago', type: 'announcement' },
  { id: 't2', title: 'Project "Aurora" reached 70%', description: 'Progress milestone hit by the frontend squad.',        time: '5h ago', type: 'project'      },
  { id: 't3', title: 'New event scheduled',          description: 'AI Workshop scheduled for Friday at 3 PM.',            time: '1d ago', type: 'event'        },
  { id: 't4', title: 'Weekly sync completed',        description: 'Leads reviewed roadmap and assigned tasks.',           time: '2d ago', type: 'meeting'      },
];

export const mockProjects: Project[] = [
  { id: 'p1', name: 'Aurora Design System',  description: 'Unified component library for all club apps.',          progress: 72, members: 6, status: 'active',   dueDate: 'Aug 12', tag: 'Design'      },
  { id: 'p2', name: 'Hackathon Portal',       description: 'Registration, judging, and leaderboard platform.',     progress: 45, members: 8, status: 'active',   dueDate: 'Sep 03', tag: 'Engineering' },
  { id: 'p3', name: 'Club Newsletter',        description: 'Monthly digest of achievements and events.',          progress: 90, members: 3, status: 'review',   dueDate: 'Jul 28', tag: 'Content'     },
  { id: 'p4', name: 'Mentor Match',           description: 'Pairing juniors with senior mentors.',               progress: 20, members: 4, status: 'planning', dueDate: 'Oct 01', tag: 'Community'   },
];

export const mockMeetings: Meeting[] = [
  { id: 'm1', title: 'Leads Standup',   time: '9:00 AM',  with: 'Core Team',    duration: '15 min' },
  { id: 'm2', title: 'Faculty Review',  time: '11:30 AM', with: 'Dr. Arora',    duration: '30 min' },
  { id: 'm3', title: 'Design Critique', time: '3:00 PM',  with: 'Design Squad', duration: '45 min' },
];

export const mockAnnouncements: Announcement[] = [
  { id: 'a1', title: 'Inter-club Hackathon Registrations Open', body: 'Form teams of 4 and register before the deadline to participate in the 36-hour hackathon.', author: 'Club Lead', date: '2h ago',  priority: 'high'   },
  { id: 'a2', title: 'Monthly Budget Report Published',          body: 'Q2 spending report is available for review in the finance section.',                       author: 'Treasurer', date: '1d ago', priority: 'normal' },
  { id: 'a3', title: 'New Gallery Photos Added',                 body: 'Photos from the cultural night are now in the gallery.',                                  author: 'Media Team', date: '3d ago', priority: 'low'    },
];

export const mockNotifications: NotificationItem[] = [
  { id: 'n1', title: 'Event reminder',        description: 'Hackathon Kickoff starts in 30 minutes.',              time: '10m ago', read: false, variant: 'info'    },
  { id: 'n2', title: 'Mentioned in project',  description: 'Aarav mentioned you in "Aurora Design System".',      time: '1h ago',  read: false, variant: 'info'    },
  { id: 'n3', title: 'Achievement unlocked',  description: 'You earned the "Top Contributor" badge.',              time: '3h ago',  read: true,  variant: 'success' },
  { id: 'n4', title: 'Pending approval',      description: 'Budget request awaiting coordinator approval.',        time: '1d ago',  read: true,  variant: 'warning' },
];

export function buildMockCalendar(eventsList?: any[]): CalendarDay[] {
  const days: CalendarDay[] = [];
  const today = new Date().getDate();
  const offset = 2; // Tuesday start

  const eventDays: number[] = [];
  if (eventsList) {
    eventsList.forEach((e) => {
      const parts = e.date.split(' ');
      if (parts.length === 2) {
        const dayNum = parseInt(parts[1], 10);
        if (!isNaN(dayNum)) eventDays.push(dayNum);
      }
    });
  } else {
    eventDays.push(12, 18, 25, 28);
  }

  for (let i = 0; i < offset; i++) days.push({ day: 0, events: 0, isToday: false, inMonth: false });
  for (let d = 1; d <= 31; d++) {
    days.push({
      day: d,
      events: eventDays.includes(d) ? 1 : 0,
      isToday: d === today,
      inMonth: true,
    });
  }
  return days;
}

// ─── Mock Users ──────────────────────────────────────────────────────────────

export const mockMemberUser: User = {
  id: 'u_member',
  name: 'Priya Sharma',
  email: 'priya.sharma@campusos.app',
  role: 'member',
  department: 'Computer Science',
  year: '2nd Year',
  club: 'Developers Club',
  bio: 'Frontend developer and open-source contributor. Passionate about building tools that make learning accessible for everyone.',
  avatarUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=256&h=256&fit=crop',
  skills: ['React', 'TypeScript', 'Figma', 'Python', 'Git'],
  achievements: [
    { id: 'ac1', title: 'Best Project Award',    description: 'Won best project at InnovateFest.',             date: '2025-04-22' },
    { id: 'ac2', title: 'Active Contributor',    description: 'Contributed to 5+ open-source club projects.', date: '2025-03-10' },
  ],
  badges: [
    { id: 'b1', label: 'Active Member',     color: '#19376D' },
    { id: 'b2', label: 'Event Enthusiast',  color: '#DCC5A5' },
    { id: 'b3', label: 'Code Contributor',  color: '#22C55E' },
  ],
  certificates: [
    { id: 'c1', title: 'React Fundamentals', issuer: 'CampusOS Academy', date: '2025-01-15' },
  ],
};

export const mockLeadUser: User = {
  id: 'u_lead',
  name: 'Aarav Mehta',
  email: 'aarav.mehta@campusos.app',
  role: 'lead',
  department: 'Computer Science',
  year: '3rd Year',
  club: 'Developers Club',
  bio: 'Full-stack tinkerer and design enthusiast. Leading the Developers Club to ship student-built products that outlast a semester.',
  avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=256&h=256&fit=crop',
  skills: ['React', 'TypeScript', 'UI/UX', 'Node.js', 'Figma', 'Public Speaking'],
  teamSize: 24,
  achievements: [
    { id: 'ac1', title: 'Won Inter-University Hackathon', description: '1st place out of 64 teams.',          date: '2025-03-14' },
    { id: 'ac2', title: 'Organized 500+ attendee tech fest', description: 'Led logistics for InnovateFest.', date: '2025-04-22' },
    { id: 'ac3', title: 'Published 8 technical blogs',     description: 'Series on design systems and DX.',  date: '2025-05-10' },
  ],
  badges: [
    { id: 'b1', label: 'Top Contributor',   color: '#19376D' },
    { id: 'b2', label: 'Event Organizer',   color: '#DCC5A5' },
    { id: 'b3', label: 'Mentor',            color: '#22C55E' },
    { id: 'b4', label: 'Hackathon Winner',  color: '#F59E0B' },
  ],
  certificates: [
    { id: 'c1', title: 'Advanced React Patterns', issuer: 'Frontend Masters', date: '2025-02-01' },
    { id: 'c2', title: 'UX Research Foundations', issuer: 'NN/g',             date: '2025-04-15' },
  ],
};

export const mockFacultyUser: User = {
  id: 'u_faculty',
  name: 'Dr. Meera Arora',
  email: 'meera.arora@campusos.app',
  role: 'faculty',
  department: 'Computer Science',
  year: 'Faculty',
  designation: 'Associate Professor & Club Coordinator',
  overseesClubs: ['Developers Club', 'Design Club', 'Robotics Club', 'Debate Society'],
  avatarUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=256&h=256&fit=crop',
  bio: 'Associate Professor with a passion for fostering student innovation. Overseeing 4 clubs with 240+ active members.',
  skills: ['Research', 'Mentorship', 'Project Management', 'Technical Writing'],
};

// Backwards-compatible default export used by existing pages
export const mockUser = mockLeadUser;

// ─── Member-specific mock data ───────────────────────────────────────────────

export const mockMyRegisteredEvents: DashboardEvent[] = [
  { id: 're1', title: 'AI/ML Guest Lecture',   time: 'Aug 02 · 11:00 AM', location: 'Seminar Hall',  category: 'Talk',     attendees: 180 },
  { id: 're2', title: 'Design Systems Workshop', time: 'Jul 28 · 2:00 PM', location: 'Design Studio', category: 'Workshop', attendees: 45  },
];

export const mockMemberStats: StatCard[] = [
  { id: 'ms1', label: 'Events Attended',    value: 14,  delta: 3,  icon: 'CalendarDays', accent: 'navy'    },
  { id: 'ms2', label: 'Leaderboard Rank',   value: 7,              icon: 'Trophy',       accent: 'warning' },
  { id: 'ms3', label: 'Club Points',        value: 980, suffix: 'pts', delta: 5, icon: 'Star', accent: 'sand' },
  { id: 'ms4', label: 'Certificates',       value: 3,              icon: 'Award',        accent: 'success' },
];

// ─── Lead-specific mock data ─────────────────────────────────────────────────

export const mockLeadStats: StatCard[] = [
  { id: 'ls1', label: 'Team Members',       value: 24,  delta: 3,  icon: 'Users',        accent: 'navy'    },
  { id: 'ls2', label: 'Active Projects',    value: 4,   delta: 1,  icon: 'FolderKanban', accent: 'success' },
  { id: 'ls3', label: 'Events This Month',  value: 6,   delta: 2,  icon: 'CalendarDays', accent: 'sand'    },
  { id: 'ls4', label: 'Pending Approvals',  value: 3,              icon: 'Clock',        accent: 'warning' },
];

export const mockClubMembers: ClubMember[] = [
  { id: 'cm1', name: 'Priya Sharma',   role: 'Frontend Dev',    department: 'CS',      joinedDate: 'Jan 2025', points: 980,  status: 'active', avatarUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&fit=crop' },
  { id: 'cm2', name: 'Rohan Gupta',    role: 'Backend Dev',     department: 'CS',      joinedDate: 'Jan 2025', points: 860,  status: 'active', avatarUrl: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&fit=crop'     },
  { id: 'cm3', name: 'Diya Patel',     role: 'UI Designer',     department: 'Design',  joinedDate: 'Feb 2025', points: 740,  status: 'active', avatarUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&fit=crop'   },
  { id: 'cm4', name: 'Kabir Nair',     role: 'DevOps',          department: 'CS',      joinedDate: 'Mar 2025', points: 620,  status: 'active', avatarUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&fit=crop' },
  { id: 'cm5', name: 'Sara Khan',      role: 'Content Writer',  department: 'English', joinedDate: 'Feb 2025', points: 510,  status: 'active', avatarUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&fit=crop' },
];

export const mockPendingApprovals: PendingApproval[] = [
  { id: 'pa1', type: 'event',  title: 'Inter-Club Hackathon',    submittedBy: 'Aarav Mehta',  submittedDate: '2d ago', status: 'pending' },
  { id: 'pa2', type: 'budget', title: 'Q3 Equipment Budget',     submittedBy: 'Aarav Mehta',  submittedDate: '3d ago', status: 'pending' },
  { id: 'pa3', type: 'project', title: 'Open Source Initiative', submittedBy: 'Rohan Gupta', submittedDate: '5d ago', status: 'pending' },
];

export const mockRecentRegistrations: { name: string; event: string; time: string; avatarUrl?: string }[] = [
  { name: 'Ananya Reddy', event: 'Hackathon Kickoff',    time: '10m ago', avatarUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&fit=crop' },
  { name: 'Vikram Pai',   event: 'Design Systems Talk',  time: '25m ago', avatarUrl: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&fit=crop' },
  { name: 'Meera Joshi',  event: 'Robotics Lab Session', time: '1h ago',  avatarUrl: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&fit=crop' },
];

// ─── Faculty-specific mock data ───────────────────────────────────────────────

export const mockFacultyStats: StatCard[] = [
  { id: 'fs1', label: 'Active Clubs',       value: 12,   delta: 2,  icon: 'Layers',       accent: 'navy'    },
  { id: 'fs2', label: 'Total Members',      value: 486,  delta: 34, icon: 'Users',        accent: 'success' },
  { id: 'fs3', label: 'Pending Approvals',  value: 7,              icon: 'Clock',        accent: 'warning' },
  { id: 'fs4', label: 'Events This Month',  value: 23,   delta: 5,  icon: 'CalendarDays', accent: 'sand'    },
];

export const mockClubOverviews: ClubOverview[] = [
  { id: 'co1', name: 'Developers Club',  lead: 'Aarav Mehta',    members: 48, eventsThisMonth: 5, status: 'active',  department: 'CS',      performance: 92 },
  { id: 'co2', name: 'Design Club',      lead: 'Diya Sharma',    members: 32, eventsThisMonth: 3, status: 'active',  department: 'Design',  performance: 87 },
  { id: 'co3', name: 'Robotics Club',    lead: 'Kabir Nair',     members: 40, eventsThisMonth: 4, status: 'active',  department: 'ECE',     performance: 78 },
  { id: 'co4', name: 'Debate Society',   lead: 'Vikram Pai',     members: 28, eventsThisMonth: 2, status: 'active',  department: 'Arts',    performance: 83 },
  { id: 'co5', name: 'Music Club',       lead: 'Ananya Reddy',   members: 35, eventsThisMonth: 1, status: 'active',  department: 'Arts',    performance: 71 },
  { id: 'co6', name: 'Photography Club', lead: 'Sara Khan',      members: 22, eventsThisMonth: 2, status: 'pending', department: 'Design',  performance: 65 },
];

export const mockReports: ReportItem[] = [
  { id: 'r1', title: 'Developers Club Monthly Report',  club: 'Developers Club',  type: 'monthly', date: 'Jul 01', status: 'approved'  },
  { id: 'r2', title: 'InnovateFest Event Report',       club: 'Developers Club',  type: 'event',   date: 'Jun 28', status: 'reviewed'  },
  { id: 'r3', title: 'Q2 Budget Report',                club: 'Design Club',      type: 'budget',  date: 'Jun 30', status: 'submitted' },
  { id: 'r4', title: 'Robotics Showcase Activity Log',  club: 'Robotics Club',    type: 'activity', date: 'Jun 25', status: 'submitted' },
];

export const mockFacultyTimeline: TimelineEntry[] = [
  { id: 'ft1', title: 'Approved Hackathon event',       description: 'Inter-Club Hackathon approved for July 25.',           time: '1h ago',  type: 'event'        },
  { id: 'ft2', title: 'New club proposal received',     description: 'Photography Club submitted for approval.',             time: '4h ago',  type: 'announcement' },
  { id: 'ft3', title: 'Budget request reviewed',        description: 'Developers Club Q3 equipment budget under review.',    time: '1d ago',  type: 'project'      },
  { id: 'ft4', title: 'Monthly reports deadline',       description: 'All clubs must submit by end of month.',              time: '2d ago',  type: 'meeting'      },
];

// ─── Shared content ───────────────────────────────────────────────────────────

export const mockLeaderboard = [
  { rank: 1, name: 'Aarav Mehta',    club: 'Developers Club',  points: 1740, avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&fit=crop'    },
  { rank: 2, name: 'Diya Sharma',    club: 'Design Club',      points: 1620, avatarUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&fit=crop'    },
  { rank: 3, name: 'Kabir Nair',     club: 'Robotics Club',    points: 1490, avatarUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&fit=crop'   },
  { rank: 4, name: 'Ananya Reddy',   club: 'Developers Club',  points: 1380, avatarUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&fit=crop'    },
  { rank: 5, name: 'Rohan Gupta',    club: 'Robotics Club',    points: 1290, avatarUrl: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&fit=crop'       },
  { rank: 6, name: 'Sara Khan',      club: 'Design Club',      points: 1180, avatarUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&fit=crop'   },
  { rank: 7, name: 'Vikram Pai',     club: 'Debate Society',   points: 1070, avatarUrl: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&fit=crop'   },
  { rank: 8, name: 'Meera Joshi',    club: 'Developers Club',  points: 980,  avatarUrl: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&fit=crop'   },
];

export const mockBlogPosts = [
  { id: 'bl1', title: 'Designing for Student Communities',  author: 'Aarav Mehta',   date: '2h ago',  readTime: '6 min', excerpt: 'How we built a design system that scales across 40+ student clubs without losing soul.',                   cover: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=800'  },
  { id: 'bl2', title: 'Shipping in Semesters',              author: 'Diya Sharma',   date: '1d ago',  readTime: '4 min', excerpt: 'A framework for student projects that survive handoff and graduation.',                                  cover: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'bl3', title: 'The Anatomy of a Great Hackathon',   author: 'Kabir Nair',    date: '3d ago',  readTime: '8 min', excerpt: 'Lessons from running 12 hackathons — what works, what burns out, what to skip.',                       cover: 'https://images.pexels.com/photos/7988079/pexels-photo-7988079.jpeg?auto=compress&cs=tinysrgb&w=800'  },
  { id: 'bl4', title: 'Why Clubs Need Product Managers',    author: 'Ananya Reddy',  date: '5d ago',  readTime: '5 min', excerpt: 'Treating clubs like mini product teams changes everything.',                                            cover: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800'  },
];

export const mockGallery = [
  'https://images.pexels.com/photos/167964/pexels-photo-167964.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/7988079/pexels-photo-7988079.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/5212343/pexels-photo-5212343.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/8145165/pexels-photo-8145165.jpeg?auto=compress&cs=tinysrgb&w=600',
];

export const mockEvents = [
  { id: 'ev1', title: 'Inter-Club Hackathon',     date: 'Jul 25', time: '9:00 AM',  location: 'Main Auditorium', attendees: 320, status: 'upcoming',  tag: 'Competition' },
  { id: 'ev2', title: 'Design Systems Workshop',  date: 'Jul 28', time: '2:00 PM',  location: 'Design Studio',   attendees: 45,  status: 'upcoming',  tag: 'Workshop'    },
  { id: 'ev3', title: 'Robotics Open Lab',         date: 'Jul 18', time: '4:00 PM',  location: 'Innovation Lab',  attendees: 60,  status: 'live',      tag: 'Hands-on'    },
  { id: 'ev4', title: 'Cultural Night',            date: 'Jul 12', time: '6:00 PM',  location: 'Open Air Theatre', attendees: 540, status: 'completed', tag: 'Cultural'    },
  { id: 'ev5', title: 'AI/ML Guest Lecture',       date: 'Aug 02', time: '11:00 AM', location: 'Seminar Hall',    attendees: 180, status: 'upcoming',  tag: 'Talk'        },
];
