import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { navItems } from "../lib/constants";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-md px-3 py-2 text-sm transition ${isActive ? "bg-accent/12 text-accent" : "text-muted hover:text-white"}`;

  return (
    <header className="sticky top-0 z-40 border-b border-[#D7E2EA]/10 bg-[#0C0C0C]/90 backdrop-blur">
      <nav className="container-shell flex h-16 items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2 text-white" aria-label="Portfolio home">
          <svg className="h-9 w-9" viewBox="0 0 48 48" role="img" aria-hidden="true">
            <defs>
              <linearGradient id="brand-logo-gradient" x1="8" y1="8" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="#4dd7b0" />
                <stop offset="1" stopColor="#f4bf62" />
              </linearGradient>
            </defs>
            <rect x="5" y="5" width="38" height="38" rx="10" fill="url(#brand-logo-gradient)" opacity="0.16" />
            <path d="M15 30.5 9.5 25 15 19.5" fill="none" stroke="#4dd7b0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
            <path d="M33 17.5 38.5 23 33 28.5" fill="none" stroke="#f4bf62" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
            <path d="M21 34 27 14" fill="none" stroke="#d7dde8" strokeLinecap="round" strokeWidth="3" />
          </svg>
          <span className="font-display text-lg font-black uppercase tracking-tight text-[#D7E2EA]">Danish</span>
        </Link>
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => <NavLink key={item.to} to={item.to} className={linkClass}>{item.label}</NavLink>)}
          <NavLink to="/admin" className={linkClass}>Admin</NavLink>
        </div>
        <button className="lg:hidden" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation">
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open ? (
        <div className="container-shell grid gap-2 pb-4 lg:hidden">
          {navItems.map((item) => <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)} className={linkClass}>{item.label}</NavLink>)}
          <NavLink to="/admin" onClick={() => setOpen(false)} className={linkClass}>Admin</NavLink>
        </div>
      ) : null}
    </header>
  );
}
