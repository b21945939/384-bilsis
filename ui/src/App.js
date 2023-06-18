import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Router from "./routes";
import SnackbarProvider from "./components/snackbar/SnackbarProvider";

export default function App() {
  //const user = null;
  return (
    <div className="pages">
      <SnackbarProvider>
        <Router />
      </SnackbarProvider>
    </div>
  );
}