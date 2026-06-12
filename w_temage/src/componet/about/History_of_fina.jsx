import React, { useEffect, useContext } from "react";
import { LanguageContext } from "../../LayOut/Main_layout";
import translations from "../../data/translations";
import AOS from "aos";
import "aos/dist/aos.css";

const History_of_fina = () => {
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <section className="relative w-full bg-gradient-to-b from-white via-orange-50 to-blue-50 py-24 px-6 overflow-hidden">
      {/* Background Decorative Circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      {/* Content Container */}
      <div
        className="relative z-10 max-w-5xl mx-auto bg-white bg-opacity-80 backdrop-blur-lg rounded-3xl p-10 shadow-xl"
        data-aos="fade-up"
      >
        {/* Title */}
        <h1
          className="text-4xl md:text-5xl font-extrabold text-center mb-8"
          data-aos="fade-down"
        >
          <span className="text-blue-900">
            {translations[language].historyofFINA.split(" ")[0]}
          </span>{" "}
          <span className="text-orange-500">
            {translations[language].historyofFINA.split(" ").slice(1).join(" ")}
          </span>
        </h1>

        {/* Divider Line */}
        <div
          className="w-24 h-1 bg-gradient-to-r from-orange-400 to-blue-400 mx-auto mb-8 rounded-full"
          data-aos="zoom-in"
        ></div>

        {/* Text Section */}
        <p
          className="text-gray-700 text-lg leading-relaxed text-center md:text-justify"
          data-aos="fade-up"
        >
          {translations[language].history}
        </p>

        {/* Decorative underline pattern */}
        <div
          className="mt-12 flex justify-center"
         
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="120"
            height="10"
            viewBox="0 0 120 10"
            fill="none"
          >
            <path
              d="M0 5H120"
              stroke="url(#paint0_linear)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient
                id="paint0_linear"
                x1="0"
                y1="5"
                x2="120"
                y2="5"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FF7A00" />
                <stop offset="1" stopColor="#0044FF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default History_of_fina;
