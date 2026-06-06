import type { ApiRequest } from "../_utils.js";
import { getId, projectSchema, rejectMethod, rejectValidation, type ApiResponse, withAdmin } from "./_shared.js";

type ProjectRequest = ApiRequest & {
  body?: unknown;
};

export default async function handler(req: ProjectRequest, res: ApiResponse) {
  return withAdmin(req, res, async ({ supabase }) => {
    if (req.method === "POST") {
      const parsed = projectSchema.safeParse(req.body || {});
      if (!parsed.success) return rejectValidation(res);

      const { data, error } = await supabase.from("projects").insert(parsed.data).select().single();
      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === "PUT") {
      const id = getId(req);
      if (!id) return res.status(400).json({ error: "A valid project id is required." });

      const parsed = projectSchema.safeParse(req.body || {});
      if (!parsed.success) return rejectValidation(res);

      const { data, error } = await supabase.from("projects").update(parsed.data).eq("id", id).select().single();
      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === "DELETE") {
      const id = getId(req);
      if (!id) return res.status(400).json({ error: "A valid project id is required." });

      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
      return res.status(200).json({ ok: true });
    }

    return rejectMethod(res);
  });
}
