import type { Poll } from "../types/poll";

export const mockPolls: Poll[] = [
  {
    id: "1",
    title: "Best Technical Event?",
    description: "Which event should CampusOS organize next month?",
    createdBy: "CSI Club",
    expiresAt: "2026-08-01",
    isActive: true,
    options: [
      {
        id: "1",
        text: "AI Workshop",
        votes: 35,
      },
      {
        id: "2",
        text: "Hackathon",
        votes: 58,
      },
      {
        id: "3",
        text: "Coding Contest",
        votes: 22,
      },
      {
        id: "4",
        text: "UI/UX Bootcamp",
        votes: 15,
      },
    ],
  },
  {
    id: "2",
    title: "Preferred Club Meeting Day",
    description: "Vote for your preferred weekly meeting day.",
    createdBy: "IEEE",
    expiresAt: "2026-07-25",
    isActive: true,
    options: [
      {
        id: "1",
        text: "Monday",
        votes: 14,
      },
      {
        id: "2",
        text: "Wednesday",
        votes: 42,
      },
      {
        id: "3",
        text: "Friday",
        votes: 31,
      },
    ],
  },
];
