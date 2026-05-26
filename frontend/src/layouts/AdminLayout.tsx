import { LayoutDashboard, LogOut } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseAuth";

const links = [
  { to: "/admin", label: "Dashboard" },
  { to: "/admin/home", label: "Home" },
  { to: "/admin/projects", label: "Projects" },
  { to: "/admin/experience", label: "Timeline" },
  { to: "/admin/resume", label: "Resume" },
  { to: "/admin/inquiries", label: "Inquiries" },
  { to: "/admin/services", label: "Services" },
  { to: "/admin/testimonials", label: "Testimonials" }
];

export function AdminLayout() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-ink">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-[#D7E2EA]/10 bg-panel/80 p-5 md:block">
        <div className="flex items-center gap-2 text-lg font-black uppercase text-white"><LayoutDashboard /> Admin</div>
        <nav className="mt-8 grid gap-2">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === "/admin"} className={({ isActive }) => `rounded-md px-3 py-2 text-sm ${isActive ? "bg-accent/15 text-accent" : "text-muted hover:text-white"}`}>{link.label}</NavLink>
          ))}
        </nav>
        <button
          className="mt-8 inline-flex items-center gap-2 text-sm text-muted"
          onClick={async () => {
            await supabase?.auth.signOut();
            navigate("/admin/login");
          }}
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </aside>
      <div className="md:pl-64">
        <div className="border-b border-line p-4 md:hidden">
          <div className="flex flex-wrap gap-2">
            {links.map((link) => <NavLink key={link.to} to={link.to} className="rounded-md border border-line px-3 py-2 text-sm">{link.label}</NavLink>)}
          </div>
        </div>
        <main className="container-shell py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
