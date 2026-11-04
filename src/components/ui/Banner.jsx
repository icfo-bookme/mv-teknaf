import { phoneNumbers, getCallHref, getWhatsAppHref } from "@/config/contact";
import React from 'react';
import Image from 'next/image';
import { Playfair_Display } from 'next/font/google';
// Import the Playfair font
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

const Banner = ({ imageUrl, ship, title, subtitle, heightClass }) => {
  const defaultImage = "/p.jpeg";

  return (
    <div className={`relative w-full ${heightClass || 'h-[60vh]'} overflow-hidden shadow-2xl`}>
      {/* Background Image */}
      <Image
        src={imageUrl || defaultImage}
        alt={title || "Banner Image"}
        fill sizes="100vw"
        className="object-cover"
        priority
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gray-950 opacity-60 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-blue-500/20 to-transparent z-10"></div>

      {/* Content */}
      <div className="absolute inset-0 mt-12 md:mt-16 flex items-center lg:items-center pb-6 lg:pb-0 px-4 md:px-8 z-20">
        <div className={`text-white mt-10 w-full max-w-6xl mx-auto space-y-3 md:space-y-6 text-left `}>
          {/* Ship Name */}
          {ship && (
            <h2 className={`text-3xl md:text-lg lg:text-4xl md:-mb-5 -mb-3 italic drop-shadow-md ${playfair.className}`}>
              {ship}
            </h2>
          )}

          {/* Title */}
          {title && (
            <h1 className={`text-xl md:text-3xl lg:text-5xl italic leading-tight drop-shadow-lg ${playfair.className}`}>
              {title}
            </h1>
          )}

          {/* Subtitle */}
          {subtitle && (
            <p className={`text-xl md:text-lg lg:text-4xl text-[#71C3C7] font-light max-w-3xl drop-shadow-md ${playfair.className}`}>
              {subtitle}
            </p>
          )}

          {/* Call Buttons */}
          <div className="flex flex-row flex-wrap gap-2 sm:gap-3 mt-4">
            {/* Call Now button */}
            <a
              href={getCallHref()}
              className="flex items-center justify-center font-bold  text-white border-2 border-white px-2 py-1 lg:px-4 lg:py-2 rounded-3xl shadow-lg hover:bg-black/20 transition-all duration-300 text-[11px] md:text-sm"
            >
              Call Now →
            </a>

            {/* Phone Numbers */}
            {phoneNumbers.map((number) => (
              <a
                key={number}
                href={getCallHref(number)}
                className=" backdrop-blur-sm text-white border border-white font-medium px-2 py-1 lg:px-4 lg:py-2 rounded-3xl shadow-lg hover:bg-white/20 transition-all duration-300 text-[11px] md:text-sm"
              >
                {number}
              </a>
            ))}
          </div>
          <a
            href={getWhatsAppHref()}
            target="_blank"
            rel="noopener noreferrer"
            className={`${playfair.className} flex w-fit items-center justify-center bg-[#C70909] text-white font-medium px-4 py-2 rounded-3xl shadow-lg hover:bg-white hover:text-red-800 transition-all duration-300 text-sm md:text-base`}
          >
            <Image
              src="/whatsapp.png"
              alt="WhatsApp"
              width={20}
              height={20}
              className="mr-2"
            />
            Buy Ticket Now
          </a>

        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
    </div>
  );
};

export default Banner;
