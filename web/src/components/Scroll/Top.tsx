import { useEffect, useState } from "react";

export function ScrollTop() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={scrollPosition >= 460 ? "scrollup show-scroll" : "scrollup"}
      id="scroll-up"
    >
      <i
        onClick={() => window.scrollTo(0, 0)}
        className="uil uil-arrow-up scrollup__icon"
      ></i>
    </div>
  );
}
