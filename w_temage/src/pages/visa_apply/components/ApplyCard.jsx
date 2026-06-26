import React, { useState , useEffect} from "react";
import Aos from "aos";
import "aos/dist/aos.css";
const ApplyOnlineSection = () => {
  const [expanded, setExpanded] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    income: "",
  });
  useEffect(()=> {
    Aos.init({
      delay: 300,
      duration: 1000,
      once: false
    })
  }, [])
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <section id="ApplyOnlineSection" className="relative w-full min-h-screen overflow-hidden bg-[#02152f] text-white">
      {/* BACKGROUND LINE */}
      {/* BACKGROUND */}
      <div className="absolute left-0 top-0 w-full h-full overflow-hidden z-[1]">
        <svg
          className="absolute w-full h-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00d4ff" stopOpacity="0" />
              <stop offset="30%" stopColor="#00d4ff" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#4f8fff" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#4f8fff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="0" />
              <stop offset="40%" stopColor="#FFD700" stopOpacity="0.8" />
              <stop offset="80%" stopColor="#FFA500" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FFA500" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0" />
              <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Mesh grid */}
          <g opacity="0.05" stroke="#4f8fff" strokeWidth="0.5">
            {[100, 200, 300, 400, 500, 600, 700, 800].map((y) => (
              <line key={y} x1="0" y1={y} x2="1440" y2={y} />
            ))}
            {[120, 240, 360, 480, 600, 720, 840, 960, 1080, 1200, 1320].map(
              (x) => (
                <line key={x} x1={x} y1="0" x2={x} y2="900" />
              ),
            )}
          </g>

          {/* Cyan wave lines top */}
          <path
            d="M-40 130 C180 50 360 20 600 100 C820 175 1000 60 1200 120 C1320 155 1400 110 1480 90"
            stroke="url(#g1)"
            strokeWidth="1.3"
            opacity="0.9"
          />
          <path
            d="M-40 165 C180 85 360 55 600 135 C820 210 1000 95 1200 155 C1320 190 1400 145 1480 125"
            stroke="url(#g1)"
            strokeWidth="1.0"
            opacity="0.65"
          />
          <path
            d="M-40 198 C180 118 360 88 600 168 C820 243 1000 128 1200 188 C1320 223 1400 178 1480 158"
            stroke="url(#g1)"
            strokeWidth="0.7"
            opacity="0.4"
          />
          <path
            d="M-40 228 C180 148 360 118 600 198 C820 273 1000 158 1200 218 C1320 253 1400 208 1480 188"
            stroke="url(#g1)"
            strokeWidth="0.5"
            opacity="0.25"
          />

          {/* Gold diagonal lines */}
          <path
            d="M-80 620 C140 460 360 380 680 410 C940 436 1140 580 1480 500"
            stroke="url(#g2)"
            strokeWidth="1.5"
            opacity="0.85"
          />
          <path
            d="M-80 662 C140 502 360 422 680 452 C940 478 1140 622 1480 542"
            stroke="url(#g2)"
            strokeWidth="1.1"
            opacity="0.6"
          />
          <path
            d="M-80 700 C140 540 360 460 680 490 C940 516 1140 660 1480 580"
            stroke="url(#g2)"
            strokeWidth="0.8"
            opacity="0.38"
          />
          <path
            d="M-80 735 C140 575 360 495 680 525 C940 551 1140 695 1480 615"
            stroke="url(#g2)"
            strokeWidth="0.5"
            opacity="0.2"
          />

          {/* Purple arc right */}
          <path
            d="M700 900 C730 680 900 560 1100 460 C1260 380 1380 280 1500 180"
            stroke="url(#g3)"
            strokeWidth="1.1"
            opacity="0.5"
          />
          <path
            d="M660 900 C690 690 855 575 1055 475 C1215 395 1335 295 1460 195"
            stroke="url(#g3)"
            strokeWidth="0.7"
            opacity="0.3"
          />

          {/* Stars / glow dots */}
          <circle cx="190" cy="90" r="2.5" fill="#00d4ff" opacity="0.9" />
          <circle cx="190" cy="90" r="8" fill="#00d4ff" opacity="0.12" />
          <circle cx="480" cy="40" r="2" fill="#ffffff" opacity="0.8" />
          <circle cx="480" cy="40" r="6" fill="#ffffff" opacity="0.1" />
          <circle cx="980" cy="65" r="3" fill="#FFD700" opacity="0.85" />
          <circle cx="980" cy="65" r="10" fill="#FFD700" opacity="0.12" />
          <circle cx="1300" cy="120" r="2" fill="#a78bfa" opacity="0.75" />
          <circle cx="1300" cy="120" r="7" fill="#a78bfa" opacity="0.1" />
          <circle cx="110" cy="450" r="2" fill="#00d4ff" opacity="0.55" />
          <circle cx="110" cy="450" r="6" fill="#00d4ff" opacity="0.08" />
          <circle cx="1380" cy="380" r="2.5" fill="#FFD700" opacity="0.65" />
          <circle cx="1380" cy="380" r="8" fill="#FFD700" opacity="0.1" />
          <circle cx="720" cy="800" r="2" fill="#ffffff" opacity="0.45" />
          <circle cx="290" cy="730" r="2.5" fill="#a78bfa" opacity="0.65" />
          <circle cx="290" cy="730" r="7" fill="#a78bfa" opacity="0.1" />
          <circle cx="1180" cy="680" r="2" fill="#00d4ff" opacity="0.55" />
        </svg>
      </div>

      {/* STARS */}
      <div className="absolute inset-0 overflow-hidden z-[2]">
        <div className="absolute top-[10%] left-[15%] w-1 h-1 bg-yellow-300 rounded-full shadow-[0_0_10px_#fde047] animate-pulse"></div>
        <div className="absolute top-[20%] left-[40%] w-2 h-2 bg-yellow-200 rounded-full shadow-[0_0_15px_#fde047] animate-pulse"></div>
        <div className="absolute top-[15%] right-[20%] w-1.5 h-1.5 bg-yellow-300 rounded-full shadow-[0_0_10px_#fde047] animate-pulse"></div>
        <div className="absolute top-[35%] left-[8%] w-1 h-1 bg-yellow-200 rounded-full shadow-[0_0_12px_#fde047] animate-pulse"></div>
        <div className="absolute top-[50%] right-[10%] w-2 h-2 bg-yellow-300 rounded-full shadow-[0_0_15px_#fde047] animate-pulse"></div>
        <div className="absolute bottom-[25%] left-[20%] w-1 h-1 bg-yellow-200 rounded-full shadow-[0_0_10px_#fde047] animate-pulse"></div>
        <div className="absolute bottom-[15%] right-[30%] w-1.5 h-1.5 bg-yellow-300 rounded-full shadow-[0_0_12px_#fde047] animate-pulse"></div>
        <div className="absolute top-[70%] left-[70%] w-1 h-1 bg-yellow-200 rounded-full shadow-[0_0_10px_#fde047] animate-pulse"></div>
      </div>

      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-[1]">
        <img
          src="https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2070&auto=format&fit=crop"
          alt="bg"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-[#02152f]/70"></div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 px-4 py-12 pb-40">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="bg-gray-300 text-black px-4 py-1 rounded-full text-sm">
            New Credit Card Customers
          </span>
          <h1 className="text-3xl font-bold mt-5 text-orange-500">
            Apply Online Service
          </h1>
          <p className="mt-4 text-xl">Total income start at 15,000 THB</p>
          <p className="text-lg">
            ( Foreigners minimum monthly income of 50,000 THB )
          </p>
        </div>

        {/* ===== NORMAL STATE ===== */}
        {!expanded && (
          <div data-aos="fade-up" className="flex flex-col lg:flex-row justify-center items-stretch max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
            {/* LEFT */}
            <div className="w-full lg:w-1/2 bg-gradient-to-b from-[#022b57] to-[#0b3d74] p-8 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-semibold text-cyan-300 mb-3">
                  Apply KTC Card Online
                </h2>
                <p className="text-gray-200 leading-7">
                  Prepare your National ID card and document and start apply
                  online.
                </p>
              </div>

              {/* Phone + OR + QR */}
              <div className="flex items-center justify-center gap-4 mt-10">
                <div className="bg-white rounded-[35px] p-2 shadow-xl">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/545/545245.png"
                    alt="phone"
                    className="w-28"
                  />
                </div>

                <div className="bg-[#ff5b57] p-4 rounded-2xl shadow-lg">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=ApplyCard"
                    alt="qr"
                    className="rounded-lg"
                  />
                  <p className="text-center text-xs mt-3">
                    Scan QR Code
                    <br />
                    to apply KTC card online
                  </p>
                </div>
              </div>

              <div className="mt-10 border-t border-white/20 pt-6 text-center">
                <p className="text-lg">
                  Convenient: Apply and submit documents online
                </p>
                <h3 className="text-4xl font-bold text-cyan-300 mt-3">
                  24 hours a day
                </h3>
              </div>
            </div>

            {/* RIGHT FORM - mini, click to expand */}
            <div className="w-full lg:w-1/2 bg-[#f4f4f4] p-7">
              <h2 className="text-3xl font-bold text-center leading-relaxed text-black">
                Fill in your contact details
                <br />
                for our call-back service
              </h2>
              <div className="space-y-5 mt-10">
                {[
                  "First Name",
                  "Last Name",
                  "Phone Number (10 digits)",
                  "Email",
                ].map((ph) => (
                  <input
                    key={ph}
                    type="text"
                    placeholder={ph}
                    readOnly
                    onClick={() => setExpanded(true)}
                    className="w-full border border-gray-300 rounded-full px-5 py-4 outline-none text-black cursor-pointer bg-white"
                  />
                ))}
                <select
                  onClick={() => setExpanded(true)}
                  className="w-full border border-gray-300 rounded-full px-5 py-4 outline-none text-black bg-white cursor-pointer"
                >
                  <option>Monthly Income</option>
                  <option>15,000+</option>
                  <option>30,000+</option>
                  <option>50,000+</option>
                  <option>100,000+</option>
                </select>
                <button
                  onClick={() => setExpanded(true)}
                  className="w-full bg-pink-200 hover:bg-pink-400 duration-300 text-white py-4 rounded-full font-semibold"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===== EXPANDED STATE ===== */}
        {expanded && (
          <div data-aos="fade-up" className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-10 relative text-black">
            {/* Close */}
            <button
              onClick={() => setExpanded(false)}
              className="absolute top-6 right-8 text-gray-400 hover:text-black text-3xl font-light leading-none"
            >
              ×
            </button>

            <h2 className="text-xl font-bold text-center mb-8">
              Fill in your contact details for our call-back service
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* First Name floating label */}
              <div className="relative">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder=" "
                  value={form.firstName}
                  onChange={handleChange}
                  autoFocus
                  className="peer w-full border-2 border-gray-800 focus:border-blue-500 rounded-full px-5 py-3 outline-none text-black bg-transparent"
                />
                <label
                  htmlFor="firstName"
                  className="absolute left-5 top-3 text-gray-400 bg-white px-1 transition-all duration-200 pointer-events-none
                 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-blue-500
                 peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-500"
                >
                  First Name
                </label>
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder=" "
                  value={form.lastName}
                  onChange={handleChange}
                  className="peer w-full border border-gray-300 focus:border-blue-500 rounded-full px-5 py-3 outline-none text-black bg-transparent"
                />
                <label
                  htmlFor="lastName"
                  className="absolute left-5 top-3 text-gray-400 bg-white px-1 transition-all duration-200 pointer-events-none
                 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-blue-500
                 peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-500"
                >
                  Last Name
                </label>
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder=" "
                  value={form.phone}
                  onChange={handleChange}
                  className="peer w-full border border-gray-300 focus:border-blue-500 rounded-full px-5 py-3 outline-none text-black bg-transparent"
                />
                <label
                  htmlFor="phone"
                  className="absolute left-5 top-3 text-gray-400 bg-white px-1 transition-all duration-200 pointer-events-none
                 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-blue-500
                 peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-500"
                >
                  Phone Number (10 digits)
                </label>
              </div>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder=" "
                  value={form.email}
                  onChange={handleChange}
                  className="peer w-full border border-gray-300 focus:border-blue-500 rounded-full px-5 py-3 outline-none text-black bg-transparent"
                />
                <label
                  htmlFor="email"
                  className="absolute left-5 top-3 text-gray-400 bg-white px-1 transition-all duration-200 pointer-events-none
                 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-blue-500
                 peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-500"
                >
                  Email
                </label>
              </div>
              <div className="relative">
                <select
                  name="income"
                  id="income"
                  value={form.income}
                  onChange={handleChange}
                  className="peer w-full border border-gray-300 focus:border-blue-500 rounded-full px-5 py-3 outline-none text-black bg-white appearance-none"
                >
                  <option value="" disabled hidden></option>
                  <option value="15000">15,000+</option>
                  <option value="30000">30,000+</option>
                  <option value="50000">50,000+</option>
                  <option value="100000">100,000+</option>
                </select>
                <label
                  htmlFor="income"
                  className={`absolute left-5 bg-white px-1 transition-all duration-200 pointer-events-none
                 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-blue-500
                 ${form.income ? "-top-2.5 text-xs text-gray-500" : "top-3 text-gray-400"}`}
                >
                  Monthly Income
                </label>
                {/* ໄອຄອນລູກສອນລົງສຳລັບ Select ເພາະເຮົາໃຊ້ appearance-none */}
                <div className="absolute right-5 top-4 pointer-events-none text-gray-500 text-xs">
                  ▼
                </div>
              </div>
            </div>

            {/* Checkbox PDPA */}
            <div className="flex items-start gap-3 mt-8 text-sm text-gray-600">
              <input
                type="checkbox"
                id="agree"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 w-4 h-4 cursor-pointer flex-shrink-0"
              />
              <label htmlFor="agree" className="leading-relaxed">
                I acknowledge that Krungthai Card Public Company Limited or KTC
                will collect and use my provided personal data for contacting
                and offering KTC products to me. I have thoroughly read and
                understood the details of{" "}
                <span className="underline cursor-pointer">
                  Personal Data Protection Notice for Customer.
                </span>
              </label>
            </div>

            <div className="flex justify-center mt-6">
              <button
                disabled={!agreed}
                className={`w-48 py-3 rounded-full font-semibold text-white duration-300 ${
                  agreed
                    ? "bg-[#ec4899] hover:bg-[#db2777] cursor-pointer"
                    : "bg-pink-200 cursor-not-allowed"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Bottom Promotion */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-r from-[#202022] via-[#38393d] to-[#111214] border-t border-white/10 px-4 py-6 md:px-16 flex flex-col lg:flex-row items-center justify-between gap-5 z-20">
          <div className="flex items-center gap-5 w-full max-w-5xl mx-auto justify-between lg:justify-start">
            <div className="flex items-center gap-5">
              {/* ໄອຄອນຮູບພາບ KTC ບັດສາມໃບ */}
              <div className="w-14 h-14 rounded-xl bg-[#282828] border border-white/10 flex items-center justify-center overflow-hidden shadow-lg flex-shrink-0">
                <img
                  src="https://www.ktc.co.kr/assets/images/common/logo.png" // ຫຼື ປ່ຽນເປັນ URL ຮູບບັດ KTC ສາມໃບຂອງທ່ານ
                  alt="KTC Cards"
                  className="w-11 h-11 object-contain"
                  onError={(e) => {
                    // ຖ້າຮູບບໍ່ຂຶ້ນ ໃຫ້ສະແດງຂໍ້ຄວາມ KTC ແທນແບບໃນຮູບ
                    e.target.style.display = "none";
                    e.target.parentNode.innerHTML =
                      '<div className="bg-[#b72026] text-white text-[10px] font-bold px-1 rounded transform -rotate-12 shadow-md">KTC</div>';
                  }}
                />
              </div>

              <div>
                <span className="bg-[#e0e0e0] text-[#4a4a4a] text-[11px] font-medium px-3 py-0.5 rounded-full">
                  Current Credit Card Customers
                </span>
                <h3 className="text-xl font-bold mt-1 text-white">
                  Apply via KTC Mobile app.
                </h3>
                <p className="text-sm text-gray-300">No Documents Required.</p>
              </div>
            </div>
          </div>

          {/* ປຸ່ມຂວາມື */}
          <div className="w-full lg:w-auto flex justify-center lg:justify-end max-w-5xl mx-auto lg:mx-0 lg:pr-12">
            <button className="border border-white/60 text-yellow-800 text-sm px-6 py-2.5 rounded-full  duration-300 backdrop-blur-sm whitespace-nowrap">
              Apply easily on your phone
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplyOnlineSection;