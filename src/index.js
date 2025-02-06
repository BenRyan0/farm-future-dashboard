import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import store from "./store/index";
import { Provider } from "react-redux";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
// import { createRoot } from "react-dom/client";

import { Toaster } from "react-hot-toast";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
// import "./components/i18/i18";
// import "./Components/i18/i18";

const App = lazy(() => import("./App"));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter> 
    <Provider store={store}>
      <Suspense fallback="loading...">
        <App />
        <Toaster
          toastOptions={{
            position: "top-right",
            style: {
              background: "#283046",
              color: "white",
              zIndex: 9999999999999999999999999999999999999999999, // Adding z-index to bring Toaster to the front
            },
          }}
        />
      </Suspense>
    </Provider>
  </BrowserRouter>
);

serviceWorkerRegistration.register();

reportWebVitals();

// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
