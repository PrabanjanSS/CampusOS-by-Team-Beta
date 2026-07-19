import { useEffect, useState } from 'react';
import { CalendarDays, MapPin, Users } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useToast } from '../../context/ToastContext';

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
}: {
  event: EventActionDetails | null;
  onClose: () => void;
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
    const eventKey = String(event.id || event.title);

    const registrations = JSON.parse(
      localStorage.getItem('registeredEvents') || '[]'
    );

    if (!registrations.includes(eventKey)) {
      registrations.push(eventKey);

      localStorage.setItem(
        'registeredEvents',
        JSON.stringify(registrations)
      );

      setRegistered(true);

      // Sync with planner calendar
      const campusEvents = JSON.parse(
        localStorage.getItem('campusEvents') || '[]'
      );

      // Convert event to PlannerEvent format with proper date parsing
      let startDate, endDate;
      
      // Check if event has ISO date format (from new date picker)
      if ((event as any).isoDate && (event as any).isoTime) {
        const dateStr = (event as any).isoDate; // YYYY-MM-DD
        const timeStr = (event as any).isoTime; // HH:mm
        
        // Parse the date and time
        const [year, month, day] = dateStr.split('-').map(Number);
        const [hours, minutes] = timeStr.split(':').map(Number);
        
        startDate = new Date(year, month - 1, day, hours, minutes, 0);
        endDate = new Date(year, month - 1, day, hours + 2, minutes, 0); // 2 hours duration
      } else if (event.date) {
        // Handle date formats like "Jul 20" or "2026-07-20"
        const dateParts = event.date.split(' ');
        if (dateParts.length === 2) {
          // Format: "Jul 20" - assume current year
          const monthMap: { [key: string]: number } = {
            'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
            'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
          };
          const month = monthMap[dateParts[0]];
          const day = parseInt(dateParts[1], 10);
          const currentYear = new Date().getFullYear();
          startDate = new Date(currentYear, month, day, 10, 0, 0); // Default to 10 AM
          endDate = new Date(currentYear, month, day, 12, 0, 0); // Default to 12 PM
        } else {
          // Try parsing as ISO date
          startDate = new Date(event.date);
          endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
        }
      } else {
        startDate = new Date();
        endDate = new Date(Date.now() + 2 * 60 * 60 * 1000);
      }

      const plannerEvent = {
        id: eventKey,
        title: event.title,
        description: `Registered for ${event.title}`,
        category: 'Workshop' as const,
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        venue: event.location,
        organizer: 'CampusOS',
        participants: event.attendees + 1,
        color: '#19376D',
      };

      // Check if event already exists in planner
      const exists = campusEvents.find((e: any) => e.id === eventKey);
      if (!exists) {
        campusEvents.push(plannerEvent);
        localStorage.setItem('campusEvents', JSON.stringify(campusEvents));
      }

      window.dispatchEvent(new Event('campusos_event_registered'));
    }

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