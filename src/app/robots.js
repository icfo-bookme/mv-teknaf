import { siteUrl } from "../lib/pageMetadata.js";

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", siteUrl).href,
  };
}
