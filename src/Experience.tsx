import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

import {
  type Mesh,
  type DirectionalLight,
  // type Group,
  DirectionalLightHelper,
  Vector2,
} from "three";

import {
  OrbitControls,
  // TransformControls,
  // PivotControls,
  // Html,
  // Text,
  // Float,
  // MeshReflectorMaterial,
  useHelper,
  BakeShadows,
  SoftShadows,
} from "@react-three/drei";

// import { CustomObject } from "./CustomObject";

import { Perf } from "r3f-perf";

export function Experience() {
  const cubeRef = useRef<Mesh>(null);
  const sphereRef = useRef<Mesh>(null);

  const directionalLightRef = useRef<DirectionalLight>(null);
  // const directionalLightHelperRef = useRef<DirectionalLightHelper>(null);
  const dirLightHelperRef = useHelper(
    // @ts-expect-error todo find solution for this stupid errord=s
    directionalLightRef,
    DirectionalLightHelper,
    1,
    "crimson"
  );

  useFrame((state, delta) => {
    /* const elapsed: number = state.clock.getElapsedTime();

    state.camera.position.x = Math.sin(elapsed * 0.9) * 5;
    state.camera.position.z = Math.cos(elapsed * 0.9) * 5;
    state.camera.lookAt(0, 0, 0); */
    if (cubeRef.current) {
      // cubeRef.current.rotation.z = Math.PI * elapsed * 0.1;
      cubeRef.current.rotation.y += delta;
    }

    /* if (directionalLightHelperRef.current) {
      directionalLightHelperRef.current.update();
    } */
  });

  console.log({ sphereRef });

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />
      <directionalLight
        castShadow
        ref={directionalLightRef}
        // args={[0xffffff, 0.2]}
        // position-y={3}
        position={[1, 2, 3]}
        intensity={1.5}
        // when using array like this means we are calling set
        // and we can usr - to access specific stuff on
        // shadow property
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={3}
        shadow-camera-right={3}
        shadow-camera-bottom={-3}
        shadow-camera-left={-3}
      />
      {/* don't need to do this because of we are using useHelper */}
      {/* directionalLightRef.current && (
        <directionalLightHelper
          ref={directionalLightHelperRef}
          args={[directionalLightRef.current, 1]}
          color="blue"
          visible={false}
        />
      ) */}
      <ambientLight intensity={0.6} />
      {/* CUBE */}
      <mesh position={[2, 0, 0]} ref={cubeRef} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial wireframe={false} color="mediumpurple" />
      </mesh>
      {/* SPHERE */}
      <mesh
        castShadow
        // position-y={0}
        position={[-2, 0, 0]}
        ref={sphereRef}
        scale={0.8}
      >
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial args={[{ color: "orange" }]} transparent />
      </mesh>
      {/* FLOOR */}
      <mesh
        receiveShadow
        rotation={[-Math.PI * 0.5, 0, 0]}
        scale={10}
        position-y={-1}
      >
        <planeGeometry />
        <meshStandardMaterial args={[{ color: "greenyellow" }]} />
      </mesh>
      {/* ---------------------------------------------------- */}
      {/* ---------------------------------------------------- */}
      {/* ---------------------------------------------------- */}
      <BakeShadows />
      <SoftShadows samples={17} focus={11} size={29} />
    </>
  );
}
