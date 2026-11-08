import { scheduleMetadata } from "@/lib/pageMetadata";
import Schedules from "@/components/Schedules/schedules";
import Banner from "@/components/ui/Banner";
import getSchedules from "@/lib/getSchedules";

export const metadata = scheduleMetadata;


export default async function Page() {
     const schedules = await getSchedules(819);

  return (
    <div className="pt-0 bg-gray-50">
       <Banner
          imageUrl="/SHIP/SHIP6.png"
          title="Schedules"
          subtitle=""
          heightClass=" h-[50vh] lg:h-[70vh]"
        /> 
        <Schedules schedules={schedules} />
    </div>
  )
}