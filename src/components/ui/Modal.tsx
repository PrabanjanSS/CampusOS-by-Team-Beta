import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-2xl' };

export function Modal({ open, onClose, title, description, children, size = 'md', className }: ModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Cinematic blurred backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at 50% 40%, rgba(25,55,109,0.18) 0%, rgba(15,23,42,0.6) 100%)',
              backdropFilter: 'blur(8px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal panel — flex column so header is sticky and body scrolls */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 24 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className={cn(
              'relative flex w-full flex-col overflow-hidden bg-white',
              // On mobile: sheet from bottom with top-rounded corners
              'rounded-t-[28px] sm:rounded-[28px]',
              // Height caps: mobile full but max 92vh, desktop max 88vh
              'max-h-[92vh] sm:max-h-[88vh]',
              sizes[size],
              className
            )}
            style={{
              boxShadow: '0 -8px 40px -8px rgba(25,55,109,0.14), 0 32px 80px -12px rgba(25,55,109,0.28), 0 0 0 1px rgba(25,55,109,0.08)',
            }}
          >
            {/* Top gradient accent bar */}
            <div
              className="absolute left-0 right-0 top-0 z-10 h-[3px] shrink-0"
              style={{ background: 'linear-gradient(90deg, #19376d 0%, #4f7ec4 50%, #d9a05b 100%)' }}
            />

            {/* Ambient glow spots — decorative only */}
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full opacity-40"
              style={{ background: 'radial-gradient(circle, rgba(25,55,109,0.12) 0%, transparent 70%)' }}
            />
            <div
              className="pointer-events-none absolute -bottom-10 -left-10 h-44 w-44 rounded-full opacity-25"
              style={{ background: 'radial-gradient(circle, rgba(217,160,91,0.14) 0%, transparent 70%)' }}
            />

            {/* ── Sticky header ── */}
            {(title || description) && (
              <div className="relative shrink-0 border-b border-border-soft/60 px-6 pb-4 pt-7">
                {/* Close button */}
                <motion.button
                  onClick={onClose}
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-border-soft bg-white text-ink-soft shadow-sm hover:border-navy/30 hover:bg-navy/5 hover:text-navy"
                >
                  <X className="h-3.5 w-3.5" />
                </motion.button>

                <h2 className="pr-10 text-xl font-extrabold tracking-tight text-ink sm:text-[1.3rem]">
                  {title}
                </h2>
                {description && (
                  <p className="mt-1 text-[0.75rem] font-semibold uppercase tracking-widest text-ink-soft/60">
                    {description}
                  </p>
                )}
              </div>
            )}

            {/* If no header, still show close button */}
            {!title && !description && (
              <motion.button
                onClick={onClose}
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="absolute right-5 top-5 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-border-soft bg-white text-ink-soft shadow-sm hover:border-navy/30 hover:bg-navy/5 hover:text-navy"
              >
                <X className="h-3.5 w-3.5" />
              </motion.button>
            )}

            {/* ── Scrollable body ── */}
            <div className="relative flex-1 overflow-y-auto overscroll-contain px-6 py-5">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
