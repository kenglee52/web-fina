import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Privilege', href: '#Privilege' },
  { name: 'Apply Card', href: '#' },
  { name: 'How to use', href: '#' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50
      bg-slate-950/50 backdrop-blur-xl
      border-b-4 border-b-orange-600/60 border-white/10
      transition-all duration-700 ease-out rounded-b-3xl
      ${
        isMounted
          ? 'translate-y-0 opacity-100'
          : '-translate-y-full opacity-0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="h-20 flex items-center justify-between">

          {/* Logo */}
          <div className="cursor-pointer select-none">
            <span
              className="
              text-3xl font-extrabold tracking-wide
              bg-clip-text
              text-orange-500
              "
            >
              FINA
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">

            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="
                relative
                text-slate-300
                hover:text-orange-400
                font-medium
                transition-all duration-300
                group
                "
              >
                {link.name}

                <span
                  className="
                  absolute
                  -bottom-1
                  left-0
                  w-0
                  h-[2px]
                  bg-gradient-to-r
                  from-orange-500
                  to-amber-400
                  group-hover:w-full
                  transition-all duration-300
                  "
                />
              </a>
            ))}

            {/* Button */}
            <button
              className="
              px-6 py-2
              rounded-full
              font-semibold
              text-white
              bg-gradient-to-r
              from-orange-500
              to-amber-500
              hover:scale-105
              transition-all duration-300
              shadow-[0_0_20px_rgba(249,115,22,.4)]
              hover:shadow-[0_0_30px_rgba(249,115,22,.7)]
              "
            >
              Get Started
            </button>
          </div>

          {/* Mobile Button */}
          <button
            className="
            md:hidden
            text-white
            hover:text-orange-400
            transition
            "
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`
        md:hidden
        overflow-hidden
        transition-all duration-500
        bg-slate-950/95 backdrop-blur-xl
        ${
          isOpen
            ? 'max-h-96 opacity-100 border-t border-white/10'
            : 'max-h-0 opacity-0'
        }
      `}
      >
        <div className="px-5 py-5 flex flex-col gap-3">

          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="
              px-4 py-3
              rounded-xl
              text-slate-300
              hover:text-orange-400
              hover:bg-white/5
              transition-all duration-300
              "
            >
              {link.name}
            </a>
          ))}

          <button
            className="
            mt-3
            py-3
            rounded-full
            text-white
            font-semibold
            bg-gradient-to-r
            from-orange-500
            to-amber-500
            shadow-[0_0_20px_rgba(249,115,22,.4)]
            "
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}