"use client";

import { useSyncExternalStore } from "react";
import type Lenis from "lenis";
import {
  getLenisServerSnapshot,
  getLenisSnapshot,
  subscribeLenis,
} from "@/lib/lenis";

export function useLenis(): Lenis | null {
  return useSyncExternalStore(
    subscribeLenis,
    getLenisSnapshot,
    getLenisServerSnapshot,
  );
}
