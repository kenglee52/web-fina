import React, { useEffect, useState } from "react";
import axios from "axios"; // ✅ ต้อง import axios
import Salider_image from "@/componet/home_page/Salider_image";
import Meet_fina from "@/componet/home_page/Meet_fina";
import AOS from "aos";
import "aos/dist/aos.css";
import Foot_conten from "@/componet/navbar_main/Foot_conten";
import Fina_mySelf from "@/componet/home_page/Fina_mySelf";
import Logo_btn from "@/componet/home_page/Logo_btn";
import Contac from "@/componet/home_page/Contac";
import Promotion from "@/componet/home_page/Promotion";
import Loan_Calculator from "@/componet/home_page/Loan_Calculator";
import { url } from "@/componet/unity/Part";
import New_event from "../news/New_event";

const User_view = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPopup, setShowPopup] = useState(true); // ✅ เปิด popup ตอนเข้าเว็บ
  const [popupImage, setPopupImage] = useState(null); // ✅ สร้าง state สำหรับ popup image

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
      mirror: true,
    });

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const fetchPopup = async () => {
      try {
        const res = await axios.get(`${url.base_url}/api/getpopups`, {
          headers: { 'Cache-Control': 'no-cache' },
          params: { t: Date.now() } // ป้องกัน cache
        });
        if (res.data && res.data.data.length > 0) {
          // ต่อ base URL
          const latestPopup = res.data.data[res.data.data.length - 1];
          setPopupImage(`${url.base_url}${latestPopup.filepath}`);
        }
      } catch (err) {
        console.error("Error fetching popup images:", err);
      }
    };
    fetchPopup();
  }, []);



  return (
    <div className="w-full overflow-hidden bg-white">
      {showPopup && popupImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-4">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-1 right-auto text-orange-500 hover:text-gray-800 text-3xl"
            >
              ✕
            </button>

            {/* ✅ แสดง popup image จาก DB */}
            <img
              src={popupImage}
              alt="Promotion"
              className="max-w-[95%] max-h-[90%] sm:max-w-[80%] sm:max-h-[85%] 
                   object-contain rounded-xl shadow-lg"
            />
          </div>
        </div>
      )}

      {/* Hero Section (Slider) */}
      <section className="relative">
        <div
          className={`relative transition-all duration-700 ease-in-out overflow-hidden ${isScrolled ? "rounded-3xl shadow-xl" : "rounded-none shadow-none"
            }`}
          style={{
            transform: isScrolled ? "scale(0.9)" : "scale(1)",
            transformOrigin: "center",
          }}
        >
          {/* fake border */}
          <div
            className={`absolute inset-0 pointer-events-none transition-all duration-700 ${isScrolled ? "border-4 border-orange-400 rounded-3xl" : "border-none"
              }`}
          ></div>

          <Salider_image
            className={`transition-all duration-700 ease-in-out ${isScrolled ? "rounded-3xl overflow-hidden" : "rounded-none"
              }`}
          />
        </div>
      </section>

      <Logo_btn />
      <Promotion />
      {/* Meet FINA Section */}
      <div
        className="relative w-full transition-all duration-700 ease-in-out overflow-hidden"
        style={{
          transform: "scale(0.9)",
          transformOrigin: "center",
          border: "4px solid white",
          borderRadius: "1.5rem",
        }}
      >

        <Meet_fina />
      </div>

      {/* Parallax Section */}


      <New_event />
      <Loan_Calculator />
      <Fina_mySelf />
      <Contac />
    </div>
  );
};

export default User_view;
