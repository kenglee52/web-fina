import React, { useState, useEffect, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import { url } from "@/componet/unity/Part"; // Same base URL as Slider_Manage
import { LanguageContext } from "@/LayOut/Main_layout";
import translations from "../../data/translations";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { data } from "react-router-dom";

const Salider_image = ({ className }) => {
  const { language } = useContext(LanguageContext);
  const [sliders, setSliders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch sliders from backend
  const fetchSliders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${url.base_url}/api/sliders`);
      setSliders(res.data.data || []);
      setError(null);


    } catch (err) {
      console.error("Error fetching sliders:", err);
      setError("Failed to load sliders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  return (
    <div className={`w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] ${className}`}>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-gray-500 text-lg">Loading sliders...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      ) : sliders.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-gray-500 text-lg">No sliders available</p>
        </div>
      ) : (
        <Swiper
          modules={[Navigation, Autoplay, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          loop={true}
          className="w-full h-full"
        >
          {sliders.map((slide, index) => (
            <SwiperSlide key={slide.id || index}>
              <div className="relative w-full h-full">
                {/* Background image */}
                <img
  src={`${url.base_url}${slide.image_url}`}
  alt={slide.title}
  className="
    w-full h-full object-cover 
    [object-position:70%_center] 
    sm:[object-position:center]
  "
  onError={(e) => (e.target.src = "/placeholder-image.jpg")}
/>




                {/* Overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>

                {/* Text content */}
                <div className="absolute inset-0 flex flex-col justify-end items-start text-start text-white px-10 sm:px-52 py-28">
                  <h2  className="text-2xl sm:text-4xl lg:text-6xl font-bold mb-3 sm:mb-4 drop-shadow-lg animate-pulse
                 break-words max-w-full sm:max-w-xl">
                    {slide.title}
                  </h2>
                  <p className="text-sm sm:text-lg lg:text-2xl max-w-2xl drop-shadow-md">
                    {slide.description || translations[language].no_description}
                  </p>

                  {/* Button hidden on mobile */}

                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Salider_image;