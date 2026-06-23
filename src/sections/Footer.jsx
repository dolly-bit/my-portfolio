import { motion } from "framer-motion";
import React from "react";
import {FaGithub, FaLinkedin } from "react-icons/fa";
import ScrollToTopButton from "../components/ScrollToTopButton";




const socials=[
  
  {Icon:FaLinkedin, label:"LinkedIn", href:"https://www.linkedin.com/in/dolly-kumari-61a2b634a?utm_source=share_via&utm_content=profile&utm_medium=member_android"},
  {Icon:FaGithub, label:"GitHub", href:"https://github.com/dolly-bit"}
]
const glowVariants = {
  initial: { scale: 1, y: 0, filter: "drop-shadow(0 0 0 rgba(0,0,0,0))" },
  hover: {
    scale: 1.2,
    y: -3,
    filter: "drop-shadow(0 0 8px rgba(13,38,204,0.9)) drop-shadow(0 0 18px rgba(16,185,129,0.8))",
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  tap: { scale: 0.95, y: 0, transition: { duration: 0.08 } },
};

export default function Footer(){
  return(
    <footer className="relative overflow-hidden bg-black h-80">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_70%_35%,rgba(13,88,202,0.5),transparent_70%)] "/>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_55%_at_30%_70%,rgba(16,185,129,0.30),transparent_70%)] "/>
       

      <motion.div className="relative z-10 px-4 sm:px-8 lg:px-10 py-16 md:py-20 flex flex-col items-center
      text-center space-y-6"
      initial={{opacity:0, y:30}}
      whileInView={{opacity:1, y:0}}
      transition={{duration:0.8}}
      >
        <p className="text-[15px] md:text-lg">Crafted with ❤️ by <a href="https://github.com/dolly-bit" target="_blank" className=" hover:text-lavender transition duration-150 ease-in-out">
            Dolly
          </a>
        </p> 
        <div className="h-0.75 w-24 md:w-32 rounded-full bg-linear-to-r from-[#0d58cc] via-cyan-300 to-emerald-400"/>
        <div className="flex gap-5 text-2xl md:text-3xl">
          {socials.map(({ Icon, label, href }) => (
            <motion.a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              variants={glowVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="text-gray-300 transition-colors duration-200 inline-flex items-center justify-center"
            >
              <Icon />
            </motion.a>
          ))}

        </div>
        <p className="text-gray-300 italic max-w-xl">
          “Breathe. Let go. And remind yourself that this very moment is the only one you know you have for sure.” 
        </p>
        <p className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Dolly. All rights reserved.

        </p>
        <div>
        <ScrollToTopButton />
      </div>

      </motion.div>

    </footer>
  )
}
