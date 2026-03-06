"use client";

import React from "react";
import Link from "next/link";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { ArrowRight, FileCheck, Wrench, Building2, BarChart3, Check } from "lucide-react";

const services = [
  {
    icon: FileCheck,
    title: "Leasing & Resident Relations",
    href: createPageUrl("Services") + "#tenant-leasing",
  },
  {
    icon: Wrench,
    title: "Maintenance & Building Care",
    href: createPageUrl("Services") + "#maintenance",
  },
  {
    icon: Building2,
    title: "Renovations & Improvements",
    href: createPageUrl("Services") + "#construction",
  },
  {
    icon: BarChart3,
    title: "Financial Reporting & Oversight",
    href: createPageUrl("Services") + "#financial",
  },
];

const whyChooseUs = [
  "Responsive communication and dependable service for residents and tenants",
  "Proactive maintenance so buildings stay well kept and comfortable",
  "Prompt attention to repair requests and questions",
  "Pride in creating places people enjoy living and working in",
  "Long-term care for properties and the people who use them",
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center bg-[#F5F4F0]">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-40 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-[#26463C] mb-6">
              Heritage Living
            </p>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-medium text-[#0a0a0a] tracking-tight leading-[1.1]">
              Professional Property Management Rooted in Care and Service
            </h1>
            <p className="mt-8 text-lg lg:text-xl text-[#3d4646] leading-relaxed max-w-2xl">
              At Heritage Property Management Services, we believe every property
              should be maintained with pride and every tenant should feel at home.
              Our team provides dependable management for multifamily and commercial
              properties, creating environments where residents and businesses can thrive.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href={createPageUrl("Contact")}
                className="inline-flex items-center justify-center px-8 py-4 bg-[#26463C] text-white text-sm font-medium tracking-wide hover:bg-[#1a3028] transition-colors"
              >
                Contact Us
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                href={createPageUrl("Services")}
                className="inline-flex items-center justify-center px-8 py-4 border border-[#3d4646] text-[#0a0a0a] text-sm font-medium tracking-wide hover:border-brand transition-colors"
              >
                View Our Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h2 className="text-3xl lg:text-4xl font-medium text-[#0a0a0a] tracking-tight">
              Where Properties Feel Like Home
            </h2>
            <div className="mt-6 space-y-4 text-lg text-[#3d4646] leading-relaxed">
              <p>
                We treat every building as something that should be maintained with
                thought and care. Our team works closely with property owners,
                residents, and businesses to ensure each property is kept in good
                condition and feels like a place people are proud to call home or
                run their business.
              </p>
              <p>
                Heritage Living is our philosophy—thoughtful property care, attentive
                service, and creating environments where people feel comfortable,
                respected, and valued.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 lg:py-32 bg-[#F5F4F0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-medium text-[#0a0a0a] tracking-tight mb-12">
              Our Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={service.href}
                    className="block p-6 bg-white border border-[#3d4646]/10 hover:border-brand/30 transition-colors group"
                  >
                    <service.icon className="w-8 h-8 text-[#26463C] mb-4" strokeWidth={1.5} />
                    <h3 className="text-lg font-medium text-[#0a0a0a] group-hover:text-brand transition-colors">
                      {service.title}
                    </h3>
                    <span className="mt-2 inline-flex items-center text-sm text-[#26463C] font-medium">
                      Learn more
                      <ArrowRight className="ml-1 w-4 h-4" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                href={createPageUrl("Services")}
                className="inline-flex items-center px-8 py-4 bg-[#26463C] text-white text-sm font-medium tracking-wide hover:bg-[#1a3028] transition-colors"
              >
                View All Services
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-medium text-[#0a0a0a] tracking-tight">
                Why Choose Us
              </h2>
              <ul className="mt-8 space-y-4">
                {whyChooseUs.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-[#3d4646] leading-relaxed"
                  >
                    <Check className="w-5 h-5 text-[#26463C] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#F5F4F0] p-10 lg:p-12"
            >
              <p className="text-lg font-medium text-[#0a0a0a] tracking-tight">
                Heritage Living — Care for the Property. Respect for the People.
              </p>
              <p className="mt-4 text-[#3d4646] leading-relaxed">
                We help residences feel like homes and commercial spaces feel like
                places businesses are proud to operate. Our team is here to support
                you with management that goes the extra mile.
              </p>
              <Link
                href={createPageUrl("Contact")}
                className="mt-8 inline-flex items-center px-8 py-4 bg-[#26463C] text-white text-sm font-medium tracking-wide hover:bg-[#1a3028] transition-colors"
              >
                Get in Touch
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-[#26463C] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-medium tracking-tight">
              Let&apos;s talk about your property
            </h2>
            <p className="mt-6 text-lg text-white/80 leading-relaxed">
              Whether you&apos;re a property owner, resident, or business tenant,
              we&apos;re here to help. Reach out and discover how we can support
              your property with care and attention.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href={createPageUrl("Contact")}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#26463C] text-sm font-medium tracking-wide hover:bg-[#F5F4F0] transition-colors"
              >
                Contact Us
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                href={createPageUrl("Services")}
                className="inline-flex items-center justify-center px-8 py-4 border border-white/40 text-white text-sm font-medium tracking-wide hover:border-white transition-colors"
              >
                View Our Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
