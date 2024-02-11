import "@radix-ui/colors/gray-alpha.css";
import "@radix-ui/colors/gray-dark-alpha.css";
import "@radix-ui/colors/gray-dark.css";
import "@radix-ui/colors/gray.css";
import "@radix-ui/colors/indigo-alpha.css";
import "@radix-ui/colors/indigo-dark-alpha.css";
import "@radix-ui/colors/indigo-dark.css";
import "@radix-ui/colors/indigo.css";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "@/App";
import "@/assets/global.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
   <React.StrictMode>
      <App />
   </React.StrictMode>
);
