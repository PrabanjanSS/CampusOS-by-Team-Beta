import { CalendarDays, Users, ClipboardList, Clock } from "lucide-react";
import type { PlannerEvent } from "../../types/planner";
import { useCountUp } from "../../hooks";
import { motion } from "framer-motion";

interface Props {
  events: PlannerEvent[];
}

export default function StatsCards({ events }: Props) {
  const totalParticipants = events.reduce(
    (sum, event) => sum + event.participants,
    0
  );

  const meetings = events.filter(
    (event) => event.category === "Meeting"
  ).length;

  const deadlines = events.filter(
    (event) => event.category === "Deadline"
  ).length;

  const stats = [
    {
      title: "Events",
      value: events.length,
      icon: CalendarDays,
      color: "bg-navy/10 text-navy",
    },
    {
      title: "Participants",
      value: totalParticipants,
      icon: Users,
      color: "bg-success/10 text-success",
    },
    {
      title: "Meetings",
      value: meetings,
      icon: ClipboardList,
      color: "bg-warning/10 text-[#b07314]",
    },
    {
      title: "Deadlines",
      value: deadlines,
      icon: Clock,
      color: "bg-danger/10 text-danger",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;
        const val = useCountUp(item.value, 1000, true);

        return (
          <motion.div
            key={item.title}
            whileHover={{ y: -4 }}
            className="card-surface flex items-center gap-4 p-5 transition-shadow hover:shadow-lift"
          >
            <span
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${item.color}`}
            >
              <Icon size={24} />
            </span>

            <div>
              <p className="text-2xl font-bold tracking-tight text-ink">
                {val.toLocaleString()}
              </p>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft/75">
                {item.title}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
