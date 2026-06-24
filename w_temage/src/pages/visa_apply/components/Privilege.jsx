import React,{useEffect} from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';

export default function Privilege() {
  useEffect(() => {
    Aos.init({duration: 1000,once: false});
  },[]);

  return (
    <section className="relative bg-[#0B1120] py-24 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-500/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10 space-y-32">

        {/* ================= SECTION 1: Digital Lifestyle (ຂໍ້ຄວາມຊ້າຍ, ຮູບຂວາ) ================= */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6" data-aos="fade-right">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold tracking-widest uppercase">
              FINA Premium
            </span>
            <h2 className="text-xl lg:text-3xl font-extrabold text-orange-500 tracking-tight leading-[1.1]">
              Digital Lifestyle
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed max-w-lg">
              Apply by yourself through online channels. Shop online seamlessly, and start using it immediately upon approval.
            </p>
          </div>

          <div className="relative group" data-aos="zoom-in" data-aos-delay="200">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-slate-900 border border-white/10 p-2 rounded-[2rem]">
              <img
                src="https://www.ktc.co.th/upload/digital-Banner-1420x800.webp"
                alt="Digital Lifestyle"
                className="w-full h-auto rounded-[1.5rem] shadow-2xl transition duration-500 hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>

        {/* ================= SECTION 2: More Secure (ຮູບຊ້າຍ, ຂໍ້ຄວາມຂວາ) ================= */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* ຮູບຢູ່ຊ້າຍ - ໃຊ້ order-first ເພື່ອໃຫ້ມັນສະແດງກ່ອນໃນໜ້າຈໍໃຫຍ່ */}
          <div className="relative group order-first" data-aos="zoom-in" data-aos-delay="200">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-slate-900 border border-white/10 p-2 rounded-[2rem]">
              <img
                src="https://www.ktc.co.th/upload/digital-card-Banner-1240x932.webp"
                alt="Security"
                className="w-full h-auto rounded-[1.5rem] shadow-2xl transition duration-500 hover:scale-[1.02]"
              />
            </div>
          </div>

          {/* ຂໍ້ຄວາມຢູ່ຂວາ */}
          <div className="space-y-6" data-aos="fade-left">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold tracking-widest uppercase">
              Security First
            </span>
            <h2 className="text-xl lg:text-3xl font-extrabold text-orange-400 tracking-tight leading-[1.1]">
              More Secure
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed max-w-lg">
              With the numberless card and magnetic stripe-free, you can use it with Electronic Data Capture (EDC) machines and Automated Teller Machines (ATMs) that support transactions using chip cards and contactless payment only. Request for the numberless card through the KTC Mobile app.
            </p>
          </div>
        </div>
        <section className='contianer flex justify-center h-[200px] items-center'></section>
      </div>
    </section>
  );
}