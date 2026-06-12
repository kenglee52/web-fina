import React from "react";

const Image_cpn = ({ desktopSrc, mobileSrc, className }) => {
  return (
    <div className={`relative w-full ${className || ""}`}>
      {/* Desktop image */}
      <img
        src={desktopSrc}
        alt="Desktop"
        className="hidden sm:block w-full h-auto object-contain"
      />

      {/* Mobile image */}
      <img
        src={mobileSrc || desktopSrc}
        alt="Mobile"
        className="block sm:hidden w-full h-auto object-contain"
      />
    </div>
  );
};

export default Image_cpn;
