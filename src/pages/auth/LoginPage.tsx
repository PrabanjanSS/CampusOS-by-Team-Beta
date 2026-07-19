import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Check, Crown, ShieldCheck, Users, 
  CalendarDays, Trophy, FolderKanban, Megaphone, BarChart3,
} from 'lucide-react';
import { Input, PasswordInput } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import { AuroraBackground } from '../../components/layout/AuroraBackground';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { ROLES, APP_NAME, APP_TAGLINE } from '../../utils/constants';
import type { Role } from '../../types';
import GoogleButton from "../../components/auth/GoogleButton";

// ─── Schema ──────────────────────────────────────────────────────────────────
const schema = z.object({
  email:    z.string().min(1, 'Email is required').email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
type FormValues = z.infer<typeof schema>;

// ─── Role illustration configs ────────────────────────────────────────────────
const roleConfig = {
  member: {
    icon:     Users,
    headline: 'Belong. Contribute. Get recognized.',
    subline:  'Every event, project, and achievement — tracked in one place.',
    bullets: [
      { icon: CalendarDays, text: 'Discover and join events instantly'   },
      { icon: Trophy,       text: 'Earn badges and climb the leaderboard' },
      { icon: FolderKanban, text: 'Build a portfolio of real projects'    },
    ],
    bg: 'from-navy-800 via-navy to-navy-400',
  },
  lead: {
    icon:     Crown,
    headline: 'Lead your club like a product team.',
    subline:  'Manage events, coordinate members, and track momentum — all from one dashboard.',
    bullets: [
      { icon: CalendarDays, text: 'Create and manage club events'         },
      { icon: FolderKanban, text: 'Track projects and team progress'      },
      { icon: Megaphone,    text: 'Post announcements to your members'    },
    ],
    bg: 'from-navy via-navy-600 to-navy-300',
  },
  faculty: {
    icon:     ShieldCheck,
    headline: 'Full visibility. Guided mentorship.',
    subline:  'Oversee every club, approve proposals, and mentor the next generation of leaders.',
    bullets: [
      { icon: BarChart3,    text: 'Monitor club performance at a glance'  },
      { icon: Check,        text: 'Approve events, budgets, and reports'  },
      { icon: Users,        text: 'Guide student leads with direct access' },
    ],
    bg: 'from-navy-900 via-navy-700 to-navy-500',
  },
};

// ─── Floating card decorator ──────────────────────────────────────────────────
function FloatingCard({ label, icon: Icon, delay, x, y }: { label: string; icon: typeof CalendarDays; delay: number; x: string; y: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 180, damping: 18 }}
      style={{ position: 'absolute', left: x, top: y } as React.CSSProperties}
      className="flex items-center gap-2.5 rounded-xl border border-white/20 bg-white/15 px-3 py-2 shadow-lg backdrop-blur-md"
    >
      <Icon className="h-4 w-4 text-white/90" />
      <span className="text-xs font-semibold text-white/90">{label}</span>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function LoginPage({ role }: { role: Role }) {
  const r = ROLES[role];
  const cfg = roleConfig[role];
  const RoleIcon = cfg.icon;

  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const demoLogin = (role: "member" | "lead" | "faculty") => {
    localStorage.setItem("campusos_token", "demo-token");

    localStorage.setItem(
      "campusos_user",
      JSON.stringify({
        id: "demo",
        name: `Demo ${role}`,
        email: `${role}@campusos.com`,
        role,
      })
    );

    window.location.href = `/app/${role}`;
  };

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);

    try {
      const session = await login({
        email: values.email,
        password: values.password,
        remember,
        role: role, // This will be auto-detected if role mapping exists
      });

      toast({
        title: "Welcome Back!",
        description: "Login successful.",
        variant: "success",
      });

      // Auto-redirect based on detected role
      navigate(`/app/${session.user.role}`);

    } catch (error: any) {
      let message = "Invalid email or password.";

      switch (error.code) {
        case "auth/user-not-found":
        case "auth/invalid-credential":
        case "auth/wrong-password":
          message = "Invalid email or password.";
          break;

        case "auth/too-many-requests":
          message = "Too many failed attempts. Please try again later.";
          break;

        case "auth/network-request-failed":
          message = "Network error. Please check your connection.";
          break;
      }

      toast({
        title: "Login Failed",
        description: message,
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const floatingCards = {
    member:  [
     
      
    ],
    lead:    [
      
    ],
    faculty: [
      { label: '12 Active Clubs',      icon: BarChart3,    delay: 0.6, x: '8%',  y: '22%' },
      
    ],
  };

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2">

      {/* ── Left panel — illustration ─────────────────────── */}
      <div className={`relative hidden overflow-hidden bg-gradient-to-br ${cfg.bg} lg:flex lg:flex-col lg:justify-between lg:p-12`}>
        <div className="absolute inset-0 bg-navy-radial opacity-60" />
        <AuroraBackground variant="dark" />

        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative flex items-center gap-2.5 text-white"
        >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
  <img
    src="/favicon.png"
    alt="CampusOS"
    className="h-7 w-7 object-contain"
  />
</div>
          <div>
            <p className="text-lg font-bold leading-tight">{APP_NAME}</p>
            <p className="text-xs text-white/60">{APP_TAGLINE}</p>
          </div>
        </motion.div>

        {/* Floating role badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, type: 'spring' }}
          className="absolute right-8 top-10 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur"
        >
          <RoleIcon className="h-3.5 w-3.5 text-white/80" />
          <span className="text-xs font-semibold text-white/80">{r.title}</span>
        </motion.div>

        {/* Centre content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative max-w-md text-white"
        >
          {/* Large icon */}
          <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/15 shadow-lift backdrop-blur-md">
            <RoleIcon className="h-10 w-10" />
          </div>

          <h2 className="text-balance text-3xl font-bold leading-snug">{cfg.headline}</h2>
          <p className="mt-3 text-base text-white/65">{cfg.subline}</p>

          <ul className="mt-8 space-y-4">
            {cfg.bullets.map((b, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.42 + i * 0.09 }}
                className="flex items-center gap-3 text-white/80"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/12 backdrop-blur">
                  <b.icon className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm">{b.text}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Floating decoration cards */}
        {floatingCards[role].map((fc, i) => (
          <FloatingCard key={i} {...fc} />
        ))}

        {/* Bottom tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="relative text-sm text-white/40"
        >
          {APP_NAME} · {APP_TAGLINE}
        </motion.p>
      </div>

      {/* ── Right panel — form ────────────────────────────── */}
      <div className="relative flex min-h-screen flex-col items-center justify-center bg-cream px-6 py-10">
        <AuroraBackground />

        <div className="relative w-full max-w-md">
          {/* Back button */}
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft transition-colors hover:text-navy"
          >
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>

          {/* Glass card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 24 }}
            className="glass rounded-3xl p-8 shadow-lift"
          >
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-soft border">
  <img
    src="/favicon.png"
    alt="CampusOS"
    className="h-8 w-8 object-contain"
  />
</div>
                <div>
                  <h1 className="text-2xl font-bold text-ink">
                    Welcome Back 👋
                  </h1>
                  <p className="text-sm text-ink-soft">
                    Sign in to your CampusOS account
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm text-ink-soft">
                Enter your credentials to access your workspace.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Email address"
                type="email"
                placeholder="you@campusos.app"
                leftIcon="Mail"
                error={errors.email?.message}
                {...register('email')}
              />
              <PasswordInput
                label="Password"
                placeholder="••••••••"
                leftIcon="Lock"
                error={errors.password?.message}
                {...register('password')}
              />

              <div className="flex items-center justify-between">
                <Checkbox checked={remember} onChange={setRemember} label="Remember me" />
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-navy hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <Button type="submit" className="w-full" size="lg" loading={loading} magnetic>
                {loading ? "Signing In..." : "Sign In"}
              </Button>

              {/* Divider */}
              <div className="relative py-1">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border-soft" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-3 text-xs font-medium text-ink-soft">or</span>
                </div>
              </div>

              {/* Google button — UI only, MERN-ready */}
              <GoogleButton />

              <div className="mt-6">
                <div className="relative mb-5">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border-soft" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-3 text-xs font-semibold text-ink-soft">
                      Quick Demo Access
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => demoLogin("member")}
                    className="flex w-full items-center justify-between rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 transition hover:bg-blue-100 cursor-pointer"
                  >
                    <div className="text-left">
                      <p className="font-semibold text-sm">👤 Member Dashboard</p>
                      <p className="text-[10px] text-gray-500">Explore events, projects and clubs</p>
                    </div>
                    <span className="text-slate-400">→</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => demoLogin("lead")}
                    className="flex w-full items-center justify-between rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 transition hover:bg-amber-100 cursor-pointer"
                  >
                    <div className="text-left">
                      <p className="font-semibold text-sm">👨‍💼 Club Lead Dashboard</p>
                      <p className="text-[10px] text-gray-500">Manage members, events and announcements</p>
                    </div>
                    <span className="text-slate-400">→</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => demoLogin("faculty")}
                    className="flex w-full items-center justify-between rounded-xl border border-green-200 bg-green-50 px-4 py-3 transition hover:bg-green-100 cursor-pointer"
                  >
                    <div className="text-left">
                      <p className="font-semibold text-sm">👨‍🏫 Faculty Dashboard</p>
                      <p className="text-[10px] text-gray-500">View analytics and approvals</p>
                    </div>
                    <span className="text-slate-400">→</span>
                  </button>
                </div>
              </div>
            </form>
          </motion.div>

          {/* Sign up link */}
          <AnimatePresence>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-center text-sm text-ink-soft"
            >
              New to {APP_NAME}?{' '}
              <Link
                to="/signup"
                className="font-semibold text-navy hover:underline"
              >
                Create an account
              </Link>
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
