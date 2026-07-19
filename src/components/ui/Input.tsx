import { forwardRef, useId, useState } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Icon } from './Icon';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: string;
  rightSlot?: ReactNode;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, leftIcon, rightSlot, hint, className, id, ...rest },
  ref
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-[0.825rem] font-semibold text-ink">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft">
            <Icon name={leftIcon} className="h-4 w-4" />
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'input-base',
            leftIcon && 'pl-10',
            rightSlot && 'pr-10',
            error && 'border-danger/50 focus:border-danger/50 focus:ring-danger/10',
            className
          )}
          {...rest}
        />
        {rightSlot && (
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2">{rightSlot}</span>
        )}
      </div>
      <AnimatePresence mode="wait">
        {error ? (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 text-xs font-medium text-danger"
          >
            {error}
          </motion.p>
        ) : hint ? (
          <p className="mt-1.5 text-xs text-ink-soft">{hint}</p>
        ) : null}
      </AnimatePresence>
    </div>
  );
});

interface PasswordInputProps extends Omit<InputProps, 'rightSlot' | 'type'> {
  strength?: boolean;
  strengthScore?: number;
  strengthLabel?: string;
  strengthColor?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput({ strength, strengthScore = 0, strengthLabel, strengthColor, ...rest }, ref) {
    const [show, setShow] = useState(false);
    return (
      <div>
        <Input ref={ref} type={show ? 'text' : 'password'} {...rest}
          rightSlot={
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShow((s) => !s)}
              className="text-ink-soft transition-colors hover:text-navy"
              aria-label={show ? 'Hide password' : 'Show password'}
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
        />
        {strength && (
          <div className="mt-2">
            <div className="flex gap-1.5">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0.4 }}
                  animate={{
                    opacity: i < strengthScore ? 1 : 0.25,
                    backgroundColor: i < strengthScore ? strengthColor : '#E7E0D7',
                  }}
                  className="h-1.5 flex-1 rounded-full"
                />
              ))}
            </div>
            {strengthLabel && (
              <p className="mt-1.5 text-xs font-medium" style={{ color: strengthColor }}>
                {strengthLabel}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);
