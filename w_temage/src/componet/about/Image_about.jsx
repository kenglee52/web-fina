import React, { useContext } from "react";
import { LanguageContext } from "@/LayOut/Main_layout";
import translations from "../../data/translations";

const Image_about = ({ className }) => {
  const { language } = useContext(LanguageContext);

  const slideMobile = {
    src: "/bg_p/about.jpeg", // รูปมือถือ
   
  };

  const slideDesktop = {
    src: "/bg_p/about.jpeg", // รูป desktop
    
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Desktop image */}
      <img
        src={slideDesktop.src}
        alt="About Desktop"
        className="hidden sm:block w-full h-[60vh] md:h-[70vh] lg:h-[60vh] object-cover object-center"
      />

      {/* Mobile image */}
      <img
        src={slideMobile.src}
        alt="About Mobile"
        className="block sm:hidden w-full h-[25vh] md:h-[40vh] object-cover "
      />

      
    
    </div>
  );
};

export default Image_about;
