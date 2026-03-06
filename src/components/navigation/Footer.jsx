import React from "react";
import Link from "next/link";
import { createPageUrl } from "@/utils";

const footerLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: createPageUrl("About") },
  { name: "Services", href: createPageUrl("Services") },
  { name: "Contact", href: createPageUrl("Contact") },
  { name: "Privacy Policy", href: createPageUrl("PrivacyPolicy") },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Company Info */}
          <div className="lg:col-span-5">
            <h3 className="text-xl font-semibold tracking-[0.05em] text-white mb-4">
              Heritage Property Management Services
            </h3>
            <p className="text-[#F5F4F0]/70 text-sm leading-relaxed max-w-md">
              Heritage Living — thoughtful property management that helps residents
              feel at home and businesses feel proud of where they work.
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3 lg:col-start-7">
            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-[#F5F4F0]/50 mb-4">
              Navigation
            </h4>
            <nav className="space-y-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-sm text-[#F5F4F0]/70 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-[#F5F4F0]/50 mb-4">
              Contact
            </h4>
            <div className="space-y-3 text-sm text-[#F5F4F0]/70">
              <a href="tel:2484948593" className="block hover:text-white transition-colors">
                248-494-8593
              </a>
              <a href="mailto:hello@hrtgpm.com" className="block hover:text-white transition-colors">
                hello@hrtgpm.com
              </a>
              <p>Birmingham, Michigan</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[#F5F4F0]/20">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[#F5F4F0]/50">
              © {new Date().getFullYear()} Heritage Property Management Services. All
              rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
