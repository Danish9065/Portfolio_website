import { useEffect, useState } from "react";
import { getStoredAudience, storeAudience } from "../lib/audience";
import { trackEvent } from "../lib/events";
import type { Audience } from "../types/api";

export function useAudience() {
  const [audience, setAudienceState] = useState<Audience>(() => getStoredAudience());

  useEffect(() => {
    storeAudience(audience);
  }, [audience]);

  const setAudience = (next: Audience) => {
    setAudienceState(next);
    trackEvent("audience_selected", { audience: next });
  };

  return { audience, setAudience };
}
