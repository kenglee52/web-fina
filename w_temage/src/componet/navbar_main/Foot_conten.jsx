import React, { useContext, useEffect } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";

import { LanguageContext } from "../../LayOut/Main_layout";
import translations from "../../data/translations";
const Foot_conten = () => {
  const { language } = useContext(LanguageContext);
  return (
    <footer className="bg-gradient-to-r from-blue-900 to-blue-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          {/* Company / About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/LOGO_FINA-01.png" alt="FINA logo" className="w-12 h-12 object-contain rounded-md" />
              <div>
                <h3 className="text-xl font-bold">FINA</h3>
                <p className="text-sm text-blue-100/90">Digital Finance • FinTech </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock size={16} />
              <span className="text-sm text-blue-100/80">{translations[language].work_day1}</span>
              
            </div>
             <div className="flex items-center gap-3">
              <Clock size={16} />
              <span className="text-sm text-blue-100/80">{translations[language].work_day2}</span>
              
            </div>
            
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold">{translations[language].contac_foot}</h4>
            <ul className="space-y-2 text-sm text-blue-100/80">
              <li className="flex items-center gap-3">
                <MapPin size={16} />
                <span>{translations[language].location_foot}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} />
                <a href="tel:+8562055559096" className="hover:text-white">+856 2055559096</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} />
                fina@finafintech.com
              </li>
            </ul>
          </div>

          {/* Quick links */}


          {/* Newsletter & Social */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{translations[language].Follow_the_news}</h4>


            <div>

              <div className="flex items-center gap-3">
                <a href="http://facebook.com/finalaos/?locale=th_TH" aria-label="Facebook" className="p-2 bg-white/10 rounded-md hover:bg-white/20 transition">
                  <Facebook size={18} />
                </a>
                {/* <a href="https://instagram.com" aria-label="Instagram" className="p-2 bg-white/10 rounded-md hover:bg-white/20 transition">
                  <Instagram size={18} />
                </a>
                <a href="https://twitter.com" aria-label="Twitter" className="p-2 bg-white/10 rounded-md hover:bg-white/20 transition">
                  <Twitter size={18} />
                </a>
                <a href="https://linkedin.com" aria-label="LinkedIn" className="p-2 bg-white/10 rounded-md hover:bg-white/20 transition">
                  <Linkedin size={18} />
                </a> */}


              </div>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-blue-100/80">
          <div>© {new Date().getFullYear()} FINA. Fintech </div>
          <div className="flex items-center gap-4">

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Foot_conten;
