import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit3, Trash2, X } from "lucide-react";
import { createExperience, deleteExperience, updateExperience } from "../../api/admin";
import { getExperience } from "../../api/portfolio";
import { AdminExperienceForm } from "../../components/admin/AdminExperienceForm";
import { useToast } from "../../components/ToastProvider";
import type { Experience } from "../../types/api";
import type { ExperienceFormValues } from "../../types/admin";

export function AdminExperiencePage() {
  const client = useQueryClient();
  const { notify } = useToast();
  const [editingItem, setEditingItem] = useState<Experience | null>(null);
  const { data = [] } = useQuery({ queryKey: ["experience"], queryFn: getExperience });

  return (
    <section className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
      <div>
        <h1 className="text-3xl font-semibold text-white">Timeline</h1>
        <p className="mt-2 text-sm text-muted">Manage work, education, certifications, internships, and freelance milestones.</p>
        <div className="mt-5 space-y-3">
          {data.map((item) => (
            <div key={item.id} className="panel flex flex-col justify-between gap-4 rounded-lg p-4 md:flex-row md:items-center">
              <div>
                <p className="font-semibold text-white">{item.role}</p>
                <p className="text-sm text-muted">{item.company} · {item.type}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="inline-flex items-center gap-1 rounded-md border border-line px-3 py-2 text-sm text-mist hover:border-accent hover:text-white" onClick={() => setEditingItem(item)}>
                  <Edit3 className="h-4 w-4" /> Edit
                </button>
                <button className="inline-flex items-center gap-1 rounded-md border border-red-300/20 px-3 py-2 text-sm text-red-200 hover:border-red-200/60 hover:text-red-100" onClick={async () => {
                  try {
                    await deleteExperience(item.id);
                    client.setQueryData<Experience[]>(["experience"], (current = []) => current.filter((entry) => entry.id !== item.id));
                    await client.invalidateQueries({ queryKey: ["experience"] });
                    if (editingItem?.id === item.id) setEditingItem(null);
                    notify("Timeline entry deleted", "success");
                  } catch (error) {
                    notify(error instanceof Error ? error.message : "Timeline entry could not be deleted", "error");
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
        {editingItem ? (
          <button className="inline-flex items-center gap-1 justify-self-end rounded-md border border-line px-3 py-2 text-sm text-muted hover:text-white" onClick={() => setEditingItem(null)}>
            <X className="h-4 w-4" /> New entry
          </button>
        ) : null}
        <AdminExperienceForm key={editingItem?.id ?? "new"} label={editingItem ? `Edit ${editingItem.role}` : "New timeline entry"} initial={editingItem ?? undefined} onSubmit={async (values) => {
          try {
            if (editingItem) {
              const saved = await updateExperience(editingItem.id, values as ExperienceFormValues);
              client.setQueryData<Experience[]>(["experience"], (current = []) => current.map((item) => item.id === saved.id ? saved : item));
              setEditingItem(saved);
              notify("Timeline entry updated", "success");
            } else {
              const saved = await createExperience(values as ExperienceFormValues);
              client.setQueryData<Experience[]>(["experience"], (current = []) => [saved, ...current]);
              notify("Timeline entry saved", "success");
            }
            await client.invalidateQueries({ queryKey: ["experience"] });
          } catch (error) {
            notify(error instanceof Error ? error.message : "Timeline entry could not be saved", "error");
          }
        }} />
      </div>
    </section>
  );
}
