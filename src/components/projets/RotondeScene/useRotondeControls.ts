"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import type { Group } from "three";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  getOpenSlug,
  markInteracted,
  resetRotondeStore,
  setDragMoved,
  setRotation,
  SLOT_ANGLE,
} from "@/components/projets/rotondeStore";

// --- Tuning constants ----------------------------------------------------

const DRAG_SENSITIVITY = 0.002; // rad per px (horizontal — yaw)
const PITCH_SENSITIVITY = 0.0015; // rad per px (vertical — camera tilt)
const PITCH_MAX = Math.PI / 9; // ±20° tilt cap, keeps the rotonde framed
const WHEEL_SENSITIVITY = 0.0002; // rad per delta unit
// Arrow-key step — one slot width, but the rotation is NOT snapped to a
// rounded multiple (no verrouillage). It simply adds/subtracts from the
// current rotation so the keyboard feels like a nudge, not a lock.
const KEY_STEP = SLOT_ANGLE;
const LERP = 0.14; // target seek speed
const FRICTION = 0.9; // per-frame damping at 60fps baseline
const MOMENTUM_EPSILON = 0.0005; // stop inertia below this
const SETTLE_EPSILON = 0.0005;

// --- Hook ----------------------------------------------------------------

export function useRotondeControls(
  groupRef: RefObject<Group | null>,
): void {
  const { gl } = useThree();
  const reducedMotion = usePrefersReducedMotion();

  const rotation = useRef(0);
  const momentum = useRef(0);
  const target = useRef<number | null>(null);
  const isDragging = useRef(false);
  const dragLastX = useRef(0);
  const dragLastY = useRef(0);
  const dragMovedPx = useRef(0);
  const pitch = useRef(0);
  const activePointerId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = gl.domElement;

    const onPointerDown = (event: PointerEvent): void => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      if (getOpenSlug() !== null) return;
      isDragging.current = true;
      dragLastX.current = event.clientX;
      dragLastY.current = event.clientY;
      activePointerId.current = event.pointerId;
      target.current = null;
      momentum.current = 0;
      setDragMoved(0);
      markInteracted();
      try {
        canvas.setPointerCapture(event.pointerId);
      } catch {
        // noop
      }
      canvas.setAttribute("data-dragging", "true");
    };

    const onPointerMove = (event: PointerEvent): void => {
      if (!isDragging.current) return;
      if (
        activePointerId.current !== null &&
        event.pointerId !== activePointerId.current
      ) {
        return;
      }
      const dx = event.clientX - dragLastX.current;
      const dy = event.clientY - dragLastY.current;
      dragLastX.current = event.clientX;
      dragLastY.current = event.clientY;

      // Horizontal — drag right brings the NEXT project into view.
      const yawDelta = -dx * DRAG_SENSITIVITY;
      rotation.current += yawDelta;
      momentum.current = yawDelta;

      // Vertical — drag up tilts the camera DOWN (carousel-style: drag
      // pulls the rotonde toward you). Clamped so the user can't flip past
      // the top/bottom row entirely.
      const pitchDelta = dy * PITCH_SENSITIVITY;
      pitch.current = Math.max(
        -PITCH_MAX,
        Math.min(PITCH_MAX, pitch.current + pitchDelta),
      );

      dragMovedPx.current += Math.abs(dx) + Math.abs(dy);
      setDragMoved(dragMovedPx.current);
    };

    const endDrag = (event: PointerEvent): void => {
      if (!isDragging.current) return;
      if (
        activePointerId.current !== null &&
        event.pointerId !== activePointerId.current
      ) {
        return;
      }
      isDragging.current = false;
      activePointerId.current = null;
      try {
        canvas.releasePointerCapture(event.pointerId);
      } catch {
        // noop
      }
      canvas.removeAttribute("data-dragging");
    };

    const onWheel = (event: WheelEvent): void => {
      event.preventDefault();
      if (getOpenSlug() !== null) return;
      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;
      target.current = null;
      // scroll down / right → advance to next (rotation decreases)
      momentum.current -= delta * WHEEL_SENSITIVITY;
      markInteracted();
    };

    const onKeyDown = (event: KeyboardEvent): void => {
      if (getOpenSlug() !== null) return;
      // ignore when focus is on a form field
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        (event.target as HTMLElement | null)?.isContentEditable
      ) {
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        target.current = rotation.current - KEY_STEP;
        momentum.current = 0;
        markInteracted();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        target.current = rotation.current + KEY_STEP;
        momentum.current = 0;
        markInteracted();
      }
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);
    canvas.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
      canvas.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      resetRotondeStore();
    };
  }, [gl]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;
    // Pull camera off the per-frame state — that's a parameter, not a
    // hook return, so the immutability lint doesn't follow through.
    const cam = state.camera;

    if (reducedMotion) {
      // Snap targets instantly, no inertia, no lerp.
      if (target.current !== null) {
        rotation.current = target.current;
        target.current = null;
      }
      momentum.current = 0;
      group.rotation.y = rotation.current;
      cam.rotation.x = pitch.current;
      setRotation(rotation.current);
      return;
    }

    if (isDragging.current) {
      // rotation + pitch are being set directly by the drag handler
      group.rotation.y = rotation.current;
      cam.rotation.x = pitch.current;
      setRotation(rotation.current);
      return;
    }

    if (target.current !== null) {
      const diff = target.current - rotation.current;
      if (Math.abs(diff) < SETTLE_EPSILON) {
        rotation.current = target.current;
        target.current = null;
      } else {
        rotation.current += diff * LERP;
      }
    } else if (Math.abs(momentum.current) > MOMENTUM_EPSILON) {
      rotation.current += momentum.current;
      momentum.current *= Math.pow(FRICTION, delta * 60);
    } else if (momentum.current !== 0) {
      // Inertia has died down — stop cleanly without snapping anywhere.
      momentum.current = 0;
    }

    group.rotation.y = rotation.current;
    cam.rotation.x = pitch.current;
    setRotation(rotation.current);
  });
}
