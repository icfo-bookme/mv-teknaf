import { homeMetadata, siteUrl } from "@/lib/pageMetadata";
import "./globals.css";
import Header from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Inter } from "next/font/google";
import Script from "next/script";

const gtmId = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-TXQRWM4Q";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  ...homeMetadata,
  metadataBase: siteUrl,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Apply Inter font using className */}
      <body className={`${inter.className} antialiased`}>
        <Header />
        {children}
        <Footer />
        {gtmId && (
          <>
            <Script id="gtm-init" strategy="beforeInteractive">
              {`window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());
                window.dataLayer.push({'gtm.start': Date.now(), event: 'gtm.js'});`}
            </Script>
            <Script
              async
              src={`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`}
            />
          </>
        )}
      </body>
    </html>
  );
}
