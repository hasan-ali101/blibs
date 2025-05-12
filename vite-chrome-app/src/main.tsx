import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import "./index.css";

const rootElement = document.createElement("div");
rootElement.id = "react-chrome-app";
const globalStyles = document.createElement("style");
globalStyles.innerHTML = `
  #${rootElement.id} {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  background:rgba(174, 156, 106, 0);
  z-index: 999;
  pointer-events: none;
  }
`;

document.head.appendChild(globalStyles);
document.body.appendChild(rootElement);

const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
