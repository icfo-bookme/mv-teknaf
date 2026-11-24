# এমভি টেকনাফ | Data Layer + GTM ট্র্যাকিং পরিকল্পনা

একটি পুনর্ব্যবহারযোগ্য TrackedLink দিয়ে ফোন ও WhatsApp-এ ক্লিক গুনুন। যোগাযোগের ফর্ম সার্ভারে জমা হলে একই সাধারণ ফাংশন দিয়ে লিডের ইভেন্ট পাঠান।

## ১. GTM প্যাকেজ ও পরিবেশের সেটিংস

~~~bash
npm install @next/third-parties
~~~

.env.local এবং ডেপ্লয়মেন্টের বিল্ড পরিবেশে আসল GTM কনটেইনার আইডি দিন। .env.example-এ নমুনা মান রাখতে পারেন। আইডি বদলালে প্রজেক্ট আবার বিল্ড করুন।

~~~dotenv
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
~~~

## ২. মূল লেআউটে একবার GTM বসান

src/app/layout.js-এ নিচের import ও constant যোগ করুন। RootLayout-এর <body>-এর মধ্যে Footer-এর পরে component-টি বসান।

~~~jsx
import { GoogleTagManager } from "@next/third-parties/google";

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

// Inside <body>, after <Footer />
{gtmId && <GoogleTagManager gtmId={gtmId} />}
~~~

## ৩. ইভেন্ট পাঠানোর সাধারণ ফাংশন

src/lib/analytics.js তৈরি করুন। location হিসেবে নির্দিষ্ট নাম দিন, যেমন packages বা contact_page। পেজের ঠিকানা থেকে শুধু pathname পাঠান। গ্রাহকের নাম, ফোন, ইমেইল, ফর্মের লেখা বা পুরো WhatsApp লিংক payload-এ দেবেন না।

~~~jsx
import { sendGTMEvent } from "@next/third-parties/google";

export const EVENTS = {
  phone: "phone_click",
  whatsapp: "whatsapp_click",
  lead: "generate_lead",
};

const allowedEvents = new Set(Object.values(EVENTS));

export function trackEvent(event, location) {
  if (
    typeof window === "undefined" ||
    !process.env.NEXT_PUBLIC_GTM_ID ||
    !allowedEvents.has(event) ||
    !location
  ) {
    return;
  }

  const locationKey = event === EVENTS.lead ? "form_location" : "cta_location";

  sendGTMEvent({
    event,
    [locationKey]: location,
    page_path: window.location.pathname,
  });
}
~~~

## ৪. পুনর্ব্যবহারযোগ্য লিংক কম্পোনেন্ট

src/components/analytics/TrackedLink.jsx তৈরি করুন। এটি সাধারণ <a> হিসেবে কাজ করবে, তাই ফোনে কল করা বা নতুন ট্যাবে WhatsApp খোলার কাজ ব্রাউজারই করবে। Server Component থেকে href, location, className ও children-এর মতো props দিন। onClick function prop শুধু client parent থেকে দিন।

~~~jsx
"use client";

import { EVENTS, trackEvent } from "@/lib/analytics";

export default function TrackedLink({
  href,
  location,
  children,
  onClick,
  ...anchorProps
}) {
  function handleClick(event) {
    onClick?.(event);
    if (event.defaultPrevented) return;

    if (href.startsWith("tel:")) {
      trackEvent(EVENTS.phone, location);
    } else if (href.startsWith("https://wa.me/")) {
      trackEvent(EVENTS.whatsapp, location);
    }
  }

  return (
    <a {...anchorProps} href={href} onClick={handleClick}>
      {children}
    </a>
  );
}
~~~

## ৫. যে জায়গাগুলোতে লিংক বদলাবেন

কল বা WhatsApp-এর জন্য থাকা <a> এবং Footer-এর ফোন <Link> বদলে <TrackedLink> দিন। একই className, আইকন, aria-label, style ও href রাখুন। Banner-এ নম্বরের তালিকা render করার সময় key রাখুন।

- Navbar.jsx — navbar_desktop / navbar_mobile
- Footer.jsx — footer
- Banner.jsx — banner
- Packages/package.jsx — packages
- ImageCarousel.jsx — image_carousel
- Step/step.jsx — booking_steps
- CTAButtons.jsx — payment_cta
- Schedules/schedules.jsx — schedules

CTAButtons ও Schedules-এ বর্তমানে handler দিয়ে কল বা WhatsApp খোলা হয়। সেখানে সংশ্লিষ্ট button ও handler সরিয়ে একই ডিজাইনের TrackedLink দিন। নিচে Packages-এর জন্য সংক্ষিপ্ত উদাহরণ।

~~~jsx
import TrackedLink from "@/components/analytics/TrackedLink";
import { getCallHref, getWhatsAppHref } from "@/config/contact";

<TrackedLink href={getCallHref()} location="packages">
  Call Now
</TrackedLink>

<TrackedLink
  href={getWhatsAppHref("Hello, I'm interested in booking a package on MV Teknaf.")}
  location="packages"
  target="_blank"
  rel="noopener noreferrer"
>
  Book Now
</TrackedLink>
~~~

## ৬. ফর্ম সফলভাবে জমা হলে লিড গুনুন

ContactForm.jsx-এ trackingLocation prop যোগ করুন। /contact থেকে contact_page, /get-a-call থেকে callback_page এবং Contact.jsx থেকে contact_section পাঠান। বিদ্যমান try ব্লকে API অনুরোধ সফল হওয়ার পর এবং reset বা EmailJS notification-এর আগে ইভেন্ট পাঠান।

~~~jsx
import { EVENTS, trackEvent } from "@/lib/analytics";

// Update the existing component signature:
const ContactForm = ({ title, trackingLocation = "contact_form" }) => {
  // Keep the existing component body.
};

// In the existing onSubmit try block:
await postPackageInfo(apiData);
trackEvent(EVENTS.lead, trackingLocation);
~~~

ফোন ও WhatsApp-এ ক্লিক দিয়ে যোগাযোগের আগ্রহ বোঝা যাবে। generate_lead দিয়ে সার্ভারে জমা হওয়া অনুরোধ গুনুন।

## ৭. GTM Data Layer Variables & Custom Event Triggers

GTM-এ cta_location, form_location ও page_path নামে Data Layer Variable তৈরি করুন। phone_click, whatsapp_click এবং generate_lead নামে তিনটি Custom Event trigger তৈরি করুন।

## ৮. পরীক্ষা ও প্রকাশ

১. npm run lint, npm test এবং npm run build চালান।
২. GTM Preview-তে ডেস্কটপ ও মোবাইলে কল ও WhatsApp লিংক পরীক্ষা করুন। প্রতি ক্লিকে সঠিক location-সহ একটি ইভেন্ট আসবে।
৩. ফর্ম সফল হলে একটি generate_lead আসবে। API ব্যর্থ হলে কোনো লিড আসবে না। API সফল হওয়ার পর EmailJS ব্যর্থ হলেও একটি লিড আসবে।
৪. GTM আইডি ছাড়া কল, WhatsApp ও ফর্ম কাজ করছে কি না দেখুন। এরপর GTM version প্রকাশ করে production-এ আবার যাচাই করুন।

## অফিশিয়াল নির্দেশিকা

- <https://nextjs.org/docs/app/guides/third-party-libraries#google-tag-manager>
- <https://developers.google.com/tag-platform/tag-manager/datalayer>
