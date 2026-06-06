import type { ApiRequest } from "../_utils.js";
import { rejectMethod, rejectValidation, siteContentSchema, type ApiResponse, withAdmin } from "./_shared.js";

type SiteContentRequest = ApiRequest & {
  body?: unknown;
};

export default async function handler(req: SiteContentRequest, res: ApiResponse) {
  return withAdmin(req, res, async ({ supabase }) => {
    if (req.method !== "PUT") return rejectMethod(res);

    const parsed = siteContentSchema.safeParse(req.body || {});
    if (!parsed.success) return rejectValidation(res);

    const { data, error } = await supabase
      .from("site_content")
      .upsert(parsed.data, { onConflict: "section_key" })
      .select()
      .single();

    if (error) throw error;
    return res.status(200).json(data);
  });
}
