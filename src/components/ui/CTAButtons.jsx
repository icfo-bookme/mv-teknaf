"use client";

import TrackedLink from "@/components/analytics/TrackedLink";
import { getCallHref, getWhatsAppHref } from "@/config/contact";


import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

const CTAButtons = () => {
  return (
    <div className="flex flex-row items-center justify-center gap-4 mt-5 mb-10">
      <TrackedLink
        href={getCallHref()}
        location="payment_cta"
        className="flex items-center text-white px-4 py-2 rounded-lg transition-colors shadow-sm hover:shadow-md"
        style={{
          background: "linear-gradient(90deg, #313881, #0678B4)",
        }}
      >
        <FaPhoneAlt className="mr-2" />
        Call Now
      </TrackedLink>

      <TrackedLink
        href={getWhatsAppHref("Hello, I'm interested in booking a package on MV Teknaf.")}
        location="payment_cta"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          background: "linear-gradient(90deg, #313881, #0678B4)",
        }}
        className="flex items-center px-4 py-2 rounded-lg transition-colors shadow-sm hover:shadow-md bg-green-800 hover:bg-green-600 text-white"
      >
        <FaWhatsapp size={25} className="mr-2" />
        Book Now
      </TrackedLink>
    </div>
  );
};

export default CTAButtons;
