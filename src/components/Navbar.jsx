import OverlayMenu from "./OverlayMenu";
import { useEffect, useRef, useState } from "react";
import Logo2 from "../assets/logo2.png";
import { FiMenu } from "react-icons/fi";




export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [forceVisible, setForceVisible] = useState(false);

  const lastScrollY= useRef(0);
  const timerId= useRef(null);

  useEffect(() => {
    const homeSection = document.querySelector("#home");
    const observer = new IntersectionObserver(([entry]) => {
      if(entry.isIntersecting) {
        setForceVisible(true);
        setVisible(true);
      }else {
        setForceVisible(false);
      }
      },{threshold: 0.1}
    )
    if(homeSection) observer.observe(homeSection);
    return () => {
      if(homeSection) observer.unobserve(homeSection);
    }
  }, [])
  useEffect(() => {
    const handleScroll = () => {
      if(forceVisible) {
        setVisible(true);
        return;
      }
      const currentScrollY = window.scrollY;
      if(currentScrollY > lastScrollY.current) {
        setVisible(false);
      } else {
        setVisible(true);
      
        if (timerId.current) clearTimeout(timerId.current);
      timerId.current = setTimeout(() => {
        setVisible(false);
      }, 3000)
      }
      lastScrollY.current = currentScrollY;
    }
    window.addEventListener("scroll", handleScroll, {passive: true})
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timerId.current) clearTimeout(timerId.current);
    }
}, [forceVisible])




  return(
    <>
    <nav className={`fixed top-0 left-0 w-full h-16 flex items-center justify-between px-6 py-4 z-50 transition-all duration-300 ${visible ? "translate-y-0": "-translate-y-full"}`}>
    <div className="flex items-center space-x-2 ">
      <img src={Logo2} alt="logo" className="h-25 w-25"/>
      
      </div> 
      <div className="block lg:absolute lg:right-1/2 lg:transform lg:-translate-x-1/2 ">
      <button
      type="button"
      onClick={()=>setMenuOpen(true)}
      className="text-white text-3xl focus:outline-none"
      aria-label="Open menu"
      >
        <FiMenu/>
      </button>
        
      </div>
      <div className="hidden lg:block">
        <a href="#contact"
        className="inline-flex items-center rounded-full bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]  px-5 py-2 font-medium text-white shadow-lg transition-opacity duration-300 hover:opacity-90">
          Contact
          </a>

      </div>
    
    </nav>
    <OverlayMenu isOpen={menuOpen} onClose={()=>setMenuOpen(false)
    }/>
    </>
    
    )

}
