import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, AlertCircle } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { SearchBar } from '../../components/ui/SearchBar';
import { FadeIn, StaggerGroup, StaggerItem } from '../../components/ui/motion';
import { useToast } from '../../context/ToastContext';
import { mockReports } from '../../utils/mockData';

const reportStatusTone = {
  submitted: 'warning',
  reviewed:  'navy',
  approved:  'success',
} as const;

const reportTypeTone = {
  monthly:  'neutral',
  event:    'navy',
  budget:   'warning',
  activity: 'sand',
} as const;

export default function ReportsPage() {
  const { toast } = useToast();
  const [reports] = useState(mockReports);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');

  const handleDownload = (title: string) => {
    toast({
      title: 'Report Downloaded',
      description: `Successfully downloaded "${title}".`,
      variant: 'success',
    });
  };

  const handleUpload = () => {
    toast({
      title: 'Upload Report',
      description: 'Report submission form is under development.',
      variant: 'info',
    });
  };

  const filtered = reports.filter((r) => {
    const matchesQuery = r.title.toLowerCase().includes(query.toLowerCase()) || r.club.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === 'All' || r.type === filter.toLowerCase();
    return matchesQuery && matchesFilter;
  });

  return (
    <div className="space-y-8">
      <FadeIn>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">Club Reports</h1>
            <p className="mt-1.5 text-sm text-ink-soft">Review monthly activities, budgets, and event reports submitted by clubs.</p>
          </div>
          <Button leftIcon="Upload" onClick={handleUpload} magnetic>Submit Report</Button>
        </div>
      </FadeIn>

      <FadeIn delay={0.08}>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between py-2">
          <SearchBar value={query} onChange={setQuery} placeholder="Search reports…" className="w-full md:max-w-sm" />
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {['All', 'Monthly', 'Event', 'Budget', 'Activity'].map((type) => (
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

      <StaggerGroup className="grid gap-6 md:grid-cols-2">
        {filtered.length > 0 ? (
          filtered.map((r) => (
            <StaggerItem key={r.id}>
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                className="card-surface p-6 flex items-start gap-4 transition-all duration-200 hover:shadow-lift"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy/10 text-navy">
                  <FileText className="h-6 w-6" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold text-ink leading-snug">{r.title}</h3>
                  <p className="text-xs text-ink-soft mt-1">{r.club} · {r.date}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <Badge tone={reportTypeTone[r.type as keyof typeof reportTypeTone]}>{r.type}</Badge>
                    <Badge tone={reportStatusTone[r.status as keyof typeof reportStatusTone]}>{r.status}</Badge>
                  </div>
                </div>
                <button
                  onClick={() => handleDownload(r.title)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border-soft text-ink-soft hover:border-navy hover:text-navy hover:bg-navy/5 transition-all duration-200"
                >
                  <Download className="h-4.5 w-4.5" />
                </button>
              </motion.div>
            </StaggerItem>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border-soft p-12 text-center bg-white/50 col-span-2">
            <AlertCircle className="h-8 w-8 text-ink-soft/40" />
            <p className="mt-2 text-sm font-semibold text-ink">No reports found</p>
            <p className="text-xs text-ink-soft">Adjust your filters or search terms.</p>
          </div>
        )}
      </StaggerGroup>
    </div>
  );
}
