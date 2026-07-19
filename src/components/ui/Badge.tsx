import { cn } from '../../utils/cn';

type Tone = 'navy' | 'sand' | 'success' | 'warning' | 'danger' | 'neutral';

const tones: Record<Tone, string> = {
  navy: 'bg-navy/10 text-navy',
  sand: 'bg-sand/30 text-[#8a6d3b]',
  success: 'bg-success/12 text-success',
  warning: 'bg-warning/15 text-[#b07314]',
  danger: 'bg-danger/12 text-danger',
  neutral: 'bg-beige/60 text-ink-soft',
};

export function Badge({
  tone = 'neutral',
  children,
  className,
  dot,
}: {
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.7rem] font-semibold',
        tones[tone],
        className
      )}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
