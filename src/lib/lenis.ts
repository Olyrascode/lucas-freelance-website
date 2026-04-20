import Lenis from "lenis";

let instance: Lenis | null = null;
const listeners = new Set<() => void>();

function notify(): void {
  listeners.forEach((cb) => {
    cb();
  });
}

export interface CreateLenisOptions {
  readonly reducedMotion: boolean;
}

export function createLenis({ reducedMotion }: CreateLenisOptions): Lenis {
  if (instance) {
    instance.destroy();
  }
  instance = new Lenis({
    lerp: reducedMotion ? 1 : 0.1,
    smoothWheel: !reducedMotion,
    wheelMultiplier: 1,
    touchMultiplier: 1,
  });
  notify();
  return instance;
}

export function destroyLenis(): void {
  if (instance) {
    instance.destroy();
    instance = null;
    notify();
  }
}

export function subscribeLenis(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getLenisSnapshot(): Lenis | null {
  return instance;
}

export function getLenisServerSnapshot(): Lenis | null {
  return null;
}
