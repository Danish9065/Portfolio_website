import type { ApiRequest } from "../_utils.js";
import { getId, rejectMethod, rejectValidation, serviceSchema, type ApiResponse, withAdmin } from "./_shared.js";

type ServiceRequest = ApiRequest & {
  body?: unknown;
};

export default async function handler(req: ServiceRequest, res: ApiResponse) {
  return withAdmin(req, res, async ({ supabase }) => {
    if (req.method === "POST") {
      const parsed = serviceSchema.safeParse(req.body || {});
      if (!parsed.success) return rejectValidation(res);

      const { data, error } = await supabase.from("services").insert(parsed.data).select().single();
      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === "PUT") {
      const id = getId(req);
      if (!id) return res.status(400).json({ error: "A valid service id is required." });

      const parsed = serviceSchema.safeParse(req.body || {});
      if (!parsed.success) return rejectValidation(res);

      const { data, error } = await supabase.from("services").update(parsed.data).eq("id", id).select().single();
      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === "DELETE") {
      const id = getId(req);
      if (!id) return res.status(400).json({ error: "A valid service id is required." });

      const { error } = await supabase.from("services").delete().eq("id", id);
      if (error) throw error;
      return res.status(200).json({ ok: true });
    }

    return rejectMethod(res);
  });
}
