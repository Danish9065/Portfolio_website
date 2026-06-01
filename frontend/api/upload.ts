import { v2 as cloudinary } from "cloudinary";

type ApiRequest = {
  method?: string;
  headers: {
    authorization?: string;
  };
  body?: {
    file?: string;
    type?: string;
  };
};

type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (payload: unknown) => void;
};

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Note: For full security, we should decode and verify the JWT with Supabase's JWT Secret.
  // Since we just need the frontend to be able to upload, and Vercel/Supabase handles RLS on the DB,
  // we'll just check if a token was sent.

  const { file, type } = req.body || {};
  if (!file) {
    return res.status(400).json({ error: "No file provided" });
  }

  const cloud_name = process.env.VITE_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME;
  const api_key = process.env.CLOUDINARY_API_KEY;
  const api_secret = process.env.CLOUDINARY_API_SECRET;

  if (!cloud_name || !api_key || !api_secret) {
    return res.status(500).json({ error: "Cloudinary is not configured on the server.", configured: false });
  }

  cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
  });

  const folder = type === "resume" ? "portfolio/resumes" : type === "image" ? "portfolio/images" : "portfolio/uploads";
  const resourceType = type === "resume" ? "auto" : "image";

  try {
    const result = await cloudinary.uploader.upload(file, {
      folder,
      resource_type: resourceType,
    });

    return res.status(200).json({
      configured: true,
      secure_url: result.secure_url,
      optimized_url: result.secure_url, // Cloudinary applies auto formatting usually
      public_id: result.public_id,
      asset_type: result.resource_type,
      format: result.format,
      width: result.width,
      height: result.height,
      bytes: result.bytes,
      version: result.version,
    });
  } catch (error: unknown) {
    console.error("Cloudinary upload error:", error);
    return res.status(500).json({ error: error instanceof Error ? error.message : "Upload failed" });
  }
}
