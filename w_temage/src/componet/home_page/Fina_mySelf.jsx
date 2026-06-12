import React, { useEffect, useContext } from "react";
import { LanguageContext } from "../../LayOut/Main_layout";
import DownloadButtons from "../navbar_main/DownloadButtons";
import translations from "../../data/translations";
import AOS from "aos";
import "aos/dist/aos.css";

const Fina_mySelf = () => {
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <section className="w-full min-h-12 bg-white flex items-center justify-center overflow-hidden">
      {/* ======= MOBILE ======= */}
      <div
        className="block md:hidden w-[95%] bg-gradient-to-br from-orange-400 to-orange-50 backdrop-blur-md 
        rounded-2xl p-6 flex flex-col items-center text-center space-y-4 py-20"
        
      >
        {/* Title */}
        <h1
          className="text-3xl font-extrabold text-white drop-shadow-lg"
        
        >
          <span className="text-blue-900">
            {translations[language].greeting}
          </span>{" "}
          <span className="text-orange-500">FINA</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-base text-gray-700 leading-relaxed max-w-sm"
         
        >
          {translations[language].intro}
        </p>

        {/* Mission */}
        <p
          className="text-sm text-gray-700 leading-relaxed max-w-full"
        
        >
          {translations[language].mission}
        </p>

        {/* Vision */}
        <p
          className="text-base text-gray-700 leading-relaxed max-w-sm"
         
        >
          {translations[language].vision}
        </p>

        {/* Download Buttons */}
        <div
     
          className="mt-8 flex justify-center"
          style={{ transform: "scale(1.4)" }}
        >
          <DownloadButtons />
        </div>
      </div>

      {/* ======= DESKTOP ======= */}
      <div
        className="hidden md:flex w-11/12 max-w-[90%] bg-gradient-to-br from-orange-400 to-orange-50 backdrop-blur-md 
        rounded-3xl p-10 flex-col items-center text-center space-y-6 py-10"
        data-aos="fade-up"
      >
        {/* Title */}
        <h1
          className="text-5xl font-extrabold text-white drop-shadow-lg"
          data-aos="fade-down"
        >
          <span className="text-blue-900">
            {translations[language].greeting}
          </span>{" "}
          <span className="text-orange-500">FINA</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-xl text-gray-700 leading-relaxed max-w-3xl"
          data-aos="fade-up"
        >
          {translations[language].intro}
        </p>

        {/* Mission */}
        <p
          className="text-base text-gray-700 leading-relaxed max-w-full"
          data-aos="fade-up"
        >
          {translations[language].mission}
        </p>

        {/* Vision */}
        <p
          className="text-xl text-gray-700 leading-relaxed max-w-3xl"
          data-aos="fade-up"
        >
          {translations[language].vision}
        </p>

        {/* Download Buttons */}
        <div
          data-aos="zoom-in"
          className="mt-14 flex justify-center"
          style={{ transform: "scale(2)" }}
        >
          <DownloadButtons />
        </div>
      </div>
    </section>
  );
};

export default Fina_mySelf;
