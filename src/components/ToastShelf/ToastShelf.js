import React from "react";

import Toast from "../Toast";
import { useToast } from "../ToastProvider";
import styles from "./ToastShelf.module.css";

function ToastShelf() {
  const { toasts, dismissToast } = useToast();

  const handleDismiss = React.useCallback(
    (id) => {
      dismissToast(id);
    },
    [dismissToast]
  );

  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        dismissToast(toasts.map((t) => t.id));
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [dismissToast, toasts]);

  return (
    <ol className={styles.wrapper}>
      {toasts.map(({ id, message, variant }) => (
        <li key={id} className={styles.toastWrapper}>
          <Toast variant={variant} onDismiss={() => handleDismiss(id)}>
            {message}
          </Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
