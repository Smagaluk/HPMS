import React from "react";
import Link from "next/link";
import { createPageUrl } from "@/utils";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Heritage Property Management Services",
  description:
    "Heritage Property Management Services privacy policy. Learn how we protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-20 lg:pt-24 min-h-screen">
      <article className="py-20 lg:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Link
            href={createPageUrl("About")}
            className="inline-flex items-center text-sm text-[#3d4646] hover:text-[#26463C] mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to About
          </Link>

          <h1 className="text-4xl lg:text-5xl font-medium text-[#0a0a0a] tracking-tight">
            Privacy Policy
          </h1>

          <div className="mt-12 prose prose-[#3d4646] max-w-none space-y-6 text-[#3d4646] leading-relaxed">
            <p>
              Heritage Property Management Services respects your privacy and is
              committed to protecting any personal information you provide through
              this website.
            </p>
            <p>
              Information collected through contact forms is used solely to respond
              to inquiries and provide requested services. We do not sell, share, or
              distribute personal information to third parties except when required
              by law.
            </p>
            <p>
              Any information submitted through this website will be handled
              securely and used only for legitimate business purposes.
            </p>
            <p>
              If you have any questions about this policy, please{" "}
              <Link
                href={createPageUrl("Contact")}
                className="text-brand hover:underline"
              >
                contact us
              </Link>{" "}
              through the contact page.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
