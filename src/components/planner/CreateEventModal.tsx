import { useState } from "react";
import { useToast } from "../../context/ToastContext";
import type { PlannerEvent } from "../../types/planner";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: (event: PlannerEvent) => void;
}

export default function CreateEventModal({
  open,
  onClose,
  onCreate,
}: Props) {
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [venue, setVenue] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [category, setCategory] = useState<
    "Workshop" | "Meeting" | "Competition" | "Hackathon" | "Deadline"
  >("Workshop");

  const colorMap = {
    Workshop: "#22c55e",
    Meeting: "#f59e0b",
    Competition: "#3b82f6",
    Hackathon: "#8b5cf6",
    Deadline: "#ef4444",
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setStartDate("");
    setStartTime("");
    setEndDate("");
    setEndTime("");
    setVenue("");
    setOrganizer("");
    setCategory("Workshop");
  };

  const handleCreate = () => {
    if (
      !title ||
      !startDate ||
      !startTime ||
      !venue ||
      !organizer
    ) {
      toast({
        title: "Missing Fields",
        description: "Please fill all required fields.",
        variant: "warning",
      });
      return;
    }

    const finalEndDate = endDate || startDate;
    const finalEndTime = endTime || startTime;

    const event: PlannerEvent = {
      id: Date.now().toString(),
      title,
      description,
      category,
      start: `${startDate}T${startTime}:00`,
      end: `${finalEndDate}T${finalEndTime}:00`,
      venue,
      organizer,
      participants: 0,
      color: colorMap[category],
    };

    onCreate(event);

    toast({
      title: "Event Created",
      description: `${title} has been added successfully.`,
      variant: "success",
    });

    resetForm();
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        resetForm();
        onClose();
      }}
      title="Create New Planner Event"
      description="Add an event, meeting, or deadline to the campus planner"
      size="md"
    >
      <div className="space-y-4">
        <div>
          <label className="label-base">Event Title *</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. AI Workshop Series"
            className="input-base w-full"
            required
          />
        </div>

        <div>
          <label className="label-base">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            placeholder="Provide event details..."
            className="input-base w-full resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label-base">Start Date *</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="input-base w-full"
              required
            />
          </div>

          <div>
            <label className="label-base">Start Time *</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="input-base w-full"
              required
            />
          </div>

          <div>
            <label className="label-base">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="input-base w-full"
            />
          </div>

          <div>
            <label className="label-base">End Time</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="input-base w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label-base">Venue *</label>
            <input
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              placeholder="e.g. Seminar Hall"
              className="input-base w-full"
              required
            />
          </div>

          <div>
            <label className="label-base">Organizer *</label>
            <input
              value={organizer}
              onChange={(e) => setOrganizer(e.target.value)}
              placeholder="e.g. Computer Society"
              className="input-base w-full"
              required
            />
          </div>
        </div>

        <div>
          <label className="label-base">Category</label>
          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value as
                  | "Workshop"
                  | "Meeting"
                  | "Competition"
                  | "Hackathon"
                  | "Deadline"
              )
            }
            className="input-base w-full"
          >
            <option value="Workshop">Workshop</option>
            <option value="Meeting">Meeting</option>
            <option value="Competition">Competition</option>
            <option value="Hackathon">Hackathon</option>
            <option value="Deadline">Deadline</option>
          </select>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="secondary"
            onClick={() => {
              resetForm();
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleCreate} leftIcon="Check">
            Create Event
          </Button>
        </div>
      </div>
    </Modal>
  );
}
