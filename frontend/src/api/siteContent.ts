import { adminFetch, uploadProjectImage, type UploadResponse } from "./admin";
import { apiFetch } from "./client";
import { canUseUnsignedCloudinaryUpload, uploadUnsignedToCloudinary } from "../lib/cloudinary";
import type { SiteContentMedia } from "../types/api";

export type SiteContentKey = "hero_media" | "home_banner" | "about_image" | (string & {});

export const getSiteContent = (sectionKey: SiteContentKey) =>
  apiFetch<SiteContentMedia | null>(`/api/site-content/${sectionKey}`);

export const saveSiteContent = (sectionKey: SiteContentKey, payload: SiteContentMedia) =>
  adminFetch<SiteContentMedia>(`/api/admin/site-content/${sectionKey}`, {
    method: "PUT",
    body: JSON.stringify({ ...payload, section_key: sectionKey })
  });

function uploadResponseToMedia(sectionKey: SiteContentKey, result: UploadResponse): SiteContentMedia {
  return {
    section_key: sectionKey,
    media_url: result.secure_url,
    optimized_url: result.optimized_url ?? result.secure_url,
    media_public_id: result.public_id,
    media_type: result.asset_type,
    media_format: result.format,
    media_width: result.width,
    media_height: result.height,
    media_bytes: result.bytes,
    media_version: result.version
  };
}

export async function uploadAndSaveSiteMedia(sectionKey: SiteContentKey, file: File) {
  if (canUseUnsignedCloudinaryUpload()) {
    const result = await uploadUnsignedToCloudinary(file);
    return saveSiteContent(sectionKey, {
      section_key: sectionKey,
      media_url: result.secure_url,
      optimized_url: result.optimized_url ?? result.secure_url,
      media_public_id: result.public_id,
      media_type: result.asset_type,
      media_format: result.format,
      media_width: result.width,
      media_height: result.height,
      media_bytes: result.bytes,
      media_version: result.version
    });
  }

  const result = await uploadProjectImage(file);
  if (!result.configured || !result.secure_url) {
    throw new Error(result.message || "Cloudinary is not configured.");
  }
  return saveSiteContent(sectionKey, uploadResponseToMedia(sectionKey, result));
}
