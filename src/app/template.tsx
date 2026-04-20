"use client";

import { PageTransition } from "@/components/PageTransition/PageTransition";

export default function Template({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return <PageTransition>{children}</PageTransition>;
}
