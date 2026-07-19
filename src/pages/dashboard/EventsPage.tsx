import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Users, Filter } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { SearchBar } from '../../components/ui/SearchBar';
import { FadeIn, StaggerGroup, StaggerItem } from '../../components/ui/motion';
import { mockEvents } from '../../utils/mockData';
import { EventActionModal, type EventActionDetails } from '../../components/events/EventActionModal';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';
import { Modal } from '../../components/ui/Modal';

const statusTone = {
  upcoming: 'navy',
  live: 'success',
  completed: 'neutral',
} as const;

const filters = ['All', 'Upcoming', 'Live', 'Completed'];

export default function EventsPage() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState<EventActionDetails | null>(null);
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('campusos_events');
    return saved ? JSON.parse(saved) : mockEvents;
  });
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [registeredList, setRegisteredList] = useState<string[]>([]);

  useEffect(() => {
    const loadRegs = () => {
      const saved = localStorage.getItem('registeredEvents');
      setRegisteredList(saved ? JSON.parse(saved) : []);
    };
    loadRegs();

    window.addEventListener('campusos_event_registered', loadRegs);
    return () => window.removeEventListener('campusos_event_registered', loadRegs);
  }, []);

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get('title') as string;
    const date = formData.get('date') as string;
    const time = formData.get('time') as string;
    const location = formData.get('location') as string;
    const tag = formData.get('tag') as string;

    if (!title || !date || !time || !location) return;

    // Format date for display (e.g., "Jul 20")
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    const newEv = {
      id: 'ev_' + Date.now(),
      title,
      date: formattedDate,
      time,
      location,
      attendees: 0,
      status: 'upcoming' as const,
      tag: tag || 'General',
      // Store ISO date for calendar sync
      isoDate: date,
      isoTime: time,
    };

    const updated = [newEv, ...events];
    setEvents(updated);
    localStorage.setItem('campusos_events', JSON.stringify(updated));
    setIsCreateOpen(false);
    toast({
      title: 'Event Created Successfully',
      description: `"${title}" has been scheduled for ${formattedDate} at ${time}.`,
      variant: 'success',
    });
  };

  const filtered = events.filter((e: any) => {
    const matchesQuery = e.title.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === 'All' || e.status === filter.toLowerCase();
    return matchesQuery && matchesFilter;
  });

  const canCreate = user?.role === 'lead' || user?.role === 'faculty';

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">Events</h1>
            <p className="mt-1 text-sm text-ink-soft">Browse, register, and manage club events.</p>
          </div>
          {canCreate && (
            <Button leftIcon="Plus" onClick={() => setIsCreateOpen(true)} magnetic>
              Create Event
            </Button>
          )}
        </div>
      </FadeIn>

      <FadeIn delay={0.08}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchBar value={query} onChange={setQuery} placeholder="Search events…" className="sm:max-w-xs" />
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-ink-soft" />
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  filter === f ? 'bg-navy text-white shadow-soft' : 'bg-white text-ink-soft hover:text-navy'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </FadeIn>

      <StaggerGroup className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((e: any) => (
          <StaggerItem key={e.id}>
            <motion.div whileHover={{ y: -6 }} className="card-surface group overflow-hidden transition-shadow hover:shadow-lift">
              <div className="relative h-32 overflow-hidden bg-gradient-to-br from-navy to-navy-400">
                <div className="absolute inset-0 bg-navy-radial opacity-50" />
                <div className="absolute left-4 top-4">
                  <Badge tone={statusTone[e.status as keyof typeof statusTone]} dot>{e.status}</Badge>
                </div>
                <div className="absolute bottom-4 right-4 flex h-12 w-12 flex-col items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur">
                  <span className="text-[0.65rem] font-medium leading-none">{e.date.split(' ')[0]}</span>
                  <span className="text-lg font-bold leading-tight">{e.date.split(' ')[1]}</span>
                </div>
              </div>
              <div className="p-5">
                <Badge tone="sand">{e.tag}</Badge>
                <h3 className="mt-2.5 text-base font-semibold text-ink">{e.title}</h3>
                <div className="mt-3 space-y-1.5 text-xs text-ink-soft">
                  <p className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {e.time}</p>
                  <p className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {e.location}</p>
                  <p className="inline-flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> {e.attendees} attending</p>
                </div>
                {(() => {
                  const isRegistered = registeredList.includes(String(e.id || e.title));
                  const isCompleted = e.status === 'completed';
                  const isLive = e.status === 'live';

                  return (
                    <Button
                      variant={isRegistered && !isLive ? 'outline' : 'secondary'}
                      className="mt-4 w-full"
                      size="sm"
                      disabled={isRegistered && !isLive && !isCompleted}
                      onClick={() => setSelectedEvent(e)}
                    >
                     {
  isCompleted
    ? 'View Recap'
    : isLive
    ? 'Join Now'
    : isRegistered
    ? '✓ Registered'
    : 'Register'
}
                    </Button>
                  );
                })()}
              </div>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerGroup>
      <EventActionModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />

      {isCreateOpen && (
        <Modal
          open={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          title="Create New Event"
          description="Schedule a new event for your club members"
          size="md"
        >
          <form onSubmit={handleCreateEvent} className="space-y-4">
            <div>
              <label className="label-base">Event Title</label>
              <input name="title" required className="input-base mt-1.5 w-full" placeholder="e.g. Hackathon Kickoff" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label-base">Date</label>
                <input 
                  name="date" 
                  type="date" 
                  required 
                  className="input-base mt-1.5 w-full" 
                />
              </div>
              <div>
                <label className="label-base">Time</label>
                <input 
                  name="time" 
                  type="time" 
                  required 
                  className="input-base mt-1.5 w-full" 
                />
              </div>
            </div>
            <div>
              <label className="label-base">Location</label>
              <input name="location" required className="input-base mt-1.5 w-full" placeholder="e.g. Seminar Hall" />
            </div>
            <div>
              <label className="label-base">Category Tag</label>
              <input name="tag" className="input-base mt-1.5 w-full" placeholder="e.g. Workshop" />
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="secondary" type="button" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
              <Button type="submit" leftIcon="Plus">Create Event</Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
