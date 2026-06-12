import React from "react";
import { CheckCircle } from "lucide-react";
import { LanguageContext } from "../../../LayOut/Main_layout";
import translations from "../../../data/translations";

const Cpn_personaloan = () => {
  const { language } = React.useContext(LanguageContext);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          {translations[language].loan_personal_title}
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          {translations[language].loan_personal_desc}
        </p>

        <div className="grid md:grid-cols-2 gap-10 text-left">
          <div>
            <h3 className="text-xl font-semibold mb-3 text-orange-500">
              {translations[language].loan_personal_benefit_title}
            </h3>
            <ul className="space-y-2 text-gray-700">
              {translations[language].loan_personal_benefits.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-orange-500">
              {translations[language].loan_personal_requirement_title}
            </h3>
            <ul className="space-y-2 text-gray-700">
              {translations[language].loan_personal_requirements.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

      
      </div>
    </section>
  );
};

export default Cpn_personaloan;
