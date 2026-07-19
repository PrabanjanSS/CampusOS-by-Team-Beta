import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,  ShieldCheck, Crown, Users,
   CalendarDays, FolderKanban, Trophy,
} from 'lucide-react';
import { ROLES, APP_NAME, APP_TAGLINE, APP_DESCRIPTION, LANDING_STATS } from '../utils/constants';
import type { Role } from '../types';
import { AuroraBackground } from '../components/layout/AuroraBackground';

const roleIcons: Record<Role, typeof Users> = {
  member:  Users,
  lead:    Crown,
  faculty: ShieldCheck,
};

const features = [
  {
    icon: CalendarDays,
    title: 'Events & Registrations',
    desc: 'Create, manage, and discover campus events. Automated reminders, attendee tracking, and post-event reports — all in one place.',
  },
  {
    icon: FolderKanban,
    title: 'Projects & Collaboration',
    desc: 'Run club projects like a product team. Assign tasks, track progress, and ship deliverables that outlast a semester.',
  },
  {
    icon: Trophy,
    title: 'Recognition & Leaderboards',
    desc: 'Reward contribution with badges, certificates, and real-time leaderboards that motivate every member.',
  },
];
const galleryImages = [
  
  {
    
    title: "Hackathon 2026",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952",
  },
  {
    title: "AI Workshop",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  },
  {
    title: "Robotics Expo",
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780",
  },
  {
    title: "Cultural Fest",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
  },
  {
    title: "Sports Meet",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
  },
  {
    title: "Award Ceremony",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865",
  },
];

const FadeUpItem = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, type: 'spring', stiffness: 200, damping: 24 }}
  >
    {children}
  </motion.div>
);

export default function Landing() {
  const buttonLabels = {
  member: "Member",
  lead: "Lead",
  faculty: "Faculty",
};
  return (
    <div className="relative min-h-screen overflow-hidden bg-cream">
      <AuroraBackground />

      {/* ── Navbar ──────────────────────────────────────────── */}
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 28 }}
        className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-5"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-soft p-1">
  <img
    src="/favicon.png"
    alt="CampusOS"
    className="h-8 w-8 object-contain"
  />
</div>
          <div>
            <span className="text-lg font-bold tracking-tight text-ink">{APP_NAME}</span>
            <span className="ml-2 hidden rounded-full border border-border-soft bg-white/70 px-2.5 py-0.5 text-[0.7rem] font-medium text-ink-soft sm:inline">
              {APP_DESCRIPTION}
            </span>
          </div>
        </div>
        <div className="hidden items-center gap-8 text-sm font-medium text-ink-soft md:flex">
          <a href="#features"  className="transition-colors hover:text-navy">Features</a>
          <a href="#roles"     className="transition-colors hover:text-navy">Roles</a>
          <a href="#stats"     className="transition-colors hover:text-navy">Impact</a>
        </div>
        <Link
          to="/login/member"
          className="rounded-xl bg-navy px-4 py-2 text-sm font-semibold text-white shadow-soft transition-all hover:bg-navy-600 hover:shadow-lift"
        >
          Sign in
        </Link>
      </motion.nav>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-10 pt-16 text-center sm:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 24 }}
          className="mx-auto inline-flex items-center gap-2 rounded-full border border-border-soft bg-white/70 px-4 py-1.5 text-xs font-semibold text-navy backdrop-blur"
        >
          <span className="flex h-1.5 w-1.5 rounded-full bg-success" />
          {APP_TAGLINE}
        </motion.div>

        <motion.h1
  initial={{ opacity: 0, y: 24 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    delay: 0.16,
    type: "spring",
    stiffness: 180,
    damping: 22,
  }}
  className="mx-auto mt-6 max-w-4xl text-balance text-5xl font-bold leading-[1.06] tracking-tight sm:text-7xl"
>
  <span className="block text-ink">
    One Platform.
  </span>

  <span className="block text-navy">
    Every Club.
  </span>

  <span className="block text-[#5f6673]">
    Every Achievement.
  </span>
</motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26 }}
          className="mx-auto mt-6 max-w-2xl text-balance text-lg text-ink-soft"
        >
          {APP_NAME} unifies events, projects, blogs, galleries, and leaderboards into one
          elegant platform — built for every campus, every club, every role.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#roles"
            className="group inline-flex items-center gap-2 rounded-xl bg-navy px-6 py-3 text-sm font-semibold text-white shadow-soft transition-all hover:bg-navy-600 hover:shadow-lift"
          >
            Choose your role
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#features"
            className="inline-flex items-center gap-2 rounded-xl border border-border-soft bg-white/70 px-6 py-3 text-sm font-semibold text-navy backdrop-blur transition-all hover:border-navy/30 hover:shadow-card"
          >
            Explore features
          </a>
        </motion.div>
      </section>

      {/* ── Role selection ───────────────────────────────────── */}
      <section id="roles" className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 text-center">
          <FadeUpItem>
            <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Three roles. One platform.
            </h2>
          </FadeUpItem>
          <FadeUpItem delay={0.08}>
            <p className="mx-auto mt-3 max-w-xl text-ink-soft">
              Select how you participate in campus life. Each experience is tailored precisely to your responsibilities.
            </p>
          </FadeUpItem>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {(Object.keys(ROLES) as Role[]).map((roleKey, i) => {
            const role = ROLES[roleKey];
            const RoleIcon = roleIcons[roleKey];
            return (
              <motion.div
                key={roleKey}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 200, damping: 22 }}
                whileHover={{ y: -8 }}
              >
                <Link to={role.loginPath} className="gradient-border group block rounded-3xl">
                  <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/70 p-7 shadow-card backdrop-blur-xl transition-shadow duration-300 group-hover:shadow-lift">
                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-navy/8 blur-2xl transition-all duration-500 group-hover:scale-125 group-hover:bg-navy/14" />
                    <div className="relative">
                      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${role.gradient} text-white shadow-soft transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110`}>
                        <RoleIcon className="h-7 w-7" />
                      </div>
                      <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-[#8a6d3b]">
                        {role.tagline}
                      </p>
                      <h3 className="mt-1 text-xl font-bold text-ink">{role.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-ink-soft">{role.description}</p>
                      <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-navy transition-all group-hover:gap-2.5">
                        Continue as {buttonLabels[roleKey]}
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────── */}
      <section id="features" className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 text-center">
          <FadeUpItem>
            <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Everything a club needs.
            </h2>
          </FadeUpItem>
          <FadeUpItem delay={0.08}>
            <p className="mx-auto mt-3 max-w-lg text-ink-soft">
              Purpose-built modules that grow with your club — from day one to demo day.
            </p>
          </FadeUpItem>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f, i) => (
            <FadeUpItem key={f.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="card-surface p-6 transition-shadow hover:shadow-lift"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sand/25 text-[#8a6d3b]">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-ink">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{f.desc}</p>
              </motion.div>
            </FadeUpItem>
          ))}
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────── */}
      <section id="stats" className="relative z-10 mx-auto max-w-5xl px-6 py-16">
        <div className="grid grid-cols-2 gap-6 rounded-3xl border border-border-soft bg-white/70 p-8 backdrop-blur md:grid-cols-4">
          {LANDING_STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.88 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, type: 'spring', stiffness: 200 }}
              className="text-center"
            >
              <p className="text-4xl font-bold tracking-tight text-navy">{s.value}</p>
              <p className="mt-1 text-sm text-ink-soft">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      
      {/* ── Campus Moments ───────────────────────────────────── */}
<section className="relative z-10 overflow-hidden bg-cream py-24">

  <div className="mx-auto mb-14 max-w-3xl text-center">

    <span className="inline-flex items-center rounded-full border border-border-soft bg-white px-4 py-1 text-xs font-semibold text-navy shadow-soft">
      📸 LIVE CAMPUS GALLERY
    </span>

    <h2 className="mt-5 text-5xl font-bold tracking-tight text-ink">
     Campus Moments ✨
    </h2>

    <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-soft">
      Experience the vibrant life of CampusOS through hackathons,
      AI workshops, cultural festivals, club activities,
      competitions and student achievements.
    </p>

  </div>

  
<div className="relative mt-16">

  {/* Left Fade */}
  <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-28 bg-gradient-to-r from-cream to-transparent" />

  {/* Right Fade */}
  <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-28 bg-gradient-to-l from-cream to-transparent" />
  </div> 

  {/* First Row */}
  <motion.div
    animate={{ x: ["0%", "-50%"] }}
    transition={{
      repeat: Infinity,
      ease: "linear",
      duration: 55,
    }}
    className="flex gap-8"
  >
    {[...galleryImages, ...galleryImages].map((item, index) => (

<div
key={index}
className="
group
relative
h-80
w-[460px]
shrink-0
overflow-hidden
rounded-[32px]
shadow-xl
transition-all
duration-500
hover:-translate-y-2
hover:shadow-2xl
"
>

<img
src={item.image}
alt={item.title}
className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
/>

<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100">

<div className="absolute bottom-6 left-6">

<h3 className="text-3xl font-bold text-white drop-shadow-lg">

{item.title}

</h3>

<p className="mt-1 text-base text-white/90">
Experience • Innovation • Collaboration
</p>

</div>

</div>

</div>

))}

  </motion.div>
  
</section>
<div className="mt-16 text-center">

<p className="text-lg text-ink-soft">

Every event begins with an idea.
Every achievement begins with participation.

</p>

<Link
to="/login/member"
className="mt-8 inline-flex items-center gap-2 rounded-xl bg-navy px-7 py-4 text-white shadow-soft transition hover:bg-navy-600"
>

Start Your Journey

<ArrowRight className="h-4 w-4"/>

</Link>

</div>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-border-soft bg-white/40 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-sm text-ink-soft sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white shadow-sm p-1">
  <img
    src="/favicon.png"
    alt="CampusOS"
    className="h-5 w-5 object-contain"
  />
</div>
            <span className="font-semibold text-ink">{APP_NAME}</span>
            <span className="text-ink-soft/50">·</span>
            <span>{APP_DESCRIPTION}</span>
          </div>
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} {APP_NAME}</span>
            <span className="text-ink-soft/40">·</span>
            <a href="#" className="transition-colors hover:text-navy">Privacy</a>
            <a href="#" className="transition-colors hover:text-navy">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}