import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { Cartprovider } from "./context.js";
//import Push from "./push.js";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
 <Cartprovider>
    <App />
  </Cartprovider>
/* <>
    <Push />
  </>*/
);
