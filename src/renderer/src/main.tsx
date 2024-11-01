import "@radix-ui/colors/indigo-alpha.css";
import "@radix-ui/colors/indigo-dark-alpha.css";
import "@radix-ui/colors/red-alpha.css";
import "@radix-ui/colors/red-dark-alpha.css";
import "@radix-ui/colors/slate-alpha.css";
import "@radix-ui/colors/slate-dark-alpha.css";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "@/App";
import "@/assets/global.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
   <React.StrictMode>
      <App />
   </React.StrictMode>
);
