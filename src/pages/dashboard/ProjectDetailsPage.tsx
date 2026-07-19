import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Heart,
  Eye,
  Users,
  Star,
} from "lucide-react";

import { mockProjects } from "../../data/mockProjects";

export default function ProjectDetailsPage() {
  const { id } = useParams();

  const project = mockProjects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Project Not Found
          </h1>

          <Link
            to="/app/projects"
            className="mt-6 inline-block rounded-xl bg-indigo-600 px-6 py-3 text-white"
          >
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl p-6 space-y-8">

      <Link
        to="/app/projects"
        className="inline-flex items-center gap-2 text-indigo-600 hover:underline"
      >
        <ArrowLeft size={18} />
        Back to Projects
      </Link>

      {/* Banner */}
      <div className="overflow-hidden rounded-3xl shadow-lg">
        <img
          src={project.image}
          alt={project.title}
          className="h-[420px] w-full object-cover"
        />
      </div>

      {/* Header */}
      <div className="space-y-3">

        <div className="flex flex-wrap items-center gap-3">

          <h1 className="text-4xl font-bold">
            {project.title}
          </h1>

          {project.featured && (
            <span className="flex items-center gap-1 rounded-full bg-yellow-400 px-3 py-1 text-sm font-semibold">
              <Star size={16} />
              Featured
            </span>
          )}

        </div>

        <p className="text-lg text-indigo-600 font-semibold">
          {project.club}
        </p>

        <p className="text-gray-600 leading-8">
          {project.description}
        </p>

      </div>

      {/* Stats */}
      <div className="grid gap-5 md:grid-cols-3">

        <div className="rounded-2xl bg-white p-6 shadow">

          <div className="flex items-center gap-3">
            <Heart className="text-red-500" />
            <span>{project.likes} Likes</span>
          </div>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow">

          <div className="flex items-center gap-3">
            <Eye className="text-blue-500" />
            <span>{project.views} Views</span>
          </div>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow">

          <div className="flex items-center gap-3">
            <Users className="text-green-500" />
            <span>{project.members} Members</span>
          </div>

        </div>

      </div>

      {/* Tech Stack */}
      <div>

        <h2 className="mb-4 text-2xl font-bold">
          Tech Stack
        </h2>

        <div className="flex flex-wrap gap-3">

          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700"
            >
              {tech}
            </span>
          ))}

        </div>

      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-4">

        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3 font-semibold text-white hover:bg-black"
        >
          <Github size={20} />
          GitHub Repository
        </a>

        <a
          href={project.demo}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
        >
          <ExternalLink size={20} />
          Live Demo
        </a>

      </div>

    </div>
  );
}
