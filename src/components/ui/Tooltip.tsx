import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

interface TooltipProps {
  label: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  children: React.ReactNode;
}

export function Tooltip({ label, side = 'right', children }: TooltipProps) {
  const [show, setShow] = useState(false);
  const positions = {
    top: 'bottom-full left-1/2 mb-2 -translate-x-1/2',
    right: 'left-full top-1/2 ml-2 -translate-y-1/2',
    bottom: 'top-full left-1/2 mt-2 -translate-x-1/2',
    left: 'right-full top-1/2 mr-2 -translate-y-1/2',
  };
  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.14 }}
            className={cn(
              'pointer-events-none absolute z-[150] whitespace-nowrap rounded-lg bg-navy-800 px-2.5 py-1.5 text-xs font-medium text-white shadow-lift',
              positions[side]
            )}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
