import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}

export function Pagination({ page, totalPages, onChange }: PaginationProps) {
  const [hover, setHover] = useState<number | null>(null);
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-soft bg-white text-ink-soft transition-colors hover:border-navy/30 hover:text-navy disabled:opacity-40"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          onMouseEnter={() => setHover(p)}
          onMouseLeave={() => setHover(null)}
          className={cn(
            'relative flex h-9 min-w-9 items-center justify-center rounded-lg px-3 text-sm font-medium transition-colors',
            page === p ? 'text-white' : 'text-ink-soft hover:text-navy'
          )}
        >
          {page === p && (
            <motion.span
              layoutId="pagination-pill"
              className="absolute inset-0 rounded-lg bg-navy shadow-soft"
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            />
          )}
          {hover === p && page !== p && <span className="absolute inset-0 rounded-lg bg-navy/8" />}
          <span className="relative">{p}</span>
        </button>
      ))}
      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-soft bg-white text-ink-soft transition-colors hover:border-navy/30 hover:text-navy disabled:opacity-40"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
