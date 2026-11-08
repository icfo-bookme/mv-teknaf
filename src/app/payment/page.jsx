import { paymentMetadata } from "@/lib/pageMetadata";
import PaymentMethods from "@/components/PaymentMethods/PaymentMethods";
import Banner from "@/components/ui/Banner";
import CTAButtons from "@/components/ui/CTAButtons";


export const metadata = paymentMetadata;


export default function Page() {
 
  return (
    <div className="pt-0 bg-gray-50">
      <Banner
        imageUrl="/SHIP/SHIP6.png"
        title="Payment Methods"
        subtitle=""
        heightClass=" h-[50vh] lg:h-[70vh]"
      />
        
      <PaymentMethods />
<CTAButtons/>
      
    </div>
  )
}