import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";

// Live read of the OS setting (motion's own hook caches its first reading globally).
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    (cb) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", cb);
      return () => mql.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
