import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSiteContent, type SiteContentKey } from "../../api/siteContent";
import { supabase } from "../../lib/supabase";
import type { SiteContentMedia } from "../../types/api";

function mediaSrc(media: SiteContentMedia | null | undefined) {
  return media?.optimized_url || media?.media_url || null;
}

export function HeroMedia({ sectionKey = "hero_media", alt = "Danish portfolio media", className }: { sectionKey?: SiteContentKey; alt?: string; className?: string }) {
  const client = useQueryClient();
  const { data } = useQuery({ queryKey: ["site-content", sectionKey], queryFn: () => getSiteContent(sectionKey) });

  useEffect(() => {
    if (!supabase) return;
    const clientSupabase = supabase;

    const channel = clientSupabase
      .channel(`site-content-${sectionKey}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "site_content", filter: `section_key=eq.${sectionKey}` },
        (payload) => {
          if (payload.eventType === "DELETE") {
            client.setQueryData(["site-content", sectionKey], null);
            return;
          }
          client.setQueryData(["site-content", sectionKey], payload.new as SiteContentMedia);
        }
      )
      .subscribe();

    return () => {
      void clientSupabase.removeChannel(channel);
    };
  }, [client, sectionKey]);

  const src = mediaSrc(data);
  if (!src) return null;

  return (
    <img
      src={src}
      alt={alt}
      width={data?.media_width ?? undefined}
      height={data?.media_height ?? undefined}
      loading="eager"
      className={className}
      draggable={false}
    />
  );
}
