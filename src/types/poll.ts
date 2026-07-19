export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
  id: string;
  title: string;
  description: string;
  options: PollOption[];
  createdBy: string;
  expiresAt: string;
  isActive: boolean;
}
