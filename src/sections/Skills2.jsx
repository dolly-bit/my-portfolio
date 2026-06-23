import { useState, useEffect, useRef } from "react";

const skills = [
    {
    id: 1,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
        <path d="M8 8h6l3 8-4 3 1 2 4-3 3 8h6" stroke="#2dd4bf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 32l4-4m20-16l4-4" stroke="#2dd4bf" strokeWidth="2" strokeLinecap="round"/>
        <rect x="14" y="17" width="12" height="8" rx="2" stroke="#2dd4bf" strokeWidth="1.5"/>
        <circle cx="20" cy="21" r="2" fill="#2dd4bf" fillOpacity="0.5"/>
      </svg>
    ),
    title: "Programming Languages",
    description: "Proficient in versatile languages spanning scripting, systems, and enterprise-grade application development.",
    tags: ["Python", "Java", "C", "C++", "JavaScript", "TypeScript", "SQL"],
    color: "#2dd4bf",
  },
  {
    id: 2,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
        <path d="M20 4L36 12V28L20 36L4 28V12L20 4Z" stroke="#f472b6" strokeWidth="2"/>
        <circle cx="20" cy="20" r="5" fill="#f472b6" fillOpacity="0.3" stroke="#f472b6" strokeWidth="1.5"/>
        <path d="M20 4V15M20 25V36M4 12L14 18M26 22L36 28M36 12L26 18M14 22L4 28" stroke="#f472b6" strokeWidth="1.2" strokeDasharray="2 2"/>
      </svg>
    ),
    title: "Machine Learning",
    description: "Building and deploying intelligent models that learn from data to solve complex real-world problems.",
    tags: ["TensorFlow", "PyTorch", "scikit-learn", "Keras", "OpenCV", "Hugging Face"],
    color: "#f472b6",
  },
  
  {
    id: 3,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
        <rect x="4" y="28" width="6" height="8" rx="1" fill="#818cf8" fillOpacity="0.4" stroke="#818cf8" strokeWidth="1.5"/>
        <rect x="13" y="20" width="6" height="16" rx="1" fill="#818cf8" fillOpacity="0.4" stroke="#818cf8" strokeWidth="1.5"/>
        <rect x="22" y="12" width="6" height="24" rx="1" fill="#818cf8" fillOpacity="0.4" stroke="#818cf8" strokeWidth="1.5"/>
        <rect x="31" y="5" width="6" height="31" rx="1" fill="#818cf8" fillOpacity="0.4" stroke="#818cf8" strokeWidth="1.5"/>
        <path d="M6 22l8-6 9-6 10-7" stroke="#818cf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="6" cy="22" r="2" fill="#818cf8"/>
        <circle cx="14" cy="16" r="2" fill="#818cf8"/>
        <circle cx="23" cy="10" r="2" fill="#818cf8"/>
        <circle cx="33" cy="3" r="2" fill="#818cf8"/>
      </svg>
    ),
    title: "Data Science",
    description: "Extracting insights from complex datasets through analysis, visualization, and statistical modelling.",
    tags: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Jupyter", "SciPy", "Tableau", "Plotly", "statsmodels", "NLTK"],
    color: "#818cf8",
  },
];





function SkillCard({ skill, index, inView }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? "linear-gradient(135deg, rgba(30,35,60,0.98) 0%, rgba(20,28,50,0.98) 100%)"
          : "linear-gradient(135deg, rgba(20,25,50,0.85) 0%, rgba(12,18,38,0.9) 100%)",
        border: `1.5px solid ${hovered ? skill.color : "rgba(255,255,255,0.07)"}`,
        borderRadius: "18px",
        padding: "32px 28px",
        cursor: "default",
        transition: "all 0.38s cubic-bezier(0.4,0,0.2,1)",
        boxShadow: hovered
          ? `0 8px 40px ${skill.color}28, 0 2px 16px rgba(0,0,0,0.5)`
          : "0 2px 16px rgba(0,0,0,0.3)",
        transform: inView
          ? hovered
            ? "translateY(-8px) scale(1.02)"
            : "translateY(0) scale(1)"
          : "translateY(32px) scale(0.97)",
        opacity: inView ? 1 : 0,
        transitionDelay: inView ? `${index * 0.09}s` : "0s",
        backdropFilter: "blur(12px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow blob on hover */}
      <div
        style={{
          position: "absolute",
          top: "-30px",
          right: "-30px",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${skill.color}22 0%, transparent 70%)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s",
          pointerEvents: "none",
        }}
      />

      {/* Icon */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "58px",
          height: "58px",
          borderRadius: "14px",
          background: `${skill.color}18`,
          border: `1px solid ${skill.color}33`,
          marginBottom: "18px",
          transition: "transform 0.35s, background 0.35s",
          transform: hovered ? "scale(1.12) rotate(-4deg)" : "scale(1) rotate(0deg)",
        }}
      >
        {skill.icon}
      </div>

      {/* Title */}
      <h3
        style={{
          margin: "0 0 10px 0",
          fontSize: "1.15rem",
          fontWeight: "700",
          color: hovered ? skill.color : "#e2e8f0",
          letterSpacing: "0.01em",
          transition: "color 0.3s",
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
        }}
      >
        {skill.title}
      </h3>

      {/* Description */}
      <p
        style={{
          margin: "0 0 20px 0",
          fontSize: "0.9rem",
          color: "#94a3b8",
          lineHeight: "1.65",
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
        }}
      >
        {skill.description}
      </p>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {skill.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: "0.75rem",
              fontWeight: "600",
              padding: "4px 12px",
              borderRadius: "999px",
              background: `${skill.color}14`,
              color: hovered ? skill.color : "#94a3b8",
              border: `1px solid ${hovered ? skill.color + "44" : "rgba(255,255,255,0.08)"}`,
              transition: "all 0.3s",
              letterSpacing: "0.03em",
              fontFamily: "'Inter', 'Segoe UI', sans-serif",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills2() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        @keyframes floatUp {
          0% { transform: translateY(0px); opacity: 0.6; }
          50% { transform: translateY(-18px); opacity: 1; }
          100% { transform: translateY(0px); opacity: 0.6; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .skills-badge {
          display: inline-block;
          padding: 5px 18px;
          border-radius: 999px;
          border: 1px solid rgba(45,212,191,0.35);
          background: rgba(45,212,191,0.08);
          color: #2dd4bf;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 14px;
          font-family: 'Inter', sans-serif;
        }
        .skills-heading {
          font-family: 'Inter', 'Segoe UI', sans-serif;
          font-size: clamp(2rem, 4vw, 2.8rem);
          font-weight: 800;
          background: linear-gradient(90deg, #e2e8f0 20%, #2dd4bf 60%, #818cf8 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
          margin: 0 0 12px 0;
          line-height: 1.15;
        }
        @media (max-width: 768px) {
          .skills-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 1024px) and (min-width: 769px) {
          .skills-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          minHeight: "100vh",
          background: "linear-gradient(160deg, #050a18 0%, #090f22 40%, #07101e 100%)",
          padding: "100px 20px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
        }}
      >
        {/* Ambient glow blobs */}
        <div style={{
          position: "absolute", top: "15%", left: "10%", width: "340px", height: "340px",
          borderRadius: "50%", background: "radial-gradient(circle, rgba(45,212,191,0.07) 0%, transparent 70%)",
          pointerEvents: "none", filter: "blur(40px)",
        }} />
        <div style={{
          position: "absolute", bottom: "20%", right: "8%", width: "300px", height: "300px",
          borderRadius: "50%", background: "radial-gradient(circle, rgba(129,140,248,0.07) 0%, transparent 70%)",
          pointerEvents: "none", filter: "blur(40px)",
        }} />

        {/* Content */}
        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>

          {/* Header */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "64px",
              animation: inView ? "fadeSlideUp 0.7s ease both" : "none",
            }}
          >
            <span className="skills-badge">✦ What I work with</span>
            <h2 className="skills-heading">My Skills</h2>
            <p style={{
              color: "#64748b",
              fontSize: "1.05rem",
              maxWidth: "480px",
              margin: "0 auto",
              lineHeight: "1.7",
            }}>
              Technologies I use to bring ideas to life — from pixel-perfect interfaces to scalable backends.
            </p>
          </div>

          {/* Grid */}
          <div
            className="skills-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "22px",
            }}
          >
            {skills.map((skill, i) => (
              <SkillCard key={skill.id} skill={skill} index={i} inView={inView} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}