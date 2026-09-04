import { useEffect } from "react";

const DEFAULT_TITLE = "Danish MD — AI Full-stack Developer";
const DEFAULT_DESCRIPTION = "Explore Danish MD's AI, full-stack, frontend, and backend projects, technical experience, services, and contact information.";
const DEFAULT_IMAGE = "https://res.cloudinary.com/dbdodnaxd/image/upload/b_rgb:0c0c0c,c_pad,g_center,h_630,w_1200/f_jpg,q_auto/v1/portfolio/images/danish-portrait";

function setMeta(selector: string, attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

export function Seo({ title = DEFAULT_TITLE, description = DEFAULT_DESCRIPTION, image = DEFAULT_IMAGE, path = "/", type = "website" }: { title?: string; description?: string; image?: string | null; path?: string; type?: "website" | "article" }) {
  useEffect(() => {
    const configuredUrl = import.meta.env.VITE_SITE_URL?.replace(/\/$/, "");
    const baseUrl = configuredUrl || window.location.origin;
    const canonicalUrl = new URL(path, `${baseUrl}/`).toString();

    document.title = title;
    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:type"]', "property", "og:type", type);
    setMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);

    if (image) {
      const absoluteImage = new URL(image, `${baseUrl}/`).toString();
      setMeta('meta[property="og:image"]', "property", "og:image", absoluteImage);
      setMeta('meta[property="og:image:alt"]', "property", "og:image:alt", title);
      setMeta('meta[name="twitter:image"]', "name", "twitter:image", absoluteImage);
      setMeta('meta[name="twitter:image:alt"]', "name", "twitter:image:alt", title);
      setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    } else {
      document.head.querySelector('meta[property="og:image"]')?.remove();
      document.head.querySelector('meta[property="og:image:alt"]')?.remove();
      document.head.querySelector('meta[name="twitter:image"]')?.remove();
      document.head.querySelector('meta[name="twitter:image:alt"]')?.remove();
      setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary");
    }

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    document.getElementById("portfolio-structured-data")?.remove();
    const structuredData = type === "article"
      ? { "@context": "https://schema.org", "@type": "CreativeWork", name: title, description, url: canonicalUrl, ...(image ? { image: new URL(image, `${baseUrl}/`).toString() } : {}), author: { "@type": "Person", name: "Danish MD" } }
      : { "@context": "https://schema.org", "@graph": [{ "@type": "Person", name: "Danish MD", jobTitle: "AI Full-stack Developer", url: canonicalUrl }, { "@type": "WebSite", name: "Danish MD Portfolio", url: canonicalUrl, description }] };
    const script = document.createElement("script");
    script.id = "portfolio-structured-data";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => script.remove();
  }, [description, image, path, title, type]);

  return null;
}
