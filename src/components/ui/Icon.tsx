import {
  LayoutDashboard, CalendarDays, FolderKanban, PenLine, Images, Trophy, Megaphone,
  UserRound, Settings, Users, LogOut, Bell, Search, Menu, ChevronLeft, ChevronRight,
  Sparkles, GraduationCap, ShieldCheck, Crown, Mail, Lock, Eye, EyeOff, ArrowRight,
  ArrowLeft, Check, X, ChevronDown, Plus, Clock, MapPin, TrendingUp, Activity, Star,
  Award, Target, Zap, Heart, MessageSquare, Share2, MoreHorizontal, Filter, Download,
  Upload, Edit3, Trash2, ExternalLink, CheckCircle2, AlertCircle, AlertTriangle, Info,
  Github, Twitter, Linkedin, Dribbble, Loader2, Circle, Sun, Moon, PanelLeftClose,
  PanelLeft, BookOpen, Rocket, BarChart3, FileText, Layers, CheckSquare, TrendingDown,
  PartyPopper, ClipboardList,
  type LucideProps,
} from 'lucide-react';
import type { ComponentType } from 'react';

const map: Record<string, ComponentType<LucideProps>> = {
  LayoutDashboard, CalendarDays, FolderKanban, PenLine, Images, Trophy, Megaphone,
  UserRound, Settings, Users, LogOut, Bell, Search, Menu, ChevronLeft, ChevronRight,
  Sparkles, GraduationCap, ShieldCheck, Crown, Mail, Lock, Eye, EyeOff, ArrowRight,
  ArrowLeft, Check, X, ChevronDown, Plus, Clock, MapPin, TrendingUp, Activity, Star,
  Award, Target, Zap, Heart, MessageSquare, Share2, MoreHorizontal, Filter, Download,
  Upload, Edit3, Trash2, ExternalLink, CheckCircle2, AlertCircle, AlertTriangle, Info,
  Github, Twitter, Linkedin, Dribbble, Loader2, Circle, Sun, Moon, PanelLeftClose,
  PanelLeft, BookOpen, Rocket, BarChart3, FileText, Layers, CheckSquare, TrendingDown,
  PartyPopper, ClipboardList,
};

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = map[name] ?? Circle;
  return <Cmp {...props} />;
}
