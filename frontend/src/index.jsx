import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as moment from "moment-timezone";
import ContextProvider from "./components/context/ContextProvider.jsx";

// moment.tz.setDefault("Etc/GMT+5");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.Fragment>
    <ContextProvider>
      <App />
    </ContextProvider>
    <ToastContainer autoClose={2000} />
  </React.Fragment>
);
