import { motion } from 'framer-motion';
import { Icon } from './Icon';
import { cn } from '../../utils/cn';
import type { NotificationItem } from '../../types';

const variantConfig = {
  info: { icon: 'Info', color: 'text-navy', bg: 'bg-navy/10' },
  success: { icon: 'CheckCircle2', color: 'text-success', bg: 'bg-success/12' },
  warning: { icon: 'AlertTriangle', color: 'text-[#b07314]', bg: 'bg-warning/15' },
};

export function NotificationCard({ n, index = 0 }: { n: NotificationItem; index?: number }) {
  const c = variantConfig[n.variant];
  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06 }}
      className={cn(
        'flex items-start gap-3 rounded-xl border p-3.5 transition-colors',
        n.read ? 'border-border-soft bg-white' : 'border-navy/15 bg-navy/[0.03]'
      )}
    >
      <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-lg', c.bg, c.color)}>
        <Icon name={c.icon} className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-semibold text-ink">{n.title}</p>
          {!n.read && <span className="h-2 w-2 shrink-0 rounded-full bg-navy" />}
        </div>
        <p className="mt-0.5 line-clamp-2 text-xs text-ink-soft">{n.description}</p>
        <p className="mt-1 text-[0.7rem] text-ink-soft/70">{n.time}</p>
      </div>
    </motion.div>
  );
}
