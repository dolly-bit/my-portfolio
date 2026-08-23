import { useState } from "react";
import { ArrowUpRight, GitBranch } from "lucide-react";
import movieImage from "../assets/Deepcine.png";
import booksImage from "../assets/books-ss.png";
import dashboard from "../assets/dashboard.png";
import farelens from "../assets/farelens.png";
import mentalhealth from "../assets/mental_health.png";

const projects = [
  
  {
    title: "FareLens – AI Powered Flight Price Prediction & Analytics",
    description:
      "FareLens is a web application that predicts flight prices based on historical data and provides insights to users. The system provides user with the best time to buy/sell tickets and as well as best prices for flights",
    image: farelens,
    tags: ["Python","XGBoost", "Scikit-learn", "FastAPI", "React", "Docker"],
    link: "https://farelens.vercel.app/",
    github: "https://github.com/sumitDev11/FareLens",
  },
  {
    title: "DeepCine- Personalized Movie Recommendation System",
    description:
      "An intelligent system that suggests movies to users based on their preferences and related titles.",
    image: movieImage,
    tags: ["Python","Sentence Transformer","FAISS","FastAPI","TMDP API","React","HTML","CSS"],
    link: "https://deepcine-v2.vercel.app/",
    github: "https://github.com/dolly-bit/DeepCineV2",
  },
  {
    title: "Mental Health Predictor",
    description:
      "An intelligent system that predicts the mental health of the user based on the answers they provide.",
    image: mentalhealth,
    tags: ["Python","Coulumn Transformer","scikit-learn","FastAPI","HTML","CSS"],
    link: "https://mental-health-predictor-1-7j18.onrender.com",
    github: "https://github.com/dolly-bit/Mental_Health_Predictor.git",
  },
  {
    title: "Book Recommendation System",
    description:
      "An intelligent system which recommends books according to your mood, category, and description.",
    image: booksImage,
    tags: ["Gradio", "FastAPI", "Python", "HuggingFace"],
    link: "#",
    github: "#",
  },
  {
    title: "Interactive Dashboard",
    description:
      "Interactive dashboard showing expected versus application data in tables and graphs.",
    image: dashboard,
    tags: ["Streamlit","Pandas","NumPy", "Matplotlib"],
    link: "#",
    github: "#",
  },
  
];

const AnimatedBorderButton = ({ children, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:border-primary/60 hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/40"
  >
    {children}
  </button>
);

export default function Project(){
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      {/* Bg glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-highlight/5 rounded-full blur-3xl" />
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mx-auto max-w-3xl mb-16">
          <span className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 inline-block">
            Featured Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
            Projects that
            <span className="font-serif italic font-normal text-white">
              {" "}
              make an impact.
            </span>
          </h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-200">
            A selection of my recent work, from complex web applications to
            innovative tools that solve real-world problems.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {visibleProjects.map((project, idx) => (
            <div
              key={idx}
              className="group glass rounded-2xl overflow-hidden animate-fade-in md:row-span-1 neon-border-card"
              style={{ animationDelay: `${(idx + 1) * 100}ms` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 
                bg-gradient-to-t from-card via-card/50
                 to-transparent opacity-60"
                />
                {/* Overlay Links */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={project.link}
                    className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <GitBranch className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <ArrowUpRight
                    className="w-5 h-5 
                  text-muted-foreground group-hover:text-primary
                   group-hover:translate-x-1 
                   group-hover:-translate-y-1 transition-all"
                  />
                </div>
                <p className="text-muted-foreground text-sm">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-4 py-1.5 rounded-full bg-surface text-xs font-medium border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12 animate-fade-in animation-delay-500">
          <AnimatedBorderButton onClick={() => setShowAll((prev) => !prev)}>
            {showAll ? "Show Less Projects" : "Show More Projects"}
            <ArrowUpRight className="w-5 h-5" />
          </AnimatedBorderButton>
        </div>
      </div>
    </section>
  );
}