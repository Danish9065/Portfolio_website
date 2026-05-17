import { useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteProject, createProject } from "../../api/admin";
import { getProjects } from "../../api/portfolio";
import { AdminProjectForm } from "../../components/admin/AdminProjectForm";
import { useToast } from "../../components/ToastProvider";

export function AdminProjectsPage() {
  const client = useQueryClient();
  const { notify } = useToast();
  const { data = [] } = useQuery({ queryKey: ["projects"], queryFn: getProjects });
  return (
    <section className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
      <div>
        <h1 className="text-3xl font-semibold text-white">Projects</h1>
        <div className="mt-5 space-y-3">
          {data.map((project) => (
            <div key={project.id} className="panel flex items-center justify-between rounded-lg p-4">
              <div><p className="font-semibold text-white">{project.title}</p><p className="text-sm text-muted">{project.slug}</p></div>
              <button className="text-sm text-red-200" onClick={async () => { await deleteProject(project.id); await client.invalidateQueries({ queryKey: ["projects"] }); notify("Project deleted", "success"); }}>Delete</button>
            </div>
          ))}
        </div>
      </div>
      <AdminProjectForm label="New project" onSubmit={async (values) => { await createProject(values as never); await client.invalidateQueries({ queryKey: ["projects"] }); notify("Project saved", "success"); }} />
    </section>
  );
}
