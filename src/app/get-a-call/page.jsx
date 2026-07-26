import ContactForm from "@/components/ContactForm/ContactForm";
import Banner from "@/components/ui/Banner";
 // Adjust path as needed

export const metadata = {
  title: "Get a Call | MV Teknaf — Sea Cruises from Cox's Bazar to Saint Martin's Island",
  description: "Request a call from our team to assist with your MV Teknaf sea cruise booking. Get expert guidance, schedule support, and answers to all your queries.",
}


export default function Page() {
  return (
    <div>
      <Banner
        imageUrl="/13.png"
        title="Get A Call"
        subtitle=""
        heightClass=" h-[50vh] lg:h-[70vh]"
      />

      <section className="bg-white min-h-screen py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Get A Call
          </h1>
          <p className="text-center text-gray-500 mb-10">
            Please fill out the form below, and we will get back to you as soon as possible.
          </p>

          {/* Contact Form Here */}
          <ContactForm title="not show" />
        </div>
      </section>
    </div>
  );
}
