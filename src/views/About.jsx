"use client";

import React from "react";
import Link from "next/link";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

export default function About() {
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
              About Heritage Property Management Services
            </h1>
            <p className="mt-6 text-lg text-[#3d4646] leading-relaxed">
              We believe property management is about people, not just buildings.
              Our team is dedicated to thoughtful stewardship and creating places
              where residents and businesses feel at home.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="space-y-6 text-[#3d4646] leading-relaxed"
            >
              <p>
                Heritage Property Management Services was founded on a simple idea:
                every property deserves to be cared for, and every person who lives
                or works in it deserves responsive, dependable service. We take pride
                in maintaining buildings with attention and care—from the way we
                handle leasing and resident communication to how we coordinate
                maintenance and improvements.
              </p>
              <p>
                Our approach centers on stewardship. We treat each property as a
                long-term responsibility, not just a short-term assignment. That
                means staying attentive to resident needs, addressing repair requests
                promptly, and ensuring properties stay clean, safe, and well kept.
              </p>
              <p>
                We believe a well-maintained property improves quality of life and
                strengthens communities. By caring for the buildings we manage, we
                help residents feel at home and businesses feel proud of where they
                operate.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 lg:py-32 bg-[#F5F4F0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <SectionHeading
              eyebrow="Heritage Living"
              title="Our Approach"
              description="Maintain properties well. Respond to residents and tenants quickly. Manage with professionalism and care."
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mt-6 text-[#3d4646] leading-relaxed"
            >
              <p>
                We focus on preventative maintenance to keep buildings in good shape,
                clear communication so residents and tenants always know where they
                stand, and practical solutions that help each property thrive over
                time. Our service-first mindset means we&apos;re here when you need
                us—responsive, attentive, and dependable.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-medium text-[#0a0a0a] tracking-tight">
              Ready to learn more?
            </h2>
            <p className="mt-4 text-lg text-[#3d4646]">
              Explore our services or reach out to discuss how we can help care for
              your property and the people who live or work there.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href={createPageUrl("Services")}
                className="inline-flex items-center justify-center px-8 py-4 bg-[#26463C] text-white text-sm font-medium tracking-wide hover:bg-[#1a3028] transition-colors"
              >
                View Our Services
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                href={createPageUrl("Contact")}
                className="inline-flex items-center justify-center px-8 py-4 border border-[#3d4646] text-[#0a0a0a] text-sm font-medium tracking-wide hover:border-brand transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
