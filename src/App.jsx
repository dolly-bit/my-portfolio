import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Experience from "./sections/Experience";
import Footer from "./sections/Footer";
import Home from "./sections/Home";
import Project from "./sections/Project";
import Skills from "./sections/Skills";
import Skills2 from "./sections/Skills2";
import Testimonial from "./sections/Testimonial";
import React from "react";
import IntroAnimation from "./components/IntroAnimation";



export default function App(){
  const [introDone,setIntroDone]= React.useState(false);
  

  return(
    <>
    {!introDone &&<IntroAnimation onFinish={()=> setIntroDone(true)}/>}
      {introDone &&(

    
    <div className="app-shell">
      <CustomCursor />
      <div className="relative z-10">
        <Navbar />
        <Home />
        <About />
        <Skills />
        <Skills2/>
        <Project />
        
        <Experience />
        
        <Contact />
        <Footer />
      </div>
    </div>
  )}
    </>
    
  );
}
