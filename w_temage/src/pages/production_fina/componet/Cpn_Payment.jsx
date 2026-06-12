import React, { useContext, useEffect } from "react";
import { CreditCard, Banknote, Smartphone, Globe2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { LanguageContext } from "../../../LayOut/Main_layout";
import translations from "../../../data/translations";

// ✅ AOS
import AOS from "aos";
import "aos/dist/aos.css";

export const Cpn_Payment = () => {
  const { language } = useContext(LanguageContext);

  // ✅ เรียกใช้ AOS เมื่อ component โหลด
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const paymentMethods = [
    {
      icon: <CreditCard className="text-orange-500 w-10 h-10" />,
      title: translations[language].payment_method1_title,
      desc: translations[language].payment_method1_desc,
    },
    {
      icon: <Banknote className="text-orange-500 w-10 h-10" />,
      title: translations[language].payment_method2_title,
      desc: translations[language].payment_method2_desc,
    },
    {
      icon: <Smartphone className="text-orange-500 w-10 h-10" />,
      title: translations[language].payment_method3_title,
      desc: translations[language].payment_method3_desc,
    },
    {
      icon: <Globe2 className="text-orange-500 w-10 h-10" />,
      title: translations[language].payment_method4_title,
      desc: translations[language].payment_method4_desc,
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Title */}
        <h2
          className="text-3xl font-bold text-gray-800 mb-4"
          data-aos="fade-up"
        >
          {translations[language].payment_title}
        </h2>
        <p
          className="text-gray-600 max-w-2xl mx-auto mb-12"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {translations[language].payment_desc}
        </p>

        {/* Payment Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {paymentMethods.map((method, idx) => (
            <Card
              key={idx}
              className="shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100 rounded-2xl bg-white"
              data-aos="zoom-in"
              data-aos-delay={idx * 100}
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                {method.icon}
                <h3 className="text-lg font-semibold mt-4 text-gray-800">
                  {method.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2">{method.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cpn_Payment;
