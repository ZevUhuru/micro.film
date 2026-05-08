import Link from "next/link";
import { CONTACT_HREF } from "@/lib/workflow";

type SiteHeaderProps = {
  /** Optional active key for nav highlight. */
  active?: "home" | "studio" | "blog" | "about";
};

const navItems = [
  { key: "studio", label: "Studio", href: "/studio" },
  { key: "blog", label: "Notes", href: "/blog" },
  { key: "about", label: "About", href: "/about" },
] as const;

export function SiteHeader({ active = "home" }: SiteHeaderProps) {
  return (
    <header className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
      <Link href="/" className="flex items-center gap-3" aria-label="micro.film home">
        <span
          aria-hidden="true"
          className="grid size-9 place-items-center rounded-md bg-[var(--paper)] text-[var(--ink)]"
        >
          <span className="serif text-xl leading-none">m</span>
        </span>
        <span className="serif text-2xl tracking-tight">micro.film</span>
      </Link>
      <nav className="hidden items-center gap-8 text-sm text-[var(--foreground)]/65 sm:flex">
        {navItems.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className={`transition hover:text-[var(--foreground)] ${
              active === item.key ? "text-[var(--foreground)]" : ""
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-3">
        <Link
          href={CONTACT_HREF}
          className="hidden rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-[var(--foreground)] transition hover:bg-white/5 sm:inline-flex"
        >
          Talk to us
        </Link>
        <Link
          href="/studio"
          className="rounded-full bg-[var(--paper)] px-4 py-2 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--amber-soft)]"
        >
          Open studio
        </Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/10 px-5 py-10 text-sm text-[var(--foreground)]/55 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="serif text-base text-[var(--foreground)]/80">
            micro.film
          </span>
          <span aria-hidden="true">·</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em]">
            Made for micro cinema
          </span>
        </div>
        <div className="flex items-center gap-5">
          <Link href="/" className="transition hover:text-[var(--foreground)]">
            Home
          </Link>
          <Link href="/studio" className="transition hover:text-[var(--foreground)]">
            Studio
          </Link>
          <Link href="/blog" className="transition hover:text-[var(--foreground)]">
            Notes
          </Link>
          <Link href="/about" className="transition hover:text-[var(--foreground)]">
            About
          </Link>
          <Link href={CONTACT_HREF} className="transition hover:text-[var(--foreground)]">
            Talk to us
          </Link>
        </div>
      </div>
    </footer>
  );
}
