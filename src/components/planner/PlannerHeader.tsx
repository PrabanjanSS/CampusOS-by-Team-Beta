import { CalendarDays } from "lucide-react";
import { Button } from "../ui/Button";

interface PlannerHeaderProps {
  showCreate?: boolean;
  onCreate?: () => void;
}

export default function PlannerHeader({
  showCreate = true,
  onCreate,
}: PlannerHeaderProps) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <div className="flex items-center gap-2.5">
          <CalendarDays className="h-7 w-7 text-navy animate-pulse" />
          <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Campus Planner
          </h1>
        </div>
        <p className="mt-1 text-sm text-ink-soft">
          Manage events, meetings, and deadlines across CampusOS.
        </p>
      </div>

      {showCreate && (
        <Button
          leftIcon="Plus"
          onClick={() => {
            console.log("BUTTON CLICKED");
            onCreate?.();
          }}
          magnetic
        >
          Create Event
        </Button>
      )}
    </div>
  );
}
