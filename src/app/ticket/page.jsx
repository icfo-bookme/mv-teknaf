import { ticketMetadata } from "@/lib/pageMetadata";
import Packages from "@/components/Packages/package";
import StepProcess from "@/components/Step/step";
import TermsCancellation from "@/components/TermsCancellation/TermsCancellation";
import Banner from "@/components/ui/Banner";
import getFoodAndDescription from "@/lib/getFoodAndDescription";
import getPackages from "@/lib/getPackages";

export const metadata = ticketMetadata;


export default async function Page() {
  const [packages, foodAndDescription] = await Promise.all([getPackages(819), getFoodAndDescription(819)]);
  return (
    <div className="pt-0 bg-gray-50">
      <Banner
        imageUrl="/SHIP/SHIP6.png"
        title="Ticket Booking"
        subtitle=""
        heightClass=" h-[50vh] lg:h-[70vh]"
      />
      <StepProcess />
      <Packages packages={packages} foodAndDescription={foodAndDescription} />
      <TermsCancellation />
    </div>
  )
}