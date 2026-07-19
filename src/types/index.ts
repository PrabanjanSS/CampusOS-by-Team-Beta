export type Role = 'member' | 'lead' | 'faculty';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  department: string;
  year: string;
  club?: string;
  avatarUrl?: string;
  bio?: string;
  coverTheme?: 'navy' | 'violet' | 'emerald' | 'sunset' | 'tech' | 'design' | 'campus' | 'abstract';
  coverImage?: string;
  skills?: string[];
  achievements?: Achievement[];
  badges?: Badge[];
  certificates?: Certificate[];
  // Lead-specific
  teamSize?: number;
  // Faculty-specific
  designation?: string;
  overseesClubs?: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  icon?: string;
}

export interface Badge {
  id: string;
  label: string;
  color: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
}

export interface AuthSession {
  token: string;
  user: User;
}

export interface LoginPayload {
  email: string;
  password: string;
  role: Role;
  remember?: boolean;
}

export interface RegisterPayload {
  name: string;
  email: string;
  department: string;
  year: string;
  password: string;
  role: Role;
}

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  variant: 'success' | 'error' | 'warning' | 'info';
}

export interface NavItem {
  id: string;
  label: string;
  to: string;
  icon: string;
}

export interface StatCard {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  delta?: number;
  icon: string;
  accent: 'navy' | 'success' | 'warning' | 'sand';
}

export interface DashboardEvent {
  id: string;
  title: string;
  time: string;
  location: string;
  category: string;
  attendees: number;
}

export interface TimelineEntry {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'event' | 'project' | 'announcement' | 'meeting';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  progress: number;
  members: number;
  status: 'active' | 'review' | 'completed' | 'planning';
  dueDate: string;
  tag: string;
}

export interface Meeting {
  id: string;
  title: string;
  time: string;
  with: string;
  duration: string;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  author: string;
  date: string;
  priority: 'high' | 'normal' | 'low';
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  variant: 'info' | 'success' | 'warning';
}

export interface CalendarDay {
  day: number;
  events: number;
  isToday: boolean;
  inMonth: boolean;
}

// Lead-specific types
export interface ClubMember {
  id: string;
  name: string;
  role: string;
  department: string;
  joinedDate: string;
  avatarUrl?: string;
  points: number;
  status: 'active' | 'inactive';
}

export interface PendingApproval {
  id: string;
  type: 'event' | 'budget' | 'project' | 'member';
  title: string;
  submittedBy: string;
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

// Faculty-specific types
export interface ClubOverview {
  id: string;
  name: string;
  lead: string;
  members: number;
  eventsThisMonth: number;
  status: 'active' | 'inactive' | 'pending';
  department: string;
  performance: number;
}

export interface ReportItem {
  id: string;
  title: string;
  club: string;
  type: 'monthly' | 'event' | 'budget' | 'activity';
  date: string;
  status: 'submitted' | 'reviewed' | 'approved';
}

