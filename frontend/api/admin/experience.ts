import type { ApiRequest } from "../_utils.js";
import { experienceSchema, getId, rejectMethod, rejectValidation, type ApiResponse, withAdmin } from "./_shared.js";

type ExperienceRequest = ApiRequest & {
  body?: unknown;
};

export default async function handler(req: ExperienceRequest, res: ApiResponse) {
  return withAdmin(req, res, async ({ supabase }) => {
    if (req.method === "POST") {
      const parsed = experienceSchema.safeParse(req.body || {});
      if (!parsed.success) return rejectValidation(res);

      const { data, error } = await supabase.from("experience").insert(parsed.data).select().single();
      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === "PUT") {
      const id = getId(req);
      if (!id) return res.status(400).json({ error: "A valid timeline entry id is required." });

      const parsed = experienceSchema.safeParse(req.body || {});
      if (!parsed.success) return rejectValidation(res);

      const { data, error } = await supabase.from("experience").update(parsed.data).eq("id", id).select().single();
      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === "DELETE") {
      const id = getId(req);
      if (!id) return res.status(400).json({ error: "A valid timeline entry id is required." });

      const { error } = await supabase.from("experience").delete().eq("id", id);
      if (error) throw error;
      return res.status(200).json({ ok: true });
    }

    return rejectMethod(res);
  });
}
