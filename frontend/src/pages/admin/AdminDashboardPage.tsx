import { Link } from "react-router-dom";

export function AdminDashboardPage() {
  const cards = [
    ["Home", "/admin/home", "Edit hero, marquee, about, services, and featured project sections."],
    ["Projects", "/admin/projects", "Create and maintain case studies."],
    ["Inquiries", "/admin/inquiries", "Review contact submissions."],
    ["Services", "/admin/services", "Update service offers."],
    ["Testimonials", "/admin/testimonials", "Manage proof and references."]
  ];
  return (
    <section>
      <h1 className="text-3xl font-semibold text-white">Admin dashboard</h1>
      <p className="mt-2 text-sm text-muted">Protected actions require a valid Supabase Auth session and backend JWT verification.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {cards.map(([title, to, body]) => <Link key={to} to={to} className="panel rounded-lg p-5"><h2 className="font-semibold text-white">{title}</h2><p className="mt-2 text-sm text-muted">{body}</p></Link>)}
      </div>
    </section>
  );
}
