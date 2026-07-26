import "./globals.css";
import Header from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "MV Teknaf — Sea Cruises from Cox's Bazar to Saint Martin's Island",
  description: "Experience luxury sea cruises in Bangladesh with MV Teknaf from Cox's Bazar to Saint Martin's Island. Book your premium cruise with luxury cabins and easy payment options.",
  keywords: [
    "MV Teknaf",
    "Luxury sea cruise Bangladesh",
    "Saint Martin's Island cruise",
    "Cox's Bazar to Saint Martin",
    "Teknaf to Saint Martin",
    "Saint Martin's Island tour",
    "Bay of Bengal cruise",
    "Sea cruise Bangladesh",
    "MV Teknaf booking",
    "Bangladesh cruise ship",
    "Luxury sea cruise",
    "Cruise Bangladesh",
    "Book Saint Martin's tour",
    "MV Teknaf ticket price",
    "MV Teknaf schedule",
    "Saint Martin's Island tour",
    "Premium sea cruise Bangladesh",
    "Couple cabin Saint Martin cruise",
    "Family cabin Saint Martin tour",
    "MV Teknaf payment options",
    "Saint Martin's travel package",
    "Cox's Bazar sea cruise",
    "Luxury cruise ship from Cox's Bazar to Saint Martin's",
    "Best sea cruise in Bangladesh",
    "How to book MV Teknaf ticket online",
    "MV Teknaf package price",
    "Saint Martin's cruise for couples and families",
    "MV Teknaf booking via bKash or Nagad",
    "Saint Martin's day cruise",
    "Sea cruise Cox's Bazar to Saint Martin's ticket"

  ],
  openGraph: {
    title: "MV Teknaf — Luxury Sea Cruises",
    description: "Experience luxury sea cruises from Cox's Bazar to Saint Martin's Island with premium cabins and easy booking.",
    url: "domain.com", //domain url hobe 
    siteName: "MV Teknaf",
    images: [
      {
        url: "ekta image url hobe, jeta social media te domain share korle show korbe",
        width: 1200,
        height: 630,
          alt: "MV Teknaf luxury cruise"
      }
    ],
    locale: "en_US",
    type: "website"
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Apply Inter font using className */}
      <body className={`${inter.className} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
