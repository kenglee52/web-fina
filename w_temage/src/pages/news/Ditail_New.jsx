import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "@/componet/unity/Part";
import { LanguageContext } from "@/LayOut/Main_layout";
import translations from "../../data/translations";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Contac from "@/componet/home_page/Contac";

const Ditail_New = () => {
  const { id } = useParams();
  const { language } = useContext(LanguageContext);
  const [newsItem, setNewsItem] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchNewsItem = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${url.base_url}/api/news/${id}`);
      setNewsItem(res.data.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching news/event:", err);
      if (err.response?.status === 404) {
        setError(translations[language].no_news || "News/event not found");
      } else {
        setError(translations[language].error_loading || "Failed to load news/event.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsItem();
  }, [id]);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-10 min-h-[70vh]">
      <div className="flex justify-start pt-6 items-start py-11">
        <Button
          variant="outline"
          onClick={() => navigate("/news/event")}
          className="bg-orange-500 hover:bg-orange-400 text-white rounded-lg"
        >
          {translations[language].back || "<--"}
        </Button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      ) : error ? (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : !newsItem ? (
        <div className="text-center text-gray-500 text-lg mt-10">
          {translations[language].no_news || "News/event not found"}
        </div>
      ) : (
        <div className="space-y-6">

          {/* หัวข่าว */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-snug">
              {newsItem.title}
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              {newsItem.type === "news"
                ? translations[language].news || "News"
                : translations[language].event || "Event"}
              {" • "}
             
            </p>
          </div>

          {/* รูปข่าว */}
          {newsItem.image_url && (
            <div className="w-full">
              <img
                src={`${url.base_url}${newsItem.image_url}`}
                alt={newsItem.title}
                className="w-full h-auto max-h-[80vh] object-cover rounded-2xl shadow-lg transition-transform duration-500 hover:scale-[1.02]"
                onError={(e) => (e.target.src = "/placeholder-image.jpg")}
              />
            </div>
          )}


          {/* สรุปข่าว */}
          {newsItem.summary && (
            <p className="text-xl text-gray-700 italic border-l-4 border-orange-400 pl-4">
              {newsItem.summary}
            </p>
          )}

          {/* เนื้อหาข่าว */}
          <div className="text-base text-gray-800 leading-relaxed whitespace-pre-wrap">
            {newsItem.content}
          </div>

          {/* ปุ่มย้อนกลับ */}

        </div>
      )}

    </div>
  );
};

export default Ditail_New;
