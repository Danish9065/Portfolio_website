import { useQuery } from "@tanstack/react-query";
import { listInquiries } from "../../api/admin";

export function AdminInquiriesPage() {
  const { data = [], error } = useQuery({ queryKey: ["admin-inquiries"], queryFn: listInquiries });
  return (
    <section>
      <h1 className="text-3xl font-semibold text-white">Inquiries</h1>
      {error ? <p className="mt-4 text-sm text-gold">Inquiries require Supabase credentials and a valid admin session.</p> : null}
      <div className="mt-6 space-y-4">
        {data.map((item) => (
          <article key={item.id} className="panel rounded-lg p-5">
            <div className="flex justify-between gap-4"><h2 className="font-semibold text-white">{item.name}</h2><span className="text-sm text-accent">{item.purpose}</span></div>
            <p className="text-sm text-muted">{item.email} · {item.company}</p>
            <p className="mt-3 text-sm leading-6">{item.message}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
