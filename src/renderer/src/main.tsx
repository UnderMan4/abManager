import React from "react";
import ReactDOM from "react-dom/client";

import App from "@/App";
import "@/assets/global.css";
import "@/assets/themes/default.css";
import "@/assets/themes/green.css";
import "@/assets/themes/purple.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
   <React.StrictMode>
      <App />
   </React.StrictMode>
);
