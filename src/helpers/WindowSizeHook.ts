import { useState, useEffect } from "react";

interface WindowSize {
  innerWidth: number;
  innerHeight: number;
}

export const useWindowSizeHook = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
  });

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  return windowSize;
};