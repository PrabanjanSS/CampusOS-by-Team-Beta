import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../utils/constants';
import MemberDashboard from './MemberDashboard';
import LeadDashboard from './LeadDashboard';
import FacultyDashboard from './FacultyDashboard';

// Generic /app/dashboard redirects to the role-specific dashboard.
// The role-specific routes (/app/member, /app/lead, /app/faculty) render directly.
export default function Dashboard() {
  const { user } = useAuth();
  const role = user?.role ?? 'member';
  return <Navigate to={ROLES[role].dashboardPath} replace />;
}

export { MemberDashboard, LeadDashboard, FacultyDashboard };
