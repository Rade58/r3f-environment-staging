import { Canvas, type RootState } from "@react-three/fiber";
import { Experience } from "./Experience";
import {
  CineonToneMapping,
  // ReinhardToneMapping,
  // ACESFilmicToneMapping,
  // SRGBColorSpace,
  // LinearSRGBColorSpace,
  // Color,
} from "three";

// import { Perf } from "r3f-perf";

export function App() {
  return (
    <>
      <Canvas
        // onCreated={created}
        // dpr={[1, 2]}
        flat
        gl={{
          // antialias: true,
          toneMapping: CineonToneMapping,
          // outputColorSpace: SRGBColorSpace,
          toneMappingExposure: 2,
        }}
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
        <color args={["blanchedalmond"]} attach={"background"} />
        <Experience />
      </Canvas>
    </>
  );
}

/* function created(state: RootState) {
  console.log("created");

  state.gl.setClearColor(0xff0000, 0.5);

  state.scene.background = new Color("yellow");
}
 */
