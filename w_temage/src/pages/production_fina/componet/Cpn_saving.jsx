import React, { useEffect, useContext } from "react";
import { PiggyBank, Wallet } from "lucide-react";
import { LanguageContext } from "../../../LayOut/Main_layout";
import AOS from "aos";
import translations from "../../../data/translations";
import "aos/dist/aos.css";

const Cpn_saving = () => {
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const content = {
    title: translations[language].title_saving,
    description:
        translations[language].description_saving,
    benefits: [
      {
        icon: <PiggyBank className="text-orange-500 w-8 h-8" />,
        title: translations[language].title_CS1,
         description: translations[language].description_CS1,
        //  title: "ປອດໄພ ແລະ ເຊື່ອຖືໄດ້",
        //
       
      },
      {
        icon: <Wallet className="text-orange-500 w-8 h-8" />,
        title: translations[language].title_CS2,
         description: translations[language].description_CS2,
        
      },
    ],
  };

  return (
    <section className="bg-gradient-to-b from-orange-50 to-white py-12">
      <div className="text-center max-w-3xl mx-auto px-4" data-aos="fade-up">
        <h1 className="text-3xl md:text-4xl font-bold text-orange-600 mb-4">
          {content.title}
        </h1>
        <p className="text-gray-700 leading-relaxed text-lg">{content.description}</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 px-4">
        {content.benefits.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
            data-aos="zoom-in"
            data-aos-delay={index * 100}
          >
            <div className="flex items-center justify-center bg-orange-100 w-16 h-16 rounded-full mx-auto mb-4">
              {item.icon}
            </div>
            <h3 className="text-xl font-semibold text-center mb-2 text-gray-800">
              {item.title}
            </h3>
            <p className="text-gray-600 text-center">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Cpn_saving;
