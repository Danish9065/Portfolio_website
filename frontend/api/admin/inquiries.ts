import type { ApiRequest } from "../_utils";
import { rejectMethod, type ApiResponse, withAdmin } from "./_shared";

export default async function handler(req: ApiRequest, res: ApiResponse) {
  return withAdmin(req, res, async ({ supabase }) => {
    if (req.method !== "GET") return rejectMethod(res);

    const { data, error } = await supabase
      .from("contact_inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return res.status(200).json(data);
  });
}
