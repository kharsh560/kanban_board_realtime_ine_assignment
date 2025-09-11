import {
  createContext,
  useState,
  useContext,
} from "react";

import type {ReactNode, FC} from "react"

// types for notifications
type NotificationType = "success" | "error";

interface Notification {
  type: NotificationType;
  message: string;
}

interface NotificationContextValue {
  showNotification: (type: NotificationType, message: string) => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(
  undefined
);

// custom hook
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }
  return context;
};

// props for provider
interface NotificationProviderProps {
  children: ReactNode;
}

const NotificationProvider: FC<NotificationProviderProps> = ({ children }) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = (type: NotificationType, message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <div
          className={`fixed bottom-2 right-2 z-50 rounded-md px-4 py-2 text-white shadow-md ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {notification.message}
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
