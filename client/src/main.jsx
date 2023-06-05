import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";

// Context API
import { ThemeContextProvider } from "./context/themeContext.jsx";
import { NotificationContextProvider } from "./context/NotificationContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <BrowserRouter>
         <NotificationContextProvider>
            <ThemeContextProvider>
               <App />
            </ThemeContextProvider>
         </NotificationContextProvider>
      </BrowserRouter>
   </React.StrictMode>
);
