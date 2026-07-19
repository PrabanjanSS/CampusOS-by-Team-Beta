import { motion } from 'framer-motion';
import { useCountUp } from '../../hooks';
import { Icon } from './Icon';
import { cn } from '../../utils/cn';
import type { StatCard as StatCardType } from '../../types';

const accentMap = {
  navy: { bg: 'bg-navy/10', text: 'text-navy', glow: 'shadow-glow' },
  sand: { bg: 'bg-sand/25', text: 'text-[#8a6d3b]', glow: '' },
  success: { bg: 'bg-success/12', text: 'text-success', glow: '' },
  warning: { bg: 'bg-warning/15', text: 'text-[#b07314]', glow: '' },
};

export function StatCard({ stat, index = 0 }: { stat: StatCardType; index?: number }) {
  const value = useCountUp(stat.value, 1400, true);
  const a = accentMap[stat.accent];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, type: 'spring', stiffness: 220, damping: 24 }}
      whileHover={{ y: -4 }}
      className="card-surface group relative overflow-hidden p-5 transition-shadow hover:shadow-lift"
    >
      <div className={cn('absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-50 blur-2xl transition-opacity group-hover:opacity-80', a.bg)} />
      <div className="relative flex items-center justify-between">
        <div className={cn('flex h-11 w-11 items-center justify-center rounded-xl', a.bg, a.text)}>
          <Icon name={stat.icon} className="h-5 w-5" />
        </div>
        {stat.delta != null && (
          <span className={cn('inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold', stat.delta >= 0 ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger')}>
            <Icon name="TrendingUp" className="h-3 w-3" />
            {stat.delta >= 0 ? '+' : ''}{stat.delta}%
          </span>
        )}
      </div>
      <div className="relative mt-4">
        <p className="text-3xl font-bold tracking-tight text-ink">
          {value.toLocaleString()}
          {stat.suffix && <span className="ml-0.5 text-lg font-semibold text-ink-soft">{stat.suffix}</span>}
        </p>
        <p className="mt-1 text-sm text-ink-soft">{stat.label}</p>
      </div>
    </motion.div>
  );
}
