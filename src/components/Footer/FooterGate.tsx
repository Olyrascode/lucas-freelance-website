"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

const HIDDEN_PREFIXES: readonly string[] = ["/projets"];

export function FooterGate(): React.ReactElement | null {
  const pathname = usePathname();
  const hidden = HIDDEN_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
  if (hidden) return null;
  return <Footer />;
}
