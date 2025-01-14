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
  // SoftShadows,
  AccumulativeShadows,
  RandomizedLight,
  ContactShadows,
  Sky,
} from "@react-three/drei";

// import { CustomObject } from "./CustomObject";

import { Perf } from "r3f-perf";

import { useControls } from "leva";

export function Experience() {
  const contactShadowsControls = useControls({
    blur: {
      value: 2.2,
      min: 0,
      max: 10,
    },
    color: {
      value: "#6236c2",
    },
    opacity: {
      value: 0.51,
      min: 0,
      max: 1,
    },
  });

  const skyControls = useControls({
    sunPosition: {
      value: [1, 2, 3],
    },
  });

  const cubeRef = useRef<Mesh>(null);
  const sphereRef = useRef<Mesh>(null);

  const directionalLightRef = useRef<DirectionalLight>(null);
  useHelper(
    // @ts-expect-error todo find solution for this stupid errord=s
    directionalLightRef,
    DirectionalLightHelper,
    1,
    "purple"
  );

  useFrame((state, delta) => {
    const elapsed: number = state.clock.getElapsedTime();
    /* 

    state.camera.position.x = Math.sin(elapsed * 0.9) * 5;
    state.camera.position.z = Math.cos(elapsed * 0.9) * 5;
    state.camera.lookAt(0, 0, 0); */
    if (cubeRef.current) {
      // cubeRef.current.rotation.z = Math.PI * elapsed * 0.1;
      cubeRef.current.rotation.y += delta;
    }
  });

  console.log({ sphereRef });

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      {/* ---------------------------------- */}

      <ContactShadows
        position={[0, -0.99, 0]}
        // opacity={1}
        // blur={1}
        // color="#000000"
        scale={10}
        far={5}
        resolution={256}
        frames={1} // this will bake the shadows
        opacity={contactShadowsControls.opacity}
        blur={contactShadowsControls.blur}
        color={contactShadowsControls.color}
      />

      {/* ---------------------------------- */}

      <directionalLight
        castShadow
        ref={directionalLightRef}
        // args={[0xffffff, 0.2]}
        // position-y={3}
        // position={[1, 2, 3]}
        position={skyControls.sunPosition}
        intensity={1.5}
        // shadow property
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={3}
        shadow-camera-right={3}
        shadow-camera-bottom={-3}
        shadow-camera-left={-3}
      />

      <ambientLight intensity={0.6} />

      {/* ---------------------------------- */}
      <Sky sunPosition={skyControls.sunPosition} />
      {/* ---------------------------------- */}

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
      {/* <BakeShadows /> */}
      {/* <SoftShadows samples={17} focus={11} size={29} /> */}
    </>
  );
}
