import { useEffect, useRef } from "react";


function useOutsideClick(handler:()=>void, listenCapturing = false) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(
    function () {
      function handleClick(e:MouseEvent) {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          handler();
        }
      }
      document.addEventListener("click", handleClick, listenCapturing);

      return () => document.removeEventListener("click", handleClick, true);
    },
    [handler, listenCapturing]
  );

  return ref;
}

export default useOutsideClick;
