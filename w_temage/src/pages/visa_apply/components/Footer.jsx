import React from "react";
import { FaPhone, FaFacebookF, FaYoutube, FaTiktok } from "react-icons/fa6";

const socials = [
  {
    icon: <FaFacebookF />,
    color: "hover:bg-blue-600",
  },
  {
    icon: <FaYoutube />,
    color: "hover:bg-red-600",
  },
  {
    icon: <FaTiktok />,
    color: "hover:bg-gray-600",
  },
];
export default function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* TOP SECTION */}
      <div
        data-aos="fade-up"
        className="bg-gradient-to-r from-[#1d3fa8] via-[#111] to-[#1d3fa8] py-8 px-6"
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* LEFT */}
          <div className="space-y-5">
            <h2 className="text-3xl md:text-4xl font-bold leading-snug">
              EXCLUSIVE PRIVILEGES FOR <br />
              KTC VISA cardmember
            </h2>

            <button className="bg-[#d9534f] hover:bg-[#c9443f] transition px-8 py-3 rounded-full font-semibold">
              More details
            </button>
          </div>

          {/* RIGHT */}
          <div>
            <h1 className="text-6xl text-orange-700 md:text-8xl font-extrabold tracking-wide">
              VISA
            </h1>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* CONTACT */}
        <div className="mb-10 flex flex-col lg:flex-row justify-between gap-8 py-4 ">
          <div>
            <p className="text-gray-300 text-sm mb-2">Contact KTC PHONE</p>

            <h2 className="text-2xl font-bold flex items-center gap-3">
              <FaPhone className="text-pink-400 text-xl" />
              02 56565656
            </h2>
          </div>

          {/* APP DOWNLOAD */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#222] flex items-center justify-center">
                KTC
              </div>

              <div>
                <p className="text-sm text-gray-400">Download</p>

                <p className="font-semibold">KTC Mobile</p>
              </div>
            </div>

            <button className="border border-gray-600 px-4 py-2 rounded-lg hover:bg-white hover:text-black transition">
              App Store
            </button>

            <button className="border border-gray-600 px-4 py-2 rounded-lg hover:bg-white hover:text-black transition">
              Google Play
            </button>

            <button className="border border-gray-600 px-4 py-2 rounded-lg hover:bg-white hover:text-black transition">
              App Gallery
            </button>
          </div>
        </div>

        {/* LINKS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 text-sm">
          {/* COL 1 */}
          <div>
            <h3 className="font-bold mb-4">About KTC</h3>

            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-white cursor-pointer">
                Awards and Achievements
              </li>

              <li className="hover:text-white cursor-pointer">
                Board of Directors
              </li>

              <li className="hover:text-white cursor-pointer">
                Management Team
              </li>

              <li className="hover:text-white cursor-pointer">News</li>

              <li className="hover:text-white cursor-pointer">Careers</li>

              <li className="hover:text-white cursor-pointer">
                Privacy Policy
              </li>
            </ul>
          </div>

          {/* COL 2 */}
          <div>
            <h3 className="font-bold mb-4">Investor Relations</h3>

            <ul className="space-y-2 text-gray-300">
              <li>Financial Highlight</li>
              <li>Publications</li>
              <li>Shareholder</li>
              <li>Bondholder</li>
              <li>Policy</li>
              <li>IR Contact</li>
            </ul>
          </div>

          {/* COL 3 */}
          <div>
            <h3 className="font-bold mb-4">Sustainability</h3>

            <ul className="space-y-2 text-gray-300">
              <li>Development</li>
              <li>Economic Dimension</li>
              <li>Social Dimension</li>
              <li>Environmental</li>
              <li>SD Contact</li>
            </ul>
          </div>

          {/* COL 4 */}
          <div>
            <h3 className="font-bold mb-4">Products & Services</h3>

            <ul className="space-y-2 text-gray-300">
              <li>KTC Credit Cards</li>
              <li>KTC PROUD Cash Card</li>
              <li>KTC CASH Loan</li>
              <li>KTC P BERM</li>
              <li>KTC MERCHANT</li>
              <li>MAAI BY KTC</li>
            </ul>
          </div>

          {/* COL 5 */}
          <div>
            <h3 className="font-bold mb-4">Customer Service</h3>

            <ul className="space-y-2 text-gray-300">
              <li>FAQs</li>
              <li>Product Disclosures</li>
              <li>Interest Rates & Fees</li>
              <li>Download Forms</li>
              <li>Articles</li>
              <li>Sitemap</li>
            </ul>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* SOCIAL */}
          <div className="flex items-center gap-3">
            <p className="font-semibold">Follow us on</p>

            <div className="flex gap-2">
              {socials.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className={`w-8 h-8 rounded-full bg-[#222] flex items-center justify-center text-white text-xs transition-all duration-300 ${item.color}`}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} KTC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}