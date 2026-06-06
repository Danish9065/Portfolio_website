import type { ApiRequest } from "../_utils.js";
import { profileSchema, rejectMethod, rejectValidation, type ApiResponse, withAdmin } from "./_shared.js";

type ProfileRequest = ApiRequest & {
  body?: unknown;
};

export default async function handler(req: ProfileRequest, res: ApiResponse) {
  return withAdmin(req, res, async ({ supabase }) => {
    if (req.method !== "PUT") return rejectMethod(res);

    const parsed = profileSchema.safeParse(req.body || {});
    if (!parsed.success) return rejectValidation(res);

    const payload = { ...parsed.data };
    delete payload.id;
    const { data: existing, error: selectError } = await supabase.from("profiles").select("id").limit(1).maybeSingle();
    if (selectError) throw selectError;

    if (existing) {
      const { data, error } = await supabase.from("profiles").update(payload).eq("id", existing.id).select().single();
      if (error) throw error;
      return res.status(200).json(data);
    }

    const { data, error } = await supabase.from("profiles").insert(payload).select().single();
    if (error) throw error;
    return res.status(200).json(data);
  });
}
