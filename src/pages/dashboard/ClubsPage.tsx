import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Users, CalendarDays, AlertCircle } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { SearchBar } from '../../components/ui/SearchBar';
import { FadeIn, StaggerGroup, StaggerItem } from '../../components/ui/motion';
import { useToast } from '../../context/ToastContext';
import { mockClubOverviews } from '../../utils/mockData';

export default function ClubsPage() {
  const { toast } = useToast();
  const [query, setQuery] = useState('');
  const [filterDept, setFilterDept] = useState('All');

  const filtered = mockClubOverviews.filter((club) => {
    const matchesQuery = club.name.toLowerCase().includes(query.toLowerCase()) || club.lead.toLowerCase().includes(query.toLowerCase());
    const matchesDept = filterDept === 'All' || club.department === filterDept;
    return matchesQuery && matchesDept;
  });

  const depts = ['All', ...Array.from(new Set(mockClubOverviews.map((c) => c.department)))];

  const handleViewDetails = (name: string) => {
    toast({
      title: `${name} Details`,
      description: `Viewing detailed logs and structure for ${name}.`,
      variant: 'info',
    });
  };

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">Overseen Clubs</h1>
            <p className="mt-1 text-sm text-ink-soft">Monitor performance and coordination metrics for your campus clubs.</p>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.08}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center justify-between">
          <SearchBar value={query} onChange={setQuery} placeholder="Search clubs or leads…" className="sm:max-w-xs" />
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {depts.map((dept) => (
              <button
                key={dept}
                onClick={() => setFilterDept(dept)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-all ${
                  filterDept === dept
                    ? 'bg-navy text-white shadow-sm'
                    : 'bg-white text-ink-soft border border-border-soft hover:bg-cream-100/50'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
      </FadeIn>

      <StaggerGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.length > 0 ? (
          filtered.map((club, i) => (
            <StaggerItem key={club.id}>
              <motion.div
                whileHover={{ y: -5 }}
                onClick={() => handleViewDetails(club.name)}
                className="card-surface p-5 flex flex-col justify-between h-full transition-all hover:shadow-lift cursor-pointer"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy/10 text-navy">
                      <Layers className="h-5.5 w-5.5" />
                    </span>
                    <Badge tone={club.status === 'active' ? 'success' : 'warning'}>{club.status}</Badge>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-ink">{club.name}</h3>
                  <p className="mt-1 text-xs text-ink-soft">Lead: <span className="font-semibold text-ink">{club.lead}</span></p>
                  <p className="text-[0.68rem] text-ink-soft mt-0.5">Department: {club.department}</p>
                </div>

                <div className="mt-5 space-y-4">
                  {/* Progress bar */}
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-ink-soft">Performance</span>
                      <span className="font-semibold text-navy">{club.performance}%</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-beige">
                      <motion.div
                        className={`h-full rounded-full ${club.performance >= 85 ? 'bg-success' : club.performance >= 70 ? 'bg-navy' : 'bg-warning'}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${club.performance}%` }}
                        transition={{ delay: 0.15 + i * 0.05, duration: 0.7 }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-border-soft pt-3 text-xs text-ink-soft">
                    <span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {club.members} members</span>
                    <span className="inline-flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" /> {club.eventsThisMonth} events/mo</span>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border-soft p-12 text-center bg-white/50 col-span-3">
            <AlertCircle className="h-8 w-8 text-ink-soft/40" />
            <p className="mt-2 text-sm font-semibold text-ink">No clubs found</p>
            <p className="text-xs text-ink-soft">Try selecting a different department filter or modifying search terms.</p>
          </div>
        )}
      </StaggerGroup>
    </div>
  );
}
