import { useState, useEffect, useCallback, useContext, createContext } from "react";

const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
   const [notification, setNotification] = useState("");
   const [alertType, setAlertType] = useState("");

   const updateNotification = (type, value) => {
      switch (type) {
         case "success":
            setAlertType("alert-success");
            break;
         case "error":
            setAlertType("alert-error");
            break;
         case "warning":
            setAlertType("alert-warning");
            break;
         case "info":
            setAlertType("alert-info");
            break;
         default:
            setAlertType("alert-error");
      }
      setNotification(value);
      // after 3 seconds reset the notification
      setTimeout(() => {
         setNotification("");
      }, 5000);
   };

   return (
      <NotificationContext.Provider value={{ updateNotification }}>
         {children}
         {notification && (
            <div
               className={`fixed left-1/2 -translate-x-1/2 top-24 alert ${alertType} w-auto translate-y-5 transition-all duration-300 ease-in-out`}
            >
               <span className="text-lg font-semibold">{notification}</span>
            </div>
         )}
      </NotificationContext.Provider>
   );
};

export const useNotificationContext = () => useContext(NotificationContext);
