import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/ui/Button";
import { FadeIn, StaggerGroup, StaggerItem } from "../../components/ui/motion";
import type { Poll } from "../../types/poll";
import { mockPolls } from "../../data/mockPolls";
import PollCard from "../../components/polls/PollCard";
import CreatePollModal from "../../components/polls/CreatePollModal";

export default function PollsPage() {
  const { role } = useAuth();
  const canCreate = role === "lead" || role === "faculty";
  const [showModal, setShowModal] = useState(false);
  const [polls, setPolls] = useState<Poll[]>([]);
  const [userVotes, setUserVotes] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem("campusos_user_votes");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    const saved = localStorage.getItem("campus_polls");
    if (saved) {
      setPolls(JSON.parse(saved));
    } else {
      setPolls(mockPolls);
    }
  }, []);

  useEffect(() => {
    if (polls.length > 0) {
      localStorage.setItem("campus_polls", JSON.stringify(polls));
    }
  }, [polls]);

  const handleCreatePoll = (poll: Poll) => {
    setPolls((prev) => [poll, ...prev]);
  };

  const handleVote = (pollId: string, optionId: string) => {
    // Prevent multiple votes on the same poll
    if (userVotes[pollId]) return;

    // Register vote locally
    const updatedVotes = { ...userVotes, [pollId]: optionId };
    setUserVotes(updatedVotes);
    localStorage.setItem("campusos_user_votes", JSON.stringify(updatedVotes));

    setPolls((prev) =>
      prev.map((poll) => {
        if (poll.id !== pollId) return poll;
        return {
          ...poll,
          options: poll.options.map((option) =>
            option.id === optionId
              ? {
                  ...option,
                  votes: option.votes + 1,
                }
              : option
          ),
        };
      })
    );
  };

  return (
    <div className="space-y-6 pb-12">
      <FadeIn>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Campus Polls
            </h1>
            <p className="mt-1 text-sm text-ink-soft">
              Vote on club decisions and upcoming activities.
            </p>
          </div>
          {canCreate && (
            <Button leftIcon="Plus" onClick={() => setShowModal(true)} magnetic>
              Create Poll
            </Button>
          )}
        </div>
      </FadeIn>

      <StaggerGroup className="grid gap-6 md:grid-cols-2">
        {polls.length === 0 ? (
          <StaggerItem className="md:col-span-2">
            <div className="card-surface p-12 text-center">
              <h2 className="text-xl font-bold text-ink">
                No Polls Yet
              </h2>
              <p className="mt-2 text-sm text-ink-soft">
                {canCreate
                  ? "Create your first poll to start collecting votes."
                  : "There are currently no active polls."}
              </p>
            </div>
          </StaggerItem>
        ) : (
          polls.map((poll) => (
            <StaggerItem key={poll.id}>
              <PollCard
                poll={poll}
                onVote={handleVote}
                userVoteOptionId={userVotes[poll.id]}
              />
            </StaggerItem>
          ))
        )}
      </StaggerGroup>

      <CreatePollModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onCreate={handleCreatePoll}
      />
    </div>
  );
}
