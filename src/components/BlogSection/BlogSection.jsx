"use client";

import Image from "next/image";
import Link from "next/link";

const BlogSection = () => {
  const blogPosts = [
    {
      id: "1",
      slug: "mv-teknaf-luxury-cruise",
      title: "MV Teknaf: Luxury Sea Cruise from Teknaf to Saint Martin's Island",
      description: (
        <>
          Experience the ultimate <strong>MV Teknaf</strong> journey on a <strong>luxury sea cruise Bangladesh</strong>. Sail from <strong>Teknaf to Saint Martin's Island</strong> aboard one of the <strong>Bay of Bengal cruises</strong>, offering world-class amenities, stunning ocean views, and elegantly designed cabins. This <strong>Teknaf Saint Martin's cruise</strong> provides flexible <strong>MV Teknaf booking</strong> options and convenient <strong>MV Teknaf payment options</strong> via bKash, Nagad, or bank transfers. Travelers can enjoy a memorable <strong>Saint Martin's cruise booking</strong>, choosing between an intimate <strong>couple cabin Saint Martin cruise</strong> or spacious <strong>family cabin Saint Martin tour</strong>. Guests can explore island exploration, beach activities, and breathtaking sunsets. For more information, visit our <Link href="/" className="text-blue-800 font-semibold">Home</Link> page, check the <Link href="/schedule" className="text-blue-800 font-semibold">Schedule</Link>, book your <Link href="/ticket" className="text-blue-800 font-semibold">Ticket</Link>, complete the process on the <Link href="/payment" className="text-blue-800 font-semibold">Payment Options</Link> page, or contact us via the <Link href="/contact" className="text-blue-800 font-semibold">Contact Us</Link> page. This <strong>luxury cruise Saint Martin's</strong> experience is perfect for leisure travelers, families, and adventure seekers, ensuring safety, comfort, and unforgettable memories on one of the <strong>best sea cruises in Bangladesh</strong>. Secure your spot on the ultimate <strong>Saint Martin's travel package</strong> and enjoy a premium <strong>Bangladesh cruise ship</strong> experience today.
        </>
      ),
      image: "/pro/pro.jpg",
    },
    {
      id: "2",
      slug: "mv-teknaf-luxury-cabins",
      title: "MV Teknaf: Luxury Cabins for Couples and Families",
      description: (
        <>
          Discover the elegant <strong>MV Teknaf</strong> cabins designed for couples and families on a <strong>premium sea cruise Bangladesh</strong>. Each cabin ensures privacy, comfort, and panoramic ocean views during your <strong>Teknaf sea cruise</strong>. Travelers can book <strong>Saint Martin's Island tour</strong> packages, selecting a cozy <strong>couple cabin Saint Martin cruise</strong> or spacious <strong>family cabin Saint Martin tour</strong>. Enjoy modern amenities, air-conditioning, plush bedding, and clean bathrooms for a safe and relaxing <strong>Saint Martin's luxury tour</strong>. Flexible <strong>MV Teknaf booking via bKash or Nagad</strong> and online <strong>Saint Martin's cruise booking</strong> make reserving your trip simple. For quick navigation, visit <Link href="/" className="text-blue-800 font-semibold">Home</Link>, see the <Link href="/schedule" className="text-blue-800 font-semibold">Schedule</Link>, reserve your <Link href="/ticket" className="text-blue-800 font-semibold">Ticket</Link>, process payment on the <Link href="/payment" className="text-blue-800 font-semibold">Payment Options</Link>, or ask questions via <Link href="/contact" className="text-blue-800 font-semibold">Contact Us</Link>. This <strong>luxury cruise Saint Martin's</strong> guarantees an extraordinary <strong>Saint Martin's cruise for couples and families</strong> with excellent service, elegant cabins, and the best <strong>Bangladesh cruise ship</strong> experience. Plan your <strong>Saint Martin's travel package</strong> today and enjoy one of the <strong>best sea cruises in Bangladesh</strong> for an unforgettable journey.
        </>
      ),
      image: "/pro/pro2.jpg",
    },
    {
      id: "3",
      slug: "mv-teknaf-sundarbans-adventure",
      title: "MV Teknaf: Luxury Sea Cruise Adventure to Saint Martin's Island",
      description: (
        <>
          Embark on a <strong>Saint Martin's Island day tour</strong> aboard <strong>MV Teknaf</strong>, the ultimate <strong>luxury sea cruise ship from Teknaf to Saint Martin's Island</strong>. Enjoy ocean views, island exploration, and beach activities while staying in a <strong>couple cabin Saint Martin cruise</strong> or <strong>family cabin Saint Martin tour</strong>. Booking is effortless with <strong>MV Teknaf booking via bKash or Nagad</strong>, bank transfers, or online <strong>Saint Martin's cruise booking</strong>. Navigate easily using the <Link href="/" className="text-blue-800 font-semibold">Home</Link>, check our <Link href="/schedule" className="text-blue-800 font-semibold">Schedule</Link>, reserve a <Link href="/ticket" className="text-blue-800 font-semibold">Ticket</Link>, complete payment on the <Link href="/payment" className="text-blue-800 font-semibold">Payment Options</Link> page, or get support via <Link href="/contact" className="text-blue-800 font-semibold">Contact Us</Link>. This <strong>premium sea cruise Bangladesh</strong> experience is ideal for families, couples, and adventure seekers, combining luxury, safety, and elegance on one of the <strong>best sea cruises in Bangladesh</strong>. Take advantage of transparent <strong>MV Teknaf ticket price</strong> and <strong>MV Teknaf schedule</strong> while selecting your <strong>Saint Martin's travel package</strong>. Make your <strong>Teknaf Saint Martin's cruise</strong> unforgettable and experience the finest <strong>luxury cruise Saint Martin's</strong> in Bangladesh.
        </>
      ),
      image: "/pro/pro3.jpg",
    },
  ];

  return (
    <section className="py-12">
      <h2 className="text-4xl font-bold text-center text-red-700 mb-10">Blog</h2>
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-md overflow-hidden shadow hover:shadow-lg transition-all duration-300"
            >
              <div className="relative w-full h-64">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl text-gray-950 font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-700 text-sm whitespace-pre-line">{post.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;