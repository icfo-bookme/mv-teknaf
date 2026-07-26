import React from "react";
import Link from "next/link";

const FAQSection = () => {
  return (
    <section className="text-gray-800">
      <div className="container flex flex-col justify-center p-4 mx-auto md:p-8">
        <p className="p-2 text-sm font-medium tracking-wider text-center text-red-600 uppercase">
          How it works
        </p>
        <h2 className="mb-12 text-xl font-bold leading-none text-center text-blue-950 sm:text-3xl">
          MV Teknaf &ndash; Frequently Asked Questions (FAQ)
        </h2>

        <div className="flex flex-col divide-y text-gray-900 sm:px-8 lg:px-12 xl:px-32 dark:divide-gray-300">

          <details>
            <summary className="py-2 outline-none cursor-pointer focus:underline">
               How many cabins are available?
            </summary>
            <div className="px-4 pb-4">
              <p>
                MV Teknaf offers <strong>VIP and VVIP Cabins</strong>. While exact numbers vary based on room allocations during booking, cabins are limited in quantity and accommodate up to <strong>2 adults per cabin</strong> (with options for additional person/bed tickets if permitted).
              </p>
            </div>
          </details>

          <details>
            <summary className="py-2 outline-none cursor-pointer focus:underline">
               What is included in the Teknaf to Saint Martin's Island Cruise?
            </summary>
            <div className="px-4 pb-4">
              <p className="font-semibold">Inclusions:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Round-trip or single-way ship transit tickets (covering all marine tolls and taxes)</li>
              </ul>
              <p className="font-semibold mt-2">Exclusions:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Personal food/meals (unless complimentary snacks are provided on selected packages)</li>
                <li>Porter/luggage assistance fees</li>
                <li>Island accommodation/activities</li>
              </ul>
              <p className="mt-2">
                Check the <Link href="/schedule" className="text-blue-800 font-semibold">Schedule</Link> for your cruise.
              </p>
            </div>
          </details>

          <details>
            <summary className="py-2 outline-none cursor-pointer focus:underline">
               What is the typical itinerary?
            </summary>
            <div className="px-4 pb-4 space-y-1">
              <p><strong>7:00 AM:</strong> Departure from Nuniarchhara BIWTA Ghat, Cox's Bazar (or Damdamia Ghat, Teknaf). (Passengers are advised to arrive at the jetty by 6:30 AM / 30 minutes prior).</p>
              <p><strong>12:00 PM – 12:30 PM:</strong> Arrival at Saint Martin's Island Jetty.</p>
              <p><strong>12:30 PM &ndash; 3:00 PM:</strong> Free time for sightseeing, lunch, and exploration on the island.</p>
              <p><strong>3:00 PM:</strong> Return departure from Saint Martin's Island Jetty back to Teknaf.</p>
              <p><strong>7:30 PM &ndash; 8:00 PM:</strong> Arrival back at the origin jetty.</p>
              <p className="mt-2">
                Book your <Link href="/ticket" className="text-blue-800 font-semibold">Ticket</Link> today.
              </p>
            </div>
          </details>

          <details>
            <summary className="py-2 outline-none cursor-pointer focus:underline">
               Are there age restrictions?
            </summary>
            <div className="px-4 pb-4">
              <p>No strict upper or lower age limits. Travelers of all ages (infants, children, adults, and senior citizens) can board.</p>
              <p className="mt-2">Elderly travelers and individuals prone to sea sickness are advised to select ground/lower-deck AC seating (Economy/Business Class) for better stability.</p>
              <p className="mt-2">
                For more details, <Link href="/contact" className="text-blue-800 font-semibold">Contact Us</Link>.
              </p>
            </div>
          </details>

          <details>
            <summary className="py-2 outline-none cursor-pointer focus:underline">
               What is the child policy?
            </summary>
            <div className="px-4 pb-4">
              <ul className="list-disc pl-5 space-y-1">
                <li>Children under 3–5 years: Free of charge (must share a seat with a parent/guardian)</li>
                <li>Children 5 years and above: Full adult ticket price applies</li>
              </ul>
            </div>
          </details>

          <details>
            <summary className="py-2 outline-none cursor-pointer focus:underline">
               What payment methods are accepted?
            </summary>
            <div className="px-4 pb-4">
              <p className="font-semibold">Mobile Financial Services (MFS):</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>bKash (2% service charge)</li>
                <li>Nagad (2% service charge)</li>
                <li>Rocket</li>
              </ul>
              <p className="font-semibold mt-2">Direct Bank Transfer:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>BRAC Bank Limited and other major commercial banks</li>
              </ul>
              <p className="font-semibold mt-2">Cash:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Accepted directly at authorized offline booking counters in Dhaka, Cox's Bazar, or Chittagong</li>
              </ul>
              <p className="mt-2">
                Make payment via our <Link href="/payment" className="text-blue-800 font-semibold">Payment Options</Link> page.
              </p>
            </div>
          </details>

          <details>
            <summary className="py-2 outline-none cursor-pointer focus:underline">
               What is the cancellation policy?
            </summary>
            <div className="px-4 pb-4">
              <p className="font-semibold">Voyage Cancelled by Authority/Weather:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Full refund or free rescheduling if the trip is canceled due to natural disasters or government sea warnings</li>
              </ul>
              <p className="font-semibold mt-2">Passenger-Initiated Cancellations:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Cancellations within 96 hours of departure are non-refundable</li>
                <li>Cancellations prior to 96 hours (with valid medical or emergency proof) incur standard deduction charges (30–40%) subject to operator discretion</li>
                <li>No refund is provided if a passenger misses the ship's scheduled departure</li>
              </ul>
              <p className="mt-2">
                For questions, <Link href="/contact" className="text-blue-800 font-semibold">Contact Us</Link>.
              </p>
            </div>
          </details>

          <details>
            <summary className="py-2 outline-none cursor-pointer focus:underline">
               What facilities are in the cabins?
            </summary>
            <div className="px-4 pb-4">
              <ul className="list-disc pl-5 space-y-1">
                <li>Full Air Conditioning (AC)</li>
                <li>Attached luxury bed and seating area</li>
                <li>Private balcony or window views (varies between VIP and VVIP categories)</li>
                <li>Power outlets for charging devices</li>
              </ul>
            </div>
          </details>

          <details>
            <summary className="py-2 outline-none cursor-pointer focus:underline">
               What safety measures are onboard?
            </summary>
            <div className="px-4 pb-4">
              <ul className="list-disc pl-5 space-y-1">
                <li>Fully compliant marine safety equipment including life jackets for all passengers, lifebuoys, and emergency rafts</li>
                <li>Marine radio communication, GPS navigation, and certified coast-guard cleared routes</li>
                <li>Fire extinguishers and onboard trained crew/staff for passenger safety</li>
              </ul>
            </div>
          </details>

          <details>
            <summary className="py-2 outline-none cursor-pointer focus:underline">
               What should I bring?
            </summary>
            <div className="px-4 pb-4">
              <ul className="list-disc pl-5 space-y-1">
                <li>NID / Passport / Student ID (Mandatory for government coast check-posts and boarding verification)</li>
                <li>Printed or Digital Copy of your Ship Ticket</li>
                <li>Motion sickness / anti-nausea medication (if prone to seasickness)</li>
                <li>Sunscreen, sunglasses, and light cotton clothing</li>
                <li>Sufficient cash (ATMs on Saint Martin's Island can be unreliable)</li>
              </ul>
            </div>
          </details>

          <details>
            <summary className="py-2 outline-none cursor-pointer focus:underline">
               How do I book?
            </summary>
            <div className="px-4 pb-4">
              <p>For bookings & availability, contact:</p>
              <ul className="list-disc pl-5">
                <li>📞 <strong>+880 1841-666644</strong></li>
                <li>📞 <strong>+880 1841-333322</strong></li>
              </ul>
              <p className="mt-2">
                You can also navigate: <Link href="/" className="text-blue-800 font-semibold">Home</Link> | <Link href="/schedule" className="text-blue-800 font-semibold">Schedule</Link> | <Link href="/ticket" className="text-blue-800 font-semibold">Ticket</Link> | <Link href="/payment" className="text-blue-800 font-semibold">Payment Options</Link> | <Link href="/contact" className="text-blue-800 font-semibold">Contact Us</Link>
              </p>
            </div>
          </details>

        </div>
      </div>
    </section>
  );
};

export default FAQSection;