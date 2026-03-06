"use client";

import React from "react";
import Link from "next/link";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { ArrowRight, FileCheck, Wrench, Users, Building2, BarChart3 } from "lucide-react";

const services = [
  {
    id: "tenant-leasing",
    icon: FileCheck,
    title: "Leasing & Resident Relations",
    description:
      "We handle the full leasing process—from marketing available spaces and screening applicants to lease execution and ongoing communication. Our goal is to help residents find a place they can call home and businesses find spaces they are proud to operate in. We stay attentive to tenant needs throughout their stay.",
  },
  {
    id: "maintenance",
    icon: Wrench,
    title: "Maintenance & Building Care",
    description:
      "Our team ensures buildings are well maintained and responsive service is always available. We coordinate routine upkeep, preventative maintenance, and emergency repairs so residents feel comfortable and safe, and businesses can operate smoothly. When something needs fixing, we address it promptly and professionally.",
  },
  {
    id: "vendor",
    icon: Users,
    title: "Vendor & Contractor Coordination",
    description:
      "We work with trusted vendors and contractors to keep properties in good condition—landscaping, repairs, inspections, and improvement projects. We oversee the work so it is done right, helping buildings stay attractive and functional for the people who live and work in them.",
  },
  {
    id: "construction",
    icon: Building2,
    title: "Renovations & Improvements",
    description:
      "We manage small construction projects and property improvements—unit renovations, tenant build-outs, and building upgrades. Our team keeps projects on track so spaces feel fresh, inviting, and ready for residents or businesses to enjoy.",
  },
  {
    id: "financial",
    icon: BarChart3,
    title: "Financial Oversight & Reporting",
    description:
      "We track income and expenses, coordinate rent collection, and provide clear, straightforward reporting to property owners. Transparency matters to us—you will always know where things stand and feel confident in how your property is managed.",
  },
];

export default function Services() {
  return (
    <div className="pt-20 lg:pt-24">
      {/* Hero */}
      <section className="py-20 lg:py-28 bg-[#F5F4F0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-[#26463C] mb-6">
              Heritage Living
            </p>
            <h1 className="text-4xl lg:text-5xl font-medium text-[#0a0a0a] tracking-tight leading-tight">
              Services Rooted in Care
            </h1>
            <p className="mt-6 text-lg text-[#3d4646] leading-relaxed">
              We offer a full range of property management services for multifamily
              and commercial properties. Our team ensures buildings are well
              maintained, residents and tenants receive attentive service, and
              properties remain places people are proud to live or work.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Sections */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-20 lg:space-y-28">
            {services.map((service) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="scroll-mt-24"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                  <div className="lg:col-span-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-14 h-14 bg-[#F5F4F0] rounded-lg">
                        <service.icon
                          className="w-7 h-7 text-[#26463C]"
                          strokeWidth={1.5}
                        />
                      </div>
                      <h2 className="text-2xl font-medium text-[#0a0a0a] tracking-tight">
                        {service.title}
                      </h2>
                    </div>
                  </div>
                  <div className="lg:col-span-8">
                    <p className="text-lg text-[#3d4646] leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-[#F5F4F0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-medium text-[#0a0a0a] tracking-tight">
              We&apos;d be happy to hear from you
            </h2>
            <p className="mt-4 text-lg text-[#3d4646]">
              Whether you&apos;re a property owner, resident, or business tenant,
              our team is here to help. Reach out to learn how we can care for your
              property with attention and professionalism.
            </p>
            <Link
              href={createPageUrl("Contact")}
              className="mt-8 inline-flex items-center justify-center px-8 py-4 bg-[#26463C] text-white text-sm font-medium tracking-wide hover:bg-[#0a0a0a] transition-colors"
            >
              Contact Us
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
