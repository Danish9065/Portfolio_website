import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createTestimonial, deleteTestimonial } from "../../api/admin";
import { getTestimonials } from "../../api/portfolio";
import { AdminTestimonialForm } from "../../components/admin/AdminTestimonialForm";
import { useToast } from "../../components/ToastProvider";

export function AdminTestimonialsPage() {
  const client = useQueryClient();
  const { notify } = useToast();
  const { data = [] } = useQuery({ queryKey: ["testimonials"], queryFn: getTestimonials });
  return (
    <section className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
      <div><h1 className="text-3xl font-semibold text-white">Testimonials</h1><div className="mt-5 space-y-3">{data.map((testimonial) => <div key={testimonial.id} className="panel flex items-center justify-between rounded-lg p-4"><p className="font-semibold text-white">{testimonial.name}</p><button className="text-sm text-red-200" onClick={async () => { await deleteTestimonial(testimonial.id); await client.invalidateQueries({ queryKey: ["testimonials"] }); notify("Testimonial deleted", "success"); }}>Delete</button></div>)}</div></div>
      <AdminTestimonialForm label="New testimonial" onSubmit={async (values) => { await createTestimonial(values as never); await client.invalidateQueries({ queryKey: ["testimonials"] }); notify("Testimonial saved", "success"); }} />
    </section>
  );
}
