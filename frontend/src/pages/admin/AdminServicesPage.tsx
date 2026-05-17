import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createService, deleteService } from "../../api/admin";
import { getServices } from "../../api/portfolio";
import { AdminServiceForm } from "../../components/admin/AdminServiceForm";
import { useToast } from "../../components/ToastProvider";

export function AdminServicesPage() {
  const client = useQueryClient();
  const { notify } = useToast();
  const { data = [] } = useQuery({ queryKey: ["services"], queryFn: getServices });
  return (
    <section className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
      <div><h1 className="text-3xl font-semibold text-white">Services</h1><div className="mt-5 space-y-3">{data.map((service) => <div key={service.id} className="panel flex items-center justify-between rounded-lg p-4"><p className="font-semibold text-white">{service.title}</p><button className="text-sm text-red-200" onClick={async () => { await deleteService(service.id); await client.invalidateQueries({ queryKey: ["services"] }); notify("Service deleted", "success"); }}>Delete</button></div>)}</div></div>
      <AdminServiceForm label="New service" onSubmit={async (values) => { await createService(values as never); await client.invalidateQueries({ queryKey: ["services"] }); notify("Service saved", "success"); }} />
    </section>
  );
}
