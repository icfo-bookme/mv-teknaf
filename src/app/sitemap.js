import blogPosts from "../data/blogPosts.js";
import { siteUrl } from "../lib/pageMetadata.js";

export default function sitemap() {
  const paths = [
    "/",
    "/ticket",
    "/schedule",
    "/payment",
    "/contact",
    "/get-a-call",
    ...blogPosts.map(({ slug }) => `/blog/${encodeURIComponent(slug)}`),
  ];

  return paths.map((path) => ({ url: new URL(path, siteUrl).href }));
}
