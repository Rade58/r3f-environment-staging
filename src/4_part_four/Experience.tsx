import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";

import {
  type Mesh,
  // type DirectionalLight,
  // type Group,
  // DirectionalLightHelper,
  // Vector2,
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
  // BakeShadows,
  // SoftShadows,
  // AccumulativeShadows,
  // RandomizedLight,
  ContactShadows,
  // Sky,
  Environment,
  useEnvironment,
  Lightformer,
} from "@react-three/drei";

import { Perf } from "r3f-perf";

import { useControls } from "leva";

export function Experience() {
  const mapTexture = useEnvironment({
    preset: "sunset",
  });

  const contactShadowsControls = useControls("contact shadow", {
    blur: {
      value: 2.2,
      min: 0,
      max: 10,
    },
    color: {
      value: "#6236c2",
    },
    opacity: {
      value: 0.76,
      min: 0,
      max: 1,
    },
  });

  const envMapControls = useControls("env map", {
    envMapIntesity: {
      // value: 1,
      value: 3.5,
      min: 0,
      max: 12,
    },
  });

  const cubeRef = useRef<Mesh>(null);
  const sphereRef = useRef<Mesh>(null);

  /* const directionalLightRef = useRef<DirectionalLight>(null);
  useHelper(
    // @ts-expect-error todo find solution for this stupid errord=s
    directionalLightRef,
    DirectionalLightHelper,
    1,
    "purple"
  ); */

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
      {/* ------------------------------------- */}
      <Environment
        // background
        preset="sunset"
        resolution={32}
      >
        <color args={["red"]} attach={"background"} />
        {/* <mesh position-z={-5} scale={10}>
          <planeGeometry />
          <meshBasicMaterial
            color={[10, 0, 0]}

            // color="red"
          />
        </mesh> */}
        <Lightformer
          form="ring" // circle | ring | rect (optional, default = rect)
          intensity={10} // power level (optional = 1)
          // color={[10, 0, 0]} // (optional = white)
          color={"red"} // (optional = white)
          scale={5} // Scale it any way you prefer (optional = [1, 1])
          // target={[0, 0, 0]} // Target position (optional = undefined)
          position-z={-5}
        />
      </Environment>

      {/* ------------------------------------- */}

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

      {/* ---------------------------------- */}
      {/* ---------------------------------- */}

      {/* CUBE */}
      <mesh position={[2, 0, 0]} ref={cubeRef} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          // wireframe
          color="mediumpurple"
          // envMapIntensity={envMapControls.envMapIntesity}
          // envMap={mapTexture}
        />
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
        <meshStandardMaterial
          args={[{ color: "orange" }]}
          // transparent
          // envMap={mapTexture}
          // envMapIntensity={envMapControls.envMapIntesity}
        />
      </mesh>
      {/* FLOOR */}
      <mesh
        receiveShadow
        rotation={[-Math.PI * 0.5, 0, 0]}
        scale={10}
        position-y={-1}
      >
        <planeGeometry />
        <meshStandardMaterial
          args={[{ color: "greenyellow" }]}
          envMapIntensity={envMapControls.envMapIntesity}
          envMap={mapTexture}
        />
      </mesh>
      {/* ---------------------------------------------------- */}
      {/* ---------------------------------------------------- */}
      {/* ---------------------------------------------------- */}
      {/* <BakeShadows /> */}
      {/* <SoftShadows samples={17} focus={11} size={29} /> */}
    </>
  );
}
