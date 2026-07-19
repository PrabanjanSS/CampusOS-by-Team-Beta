import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onAnimationStart' | 'onAnimationEnd' | 'onDrag' | 'onDragStart' | 'onDragEnd'> {
  hover?: boolean;
  glass?: boolean;
  children: ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { hover, glass, className, children, ...rest },
  ref
) {
  return (
    <motion.div
      ref={ref}
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={cn(
        'rounded-2xl border p-5',
        glass ? 'glass' : 'border-border-soft bg-white shadow-card',
        hover && 'transition-shadow hover:shadow-lift',
        className
      )}
      {...rest}
    >
      {children}
    </motion.div>
  );
});

export function CardHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="mb-4 flex items-start justify-between gap-3">
      <div>
        <h3 className="text-base font-semibold text-ink">{title}</h3>
        {subtitle && <p className="mt-0.5 text-sm text-ink-soft">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
