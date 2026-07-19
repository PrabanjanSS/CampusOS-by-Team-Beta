import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { ToastViewport } from './components/ui/Toast';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { AppLayout } from './layouts/AppLayout';

// Pages
import Landing from './pages/Landing';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import ForgotPassword from './pages/auth/ForgotPassword';

// Dashboards
import Dashboard from './pages/dashboard/Dashboard';
import { MemberDashboard, LeadDashboard, FacultyDashboard } from './pages/dashboard/Dashboard';

// Shared app pages
import EventsPage from './pages/dashboard/EventsPage';
import ProjectsPage from './pages/dashboard/ProjectsPage';
import ProjectDetailsPage from './pages/dashboard/ProjectDetailsPage';
import BadgesPage from './pages/dashboard/BadgesPage';
import BlogsPage from './pages/dashboard/BlogsPage';
import GalleryPage from './pages/dashboard/GalleryPage';
import LeaderboardPage from './pages/dashboard/LeaderboardPage';
import AnnouncementsPage from './pages/dashboard/AnnouncementsPage';
import ProfilePage from './pages/dashboard/ProfilePage';
import SettingsPage from './pages/dashboard/SettingsPage';
import ApprovalsPage from './pages/dashboard/ApprovalsPage';
import AnalyticsPage from './pages/dashboard/AnalyticsPage';
import ReportsPage from './pages/dashboard/ReportsPage';
import ClubsPage from './pages/dashboard/ClubsPage';
import MembersPage from './pages/dashboard/MembersPage';

// Planner & Polls Pages
import CampusPlanner from './pages/planner/CampusPlanner';
import PollsPage from './pages/polls/PollsPage';

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            {/* ── Public ───────────────────────────────── */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LoginPage role="member" />} />
            <Route path="/login/member"  element={<LoginPage role="member"  />} />
            <Route path="/login/lead"    element={<LoginPage role="lead"    />} />
            <Route path="/login/faculty" element={<LoginPage role="faculty" />} />
            <Route path="/signup"  element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* ── Legacy role redirect helpers ─────────── */}
            <Route path="/member/dashboard"  element={<ProtectedRoute><Navigate to="/app/member"  replace /></ProtectedRoute>} />
            <Route path="/lead/dashboard"    element={<ProtectedRoute><Navigate to="/app/lead"    replace /></ProtectedRoute>} />
            <Route path="/faculty/dashboard" element={<ProtectedRoute><Navigate to="/app/faculty" replace /></ProtectedRoute>} />

            {/* ── Protected App shell ───────────────────── */}
            <Route path="/app" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
              {/* Default → role-aware redirect */}
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />

              {/* Role-specific dashboards */}
              <Route path="member"  element={<MemberDashboard  />} />
              <Route path="lead"    element={<LeadDashboard    />} />
              <Route path="faculty" element={<FacultyDashboard />} />

              {/* Shared pages */}
              <Route path="events"        element={<EventsPage       />} />
              <Route path="projects"      element={<ProjectsPage     />} />
              <Route path="projects/:id"  element={<ProjectDetailsPage />} />
              <Route path="blogs"         element={<BlogsPage        />} />
              <Route path="gallery"       element={<GalleryPage      />} />
              <Route path="leaderboard"   element={<LeaderboardPage  />} />
              <Route path="badges"        element={<BadgesPage       />} />
              <Route path="announcements" element={<AnnouncementsPage/>} />
              <Route path="profile"       element={<ProfilePage      />} />
              <Route path="settings"      element={<SettingsPage     />} />
              <Route path="planner"       element={<CampusPlanner    />} />
              <Route path="polls"         element={<PollsPage        />} />

              {/* Faculty-only routes */}
              <Route path="approvals"  element={<ApprovalsPage />} />
              <Route path="analytics"  element={<AnalyticsPage />} />
              <Route path="reports"    element={<ReportsPage />} />
              <Route path="clubs"      element={<ClubsPage />} />
              <Route path="members"    element={<MembersPage />} />
            </Route>

            {/* ── Catch-all ─────────────────────────────── */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <ToastViewport />
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}
