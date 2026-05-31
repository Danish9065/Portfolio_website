export interface CloudinaryUploadResult {
  secure_url: string;
  optimized_url?: string;
  public_id: string;
  asset_type?: string;
  format?: string;
  width?: number;
  height?: number;
  bytes?: number;
  version?: number;
}

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || import.meta.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || import.meta.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export function canUseUnsignedCloudinaryUpload() {
  return Boolean(cloudName && uploadPreset);
}

export function optimizedCloudinaryUrl(url: string | null | undefined, format?: string | null) {
  if (!url) return null;
  if (format !== "gif" || !url.includes("/upload/")) return url;
  return url.replace("/upload/", "/upload/f_auto,q_auto/");
}

export async function uploadUnsignedToCloudinary(file: File): Promise<CloudinaryUploadResult> {
  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary upload preset is not configured.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
    method: "POST",
    body: formData
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error?.message || "Cloudinary upload failed.");
  }

  return {
    secure_url: data.secure_url,
    optimized_url: optimizedCloudinaryUrl(data.secure_url, data.format) ?? data.secure_url,
    public_id: data.public_id,
    asset_type: data.resource_type,
    format: data.format,
    width: data.width,
    height: data.height,
    bytes: data.bytes,
    version: data.version
  };
}
