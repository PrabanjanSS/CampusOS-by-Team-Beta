import { motion } from 'framer-motion';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Avatar } from '../../components/ui/Avatar';
import { FadeIn, StaggerGroup, StaggerItem } from '../../components/ui/motion';
import { mockLeaderboard } from '../../utils/mockData';

import { useAuth } from '../../context/AuthContext';
import { MemberProfileModal } from '../../components/ui/MemberProfileModal';
import { useState } from 'react';

const podiumIcons = [Trophy, Medal, Award];
const podiumColors = ['#F59E0B', '#9CA3AF', '#CD7F32'];

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [selectedMemberName, setSelectedMemberName] = useState<string | null>(null);
  
  const leaderboardData = mockLeaderboard.map((p) => {
    if (p.rank === 7 && user) {
      return {
        ...p,
        name: user.name || p.name,
        club: user.club || p.club,
        avatarUrl: user.avatarUrl || p.avatarUrl,
        points: p.points
      };
    }
    return p;
  });

  const top3 = leaderboardData.slice(0, 3);
  const rest = leaderboardData.slice(3);

  return (
    <div className="space-y-6">
      <FadeIn>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">Leaderboard</h1>
          <p className="mt-1 text-sm text-ink-soft">Top contributors across all clubs this semester.</p>
        </div>
      </FadeIn>

      {/* Podium */}
<FadeIn delay={0.08}>
  <div className="grid gap-6 sm:grid-cols-3 items-end">
    {[1, 0, 2].map((idx, displayIdx) => {
      const p = top3[idx];
      const Icon = podiumIcons[idx];
      const color = podiumColors[idx];

      return (
        <motion.div
          key={p.rank}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: displayIdx * 0.12,
            type: "spring",
            stiffness: 220,
          }}
          className={idx === 0 ? "sm:-mt-8" : ""}
        >
          <div
            onClick={() => setSelectedMemberName(p.name)}
            className={`card-surface flex flex-col items-center rounded-3xl p-8 text-center cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
              idx === 0
                ? "ring-2 ring-yellow-400/30 shadow-2xl"
                : "shadow-soft"
            }`}
          >
            <div className="relative">
              <Avatar
                name={p.name}
                src={p.avatarUrl}
                size="xl"
                ring
              />

              <div
                className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white text-white shadow-lg"
                style={{ backgroundColor: color }}
              >
                <Icon className="h-5 w-5" />
              </div>
            </div>

            <h3 className="mt-5 text-2xl font-bold text-ink">
              {p.name}
            </h3>

            <p className="mt-1 text-sm text-ink-soft">
              {p.club}
            </p>

            <div className="mt-6">
              <p className="text-5xl font-extrabold tracking-tight text-navy">
                {p.points.toLocaleString()}
              </p>

              <p className="mt-1 text-sm text-ink-soft">
                points
              </p>
            </div>
          </div>
        </motion.div>
      );
    })}
  </div>
</FadeIn>
      {/* Rest */}
      <StaggerGroup>
        <Card>
          <div className="divide-y divide-border-soft">
            {rest.map((p, i) => (
              <StaggerItem key={p.rank}>
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setSelectedMemberName(p.name)}
                  className="flex items-center gap-4 py-3.5 cursor-pointer hover:bg-cream-100/40 px-3 rounded-xl transition-all"
                >
                  <span className="w-8 text-center text-sm font-bold text-ink-soft">{p.rank}</span>
                  <Avatar name={p.name} src={p.avatarUrl} size="md" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-ink">{p.name}</p>
                    <p className="text-xs text-ink-soft">{p.club}</p>
                  </div>
                  <div className="hidden items-center gap-1.5 text-xs font-medium text-success sm:flex">
                    <TrendingUp className="h-3.5 w-3.5" /> +{Math.floor(Math.random() * 80 + 20)}
                  </div>
                  <span className="w-20 text-right text-sm font-bold text-navy">{p.points.toLocaleString()}</span>
                </motion.div>
              </StaggerItem>
            ))}
          </div>
        </Card>
      </StaggerGroup>

      <MemberProfileModal
        memberName={selectedMemberName}
        onClose={() => setSelectedMemberName(null)}
      />
    </div>
  );
}
