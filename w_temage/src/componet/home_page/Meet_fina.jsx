import React, {useContext, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // ✅ Import CSS
import { Banknote, Cpu, MapPin } from "lucide-react";
import { LanguageContext } from "@/LayOut/Main_layout";
import translations from "../../data/translations";
const Meet_fina = () => {
  useEffect(() => {
    AOS.init({
      duration: 600,
      offset: 50,
      easing: "ease-in-out",
      once: false,
      mirror: true,
    });
  }, []);
  const { language } = useContext(LanguageContext);
  const items = [
    {
      icon: <Banknote className="w-14 h-14 text-orange-500" />,
      title: translations[language].title_bank,
      desc: `${translations[language].desc_bank}`,
    },
    {
      icon: <Cpu className="w-14 h-14 text-blue-500" />,
      title: "FinTech",
      desc: translations[language].desc_fintech,
    },
    {
      icon: <MapPin className="w-14 h-14 text-green-500" />,
      title: translations[language].title_location,
      desc: translations[language].desc_location,
    },
  ];

  return (
    <section className="relative w-full min-h-16 bg-gradient-to-br from-orange-50 to-blue-50 flex flex-col justify-center items-center py-24 px-6 overflow-hidden">
      <h2
        className="text-4xl sm:text-6xl font-extrabold text-blue-900 mb-16 text-center tracking-wide drop-shadow-lg"
        data-aos="fade-down"
        
      >
        {translations[language].meet} <span className="text-orange-500">FINA</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl w-full">
        {items.map((item, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 250}
            className="group relative bg-white rounded-3xl shadow-xl p-10 flex flex-col items-center text-center overflow-hidden
                       hover:shadow-2xl hover:scale-105 transition-all duration-500 ease-in-out cursor-pointer"
          >
            <div className="mb-6">{item.icon}</div>
            <h3 className="text-2xl font-bold text-blue-900 mb-3">{item.title}</h3>
            <p className="text-gray-600 leading-relaxed font-light">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Meet_fina;
