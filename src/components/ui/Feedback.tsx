import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

export function Spinner({ size = 'md', className }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const sz = { sm: 'h-4 w-4', md: 'h-6 w-6', lg: 'h-8 w-8' };
  return <Loader2 className={cn('animate-spin text-navy', sz[size], className)} />;
}

export function PageLoader() {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-2 border-beige" />
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-navy" />
        </div>
        <p className="text-sm font-medium text-ink-soft">Loading…</p>
      </div>
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('shimmer-bg rounded-lg', className)} />;
}

export function SkeletonCard() {
  return (
    <div className="card-surface p-5">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex-1">
          <Skeleton className="h-3.5 w-1/2" />
          <Skeleton className="mt-2 h-3 w-2/3" />
        </div>
      </div>
      <Skeleton className="mt-4 h-3 w-full" />
      <Skeleton className="mt-2 h-3 w-4/5" />
    </div>
  );
}
