import React, { useState, useEffect, useMemo, createContext } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import { Menu, X, MessageCircleMore, Instagram, Phone } from "lucide-react";
import DownloadButtons from "../componet/navbar_main/DownloadButtons";
import translations from "../data/translations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Foot_conten from "@/componet/navbar_main/Foot_conten";
import AOS from "aos";
import "aos/dist/aos.css";
import BackToTopButton from "@/componet/BackToTopButton";

// Create Language Context
export const LanguageContext = createContext();

const languageOptions = [
  { value: "lao", label: "LA", flag: "/lao.png" },
  { value: "english", label: "EN", flag: "/Eng.png" },
];

// Dropdown items with translated labels
const dropdownItems = (language) => ({
  production: [
    { to: "/saving_account", label: translations[language].Saving_Accounts },
    { to: "/fixed_deposits", label: translations[language].Fixed_Deposits },
    { to: "/services", label: translations[language].services },
    { to: "/comingsoon", label: translations[language].PFMFH },
  ],
  news: [
    { to: "/news/event", label: translations[language].news_event },
    { to: "/promotion", label: translations[language].promotion },

    // { to: "/news/event", label: translations[language].archive },
  ],
  support: [
    { to: "/support/faq", label: translations[language].faq },
    { to: "/support/contactus", label: translations[language].contact },
  ],
  Digital_Lending: [
    { to: "/personal_loan", label: translations[language].personalLoan },
    // { to: "/Digital_Lending/002", label: translations[language].carLoan },
    // { to: "/Digital_Lending/003", label: translations[language].housingLoan },
    { to: "/comingsoon", label: translations[language].smeLoan },
    { to: "/comingsoon", label: translations[language].groupLending },
  ],
  Payment_Transfer: [
    { to: "/fund_tarnsfer", label: translations[language].fundTransfer },
    { to: "/payment", label: translations[language].payment },
    { to: "/comingsoon", label: translations[language].finaAgents },
  ],
});

// Map nav items to images
const navItemImages = {

  production: "/hii.jpeg",
  Digital_Lending: "/hii.jpeg",
  Payment_Transfer: "/hii.jpeg",
  news: "/hii.jpeg",
  support: "/suppoet01.jpeg",
};

// Map sub-items to images using full routes
const subItemImages = {
  // Production
  "/saving_account": "/production/p001.jpeg",
  "/services": "/hii.jpeg",
  "/production/PFMFH": "/production/p003.jpeg",
  "/fixed_deposits": "/production/p002.jpeg",
  // News
  "/news/event": "/production/new.jpeg",
  "/promotion": "/hii.jpeg",
  // Support
  "/support/faq": "/suppoet02.jpeg",
  "/support/contactus": "/suppoet03.jpeg",
  // Digital Lending
  "/personal_loan": "/production/d001.jpeg",
  "/Digital_Lending/002": "/archive.jpg",
  "/Digital_Lending/003": "/housing.jpg",
  "/comingsoon": "/production/p003.jpeg",
  "/comingsoon/005": "/production/p003.jpeg",
  // Payment Transfer
  "/fund_tarnsfer": "/production/pt002.jpeg",
  "/payment": "/production/ot003.jpeg",
  "/fina_agent": "/production/pt001.jpeg",
};

// Fallback image for error handling
const FALLBACK_IMAGE = "/placeholder.jpg";

const Main_layout = () => {
  const [language, setLanguage] = useState("lao");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [hoveredSubItem, setHoveredSubItem] = useState(null);

  // Memoize dropdownItems to prevent re-creation on every render
  const memoizedDropdownItems = useMemo(() => dropdownItems(language), [language]);

  // Memoize context value to prevent unnecessary re-renders
  const languageContextValue = useMemo(() => ({ language, setLanguage }), [language]);

  useEffect(() => {
    AOS.init({
      duration: 300,
      easing: "ease-in-out",
      once: false,
      mirror: true,
    });
  }, []);

  const mainNavItems = [
    { to: "/about", label: translations[language].about },
    { to: "/production", label: translations[language].production },
    { to: "/Digital_Lending", label: translations[language].Digital_Lending },
    { to: "/Payment_Transfer", label: translations[language].Payment_Transfer },
    { to: "/news", label: translations[language].news },
    { to: "/support", label: translations[language].support },
    { to: "/careers", label: translations[language].careers },
  ];

  const dropdownNavItems = mainNavItems.filter(
    (item) => item.to !== "/about" && item.to !== "/careers"
  );

  const handleLanguageChange = (value) => {
    setLanguage(value);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <LanguageContext.Provider value={languageContextValue}>
      <div className="flex flex-col min-h-screen font-noto-sans-lao bg-white">
        {/* Top Navigation Bar */}
        <nav role="navigation" className="fixed top-0 left-0 w-full bg-white text-blue-900 z-50 h-20">
          <div className="container mx-auto px-2 sm:px-4 flex items-center justify-between h-full">
            {/* Logo on the left */}
            <div className="flex-shrink-0 mr-2 sm:mr-4">
              <Link to="/">
                <img
                  src="/fina-logo-color.png"
                  alt="FINA Logo"
                  className="w-12 h-12 sm:w-16 sm:h-16 object-contain cursor-pointer"
                />
              </Link>
            </div>

            {/* Main Navigation Links (Visible on larger screens) */}
            <div className="hidden lg:flex items-center space-x-6">
              {/* Standalone About Link */}
              <NavLink
                to="/about"
                end
                role="tab"
                className={({ isActive }) =>
                  `text-base font-bold px-3 py-2 rounded-lg transition-all duration-200 ${isActive
                    ? " text-orange-500 "
                    : "text-blue-900 hover:text-orange-500 hover:text-lg hover:bg-blue-100"
                  }`
                }
                aria-label={translations[language].about}
              >
                {translations[language].about}
              </NavLink>

              {/* Navigation Menu with Dropdowns */}
              <NavigationMenu>
                <NavigationMenuList className="flex space-x-2">
                  {dropdownNavItems.map((navItem) => (
                    <NavigationMenuItem key={navItem.to}>
                      <NavigationMenuTrigger
                        className="bg-white text-blue-900 hover:bg-blue-100 hover:text-orange-500 text-base font-bold px-4 py-3 rounded-lg transition-all duration-200 hover:scale-105"
                        aria-label={navItem.label}
                      >
                        {navItem.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="w-screen lg:w-[1300px] bg-white/20 backdrop-blur-lg">
                        <div className="flex gap-0 p-0 rounded-xl shadow-xl border border-orange-400/50 overflow-hidden">
                          {/* Text Section */}
                          <div
                            data-aos="fade-left"
                            className="w-1/4 p-6 border-r border-gray-300/50 bg-white/10 backdrop-blur-md"
                          >
                            <h2 className="text-lg font-bold text-blue-900 mb-4 font-noto-sans-lao">
                              {navItem.label}
                            </h2>
                            <ul className="grid gap-2">
                              {memoizedDropdownItems[navItem.to.replace("/", "")].map((subItem) => (
                                <li
                                  key={subItem.to}
                                  onMouseEnter={() => setHoveredSubItem(subItem.to)}
                                  onMouseLeave={() => setHoveredSubItem(null)}
                                >
                                  <NavigationMenuLink asChild>
                                    <NavLink
                                      to={subItem.to}
                                      end
                                      className={({ isActive }) =>
                                        `group block text-sm font-semibold px-3 py-2 rounded-md transition-all duration-200 ${isActive
                                          ? "bg-gradient-to-r hover:text-lg from-orange-500 to-orange-600 text-blue-900 shadow-md"
                                          : "text-blue-900 hover:text-orange-500 hover:bg-blue-100 hover:font-bold"
                                        }`
                                      }
                                    >
                                      {subItem.label}
                                    </NavLink>
                                  </NavigationMenuLink>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Image Section */}
                          <div
                            data-aos="fade-right"
                            className="flex-1 p-6 flex items-center justify-start rounded-xl relative overflow-hidden"
                          >
                            {/* Background image + blur */}
                            <div
                              className="absolute inset-0 bg-cover bg-center backdrop-blur-lg opacity-30"
                              style={{
                                backgroundImage: `url(${hoveredSubItem && subItemImages[hoveredSubItem]
                                    ? subItemImages[hoveredSubItem]
                                    : navItemImages[navItem.to.replace("/", "")] || FALLBACK_IMAGE
                                  })`,
                              }}
                            ></div>

                            {/* Foreground content */}
                            <div className="relative p-4 rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 shadow-lg flex items-center justify-center">
                              <img
                                src={
                                  hoveredSubItem && subItemImages[hoveredSubItem]
                                    ? subItemImages[hoveredSubItem]
                                    : navItemImages[navItem.to.replace("/", "")] || FALLBACK_IMAGE
                                }
                                alt={`${hoveredSubItem
                                  ? memoizedDropdownItems[navItem.to.replace("/", "")].find(
                                    (sub) => sub.to === hoveredSubItem
                                  )?.label || "Sub-item"
                                  : navItem.label
                                  } illustration`}
                                className="max-w-[150px] w-auto h-auto object-contain rounded-3xl"
                              />
                            </div>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>

              {/* Standalone Careers Link */}
              <NavLink
                to="/careers"
                end
                role="tab"
                className={({ isActive }) =>
                  `text-base font-bold px-3 py-2 rounded-lg transition-all duration-200 ${isActive
                    ? " text-orange-500 "
                    : "text-blue-900 hover:text-orange-500 hover:text-lg hover:bg-blue-100"
                  }`
                }
                aria-label={translations[language].careers}
              >
                {translations[language].careers}
              </NavLink>
            </div>

            {/* Language Selector and Mobile Menu Toggle */}
            <div className="flex items-center space-x-2 sm:space-x-4 ml-auto">
              <div className="w-20 sm:w-20">
                <Select value={language} onValueChange={handleLanguageChange}>
                  <SelectTrigger className="bg-white text-blue-900 border-none rounded-lg focus:ring-2 focus:ring-orange-500 py-1 px-2 text-xs sm:text-sm">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent className="bg-orange-500 rounded-lg">
                    {languageOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        className="flex items-center gap-2 text-blue-900 hover:bg-orange-100 focus:bg-orange-100 text-xs sm:text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={option.flag}
                            alt={option.label}
                            className="w-4 h-auto sm:w-5"
                          />
                          <span>{option.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <button
                onClick={toggleMenu}
                className="lg:hidden p-3 text-blue-900 hover:text-orange-500 focus:outline-none z-50"
                aria-label="Toggle mobile menu"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleMenu}
            aria-label="Close menu"
          ></div>
        )}

        {/* Mobile Menu Panel */}
        <div
          className={`lg:hidden fixed top-0 right-0 h-full w-64 sm:w-80 bg-white/30 backdrop-blur-md shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-blue-900 hover:text-orange-500 focus:outline-none z-60 p-2 rounded-full hover:bg-blue-100"
            aria-label="Close mobile menu"
          >
            <X size={28} />
          </button>
          <div className="flex flex-col p-4 pt-20 h-full overflow-y-auto bg-white">
            <NavLink
              to="/about"
              onClick={toggleMenu}
              className={({ isActive }) =>
                `text-base font-bold px-4 py-3 rounded-lg transition-all duration-200 ${isActive ? "bg-orange-500 text-white" : "text-blue-900 hover:text-orange-500 hover:bg-blue-100"
                }`
              }
            >
              {translations[language].about}
            </NavLink>

            {dropdownNavItems.map((navItem) => (
              <details key={navItem.to} className="mb-2">
                <summary className="cursor-pointer text-base font-bold px-4 py-3 rounded-lg text-blue-900 hover:text-orange-500 hover:bg-blue-100">
                  {navItem.label}
                </summary>
                <div className="pl-6 flex flex-col">
                  {memoizedDropdownItems[navItem.to.replace("/", "")].map((subItem) => (
                    <NavLink
                      to={subItem.to}
                      onClick={toggleMenu}
                      className={({ isActive }) =>
                        `text-sm font-semibold px-3 py-2 rounded-md transition-all duration-200 ${isActive ? "bg-orange-500 text-white" : "text-blue-900 hover:text-orange-500 hover:bg-blue-100"
                        }`
                      }
                    >
                      {subItem.label}
                    </NavLink>
                  ))}
                </div>
              </details>
            ))}

            <NavLink
              to="/careers"
              onClick={toggleMenu}
              className={({ isActive }) =>
                `text-base font-bold px-4 py-3 rounded-lg transition-all duration-200 ${isActive ? "bg-orange-500 text-white" : "text-blue-900 hover:text-orange-500 hover:bg-blue-100"
                }`
              }
            >
              {translations[language].careers}
            </NavLink>

            <div className="mt-6 mx-auto">
              <DownloadButtons />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 w-full p-0 pt-20">
          <Outlet />
        </main>

        {/* Footer */}
        <Foot_conten />

        {/* Contact Button with Hover Social Media Icons */}
        <div className="group fixed bottom-4 right-4 z-50">
          <button
            onClick={() => setShowChat(!showChat)}
            className="bg-blue-900 text-white rounded-full p-4 shadow-xl transition-all duration-300 transform hover:scale-110 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Toggle AI Chatbot"
          >
            <MessageCircleMore size={24} />
          </button>
          <div
            className="absolute bottom-[60px] right-0 w-[150px] bg-gradient-to-b from-slate-50 to-slate-100 rounded-xl shadow-2xl border border-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-100 scale-95 pointer-events-none group-hover:pointer-events-auto"
          >
            <div className="flex flex-col gap-2 p-4">
              <a
                href="https://m.me/finalaos"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-900 hover:bg-orange-100 hover:text-orange-500 p-2 rounded-md transition-all duration-200 transform hover:scale-110 font-noto-sans-lao"
                aria-label="Contact via Messenger"
              >
                <MessageCircleMore size={20} />
                <span className="text-sm font-semibold">Messenger</span>
              </a>
              {/* <a
                href="https://instagram.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-900 hover:bg-orange-100 hover:text-orange-500 p-2 rounded-md transition-all duration-200 transform hover:scale-110 font-noto-sans-lao"
                aria-label="Contact via Instagram"
              >
                <Instagram size={20} />
                <span className="text-sm font-semibold">Instagram</span>
              </a> */}
              <a
                href="https://wa.me/8562055559096"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-900 hover:bg-orange-100 hover:text-orange-500 p-2 rounded-md transition-all duration-200 transform hover:scale-110 font-noto-sans-lao"
                aria-label="Contact via WhatsApp"
              >
                <Phone size={20} />
                <span className="text-sm font-semibold">WhatsApp</span>
              </a>

            </div>
          </div>
        </div>

        {/* Back to Top Button for Mobile */}
        <div
          className="fixed bottom-0 left-1/4 transform -translate-x-1/2 z-10 block sm:hidden"
        >
          <BackToTopButton className="w-16 h-16 rounded-full shadow-lg" />
        </div>

        {/* Back to Top Button for Desktop */}
        <div
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 hidden sm:block"
        >
          <BackToTopButton className="w-12 h-12 rounded-full shadow-lg" />
        </div>
      </div>
    </LanguageContext.Provider>
  );
};

export default Main_layout;