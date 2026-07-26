import PaymentMethods from "@/components/PaymentMethods/PaymentMethods";
import Banner from "@/components/ui/Banner";
import CTAButtons from "@/components/ui/CTAButtons";


export const metadata = {
  title: "Payment | MV Teknaf — Sea Cruises from Cox's Bazar to Saint Martin's Island",
  description: "Complete your payment securely for MV Teknaf luxury sea cruises. Confirm your booking, choose your payment method, and enjoy a seamless cruise experience.",
}


export default function Page() {
 
  return (
    <div className="pt-0 bg-gray-50">
      <Banner
        imageUrl="/13.png"
        title="Payment Methods"
        subtitle=""
        heightClass=" h-[50vh] lg:h-[70vh]"
      />
        
      <PaymentMethods />
<CTAButtons/>
      
    </div>
  )
}