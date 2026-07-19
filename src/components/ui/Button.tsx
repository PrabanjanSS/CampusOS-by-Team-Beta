import { forwardRef, useRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn, uid } from '../../utils/cn';
import { Icon } from './Icon';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onAnimationEnd' | 'onDrag' | 'onDragStart' | 'onDragEnd'> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  magnetic?: boolean;
  children: ReactNode;
}

const variants: Record<Variant, string> = {
  primary:
    'bg-navy text-white shadow-soft hover:bg-navy-600 hover:shadow-lift active:scale-[0.98]',
  secondary:
    'bg-white text-navy border border-border-soft shadow-soft hover:border-navy/30 hover:shadow-card active:scale-[0.98]',
  ghost: 'text-ink-soft hover:bg-cream-200 hover:text-navy active:scale-[0.98]',
  danger: 'bg-danger text-white shadow-soft hover:brightness-95 active:scale-[0.98]',
  outline:
    'border border-navy/30 text-navy hover:bg-navy/5 active:scale-[0.98]',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-[0.825rem] gap-1.5',
  md: 'h-11 px-5 text-sm gap-2',
  lg: 'h-12 px-6 text-[0.95rem] gap-2',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', loading, leftIcon, rightIcon, magnetic, className, children, disabled, onClick, ...rest },
  ref
) {
  const localRef = useRef<HTMLButtonElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 200, damping: 15 });
  const sy = useSpring(my, { stiffness: 200, damping: 15 });

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic || disabled || loading) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 10);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 10);
  };
  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const rippleId = useRef<string | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;
    // ripple
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const chip = document.createElement('span');
    const size = Math.max(r.width, r.height);
    chip.style.cssText = `position:absolute;border-radius:9999px;background:rgba(255,255,255,0.35);width:${size}px;height:${size}px;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px;pointer-events:none;transform:scale(0);opacity:1;`;
    chip.dataset.ripple = rippleId.current = uid('r');
    chip.animate(
      [
        { transform: 'scale(0)', opacity: 0.5 },
        { transform: 'scale(2.2)', opacity: 0 },
      ],
      { duration: 600, easing: 'ease-out' }
    );
    el.appendChild(chip);
    setTimeout(() => chip.remove(), 600);
    onClick?.(e);
  };

  return (
    <motion.button
      ref={(node) => {
        localRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
      }}
      style={magnetic ? { x: sx, y: sy } : undefined}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      disabled={disabled || loading}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'relative inline-flex select-none items-center justify-center overflow-hidden rounded-xl font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-navy/15 disabled:cursor-not-allowed disabled:opacity-60',
        variants[variant],
        sizes[size],
        className
      )}
      {...rest}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        leftIcon && <Icon name={leftIcon} className="h-4 w-4" />
      )}
      {children}
      {!loading && rightIcon && <Icon name={rightIcon} className="h-4 w-4" />}
    </motion.button>
  );
});
