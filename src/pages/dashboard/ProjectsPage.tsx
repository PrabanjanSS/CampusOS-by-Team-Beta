import { useEffect, useState } from 'react';
import { FolderKanban, AlertTriangle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { FadeIn } from '../../components/ui/motion';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { projectsService, type Project, type ProjectPayload } from '../../services/projects';

export default function ProjectsPage() {
  const { toast } = useToast();
  const { user } = useAuth();
  const canCreate = user?.role === 'lead' || user?.role === 'faculty';
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadProjects = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await projectsService.getAll();
        if (!isMounted) return;
        setProjects(response.projects ?? []);
      } catch (err) {
        if (!isMounted) return;

        const message = err instanceof Error ? err.message : 'Unable to load projects.';
        setError(message);
        toast({ title: 'Error', description: message, variant: 'error' });
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadProjects();

    return () => {
      isMounted = false;
    };
  }, [toast]);

  const handleCreateProject = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload: ProjectPayload = {
      title: String(formData.get('title') || '').trim(),
      description: String(formData.get('description') || '').trim(),
      dueDate: String(formData.get('dueDate') || ''), 
      teamSize: Number(formData.get('teamSize') || 3),
      clubName: user?.club || 'CampusOS',
    };

    if (!payload.title || !payload.description) {
      toast({
        title: 'Missing Information',
        description: 'Please fill all required fields.',
        variant: 'warning',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await projectsService.create(payload);
      const createdProject = response.project ?? { ...payload };
      setProjects((prev) => [createdProject, ...prev]);
      form.reset();
      setIsCreateOpen(false);

      toast({
        title: 'Success',
        description: 'Project created successfully.',
        variant: 'success',
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to create project.';
      toast({ title: 'Error', description: message, variant: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <FadeIn>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">Projects</h1>
            <p className="mt-1 text-sm text-ink-soft">Live data loaded from the projects service.</p>
          </div>
          {canCreate && (
            <Button type="button" leftIcon="Plus" onClick={() => setIsCreateOpen(true)}>
              Create New Project
            </Button>
          )}
        </div>
      </FadeIn>

      {isLoading ? (
        <div className="card-surface flex items-center gap-3 p-6 text-sm text-ink-soft">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-navy/20 border-t-navy" />
          Loading projects...
        </div>
      ) : error ? (
        <div className="card-surface flex items-start gap-3 border border-danger/20 bg-danger/5 p-5 text-sm text-ink-soft">
          <AlertTriangle className="mt-0.5 h-4 w-4 text-danger" />
          <div>
            <p className="font-semibold text-ink">Unable to load projects</p>
            <p className="mt-1">{error}</p>
          </div>
        </div>
      ) : projects.length === 0 ? (
        <div className="card-surface p-10 text-center text-sm text-ink-soft">
          <p>No projects found.</p>
          {canCreate && (
            <div className="mt-4 flex justify-center">
              <Button type="button" leftIcon="Plus" onClick={() => setIsCreateOpen(true)}>
                Create New Project
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <div key={project.id ?? project.title} className="card-surface p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-ink">{project.title}</h2>
                  <p className="mt-1 line-clamp-3 text-sm text-ink-soft">{project.description}</p>
                </div>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-navy/10 text-navy">
                  <FolderKanban className="h-5 w-5" />
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
                <span className="rounded-full bg-sand/30 px-3 py-1 text-ink">{project.clubName}</span>
                <span className="rounded-full bg-navy/10 px-3 py-1 text-navy">{project.status ?? 'Pending'}</span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-ink-soft">
                <div className="rounded-xl bg-cream-100/50 p-3">
                  <p className="text-xs uppercase tracking-wider">Likes</p>
                  <p className="mt-1 text-base font-semibold text-ink">{project.likes ?? 0}</p>
                </div>
                <div className="rounded-xl bg-cream-100/50 p-3">
                  <p className="text-xs uppercase tracking-wider">Views</p>
                  <p className="mt-1 text-base font-semibold text-ink">{project.views ?? 0}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create New Project"
        description="Start a new project for your club"
        size="md"
      >
        <form onSubmit={handleCreateProject} className="space-y-4">
          <div>
            <label className="label-base">Project Name</label>
            <input name="title" required className="input-base mt-1.5 w-full" placeholder="e.g. Website Redesign" />
          </div>
          <div>
            <label className="label-base">Description</label>
            <textarea name="description" required rows={3} className="input-base mt-1.5 w-full resize-none" placeholder="Describe the project..." />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label-base">Due Date</label>
              <input name="dueDate" className="input-base mt-1.5 w-full" placeholder="e.g. Aug 15" />
            </div>
            <div>
              <label className="label-base">Team Size</label>
              <input name="teamSize" type="number" min="1" required className="input-base mt-1.5 w-full" placeholder="e.g. 5" defaultValue="3" />
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <Button variant="secondary" type="button" onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" leftIcon="Plus" loading={isSubmitting}>
              + Create Project
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}