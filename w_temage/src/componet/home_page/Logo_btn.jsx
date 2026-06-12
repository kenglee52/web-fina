import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "@/LayOut/Main_layout";
import translations from "../../data/translations";

const Logo_btn = () => {
  const { language } = useContext(LanguageContext);

  const logos = [
    { src: "/icon/ICON-01.png", label: translations[language].title_saving, path: "/saving_account" },
    { src: "/icon/ICON-02.png", label: translations[language].personalLoan, path: "/personal_loan" },
    { src: "/icon/ICON-05.png", label: translations[language].promotion_from_FINA, path: "/promotion" },
    { src: "/icon/ICON-06.png", label: translations[language].faq, path: "/support/faq" },
    { src: "/icon/ICON-04.png", label: translations[language].payment, path: "/payment" },
    { src: "/icon/ICON-03.png", label: translations[language].fundTransfer, path: "/fund_tarnsfer" }, // spelling fix
    { src: "/icon/ICON-07.png", label: translations[language].contact, path: "/support/contactus" },
  ];

  return (
    <div>
  <div className="flex lg:hidden justify-start items-start space-x-6 mt-6 px-4 py-0 overflow-x-auto">
  {logos.map((logo, index) => (
    <Link
      to={logo.path}
      key={index}
      className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform duration-150 min-w-[70px] h-28" // กำหนดความสูงเท่ากัน
    >
      <div className="w-10 h-10 flex items-center justify-center bg-orange-50 rounded-full overflow-hidden shadow-md">
        <img src={logo.src} alt={logo.label} className="w-10 h-auto object-contain" />
      </div>
      <p className="mt-1 text-xs font-medium text-blue-900 text-center break-words">
        {logo.label}
      </p>
    </Link>
  ))}
</div>


      {/* Desktop view */}
      <div className="hidden lg:grid grid-cols-7 gap-10 justify-items-center mt-10 px-16">
        {logos.map((logo, index) => (
          <Link
            to={logo.path}
            key={index}
            className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform duration-150"
          >
            <div className="w-16 h-16 flex items-center justify-center bg-orange-50 rounded-full overflow-hidden shadow-md">
              <img src={logo.src} alt={logo.label} className="w-20 h-auto object-contain" />
            </div>
            <p className="mt-2 text-sm font-medium text-blue-900 text-center">{logo.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Logo_btn;
