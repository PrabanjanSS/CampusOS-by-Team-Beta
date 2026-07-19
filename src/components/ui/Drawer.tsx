import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  side?: 'left' | 'right';
  width?: string;
}

export function Drawer({ open, onClose, title, children, side = 'right', width = 'max-w-md' }: DrawerProps) {
  const isLeft = side === 'left';
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Cinematic blurred backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(25,55,109,0.14) 0%, rgba(15,23,42,0.50) 100%)', backdropFilter: 'blur(6px)' }}
            onClick={onClose}
          />

          {/* Drawer panel */}
          <motion.div
            initial={{ x: isLeft ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: isLeft ? '-100%' : '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className={cn(
              'absolute top-0 flex h-full w-full flex-col overflow-hidden bg-white',
              isLeft ? 'left-0' : 'right-0',
              width
            )}
            style={{ boxShadow: isLeft ? '8px 0 48px -8px rgba(25,55,109,0.22)' : '-8px 0 48px -8px rgba(25,55,109,0.22)' }}
          >
            {/* Gradient accent edge */}
            <div
              className={cn('absolute top-0 bottom-0 w-[3px]', isLeft ? 'right-0' : 'left-0')}
              style={{ background: 'linear-gradient(180deg, #19376d 0%, #4f7ec4 50%, #d9a05b 100%)' }}
            />

            {/* Ambient glow */}
            <div
              className="pointer-events-none absolute -top-8 right-0 h-48 w-48 opacity-30"
              style={{ background: 'radial-gradient(circle, rgba(25,55,109,0.12) 0%, transparent 70%)' }}
            />

            {/* Header */}
            <div className="relative flex shrink-0 items-center justify-between border-b border-border-soft/60 px-6 py-5">
              {title && (
                <div>
                  <h2 className="text-lg font-extrabold tracking-tight text-ink">{title}</h2>
                  <div
                    className="mt-1.5 h-px w-12"
                    style={{ background: 'linear-gradient(90deg, rgba(25,55,109,0.5) 0%, transparent 100%)' }}
                  />
                </div>
              )}
              <motion.button
                onClick={onClose}
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="ml-auto flex h-8 w-8 items-center justify-center rounded-full border border-border-soft bg-white text-ink-soft shadow-sm transition-colors hover:border-navy/30 hover:bg-navy/5 hover:text-navy"
              >
                <X className="h-3.5 w-3.5" />
              </motion.button>
            </div>

            {/* Body */}
            <div className="relative flex-1 overflow-y-auto px-6 py-5">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
