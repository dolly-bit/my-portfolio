import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

export default function ScrollToTopButton ()  {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // cleanup (important)
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {visible && (
        <button
          onClick={scrollToTop}
          style={styles.button}
          className="cursor-pointer hover:-translate-y-2 duration-200 active:scale-95 transition duration-100 ease-in-out"
          aria-label="Scroll to top"
        >
          <FiArrowUp className="w-8 h-8 text-white opacity-80 hover:opacity-100 transition duration-200 ease-in-out" />
        </button>
      )}
    </>
  );
};

const styles = {
  button: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    padding: "10px 15px",
    fontSize: "18px",
    cursor: "pointer",
    border: "none",
    borderRadius: "6px",
    color: "white",
    zIndex: 1000,
  },
}

