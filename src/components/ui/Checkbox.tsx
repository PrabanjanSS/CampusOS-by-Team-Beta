import { useId } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '../../utils/cn';

interface CheckboxProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
  description?: string;
  className?: string;
}

export function Checkbox({ checked, onChange, label, description, className }: CheckboxProps) {
  const id = useId();
  return (
    <label htmlFor={id} className={cn('flex cursor-pointer items-start gap-3', className)}>
      <button
        id={id}
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all duration-200',
          checked ? 'border-navy bg-navy text-white' : 'border-border-soft bg-white hover:border-navy/40'
        )}
      >
        <motion.span
          initial={false}
          animate={{ scale: checked ? 1 : 0, opacity: checked ? 1 : 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 22 }}
        >
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
        </motion.span>
      </button>
      {(label || description) && (
        <span>
          {label && <span className="block text-sm font-medium text-ink">{label}</span>}
          {description && <span className="block text-xs text-ink-soft">{description}</span>}
        </span>
      )}
    </label>
  );
}

interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface RadioGroupProps {
  name: string;
  value: string;
  options: RadioOption[];
  onChange: (v: string) => void;
  orientation?: 'vertical' | 'horizontal';
}

export function RadioGroup({ name, value, options, onChange, orientation = 'vertical' }: RadioGroupProps) {
  return (
    <div className={cn('flex gap-3', orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap')}>
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              'flex flex-1 items-start gap-3 rounded-xl border p-3.5 text-left transition-all duration-200',
              active ? 'border-navy bg-navy/5 shadow-soft' : 'border-border-soft bg-white hover:border-navy/30'
            )}
          >
            <span
              className={cn(
                'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                active ? 'border-navy' : 'border-border-soft'
              )}
            >
              {active && <motion.span layoutId={`radio-${name}`} className="h-2.5 w-2.5 rounded-full bg-navy" />}
            </span>
            <span>
              <span className="block text-sm font-semibold text-ink">{opt.label}</span>
              {opt.description && <span className="block text-xs text-ink-soft">{opt.description}</span>}
            </span>
          </button>
        );
      })}
    </div>
  );
}
