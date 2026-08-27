import type { MetadataRoute } from "next";
import { seo } from "@/data/business";

/**
 * One page, one URL. The section anchors are not separate entries — they are not
 * separate documents, and listing them would invite search engines to treat
 * fragments as pages.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: seo.siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
