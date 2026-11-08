import { homeMetadata } from "@/lib/pageMetadata";
import "./globals.css";
import Header from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  ...homeMetadata,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://mvteknaf.com.bd"),
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
