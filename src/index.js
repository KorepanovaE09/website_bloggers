import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ConfirmModalProvider from "./context/ConfirmModalContext.jsx";
import App from "./App";
import "../src/css/Style.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <ConfirmModalProvider>
      <App />
    </ConfirmModalProvider>
  </StrictMode>
);
