"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { createPageUrl } from "@/utils";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  {
    name: "About",
    href: createPageUrl("About"),
    submenu: [
      { name: "About Us", href: createPageUrl("About") },
      { name: "Privacy Policy", href: createPageUrl("PrivacyPolicy") },
    ],
  },
  { name: "Services", href: createPageUrl("Services") },
  { name: "Contact", href: createPageUrl("Contact") },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [mobileExpandedNav, setMobileExpandedNav] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo/icon.png"
              alt="Heritage Property Management Services"
              width={48}
              height={48}
              className="h-10 lg:h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => {
              if (link.submenu) {
                const isHovered = hoveredNav === link.name;
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setHoveredNav(link.name)}
                    onMouseLeave={() => setHoveredNav(null)}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center gap-1 text-sm font-medium tracking-[0.08em] transition-colors duration-300 hover:text-brand ${
                        isScrolled ? "text-[#3d4646]" : "text-[#3d4646]"
                      }`}
                    >
                      {link.name}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isHovered ? "rotate-180" : ""
                        }`}
                      />
                    </Link>
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg border border-stone-100 py-2 z-50"
                        >
                          {link.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-2 text-sm text-[#3d4646] hover:bg-stone-50 hover:text-brand transition-colors"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium tracking-[0.08em] transition-colors duration-300 hover:text-brand ${
                    isScrolled ? "text-[#3d4646]" : "text-[#3d4646]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 -mr-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-[#26463C]" />
            ) : (
              <Menu className="w-6 h-6 text-[#26463C]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-stone-100"
          >
            <nav className="px-6 py-6 space-y-4">
              {navLinks.map((link) => {
                if (link.submenu) {
                  const isExpanded = mobileExpandedNav === link.name;
                  return (
                    <div key={link.name}>
                      <div className="flex items-center justify-between">
                        <Link
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-base font-medium text-[#3d4646] hover:text-brand transition-colors"
                        >
                          {link.name}
                        </Link>
                        <button
                          onClick={() =>
                            setMobileExpandedNav(isExpanded ? null : link.name)
                          }
                          className="p-1"
                          aria-label="Toggle submenu"
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-4 mt-2 space-y-2"
                          >
                            {link.submenu.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  setMobileExpandedNav(null);
                                }}
                                className="block text-sm text-[#3d4646] hover:text-brand transition-colors"
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-base font-medium text-[#3d4646] hover:text-brand transition-colors"
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
