import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Photo1 from "../assets/movie-ss.png";
import Photo2 from "../assets/books-ss.png";

// --- Sample Project Data ---
const projectsData = [
  {
    id: 1,
    title: 'Movie Recommendation System',
    description: 'An intelligent system that suggests movies to users based on their preferences and related titles.',
    image: Photo1,
    tags: ['Streamlit', 'HuggingFace', 'FastAPI', 'Cosine Similarity'],
    github: 'https://github.com/dolly-bit/movie-rec',
    live: 'https://example.com/movie-rec',
    featured: true,
    role: 'ML Engineer / Backend',
    impact: 'Improved personalized recommendations with a 23% lift in engagement during testing.',
    gradient: 'linear-gradient(135deg,#ff758c 0%,#ff7eb3 100%)',
  },
  {
    id: 2,
    title: 'Book Recommendation System',
    description: 'An intelligent system which recommends books according to your mood, category, and description.',
    image: Photo2,
    tags: ['Gradio', 'Hugging Face', 'Pandas'],
    github: 'https://github.com/dolly-bit/book-rec',
    live: 'https://example.com/book-rec',
    featured: false,
    role: 'Product Designer / ML',
    impact: 'Helped users discover long-tail titles, increasing session depth by 18%.',
    gradient: 'linear-gradient(135deg,#1fd1f9 0%,#b621fe 100%)',
  },
  {
    id: 3,
    title: 'Interactive Dashboard',
    description: 'Interactive dashboard showing expected versus application data in tables and graphs.',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['Streamlit', 'Pandas', 'Canvas', 'HTML'],
    github: 'https://github.com/dolly-bit/interactive-dashboard',
    live: 'https://example.com/dashboard',
    featured: false,
    role: 'Data Analyst / Frontend',
    impact: 'Enabled stakeholders to spot anomalies 3x faster during pilot.',
    gradient: 'linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)',
  },
];

// --- Icon Components (SVG alternatives to lucide-react) ---
const GithubIcon = ({ size = 22, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className={className}
  >
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const ExternalLinkIcon = ({ size = 22, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const LayersIcon = ({ size = 18, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

// --- Individual Project Card Component ---
const ProjectCard = ({ project, index, onOpen }) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 14,
        stiffness: 100,
        delay: index * 0.08,
      },
    },
    hover: {
      y: -16,
      scale: 1.02,
      boxShadow: '0 25px 40px -12px rgba(0,0,0,0.3)',
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 200,
      },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.08,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    hover: { opacity: 1, transition: { duration: 0.3 } },
  };

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    hover: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
  };

    return (
    <motion.div
      variants={cardVariants}
      initial="visible"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onOpen && onOpen(project)}
      className="group relative bg-white/3 dark:bg-gray-800 rounded-4xl overflow-hidden shadow-lg transition-all duration-300 flex flex-col h-full border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 card-hover-glow card-min"
    >
      {/* Glow Accent (uses project gradient when available) */}
      <motion.div style={{ background: project.gradient || undefined }} className="pointer-events-none absolute inset-x-6 top-6 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl" />

      {/* Image Container with Overlay */}
        <div className="relative overflow-hidden bg-gray-200 dark:bg-gray-700">
        <motion.img
          variants={imageVariants}
          src={project.image}
          alt={project.title}
          className="project-image"
          loading="lazy"
        />
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate={isHovered ? 'hover' : 'hidden'}
          className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent flex items-center justify-center gap-4"
        >
            <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
              className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.12, rotate: 8 }}
            whileTap={{ scale: 0.9 }}
          >
            <GithubIcon size={22} />
          </motion.a>
          <motion.a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
              className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.12, rotate: -8 }}
            whileTap={{ scale: 0.9 }}
          >
            <ExternalLinkIcon size={22} />
          </motion.a>
        </motion.div>
        {project.featured && (
          <motion.div
            initial={{ x: 40, y: -40, rotate: 30 }}
            animate={{ x: 0, y: 0, rotate: 0 }}
            transition={{ type: 'spring', damping: 12, stiffness: 150 }}
            className="absolute top-4 right-4 bg-linear-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
          >
            ⭐ Featured
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 md:p-6 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.4 }}
            className="text-gray-400 dark:text-gray-500"
          >
            <LayersIcon size={18} />
          </motion.div>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm flex-1 mb-2 leading-relaxed">
          {project.description}
        </p>

        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-semibold px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">{project.role}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">•</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">{project.impact}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map((tag) => (
            <motion.span
              key={tag}
              variants={tagVariants}
              initial="hidden"
              animate={isHovered ? 'hover' : 'hidden'}
              className="text-xs font-medium px-3 py-1 rounded-full neon-tag"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// --- Modal for detailed case study ---
const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'radial-gradient(ellipse at center, rgba(2,4,8,0.75) 0%, rgba(2,4,8,0.92) 70%)' }}
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 24, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ type: 'spring', damping: 16 }}
        className="max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl"
        style={{ border: '1px solid rgba(0,255,231,0.06)', backdropFilter: 'blur(8px)', background: 'linear-gradient(180deg, rgba(4,6,12,0.8), rgba(6,10,18,0.9))' }}
      >
        <div className="relative h-56 md:h-72">
          <img src={project.image} alt={project.title} className="project-modal-image brightness-90" />

          {/* Gradient overlay matching portfolio theme */}
          <div style={{ background: 'linear-gradient(90deg, rgba(48,43,99,0.8) 0%, rgba(0,191,143,0.55) 50%, rgba(28,216,210,0.35) 100%)' }} className="absolute inset-0 mix-blend-overlay" />

          {/* Neon close button */}
          <button onClick={onClose} aria-label="Close" className="absolute top-4 right-4 rounded-full p-2" style={{ border: '1px solid rgba(0,255,231,0.16)', background: 'rgba(2,6,10,0.35)', color: '#00ffe7', boxShadow: '0 6px 24px rgba(0,255,231,0.06)' }}>✕</button>

          {/* Decorative corner accent */}
          <div className="absolute left-4 bottom-4 px-3 py-1 rounded-lg text-xs font-semibold" style={{ background: 'linear-gradient(90deg,#00ffe7,#00bf8f)', color: '#031018' }}>{project.role}</div>
        </div>

        <div className="p-6" style={{ color: '#c8e6f5' }}>
          <h3 className="text-2xl font-bold mb-2" style={{ color: '#e6fbff' }}>{project.title}</h3>
          <p className="text-sm mb-4" style={{ color: '#9fdff3' }}>{project.description}</p>
          <p className="text-sm mb-2"><strong>Impact:</strong> <span style={{ color: '#bfeef7' }}>{project.impact}</span></p>

          <div className="flex flex-wrap gap-2 my-4">
            {project.tags.map(t => (
              <span key={t} className="px-3 py-1 rounded-full text-xs" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.03)', color: '#aeeef8' }}>{t}</span>
            ))}
          </div>

          <div className="flex gap-3">
            <a href={project.github} target="_blank" rel="noreferrer" className="neon-btn" style={{ fontWeight:700 }}>View Code</a>
            <a href={project.live} target="_blank" rel="noreferrer" className="neon-outline">Live Demo</a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Main Projects Section Component ---
export default function Project() {
  const [filter, setFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const [activeProject, setActiveProject] = useState(null);

  // Filter logic
  useEffect(() => {
    if (filter === 'all') {
      setFilteredProjects(projectsData);
    } else {
      setFilteredProjects(
        projectsData.filter((p) => p.tags.some((tag) => tag.toLowerCase().includes(filter.toLowerCase())))
      );
    }
  }, [filter]);

  // Unique tags for filter buttons
  const allTags = ['all', ...new Set(projectsData.flatMap((p) => p.tags))];

  return (
    <section id="projects" className="py-16 md:py-24 px-4 md:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with animation */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, type: 'spring', damping: 12 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring', damping: 10 }}
            className="inline-block mb-4"
          >
            
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My <span className="text-transparent bg-clip-text bg-linear-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]">Projects</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            A selection of my recent work — each project reflects a commitment to quality and innovation.
          </p>
        </motion.div>

        

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} onOpen={setActiveProject} />
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-14"
        >
          <motion.a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white dark:bg-gray-800 text-gray-800 dark:text-white font-medium rounded-full shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all"
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View All Projects</span>
            <motion.span
              animate={{ x: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            >
              <ExternalLinkIcon size={18} />
            </motion.span>
          </motion.a>
        </motion.div>
        {activeProject && <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />}
      </div>
    </section>
  );
};
