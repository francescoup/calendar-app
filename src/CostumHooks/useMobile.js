import { useState, useEffect } from "react";

export const useMobile = (resolution) => {
  const [isMobile, setIsMobile] = useState(false);
  const [windowSize, setWindowSize] = useState(undefined);

  useEffect(() => {
    function handlerResize() {
      setWindowSize(window.innerWidth);
      if (windowSize > resolution) {
        setIsMobile(false);
      } else {
        setIsMobile(true);
      }
    }

    window.addEventListener("resize", handlerResize);
    handlerResize();
    return () => window.removeEventListener("resize", handlerResize);
  }, [isMobile, windowSize, resolution]);
  return isMobile;
};
