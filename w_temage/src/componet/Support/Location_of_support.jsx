import React, { useContext } from "react";
import { MapPin, LocateFixed } from "lucide-react";
import translations from "../../data/translations";
import { LanguageContext } from "@/LayOut/Main_layout";

const Location_of_support = () => {
  const lat = 17.9649996;
  const lng = 102.6441925;
  const { language } = useContext(LanguageContext);

  // URL Google Maps Embed แบบซูมออก
  const googleMapsEmbedUrl = `https://www.google.com/maps?q=${lat},${lng}&z=16&output=embed`;

  // URL เปิด Google Maps ใหม่
  const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;

  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-rows-1 gap-8 items-center">
        
        {/* ส่วนข้อความ */}
        <div className="text-center md:text-left">
          <h2 className="flex items-center justify-center md:justify-start gap-2 text-2xl md:text-3xl font-bold text-blue-900 mb-4">
            <LocateFixed className="w-7 h-7 text-orange-500" />
            ສະຖານທີ່ຕັ້ງ (Our Location)
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed text-base md:text-lg">
            <span className="font-semibold text-orange-600">
              {translations[language].location_title}
            </span>
            <br />
            <span className="text-gray-600 italic">
              {`(Latitude: ${lat}, Longitude: ${lng})`}
            </span>
          </p>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full md:w-auto text-center bg-orange-500 text-white px-5 py-3 rounded-lg shadow-md hover:bg-orange-600 transition"
          >
            <MapPin className="w-5 h-5" />
            {translations[language].btnLct}
          </a>
        </div>

        {/* ส่วนแผนที่ */}
        <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] relative">
          <iframe
            title="Company Location"
            src={googleMapsEmbedUrl}
            width="100%"
            height="100%"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-2xl shadow-xl border-2 border-orange-200 hover:scale-105 transition-transform duration-300"
          ></iframe>
        </div>

      </div>
    </section>
  );
};

export default Location_of_support;
