import React from "react";

export const useKey = (key, callback) => {
  React.useEffect(() => {
    const handleKey = (e) => {
      if (e.key === key) {
        callback();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [callback, key]);
};
