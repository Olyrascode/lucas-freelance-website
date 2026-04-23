import type { MetadataRoute } from "next";
import { defaultDescription, siteName } from "@/lib/metadata";

// PWA manifest. Next.js auto-serves this at /manifest.webmanifest and
// references it from the root <head> automatically. Icons resolve against
// the auto-generated /icon and /apple-icon endpoints fed by icon.png and
// apple-icon.png sitting next to this file.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteName,
    short_name: siteName,
    description: defaultDescription,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    lang: "fr-FR",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
