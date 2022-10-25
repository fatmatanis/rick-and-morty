import { useState, useEffect, useCallback } from "react";

const useComponentOpen = (
  initialIsVisible: boolean,
  ref: React.RefObject<HTMLElement>
) => {
  const [isOpen, setIsOpen] = useState(initialIsVisible);

  const handleClickOutside = useCallback(
    (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
        setIsOpen(false);
      }
    },
    [ref]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [handleClickOutside]);

  return { isOpen, setIsOpen };
};

export default useComponentOpen;
