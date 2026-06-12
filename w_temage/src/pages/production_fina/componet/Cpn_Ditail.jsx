import React, { useEffect, useContext } from "react";
import { Wallet, PiggyBank, Calendar, DollarSign } from "lucide-react";
import { LanguageContext } from "../../../LayOut/Main_layout";
import translations from "../../../data/translations";

// ✅ AOS
import AOS from "aos";
import "aos/dist/aos.css";

export const Cpn_Ditail = () => {
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const accountDetails = [
    {
      icon: <Wallet className="text-orange-500 w-8 h-8" />,
      title: translations[language].account_detail1_title,
      fee: translations[language].account_detail1_fee,
      minDeposit: translations[language].account_detail1_minDeposit,
    },
    {
      icon: <PiggyBank className="text-orange-500 w-8 h-8" />,
      title: translations[language].account_detail2_title,
      fee: translations[language].account_detail2_fee,
      minDeposit: translations[language].account_detail2_minDeposit,
    },
    {
      icon: <Calendar className="text-orange-500 w-8 h-8" />,
      title: translations[language].account_detail3_title,
      fee: translations[language].account_detail3_fee,
      minDeposit: translations[language].account_detail3_minDeposit,
    },
    {
      icon: <DollarSign className="text-orange-500 w-8 h-8" />,
      title: translations[language].account_detail4_title,
      fee: translations[language].account_detail4_fee,
      minDeposit: translations[language].account_detail4_minDeposit,
    },
  ];

  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 ">
        {/* Title */}
        <h2
          className="text-3xl font-bold text-gray-800 mb-4 text-center"
          data-aos="fade-up"
        >
          {translations[language].account_detail_title}
        </h2>
        <p
          className="text-gray-600 max-w-2xl mx-auto mb-12 text-center"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {translations[language].account_detail_desc}
        </p>

  
        {/* List */}
<div className="flex flex-wrap justify-center gap-4">
  {accountDetails.map((item, idx) => (
    <div
      key={idx}
      className="flex-1 min-w-[220px] max-w-[500px] flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100"
      data-aos="fade-up"
      data-aos-delay={idx * 100}
    >
      <div className="mt-1">{item.icon}</div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
        <p className="text-gray-600 mt-1">
          <strong>{translations[language].Fee}:</strong> {item.fee}
        </p>
        <p className="text-gray-600 mt-1">
          <strong>{translations[language].Minimum_Deposit}:</strong> {item.minDeposit}
        </p>
      </div>
    </div>
  ))}
</div>

      </div>
    </section>
  );
};

export default Cpn_Ditail;
