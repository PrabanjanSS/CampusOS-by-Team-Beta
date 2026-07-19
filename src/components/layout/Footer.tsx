import { Github, Twitter, Linkedin, Dribbble } from 'lucide-react';
import { APP_NAME, APP_VERSION, APP_DESCRIPTION, SUPPORT_EMAIL } from '../../utils/constants';

export function Footer() {
  const socials = [
    { icon: Github,   label: 'GitHub'   },
    { icon: Twitter,  label: 'Twitter'  },
    { icon: Linkedin, label: 'LinkedIn' },
    { icon: Dribbble, label: 'Dribbble' },
  ];
  return (
    <footer className="border-t border-border-soft bg-white/50 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-between gap-4 px-6 py-5 sm:flex-row">
        <div className="flex items-center gap-2 text-sm text-ink-soft">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-navy text-white">
            <span className="text-xs font-bold">C</span>
          </span>
          <span>
            {APP_NAME}
            <span className="text-ink-soft/50"> · v{APP_VERSION}</span>
          </span>
          <span className="hidden text-ink-soft/40 sm:inline">·</span>
          <span className="hidden sm:inline">{APP_DESCRIPTION}</span>
        </div>
        <div className="flex items-center gap-4">
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-sm text-ink-soft transition-colors hover:text-navy">
            Support
          </a>
          <div className="h-4 w-px bg-border-soft" />
          <div className="flex items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-soft transition-all hover:bg-cream-200 hover:text-navy"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
