import React,{useEffect} from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';

export default function Privilege() {
  useEffect(() => {
    Aos.init({duration: 1000,once: false});
  },[]);
  const ExclusiveCard=[
    {
      icon: "https://www.ktc.co.th/upload/pub/export/credit-card/benefit/nofee-1-120x120.webp",
      title: "Annual Fee",
      subTitle: "No entrance fee and annual fee.",
      href: ""
    },
    {
      icon: "https://www.ktc.co.th/upload/pub/export/credit-card/benefit/installment-payment-121x121.webp",
      title: "Easy Installments",
      subTitle: "No entrance fee and annual fee.Pay products / services with a special interest rate of 0% up to 10 months through the installment payments with KTC credit card.",
      href: ""
    },
    {
      icon: "https://www.ktc.co.th/upload/pub/export/credit-card/benefit/travel-insurance-120x121.webp",
      title: "Travel Insurance",
      subTitle: "Insurance coverage for international & domestic flights and lost or damage baggage.",
      href: ""
    },
    {
      icon: "https://www.ktc.co.th/upload/pub/export/credit-card/benefit/point-121x121.webp",
      title: "Rewards Points",
      subTitle: "Insurance coverage for international & domestic flights and lost or damage baggage.Rewards Points",
      href: ""
    },
    {
      icon: "https://www.ktc.co.th/upload/i-Visa-Contactless-1.svg",
      title: "Tap and go with Visa Contactless",
      subTitle: "With convenient, easy, and contactless payment without the need to swipe your KTC VISA credit card at the participating stores with the contactless sign.",
      href: ""
    },
    {
      icon: "https://www.ktc.co.th/upload/pub/export/credit-card/benefit/personal-assistant-121x121.webp",
      title: "KTC PERSONAL ASSISTANT",
      subTitle: "The above services are intended for providing information, recommendation and coordination for personal use only, and not intended for commercial or illegal purposes.",
      href: ""
    },
    {
      icon: "https://www.ktc.co.th/upload/pub/export/credit-card/benefit/accident-insurance-121x121.webp",
      title: "Accidental Insurance",
      subTitle: "Special privilege for new KTC credit cardmembers to get a maximum accident insurance coverage limit of 300,000 THB for 90 days with no cost from the date of card activation from 1 Jan 26 - 31 Dec 26.",
      href: ""
    },
    {
      icon: "https://www.ktc.co.th/upload/Cash-Withdrawal.svg",
      title: "Cash Withdrawal",
      subTitle: "Cash withdrawal with the amount not exceeding the remaining credit limit or maximum of 200,000 THB/day via ATM and maximum of 500,000 THB/day via KTC Mobile app.",
      href: ""
    },
    {
      icon: "https://www.ktc.co.th/upload/pub/export/credit-card/benefit/fitbit-512x121.webp",
      title: "Pay on-the-go easily anywhere",
      subTitle: "While you're out for a run, you can hop into a corner store to buy water, without needing your wallet or phone. Google Fitbit , Garmin Pay , Google Pay and SWATCHPAY!",
      href: ""
    },
  ];
  return (
    <section id='Privilege' className="relative bg-[#0B1120] overflow-hidden">
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
        <div className="grid lg:grid-cols-2 gap-16 items-center">
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
      </div>
      <section className="relative w-full h-[350px] md:h-[400px] lg:h-[450px] overflow-hidden mt-10">
        <img data-aos="fade-up"
          src="https://www.ktc.co.th/upload/pub/export/credit-card/online-shopping-bg-1920x540.webp"
          alt="KTC Visa Promotions"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-slate-900/80 md:bg-slate-900/70 lg:bg-gradient-to-r lg:from-slate-900/95 lg:via-slate-900/80 lg:to-transparent"></div>

        <div className="relative z-10 w-full max-w-7xl mx-auto h-full px-6 lg:px-12 flex flex-col justify-center items-center lg:items-start">
          <div className="max-w-2xl text-center lg:text-left" data-aos='fade-up'>
            <h1 className="text-white text-xl md:text-2xl lg:text-3xl font-bold leading-snug md:leading-tight mb-8 drop-shadow-md">
              Shop online and order food delivery with great deals all year round with <span className="text-amber-600">FINA VISA</span> credit card at participating online partners.
            </h1>

            <div className="flex flex-col md:flex-row items-center justify-center lg:justify-start gap-4 md:gap-6 text-base font-medium">
              <a
                href="#"
                className="text-slate-200 hover:text-amber-700 underline underline-offset-4 transition-colors duration-300"
              >
                Exclusive Online Shopping Privileges
              </a>
              <span className="hidden md:inline-block text-slate-500 select-none">|</span>
              <a
                href="#"
                className="text-slate-200 hover:text-amber-700 underline underline-offset-4 transition-colors duration-300"
              >
                Exclusive Food Delivery Privileges
              </a>

            </div>
          </div>
        </div>
      </section>
      <section className='h-full w-full overflow-hidden mb-5'>
        {/* ເພີ່ມ data-aos="fade-down" ໃຫ້ກັບຫົວຂໍ້ */}
        <h1
          data-aos="fade-down"
          data-aos-duration="800"
          className='font-bold text-xl md:text-3xl text-amber-600 text-center mt-12 mb-20'
        >
          Exclusive Privileges For KTC cardmembers
        </h1>

        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {
              ExclusiveCard.map((item,index) => (
                <div
                  key={index}
                  // ເພີ່ມ data-aos="fade-up" ແລະ ຄຳນວນ delay ຕາມລຳດັບ index (0, 100, 200...)
                  data-aos="fade-up"
                  data-aos-delay={index*100}
                  data-aos-duration="600"
                  className="group cursor-pointer p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-400/50 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-amber-900/20"
                >
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="h-12 w-auto object-contain mb-5 opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                  />

                  <h3 className="text-lg md:text-xl text-white font-bold mb-3 group-hover:text-amber-400 transition-colors duration-300">
                    {item.title}
                  </h3>

                  <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                    {item.subTitle}
                  </p>
                </div>
              ))
            }
          </div>
        </div>
      </section>
    </section>
  );
}