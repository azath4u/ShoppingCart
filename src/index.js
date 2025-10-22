import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Cartprovider } from "./context";
import App from "./App";
import Push from "./push";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Cartprovider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Push />} />   
        <Route path="/app" element={<App />} /> 
      </Routes>
    </BrowserRouter>
  </Cartprovider>
);
