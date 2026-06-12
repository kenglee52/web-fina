import React, { useContext, useEffect } from "react";
import { Phone, Mail, CreditCard } from "lucide-react"; // ใช้ icon จาก lucide-react
import { LanguageContext } from "../../LayOut/Main_layout";
import translations from "../../data/translations";
const Contac = () => {

    const { language } = useContext(LanguageContext);
  return (
    <div className="w-[90vw] max-w-full bg-white rounded-3xl  p-16 space-y-4 mx-auto ">
      {/* Title */}
      

      {/* Items in Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0 md:space-x-4">
        {/* Item 1 */}
        <div className="flex items-start space-x-4 w-full md:w-auto">
          <div className="p-3 bg-orange-200 rounded-full">
            <Phone className="w-9 h-9 text-orange-700" />
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-800">
           {translations[language].contact}
            </p>
            <div>

            <p className="text-gray-600">Tel: 1322</p>
            <p className="text-gray-600">Tel: 21 755123</p>
            <p className="text-gray-600">Tel: +856 2055877013</p>


            

            </div>
          </div>
        </div>

        {/* Item 2 */}
        <div className="flex items-start space-x-4 w-full md:w-auto">
          <div className="p-3 bg-blue-200 rounded-full">
            <Mail className="w-9 h-9 text-blue-700" />
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-800">
              {translations[language].help}
            </p>
            <p className="text-gray-600">fina@finafintech.com</p>
          </div>
        </div>

        {/* Item 3 */}
        <div className="flex items-start space-x-4 w-full md:w-auto">
          <div className="p-3 bg-green-200 rounded-full">
            <CreditCard className="w-9 h-9 text-green-700" />
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-800">
              {translations[language].additionalservices}
            </p>
            <p className="text-gray-600">   {translations[language].create_card}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contac;