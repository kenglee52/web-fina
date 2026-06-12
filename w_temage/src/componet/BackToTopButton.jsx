import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react"; // ใช้ icon จาก lucide-react

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // ตรวจจับตอน scroll
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // ฟังก์ชันเลื่อนกลับบนสุด
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // เลื่อนแบบ smooth
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6  hover:bg-white text-orange-500 hover:text-orange-500 
                     p-3 rounded-full shadow-lg transition-all duration-300"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </>
  );
}
