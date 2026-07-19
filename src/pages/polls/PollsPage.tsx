import { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { FadeIn } from '../../components/ui/motion';
import CreatePollModal from '../../components/polls/CreatePollModal';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { pollsService, type Poll as ApiPoll } from '../../services/polls';
import PollCard from '../../components/polls/PollCard';
import type { Poll as LegacyPoll } from '../../types/poll';

export default function PollsPage() {
  const { toast } = useToast();
  const { user } = useAuth();
  const canCreate = user?.role === 'lead' || user?.role === 'faculty';
  const [polls, setPolls] = useState<ApiPoll[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [userVotes, setUserVotes] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('campusos_user_votes');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    let isMounted = true;

    const loadPolls = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await pollsService.getAll();
        if (!isMounted) return;
        setPolls(response.polls ?? []);
      } catch (err) {
        if (!isMounted) return;

        const message = err instanceof Error ? err.message : 'Unable to load polls.';
        setError(message);
        toast({ title: 'Error', description: message, variant: 'error' });
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadPolls();

    return () => {
      isMounted = false;
    };
  }, [toast]);

  const handleCreatePoll = async (poll: LegacyPoll) => {
    const response = await pollsService.create({
      question: poll.title,
      options: poll.options.map((option) => ({
        text: option.text,
        votes: option.votes,
      })),
    });

    const createdPoll = response.poll ?? {
      id: poll.id,
      question: poll.title,
      options: poll.options,
      createdBy: poll.createdBy,
    };

    setPolls((prev) => [createdPoll, ...prev]);

    toast({
      title: 'Success',
      description: 'Poll created successfully.',
      variant: 'success',
    });
  };

  const handleVote = async (pollId: string, optionId: string) => {
    console.log('Vote clicked for:', pollId, optionId);

    if (userVotes[pollId]) return;

    const poll = polls.find((entry) => String(entry.id) === pollId);
    if (!poll) return;

    const optionIndex = poll.options.findIndex((option) => String(option.id) === optionId);
    if (optionIndex < 0) return;

    try {
      console.log('Sending request to API...');
      const response = await pollsService.vote(pollId, { optionIndex });
      console.log('Response:', response);
      const updatedPoll = response.poll ?? poll;

      setPolls((prev) =>
        prev.map((entry) => (String(entry.id) === pollId ? updatedPoll : entry))
      );

      const updatedVotes = { ...userVotes, [pollId]: optionId };
      setUserVotes(updatedVotes);
      localStorage.setItem('campusos_user_votes', JSON.stringify(updatedVotes));

      toast({
        title: 'Vote submitted',
        description: 'Your response has been recorded.',
        variant: 'success',
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to submit vote.';
      console.error('Vote failed:', err);
      toast({ title: 'Error', description: message, variant: 'error' });
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <FadeIn>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">Campus Polls</h1>
            <p className="mt-1 text-sm text-ink-soft">Live data loaded from the polls service.</p>
          </div>
          {canCreate && (
            <Button type="button" leftIcon="Plus" onClick={() => setShowModal(true)}>
              Create New Poll
            </Button>
          )}
        </div>
      </FadeIn>

      {isLoading ? (
        <div className="card-surface flex items-center gap-3 p-6 text-sm text-ink-soft">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-navy/20 border-t-navy" />
          Loading polls...
        </div>
      ) : error ? (
        <div className="card-surface flex items-start gap-3 border border-danger/20 bg-danger/5 p-5 text-sm text-ink-soft">
          <AlertTriangle className="mt-0.5 h-4 w-4 text-danger" />
          <div>
            <p className="font-semibold text-ink">Unable to load polls</p>
            <p className="mt-1">{error}</p>
          </div>
        </div>
      ) : polls.length === 0 ? (
        <div className="card-surface p-10 text-center text-sm text-ink-soft">
          <p>No polls found.</p>
          {canCreate && (
            <div className="mt-4 flex justify-center">
              <Button type="button" leftIcon="Plus" onClick={() => setShowModal(true)}>
                Create New Poll
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {polls.map((poll) => (
            <PollCard
              key={poll.id ?? poll.question}
              poll={{
                id: String(poll.id ?? poll.question),
                title: poll.question,
                description: '',
                options: poll.options.map((option) => ({
                  id: String(option.id ?? option.text),
                  text: option.text,
                  votes: option.votes,
                })),
                createdBy: poll.createdBy ?? 'CampusOS',
                expiresAt: 'Open',
                isActive: true,
              }}
              onVote={handleVote}
              userVoteOptionId={userVotes[String(poll.id ?? poll.question)]}
            />
          ))}
        </div>
      )}

      <CreatePollModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onCreate={handleCreatePoll}
      />
    </div>
  );
}