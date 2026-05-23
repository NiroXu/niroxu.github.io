import { Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import type { ContactLink, NavItem } from "../../data/siteContent";

type NavbarProps = {
  name: string;
  englishRole: string;
  navItems: NavItem[];
  contactLinks: ContactLink[];
};

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
};

export function Navbar({ name, englishRole, navItems, contactLinks }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6 lg:px-10">
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border px-4 py-3 transition-all duration-300 sm:px-6 ${
          isScrolled
            ? "border-white/12 bg-slate-950/78 shadow-[0_16px_56px_rgba(0,0,0,0.42)] backdrop-blur-2xl"
            : "border-white/8 bg-slate-950/35 backdrop-blur-xl"
        }`}
      >
        <a className="min-w-0" href="#hero">
          <p className="truncate font-display text-sm uppercase tracking-[0.38em] text-cyan-200/70">
            {name}
          </p>
          <p className="mt-1 text-xs text-slate-400">{englishRole}</p>
        </a>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              className="rounded-full px-4 py-2 text-sm text-slate-300 transition hover:bg-white/6 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-300/45"
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {contactLinks.map((link) => {
            const Icon = iconMap[link.icon];

            return (
              <a
                key={link.label}
                aria-label={link.label}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-300/50 hover:bg-cyan-300/10 hover:text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-300/50"
                href={link.href}
                rel="noreferrer"
                target="_blank"
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
        </div>
      </div>

      <nav className="mx-auto mt-3 flex max-w-7xl gap-2 overflow-x-auto pb-1 md:hidden">
        {navItems.map((item) => (
          <a
            key={item.href}
            className="shrink-0 rounded-full border border-white/10 bg-slate-950/50 px-4 py-2 text-sm text-slate-300 backdrop-blur-xl transition hover:border-cyan-300/45 hover:text-white"
            href={item.href}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
