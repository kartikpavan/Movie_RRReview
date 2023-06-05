import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";

// Context API
import { ThemeContextProvider } from "./context/themeContext.jsx";
import { NotificationContextProvider } from "./context/NotificationContext.jsx";
import { AuthContextProvider } from "./context/authContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <BrowserRouter>
         <AuthContextProvider>
            <NotificationContextProvider>
               <ThemeContextProvider>
                  <App />
               </ThemeContextProvider>
            </NotificationContextProvider>
         </AuthContextProvider>
      </BrowserRouter>
   </React.StrictMode>
);
