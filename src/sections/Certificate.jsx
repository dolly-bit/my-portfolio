import { motion } from "framer-motion";
import { Award, ArrowUpRight } from "lucide-react";

// Edit this array with your real certifications
const certifications = [
  {
    title: "Data Science Professional Certificate",
    issuer: "Code With Harry",
    date: "2026",
    credentialUrl: "https://www.codewithharry.com/courses/the-ultimate-job-ready-data-science-course/certificate",
  },
  {
    title: "Meta Front-End Developer",
    issuer: "Meta · Coursera",
    date: "2024",
    credentialUrl: "https://coursera.org/verify/your-cert-id",
  },
  
];

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="min-h-screen w-full flex items-center justify-center relative text-white overflow-hidden py-24"
    >
      {/* Background glow blobs — same pattern used in About & Skills */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px] animate-pulse delay-500" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header — same eyebrow + heading + italic-accent pattern as Project & Experience */}
        <div className="max-w-3xl mb-16 mx-auto text-center">
          <span className="text-sm uppercase tracking-widest text-[#9fdff3]/70 mb-4 inline-block">
            Credentials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-white">
            Certified in what
            <span className="font-serif italic font-normal text-[#1cd8d2]">
              {" "}
              I build with.
            </span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            Courses and credentials I've completed along the way.
          </p>
        </div>

        {/* Cards — using your real .neon-border-card + .neon-tag utilities.
            flex + justify-center (instead of grid) so 1 or 2 cards stay centered
            instead of hugging the left side. */}
        <div className="flex flex-wrap justify-center gap-8">
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="neon-border-card card-hover-glow rounded-2xl bg-white/5 backdrop-blur-sm p-6 flex flex-col gap-4 w-full sm:w-[320px]"
            >
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#1cd8d2]/20 to-[#302b63]/20 border border-[#1cd8d2]/25">
                  <Award size={20} className="text-[#1cd8d2]" />
                </div>
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-[#1cd8d2] transition-colors"
                  aria-label={`View ${cert.title} credential`}
                >
                  <ArrowUpRight size={18} />
                </a>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white leading-snug">
                  {cert.title}
                </h3>
                <p className="text-gray-400 text-sm mt-1">{cert.issuer}</p>
              </div>

              <div className="flex items-center justify-between mt-auto pt-2">
                <span className="neon-tag">{cert.date}</span>
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#1cd8d2] hover:underline inline-flex items-center gap-1"
                >
                  View Credential
                  <ArrowUpRight size={12} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}