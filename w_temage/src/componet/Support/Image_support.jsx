import React, { useContext } from "react";

const Image_support = ({ className }) => {

  const slideMobile = {
    src: "/suppoet01.jpeg", // รูปมือถือ
   
  };

  const slideDesktop = {
    src: "/suppoet01.jpeg", // รูป desktop
    
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Desktop image */}
      <img
        src={slideDesktop.src}
        alt="About Desktop"
         className="hidden sm:block w-full h-auto object-contain"
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

export default Image_support;
