import { useEffect, useState } from 'react';
import { CalendarDays, Clock3, MapPin, AlertTriangle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { FadeIn } from '../../components/ui/motion';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { eventsService, type Event, type EventPayload } from '../../services/events';
import { EventActionModal, type EventActionDetails } from '../../components/events/EventActionModal';

export default function EventsPage() {
  const { toast } = useToast();
  const { user } = useAuth();
  const canCreate = user?.role === 'lead' || user?.role === 'faculty';
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventActionDetails | null>(null);

  const getRegisteredEventIds = () => {
    try {
      const saved = localStorage.getItem('registeredEvents');
      return saved ? (JSON.parse(saved) as string[]) : [];
    } catch {
      return [];
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadEvents = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await eventsService.getAll();
        if (!isMounted) return;
        const registeredIds = getRegisteredEventIds();
        setEvents(
          (response.events ?? []).map((item) => ({
            ...item,
            isRegistered: registeredIds.includes(String(item.id ?? item.title)),
          }))
        );
      } catch (err) {
        if (!isMounted) return;

        const message = err instanceof Error ? err.message : 'Unable to load events.';
        setError(message);
        toast({ title: 'Error', description: message, variant: 'error' });
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadEvents();

    return () => {
      isMounted = false;
    };
  }, [toast]);

  const handleCreateEvent = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const dateText = String(formData.get('date') || '').trim();
    const timeText = String(formData.get('time') || '').trim();
    const [day, month, year] = dateText.split('-').map((value) => Number(value));
    const [hours, minutes] = timeText.split(':').map((value) => Number(value));

    const eventDate =
      day && month && year && !Number.isNaN(day) && !Number.isNaN(month) && !Number.isNaN(year)
        ? new Date(year, month - 1, day, hours || 0, minutes || 0, 0).toISOString()
        : dateText;

    const payload: EventPayload = {
      title: String(formData.get('title') || '').trim(),
      description: String(formData.get('categoryTag') || '').trim(),
      venue: String(formData.get('location') || '').trim(),
      date: eventDate,
    };

    if (!payload.title || !dateText || !timeText || !payload.venue || !payload.description) {
      toast({
        title: 'Missing Information',
        description: 'Please fill all required fields.',
        variant: 'warning',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await eventsService.create(payload);
      const createdEvent = response.event ?? { ...payload, isRegistered: false };
      setEvents((prev) => [{ ...createdEvent, isRegistered: false }, ...prev]);
      form.reset();
      setIsCreateOpen(false);

      toast({
        title: 'Success',
        description: 'Event created successfully.',
        variant: 'success',
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to create event.';
      toast({ title: 'Error', description: message, variant: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEventRegistration = (event: Event) => {
    setSelectedEvent({
      id: event.id,
      title: event.title,
      date: event.date,
      time: '10:00 AM',
      location: event.venue,
      attendees: 0,
      status: 'upcoming',
    });
  };

  const handleEventRegistered = (eventId: string) => {
    setEvents((prev) =>
      prev.map((item) =>
        String(item.id ?? item.title) === eventId
          ? { ...item, isRegistered: true }
          : item
      )
    );
  };

  return (
    <div className="space-y-6 pb-12">
      <FadeIn>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">Events</h1>
            <p className="mt-1 text-sm text-ink-soft">Live data loaded from the events service.</p>
          </div>
          {canCreate && (
            <Button type="button" leftIcon="Plus" onClick={() => setIsCreateOpen(true)}>
              Create New Event
            </Button>
          )}
        </div>
      </FadeIn>

      {isLoading ? (
        <div className="card-surface flex items-center gap-3 p-6 text-sm text-ink-soft">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-navy/20 border-t-navy" />
          Loading events...
        </div>
      ) : error ? (
        <div className="card-surface flex items-start gap-3 border border-danger/20 bg-danger/5 p-5 text-sm text-ink-soft">
          <AlertTriangle className="mt-0.5 h-4 w-4 text-danger" />
          <div>
            <p className="font-semibold text-ink">Unable to load events</p>
            <p className="mt-1">{error}</p>
          </div>
        </div>
      ) : events.length === 0 ? (
        <div className="card-surface p-10 text-center text-sm text-ink-soft">
          <p>No events found.</p>
          {canCreate && (
            <div className="mt-4 flex justify-center">
              <Button type="button" leftIcon="Plus" onClick={() => setIsCreateOpen(true)}>
                Create New Event
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {events.map((event) => (
            <div key={event.id ?? event.title} className="card-surface p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-ink">{event.title}</h2>
                  <p className="mt-1 line-clamp-3 text-sm text-ink-soft">{event.description}</p>
                </div>
                <span className="rounded-full bg-navy/10 px-3 py-1 text-xs font-semibold text-navy">Event</span>
              </div>

              <div className="mt-4 space-y-2 text-sm text-ink-soft">
                <p className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4" /> {event.date}</p>
                <p className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> {event.venue}</p>
                <p className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4" /> {event.registrationLink || 'No registration link provided'}</p>
              </div>

              <div className="mt-5">
                <Button
                  type="button"
                  variant={event.isRegistered ? 'outline' : 'secondary'}
                  className="w-full"
                  disabled={Boolean(event.isRegistered)}
                  onClick={() => openEventRegistration(event)}
                >
                  {event.isRegistered ? 'Registered' : 'Register'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

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
              <input name="date" type="text" required className="input-base mt-1.5 w-full" placeholder="dd-mm-yyyy" />
            </div>
            <div>
              <label className="label-base">Time</label>
              <input name="time" type="time" required className="input-base mt-1.5 w-full" />
            </div>
          </div>
          <div>
            <label className="label-base">Location</label>
            <input name="location" required className="input-base mt-1.5 w-full" placeholder="e.g. Seminar Hall" />
          </div>
          <div>
            <label className="label-base">Category Tag</label>
            <input name="categoryTag" required className="input-base mt-1.5 w-full" placeholder="e.g. Workshop" />
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <Button variant="secondary" type="button" onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" leftIcon="Plus" loading={isSubmitting}>
              + Create Event
            </Button>
          </div>
        </form>
      </Modal>

      <EventActionModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onRegistered={handleEventRegistered}
      />
    </div>
  );
}