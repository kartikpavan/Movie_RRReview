import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";

// Context API
import { ThemeContextProvider } from "./context/themeContext.jsx";
import { NotificationContextProvider } from "./context/NotificationContext.jsx";
import { AuthContextProvider } from "./context/authContext.jsx";
import { SearchContextProvider } from "./context/SearchContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <NotificationContextProvider>
        <SearchContextProvider>
          <AuthContextProvider>
            <ThemeContextProvider>
              <App />
            </ThemeContextProvider>
          </AuthContextProvider>
        </SearchContextProvider>
      </NotificationContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
