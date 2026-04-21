"use client";

import { Canvas } from "@react-three/fiber";
import { RotondeScene } from "@/components/projets/RotondeScene/RotondeScene";
import { RotondeOverlay } from "@/components/projets/RotondeOverlay/RotondeOverlay";
import { ProjectOverlay } from "@/components/projets/ProjectOverlay/ProjectOverlay";
import styles from "./RotondeCanvas.module.scss";

export function RotondeCanvas(): React.ReactElement {
  return (
    <div className={styles.root}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 0], fov: 72, near: 0.01, far: 60 }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={["#050505"]} />
        <RotondeScene />
      </Canvas>
      <RotondeOverlay />
      <ProjectOverlay />
    </div>
  );
}
