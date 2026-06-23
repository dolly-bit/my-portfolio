import { useState, useEffect, useRef } from "react";

const experiences = [
  {
    period: "June-July 2026",
    role: "Software Developer Intern",
    company: "Airport Authority of India",
    description:
      "Delivered custom web solutions for small businesses and startups. Built 15+ websites and applications, handling everything from design to deployment.",
    technologies: ["React", "PHP", "WordPress", "MySQL"],
    current: true,
  },
  {
    period: "July 2025",
    role: "Application Service Intern",
    company: "Waisl Digital",
    description:
      "Built an interactive dashboard which shows all the detail about their application in table form as well as graph form, summarizing every key metric.",
    technologies: ["Streamlit", "Numpy", "Pandas", "Matplotlib"],
    current: false,
  },
];

export default function Experience(){
  const [inView, setInView] = useState(false);
  const [visibleItems, setVisibleItems] = useState(() => new Array(experiences.length).fill(false));
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!itemRefs.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute("data-idx"));
          if (entry.isIntersecting) {
            setVisibleItems((prev) => {
              if (prev[idx]) return prev;
              const copy = [...prev];
              copy[idx] = true;
              return copy;
            });
          }
        });
      },
      { threshold: 0.25 }
    );

    itemRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-32 relative overflow-hidden">
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .experience-shimmer {
          background: linear-gradient(90deg, #e2e8f0 20%, #2dd4bf 60%, #818cf8 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        .reveal { opacity: 0; transform: translateY(24px); transition: opacity 600ms cubic-bezier(.2,.9,.2,1), transform 600ms cubic-bezier(.2,.9,.2,1); }
        .reveal.visible { opacity: 1; transform: translateY(0); }
      `}</style>
      <div
        className="absolute top-1/2 left-1/4 w-96
       h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2"
      />

      <div className="container mx-auto px-6 relative z-10  ">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 mx-auto text-center">
          <span
            className={`text-4xl md:text-5xl font-bold mb-4 inline-block ${inView ? "experience-shimmer" : ""}`}
            style={{ animation: inView ? "fadeSlideUp 0.7s ease both" : "none" }}
          >
            Career Journey
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-secondary-foreground"
            style={{ animation: inView ? "fadeSlideUp 0.8s ease both" : "none" }}
          >
            Experience that
            <span className="font-serif italic font-normal text-white">
              speaks volumes.
            </span>
          </h2>

          <p
            className="text-muted-foreground"
            style={{ animation: inView ? "fadeSlideUp 0.9s ease both" : "none" }}
          >
            A timeline of my professional growth, from curious beginner to
            senior engineer leading teams and building products at scale.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="timeline-glow absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#1cd8d2] via-[#00bf8f] to-[#302b63] md:-translate-x-1/2 shadow-[0_0_25px_rgba(32,178,166,0.8)]" />

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                data-idx={idx}
                ref={(el) => (itemRefs.current[idx] = el)}
                className={`relative grid md:grid-cols-2 gap-8 reveal ${
                  visibleItems[idx] ? "visible" : ""
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 rounded-full bg-white -translate-x-1/2 ring-4 ring-primary/25 z-10 shadow-[0_0_18px_rgba(255,255,255,0.18)]">
                  {exp.current && (
                    <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
                  )}
                </div>

                {/* Content */}
                <div
                  className={`pl-8 md:pl-0 ${
                    idx % 2 === 0
                      ? "md:pr-16 md:text-right"
                      : "md:col-start-2 md:pl-16"
                  }`}
                >
                  <div
                    className={`glass p-6 rounded-2xl border border-primary/30 hover:border-primary/50 transition-all duration-500`}
                  >
                    <span className="text-sm text-primary font-medium">
                      {exp.period}
                    </span>
                    <h3 className="text-xl font-semibold mt-2">{exp.role}</h3>
                    <p className="text-muted-foreground">{exp.company}</p>
                    <p className="text-sm text-muted-foreground mt-4">
                      {exp.description}
                    </p>
                    <div
                      className={`flex flex-wrap gap-2 mt-4 ${
                        idx % 2 === 0 ? "md:justify-end" : ""
                      }`}
                    >
                      {exp.technologies.map((tech, techIdx) => (
                        <span
                          key={techIdx}
                          className="px-3 py-1 bg-surface text-xs rounded-full text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};