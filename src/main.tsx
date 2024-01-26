import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { HashRouter } from "react-router-dom";
import { ControlFormProvider } from "./context/control-provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ControlFormProvider>
      <HashRouter>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </HashRouter>
    </ControlFormProvider>
  </React.StrictMode>
);
