import { Users, Calendar, CheckCircle } from "lucide-react";
import type { Poll } from "../../types/poll";
import { Badge } from "../ui/Badge";

interface Props {
  poll: Poll;
  onVote: (pollId: string, optionId: string) => void;
  userVoteOptionId?: string; // optionId if user voted, undefined if not
}

export default function PollCard({ poll, onVote, userVoteOptionId }: Props) {
  const totalVotes = poll.options.reduce(
    (sum, option) => sum + option.votes,
    0
  );

  return (
    <div className="card-surface p-6 sm:p-7">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-ink">
            {poll.title}
          </h2>
          <p className="mt-1 text-sm text-ink-soft">
            {poll.description}
          </p>
        </div>
        <Badge tone={poll.isActive ? "success" : "danger"} dot>
          {poll.isActive ? "Active" : "Closed"}
        </Badge>
      </div>

      {/* Options */}
      <div className="mt-6 space-y-5">
        {poll.options.map((option) => {
          const percent =
            totalVotes === 0
              ? 0
              : Math.round((option.votes / totalVotes) * 100);

          const hasVotedThis = userVoteOptionId === option.id;
          const hasVotedAny = !!userVoteOptionId;

          return (
            <div key={option.id} className="group">
              <div className="mb-2 flex justify-between items-center text-sm">
                <h3 className={`font-semibold transition-colors ${hasVotedThis ? 'text-navy font-bold' : 'text-ink group-hover:text-navy'}`}>
                  {option.text}
                  {hasVotedThis && (
                    <span className="ml-2 inline-flex items-center gap-1 rounded bg-navy/10 px-1.5 py-0.5 text-[0.65rem] font-bold text-navy">
                      Your Vote
                    </span>
                  )}
                </h3>
                <span className="text-xs font-semibold text-ink-soft bg-cream-100 px-2 py-0.5 rounded-md">
                  {option.votes} votes • {percent}%
                </span>
              </div>

              <div className="h-2.5 overflow-hidden rounded-full bg-beige">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${hasVotedThis ? 'bg-navy' : hasVotedAny ? 'bg-navy/40' : 'bg-navy'}`}
                  style={{
                    width: `${percent}%`,
                  }}
                />
              </div>

              {!hasVotedAny ? (
                <button
                  type="button"
                  onClick={() => onVote(poll.id, option.id)}
                  disabled={!poll.isActive}
                  className="mt-2.5 flex items-center gap-1.5 rounded-lg bg-navy/5 border border-navy/10 px-3 py-1.5 text-xs font-bold text-navy transition-colors hover:bg-navy hover:text-white hover:border-navy cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <CheckCircle size={14} />
                  Vote
                </button>
              ) : (
                hasVotedThis && (
                  <div className="mt-2 text-xs font-bold text-navy flex items-center gap-1">
                    <CheckCircle size={14} className="text-navy" /> Voted
                  </div>
                )
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center gap-6 border-t border-border-soft/60 pt-4 text-xs font-medium text-ink-soft">
        <div className="flex items-center gap-1.5">
          <Users size={14} className="text-navy" />
          <span>{totalVotes} Votes</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar size={14} className="text-navy" />
          <span>Ends {poll.expiresAt}</span>
        </div>
      </div>
    </div>
  );
}
