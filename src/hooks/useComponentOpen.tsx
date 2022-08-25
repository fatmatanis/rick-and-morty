import { useState, useEffect, useRef } from "react";

const useComponentOpen = (initialIsVisible: boolean) => {
  const [isOpen, setIsOpen] = useState(initialIsVisible);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: Event) => {
    if (ref.current && !ref.current.contains(event.target as HTMLDivElement)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return { ref, isOpen, setIsOpen };
};

export default useComponentOpen;
