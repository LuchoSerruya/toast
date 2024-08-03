import { useKey } from "./key";

export const useEscapeKey = (callback) => {
  useKey("Escape", callback);
};
