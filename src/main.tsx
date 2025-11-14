// src/main.tsx
import React, { StrictMode, startTransition } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Optional: global error listener for production stability
if (import.meta.env.PROD) {
  window.addEventListener("error", (e) => {
    console.error("Uncaught error:", e.error);
  });
  window.addEventListener("unhandledrejection", (e) => {
    console.error("Unhandled promise:", e.reason);
  });
}

// Mount root safely
const container = document.getElementById("root");
if (!container) throw new Error("Root element #root not found");

const root = createRoot(container);

// Smooth async hydration — better UX under large bundles
startTransition(() => {
  root.render(
    import.meta.env.DEV ? (
      <StrictMode>
        <App />
      </StrictMode>
    ) : (
      <App />
    )
  );
});
