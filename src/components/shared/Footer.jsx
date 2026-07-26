import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCrown,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-gray-900 text-white pt-12 pb-8 overflow-hidden">
      {/* Background image with 60% opacity */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-black opacity-10"
        style={{ backgroundImage: `url('/footer.jpg')` }}
        aria-hidden="true"
      ></div>

      {/* Content wrapper - relative so it stacks above the bg image */}
      <div className="relative container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <FaCrown className="mr-2 text-blue-50 -mt-2" />
              MV Teknaf
            </h3>
              <p className="text-gray-400 mb-4 max-w-md">
              Experience luxury sea cruises from Teknaf to Saint Martin's Island with premium
              amenities, breathtaking ocean views, and exceptional service.
            </p>

            <div className="flex space-x-4 mb-6">
              <a href="https://www.facebook.com/share/1B2q3YxE7r/" className="text-white flex items-center justify-center gap-2   hover:text-gray-300 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
                <p className='underline text-blue-200'>www.facebook.com/bookmeltd</p>
              </a>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2">Subscribe to Our Newsletter</h4>
              <div className="flex w-[70%] md:w-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-2 bg-gray-800 border border-red-100 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full"
                />
                <button className="bg-blue-950 hover:bg-yellow-600 text-gray-50 border border-gray-500 font-semibold px-4 py-2 rounded-r-lg transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/schedule" className="text-gray-400 hover:text-white transition">
                  Schedule
                </Link>
              </li>
              <li>
                <Link href="/ticket" className="text-gray-400 hover:text-white transition">
                  Ticket Booking
                </Link>
              </li>
              <li>
                <Link href="/payment" className="text-gray-400 hover:text-white transition">
                  Payment Options
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <FaPhoneAlt className="mt-1 mr-3 text-blue-500" />


                <Link href="tel:+8801841999922">
                  <div className="cursor-pointer">
                    <p className="text-gray-400 text-sm">Call Anytime</p>
                    <p className="font-medium text-sm">01841999922, 01841333322</p>
                  </div>
                </Link>

              </div>
              <div className="flex items-start">
                <FaEnvelope className="mt-1 mr-3 text-blue-500" />
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="font-medium text-sm">bookmebdltd@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-blue-500" />
                <div>
                  <p className="text-gray-400 text-sm">Location</p>
                 <div className="text-gray-400 text-sm leading-relaxed space-y-1">
  <p>
    <span className="font-semibold text-gray-50">Dhaka:</span> South Breeze Center, Road number 11, Banani, Dhaka.
  </p>
  <p>
    <span className="font-semibold text-gray-50">Chittagong:</span> 1147/A (3rd floor), CDA Avenue, GEC Circle, Chattogram.
  </p>
  <p>
    <span className="font-semibold text-gray-50">Khulna:</span> City Trade Centre, KDA Avenue, Khulna.
  </p>
</div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;