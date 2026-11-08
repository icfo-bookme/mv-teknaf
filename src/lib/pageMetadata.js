// Keep search and social previews aligned for each public landing page.
export function createPageMetadata({ title, description, path, keywords }) {
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "MV Teknaf",
      locale: "en_US",
      type: "website",
      images: [{ url: "/SHIP/SHIP6.png", alt: "MV Teknaf cruise ship" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/SHIP/SHIP6.png"],
    },
  };
}

export const homeMetadata = createPageMetadata({
  path: "/",
  title: "MV Teknaf Ship Ticket Booking | Online Ticket",
  description: "Book MV Teknaf ship tickets online for Cox's Bazar to Saint Martin. Explore seats, cabins and booking options. এমভি টেকনাফ শিপ টিকিট বুকিং।",
  keywords: [
    "MV Teknaf Ship Ticket Booking", "MV Teknaf Online Ticket", "এমভি টেকনাফ শিপ টিকিট বুকিং",
    "MV Teknaf Cox's Bazar to Saint Martin", "Buy MV Teknaf Ticket Online", "Saint Martin Cruise Ship Ticket",
    "MV Teknaf Official Website", "এমভি টেকনাফ টিকিট অনলাইন",
    "Official website to book MV Teknaf ship ticket online",
    "Book MV Teknaf cruise ticket from Cox's Bazar BIWTA jetty",
    "MV Teknaf ship online seat reservation Bangladesh", "Best price MV Teknaf ticket booking Cox's Bazar",
    "অনলাইন থেকে এমভি টেকনাফ জাহাজের টিকিট কাটার নিয়ম",
  ],
});

export const ticketMetadata = createPageMetadata({
  path: "/ticket",
  title: "MV Teknaf Ticket Price & Cabin Booking | Online Tickets",
  description: "Explore MV Teknaf ticket prices, seat fares and cabin booking options for Cox's Bazar to Saint Martin. এমভি টেকনাফ টিকিট ভাড়া ও বুকিং।",
  keywords: [
    "MV Teknaf Ticket Price", "MV Teknaf Cabin Booking", "এমভি টেকনাফ টিকিট ভাড়া ও বুকিং",
    "MV Teknaf Seat Price", "MV Teknaf Deluxe Cabin Booking", "MV Teknaf VIP Cabin Price",
    "MV Teknaf Royal Cabin Fare", "Saint Martin Ship Ticket Price 2026-2027", "এমভি টেকনাফ জাহাজের কেবিন ভাড়া",
    "MV Teknaf round trip ticket price Cox's Bazar to Saint Martin",
    "MV Teknaf main deck seat ticket booking online", "MV Teknaf VIP cabin fare and online availability status",
    "Cheap Saint Martin ship ticket booking MV Teknaf", "MV Teknaf one way ticket fare Cox's Bazar",
    "কক্সবাজার টু সেন্টমার্টিন এমভি টেকনাফ শিপ টিকিট অনলাইন বুকিং",
  ],
});

export const scheduleMetadata = createPageMetadata({
  path: "/schedule",
  title: "MV Teknaf Ship Schedule & Departure Time | Saint Martin",
  description: "Check MV Teknaf ship schedules and departure times for Cox's Bazar to Saint Martin, including return trips. এমভি টেকনাফ সময়সূচী দেখুন।",
  keywords: [
    "MV Teknaf Ship Schedule", "MV Teknaf Departure Time", "এমভি টেকনাফ সময়সূচী",
    "Cox's Bazar to Saint Martin Ship Timing", "MV Teknaf Nuniarchhara BIWTA Jetty Schedule",
    "Saint Martin Return Ship Schedule MV Teknaf", "MV Teknaf Daily Travel Timetable", "সেন্টমার্টিন জাহাজের ছাড়ার সময়",
    "MV Teknaf ship departure time from Cox's Bazar BIWTA jetty",
    "MV Teknaf return schedule from Saint Martin island", "MV Teknaf daily travel timetable and booking status",
    "Updated Saint Martin ship schedule 2026-2027", "কক্সবাজার থেকে এমভি টেকনাফ ছাড়ার সময় ও সিডিউল",
  ],
});

export const paymentMetadata = createPageMetadata({
  path: "/payment",
  title: "MV Teknaf Payment Methods | Pay Ship Ticket Online",
  description: "Explore MV Teknaf ticket payment methods and bKash payment information. Contact booking support for payment help. এমভি টেকনাফ পেমেন্ট বিকাশ।",
  keywords: [
    "MV Teknaf Payment Methods", "Pay MV Teknaf Ticket Online", "MV Teknaf bKash Payment",
    "MV Teknaf Card Payment Online", "MV Teknaf Ticket Refund Policy", "Secure Ticket Booking MV Teknaf",
    "এমভি টেকনাফ পেমেন্ট বিকাশ", "How to pay for MV Teknaf ship ticket online",
    "MV Teknaf bKash Merchant payment process", "MV Teknaf ticket cancellation and refund terms",
    "Instant online ticket booking confirmation MV Teknaf", "অনলাইনে সেন্টমার্টিন শিপের টিকিট পেমেন্ট করার উপায়",
  ],
});

export const contactMetadata = createPageMetadata({
  path: "/contact",
  title: "MV Teknaf Contact Number | Booking Hotline & WhatsApp",
  description: "Find the MV Teknaf contact number, booking hotline, WhatsApp and Chattogram office address for ticket support. এমভি টেকনাফ বুকিং ফোন নাম্বার।",
  keywords: [
    "MV Teknaf Contact Number", "MV Teknaf Booking Hotline", "MV Teknaf Counter Number Cox's Bazar",
    "MV Teknaf Counter Number Chittagong", "MV Teknaf Booking Office Dhaka", "MV Teknaf WhatsApp Booking",
    "MV Teknaf Support Center", "এমভি টেকনাফ বুকিং ফোন নাম্বার",
    "MV Teknaf official contact hotline for ticket booking", "MV Teknaf Dhaka ticket booking office address",
    "MV Teknaf Cox's Bazar Nuniarchhara jetty booking counter", "Book MV Teknaf ship ticket via WhatsApp",
    "এমভি টেকনাফ টিকিট কাউন্টার",
  ],
});
