import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Heart,
  Eye,
  Users,
  ExternalLink,
  Star,
} from "lucide-react";

import type { Project } from "../../types/project";

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-xl"
    >
      {/* Banner */}
      <div className="relative">
        <img
          src={project.image}
          alt={project.title}
          className="h-52 w-full object-cover"
        />

        {project.featured && (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-yellow-400 px-3 py-1 text-xs font-semibold text-black">
            <Star size={14} />
            Featured
          </span>
        )}

        <span className="absolute right-3 top-3 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
          {project.status}
        </span>
      </div>

      {/* Body */}
      <div className="space-y-4 p-5">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {project.title}
          </h2>

          <p className="text-sm font-medium text-indigo-600">
            {project.club}
          </p>
        </div>

        <p className="line-clamp-3 text-sm text-gray-600">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between border-t pt-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Heart size={16} />
            {project.likes}
          </div>

          <div className="flex items-center gap-1">
            <Eye size={16} />
            {project.views}
          </div>

          <div className="flex items-center gap-1">
            <Users size={16} />
            {project.members}
          </div>
        </div>

        {/* Button */}
        <Link
          to={`/app/projects/${project.id}`}
          className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
        >
          View Project
          <ExternalLink size={18} />
        </Link>
      </div>
    </motion.div>
  );
}
