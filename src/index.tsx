import { createRoot, Root } from "react-dom/client";
import React from "react";
import App from "./components/App";

const container: Element | null = document.getElementById("root");
const root: Root = createRoot(container);

root.render(<App initialData={(window as any).initialData} />);
