import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; 
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter basename="/Allie-Rusume-Builder-2.0"> 
    <App />
  </BrowserRouter>
);


