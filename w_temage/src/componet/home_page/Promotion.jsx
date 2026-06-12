import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import { url } from "@/componet/unity/Part";
import { Loader2, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { LanguageContext } from "@/LayOut/Main_layout";
import translations from "../../data/translations";
const Promotion = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 const { language } = useContext(LanguageContext);
  // ฟังก์ชันตรวจสอบและอัปเดตสถานะ expired
  const checkAndUpdateExpired = async (promos) => {
    const today = new Date();
    const updates = promos
      .filter(
        (promo) =>
          promo.status === "active" &&
          promo.end_date &&
          new Date(promo.end_date) < today
      )
      .map((promo) => promo.id);

    if (updates.length === 0) return;

    try {
      await axios.put(`${url.base_url}/api/promotion/expire`, { ids: updates });
      console.log("Expired promotions updated:", updates);
    } catch (err) {
      console.error("Error updating expired promotions:", err);
    }
  };

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${url.base_url}/api/promotion`);
        const data = res.data.data || [];
        setPromotions(data);

        // ตรวจสอบและอัปเดตสถานะ expired
        await checkAndUpdateExpired(data);

        // โหลดข้อมูลใหม่อีกครั้งหลัง update
        const refreshed = await axios.get(`${url.base_url}/api/promotion`);
        setPromotions(refreshed.data.data || []);
      } catch (err) {
        console.error("Failed to fetch promotions:", err);
        setError("Failed to load promotions.");
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-green-700 bg-green-100 text-xs font-semibold">
            <CheckCircle className="w-3 h-3" /> {translations[language].active}
          </div>
        );
      case "expired":
        return (
          <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-red-700 bg-slate-200 text-xs font-semibold">
            <Clock className="w-3 h-3" /> {translations[language].expired}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="w-full max-w-[1400px]  mx-auto py-4 px-9 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-10 font-noto-sans-lao">
        <span className="text-orange-500">{translations[language].promotion_from_FINA}</span>  <span className="text-blue-900">FINA</span>
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-[50vh] text-red-500 text-lg">
          {error}
        </div>
      ) : promotions.length === 0 ? (
        <div className="flex justify-center items-center h-[50vh] text-gray-500 text-lg">
          No promotions available
        </div>
      ) : (
        <div className="flex overflow-x-auto space-x-6 py-4">
          {promotions
           .filter((promo) => promo.status === "active" || promo.status === "expired")
            .sort((a, b) => (a.status === "expired" ? 1 : -1))
            .map((promo) => (
              <div
                key={promo.id}
                className="flex-none w-80 bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col h-[400px]" // กำหนดความสูง
              >
                {/* Image */}
                <div className="w-full aspect-[4/3] overflow-hidden relative">
                  <img
                    src={promo.image_url ? `${url.base_url}${promo.image_url}` : "/placeholder-image.jpg"}
                    alt={promo.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3
                        className="text-lg font-semibold text-gray-800 font-noto-sans-lao line-clamp-2 break-words"
                        title={promo.title}
                      >
                        {promo.title}
                      </h3>
                      {getStatusBadge(promo.status)}
                    </div>

                    {/* Date Info */}
                    <div className="mt-2 flex flex-wrap gap-4 text-gray-700 text-sm font-noto-sans-lao">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" /> {translations[language].start}:{" "}
                        {promo.start_date ? new Date(promo.start_date).toLocaleDateString("en-US") : "-"}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" /> {translations[language].end}:{" "}
                        {promo.end_date ? new Date(promo.end_date).toLocaleDateString("en-US") : "-"}
                      </div>
                    </div>
                  </div>

                  {/* Read More */}
                  <Link
                    to={`/promotion/${promo.id}`}
                    className="mt-4 block text-center px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg shadow-md hover:from-orange-600 hover:to-orange-700 transition-all duration-300 font-noto-sans-lao text-sm"
                  >
                   {translations[language].learn_more}
                  </Link>
                </div>
              </div>
            ))}
        </div>


      )}
    </section>
  );
};

export default Promotion;
