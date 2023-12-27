import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { FirebaseProvider } from "./context/firebase.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <FirebaseProvider>
    <BrowserRouter>
      <Layout>
        <App />
      </Layout>
    </BrowserRouter>
  </FirebaseProvider>
);
