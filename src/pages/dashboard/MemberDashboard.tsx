import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  CalendarDays, Clock, MapPin, Trophy, Award, Star,
  BookOpen, Bell,
} from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';
import { StatCard } from '../../components/ui/StatCard';
import { FadeIn, StaggerGroup, StaggerItem } from '../../components/ui/motion';
import { useAuth } from '../../context/AuthContext';

import { EventActionModal, type EventActionDetails } from '../../components/events/EventActionModal';
import {
   
  
  
  mockBlogPosts,
  mockAnnouncements,
  mockLeaderboard,
  buildMockCalendar,
  mockEvents,
} from '../../utils/mockData';
import type { StatCard as StatCardType } from "../../types";

export default function MemberDashboard() {
  const { user } = useAuth();
  const [selectedEvent, setSelectedEvent] = useState<EventActionDetails | null>(null);

const [registeredEvents, setRegisteredEvents] = useState<string[]>(() =>
  JSON.parse(localStorage.getItem("registeredEvents") || "[]")
);
  const [events, setEvents] = useState(() => {
   

    const saved = localStorage.getItem('campusos_events');
    return saved ? JSON.parse(saved) : mockEvents;
  });
  const [announcements] = useState(() => {
    const saved = localStorage.getItem('campusos_announcements');
    return saved ? JSON.parse(saved) : mockAnnouncements;
  });
  useEffect(() => {
  const update = () => {
    setRegisteredEvents(
      JSON.parse(localStorage.getItem("registeredEvents") || "[]")
    );

    const savedEvents = localStorage.getItem("campusos_events");
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  };

  update();

  window.addEventListener("campusos_event_registered", update);

  return () =>
    window.removeEventListener(
      "campusos_event_registered",
      update
    );
}, []);
  const calendar = buildMockCalendar(events);
  const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const firstName = user?.name?.split(' ')[0] ?? 'there';

  // Simulate finding this member in the leaderboard
 const myRank = 0;
const myPoints = 0;

const memberStats: StatCardType[] = [
  {
    id: "ms1",
    label: "Events Attended",
    value: 0,
    icon: "CalendarDays",
    accent: "navy",
  },
  {
    id: "ms2",
    label: "Leaderboard Rank",
    value: myRank,
    icon: "Trophy",
    accent: "warning",
  },
  {
    id: "ms3",
    label: "Club Points",
    value: myPoints,
    suffix: "pts",
    icon: "Star",
    accent: "sand",
  },
  {
    id: "ms4",
    label: "Certificates",
    value: user?.certificates?.length ?? 0,
    icon: "Award",
    accent: "success",
  },
];
  return (
    <div className="space-y-6">
      {/* Greeting */}
      <FadeIn>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-ink-soft">{greeting},</p>
            <h1 className="mt-0.5 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              {firstName} <span className="text-ink-soft/40">·</span>{' '}
              <span className="capitalize text-navy">Club Member</span>
            </h1>
            <p className="mt-1.5 text-sm text-ink-soft">
              {user?.club && <><span className="font-medium text-ink">{user.club}</span> · </>}
              {user?.department} · {user?.year}
            </p>
          </div>
          <div className="flex gap-2.5">
            <Link to="/app/events">
              <Button variant="secondary" leftIcon="Search" size="md">Find Events</Button>
            </Link>
            <Link to="/app/profile">
              <Button leftIcon="UserRound" size="md" magnetic>My Profile</Button>
            </Link>
          </div>
        </div>
      </FadeIn>

      {/* Stats */}
      <StaggerGroup className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {memberStats.map((stat, i) => (
  <StaggerItem key={stat.id}>
    <StatCard stat={stat} index={i} />
  </StaggerItem>
))}
      </StaggerGroup>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left col */}
        <div className="space-y-6 lg:col-span-2">

          {/* Upcoming events */}
          <FadeIn delay={0.1}>
            <Card>
              <CardHeader
                title="Upcoming Events"
                subtitle="Events happening at your campus"
                action={<Link to="/app/events"><Button variant="ghost" size="sm" rightIcon="ArrowRight">View all</Button></Link>}
              />
              <div className="space-y-3">
  {events
  .filter((e: any) => e.status === "upcoming")
  .map((e: any, i: number) => (
    <motion.div
                    key={e.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.08 }}
                    className="flex items-center gap-4 rounded-xl border border-border-soft bg-cream-100/40 p-3.5 transition-all hover:border-navy/20 hover:bg-white hover:shadow-soft"
                  >
                    <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-navy text-white">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-ink">{e.title}</p>
                      <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-ink-soft">
                        <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {e.time}</span>
                        <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {e.location}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge tone="navy" dot>{e.tag}</Badge>
                   <Button
  variant={
    registeredEvents.includes(String(e.id))
      ? "outline"
      : "secondary"
  }
  size="sm"
  disabled={registeredEvents.includes(String(e.id))}
  onClick={() => setSelectedEvent(e)}
>
  {registeredEvents.includes(String(e.id))
    ? "✓ Registered"
    : "Register"}
</Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </FadeIn>

          {/* My registered events */}
          <FadeIn delay={0.14}>
            <Card>
              <CardHeader
                title="My Registered Events"
                subtitle="Events you're signed up for"
                action={<Badge tone="navy">{registeredEvents.length} upcoming</Badge>}
              />
              <div className="space-y-3">
  {registeredEvents.length === 0 ? (
    <div className="rounded-xl border border-dashed border-border-soft p-8 text-center">
      <CalendarDays className="mx-auto h-10 w-10 text-ink-soft" />
      <p className="mt-3 text-sm font-medium text-ink">
        No registered events yet
      </p>
      <p className="mt-1 text-xs text-ink-soft">
        Register for an event to see it here.
      </p>
    </div>
  ) : (
    events
      .filter((e: any) => registeredEvents.includes(String(e.id)))
      .map((e: any, i: number) => (
        <motion.div
  key={e.id}
  initial={{ opacity: 0, x: -12 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.18 + i * 0.08 }}
  className="flex items-center gap-3 rounded-xl border border-navy/15 bg-navy/[0.03] p-3.5"
>
  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy/10 text-navy">
    <CalendarDays className="h-4 w-4" />
  </div>

  <div className="min-w-0 flex-1">
    <p className="truncate text-sm font-semibold text-ink">
      {e.title}
    </p>
    <p className="text-xs text-ink-soft">
      {e.time} · {e.location}
    </p>
  </div>

  <Badge tone="success" dot>
    Registered
  </Badge>
</motion.div>
      ))
  )}
</div>
            </Card>
          </FadeIn>

          {/* Recent blogs */}
          <FadeIn delay={0.18}>
            <Card>
              <CardHeader
                title="Recent Blogs"
                subtitle="Latest from the community"
                action={<Link to="/app/blogs"><Button variant="ghost" size="sm" rightIcon="ArrowRight">Read all</Button></Link>}
              />
              <div className="grid gap-3 sm:grid-cols-2">
                {mockBlogPosts.slice(0, 2).map((post, i) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.22 + i * 0.07 }}
                    whileHover={{ y: -3 }}
                    className="overflow-hidden rounded-xl border border-border-soft transition-shadow hover:shadow-card"
                  >
                    <img src={post.cover} alt="" className="h-32 w-full object-cover" />
                    <div className="p-3.5">
                      <p className="text-sm font-semibold leading-snug text-ink">{post.title}</p>
                      <p className="mt-1.5 flex items-center gap-2 text-xs text-ink-soft">
                        <BookOpen className="h-3 w-3" /> {post.readTime} · {post.author}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </FadeIn>
        </div>

        {/* Right col */}
        <div className="space-y-6">

          {/* Profile summary */}
          <FadeIn delay={0.1}>
            <Card>
              <div className="flex flex-col items-center p-2 text-center">
                <Avatar name={user?.name ?? 'User'} src={user?.avatarUrl} size="xl" ring className="shadow-card" />
                <h3 className="mt-3 text-base font-bold text-ink">{user?.name}</h3>
                <p className="text-xs text-ink-soft">{user?.department} · {user?.year}</p>
                <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                 {user?.badges?.length === 0 ? (
  <Badge tone="neutral">No badges yet</Badge>
) : (
  user?.badges?.slice(0, 2).map((b) => (
    <Badge key={b.id} tone="neutral">
      {b.label}
    </Badge>
  ))
)}

                </div>
                <div className="mt-4 grid w-full grid-cols-3 gap-2 border-t border-border-soft pt-4">
                  {[
                    {
  label: 'Rank',
  val: myRank === 0 ? 'N/A' : `#${myRank}`,
  icon: Trophy,
},
                    { label: 'Points', val: `${myPoints}`,              icon: Star   },
                    { label: 'Certs',  val: `${user?.certificates?.length ?? 0}`, icon: Award  },
                  ].map((s) => (
                    <div key={s.label} className="flex flex-col items-center gap-0.5">
                      <s.icon className="h-4 w-4 text-navy" />
                      <p className="text-base font-bold text-ink">{s.val}</p>
                      <p className="text-[0.68rem] text-ink-soft">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </FadeIn>

          {/* Calendar */}
          <FadeIn delay={0.12}>
            <Card>
              <CardHeader title="Calendar" subtitle={new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} />
              <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[0.68rem] font-semibold text-ink-soft">
                {weekdays.map((d, i) => <div key={i}>{d}</div>)}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {calendar.map((d, i) => (
                  <motion.div
                    key={i}
                    whileHover={d.day ? { scale: 1.08 } : {}}
                    onClick={() => {
                      if (d.events > 0) {
                        const ev = events.find((e: any) =>
                          e.date.toLowerCase() === 'jul ' + d.day ||
                          e.date.toLowerCase() === 'jul 0' + d.day
                        );
                        if (ev) {
                          setSelectedEvent(ev);
                        }
                      }
                    }}
                    className={`relative flex aspect-square items-center justify-center rounded-lg text-xs transition-colors ${
                      d.inMonth ? 'text-ink' : 'text-ink-soft/30'
                    } ${
                      d.isToday
                        ? 'bg-navy font-bold text-white shadow-soft'
                        : d.events > 0
                        ? 'cursor-pointer font-bold text-navy hover:bg-navy/10 ring-1 ring-navy/20'
                        : d.day
                        ? 'hover:bg-cream-200 cursor-pointer'
                        : ''
                    }`}
                  >
                    {d.day || ''}
                    {d.events > 0 && !d.isToday && (
                      <span className="absolute bottom-1 h-1.5 w-1.5 rounded-full bg-navy" />
                    )}
                  </motion.div>
                ))}
              </div>
            </Card>
          </FadeIn>

          {/* Leaderboard snippet */}
          <FadeIn delay={0.14}>
            <Card>
              <CardHeader
                title="Leaderboard"
                subtitle="Top contributors"
                action={<Link to="/app/leaderboard"><Button variant="ghost" size="sm">View all</Button></Link>}
              />
              <div className="space-y-2.5">
                {mockLeaderboard.slice(0, 5).map((p, i) => (
                  <motion.div
                    key={p.rank}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.18 + i * 0.06 }}
                    className={`flex items-center gap-3 rounded-lg p-2 ${p.rank === myRank ? 'bg-navy/[0.04] ring-1 ring-navy/15' : ''}`}
                  >
                    <span className={`w-6 text-center text-xs font-bold ${p.rank <= 3 ? 'text-[#b07314]' : 'text-ink-soft'}`}>
                      {p.rank}
                    </span>
                    <Avatar name={p.name} src={p.avatarUrl} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-xs font-semibold text-ink">{p.name}</p>
                    </div>
                    <span className="text-xs font-bold text-navy">{p.points.toLocaleString()}</span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </FadeIn>

          {/* Announcements */}
          <FadeIn delay={0.18}>
            <Card>
              <CardHeader title="Announcements" action={<Bell className="h-4 w-4 text-ink-soft" />} />
              <div className="space-y-3">
                {announcements.slice(0, 2).map((a: any, i: number) => (
                  <motion.div
                    key={a.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.22 + i * 0.07 }}
                    className="rounded-xl border border-border-soft p-3"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`h-1.5 w-1.5 rounded-full ${a.priority === 'high' ? 'bg-danger' : a.priority === 'normal' ? 'bg-warning' : 'bg-ink-soft/40'}`} />
                      <p className="flex-1 truncate text-sm font-semibold text-ink">{a.title}</p>
                    </div>
                    <p className="mt-1.5 line-clamp-2 text-xs text-ink-soft">{a.body}</p>
                    <p className="mt-2 text-[0.68rem] text-ink-soft/70">{a.author} · {a.date}</p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </FadeIn>

          {/* My achievements */}
          <FadeIn delay={0.22}>
            <Card>
              <CardHeader title="My Achievements" />
              <div className="space-y-2.5">
                {user?.achievements?.length === 0 ? (
  <div className="rounded-xl border border-dashed border-border-soft p-8 text-center">
    <Trophy className="mx-auto h-10 w-10 text-ink-soft" />
    <p className="mt-3 text-sm font-medium text-ink">
      No achievements yet
    </p>
    <p className="mt-1 text-xs text-ink-soft">
      Participate in events to earn achievements.
    </p>
  </div>
) : (
  user?.achievements?.map((a, i) => ( 
                  <motion.div
                    key={a.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.26 + i * 0.07 }}
                    className="flex items-start gap-3 rounded-xl border border-border-soft p-3"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy/10 text-navy">
                      <Trophy className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ink">{a.title}</p>
                      <p className="text-xs text-ink-soft">{a.description}</p>
                    </div>
                  </motion.div>
                )))}
              </div>
            </Card>
          </FadeIn>
        </div>
      </div>
      <EventActionModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </div>
  );
}
