import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Megaphone, AlertCircle } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';
import { FadeIn, StaggerGroup, StaggerItem } from '../../components/ui/motion';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/ui/Modal';
import {
  announcementsService,
  type Announcement,
  type AnnouncementPayload,
} from '../../services/announcements';

const priorityTone = {
  high: 'danger',
  normal: 'warning',
  low: 'neutral',
} as const;

const priorityDot = {
  high: 'bg-danger',
  normal: 'bg-warning',
  low: 'bg-ink-soft/40',
};

const priorityOptions = [
  { value: 'high', label: 'High', color: 'bg-danger/10 text-danger border-danger/25 hover:bg-danger/15', active: 'bg-danger text-white border-danger shadow-md' },
  { value: 'normal', label: 'Normal', color: 'bg-warning/10 text-[#b07314] border-warning/30 hover:bg-warning/20', active: 'bg-warning text-ink border-warning shadow-md' },
  { value: 'low', label: 'Low', color: 'bg-ink-soft/8 text-ink-soft border-border-soft hover:bg-ink-soft/12', active: 'bg-ink-soft/80 text-white border-ink-soft shadow-md' },
] as const;

type AnnouncementView = {
  id: string;
  title: string;
  body: string;
  author: string;
  date: string;
  priority: 'high' | 'normal' | 'low';
};

const mapAnnouncement = (announcement: Announcement): AnnouncementView => ({
  id: announcement.id || announcement.title,
  title: announcement.title,
  body: announcement.description,
  author: announcement.clubName || 'Administrator',
  date: announcement.createdAt ? new Date(announcement.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Just now',
  priority: announcement.priority,
});

export default function AnnouncementsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const canCreate = user?.role === 'lead' || user?.role === 'faculty';
  const [announcements, setAnnouncements] = useState<AnnouncementView[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [priority, setPriority] = useState<'high' | 'normal' | 'low'>('normal');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadAnnouncements = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await announcementsService.getAll();
        if (!isMounted) return;
        setAnnouncements((response.announcements ?? []).map(mapAnnouncement));
      } catch (err) {
        if (!isMounted) return;

        const message = err instanceof Error ? err.message : 'Unable to load announcements.';
        setError(message);
        toast({ title: 'Error', description: message, variant: 'error' });
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadAnnouncements();

    return () => {
      isMounted = false;
    };
  }, [toast]);

  function PriorityPicker() {
    return (
      <div className="flex gap-2">
        {priorityOptions.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setPriority(opt.value)}
            className={`flex-1 rounded-xl border px-3 py-2.5 text-xs font-bold transition-all duration-200 ${
              priority === opt.value ? opt.active : opt.color
            }`}
          >
            {opt.label}
          </button>
        ))}
        <input type="hidden" name="priority" value={priority} />
      </div>
    );
  }

  const handleCreateAnnouncement = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    const formData = new FormData(e.currentTarget);
    const title = String(formData.get('title') || '').trim();
    const body = String(formData.get('body') || '').trim();
    const uiPriority = String(formData.get('priority') || 'normal') as 'high' | 'normal' | 'low';

    if (!title || !body || !uiPriority) return;

    const payload: AnnouncementPayload = {
      title,
      description: body,
      priority: uiPriority === 'high' ? 'High' : uiPriority === 'normal' ? 'Medium' : 'Low',
      clubName: user?.club || 'CampusOS',
    };

    setIsSubmitting(true);

    try {
      const response = await announcementsService.create(payload);
      const createdAnnouncement = response.announcement ? mapAnnouncement(response.announcement) : mapAnnouncement({
        id: 'ann_' + Date.now(),
        title,
        description: body,
        priority: uiPriority,
        clubName: payload.clubName,
      });

      setAnnouncements((prev) => [createdAnnouncement, ...prev]);
      setIsCreateOpen(false);

      toast({
        title: 'Announcement Posted',
        description: 'Your announcement has been broadcasted successfully.',
        variant: 'success',
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to create announcement.';
      toast({ title: 'Error', description: message, variant: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">Announcements</h1>
            <p className="mt-1 text-sm text-ink-soft">Stay up to date with what's happening.</p>
          </div>
          {canCreate && (
            <Button leftIcon="Plus" onClick={() => setIsCreateOpen(true)} magnetic>
              New Announcement
            </Button>
          )}
        </div>
      </FadeIn>

      {isLoading ? (
        <div className="card-surface flex items-center gap-3 p-6 text-sm text-ink-soft">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-navy/20 border-t-navy" />
          Loading announcements...
        </div>
      ) : error ? (
        <div className="card-surface flex items-start gap-3 border border-danger/20 bg-danger/5 p-5 text-sm text-ink-soft">
          <AlertCircle className="mt-0.5 h-4 w-4 text-danger" />
          <div>
            <p className="font-semibold text-ink">Unable to load announcements</p>
            <p className="mt-1">{error}</p>
          </div>
        </div>
      ) : announcements.length === 0 ? (
        <div className="card-surface p-10 text-center text-sm text-ink-soft">
          <p>No announcements found.</p>
          {canCreate && (
            <div className="mt-4 flex justify-center">
              <Button type="button" leftIcon="Plus" onClick={() => setIsCreateOpen(true)}>
                New Announcement
              </Button>
            </div>
          )}
        </div>
      ) : (
        <StaggerGroup className="space-y-4">
          {announcements.map((a) => (
            <StaggerItem key={a.id}>
              <motion.div whileHover={{ y: -3 }} className="card-surface p-5 transition-shadow hover:shadow-lift">
                <div className="flex items-start gap-4">
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                    a.priority === 'high' ? 'bg-danger/10 text-danger' : a.priority === 'normal' ? 'bg-warning/15 text-[#b07314]' : 'bg-navy/10 text-navy'
                  }`}>
                    <Megaphone className="h-5 w-5" />
                  </span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`h-1.5 w-1.5 rounded-full ${priorityDot[a.priority as keyof typeof priorityDot]}`} />
                      <h3 className="text-base font-semibold text-ink">{a.title}</h3>
                      <Badge tone={priorityTone[a.priority as keyof typeof priorityTone]}>{a.priority}</Badge>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{a.body}</p>
                    <div className="mt-4 flex items-center gap-2.5 border-t border-border-soft pt-3">
                      <Avatar name={a.author} size="xs" />
                      <span className="text-xs font-medium text-ink">{a.author}</span>
                      <span className="text-xs text-ink-soft">· {a.date}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      )}

      <FadeIn delay={0.1}>
        <div className="flex items-center gap-3 rounded-2xl border border-border-soft bg-cream-100/50 p-4 text-sm text-ink-soft">
          <AlertCircle className="h-5 w-5 shrink-0 text-navy" />
          Announcements older than 30 days are archived automatically.
        </div>
      </FadeIn>

      {isCreateOpen && (
        <Modal
          open={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          title="New Announcement"
          description="Broadcast an announcement to your club members"
          size="md"
        >
          <form onSubmit={handleCreateAnnouncement} className="space-y-5">
            <div>
              <label className="label-base">Title</label>
              <input
                name="title"
                required
                className="input-base w-full"
                placeholder="e.g. Weekly Sync Rescheduled"
              />
            </div>
            <div>
              <label className="label-base">Content</label>
              <textarea
                name="body"
                required
                rows={4}
                className="input-base w-full resize-none"
                placeholder="Write announcement details here..."
              />
            </div>
            <div>
              <label className="label-base">Priority Level</label>
              <PriorityPicker />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="secondary" type="button" onClick={() => setIsCreateOpen(false)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" leftIcon="Megaphone" loading={isSubmitting}>
                Post Announcement
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}