import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scrolla till toppen när route ändras
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // 'instant' för omedelbar scroll, 'smooth' för mjuk scroll
    });
  }, [pathname]);

  return null; // Denna komponent renderar inget
};

export default ScrollToTop;
