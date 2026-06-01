import type { ApiRequest } from "../_utils";
import { homeSchema, rejectMethod, rejectValidation, type ApiResponse, withAdmin } from "./_shared";

type HomeRequest = ApiRequest & {
  body?: unknown;
};

export default async function handler(req: HomeRequest, res: ApiResponse) {
  return withAdmin(req, res, async ({ supabase }) => {
    if (req.method !== "PUT") return rejectMethod(res);

    const parsed = homeSchema.safeParse(req.body || {});
    if (!parsed.success) return rejectValidation(res);

    const { data, error } = await supabase
      .from("site_settings")
      .upsert({ key: "home", value: parsed.data }, { onConflict: "key" })
      .select()
      .single();

    if (error) throw error;
    return res.status(200).json(data.value);
  });
}
