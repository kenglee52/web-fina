import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import { url } from "@/componet/unity/Part";
import { Loader2, Clock, CheckCircle, EyeOff } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";


import { LanguageContext } from "@/LayOut/Main_layout";
import translations from "../../data/translations";  


const Promotion_detail = () => {
  const { id } = useParams();
  const [promotion, setPromotion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   const { language } = useContext(LanguageContext);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPromotion = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${url.base_url}/api/promotion/${id}`);
        setPromotion(res.data.data || null);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch promotion:", err);
        setError(err.response?.status === 404 ? "Promotion not found" : "Failed to load promotion details.");
      } finally {
        setLoading(false);
      }
    };
    fetchPromotion();
  }, [id]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-green-700 bg-green-100 text-sm font-semibold">
            <CheckCircle className="w-4 h-4" /> {translations[language].active}
          </div>
        );
      case "expired":
        return (
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-red-400 bg-gray-100 text-sm font-semibold">
            <Clock className="w-4 h-4" /> {translations[language].expired}
          </div>
        );
      case "hidden":
        return (
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-yellow-700 bg-yellow-100 text-sm font-semibold">
            <EyeOff className="w-4 h-4" /> Hidden
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="w-full max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
       <Button
          variant="outline"
          onClick={() => navigate("/promotion")}
          className="bg-orange-500 hover:bg-orange-400 text-white rounded-lg"
        >
          { "<--"}
        </Button>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-8 font-noto-sans-lao">
        
        <span className="text-orange-500">{translations[language].promotion_from_FINA}</span>{" "}
        <span className="text-blue-900">FINA</span>
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-[50vh] text-red-500 text-lg">
          {error}
        </div>
      ) : !promotion ? (
        <div className="flex justify-center items-center h-[50vh] text-gray-500 text-lg">
          No promotion details available
        </div>
      ) : (
        <div className="animate-fadeIn space-y-6">
         
          {/* รูปภาพแบบฟรีสไตล์ */}
          <div className="relative">
            <img
              src={promotion.image_url ? `${url.base_url}${promotion.image_url}` : "/placeholder-image.jpg"}
              alt={promotion.title}
              className="w-full h-auto rounded-xl"
              loading="lazy"
            />
            <div className="absolute top-4 left-4">{getStatusBadge(promotion.status)}</div>
          </div>

          {/* เนื้อหาโปรโมชั่น */}
          <div className="text-center space-y-3">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 font-noto-sans-lao">
              {promotion.title}
            </h3>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              {promotion.description || "No description available"}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="flex flex-col">
                <span className="font-semibold text-gray-700 font-noto-sans-lao">{translations[language].start}:</span>
                <span className="text-gray-600 ml-1">
                  {promotion.start_date ? new Date(promotion.start_date).toLocaleDateString("en-US") : "-"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-700 font-noto-sans-lao">{translations[language].end}:</span>
                <span className="text-gray-600 ml-1">
                  {promotion.end_date ? new Date(promotion.end_date).toLocaleDateString("en-US") : "-"}
                </span>
              </div>
            </div>

            
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn { animation: fadeIn 0.5s ease-in-out; }
        `}
      </style>
    </section>
  );
};

export default Promotion_detail;
