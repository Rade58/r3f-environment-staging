import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import { App } from "./1_part_one/App.tsx";
// import { App } from "./2_part_two/App";
import { App } from "./3_part_three/App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
