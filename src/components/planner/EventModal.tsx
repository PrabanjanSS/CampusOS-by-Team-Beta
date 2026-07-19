import { useEffect, useState } from "react";
import { useToast } from "../../context/ToastContext";
import { CalendarDays, MapPin, Users, User } from "lucide-react";
import type { PlannerEvent } from "../../types/planner";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";

interface Props {
  event: PlannerEvent | null;
  onClose: () => void;
}

export default function EventModal({
  event,
  onClose,
}: Props) {
  const [registered, setRegistered] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!event) return;
    const registrations = JSON.parse(
      localStorage.getItem("registeredEvents") || "[]"
    );
    setRegistered(registrations.includes(event.id));
  }, [event]);

  if (!event) return null;

  const handleRegister = () => {
    const registrations = JSON.parse(
      localStorage.getItem("registeredEvents") || "[]"
    );

    if (!registrations.includes(event.id)) {
      registrations.push(event.id);
      localStorage.setItem(
        "registeredEvents",
        JSON.stringify(registrations)
      );
      setRegistered(true);

      toast({
        title: "Registration Successful",
        description: `You have registered for ${event.title}`,
        variant: "success",
      });
    }
  };

  const handleGoogleCalendar = () => {
    const start = new Date(event.start)
      .toISOString()
      .replace(/[-:]|\.\d{3}/g, "");

    const end = new Date(event.end)
      .toISOString()
      .replace(/[-:]|\.\d{3}/g, "");

    const url =
      `https://calendar.google.com/calendar/render?action=TEMPLATE` +
      `&text=${encodeURIComponent(event.title)}` +
      `&dates=${start}/${end}` +
      `&details=${encodeURIComponent(event.description)}` +
      `&location=${encodeURIComponent(event.venue)}`;

    window.open(url, "_blank");
  };

  return (
    <Modal
      open={Boolean(event)}
      onClose={onClose}
      title={event.title}
      description={`Campus Planner - ${event.category}`}
      size="md"
    >
      <div className="space-y-5">
        <div className="flex items-center gap-2">
          <Badge tone="navy" dot>
            {event.category}
          </Badge>
        </div>

        <p className="text-sm text-ink-soft">
          {event.description}
        </p>

        <div className="rounded-xl border border-border-soft bg-cream-100/40 p-4 space-y-3.5 text-sm text-ink">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-4.5 w-4.5 text-navy" />
            <span className="font-medium">
              {new Date(event.start).toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="h-4.5 w-4.5 text-navy" />
            <span className="font-medium">{event.venue}</span>
          </div>

          <div className="flex items-center gap-3">
            <User className="h-4.5 w-4.5 text-navy" />
            <span className="font-medium">{event.organizer}</span>
          </div>

          <div className="flex items-center gap-3">
            <Users className="h-4.5 w-4.5 text-navy" />
            <span className="font-medium">{event.participants} Participants</span>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button
            variant={registered ? "secondary" : "primary"}
            onClick={handleRegister}
            disabled={registered}
            className="flex-1"
            leftIcon={registered ? "Check" : undefined}
          >
            {registered ? "Registered" : "Register"}
          </Button>

          <Button
            variant="secondary"
            onClick={handleGoogleCalendar}
            className="flex-1"
            leftIcon="CalendarDays"
          >
            Add to Calendar
          </Button>
        </div>
      </div>
    </Modal>
  );
}
