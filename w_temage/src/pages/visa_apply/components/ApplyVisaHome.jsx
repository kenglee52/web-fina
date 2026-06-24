import React, { useState, useEffect } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css';

export default function ApplyVisaHome() {
  // 1. Array ເກັບ Link ຮູບບັດ Visa ທັງໝົດ
  const cardImages = [
    "https://pngimg.com/uploads/credit_card/credit_card_PNG118.png",
    "https://pngimg.com/uploads/credit_card/credit_card_PNG99.png",
    "https://pngimg.com/uploads/credit_card/credit_card_PNG25.png",
    "https://static.vecteezy.com/system/resources/previews/009/384/393/non_2x/credit-card-clipart-design-illustration-free-png.png"
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    Aos.init({
      duration: 1200, 
      once: false,    
      easing: 'ease-out-cubic',
    });
  }, [])

  // 2. ເຮັດໃຫ້ຮູບສະຫຼັບອັດຕະໂນມັດທຸກໆ 4 ວິນາທີ
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cardImages.length)
    }, 2000)
    return () => clearInterval(timer)
  }, [cardImages.length])

  // 3. ສ້າງດວງດາວ (Stars) ສໍາລັບພື້ນຫຼັງ (60 ດວງ)
  const [stars, setStars] = useState([])
  useEffect(() => {
    const generateStarsArray = (count) => {
      return Array.from({ length: count }, () => ({
        size: Math.random() * 2 + 1, 
        x: Math.random() * 100, 
        y: Math.random() * 100, 
        duration: Math.random() * 20 + 10, 
        delay: Math.random() * 5,
        color: `rgba(255, ${165 + Math.random() * 50}, 0, ${0.5 + Math.random() * 0.3})`,
      }))
    }
    setStars(generateStarsArray(60))
  }, [])

  return (
    // ປ່ຽນ min-h-screen ເປັນການໃຊ້ py ເພື່ອໃຫ້ມີພື້ນທີ່ສຳລັບ Content ທີ່ຍາວຂຶ້ນ
    <main className='relative min-h-screen bg-gradient-to-br from-blue-950 via-slate-900 to-orange-800 flex flex-col items-center overflow-hidden px-4 py-16 md:py-24'>

      {/* --- ເສັ້ນລາຍຄື້ນ (Wavy Lines Background) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,50 C20,60 40,30 60,50 C80,70 100,40 100,40 L100,100 L0,100 Z" fill="none" stroke="rgba(255, 165, 0, 0.2)" strokeWidth="0.2" className="animate-pulse" />
          <path d="M0,60 C30,40 50,80 70,60 C90,40 100,50 100,50 L100,100 L0,100 Z" fill="none" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="0.3" />
          <path d="M0,70 C25,80 45,50 75,70 C95,85 100,60 100,60 L100,100 L0,100 Z" fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="0.1" />
        </svg>
      </div>

      {/* --- ພື້ນຫຼັງດວງດາວບິນ (Flying Stars Effect) --- */}
      {stars.map((star, index) => (
        <div
          key={index}
          className="absolute rounded-full shadow-[0_0_6px_3px_rgba(255,165,0,0.3)] pointer-events-none"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
            backgroundColor: star.color,
            animation: `flyingStars ${star.duration}s linear infinite`,
            animationDelay: `${star.delay}s`,
            opacity: 0.7,
          }}
        />
      ))}

      <div className="container mx-auto w-full z-10 flex flex-col gap-20 mt-5">
        
        {/* ================= HERO SECTION ================= */}
        <div className="flex flex-col md:flex-row justify-evenly items-center gap-16 w-full">
          {/* --- ຝັ່ງຂໍ້ມູນ (Text Section) --- */}
          <div className="flex flex-col text-center md:text-left items-center md:items-start max-w-xl z-10">
            <h1 data-aos="fade-right" data-aos-delay="200" className='text-2xl md:text-4xl font-bold text-orange-500 mb-3 tracking-wide animate-pulse'>
              FINA Digital
            </h1>
            <h1 data-aos="fade-right" data-aos-delay="400" className='text-3xl md:text-5xl font-bold text-white mb-6 leading-tight'>
              Platina Visa credit card
            </h1>
            <p data-aos="fade-right" data-aos-delay="600" className='text-lg md:text-2xl text-slate-300 mb-8'>
              Experience more than you see
            </p>
            <button data-aos="fade-up" data-aos-delay="800" className='px-8 py-3.5 rounded-full bg-gradient-to-r from-orange-600 to-amber-700 text-white font-bold hover:from-orange-500 hover:to-amber-600 hover:scale-105 transform transition duration-300 shadow-[0_0_15px_rgba(249,115,22,0.4)]'>
              Apply Now
            </button>
          </div>

          {/* --- ຝັ່ງຮູບບັດ (3D Card Slider) --- */}
          <div data-aos="fade-left" data-aos-delay="600" className="flex flex-col items-center gap-8 z-10">
            <div className="relative w-72 h-44 sm:w-80 sm:h-52 md:w-[420px] md:h-[265px] flex items-center justify-center group perspective-1000">
              {/* ແສງ Glow ທາງຫຼັງ */}
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/30 to-blue-500/30 rounded-2xl blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"></div>
              
              {/* ຮູບບັດ Visa ທີ່ສະຫຼັບກັນອັດຕະໂນມັດ */}
              <div className="w-full h-full relative animate-float z-10">
                {cardImages.map((imgUrl, index) => {
                  const isActive = index === currentIndex
                  return (
                    <img
                      key={index}
                      src={imgUrl}
                      alt={`Visa Card ${index + 1}`}
                      className={`absolute inset-0 w-full h-full object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.6)] 
                                 transition-all duration-1000 ease-in-out transform
                                 ${isActive
                          ? 'opacity-100 scale-100 translate-x-0 rotate-0 pointer-events-auto z-10'
                          : 'opacity-0 scale-90 translate-x-12 -rotate-12 pointer-events-none z-0'
                        }
                                 group-hover:rotate-x-8 group-hover:-rotate-y-12 group-hover:scale-105 group-hover:-translate-y-2`}
                    />
                  )
                })}
              </div>
            </div>

            {/* ປຸ່ມ Dots ບອກຕຳແໜ່ງບັດ */}
            <div className="flex gap-2.5 z-20 mt-4">
              {cardImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2.5 rounded-full transition-all duration-500 ${index === currentIndex
                      ? 'w-8 bg-gradient-to-r from-orange-500 to-amber-500 shadow-md shadow-orange-500/50'
                      : 'w-2.5 bg-slate-600 hover:bg-slate-400'
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ================= FEATURES CARDS SECTION ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto z-10 mt-10">
          
          {/* Card 1 */}
          <div data-aos="fade-up" data-aos-delay="200" className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300 shadow-xl group">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="text-3xl">🔒</span> {/* ສາມາດປ່ຽນເປັນ SVG Icon ໄດ້ */}
            </div>
            <h3 className="text-xl font-bold text-white mb-3">More Secure</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Shop online confidently with a dynamic CVV – a security code that changes every time you request. All accessible through your app.
            </p>
          </div>

          {/* Card 2 */}
          <div data-aos="fade-up" data-aos-delay="400" className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300 shadow-xl group">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-teal-500/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="text-3xl">⚡</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">More Convenient</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              For a life on the move, use it instantly online and scan to pay after approval. Add your card to device pay apps like Google Pay.
            </p>
          </div>

          {/* Card 3 */}
          <div data-aos="fade-up" data-aos-delay="600" className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300 shadow-xl group">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="text-3xl">💳</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Worriless</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Enhance every spending moment at general stores with a numberless, magnetic stripe-free card. Eliminate concerns about theft.
            </p>
          </div>

        </div>
      </div>

      {/* --- Custom CSS --- */}
      <style>{`
        /* ບັດຟູຂຶ້ນ-ລົງ */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }

        /* ດວງດາວບິນ */
        @keyframes flyingStars {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(-100vh) translateX(-20vw); opacity: 0; }
        }
      `}</style>
    </main>
  )
}