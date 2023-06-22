import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";

// Context API
import { ThemeContextProvider } from "./context/themeContext.jsx";
import { AuthContextProvider } from "./context/authContext.jsx";
import { SearchContextProvider } from "./context/SearchContext.jsx";
import { MovieContextProvider } from "./context/MovieContext.jsx";
import { SkeletonContextProvider } from "./context/SkeletonContext.jsx";
import { NotificationContextProvider } from "./context/NotificationContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <BrowserRouter>
         <NotificationContextProvider>
            <MovieContextProvider>
               <SearchContextProvider>
                  <AuthContextProvider>
                     <ThemeContextProvider>
                        <SkeletonContextProvider>
                           <App />
                        </SkeletonContextProvider>
                     </ThemeContextProvider>
                  </AuthContextProvider>
               </SearchContextProvider>
            </MovieContextProvider>
         </NotificationContextProvider>
      </BrowserRouter>
   </React.StrictMode>
);
