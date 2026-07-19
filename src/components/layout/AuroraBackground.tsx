import { motion } from 'framer-motion';

// Decorative animated aurora blobs used behind auth + landing screens.
export function AuroraBackground({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const colors =
  variant === 'dark'
    ? [
        'rgba(25,55,109,0.18)',
        'rgba(15,33,68,0.15)',
        'rgba(220,197,165,0.10)',
      ]
    : [
        'rgba(255,255,255,0)',
        'rgba(220,197,165,0.12)',
        'rgba(234,219,200,0.18)',
      ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {colors.map((c, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            background: c,
            width: 420 + i * 120,
            height: 420 + i * 120,
            top: `${[8, 52, 30][i]}%`,
            left: `${[62, 8, 40][i]}%`,
          }}
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{ duration: 18 + i * 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}
