import { cn, initials } from '../../utils/cn';

interface AvatarProps {
  name: string;
  src?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  ring?: boolean;
}

const sizes = {
  xs: 'h-6 w-6 text-[0.625rem]',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-base',
  xl: 'h-24 w-24 text-2xl',
};

export function Avatar({ name, src, size = 'md', className, ring }: AvatarProps) {
  return (
    <div
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-navy to-navy-400 font-semibold text-white',
        sizes[size],
        ring && 'ring-2 ring-white ring-offset-2 ring-offset-cream',
        className
      )}
    >
      {src ? (
        <img src={src} alt={name} className="h-full w-full object-cover" loading="lazy" />
      ) : (
        <span>{initials(name)}</span>
      )}
    </div>
  );
}
