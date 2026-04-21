"use client";

import { projects } from "@/data/projects";

// Shared mutable state for the /projets Rotonde.
// - rotation:      mutated every frame by useRotondeControls (no emit — read via rAF)
// - dragMovedPx:   cumulative |dx| of the current drag; readable from click handlers
//                  to distinguish a click from a drag (no emit — transient)
// - hasInteracted: true after the first drag / wheel / key input      (emits)
// - openSlug:      slug of the project whose detail overlay is open    (emits)

export const PROJECT_COUNT = projects.length;
export const SLOT_ANGLE = (Math.PI * 2) / PROJECT_COUNT;

type Listener = () => void;

interface State {
  rotation: number;
  dragMovedPx: number;
  hasInteracted: boolean;
  openSlug: string | null;
}

const state: State = {
  rotation: 0,
  dragMovedPx: 0,
  hasInteracted: false,
  openSlug: null,
};

const listeners = new Set<Listener>();

function emit(): void {
  listeners.forEach((l) => {
    l();
  });
}

// --- mutation helpers ----------------------------------------------------

export function setRotation(value: number): void {
  state.rotation = value;
}

export function setDragMoved(value: number): void {
  state.dragMovedPx = value;
}

export function markInteracted(): void {
  if (!state.hasInteracted) {
    state.hasInteracted = true;
    emit();
  }
}

export function openProject(slug: string): void {
  if (state.openSlug !== slug) {
    state.openSlug = slug;
    emit();
  }
}

export function closeProject(): void {
  if (state.openSlug !== null) {
    state.openSlug = null;
    emit();
  }
}

export function resetRotondeStore(): void {
  state.rotation = 0;
  state.dragMovedPx = 0;
  state.hasInteracted = false;
  state.openSlug = null;
  emit();
}

// --- read helpers --------------------------------------------------------

export function getRotation(): number {
  return state.rotation;
}

export function getDragMoved(): number {
  return state.dragMovedPx;
}

export function getHasInteracted(): boolean {
  return state.hasInteracted;
}

export function getOpenSlug(): string | null {
  return state.openSlug;
}

export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

// Convert a continuous rotation into the active slot index (0..N-1).
// Slot 0 is the one facing the camera at rotation = 0.
export function activeSlotIndex(rotation: number): number {
  const raw = Math.round(-rotation / SLOT_ANGLE);
  const n = PROJECT_COUNT;
  return ((raw % n) + n) % n;
}
