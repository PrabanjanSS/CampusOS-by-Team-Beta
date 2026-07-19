export interface PlannerEvent {
  id: string;
  title: string;
  description: string;
  category:
    | "Workshop"
    | "Meeting"
    | "Competition"
    | "Hackathon"
    | "Deadline";
  start: string;
  end: string;
  venue: string;
  organizer: string;
  participants: number;
  color: string;
}
