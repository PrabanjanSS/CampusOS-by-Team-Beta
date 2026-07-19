import { useEffect, useState } from 'react';
import { CalendarDays, MapPin, Users } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useToast } from '../../context/ToastContext';
import { eventsService } from '../../services/events';

export interface EventActionDetails {
  id?: string | number;
  title: string;
  date?: string;
  time: string;
  location: string;
  attendees: number;
  status?: string;
}

export function EventActionModal({
  event,
  onClose,
  onRegistered,
}: {
  event: EventActionDetails | null;
  onClose: () => void;
  onRegistered?: (eventId: string) => void;
}) {
  const { toast } = useToast();

  const [attendance, setAttendance] = useState<'in-person' | 'online'>(
    'in-person'
  );

  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    setAttendance('in-person');

    if (!event) return;

    const registrations = JSON.parse(
      localStorage.getItem('registeredEvents') || '[]'
    );

    const eventKey = String(event.id || event.title);

    setRegistered(registrations.includes(eventKey));
  }, [event]);

  if (!event) return null;

  const joining = event.status === 'live';
  const completed = event.status === 'completed';

  const confirm = () => {
    void (async () => {
      try {
        const eventKey = String(event.id || event.title);

        await eventsService.register({
          id: event.id,
          title: event.title,
          date: event.date,
          time: event.time,
          location: event.location,
          attendees: event.attendees,
          status: event.status,
          isoDate: (event as any).isoDate,
          isoTime: (event as any).isoTime,
        });

        setRegistered(true);
        onRegistered?.(eventKey);

        toast({
          title: joining
            ? `You're joining ${event.title}`
            : `Registered successfully!`,
          description:
            attendance === 'online'
              ? 'We will send your joining details shortly.'
              : 'Your place has been reserved.',
          variant: 'success',
        });

        onClose();
      } catch (error) {
        toast({
          title: 'Error',
          description: error instanceof Error ? error.message : 'Unable to register for the event.',
          variant: 'error',
        });
      }
    })();
  };

  return (
    <Modal
      open={Boolean(event)}
      onClose={onClose}
      title={
        completed
          ? 'Event Recap'
          : joining
          ? 'Join this live event'
          : 'Register for this event'
      }
      description={event.title}
      size="md"
    >
      <div className="space-y-5">

        {/* Event Details */}
        <div className="rounded-xl bg-cream-100/70 p-4 text-sm text-ink-soft">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-navy" />
            {event.date && `${event.date} · `}
            {event.time}
          </div>

          <div className="mt-2 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-navy" />
            {event.location}
          </div>

          <div className="mt-2 flex items-center gap-2">
            <Users className="h-4 w-4 text-navy" />
            {event.attendees} people attending
          </div>
        </div>

        {/* Completed Event */}
        {completed ? (
          <div className="rounded-xl border border-green-200 bg-green-50 p-5">
            <h3 className="text-lg font-bold text-green-700">
              🎉 Event Completed Successfully
            </h3>

            <div className="mt-4 space-y-2 text-sm text-ink-soft">
              <p>👥 {event.attendees} participants attended</p>
              <p>⭐ Average Rating: 4.8 / 5</p>
              <p>🏆 Certificates have been issued</p>
              <p>📸 Photos are available in the Gallery</p>
              <p>🎯 Thank you for participating!</p>
            </div>
          </div>
        ) : (
          <>
            {/* Attendance Selection */}
            <fieldset>
              <legend className="text-sm font-semibold text-ink">
                How will you attend?
              </legend>

              <div className="mt-2 grid grid-cols-2 gap-3">
                {[
                  {
                    value: 'in-person' as const,
                    label: 'In person',
                    description: 'Attend at the venue',
                  },
                  {
                    value: 'online' as const,
                    label: 'Online',
                    description: 'Receive a joining link',
                  },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setAttendance(option.value)}
                    className={`rounded-xl border p-3 text-left transition-colors ${
                      attendance === option.value
                        ? 'border-navy bg-navy/5 ring-1 ring-navy/20'
                        : 'border-border-soft hover:border-navy/30'
                    }`}
                  >
                    <span className="block text-sm font-semibold text-ink">
                      {option.label}
                    </span>

                    <span className="mt-0.5 block text-xs text-ink-soft">
                      {option.description}
                    </span>
                  </button>
                ))}
              </div>
            </fieldset>
          </>
        )}

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            {completed ? 'Close' : 'Cancel'}
          </Button>

          {!completed && (
            <Button
              leftIcon="Check"
              disabled={registered && !joining}
              onClick={confirm}
            >
              {joining
                ? 'Join Event'
                : registered
                ? 'Registered'
                : 'Register'}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}