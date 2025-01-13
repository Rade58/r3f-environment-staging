import { Canvas } from "@react-three/fiber";
import { Experience } from "./Experience";
import // CineonToneMapping,
// ReinhardToneMapping,
// ACESFilmicToneMapping,
// SRGBColorSpace,
// LinearSRGBColorSpace,
"three";

// import { Perf } from "r3f-perf";

export function App() {
  return (
    <>
      <Canvas
        // dpr={[1, 2]}
        flat
        gl={
          {
            // antialias: true,
            // toneMapping: ReinhardToneMapping,
            // outputColorSpace: SRGBColorSpace,
            // toneMappingExposure: 2,
          }
        }
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [3, 2, 6],
          // position: [0, 0, 0],
          // zoom: 100,
        }}
        // orthographic
      >
        <Experience />
      </Canvas>
    </>
  );
}
