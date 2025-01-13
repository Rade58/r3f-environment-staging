import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

import type {
  Mesh,
  // Group,
  DirectionalLight,
  DirectionalLightHelper,
} from "three";

import {
  OrbitControls,
  // TransformControls,
  // PivotControls,
  // Html,
  // Text,
  // Float,
  // MeshReflectorMaterial,
} from "@react-three/drei";

// import { CustomObject } from "./CustomObject";

import { Perf } from "r3f-perf";

export function Experience() {
  const cubeRef = useRef<Mesh>(null);
  const sphereRef = useRef<Mesh>(null);

  const directionalLightRef = useRef<DirectionalLight>(null);
  const directionalLightHelperRef = useRef<DirectionalLightHelper>(null);

  useFrame((state, delta) => {
    /* const elapsed: number = state.clock.getElapsedTime();

    state.camera.position.x = Math.sin(elapsed * 0.9) * 5;
    state.camera.position.z = Math.cos(elapsed * 0.9) * 5;
    state.camera.lookAt(0, 0, 0); */
    if (cubeRef.current) {
      // cubeRef.current.rotation.z = Math.PI * elapsed * 0.1;
      cubeRef.current.rotation.y += delta;
    }

    if (directionalLightHelperRef.current) {
      directionalLightHelperRef.current.update();
    }
  });

  console.log({ sphereRef });

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />
      <directionalLight
        ref={directionalLightRef}
        // args={[0xffffff, 0.2]}
        // position-y={3}
        position={[3, 3, 4]}
        intensity={1.5}
      />
      {directionalLightRef.current && (
        <directionalLightHelper
          ref={directionalLightHelperRef}
          args={[directionalLightRef.current, 1]}
          color="blue"
          visible={false}
        />
      )}
      <ambientLight intensity={0.6} />
      {/* CUBE */}
      <mesh position={[2, 0, 0]} ref={cubeRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial wireframe={false} color="mediumpurple" />
      </mesh>
      {/* SPHERE */}
      <mesh
        // position-y={0}
        position={[-2, 0, 0]}
        ref={sphereRef}
        scale={0.8}
      >
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial args={[{ color: "orange" }]} transparent />
      </mesh>
      {/* FLOOR */}
      <mesh rotation={[-Math.PI * 0.5, 0, 0]} scale={10} position-y={-1}>
        <planeGeometry />
        <meshStandardMaterial args={[{ color: "greenyellow" }]} />
      </mesh>
    </>
  );
}
