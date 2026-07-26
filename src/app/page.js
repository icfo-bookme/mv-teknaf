import BlogSection from "@/components/BlogSection/BlogSection";
import { Contact } from "@/components/Contact/Contact";
import CruisePromo from "@/components/CruisePromo/CruisePromo";
import FAQSection from "@/components/FAQSection/FAQSection";
import ImageCarousel from "@/components/ImageCarousel/ImageCarousel";
import Packages from "@/components/Packages/package";
import PaymentMethods from "@/components/PaymentMethods/PaymentMethods";
import Schedules from "@/components/Schedules/schedules";
import StepProcess from "@/components/Step/step";
import Banner from "@/components/ui/Banner";
import getFoodAndDescription from "@/lib/getFoodAndDescription";
import getPackages from "@/lib/getPackages";
import { getPropertyImages } from "@/lib/getPropertyImages";
import getSchedules from "@/lib/getSchedules";
import Image from "next/image";

export default async function Home() {

  const packages = await getPackages(819);
  const schedules = await getSchedules(819);
  const images = await getPropertyImages(819);
  const foodAndDescription = await getFoodAndDescription(819)
  return (
    <main className="bg-gray-50">
      <div>
        <Banner
          imageUrl="/SHIP/SHIP6.png"
          ship="MV Teknaf"
          title="Experience the Ultimate Ocean Cruise"
          subtitle="Teknaf ↔ Saint Martin's Island"
          heightClass=" h-[65vh] lg:h-[100vh]"
        />
        <StepProcess />
        <Packages packages={packages} foodAndDescription = {foodAndDescription} />
        <Schedules schedules ={schedules} />
        <PaymentMethods />
        <CruisePromo />
        <ImageCarousel propertyImages={images} />      
        <FAQSection/>
         <Contact/>  
        <BlogSection />
      </div>
    </main>
  );
}
