import { createSupabaseAdminClient } from "./_utils.js";

type ApiRequest = {
  method?: string;
};

type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (payload: unknown) => void;
};

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "home")
      .maybeSingle();

    if (error) throw error;
    if (!data?.value) return res.status(404).json({ error: "Home content is not configured." });

    return res.status(200).json(data.value);
  } catch (error) {
    console.error("Home API error:", error);
    return res.status(500).json({ error: error instanceof Error ? error.message : "Home content could not be loaded." });
  }
}
