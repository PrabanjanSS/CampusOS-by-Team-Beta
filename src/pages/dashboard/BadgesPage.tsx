import { motion } from 'framer-motion';
import { Award, Lock, CheckCircle2, Star } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/ui/Card';
import { FadeIn, StaggerGroup, StaggerItem } from '../../components/ui/motion';

interface SystemBadge {
  id: string;
  label: string;
  color: string;
  description: string;
  requirement: string;
}

const ALL_SYSTEM_BADGES: SystemBadge[] = [
  { id: 'b1',  label: 'Active Member',     color: '#19376D', description: 'Participate actively in campus activities.', requirement: 'Register and attend 5+ events' },
  { id: 'b2',  label: 'Event Enthusiast',  color: '#DCC5A5', description: 'Show great interest in campus workshops.', requirement: 'Register and attend 10+ events' },
  { id: 'b3',  label: 'Code Contributor',  color: '#22C55E', description: 'Develop code for open-source club projects.', requirement: 'Contribute to at least 1 club project' },
  { id: 'b4',  label: 'Top Contributor',   color: '#3B82F6', description: 'Achieve outstanding status in points.', requirement: 'Reach the top 3 on the leaderboard' },
  { id: 'b5',  label: 'Event Organizer',   color: '#EC4899', description: 'Host or coordinate a club event.', requirement: 'Host or coordinate at least 1 event' },
  { id: 'b6',  label: 'Mentor',            color: '#8B5CF6', description: 'Mentor other students in technical workshops.', requirement: 'Lead or mentor a workshop session' },
  { id: 'b7',  label: 'Hackathon Winner',  color: '#F59E0B', description: 'Win 1st place in a hackathon.', requirement: 'Win 1st place in a hackathon' },
  { id: 'b8',  label: 'Wordsmith',         color: '#EF4444', description: 'Write helpful blogs for the campus portal.', requirement: 'Publish 3+ blog posts on the portal' },
  { id: 'b9',  label: 'Bug Hunter',        color: '#06B6D4', description: 'Find and report critical codebase issues.', requirement: 'Report 3+ verified platform bugs' },
  { id: 'b10', label: 'Social Lite',       color: '#F43F5E', description: 'Engage heavily with community gallery moments.', requirement: 'Post 5+ gallery moments' },
  { id: 'b11', label: 'Pixel Perfect',     color: '#10B981', description: 'Deliver outstanding user interface assets.', requirement: 'Contribute UI layouts to 2+ projects' },
  { id: 'b12', label: 'PR Champion',       color: '#6366F1', description: 'Promote club activities across the campus.', requirement: 'Publish 2+ announcements or newsletters' },
  { id: 'b13', label: 'Night Owl',         color: '#475569', description: 'Commit code during late night cycles.', requirement: 'Submit 5+ commits between 12 AM and 5 AM' },
  { id: 'b14', label: 'Team Player',       color: '#84CC16', description: 'Collaborate with teams on cross-club efforts.', requirement: 'Collaborate on a cross-club initiative' },
  { id: 'b15', label: 'Tech Speaker',      color: '#EAB308', description: 'Deliver technical talks or seminars.', requirement: 'Deliver 1+ seminar or tech presentation' },
  { id: 'b16', label: 'Legendary',         color: '#D946EF', description: 'Achieve legendary status in the portal.', requirement: 'Collect 10+ badges and earn 2,000+ points' },
];

export default function BadgesPage() {
  const { user } = useAuth();

  // Get user's earned badges
  const earnedLabels = user?.badges?.map((b) => b.label) || [];

  const earnedCount = ALL_SYSTEM_BADGES.filter((b) => earnedLabels.includes(b.label)).length;
  const progressPercent = Math.round((earnedCount / ALL_SYSTEM_BADGES.length) * 100);

  return (
    <div className="space-y-8">
      {/* Header */}
      <FadeIn>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">Badges Collection</h1>
            <p className="mt-1 text-sm text-ink-soft">Track achievements and learn how to collect all badges.</p>
          </div>
        </div>
      </FadeIn>

      {/* Progress Card */}
      <FadeIn delay={0.08}>
        <Card className="p-6 bg-gradient-to-br from-white via-white to-cream-100/35 border-border-soft shadow-soft">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy/10 text-navy shadow-inner">
                <Star className="h-6 w-6" />
              </span>
              <div>
                <h2 className="text-lg font-bold text-ink">Your Collection Status</h2>
                <p className="text-sm text-ink-soft">You have unlocked {earnedCount} of {ALL_SYSTEM_BADGES.length} badges.</p>
              </div>
            </div>

            <div className="flex-1 max-w-md space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-ink">
                <span>Progress</span>
                <span>{progressPercent}%</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-beige">
                <motion.div
                  className="h-full rounded-full bg-navy"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
            </div>
          </div>
        </Card>
      </FadeIn>

      {/* Grid of Badges */}
      <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {ALL_SYSTEM_BADGES.map((badge) => {
          const isEarned = earnedLabels.includes(badge.label);

          return (
            <StaggerItem key={badge.id}>
              <motion.div
                whileHover={isEarned ? { y: -6 } : {}}
                className={`card-surface p-6 flex flex-col justify-between h-full transition-all duration-300 ${
                  isEarned
                    ? 'border-border-soft bg-white hover:shadow-lift'
                    : 'border-dashed border-border-soft/60 bg-cream-100/20 grayscale opacity-60 select-none'
                }`}
              >
                <div className="space-y-4">
                  {/* Badge Icon Header */}
                  <div className="flex items-center justify-between">
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-full text-white shadow-soft"
                      style={{ backgroundColor: badge.color }}
                    >
                      <Award className="h-5.5 w-5.5" />
                    </span>

                    {isEarned ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-success bg-success/10 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="h-3 w-3" /> Unlocked
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-ink-soft/75 bg-beige px-2 py-0.5 rounded-full">
                        <Lock className="h-3 w-3" /> Locked
                      </span>
                    )}
                  </div>

                  {/* Title and descriptions */}
                  <div>
                    <h3 className="text-base font-bold text-ink">{badge.label}</h3>
                    <p className="mt-1 text-xs text-ink-soft leading-relaxed min-h-[32px]">
                      {badge.description}
                    </p>
                  </div>
                </div>

                {/* Requirements */}
                <div className="mt-6 border-t border-border-soft/60 pt-4">
                  <span className="text-[10px] font-bold tracking-wider text-ink-soft/80 uppercase">How to Earn</span>
                  <p className="mt-1 text-xs font-semibold text-navy/90">{badge.requirement}</p>
                </div>
              </motion.div>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </div>
  );
}
