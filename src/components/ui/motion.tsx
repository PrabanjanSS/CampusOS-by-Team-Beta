import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

export const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

export const stagger = {
  initial: {},
  animate: { transition: { staggerChildren: 0.08 } },
};

export function FadeIn({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 220, damping: 24 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerGroup({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div initial="initial" animate="animate" variants={stagger} className={className}>
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={fadeUp} transition={{ type: 'spring', stiffness: 220, damping: 24 }} className={className}>
      {children}
    </motion.div>
  );
}

export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
};
