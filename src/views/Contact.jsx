"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone, Send, CheckCircle } from "lucide-react";

const PHONE = "248-494-8593";
const EMAIL = "hello@hrtgpm.com";
const OFFICE = "Birmingham, Michigan";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyAddress: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "", propertyAddress: "", message: "" });
    } catch (err) {
      setError(err.message || "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

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
              Contact Us
            </h1>
            <p className="mt-6 text-lg text-[#3d4646] leading-relaxed">
              We would be happy to hear from you. Whether you are a resident,
              tenant, or property owner, our team is here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {isSubmitted ? (
                  <div className="text-center py-16 px-8 bg-[#F5F4F0]">
                    <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
                    <h2 className="text-2xl font-medium text-[#0a0a0a] mb-4">
                      Thank you for reaching out.
                    </h2>
                    <p className="text-[#3d4646] max-w-md mx-auto">
                      We&apos;ve received your message and will get back to you
                      within 1-2 business days.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label
                          htmlFor="name"
                          className="text-sm font-medium text-[#0a0a0a]"
                        >
                          Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          className="mt-2 border-[#3d4646]/30 focus:border-brand focus:ring-brand"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="email"
                          className="text-sm font-medium text-[#0a0a0a]"
                        >
                          Email *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          className="mt-2 border-[#3d4646]/30 focus:border-brand focus:ring-brand"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <Label
                        htmlFor="phone"
                        className="text-sm font-medium text-[#0a0a0a]"
                      >
                        Phone *
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className="mt-2 border-[#3d4646]/30 focus:border-brand focus:ring-brand"
                        placeholder="(555) 123-4567"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="propertyAddress"
                        className="text-sm font-medium text-[#0a0a0a]"
                      >
                        Property Address (optional)
                      </Label>
                      <Input
                        id="propertyAddress"
                        name="propertyAddress"
                        value={formData.propertyAddress}
                        onChange={(e) =>
                          handleChange("propertyAddress", e.target.value)
                        }
                        className="mt-2 border-[#3d4646]/30 focus:border-brand focus:ring-brand"
                        placeholder="Property address"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="message"
                        className="text-sm font-medium text-[#0a0a0a]"
                      >
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        className="mt-2 border-[#3d4646]/30 focus:border-brand focus:ring-brand resize-none"
                        placeholder="How can we help? Tell us what's on your mind..."
                      />
                    </div>

                    {error && (
                      <p className="text-sm text-red-600" role="alert">
                        {error}
                      </p>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-auto px-8 py-4 bg-[#26463C] hover:bg-[#1a3028] text-white font-medium h-auto"
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </motion.div>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="bg-[#F5F4F0] p-8">
                  <h3 className="text-sm font-semibold tracking-widest uppercase text-[#3d4646] mb-8">
                    Contact Information
                  </h3>

                  <div className="space-y-8">
                    <div className="flex items-start gap-4">
                      <Phone className="w-5 h-5 text-[#26463C] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-[#3d4646] uppercase tracking-wide mb-1">
                          Phone
                        </p>
                        <a
                          href={`tel:${PHONE.replace(/\D/g, "")}`}
                          className="text-[#0a0a0a] hover:text-brand transition-colors"
                        >
                          {PHONE}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Mail className="w-5 h-5 text-[#26463C] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-[#3d4646] uppercase tracking-wide mb-1">
                          Email
                        </p>
                        <a
                          href={`mailto:${EMAIL}`}
                          className="text-[#0a0a0a] hover:text-brand transition-colors"
                        >
                          {EMAIL}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <MapPin className="w-5 h-5 text-[#26463C] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-[#3d4646] uppercase tracking-wide mb-1">
                          Office
                        </p>
                        <p className="text-[#0a0a0a]">{OFFICE}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 pt-8 border-t border-[#3d4646]/20">
                    <p className="text-sm text-[#3d4646] leading-relaxed">
                      We aim to respond to every inquiry within 1-2 business days.
                      For urgent matters, please call us directly—we&apos;re here
                      to help.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
