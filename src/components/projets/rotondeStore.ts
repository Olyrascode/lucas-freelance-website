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

// Cinematic focus dolly — how far the camera travels forward along -Z,
// and equivalently how far past the camera's target the focused plane
// lands (RADIUS + DOLLY_DISTANCE from origin). Pushed far enough that the
// rest of the rotonde ends up behind the camera (out of view).
export const DOLLY_DISTANCE = 15;

type Listener = () => void;

interface State {
  rotation: number;
  dragMovedPx: number;
  hasInteracted: boolean;
  openSlug: string | null;
  // Cinematic dolly: which specific plane is focused, its slot angle, and
  // how far along the focus transition we are (0 = normal, 1 = fully focused).
  focusPlaneKey: string | null;
  focusSlotAngle: number | null;
  focusProgress: number;
}

const state: State = {
  rotation: 0,
  dragMovedPx: 0,
  hasInteracted: false,
  openSlug: null,
  focusPlaneKey: null,
  focusSlotAngle: null,
  focusProgress: 0,
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

export function openProject(
  slug: string,
  planeKey: string,
  slotAngle: number,
): void {
  // Guard: refuse to open a different project while one is still focused
  // or reversing. Avoids the camera jumping between targets mid-animation,
  // which read as a "rotonde spin" for the user.
  if (
    state.focusPlaneKey !== null &&
    state.focusPlaneKey !== planeKey
  ) {
    return;
  }
  if (state.openSlug !== slug || state.focusPlaneKey !== planeKey) {
    state.openSlug = slug;
    state.focusPlaneKey = planeKey;
    state.focusSlotAngle = slotAngle;
    emit();
  }
}

export function closeProject(): void {
  if (state.openSlug !== null) {
    state.openSlug = null;
    // Keep focusPlaneKey / focusSlotAngle set so the reverse dolly plays
    // back correctly — useRotondeControls clears them once progress ≈ 0.
    emit();
  }
}

export function clearFocus(): void {
  if (state.focusPlaneKey !== null || state.focusSlotAngle !== null) {
    state.focusPlaneKey = null;
    state.focusSlotAngle = null;
    // no emit — read on-demand via getters, not via React state.
  }
}

export function setFocusProgress(p: number): void {
  state.focusProgress = p;
}

export function resetRotondeStore(): void {
  state.rotation = 0;
  state.dragMovedPx = 0;
  state.hasInteracted = false;
  state.openSlug = null;
  state.focusPlaneKey = null;
  state.focusSlotAngle = null;
  state.focusProgress = 0;
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

export function getFocusPlaneKey(): string | null {
  return state.focusPlaneKey;
}

export function getFocusSlotAngle(): number | null {
  return state.focusSlotAngle;
}

export function getFocusProgress(): number {
  return state.focusProgress;
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
