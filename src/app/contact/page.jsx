import { contactMetadata } from "@/lib/pageMetadata";
import { contact } from "@/config/contact";
import ContactForm from "@/components/ContactForm/ContactForm";
import Banner from "@/components/ui/Banner";
import Image from "next/image";
import Link from "next/link";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF } from "react-icons/fa";

export const metadata = contactMetadata;

export default function ContactUs() {
  return (
    <>
      <Banner
        imageUrl="/SHIP/SHIP6.png"
        title="Contact Us"
        subtitle=""
        heightClass=" h-[50vh] lg:h-[70vh]"
      />
      <section className="bg-white min-h-screen py-10 ">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Contact Us
          </h1>
          <p className="text-center px-6 text-gray-500 mb-10">
            Reach out to MV Teknaf – we are here to help you with inquiries, bookings, and support.
          </p>

          <div className="grid md:grid-cols-2 gap-10 bg-gray-50 py-8 rounded-lg shadow-md">
            {/* Address */}
            <div className="space-y-6 px-8">
              <div className="flex items-start gap-4">
                <FaMapMarkerAlt className="text-blue-600 text-xl mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">Office Address</h3>
                  <p className="text-gray-600">
                    1147/A (3rd floor), CDA Avenue, <br />
                    GEC Circle, Chattogram.
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <FaPhoneAlt className="text-blue-600 text-xl mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">Phone</h3>
                  <p className="text-gray-600">
                    {contact.primaryPhone} <br />

                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <FaEnvelope className="text-blue-600 text-xl mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">Email</h3>
                  <p className="text-gray-600">bookmebdltd@gmail.com</p>
                </div>
              </div>

              {/* Facebook */}
              <div className="flex items-start gap-4">
                <FaFacebookF className="text-blue-600 text-xl mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">Follow Us on Facebook</h3>
                  <Link
                    href="https://facebook.com/bookmeltd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    www.facebook.com/bookmeltd
                  </Link>
                </div>
              </div>
              <div className="md:pt-20">
                <hr className="border-gray-300 mb-4" />
                <h3 className="text-2xl text-blue-950 font-bold mb-4 flex items-center">
                  <Image src="/mv-logo.png" alt="" width={818} height={442} style={{ width: 60, height: "auto" }} className="mr-3 shrink-0 object-contain brightness-0" />
                  MV Teknaf
                </h3>
                <p className="text-gray-700 mb-4 max-w-md">
                  Experience luxury sea cruises from Cox&apos;s Bazar to Saint Martin&apos;s Island with premium
                  amenities, breathtaking ocean views, and exceptional service.
                </p>
              </div>
            </div>

            {/* Optional: Contact Form */}
            <div className="px-3">
              <ContactForm title="show" />
            </div>
          </div>
        </div>
      </section></>
  );
}
