import { motion } from 'framer-motion';
import { BarChart3, Users, CalendarDays, Star } from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/Card';
import { FadeIn, StaggerGroup, StaggerItem } from '../../components/ui/motion';
import { useCountUp } from '../../hooks';
import { mockClubOverviews } from '../../utils/mockData';

export default function AnalyticsPage() {
  const activeClubsCount = mockClubOverviews.filter((c) => c.status === 'active').length;
  const totalMembersCount = useCountUp(0, 248, true);
  const savedEventsCount = (() => {
    const saved = localStorage.getItem('campusos_events');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return 37 + parsed.length;
      } catch (e) {
        return 42;
      }
    }
    return 42;
  })();
  const totalEventsCount = useCountUp(0, savedEventsCount, true);
  const totalPoints = useCountUp(0, 12850, true);

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">Analytics</h1>
            <p className="mt-1 text-sm text-ink-soft">Track student engagement, event metrics, and club rankings.</p>
          </div>
        </div>
      </FadeIn>

      {/* Analytics Summary Stats */}
      <StaggerGroup className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Active Clubs', value: activeClubsCount, icon: BarChart3, color: 'bg-navy/10 text-navy' },
          { label: 'Total Members', value: totalMembersCount, icon: Users, color: 'bg-success/12 text-success' },
          { label: 'Events Hosted', value: totalEventsCount, icon: CalendarDays, color: 'bg-sand/30 text-[#8a6d3b]' },
          { label: 'Total Points Awarded', value: `${totalPoints} pts`, icon: Star, color: 'bg-warning/15 text-[#b07314]' },
        ].map((stat) => (
          <StaggerItem key={stat.label}>
            <motion.div whileHover={{ y: -4 }} className="card-surface p-5 transition-shadow hover:shadow-lift">
              <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </span>
              <p className="mt-4 text-2xl font-bold tracking-tight text-ink">{stat.value}</p>
              <p className="text-xs text-ink-soft">{stat.label}</p>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Engagement Trends */}
        <FadeIn delay={0.12} className="md:col-span-2">
          <Card>
            <CardHeader title="Monthly Engagement Trends" subtitle="Event registrations vs. attendance rate" />
            <div className="relative h-60 w-full pt-4">
              <div className="absolute inset-0 flex flex-col justify-between text-[0.625rem] text-ink-soft/40 select-none pointer-events-none">
                {[100, 75, 50, 25, 0].map((val) => (
                  <div key={val} className="flex items-center gap-2 w-full">
                    <span className="w-6 text-right">{val}%</span>
                    <div className="h-px flex-1 bg-border-soft/60" />
                  </div>
                ))}
              </div>
              <div className="absolute inset-x-8 bottom-0 top-4 flex items-end justify-between px-2">
                {[
                  { month: 'Jan', regs: 42, att: 88 },
                  { month: 'Feb', regs: 65, att: 82 },
                  { month: 'Mar', regs: 80, att: 90 },
                  { month: 'Apr', regs: 95, att: 75 },
                  { month: 'May', regs: 110, att: 85 },
                  { month: 'Jun', regs: 140, att: 89 },
                ].map((item, index) => (
                  <div key={item.month} className="flex flex-col items-center gap-2 h-full justify-end">
                    <div className="flex gap-1.5 items-end h-[80%]">
                      {/* Regs bar */}
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${item.regs / 1.6}%` }}
                        transition={{ delay: 0.2 + index * 0.05, duration: 0.6 }}
                        className="w-4 rounded-t-md bg-navy/80 hover:bg-navy transition-colors"
                      />
                      {/* Attendance bar */}
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${item.att}%` }}
                        transition={{ delay: 0.3 + index * 0.05, duration: 0.6 }}
                        className="w-4 rounded-t-md bg-success/80 hover:bg-success transition-colors"
                      />
                    </div>
                    <span className="text-[0.68rem] font-semibold text-ink-soft">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded bg-navy" /> Event Registrations</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded bg-success" /> Attendance Rate (%)</span>
            </div>
          </Card>
        </FadeIn>

        {/* Club Performance Rank */}
        <FadeIn delay={0.16}>
          <Card>
            <CardHeader title="Club Rankings" subtitle="Based on performance score" />
            <div className="space-y-3.5 pt-2">
              {mockClubOverviews
                .sort((a, b) => b.performance - a.performance)
                .slice(0, 4)
                .map((club, idx) => (
                  <div key={club.id} className="flex items-center gap-3">
                    <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                      idx === 0 ? 'bg-warning/20 text-[#b07314]' :
                      idx === 1 ? 'bg-navy/10 text-navy' :
                      'bg-cream-200 text-ink-soft'
                    }`}>
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-xs font-semibold text-ink">{club.name}</p>
                      <p className="text-[0.68rem] text-ink-soft">{club.members} active members</p>
                    </div>
                    <span className="text-xs font-bold text-navy">{club.performance}%</span>
                  </div>
                ))}
            </div>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
