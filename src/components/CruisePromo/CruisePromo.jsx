'use client';

import Image from 'next/image';
import crownImage from '../../../public/the-crown.jpg';
import { Roboto } from 'next/font/google';
import Link from 'next/link';
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });
export default function CruisePromo() {
  return (
    <section className=" max-w-6xl mx-auto  text-gray-900 px-6 py-12 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
      {/* Text Section */}
      <div className="md:w-1/2 space-y-5">
        <h2 className="text-3xl md:text-4xl font-semibold leading-snug">
          Discover Royal Luxury <br />
          <span className="text-red-700">Aboard MV Teknaf</span>
        </h2>

        {/* Stars */}
        <div className="text-yellow-500 text-xl space-x-1">
          {'★'.repeat(5)}
        </div>

        {/* Description */}
        <p className={`${roboto.className} text-gray-700 leading-relaxed text-justify`}>
          MV Teknaf is a modern passenger and sea-cruising vessel operating along the coastal waters of the Bay of Bengal. Designed for comfort and safety, Teknaf features air-conditioned seating, private cabins, an open deck for panoramic views, and onboard dining — redefining sea travel for the modern explorer.
          <br /><br />
          Whether you are planning a family vacation, a romantic getaway, or an adventure trip, MV Teknaf ensures a memorable experience from the moment you step on board. Sail between Teknaf and Saint Martin's Island in comfort and style, and let the beauty of the Bay of Bengal create lasting memories.
        </p>
        <Link href="/get-a-call">
          <button style={{
            background: 'linear-gradient(90deg, #313881, #0678B4)',
          }} className="bg-indigo-700 mt-3 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-indigo-800 transition duration-300">
            Start Booking
          </button>
        </Link>
      </div>

      {/* Circular Image */}
      <div className="md:w-1/2 flex justify-center">
        <div className="w-72 h-72 md:w-96 md:h-96 rounded-full border-[15px] border-gray-400 overflow-hidden shadow-lg relative">
          <Image
            src={crownImage}
            alt="MV Teknaf Cruise Ship"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
      </div>
    </section>
  );
}