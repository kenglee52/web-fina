import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "@/componet/unity/Part";
import { LanguageContext } from "@/LayOut/Main_layout";
import translations from "../../data/translations";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Contac from "@/componet/home_page/Contac";

const New_event = ({ className }) => {
  const { language } = useContext(LanguageContext);
  const [newsItems, setNewsItems] = useState({ news: [], events: [] });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch news/events
  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${url.base_url}/api/news`);
      const data = res.data.data || [];
      // Split items by type and sort by created_at (newest first)
      const news = data
        .filter((item) => item.type === "news")
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      const events = data
        .filter((item) => item.type === "event")
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setNewsItems({ news, events });
      setError(null);
    } catch (err) {
      console.error("Error fetching news/events:", err);
      setError(translations[language].error_loading || "Failed to load news/events. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Handle "Learn More" click
  const handleLearnMore = (id) => {
    navigate(`/news/event/${id}`);
  };

  // Render horizontal scrolling row for news or events
  // Render horizontal scrolling row for news or events
  const renderRow = (items, title, color) => (
    <section className="mb-16">
      <div className="flex justify-between items-center mb-6">
        <h3 className={`text-2xl font-bold border-l-4 pl-3 ${color}`}>
          {title}
        </h3>

      </div>

      {items.length === 0 ? (
        <p className="text-center text-gray-500 italic">
          {translations[language].no_items || `No ${title.toLowerCase()} available`}
        </p>
      ) : (
        // 🔹 เปลี่ยนตรงนี้
        <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
          {items.map((item) => (
            <div className="min-w-[300px] max-w-[300px] bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden flex-shrink-0">
              <img
                src={item.image_url ? `${url.base_url}${item.image_url}` : "/placeholder-image.jpg"}
                alt={item.title}
                className="w-full h-52 object-cover"
                onError={(e) => (e.target.src = "/placeholder-image.jpg")}
              />
              <div className="p-4 flex flex-col justify-between h-[200px]">
                <div>
                  <h4
                    className="text-lg font-semibold text-gray-800 line-clamp-2 break-words"
                    title={item.title}
                  >
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {item.type === "news" ? translations[language].news:  translations[language].event} •{" "}
                    
                  </p>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3 break-words">
                    {item.summary || "•••"}
                  </p>
                </div>
                <div className="mt-2">
                  <Button
                    onClick={() => handleLearnMore(item.id)}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white transition-transform duration-200 hover:scale-105"
                  >
                   {translations[language].learn_more}
                  </Button>
                </div>
              </div>
            </div>

          ))}
        </div>
      )}
    </section>
  );

  return (
    <>

      <div className={`w-full max-w-[1400px] mx-auto p-4 px-10 ${className}  bg-white `}>
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-orange-500">
          {translations[language].news_event || "News & Events"}
        </h2>
        {loading ? (
          <div className="flex justify-center items-center h-[50vh]">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-[50vh] text-red-500 text-lg">
            {error}
          </div>
        ) : (
          <>
            {renderRow(newsItems.news, translations[language].news || "News", "text-blue-900 border-orange-500")}
            {renderRow(newsItems.events, translations[language].event || "Events", "text-blue-900 border-orange-500")}
          </>


        )}

      </div>

    </>
  );
};

export default New_event;