"use client";

import PrimaryButton from "@/components/ui/Button";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

const CTAButtons = () => {
  const handleCall = () => {
    window.location.href = "tel:+8801841999922";
  };

  const handleWhatsApp = () => {
    const message = "Hello, I'm interested in booking a package on MV Teknaf.";
    const url = `https://wa.me/8801841999922?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-row items-center justify-center gap-4 mt-5 mb-10">
      <button
        onClick={handleCall}
        className="flex items-center text-white px-4 py-2 rounded-lg transition-colors shadow-sm hover:shadow-md"
        style={{
          background: "linear-gradient(90deg, #313881, #0678B4)",
        }}
      >
        <FaPhoneAlt className="mr-2" />
        Call Now
      </button>

      <PrimaryButton
        onClick={handleWhatsApp}
        style={{
          background: "linear-gradient(90deg, #313881, #0678B4)",
        }}
        bgColor="bg-green-800"
        hoverColor="hover:bg-green-600"
        icon={FaWhatsapp}
      >
        Book Now
      </PrimaryButton>
    </div>
  );
};

export default CTAButtons;
