
const { default: Link } = require("next/link");
const { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebookF, FaCrown } = require("react-icons/fa");
const { default: ContactForm } = require("../ContactForm/ContactForm");


export const Contact = () => {
  return (
    <section className="bg-white min-h-screen py-10 ">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-950 mb-4">
          Contact Us
        </h1>
        <p className="text-center px-6 text-gray-700 mb-10">
          Reach out to MV Teknaf – we are here to help you with inquiries, bookings, and support.
        </p>

        <div className="grid md:grid-cols-2 gap-10 bg-gray-50 py-8 rounded-lg shadow-md">
          {/* Address */}
          <div className="space-y-6 px-8">
            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-blue-600 text-xl mt-1" />
              <div>
                <h3 className="font-semibold text-lg text-gray-800">Office Address</h3>
                <div className="text-gray-600 text-sm leading-relaxed space-y-1">
                  <p>
                    <span className="font-semibold text-gray-800">Dhaka:</span> South Breeze Center, Road number 11, Banani, Dhaka.
                  </p>
                  <p>
                    <span className="font-semibold text-gray-800">Chittagong:</span> 1147/A (3rd floor), CDA Avenue, GEC Circle, Chattogram.
                  </p>
                  <p>
                    <span className="font-semibold text-gray-800">Khulna:</span> City Trade Centre, KDA Avenue, Khulna.
                  </p>
                </div>

              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <FaPhoneAlt className="text-blue-600 text-xl mt-1" />
              <div>
                <h3 className="font-semibold text-lg text-gray-800">Phone</h3>
                <p className="text-gray-600">
                  01841999922 <br />

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
                <FaCrown className="mr-2 text-blue-600 -mt-2" />
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
    </section>
  )
}
