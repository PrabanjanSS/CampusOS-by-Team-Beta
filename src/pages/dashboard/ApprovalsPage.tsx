import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, FileText, CalendarDays, FolderKanban, DollarSign } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { SearchBar } from '../../components/ui/SearchBar';
import { FadeIn, StaggerGroup, StaggerItem } from '../../components/ui/motion';
import { useToast } from '../../context/ToastContext';
import { mockPendingApprovals } from '../../utils/mockData';

const typeIcons = {
  event: CalendarDays,
  budget: DollarSign,
  project: FolderKanban,
  member: FileText,
};

const typeColors = {
  event: 'bg-navy/10 text-navy',
  budget: 'bg-warning/15 text-[#b07314]',
  project: 'bg-success/12 text-success',
  member: 'bg-sand/30 text-[#8a6d3b]',
};

export default function ApprovalsPage() {
  const { toast } = useToast();
  const [approvals, setApprovals] = useState(mockPendingApprovals);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const handleAction = (id: string, action: 'approved' | 'rejected', title: string) => {
    setApprovals((prev) => prev.filter((a) => a.id !== id));
    toast({
      title: action === 'approved' ? 'Request Approved' : 'Request Rejected',
      description: `Successfully ${action} "${title}".`,
      variant: action === 'approved' ? 'success' : 'error',
    });
  };

  const filtered = approvals.filter((a) => {
    const matchesQuery = a.title.toLowerCase().includes(query.toLowerCase()) || a.submittedBy.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === 'all' || a.type === filter;
    return matchesQuery && matchesFilter;
  });

  return (
    <div className="space-y-8">
      <FadeIn>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">Pending Approvals</h1>
            <p className="mt-1.5 text-sm text-ink-soft">Review and approve club proposals for events, budgets, and projects.</p>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.08}>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between py-2">
          <SearchBar value={query} onChange={setQuery} placeholder="Search approvals…" className="w-full md:max-w-sm" />
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {['all', 'event', 'budget', 'project'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`rounded-xl px-4 py-2 text-xs font-semibold capitalize transition-all duration-200 ${
                  filter === type
                    ? 'bg-navy text-white shadow-lift'
                    : 'bg-white text-ink-soft border border-border-soft hover:bg-cream-100/50'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </FadeIn>

      <StaggerGroup className="grid gap-6">
        {filtered.length > 0 ? (
          filtered.map((a) => {
            const Icon = typeIcons[a.type as keyof typeof typeIcons] || FileText;
            const colorClass = typeColors[a.type as keyof typeof typeColors] || 'bg-navy/10 text-navy';
            return (
              <StaggerItem key={a.id}>
                <motion.div
                  whileHover={{ y: -3, scale: 1.005 }}
                  className="flex flex-col gap-4 rounded-2xl border border-border-soft bg-white p-6 sm:flex-row sm:items-center sm:justify-between transition-all duration-200 hover:shadow-lift"
                >
                  <div className="flex items-start gap-4">
                    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${colorClass}`}>
                      <Icon className="h-6 w-6" />
                    </span>
                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="text-sm font-bold text-ink leading-snug">{a.title}</h3>
                        <Badge tone={a.type === 'budget' ? 'warning' : a.type === 'project' ? 'success' : 'navy'}>
                          {a.type}
                        </Badge>
                      </div>
                      <p className="mt-1.5 text-xs text-ink-soft">
                        Submitted by <span className="font-semibold text-ink-soft">{a.submittedBy}</span> · {a.submittedDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:justify-end">
                    <Button
                      variant="secondary"
                      size="sm"
                      leftIcon="Check"
                      onClick={() => handleAction(a.id, 'approved', a.title)}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-danger hover:bg-danger/5 hover:text-danger rounded-xl"
                      onClick={() => handleAction(a.id, 'rejected', a.title)}
                    >
                      Reject
                    </Button>
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })
        ) : (
          <FadeIn>
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border-soft p-12 text-center bg-white/50">
              <AlertCircle className="h-8 w-8 text-ink-soft/40" />
              <p className="mt-2 text-sm font-semibold text-ink">No pending approvals found</p>
              <p className="text-xs text-ink-soft">Check back later or change your search/filter settings.</p>
            </div>
          </FadeIn>
        )}
      </StaggerGroup>
    </div>
  );
}
