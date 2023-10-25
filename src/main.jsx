import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/Backendless-test-task/*" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
