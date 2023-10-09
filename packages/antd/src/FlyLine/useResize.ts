import { useState, useEffect, RefObject } from "react";
import { debounce, observerDomResize } from "./tool";

export default function useResize(targetDomRef: RefObject<HTMLElement>) {
  const [isReSizing, setIsResizing] = useState(true);

  const [rect, setRect] = useState<{ x: number; y: number; width: number; height: number }>();

  useEffect(() => {
    const updateRect = () => {
      if (targetDomRef.current) {
        const rect = targetDomRef.current.getBoundingClientRect();
        setRect({ x: rect.x, y: rect.y, width: rect.width, height: rect.height });
        setIsResizing(false);
      }
    };
    const debounceUpdateRect = debounce(updateRect, {
      onStartDebounce: () => {
        setIsResizing(true);
      },
    });

    updateRect();

    let domObserver: MutationObserver;
    if (targetDomRef.current) {
      domObserver = observerDomResize(targetDomRef.current, debounceUpdateRect);
    }

    window.addEventListener("resize", debounceUpdateRect);

    return () => {
      window.removeEventListener("resize", debounceUpdateRect);

      if (domObserver) {
        domObserver.disconnect();
        domObserver.takeRecords();
      }
    };
  }, [targetDomRef]);

  return { rect, isReSizing };
}
