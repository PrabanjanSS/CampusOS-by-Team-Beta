import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { cn } from '../../utils/cn';

const config = {
  success: { icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10', border: 'border-success/25' },
  error: { icon: AlertCircle, color: 'text-danger', bg: 'bg-danger/10', border: 'border-danger/25' },
  warning: { icon: AlertTriangle, color: 'text-[#b07314]', bg: 'bg-warning/12', border: 'border-warning/25' },
  info: { icon: Info, color: 'text-navy', bg: 'bg-navy/10', border: 'border-navy/20' },
};

export function ToastViewport() {
  const { toasts, dismiss } = useToast();
  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[200] flex w-full max-w-sm flex-col gap-2.5">
      <AnimatePresence>
        {toasts.map((t) => {
          const c = config[t.variant];
          const Icon = c.icon;
          return (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              className={cn(
                'pointer-events-auto flex items-start gap-3 rounded-xl border bg-white/90 p-4 shadow-lift backdrop-blur-xl',
                c.border
              )}
            >
              <span className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-lg', c.bg, c.color)}>
                <Icon className="h-4 w-4" />
              </span>
              <div className="flex-1 pt-0.5">
                <p className="text-sm font-semibold text-ink">{t.title}</p>
                {t.description && <p className="mt-0.5 text-xs text-ink-soft">{t.description}</p>}
              </div>
              <button
                onClick={() => dismiss(t.id)}
                className="flex h-6 w-6 items-center justify-center rounded-md text-ink-soft transition-colors hover:bg-cream-200"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
