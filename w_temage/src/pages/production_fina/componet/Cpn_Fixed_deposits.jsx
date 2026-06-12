import React, { useEffect, useContext } from "react";
import { PiggyBank, CalendarDays, Percent } from "lucide-react";
import { LanguageContext } from "../../../LayOut/Main_layout";
import translations from "../../../data/translations";
import AOS from "aos";
import "aos/dist/aos.css";

const Cpn_Fixed_deposits = () => {
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true, // animation เล่นครั้งเดียวเมื่อ scroll
    });
  }, []);

  return (
    <div className="bg-gradient-to-b from-orange-50 to-white py-12">
      {/* ส่วนหัว */}
      <div className="text-center max-w-3xl mx-auto px-4" data-aos="fade-up">
        <h1 className="text-3xl md:text-4xl font-bold text-orange-600 mb-4">
          {translations[language].title_Fixed}
        </h1>
        <p className="text-gray-700 leading-relaxed text-lg">
          {translations[language].description_Fixed}
        </p>
      </div>

      {/* การ์ดรายละเอียด */}
      <div
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 px-4"
        data-aos="fade-up"
      >
        {/* Card 1 */}
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-all duration-300" data-aos="zoom-in">
          <div className="flex items-center justify-center bg-orange-100 w-16 h-16 rounded-full mx-auto mb-4">
            <PiggyBank className="text-orange-500 w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-center mb-2 text-gray-800">
            {translations[language].titleC1}
          </h3>
          <p className="text-gray-600 text-center">{translations[language].descriptionC1}</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-all duration-300" data-aos="zoom-in" data-aos-delay="100">
          <div className="flex items-center justify-center bg-orange-100 w-16 h-16 rounded-full mx-auto mb-4">
            <CalendarDays className="text-orange-500 w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-center mb-2 text-gray-800">
            {translations[language].titleC2}
          </h3>
          <p className="text-gray-600 text-center">{translations[language].descriptionC2}</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-all duration-300" data-aos="zoom-in" data-aos-delay="200">
          <div className="flex items-center justify-center bg-orange-100 w-16 h-16 rounded-full mx-auto mb-4">
            <Percent className="text-orange-500 w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-center mb-2 text-gray-800">
            {translations[language].titleC3}
          </h3>
          <p className="text-gray-600 text-center">{translations[language].descriptionC3}</p>
        </div>
      </div>
    </div>
  );
};

export default Cpn_Fixed_deposits;
