"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

const HIDDEN_PREFIXES: readonly string[] = ["/projets"];
// Routes that already host their own contact form / CTA. We strip the
// "Parlons-en" editorial top from the footer there so the page doesn't
// repeat the same call to action twice in a row.
const COMPACT_PREFIXES: readonly string[] = ["/contact"];

function matches(pathname: string, prefixes: readonly string[]): boolean {
  return prefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function FooterGate(): React.ReactElement | null {
  const pathname = usePathname();
  if (matches(pathname, HIDDEN_PREFIXES)) return null;
  return <Footer compact={matches(pathname, COMPACT_PREFIXES)} />;
}
