import React, { useCallback } from "react";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const addToast = useCallback(
    ({ message, variant }) => {
      const newToasts = [
        ...toasts,
        { id: crypto.randomUUID(), message, variant },
      ];

      setToasts(newToasts);
    },
    [toasts]
  );

  const dismissToast = useCallback(
    (id) => {
      const newToasts = toasts.filter((t) => t.id !== id);

      setToasts(newToasts);
    },
    [toasts]
  );

  return (
    <ToastContext.Provider value={{ toasts, addToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = React.useContext(ToastContext);

  if (!context) {
    throw new Error(
      "Trying to use ToastContext without having a provider in place"
    );
  }

  return context;
};

export default ToastProvider;
