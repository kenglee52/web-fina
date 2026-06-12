import React, { useEffect, useContext } from "react";
import { LanguageContext } from "@/LayOut/Main_layout";
import translations from "../../data/translations";
import { ShieldCheck, Clock, Users, Handshake } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const Why_choose = () => {
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    AOS.init({
      duration: 800, // ลด duration เพื่อให้เร็วขึ้นบนมือถือ
      once: true,
      offset: 50, // ลด offset เพื่อให้ animation เริ่มเร็วกว่าบนมือถือ
    });
  }, []);

  const reasons = [
    {
      title: translations[language].accessibility_title,
      subtitle: translations[language].accessibility_subtitle,
      desc: translations[language].accessibility_desc,
      icon: <Clock className="w-12 h-12 text-blue-600" aria-hidden="true" />,
      aos: "fade-up",
    },
    {
      title: translations[language].sme_title,
      subtitle: translations[language].sme_subtitle,
      desc: translations[language].sme_desc,
      icon: <Users className="w-12 h-12 text-green-600" aria-hidden="true" />,
      aos: "fade-right",
    },
    {
      title: translations[language].security_title,
      subtitle: translations[language].security_subtitle,
      desc: translations[language].security_desc,
      icon: <ShieldCheck className="w-12 h-12 text-red-600" aria-hidden="true" />,
      aos: "fade-left",
    },
    {
      title: translations[language].partner_title,
      subtitle: translations[language].partner_subtitle,
      desc: translations[language].partner_desc,
      icon: <Handshake className="w-12 h-12 text-purple-600" aria-hidden="true" />,
      aos: "zoom-in",
    },
  ];

  return (
    <section
      className="py-16 sm:py-20 bg-gradient-to-b from-blue-50 to-white"
      role="region"
      aria-label="Why Choose FINA Section"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Title */}
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 sm:mb-16"
          data-aos="fade-down"
        >
          <span className="text-blue-900">{translations[language].why_choose_title.split(" ")[0]}</span>{" "}
          <span className="text-orange-500">{translations[language].why_choose_title.split(" ").slice(1).join(" ")}</span>
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
          {reasons.map((reason, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col items-start hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
              data-aos={reason.aos}
            >
              <div className="mb-4">{reason.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                {reason.title}
              </h3>
              <p className="text-sm text-gray-500 italic">
                {reason.subtitle}
              </p>
              <p className="mt-3 text-base sm:text-gray-600 leading-relaxed">
                {reason.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Why_choose; 