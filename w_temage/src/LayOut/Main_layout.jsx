import React, { useState, useEffect, useMemo, createContext } from "react";
import { NavLink, Outlet, Link, useLocation } from "react-router-dom";
import { Menu, X, MessageCircleMore, Phone, CreditCard, ChevronDown } from "lucide-react";
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
  ],
  support: [
    { to: "/support/faq", label: translations[language].faq },
    { to: "/support/contactus", label: translations[language].contact },
  ],
  Digital_Lending: [
    { to: "/personal_loan", label: translations[language].personalLoan },
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
  "/saving_account": "/production/p001.jpeg",
  "/services": "/hii.jpeg",
  "/production/PFMFH": "/production/p003.jpeg",
  "/fixed_deposits": "/production/p002.jpeg",
  "/news/event": "/production/new.jpeg",
  "/promotion": "/hii.jpeg",
  "/support/faq": "/suppoet02.jpeg",
  "/support/contactus": "/suppoet03.jpeg",
  "/personal_loan": "/production/d001.jpeg",
  "/Digital_Lending/002": "/archive.jpg",
  "/Digital_Lending/003": "/housing.jpg",
  "/comingsoon": "/production/p003.jpeg",
  "/comingsoon/005": "/production/p003.jpeg",
  "/fund_tarnsfer": "/production/pt002.jpeg",
  "/payment": "/production/ot003.jpeg",
  "/fina_agent": "/production/pt001.jpeg",
};

const FALLBACK_IMAGE = "/placeholder.jpg";

const Main_layout = () => {
  const location = useLocation(); // ເພີ່ມ useLocation ເຂົ້າມາເພື່ອກວດສອບ Active Menu
  const [language, setLanguage] = useState("lao");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [hoveredSubItem, setHoveredSubItem] = useState(null);

  const memoizedDropdownItems = useMemo(() => dropdownItems(language), [language]);
  const languageContextValue = useMemo(() => ({ language, setLanguage }), [language]);

  useEffect(() => {
    AOS.init({
      duration: 300,
      easing: "ease-in-out",
      once: false,
      mirror: true,
    });
  }, []);

  const handleLanguageChange = (value) => setLanguage(value);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // --- Menu Configurations ---
  // Primary Menus (Shown in Main Navigation Bar with Mega Menu)
  const primaryMenus = [
    { id: "production", to: "/production", label: language === "lao" ? "ຜະລິດຕະພັນ ແລະ ບໍລິການ" : translations[language].production },
    { id: "Digital_Lending", to: "/Digital_Lending", label: language === "lao" ? "ເງິນກູ້ດີຈີຕ໋ອນ" : translations[language].Digital_Lending },
    { id: "Payment_Transfer", to: "/Payment_Transfer", label: language === "lao" ? "ການຈ່າຍ ແລະ ການໂອນ" : translations[language].Payment_Transfer },
  ];

  // Secondary Menus (Shown in Top Bar)
  const secondaryMenus = [
    { id: "news", to: "/news", label: language === "lao" ? "ຂ່າວສານ" : translations[language].news, isDropdown: true },
    { id: "about", to: "/about", label: language === "lao" ? "ກ່ຽວກັບ ສຟນ" : translations[language].about, isDropdown: false },
    { id: "support", to: "/support", label: language === "lao" ? "ຊ່ວຍເຫຼືອ" : translations[language].support, isDropdown: true },
    { id: "careers", to: "/careers", label: language === "lao" ? "ສະໝັກວຽກກັບ ສຟນ" : translations[language].careers, isDropdown: false },
  ];

  return (
    <LanguageContext.Provider value={languageContextValue}>
      <div className="flex flex-col min-h-screen font-noto-sans-lao bg-slate-50">
        
        {/* Fixed Header Wrapper */}
        <header className="fixed top-0 left-0 w-full z-50 shadow-sm transition-all duration-300 flex flex-col">
          
          {/* Top Bar - Secondary Navigation (Hidden on Mobile) */}
          <div className="hidden lg:flex bg-slate-100 border-b border-gray-200 h-10 w-full items-center">
            <div className="container mx-auto px-4 flex justify-end items-center space-x-6">
              {secondaryMenus.map((menu) =>
                menu.isDropdown ? (
                  <div key={menu.id} className="relative group">
                    <button className="flex items-center text-md font-medium text-gray-600 hover:text-orange-500 transition-colors py-2">
                      {menu.label} <ChevronDown size={14} className="ml-1" />
                    </button>
                    {/* Standard Dropdown for Top Bar */}
                    <div className="absolute top-full right-0 w-48 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 transform origin-top-right group-hover:translate-y-0 translate-y-2">
                      <div className="py-2 flex flex-col">
                        {memoizedDropdownItems[menu.id].map((subItem) => (
                          <NavLink
                            key={subItem.to}
                            to={subItem.to}
                            className={({ isActive }) =>
                              `px-4 py-2 text-md transition-colors ${
                                isActive
                                  ? "bg-orange-50 text-orange-500 font-bold border-l-2 border-orange-500"
                                  : "text-gray-600 hover:bg-slate-50 hover:text-orange-500"
                              }`
                            }
                          >
                            {subItem.label}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <NavLink
                    key={menu.id}
                    to={menu.to}
                    className={({ isActive }) =>
                      `text-md font-medium transition-colors py-2 ${
                        isActive ? "text-orange-500 font-bold" : "text-gray-600 hover:text-orange-500"
                      }`
                    }
                  >
                    {menu.label}
                  </NavLink>
                )
              )}
            </div>
          </div>

          {/* Main Navigation Bar */}
          <nav role="navigation" className="w-full bg-white text-blue-900 h-20 shadow-md lg:shadow-none">
            <div className="container mx-auto px-2 sm:px-4 flex items-center justify-between h-full">
              
              {/* Logo */}
              <div className="flex-shrink-0 mr-2 sm:mr-4">
                <Link to="/">
                  <img
                    src="/fina-logo-color.png"
                    alt="SFC Logo"
                    className="w-12 h-12 sm:w-16 sm:h-16 object-contain cursor-pointer"
                  />
                </Link>
              </div>

              {/* Main Primary Links (Mega Menu) */}
              <div className="hidden lg:flex items-center space-x-2">
                <NavigationMenu>
                  <NavigationMenuList className="flex space-x-1">
                    {primaryMenus.map((navItem) => (
                      <NavigationMenuItem key={navItem.id}>
                        <NavigationMenuTrigger
                          className="bg-transparent text-blue-900 hover:bg-blue-50 hover:text-orange-500 text-[17px] font-bold px-4 py-3 rounded-lg transition-all duration-200"
                          aria-label={navItem.label}
                        >
                          {navItem.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="w-screen lg:w-[1200px] bg-white/40 backdrop-blur-xl">
                          <div className="flex gap-0 p-0 rounded-xl shadow-2xl border border-orange-200 overflow-hidden bg-white/80">
                            
                            {/* Text Section */}
                            <div className="w-1/3 p-6 border-r border-gray-200/50">
                              <h2 className="text-xl font-bold text-blue-900 mb-4 border-b border-gray-200 pb-2">
                                {navItem.label}
                              </h2>
                              <ul className="grid gap-2">
                                {memoizedDropdownItems[navItem.id].map((subItem) => {
                                  // ກວດສອບ Active state ດ້ວຍ useLocation ແທນ NavLink function
                                  const isActive = location.pathname === subItem.to;
                                  
                                  return (
                                    <li
                                      key={subItem.to}
                                      onMouseEnter={() => setHoveredSubItem(subItem.to)}
                                      onMouseLeave={() => setHoveredSubItem(null)}
                                    >
                                      <NavigationMenuLink asChild>
                                        <Link
                                          to={subItem.to}
                                          className={`group block text-sm font-semibold px-4 py-3 rounded-lg transition-all duration-200 ${
                                            isActive
                                              ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
                                              : "text-blue-900 hover:bg-blue-50 hover:text-orange-500"
                                          }`}
                                        >
                                          {subItem.label}
                                        </Link>
                                      </NavigationMenuLink>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>

                            {/* Image Section */}
                            <div className="flex-1 p-6 flex items-center justify-center relative overflow-hidden bg-slate-50">
                              <div
                                className="absolute inset-0 bg-cover bg-center opacity-10 transition-all duration-500"
                                style={{
                                  backgroundImage: `url(${
                                    hoveredSubItem && subItemImages[hoveredSubItem]
                                      ? subItemImages[hoveredSubItem]
                                      : navItemImages[navItem.id] || FALLBACK_IMAGE
                                  })`,
                                }}
                              />
                              <div className="relative p-2 rounded-2xl bg-white shadow-xl border border-gray-100 flex items-center justify-center transform transition-transform duration-300 hover:scale-105">
                                <img
                                  src={
                                    hoveredSubItem && subItemImages[hoveredSubItem]
                                      ? subItemImages[hoveredSubItem]
                                      : navItemImages[navItem.id] || FALLBACK_IMAGE
                                  }
                                  alt="Menu illustration"
                                  className="max-w-[200px] w-auto h-auto object-contain rounded-xl"
                                />
                              </div>
                            </div>
                          </div>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </div>

              {/* Right Side Controls */}
              <div className="flex items-center space-x-3 ml-auto">
                
                {/* Apply Card Button (Desktop) ປ່ຽນລິ້ງມາເປັນ /visa-apply ແລ້ວ */}
                <Link
                  to="/visa-apply"
                  className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  <CreditCard size={18} />
                  <span>{language === "lao" ? "ສະໝັກບັດ" : "Apply Card"}</span>
                </Link>

                {/* Language Selector */}
                <div className="w-20">
                  <Select value={language} onValueChange={handleLanguageChange}>
                    <SelectTrigger className="bg-slate-100 text-blue-900 border-none rounded-lg focus:ring-2 focus:ring-orange-500 py-1 px-2 text-xs sm:text-sm font-semibold">
                      <SelectValue placeholder="Lang" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200 rounded-lg shadow-xl">
                      {languageOptions.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className="flex items-center gap-2 text-blue-900 hover:bg-orange-50 text-xs sm:text-sm cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <img src={option.flag} alt={option.label} className="w-5 h-auto rounded-sm shadow-sm" />
                            <span>{option.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                  onClick={toggleMenu}
                  className="lg:hidden p-2 text-blue-900 hover:bg-blue-50 rounded-lg transition-colors focus:outline-none z-50"
                  aria-label="Toggle mobile menu"
                >
                  {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
              </div>
            </div>
          </nav>
        </header>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-blue-900/40 backdrop-blur-sm z-40 lg:hidden" onClick={toggleMenu} aria-label="Close menu" />
        )}

        {/* Mobile Menu Panel */}
        <div
          className={`lg:hidden fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } overflow-hidden flex flex-col`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <span className="text-lg font-bold text-blue-900">ເມນູ</span>
            <button onClick={toggleMenu} className="p-2 text-gray-500 hover:text-orange-500 bg-gray-50 rounded-full">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            
            {/* Primary Menus (Mobile) */}
            <div className="space-y-1">
              {primaryMenus.map((menu) => (
                <details key={menu.id} className="group">
                  <summary className="cursor-pointer text-[15px] font-bold px-4 py-3 rounded-lg text-blue-900 bg-slate-50 hover:bg-orange-50 hover:text-orange-600 transition-colors list-none flex justify-between items-center">
                    {menu.label}
                    <ChevronDown size={16} className="text-gray-400 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="pl-4 pr-2 py-2 space-y-1 border-l-2 border-orange-100 ml-4 mt-1">
                    {memoizedDropdownItems[menu.id].map((subItem) => (
                      <NavLink
                        key={subItem.to}
                        to={subItem.to}
                        onClick={toggleMenu}
                        className={({ isActive }) =>
                          `block text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                            isActive ? "bg-orange-500 text-white" : "text-gray-600 hover:bg-orange-50 hover:text-orange-500"
                          }`
                        }
                      >
                        {subItem.label}
                      </NavLink>
                    ))}
                  </div>
                </details>
              ))}
            </div>

            <hr className="border-gray-200 my-4" />

            {/* Secondary Menus (Mobile) */}
            <div className="space-y-1">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-2">ອື່ນໆ</p>
              {secondaryMenus.map((menu) =>
                menu.isDropdown ? (
                  <details key={menu.id} className="group">
                    <summary className="cursor-pointer text-sm font-semibold px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors list-none flex justify-between items-center">
                      {menu.label}
                      <ChevronDown size={14} className="text-gray-400 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="pl-4 pr-2 py-1 space-y-1 border-l-2 border-gray-200 ml-4 mt-1">
                      {memoizedDropdownItems[menu.id].map((subItem) => (
                        <NavLink
                          key={subItem.to}
                          to={subItem.to}
                          onClick={toggleMenu}
                          className={({ isActive }) =>
                            `block text-sm px-3 py-2 rounded-md transition-colors ${
                              isActive ? "text-orange-500 font-bold" : "text-gray-500 hover:text-orange-500"
                            }`
                          }
                        >
                          {subItem.label}
                        </NavLink>
                      ))}
                    </div>
                  </details>
                ) : (
                  <NavLink
                    key={menu.id}
                    to={menu.to}
                    onClick={toggleMenu}
                    className={({ isActive }) =>
                      `block text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors ${
                        isActive ? "text-orange-500 bg-orange-50" : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                  >
                    {menu.label}
                  </NavLink>
                )
              )}
            </div>

            {/* Apply Card Button (Mobile) ປ່ຽນລິ້ງມາເປັນ /visa-apply ແລ້ວ */}
            <Link
              to="/visa-apply"
              onClick={toggleMenu}
              className="mt-6 flex justify-center items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-3.5 rounded-xl font-bold shadow-md active:scale-95 transition-transform"
            >
              <CreditCard size={20} />
              {language === "lao" ? "ສະໝັກບັດດຽວນີ້" : "Apply Card Now"}
            </Link>

            <div className="mt-8 mx-auto pb-6">
              <DownloadButtons />
            </div>
          </div>
        </div>

        {/* Main Content Area - Padding adjusts for TopBar(40px) + MainNav(80px) on Desktop, only MainNav on Mobile */}
        <main className="flex-1 w-full p-0 pt-[80px] lg:pt-[120px] bg-white">
          <Outlet />
        </main>

        <Foot_conten />

        {/* Floating Contact Buttons */}
        <div className="group fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setShowChat(!showChat)}
            className="bg-blue-900 text-white rounded-full p-4 shadow-xl transition-all duration-300 transform hover:scale-110 hover:bg-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-200"
            aria-label="Toggle Contact Links"
          >
            <MessageCircleMore size={28} />
          </button>
          <div className="absolute bottom-[70px] right-0 w-[160px] bg-white rounded-xl shadow-2xl border border-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-4 pointer-events-none group-hover:pointer-events-auto">
            <div className="flex flex-col gap-1 p-2">
              <a
                href="https://m.me/finalaos"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 p-3 rounded-lg transition-colors font-medium"
              >
                <MessageCircleMore size={20} className="text-blue-600" />
                <span className="text-sm">Messenger</span>
              </a>
              <a
                href="https://wa.me/8562055559096"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-700 hover:bg-green-50 hover:text-green-600 p-3 rounded-lg transition-colors font-medium"
              >
                <Phone size={20} className="text-green-600" />
                <span className="text-sm">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Back to Top Buttons */}
        <div className="fixed bottom-6 left-1/4 transform -translate-x-1/2 z-40 block sm:hidden">
          <BackToTopButton className="w-12 h-12 rounded-full shadow-lg bg-white border border-gray-100 text-blue-900" />
        </div>
        <div className="fixed bottom-6 left-6 z-40 hidden sm:block">
          <BackToTopButton className="w-12 h-12 rounded-full shadow-lg bg-white border border-gray-100 text-blue-900 hover:text-orange-500" />
        </div>
        
      </div>
    </LanguageContext.Provider>
  );
};

export default Main_layout;