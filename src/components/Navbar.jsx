import { useState, useEffect } from "react";
import Logo2 from "../assets/Logo2.png";

const navLinks = [
  { label: "About",      href: "#about" },
  { label: "Skills",     href: "#skills" },
  { label: "Projects",   href: "#projects" },
  { label: "Experience", href: "#experience" },
];

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false);
  const [active,       setActive]       = useState("");
  const [hoveredLink,  setHoveredLink]  = useState(null);
  const [isVisible,    setIsVisible]    = useState(true);
  const [lastScrollY,  setLastScrollY]  = useState(0);

  /* Scroll direction detection + frosted-glass effect */
  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 30);
      
      // Show navbar when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY) {
        setIsVisible(true); // scrolling up
      } else if (currentScrollY > 100) {
        setIsVisible(false); // scrolling down
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  /* Highlight active section on scroll via IntersectionObserver */
  useEffect(() => {
    const ids = ["about", "skills", "projects", "experience"];
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o && o.disconnect());
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        @keyframes navFadeDown {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes dotPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(45,212,191,0.55); }
          50%       { box-shadow: 0 0 0 7px rgba(45,212,191,0); }
        }
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }

        /* Animated underline on nav links */
        .nl::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 0%;
          height: 2px;
          border-radius: 2px;
          background: linear-gradient(90deg, #2dd4bf, #818cf8);
          transition: width 0.28s cubic-bezier(0.4,0,0.2,1);
        }
        .nl.nl-active::after,
        .nl.nl-hover::after { width: 80%; }

        /* Contact button with gradient */
        .contact-btn {
          padding: 9px 22px;
          border-radius: 999px;
          background: linear-gradient(135deg, #2dd4bf 0%, #818cf8 100%);
          border: none;
          color: #050a18;
          font-size: 0.87rem;
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
          letter-spacing: 0.04em;
          font-family: 'Inter', sans-serif;
          transition: transform 0.22s, box-shadow 0.22s, background 0.22s;
          display: inline-block;
          white-space: nowrap;
        }
        .contact-btn:hover {
          background: linear-gradient(135deg, #5eead4 0%, #a78bfa 100%);
          box-shadow: 0 0 22px rgba(45,212,191,0.45), 0 0 22px rgba(129,140,248,0.25);
          transform: translateY(-2px);
        }
      `}</style>

      <nav
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          right:         0,
          zIndex:        1000,
          fontFamily:    "'Inter', 'Segoe UI', sans-serif",
          animation:     isVisible ? "navFadeDown 0.55s ease both" : "none",
          transition:    "transform 0.38s ease, background 0.38s, box-shadow 0.38s",
          transform:     isVisible ? "translateY(0)" : "translateY(-100%)",
          background:    scrolled ? "rgba(4, 9, 22, 0.82)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          boxShadow:     scrolled
            ? "0 1px 0 rgba(45,212,191,0.12), 0 6px 30px rgba(0,0,0,0.45)"
            : "none",
        }}
      >
        <div
          style={{
            maxWidth:       "1200px",
            margin:         "0 auto",
            padding:        "0 32px",
            height:         "70px",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "space-between",
          }}
        >

          {/* ── LEFT: Logo ── */}
          <a
            href="#home"
            style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "9px", userSelect: "none" }}
          >
            <img
              alt="logo"
              src={Logo2}
              style={{ height: "100px", width: "auto", objectFit: "contain" }}
            />
          </a>

          {/* ── CENTER: Nav links ── */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {navLinks.map(({ label, href }) => {
              const id       = href.replace("#", "");
              const isActive = active === id;
              const isHover  = hoveredLink === label;
              return (
                <a
                  key={label}
                  href={href}
                  onClick={() => setActive(id)}
                  onMouseEnter={() => setHoveredLink(label)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={`nl${isActive ? " nl-active" : ""}${isHover && !isActive ? " nl-hover" : ""}`}
                  style={{
                    position:       "relative",
                    textDecoration: "none",
                    color:          isActive ? "#2dd4bf" : isHover ? "#e2e8f0" : "#94a3b8",
                    fontSize:       "0.9rem",
                    fontWeight:     isActive ? "600" : "500",
                    padding:        "6px 16px",
                    borderRadius:   "8px",
                    letterSpacing:  "0.025em",
                    transition:     "color 0.22s, background 0.22s",
                    background:     isActive
                      ? "rgba(45,212,191,0.07)"
                      : isHover ? "rgba(255,255,255,0.04)" : "transparent",
                  }}
                >
                  {label}
                </a>
              );
            })}
          </div>

          {/* ── RIGHT: Contact button ── */}
          <a href="#contact" className="contact-btn">
            Contact
          </a>

        </div>
      </nav>
    </>
  );
}