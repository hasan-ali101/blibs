import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Container from "./container.tsx";
import styles from "./index.css?inline";

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
  background:rgba(0, 0, 0,0);
  z-index: 999;
  pointer-events: none;
  }
`;

const shadowRoot = rootElement.attachShadow({ mode: "open" });
const innerRoot = document.createElement("div");
innerRoot.id = "inner-root";

shadowRoot.appendChild(innerRoot);

const styleTag = document.createElement("style");
styleTag.textContent = styles;
shadowRoot.appendChild(styleTag);

document.head.appendChild(globalStyles);
document.body.appendChild(rootElement);

const root = createRoot(innerRoot);
root.render(
  <StrictMode>
    <Container />
  </StrictMode>
);
