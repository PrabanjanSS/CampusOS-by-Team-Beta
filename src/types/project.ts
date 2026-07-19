export interface Project {
  id: string;
  title: string;
  club: string;
  description: string;
  techStack: string[];
  members: number;
  likes: number;
  views: number;
  featured: boolean;
  status: "Completed" | "Ongoing";
  image: string;
  github: string;
  demo: string;
}
