import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit3, Trash2, X } from "lucide-react";
import { deleteProject, createProject, updateProject } from "../../api/admin";
import { getProjects } from "../../api/portfolio";
import { AdminProjectForm } from "../../components/admin/AdminProjectForm";
import { useToast } from "../../components/ToastProvider";
import type { Project } from "../../types/api";
import type { ProjectFormValues } from "../../types/admin";

export function AdminProjectsPage() {
  const client = useQueryClient();
  const { notify } = useToast();
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const { data = [] } = useQuery({ queryKey: ["projects"], queryFn: getProjects });

  return (
    <section className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
      <div>
        <h1 className="text-3xl font-semibold text-white">Projects</h1>
        <div className="mt-5 space-y-3">
          {data.map((project) => (
            <div key={project.id} className="panel flex items-center justify-between rounded-lg p-4">
              <div><p className="font-semibold text-white">{project.title}</p><p className="text-sm text-muted">{project.slug}</p></div>
              <div className="flex items-center gap-2">
                <button className="inline-flex items-center gap-1 rounded-md border border-line px-3 py-2 text-sm text-mist hover:border-accent hover:text-white" onClick={() => setEditingProject(project)}>
                  <Edit3 className="h-4 w-4" /> Edit
                </button>
                <button className="inline-flex items-center gap-1 rounded-md border border-red-300/20 px-3 py-2 text-sm text-red-200 hover:border-red-200/60 hover:text-red-100" onClick={async () => {
                  try {
                    await deleteProject(project.id);
                    client.setQueryData<Project[]>(["projects"], (current = []) => current.filter((item) => item.id !== project.id));
                    await client.invalidateQueries({ queryKey: ["projects"] });
                    if (editingProject?.id === project.id) setEditingProject(null);
                    notify("Project deleted", "success");
                  } catch (error) {
                    notify(error instanceof Error ? error.message : "Project could not be deleted", "error");
                  }
                }}>
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid gap-3 self-start">
        {editingProject ? (
          <button className="justify-self-end inline-flex items-center gap-1 rounded-md border border-line px-3 py-2 text-sm text-muted hover:text-white" onClick={() => setEditingProject(null)}>
            <X className="h-4 w-4" /> New project
          </button>
        ) : null}
        <AdminProjectForm key={editingProject?.id ?? "new"} label={editingProject ? `Edit ${editingProject.title}` : "New project"} initial={editingProject ?? undefined} onSubmit={async (values) => {
          try {
            if (editingProject) {
              const saved = await updateProject(editingProject.id, values as ProjectFormValues);
              client.setQueryData<Project[]>(["projects"], (current = []) => current.map((item) => item.id === saved.id ? saved : item).sort((a, b) => a.sort_order - b.sort_order));
              setEditingProject(saved);
              notify("Project updated", "success");
            } else {
              const saved = await createProject(values as ProjectFormValues);
              client.setQueryData<Project[]>(["projects"], (current = []) => [...current, saved].sort((a, b) => a.sort_order - b.sort_order));
              notify("Project saved", "success");
            }
            await client.invalidateQueries({ queryKey: ["projects"] });
          } catch (error) {
            notify(error instanceof Error ? error.message : "Project could not be saved", "error");
          }
        }} />
      </div>
    </section>
  );
}
