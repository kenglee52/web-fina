import React, { useContext, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PiggyBank, Wallet, CreditCard, Fuel, Landmark } from "lucide-react";
import { LanguageContext } from "../../../LayOut/Main_layout";
import translations from "../../../data/translations";
import AOS from "aos";
import "aos/dist/aos.css";

const Cpn_service = () => {
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const services = [
    {
      icon: <Wallet className="text-orange-500 w-10 h-10" />,
      title: translations[language].services_cpn_title1,
      description: translations[language].services_cpn_desc1,
    },
    {
      icon: <PiggyBank className="text-orange-500 w-10 h-10" />,
      title: translations[language].services_cpn_title2,
      description: translations[language].services_cpn_desc2,
    },
    {
      icon: <Fuel className="text-orange-500 w-10 h-10" />,
      title: translations[language].services_cpn_title3,
      description: translations[language].services_cpn_desc3,
    },
    {
      icon: <Landmark className="text-orange-500 w-10 h-10" />,
      title: translations[language].services_cpn_title4,
      description: translations[language].services_cpn_desc4,
    },
    {
      icon: <CreditCard className="text-orange-500 w-10 h-10" />,
      title: translations[language].services_cpn_title5,
      description: translations[language].services_cpn_desc5,
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2
          className="text-3xl font-bold text-gray-800 mb-8"
          data-aos="fade-up"
        >
          {translations[language].services_cpn}
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card
              key={index}
              className="shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100 rounded-2xl bg-white"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                {service.icon}
                <h3 className="text-lg font-semibold mt-4 text-gray-800">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cpn_service;
