import type { MetadataRoute } from "next";
import { seo } from "@/data/business";

const routes = ["", "/services", "/about", "/policies", "/faq", "/book"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${seo.siteUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" || route === "/book" ? 1 : 0.7,
  }));
}
