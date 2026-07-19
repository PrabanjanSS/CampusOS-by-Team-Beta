import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '../../utils/cn';

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  value: string;
  options: Option[];
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}

export function Dropdown({ value, options, onChange, placeholder = 'Select…', className }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'input-base flex cursor-pointer items-center justify-between',
          open && 'border-navy/40 ring-4 ring-navy/10'
        )}
      >
        <span className={selected ? 'text-ink' : 'text-ink-soft/60'}>
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown
          className={cn('h-4 w-4 text-ink-soft transition-transform duration-200', open && 'rotate-180')}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-xl border border-border-soft bg-white p-1.5 shadow-lift"
          >
            {options.map((opt) => {
              const active = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={cn(
                    'flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors',
                    active ? 'bg-navy/8 font-semibold text-navy' : 'text-ink hover:bg-cream-200'
                  )}
                >
                  {opt.label}
                  {active && <Check className="h-4 w-4" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
