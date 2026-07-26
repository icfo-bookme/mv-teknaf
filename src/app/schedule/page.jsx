import Schedules from "@/components/Schedules/schedules";
import Banner from "@/components/ui/Banner";
import getSchedules from "@/lib/getSchedules";

export const metadata = {
  title: "Schedules | MV Teknaf — Sea Cruises from Cox's Bazar to Saint Martin's Island",
  description: "Check the latest cruise schedules for MV Teknaf from Cox's Bazar to Saint Martin's Island. View departure times, cabin availability, and plan your luxury sea journey.",
}


export default async function Page() {
     const schedules = await getSchedules(819);
     console.log('schedules:', schedules);

  return (
    <div className="pt-0 bg-gray-50">
       <Banner
          imageUrl="/13.png"
          title="Schedules"
          subtitle=""
          heightClass=" h-[50vh] lg:h-[60vh]"
        /> 
        <Schedules schedules={schedules} />
    </div>
  )
}