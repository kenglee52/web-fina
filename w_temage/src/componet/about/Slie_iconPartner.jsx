import React, { useContext } from "react";
import { LanguageContext } from "@/LayOut/Main_layout";
import translations from "../../data/translations";

const Slie_iconPartner = () => {
  const { language } = useContext(LanguageContext);
  const images = import.meta.glob("/public/partner/*.{png,jpg,jpeg}", { eager: true });
  const icons = Object.values(images).map((mod) => mod.default);
  const numIcons = icons.length;
  const angleIncrement = 360 / numIcons;

  return (
    <section
      className="relative py-28 sm:py-24 bg-slate-400"
      role="region"
      aria-label={translations[language].bpc}
    >
      

      {/* ================= Desktop ================= */}
      <div className="hidden md:block">
          <h2
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-4"
          data-aos="fade-down"
        >
          <span className="text-blue-900">
            {translations[language].bpc.split(" ")[0]}
          </span>{" "}
          <span className="text-orange-500">
            {translations[language].bpc.split(" ").slice(1).join(" ")}
          </span>
        </h2>
        <div
          className="relative mx-auto h-[450px] overflow-visible"
          style={{ maxWidth: `min(1100px, 90vw)` }}
        >
          <div
            className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2"
            style={{ perspective: "1000px" }}
          >
            {/* Title */}
    

      
   
            <div className="w-full h-full relative animate-elliptical-rotation">
              {icons.map((src, i) => {
                const ellipseRadius = 600;
                return (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{
                      transform: `rotateY(${i * angleIncrement}deg) translateZ(${ellipseRadius * 0.9}px)`,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* กล่องหลักของ icon + เงา */}
                    <div className="flex flex-col items-center">
                      <img
                        src={src}
                        alt={`Partner Logo ${i + 1}`}
                        className="h-20 w-auto object-contain drop-shadow-lg transition-all duration-500"
                        loading="lazy"
                      />
                      {/* เงาสะท้อน */}
                      <div
                        className="h-20 w-full mt-[-10px] opacity-30"
                        style={{
                          background: `url(${src}) center top / contain no-repeat`,
                          transform: "scaleY(-1)",
                          filter: "blur(4px)",
                          maskImage:
                            "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)",
                          WebkitMaskImage:
                            "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)",
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ================= Mobile ================= */}
      <div className="block md:hidden">
         <h2
          className="text-lg sm:text-3xl md:text-4xl font-extrabold text-center mb-4"
          data-aos="fade-down"
        >
          
          <span className="text-blue-900">
            {translations[language].bpc.split(" ")[0]}
          </span>{" "}
          <span className="text-orange-500">
            {translations[language].bpc.split(" ").slice(1).join(" ")}
          </span>
        </h2>
       
        <div
          className="relative mx-auto h-[10px] overflow-visible"
          style={{ maxWidth: `min(350px, 90vw)` }}
        >
          <div
            className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2"
            style={{ perspective: "800px" }}
          >
            <div className="w-full h-full relative animate-elliptical-rotation">
              {icons.map((src, i) => {
                const ellipseRadius = 360;
                return (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{
                      transform: `rotateY(${i * angleIncrement}deg) translateZ(${ellipseRadius * 0.7}px)`,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div className="flex flex-col items-center">
                      <img
                        src={src}
                        alt={`Partner Logo ${i + 1}`}
                        className="h-10 w-auto object-contain drop-shadow-md transition-all duration-500"
                        loading="lazy"
                      />
                      {/* เงาสะท้อน */}
                      <div
                        className="h-10 w-full mt-[-6px] opacity-25"
                        style={{
                          background: `url(${src}) center top / contain no-repeat`,
                          transform: "scaleY(-1)",
                          filter: "blur(3px)",
                          maskImage:
                            "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)",
                          WebkitMaskImage:
                            "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)",
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slie_iconPartner;
