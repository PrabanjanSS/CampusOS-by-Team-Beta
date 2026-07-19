import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Check } from 'lucide-react';
import { AuroraBackground } from '../components/layout/AuroraBackground';
import { APP_NAME, APP_TAGLINE } from '../utils/constants';

interface AuthLayoutProps {
  role: 'member' | 'lead' | 'faculty';
  title: string;
  subtitle: string;
  children: ReactNode;
  showSignupLink?: boolean;
  signupPath?: string;
}

const roleHighlights: Record<string, string[]> = {
  member:  ['Join events & track projects', 'Build a public portfolio', 'Earn badges & climb the leaderboard'],
  lead:    ['Manage events & members',       'Publish announcements',    'Track club momentum'               ],
  faculty: ['Oversee all clubs',             'Approve budgets & proposals', 'Mentor student leaders'         ],
};

export function AuthLayout({ role, title, subtitle, children, showSignupLink, signupPath }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen lg:grid lg:grid-cols-2">
      {/* Left — brand */}
      <div className="relative hidden overflow-hidden bg-navy lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="absolute inset-0 bg-navy-radial opacity-70" />
        <AuroraBackground variant="dark" />

        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative flex items-center gap-2.5 text-white"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-bold">{APP_NAME}</p>
            <p className="text-xs text-white/60">{APP_TAGLINE}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="relative max-w-md text-white"
        >
          <h2 className="text-balance text-3xl font-bold leading-tight">
            {role === 'faculty'
              ? 'Full visibility. Guided mentorship.'
              : role === 'lead'
              ? 'Lead your club like a product team.'
              : 'Belong. Contribute. Get recognized.'}
          </h2>
          <ul className="mt-8 space-y-3.5">
            {roleHighlights[role].map((h, i) => (
              <motion.li
                key={h}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.08 }}
                className="flex items-center gap-3 text-white/80"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-success/20 text-success">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                {h}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative text-sm text-white/40"
        >
          {APP_NAME} · {APP_TAGLINE}
        </motion.p>
      </div>

      {/* Right — form */}
      <div className="relative flex min-h-screen flex-col items-center justify-center bg-cream px-6 py-10">
        <AuroraBackground />
        <div className="relative w-full max-w-md">
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft transition-colors hover:text-navy"
          >
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 24 }}
            className="glass rounded-3xl p-8 shadow-lift"
          >
            <div className="mb-6">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-navy/8 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-navy">
                {role}
              </span>
              <h1 className="mt-3 text-2xl font-bold tracking-tight text-ink">{title}</h1>
              <p className="mt-1.5 text-sm text-ink-soft">{subtitle}</p>
            </div>
            {children}
          </motion.div>

          {showSignupLink && signupPath && (
            <p className="mt-6 text-center text-sm text-ink-soft">
              New to {APP_NAME}?{' '}
              <Link to={signupPath} className="font-semibold text-navy hover:underline">
                Create an account
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
